// Datos globales del sitio para SEO. Dominio canónico: sin www, https, sin barra final.
export const SITE = {
  url: 'https://moiraordo.es',
  name: 'Moira Ordo',
  lang: 'es',
  locale: 'es_ES',
  email: 'info@moiraordo.es',
  themeColor: '#fcfbf7',
  locality: 'Vilanova i la Geltrú',
  region: 'Barcelona',
  country: 'ES',
}

export const absoluteUrl = (path = '/') => (path === '/' ? SITE.url : `${SITE.url}${path}`)
