import { SITE, absoluteUrl } from './site'
import { SERVICES } from '../data/services'

/*
  Etiquetas <head> de cada página. La misma función sirve para el HTML
  pregenerado en el build (headToHtml) y para actualizar el <head> al
  navegar en el cliente (applyHead), así nunca divergen.
*/

const organization = {
  '@type': 'ProfessionalService',
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  url: SITE.url,
  logo: absoluteUrl('/icons/icon-512.png'),
  image: absoluteUrl('/og/inicio.png'),
  email: SITE.email,
  description:
    'Estudio de diseño y desarrollo web: webs a medida conectadas a nuestro CRM, software a medida y juegos HTML5.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: SITE.locality,
    addressRegion: SITE.region,
    addressCountry: SITE.country,
  },
  areaServed: { '@type': 'Country', name: 'España' },
}

function serviceSchema(service) {
  const node = {
    '@type': 'Service',
    name: service.name,
    description: service.seoDescription,
    url: absoluteUrl(`/servicios/${service.slug}`),
    provider: { '@id': organization['@id'] },
    areaServed: { '@type': 'Country', name: 'España' },
  }
  if (service.priceFrom) {
    node.offers = {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: service.priceFrom,
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: service.priceFrom,
        priceCurrency: 'EUR',
      },
      url: absoluteUrl(`/contacto?servicio=${service.slug}`),
    }
  }
  return node
}

function structuredData(route) {
  const graph = [organization]

  if (route.path === '/') {
    graph.push({
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      inLanguage: SITE.lang,
      publisher: { '@id': organization['@id'] },
    })
  }

  if (route.breadcrumbs) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: route.breadcrumbs.map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.path),
      })),
    })
  }

  if (route.schema === 'serviceCatalog') {
    graph.push({
      '@type': 'OfferCatalog',
      name: 'Servicios de Moira Ordo',
      itemListElement: SERVICES.map(serviceSchema),
    })
  }

  if (route.service) {
    graph.push(serviceSchema(route.service))
    graph.push({
      '@type': 'FAQPage',
      mainEntity: route.service.faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}

export function buildHead(route, { indexable = true } = {}) {
  const url = absoluteUrl(route.path === '/404' ? '/' : route.path)
  const image = absoluteUrl(`/og/${route.og}.png`)
  const robots = !indexable || route.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'

  const tags = [
    { tag: 'meta', attrs: { name: 'description', content: route.description } },
    { tag: 'meta', attrs: { name: 'robots', content: robots } },
    { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
    { tag: 'meta', attrs: { property: 'og:site_name', content: SITE.name } },
    { tag: 'meta', attrs: { property: 'og:locale', content: SITE.locale } },
    { tag: 'meta', attrs: { property: 'og:title', content: route.title } },
    { tag: 'meta', attrs: { property: 'og:description', content: route.description } },
    { tag: 'meta', attrs: { property: 'og:image', content: image } },
    { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
    { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
    { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
    { tag: 'meta', attrs: { name: 'twitter:title', content: route.title } },
    { tag: 'meta', attrs: { name: 'twitter:description', content: route.description } },
    { tag: 'meta', attrs: { name: 'twitter:image', content: image } },
  ]

  if (!route.noindex) {
    tags.push(
      { tag: 'meta', attrs: { property: 'og:url', content: url } },
      { tag: 'link', attrs: { rel: 'canonical', href: url } },
      { tag: 'link', attrs: { rel: 'alternate', hreflang: SITE.lang, href: url } },
      { tag: 'link', attrs: { rel: 'alternate', hreflang: 'x-default', href: url } },
      {
        tag: 'script',
        attrs: { type: 'application/ld+json' },
        text: JSON.stringify(structuredData(route)),
      },
    )
  }

  return { title: route.title, tags }
}

const escapeAttr = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export function headToHtml({ title, tags }) {
  const lines = [`<title>${escapeAttr(title)}</title>`]
  for (const { tag, attrs, text } of tags) {
    const attrString = Object.entries(attrs)
      .map(([key, value]) => `${key}="${escapeAttr(value)}"`)
      .join(' ')
    if (tag === 'script') {
      // "<" escapado para que el JSON no pueda cerrar la etiqueta
      lines.push(`<script ${attrString} data-seo>${text.replace(/</g, '\\u003c')}</script>`)
    } else {
      lines.push(`<${tag} ${attrString} data-seo />`)
    }
  }
  return lines.join('\n    ')
}

export function applyHead({ title, tags }) {
  document.title = title
  document.head.querySelectorAll('[data-seo]').forEach((el) => el.remove())
  for (const { tag, attrs, text } of tags) {
    const el = document.createElement(tag)
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value))
    el.setAttribute('data-seo', '')
    if (text) el.textContent = text
    document.head.appendChild(el)
  }
}
