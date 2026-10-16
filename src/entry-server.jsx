import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import { setServerPathname } from './router'
import { ROUTES, NOT_FOUND, findRoute } from './routes'
import { buildHead, headToHtml } from './seo/head'
import { SERVICES } from './data/services'
import { SITE } from './seo/site'

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

export const routes = ROUTES.map(({ path, title, description, priority }) => ({
  path,
  title,
  description,
  priority,
}))
export const notFoundPath = NOT_FOUND.path
export const services = SERVICES
export const site = SITE
export const indexable = __SITE_INDEXABLE__
