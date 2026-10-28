/* global process */
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const MAX = { name: 120, email: 160, phone: 40, message: 4000, path: 300, item: 200, source: 120, referrer: 500 }
const clean = (value, max) => typeof value === 'string' && value.trim() ? value.trim().slice(0, max) : null
const response = (status, message) => new Response(message, { status })

function config() {
  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/+$/, '')
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const companyId = (process.env.COMPANY_ID || process.env.VITE_COMPANY_ID)?.trim()
  if (!companyId || !UUID.test(companyId)) return { error: response(503, 'Service unavailable') }
  if (!supabaseUrl || !serviceKey) return { error: response(500, 'Server error') }
  try {
    const parsed = new URL(supabaseUrl)
    if (parsed.protocol !== 'https:' && !['localhost', '127.0.0.1'].includes(parsed.hostname)) {
      return { error: response(500, 'Server error') }
    }
  } catch {
    return { error: response(500, 'Server error') }
  }
  return { supabaseUrl, serviceKey, companyId }
}

async function rows(configured, table, query) {
  const url = new URL(`${configured.supabaseUrl}/rest/v1/${table}`)
  for (const [key, value] of Object.entries(query)) url.searchParams.set(key, value)
  return fetch(url, {
    headers: {
      apikey: configured.serviceKey,
      Authorization: `Bearer ${configured.serviceKey}`,
      Accept: 'application/json',
    },
  })
}

async function handler(req) {
  if (req.method !== 'POST') return response(405, 'Method not allowed')
  let raw
  try { raw = await req.text() } catch { return response(400, 'Bad request') }
  if (raw.length > 20000) return response(400, 'Bad request')
  let body
  try { body = JSON.parse(raw) } catch { return response(400, 'Bad request') }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return response(400, 'Bad request')
  if (clean(body.company_website, 200)) return response(200, 'OK')

  const configured = config()
  if (configured.error) return configured.error
  const companyId = configured.companyId
  // La empresa pertenece al despliegue, no al bundle del navegador.
  // Se admiten clientes sin ID; si lo envían, no pueden seleccionar otra empresa.
  if (body.company_id != null && clean(body.company_id, 64)?.toLowerCase() !== companyId.toLowerCase()) return response(400, 'Bad request')
  const name = clean(body.name, MAX.name)
  const email = clean(body.email, MAX.email)
  const phone = clean(body.phone, MAX.phone)
  const message = clean(body.message, MAX.message)
  if (!name || (!email && !phone)) return response(400, 'Bad request')
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return response(400, 'Bad request')

  try {
    const companyRes = await rows(configured, 'companies', { select: 'id', id: `eq.${companyId}`, limit: '1' })
    if (!companyRes.ok) return response(500, 'Server error')
    const companies = await companyRes.json()
    if (!Array.isArray(companies) || companies.length === 0) return response(400, 'Bad request')

    const moduleRes = await rows(configured, 'company_modules', {
      select: 'is_enabled', company_id: `eq.${companyId}`, module_key: 'eq.crm', limit: '1',
    })
    if (!moduleRes.ok) return response(500, 'Server error')
    const modules = await moduleRes.json()
    if (!Array.isArray(modules) || !modules[0]?.is_enabled) return response(503, 'Requests unavailable')

    const consentVersion = clean(body.consent_text_version, 80)
    const consentGiven = body.consent_given === true && Boolean(consentVersion)
    const insertRes = await fetch(`${configured.supabaseUrl}/rest/v1/lead`, {
      method: 'POST',
      headers: {
        apikey: configured.serviceKey,
        Authorization: `Bearer ${configured.serviceKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        company_id: companyId,
        name,
        email,
        phone,
        message,
        source_path: clean(body.source_path, MAX.path),
        source_item: clean(body.source_item, MAX.item),
        source_referrer: clean(body.source_referrer, MAX.referrer),
        source_campaign: clean(body.source_campaign ?? body.utm_campaign, MAX.source),
        source_utm_source: clean(body.source_utm_source ?? body.utm_source, MAX.source),
        source_utm_medium: clean(body.source_utm_medium ?? body.utm_medium, MAX.source),
        source_utm_term: clean(body.source_utm_term ?? body.utm_term, MAX.source),
        source_utm_content: clean(body.source_utm_content ?? body.utm_content, MAX.source),
        consent_given: consentGiven,
        consent_at: consentGiven ? new Date().toISOString() : null,
        consent_text_version: consentGiven ? consentVersion : null,
        consent_source: consentGiven ? 'public_contact_form' : null,
      }),
    })
    if (!insertRes.ok) {
      console.error('[lead] insert failed', insertRes.status)
      return response(500, 'Server error')
    }
    return response(201, 'OK')
  } catch {
    console.error('[lead] request failed')
    return response(500, 'Server error')
  }
}



// Vercel entrega un Request web únicamente con esta firma.
export default { fetch: handler }
