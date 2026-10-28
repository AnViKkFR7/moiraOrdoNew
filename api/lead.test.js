/* global process */
import test from 'node:test'
import assert from 'node:assert/strict'
import handler from './lead.js'

const companyId = '0aad4a59-d6ee-47c9-bb9e-da5e2bb3fb48'
const originalFetch = globalThis.fetch
const originalEnv = { ...process.env }
let crmEnabled = true
let inserted = null

test('lead endpoint pins tenant, checks CRM and maps consent and attribution', async () => {
  process.env.SUPABASE_URL = 'https://example.supabase.co'
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'synthetic-test-key'
  process.env.VITE_COMPANY_ID = companyId
  globalThis.fetch = async (input, options = {}) => {
    const url = new URL(input)
    if (url.pathname.endsWith('/companies')) return Response.json([{ id: companyId }])
    if (url.pathname.endsWith('/company_modules')) return Response.json([{ is_enabled: crmEnabled }])
    if (url.pathname.endsWith('/lead')) { inserted = JSON.parse(options.body); return new Response(null, { status: 201 }) }
    throw new Error(`Unexpected test URL ${url}`)
  }
  const makeRequest = () => new Request('https://client.example/api/lead', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ company_id: companyId, name: 'Test', email: 'test@example.test',
      message: 'Solicitud', source_item: 'Item de prueba', utm_source: 'google', utm_campaign: 'test',
      consent_given: true, consent_text_version: 'privacy-v1', crm_contact_id: 'forged' }),
  })
  assert.equal((await handler(makeRequest())).status, 201)
  assert.equal(inserted.company_id, companyId)
  assert.equal(inserted.source_utm_source, 'google')
  assert.equal(inserted.source_campaign, 'test')
  assert.equal(inserted.source_item, 'Item de prueba')
  assert.equal(inserted.consent_given, true)
  assert.equal(inserted.consent_source, 'public_contact_form')
  assert.equal('crm_contact_id' in inserted, false)
  crmEnabled = false
  assert.equal((await handler(makeRequest())).status, 503)
})

test.after(() => {
  globalThis.fetch = originalFetch
  for (const key of Object.keys(process.env)) if (!(key in originalEnv)) delete process.env[key]
  for (const [key, value] of Object.entries(originalEnv)) process.env[key] = value
})


