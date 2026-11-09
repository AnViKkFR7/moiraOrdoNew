import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import { setServerPathname } from './router'
import { ROUTES, NOT_FOUND, findRoute } from './routes'
import { buildHead, headToHtml } from './seo/head'
import { SERVICES } from './data/services'
import { SITE } from './seo/site'
import { markdownFor, llmsTxt, llmsFull } from './seo/markdown'
import { hasMarkdown } from './seo/head'

/* global __SITE_INDEXABLE__ */

// Lo usa scripts/prerender.mjs para escribir un HTML completo por página.
export function render(path) {
  setServerPathname(path)
  const route = findRoute(path)
  const html = renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
  const head = headToHtml(buildHead(route, { indexable: __SITE_INDEXABLE__ }))
  return { html, head }
}

export const routes = ROUTES.map(({ path, title, description, priority, modified }) => ({
  path,
  title,
  description,
  priority,
  modified,
}))

// Markdown por página, llms.txt y llms-full.txt para asistentes de IA (scripts/prerender.mjs los escribe)
const markdownRoutes = ROUTES.filter(hasMarkdown)
export const markdownPages = markdownRoutes
  .map((route) => ({ path: route.path, markdown: markdownFor(route) }))
  .filter((page) => page.markdown)
export const llms = { txt: llmsTxt(markdownRoutes), full: llmsFull(markdownRoutes) }
// Lista para scripts/og/generar_og.py: una imagen 1200×630 por página que aún no tenga la suya.
const strip = (title) => title.replace(/ \| Moira Ordo$/, '')
export const ogPages = ROUTES.map((route) => {
  let kicker = 'Moira Ordo'
  let headline = strip(route.title)
  let foot = route.path === '/' ? 'moiraordo.es' : `moiraordo.es${route.path}`
  if (route.sector) { kicker = 'Sector'; headline = route.sector.title; foot = 'Webs y software a medida' }
  if (route.project) { kicker = `Proyecto · ${route.project.name}`; headline = route.project.headline; foot = route.project.sector }
  if (route.guide) { kicker = 'Guía'; headline = route.guide.title; foot = `${route.guide.category} · ${route.guide.readMinutes} min de lectura` }
  if (route.location) { kicker = route.location.place; headline = route.location.headline; foot = 'Webs a medida con CRM propio' }
  if (route.path === '/sectores') { kicker = 'Sectores'; headline = 'Webs y software para cada sector'; foot = 'Inmobiliarias, reformas, transfers y más' }
  if (route.path === '/guias') { kicker = 'Guías'; headline = 'Guías para decidir mejor tu web'; foot = 'Precios, CRM, SEO y SEO para IA' }
  if (route.path === '/preguntas-frecuentes') { kicker = 'Preguntas frecuentes'; headline = 'Todo lo que suelen preguntarnos'; foot = 'Precios, CRM, SEO y proceso' }
  if (route.path === '/sobre-nosotros') { kicker = 'Sobre nosotros'; headline = 'Quiénes somos'; foot = 'Vilanova i la Geltrú · Barcelona' }
  return { og: route.og, kicker, headline, foot }
})
export const notFoundPath = NOT_FOUND.path
export const services = SERVICES
export const site = SITE
export const indexable = __SITE_INDEXABLE__
