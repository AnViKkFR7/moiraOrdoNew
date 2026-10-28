import { createHmac, createHash, timingSafeEqual } from 'node:crypto'
import { readFile, stat } from 'node:fs/promises'
import { createReadStream } from 'node:fs'
import { Readable } from 'node:stream'
import { extname } from 'node:path'
import { unzipSync } from 'fflate'

const ARCHIVE = new URL('./private/rrss.zip', import.meta.url)
const MAX_AGE = 7 * 24 * 60 * 60
const MIME = { '.html': 'text/html; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.json': 'application/json; charset=utf-8', '.md': 'text/plain; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.csv': 'text/csv; charset=utf-8', '.ttf': 'font/ttf', '.woff2': 'font/woff2' }
const HEADERS = {
  'Cache-Control': 'private, no-store, max-age=0',
  'CDN-Cache-Control': 'no-store',
  'Vercel-CDN-Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
  'Referrer-Policy': 'no-referrer',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
}
const digest = value => createHash('sha256').update(value).digest()
const same = (left, right) => timingSafeEqual(digest(left), digest(right))
const sign = (data, key) => createHmac('sha256', key).update(`moira-rrss:${data}`).digest('base64url')
const result = (body, status = 200, extra = {}) => new Response(body, { status, headers: { ...HEADERS, ...extra } })
const denied = () => result('Not found', 404)

function resourceFor(url) {
  // Vercel rewrites suministra resource; en desarrollo se utiliza la ruta real.
  let resource = url.searchParams.get('resource')
  if (resource === null) resource = url.pathname.startsWith('/srr') ? url.pathname.slice(4) : ''
  try { resource = decodeURIComponent(resource) } catch { return null }
  resource = resource.replace(/^\/+/, '')
  if (!resource) return '00_EMPIEZA_AQUI.html'
  if (resource.includes('\\') || resource.includes('\0') || resource.split('/').some(part => part === '..' || part === '.' || part === '')) return null
  return resource
}
function validSession(cookie, name, key, now) {
  const value = cookie.split(';').map(part => part.trim()).find(part => part.startsWith(`${name}=`))?.slice(name.length + 1)
  if (!value || value.length > 160) return false
  const [version, expiry, signature, ...extra] = value.split('.')
  if (version !== 'v1' || extra.length || !/^\d{10,12}$/.test(expiry) || !signature) return false
  const expires = Number(expiry)
  if (expires <= now || expires > now + MAX_AGE) return false
  return same(signature, sign(`${version}.${expiry}`, key))
}

export function createRrssHandler({ getKey = () => process.env.RRSS_ACCESS_KEY, archive = ARCHIVE, now = () => Math.floor(Date.now() / 1000), secureCookies = true } = {}) {
  let archiveBytes
  const cookieName = secureCookies ? '__Host-moira_rrss' : 'moira_rrss_dev'
  return async function handleRrss(request) {
    const url = new URL(request.url)
    const key = getKey()
    if (!key || key.length > 1024) return denied()
    const suppliedKey = url.searchParams.get('key')
    if (suppliedKey !== null) {
      if (!['GET', 'HEAD'].includes(request.method) || suppliedKey.length > 1024 || !same(suppliedKey, key)) return denied()
      const expiry = String(now() + MAX_AGE)
      const session = `v1.${expiry}.${sign(`v1.${expiry}`, key)}`
      // Retirar la clave de la URL antes de cargar HTML, imágenes o enlaces externos.
      const destination = url.pathname.startsWith('/api/') || ['/srr', '/srr/'].includes(url.pathname) ? '/srr/00_EMPIEZA_AQUI' : url.pathname
      return result(null, 303, {
        Location: destination,
        'Set-Cookie': `${cookieName}=${session}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${MAX_AGE}${secureCookies ? '; Secure' : ''}`,
      })
    }
    if (!validSession(request.headers.get('cookie') || '', cookieName, key, now())) return denied()
    if (!['GET', 'HEAD'].includes(request.method)) return result('Method not allowed', 405, { Allow: 'GET, HEAD' })
    if (['/srr', '/srr/'].includes(url.pathname)) return result(null, 303, { Location: '/srr/00_EMPIEZA_AQUI' })
    let resource = resourceFor(url)
    if (!resource) return denied()
    // cleanUrls de Vercel elimina .html; aceptar ambos enlaces.
    if (!extname(resource)) resource += '.html'
    try {
      if (resource === 'PACK_PUBLICACION.zip') {
        await stat(archive)
        // Transmitir el ZIP por streaming: el pack supera 4,5 MB.
        return result(request.method === 'HEAD' ? null : Readable.toWeb(createReadStream(archive)), 200, {
          'Content-Type': 'application/zip', 'Content-Disposition': 'attachment; filename="MoiraOrdo_Instagram.zip"',
        })
      }
      if (!MIME[extname(resource).toLowerCase()]) return denied()
      archiveBytes ||= await readFile(archive)
      const files = unzipSync(archiveBytes, { filter: entry => entry.name === resource && entry.originalSize < 4_400_000 })
      const file = files[resource]
      if (!file) return denied()
      return result(request.method === 'HEAD' ? null : file, 200, {
        'Content-Type': MIME[extname(resource).toLowerCase()],
        'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'",
      })
    } catch {
      // No registrar query, cookies, claves ni datos del contenido privado.
      return result('Content unavailable', 503)
    }
  }
}
