import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import vm from 'node:vm'
import { transform } from 'esbuild'

const source = await fs.readFile(new URL('../supabase/functions/moira-ordo-contact-form/index.ts', import.meta.url), 'utf8')
const { code } = await transform(source, { loader: 'ts', format: 'cjs', target: 'es2022' })
let handleRequest
let outbound
const context = {
  module: { exports: {} }, exports: {}, Response,
  Deno: { serve(handler) { handleRequest = handler }, env: { get(key) { return key === 'RESEND_API_KEY' ? 'synthetic-test-key' : undefined } } },
  fetch: async (url, options) => { assert.equal(url, 'https://api.resend.com/emails'); outbound = JSON.parse(options.body); return new Response('{}', { status: 200 }) },
}
vm.runInNewContext(code, context)
const { buildContactEmail } = context.module.exports
const contact = { name: 'Clara Vidal', email: 'clara@example.com', phone: '', company: '', projectTypeLabel: 'Nueva web', language: 'es', message: 'Hola\n\nMe interesa una web.' }

test('el contenido del visitante se escapa en HTML y se conserva en texto plano', () => {
  const message = '<script>alert(1)</script>\nTexto & más'
  const { html, text, subject } = buildContactEmail({ ...contact, name: '<img src=x onerror=alert(1)>', message })
  assert.ok(!html.includes('<script>'))
  assert.ok(!html.includes('<img src=x'))
  assert.ok(html.includes('&lt;script&gt;alert(1)&lt;/script&gt;<br />Texto &amp; más'))
  assert.ok(text.includes(message))
  assert.ok(!subject.includes('\n'))
  const malicious = buildContactEmail({ ...contact, email: 'x" onclick="alert(1)@example.com' }).html
  assert.ok(!malicious.includes(' onclick="'))
})

test('el email omite los campos opcionales vacíos y ofrece una respuesta directa', () => {
  const { html, text } = buildContactEmail(contact)
  assert.ok(!html.includes('Empresa / Proyecto'))
  assert.ok(!html.includes('>Teléfono<'))
  assert.ok(html.includes('mailto:clara%40example.com'))
  assert.ok(html.includes('Responder a la consulta'))
  assert.ok(text.includes('Email: clara@example.com'))
  assert.ok(html.length < 100000)
})

test('el envío conserva el destinatario, reply-to y ambas versiones del mensaje', async () => {
  const response = await handleRequest(new Request('https://example.test', { method: 'POST', body: JSON.stringify({ ...contact, projectType: { label: contact.projectTypeLabel } }) }))
  assert.equal(response.status, 200)
  assert.deepEqual(outbound.to, ['info@moiraordo.es'])
  assert.equal(outbound.reply_to, contact.email)
  assert.ok(outbound.html.includes('Hay un nuevo'))
  assert.ok(outbound.text.includes(contact.message))
  assert.ok(outbound.subject.includes(contact.name))
})
