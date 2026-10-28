import { loadEnv } from 'vite'
import { Readable } from 'node:stream'
import { createRrssHandler } from './rrss.js'

// Solo desarrollo. Las claves se leen en Node y no pasan al bundle de React.
export function rrssPreview() {
  return {
    name: 'rrss-private-preview',
    apply: 'serve',
    configureServer(server) {
      const env = loadEnv(server.config.mode, server.config.root, '')
      const handler = createRrssHandler({ getKey: () => process.env.RRSS_ACCESS_KEY || env.RRSS_ACCESS_KEY, secureCookies: false })
      server.middlewares.use(async (req, res, next) => {
        const path = (req.url || '').split('?')[0]
        if (!(path === '/srr' || path.startsWith('/srr/') || path === '/api/srr')) return next()
        try {
          const headers = new Headers()
          for (const [key, value] of Object.entries(req.headers)) if (value) headers.set(key, Array.isArray(value) ? value.join(', ') : value)
          const request = new Request(`http://${req.headers.host || 'localhost'}${req.url}`, { method: req.method, headers })
          const response = await handler(request)
          res.statusCode = response.status
          response.headers.forEach((value, key) => res.setHeader(key, value))
          if (!response.body) return res.end()
          Readable.fromWeb(response.body).on('error', () => res.destroy()).pipe(res)
        } catch {
          res.statusCode = 503
          res.end('Content unavailable')
        }
      })
    },
  }
}
