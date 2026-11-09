// Tras `vite build` (cliente) y `vite build --ssr` (servidor): escribe un HTML
// completo por página pública, la 404, sitemap.xml, robots.txt y llms.txt.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js')

const { render, routes, notFoundPath, site, indexable, markdownPages, llms, ogPages } = await import(pathToFileURL(ssrEntry).href)

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

// Sitemap (protocolo sitemaps.org): <loc> y, solo cuando la página declara una fecha real de
// modificación, <lastmod>. Google ignora priority/changefreq y desconfía de lastmod falsos
// (p. ej. la fecha del build en todas las URLs), así que no se inventa.
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => {
    const loc = route.path === '/' ? site.url : `${site.url}${route.path}`
    return `  <url>
    <loc>${loc}</loc>${route.modified ? `
    <lastmod>${route.modified}</lastmod>` : ''}
  </url>`
  })
  .join('\n')}
</urlset>
`
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap)

// Producción: se permite todo, también a los bots de IA. Previews/local: se bloquea todo.
// Se permiten explícitamente los rastreadores de búsqueda y citación (los que alimentan las
// respuestas de ChatGPT, Claude, Perplexity, Gemini, Copilot y Apple) y los de entrenamiento.
// Si algún día se quiere no participar en el entrenamiento, bastaría con poner «Disallow: /»
// en GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot y Meta-ExternalAgent.
const AI_BOTS = [
  ['OpenAI', ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User']],
  ['Anthropic', ['ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'anthropic-ai']],
  ['Perplexity', ['PerplexityBot', 'Perplexity-User']],
  ['Google', ['Google-Extended', 'GoogleOther']],
  ['Microsoft y Bing', ['Bingbot']],
  ['Apple', ['Applebot', 'Applebot-Extended']],
  ['Amazon', ['Amazonbot']],
  ['Meta', ['Meta-ExternalAgent', 'FacebookBot']],
  ['DuckDuckGo', ['DuckAssistBot']],
  ['Mistral y Cohere', ['MistralAI-User', 'cohere-ai']],
  ['Otros', ['YouBot', 'CCBot']],
]
const robots = indexable
  ? `User-agent: *
Allow: /

# Bots de IA permitidos explícitamente
${AI_BOTS.map(
  ([owner, bots]) => `# ${owner}
${bots.map((bot) => `User-agent: ${bot}
Allow: /
`).join('\n')}`,
).join('\n')}
Sitemap: ${site.url}/sitemap.xml
`
  : `User-agent: *
Disallow: /
`
fs.writeFileSync(path.join(dist, 'robots.txt'), robots)

// Para asistentes de IA: llms.txt (resumen y mapa), llms-full.txt (todo el contenido) y una
// versión en Markdown de cada página (/servicios/diseno-web.md, /index.md…).
fs.writeFileSync(path.join(dist, 'llms.txt'), llms.txt)
fs.writeFileSync(path.join(dist, 'llms-full.txt'), llms.full)
for (const { path: urlPath, markdown } of markdownPages) {
  const file = path.join(dist, urlPath === '/' ? 'index.md' : `${urlPath.slice(1)}.md`)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, markdown)
}

// Lista de páginas para las imágenes Open Graph (scripts/og/generar_og.py)
fs.mkdirSync(path.join(root, 'scripts', 'og'), { recursive: true })
fs.writeFileSync(path.join(root, 'scripts', 'og', 'pages.json'), `${JSON.stringify(ogPages, null, 2)}
`)

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`Prerender: ${routes.length} páginas + 404 + ${markdownPages.length} versiones .md · indexable=${indexable}`)
