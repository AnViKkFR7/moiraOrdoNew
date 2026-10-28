const ENDPOINT = '/api/lead'
const COMPANY_ID = import.meta.env.VITE_COMPANY_ID

export async function submitLead(input) {
  if (!COMPANY_ID) return { ok: false, reason: 'invalid' }
  if (!input.name?.trim() || (!input.email?.trim() && !input.phone?.trim())) {
    return { ok: false, reason: 'invalid' }
  }
  const params = new URLSearchParams(window.location.search)
  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        company_id: COMPANY_ID,
        ...input,
        source_path: window.location.pathname,
        source_referrer: document.referrer || undefined,
        source_utm_source: params.get('utm_source') ?? undefined,
        source_utm_medium: params.get('utm_medium') ?? undefined,
        source_campaign: params.get('utm_campaign') ?? undefined,
        source_utm_term: params.get('utm_term') ?? undefined,
        source_utm_content: params.get('utm_content') ?? undefined,
      }),
    })
    if (response.status === 201) {
      window.dispatchEvent(new CustomEvent('moira:lead-sent'))
      return { ok: true }
    }
    return { ok: false, reason: response.status === 400 ? 'invalid' : 'server' }
  } catch {
    return { ok: false, reason: 'network' }
  }
}
