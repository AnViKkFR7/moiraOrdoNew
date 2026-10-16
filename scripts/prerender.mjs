// Tras `vite build` (cliente) y `vite build --ssr` (servidor): escribe un HTML
// completo por página pública, la 404, sitemap.xml, robots.txt y llms.txt.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js')

const { render, routes, notFoundPath, services, site, indexable } = await import(pathToFileURL(ssrEntry).href)

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const headPattern = /<!--app-head-->[\s\S]*?<!--\/app-head-->/

function page(urlPath) {
  const { html, head } = render(urlPath)
  return template.replace(headPattern, head).replace('<!--app-html-->', html)
}

// "/" -> index.html, "/servicios" -> servicios.html (Vercel cleanUrls lo sirve sin .html)
function fileFor(urlPath) {
  return urlPath === '/' ? 'index.html' : `${urlPath.slice(1)}.html`
}

for (const route of routes) {
  const file = path.join(dist, fileFor(route.path))
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, page(route.path))
}

fs.writeFileSync(path.join(dist, '404.html'), page(notFoundPath))

const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routes
  .map((route) => {
    const loc = route.path === '/' ? site.url : `${site.url}${route.path}`
    return `  <url>
    <loc>${loc}</loc>
    <xhtml:link rel="alternate" hreflang="${site.lang}" href="${loc}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}" />
    <lastmod>${today}</lastmod>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`
  })
  .join('\n')}
</urlset>
`
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap)

// Producción: se permite todo, también a los bots de IA. Previews/local: se bloquea todo.
const robots = indexable
  ? `User-agent: *
Allow: /

# Bots de IA permitidos explícitamente
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${site.url}/sitemap.xml
`
  : `User-agent: *
Disallow: /
`
fs.writeFileSync(path.join(dist, 'robots.txt'), robots)

const pageLine = (route) => `- [${route.title}](${route.path === '/' ? site.url : site.url + route.path}): ${route.description}`
const llms = `# ${site.name}

> Estudio de diseño y desarrollo web en ${site.locality} (España). Hacemos webs a medida conectadas a nuestro CRM —el cliente gestiona el contenido sin tocar el diseño—, software a medida y juegos HTML5 (Moira Ordo Games). Contacto: ${site.email}.

## Páginas principales

${routes.filter((r) => r.priority >= 0.7 && !r.path.startsWith('/servicios/')).map(pageLine).join('\n')}

## Servicios

${services
  .map(
    (s) =>
      `- [${s.name}](${site.url}/servicios/${s.slug}): ${s.summary} ${s.priceFrom ? `Desde ${s.priceFrom} €.` : 'Presupuesto a medida.'}`,
  )
  .join('\n')}

## Legal

${routes.filter((r) => r.priority < 0.5).map(pageLine).join('\n')}
`
fs.writeFileSync(path.join(dist, 'llms.txt'), llms)

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`Prerender: ${routes.length} páginas + 404 · indexable=${indexable}`)
