import test from 'node:test'
import assert from 'node:assert/strict'
import { createRrssHandler } from '../server/rrss.js'

const key = 'synthetic-rrss-test-key'
const request = (path, cookie, method = 'GET') => new Request('https://moiraordo.es'+path, { method, headers: cookie ? { Cookie: cookie } : {} })
async function login(handler, path = '/srr') {
  const response = await handler(request(path+'?key='+encodeURIComponent(key)))
  assert.equal(response.status,303)
  return { response, cookie: response.headers.get('Set-Cookie').split(';')[0] }
}

test('sin clave o sin configuración se deniegan páginas, PNG, ZIP y endpoint directo', async () => {
  const handler=createRrssHandler({getKey:()=>key})
  for (const path of ['/srr','/srr/02_posts/P01.png','/api/srr?resource=00_EMPIEZA_AQUI.html','/srr/PACK_PUBLICACION.zip','/srr?key=wrong']) {
    const res=await handler(request(path));assert.equal(res.status,404);assert.match(res.headers.get('Cache-Control'),/no-store/)
  }
  const unavailable=createRrssHandler({getKey:()=>undefined})
  assert.equal((await unavailable(request('/srr?key='+key))).status,404)
})

test('la entrada retira la clave y crea una cookie firmada HttpOnly y Secure', async () => {
  const handler=createRrssHandler({getKey:()=>key})
  const {response,cookie}=await login(handler)
  assert.equal(response.headers.get('Location'),'/srr/00_EMPIEZA_AQUI')
  assert.ok(!cookie.includes(key));assert.match(response.headers.get('Set-Cookie'),/HttpOnly/);assert.match(response.headers.get('Set-Cookie'),/Secure/);assert.match(response.headers.get('Set-Cookie'),/SameSite=Strict/)
  assert.equal(response.headers.get('Referrer-Policy'),'no-referrer')
  const page=await handler(request('/srr/00_EMPIEZA_AQUI',cookie))
  assert.equal(page.status,200);assert.match(page.headers.get('Content-Type'),/text\/html/)
  const html=await page.text();assert.ok(html.includes('Banco editorial'));assert.ok(!html.includes(key))
})

test('las cookies manipuladas, caducadas o de una clave anterior no permiten el acceso', async () => {
  let now=1800000000
  const handler=createRrssHandler({getKey:()=>key,now:()=>now})
  const {cookie}=await login(handler)
  assert.equal((await handler(request('/srr/02_posts/P01.png',cookie+'bad'))).status,404)
  now+=7*24*60*60+1
  assert.equal((await handler(request('/srr/02_posts/P01.png',cookie))).status,404)
  const rotated=createRrssHandler({getKey:()=>key+'-rotated',now:()=>1800000000})
  assert.equal((await rotated(request('/srr/02_posts/P01.png',cookie))).status,404)
})

test('se sirven calendario y archivos reales, incluso desde las rewrites de Vercel', async () => {
  const handler=createRrssHandler({getKey:()=>key})
  const {cookie}=await login(handler)
  for (const path of ['/srr/08_calendario/CALENDARIO','/api/srr?resource=08_calendario%2FCALENDARIO.html']) {
    const res=await handler(request(path,cookie));assert.equal(res.status,200);assert.match(await res.text(),/Ver semana actual/)
  }
  const image=await handler(request('/api/srr?resource=02_posts%2FP01.png',cookie))
  assert.equal(image.status,200);assert.equal(image.headers.get('Content-Type'),'image/png')
  assert.deepEqual([...new Uint8Array(await image.arrayBuffer()).slice(0,4)],[137,80,78,71])
  assert.equal(image.headers.get('X-Robots-Tag'),'noindex, nofollow, noarchive')
  const head=await handler(request('/srr/02_posts/P01.png',cookie,'HEAD'))
  assert.equal(head.status,200);assert.equal(await head.text(),'')
})

test('no se pueden recorrer directorios ni leer ficheros fuera del paquete', async () => {
  const handler=createRrssHandler({getKey:()=>key});const {cookie}=await login(handler)
  for (const name of ['../package.json','%2e%2e%2f.env','server/private/rrss.zip','_generador/contenido.py','does-not-exist.png']) {
    assert.equal((await handler(request('/api/srr?resource='+encodeURIComponent(name),cookie))).status,404)
  }
  assert.equal((await handler(request('/srr/00_EMPIEZA_AQUI',cookie,'POST'))).status,405)
})

test('el ZIP se descarga como stream después de autenticar', async () => {
  const handler=createRrssHandler({getKey:()=>key});const {cookie}=await login(handler)
  const response=await handler(request('/srr/PACK_PUBLICACION.zip',cookie))
  assert.equal(response.status,200);assert.equal(response.headers.get('Content-Type'),'application/zip')
  assert.match(response.headers.get('Content-Disposition'),/attachment/)
  assert.equal(response.headers.get('Content-Length'),null)
  const zip=new Uint8Array(await response.arrayBuffer());assert.ok(zip.length>4_500_000);assert.deepEqual([...zip.slice(0,2)],[80,75])
})
