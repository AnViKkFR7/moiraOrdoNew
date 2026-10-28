import test from 'node:test'
import assert from 'node:assert/strict'
import { Writable } from 'node:stream'
import { rrssPreview } from '../server/rrss-preview.js'

// Prueba la integración de Vite sin depender del acceso a puertos del entorno.
test('Vite sirve la galería privada y mantiene la web pública en su cadena normal', async () => {
  const previous = process.env.RRSS_ACCESS_KEY
  process.env.RRSS_ACCESS_KEY = 'preview-integration-test-key'
  try {
    let middleware
    rrssPreview().configureServer({ config: { mode: 'development', root: process.cwd() }, middlewares: { use(handler) { middleware = handler } } })
    let nextCalled = false
    await middleware({ url: '/contacto' }, {}, () => { nextCalled = true })
    assert.equal(nextCalled, true)
    const call = (url, cookie) => new Promise((resolve, reject) => {
      const headers = {}, chunks = []
      const response = new Writable({ write(chunk, encoding, callback) { chunks.push(Buffer.from(chunk)); callback() } })
      response.setHeader = (name, value) => { headers[name.toLowerCase()] = value }
      response.on('finish', () => resolve({ status: response.statusCode, headers, body: Buffer.concat(chunks) }))
      response.on('error', reject)
      middleware({ url, method: 'GET', headers: { host: 'localhost', ...(cookie ? { cookie } : {}) } }, response, () => reject(new Error('Private route not handled'))).catch(reject)
    })
    assert.equal((await call('/srr')).status, 404)
    const entry = await call('/srr?key=preview-integration-test-key')
    assert.equal(entry.status, 303)
    const cookie = entry.headers['set-cookie'].split(';')[0]
    assert.ok(cookie.startsWith('moira_rrss_dev='))
    const page = await call(entry.headers.location, cookie)
    assert.equal(page.status, 200)
    assert.ok(page.body.toString().includes('Banco editorial'))
    assert.equal((await call('/srr/02_posts/P01.png', cookie)).headers['content-type'], 'image/png')
  } finally {
    if (previous === undefined) delete process.env.RRSS_ACCESS_KEY
    else process.env.RRSS_ACCESS_KEY = previous
  }
})
