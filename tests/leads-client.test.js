import test from 'node:test'
import assert from 'node:assert/strict'
import { submitLead } from '../src/lib/leads.js'

// No hay import.meta.env en Node: reproduce un bundle sin VITE_COMPANY_ID.
test('envía al servidor aunque el bundle no incluya el ID de empresa', async () => {
  const original = { fetch: globalThis.fetch, window: globalThis.window, document: globalThis.document }
  const events = []
  globalThis.window = { location: { pathname: '/contacto', search: '?utm_source=google' }, dispatchEvent: event => events.push(event.type) }
  globalThis.document = { referrer: '' }
  let calls = 0
  let status = 201
  globalThis.fetch = async (url, options) => {
    calls++
    assert.equal(url, '/api/lead')
    const body = JSON.parse(options.body)
    assert.equal(body.company_id, undefined)
    assert.equal(body.source_utm_source, 'google')
    return new Response('OK', { status })
  }
  try {
    const input = { name: 'Prueba', email: 'test@example.test' }
    assert.deepEqual(await submitLead(input), { ok: true })
    assert.equal(calls, 1)
    assert.deepEqual(events, ['moira:lead-sent'])
    status = 503
    assert.deepEqual(await submitLead(input), { ok: false, reason: 'unavailable' })
    status = 200 // Una página HTML o un endpoint equivocado no es una entrega.
    assert.deepEqual(await submitLead(input), { ok: false, reason: 'server' })
    assert.deepEqual(events, ['moira:lead-sent'])
    globalThis.fetch = async () => { throw new Error('offline') }
    assert.deepEqual(await submitLead(input), { ok: false, reason: 'network' })
    const before = calls
    assert.deepEqual(await submitLead({ name: '' }), { ok: false, reason: 'invalid' })
    assert.equal(calls, before)
  } finally { Object.assign(globalThis, original) }
})
