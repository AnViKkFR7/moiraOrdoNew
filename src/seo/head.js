import { SITE, absoluteUrl } from './site'
import { SERVICES } from '../data/services'
import { ENTITY } from '../data/entity'

/*
  Etiquetas <head> de cada página. La misma función sirve para el HTML
  pregenerado en el build (headToHtml) y para actualizar el <head> al
  navegar en el cliente (applyHead), así nunca divergen.

  Datos estructurados: un solo @graph por página con entidades enlazadas por @id
  (organización, web, página, migas de pan, servicios, artículo, FAQ…). Los asistentes de IA
  y los buscadores resuelven así quién es Moira Ordo sin ambigüedad.
*/

const ORG_ID = `${SITE.url}/#organization`
const SITE_ID = `${SITE.url}/#website`
const personId = (name) => `${SITE.url}/sobre-nosotros#${name.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]+/g, '-')}`

const AREA_SERVED = [
  { '@type': 'Country', name: 'España' },
  { '@type': 'AdministrativeArea', name: 'Cataluña' },
]

const organization = {
  '@type': 'ProfessionalService',
  '@id': ORG_ID,
  name: SITE.name,
  alternateName: ENTITY.alternateName,
  url: SITE.url,
  logo: { '@type': 'ImageObject', url: absoluteUrl('/icons/icon-512.png'), width: 512, height: 512 },
  image: absoluteUrl('/og/inicio.png'),
  email: SITE.email,
  description: ENTITY.description,
  slogan: 'Webs a medida y CRM para empresas',
  address: {
    '@type': 'PostalAddress',
    addressLocality: SITE.locality,
    addressRegion: SITE.region,
    addressCountry: SITE.country,
  },
  areaServed: AREA_SERVED,
  knowsAbout: ENTITY.knowsAbout,
  knowsLanguage: 'es',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: SITE.email,
    availableLanguage: ['es'],
    areaServed: 'ES',
  },
}

const personNodes = () =>
  ENTITY.team.map((p) => ({
    '@type': 'Person',
    '@id': personId(p.name),
    name: p.name,
    jobTitle: p.jobTitle,
    description: p.description,
    worksFor: { '@id': ORG_ID },
    sameAs: p.sameAs,
  }))

function serviceSchema(service, extra = {}) {
  const node = {
    '@type': 'Service',
    '@id': `${SITE.url}/servicios/${service.slug}#service`,
    name: service.name,
    description: service.seoDescription,
    url: absoluteUrl(`/servicios/${service.slug}`),
    provider: { '@id': ORG_ID },
    areaServed: AREA_SERVED,
    ...extra,
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

const faqNode = (items, url) => ({
  '@type': 'FAQPage',
  '@id': `${url}#faq`,
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
})

const CRM_FEATURES = [
  'Gestión de contenido propio de cada empresa (items y atributos configurables)',
  'Blog con flujo de creación, edición y publicación',
  'Solicitudes de la web con origen y atribución',
  'Contactos y pipeline con etapas comerciales configurables',
  'Presupuestos y facturación',
  'Planning con tareas',
  'Analítica web sin cookies',
  'Usuarios y roles (administrador, editor y solo lectura) por empresa',
  'Multiempresa: varias empresas en una sola cuenta sin mezclar su información',
]

const PAGE_TYPE = {
  about: 'AboutPage',
  contact: 'ContactPage',
  collection: 'CollectionPage',
  serviceCatalog: 'CollectionPage',
}

function structuredData(route) {
  const url = absoluteUrl(route.path)
  const image = { '@type': 'ImageObject', url: absoluteUrl(`/og/${route.og}.png`), width: 1200, height: 630 }
  const graph = [organization]

  graph.push({
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: SITE.url,
    name: SITE.name,
    inLanguage: SITE.lang,
    publisher: { '@id': ORG_ID },
  })

  const page = {
    '@type': PAGE_TYPE[route.schema] ?? 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: route.title,
    description: route.description,
    inLanguage: SITE.lang,
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
    primaryImageOfPage: image,
  }
  if (route.modified) page.dateModified = route.modified
  if (route.breadcrumbs) page.breadcrumb = { '@id': `${url}#breadcrumb` }
  graph.push(page)

  if (route.breadcrumbs) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: route.breadcrumbs.map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.path),
      })),
    })
  }

  if (route.schema === 'about') {
    // Nodos parciales con el mismo @id: se fusionan con la organización
    graph.push(...personNodes(), { '@id': ORG_ID, employee: ENTITY.team.map((p) => ({ '@id': personId(p.name) })) })
  }

  if (route.schema === 'serviceCatalog') {
    graph.push({ '@id': ORG_ID, makesOffer: SERVICES.map((s) => ({ '@id': `${SITE.url}/servicios/${s.slug}#service` })) })
    graph.push({
      '@type': 'OfferCatalog',
      '@id': `${SITE.url}/servicios#catalog`,
      name: 'Servicios de Moira Ordo',
      itemListElement: SERVICES.map((s) => serviceSchema(s)),
    })
  }

  if (route.schema === 'collection' && route.items) {
    page.mainEntity = {
      '@type': 'ItemList',
      itemListElement: route.items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        url: absoluteUrl(item.path),
      })),
    }
  }

  if (route.schema === 'software') {
    graph.push({
      '@type': 'SoftwareApplication',
      '@id': `${SITE.url}/crm#software`,
      name: 'CRM de Moira Ordo',
      url: absoluteUrl('/crm'),
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Panel de administración multiempresa para gestionar el contenido de una web, las solicitudes, los contactos, los presupuestos, la facturación, el planning y la analítica.',
      featureList: CRM_FEATURES,
      inLanguage: SITE.lang,
      provider: { '@id': ORG_ID },
      creator: { '@id': ORG_ID },
    })
  }

  if (route.service) graph.push(serviceSchema(route.service))

  if (route.sector) {
    graph.push({
      '@type': 'Service',
      '@id': `${url}#service`,
      name: route.sector.title,
      serviceType: route.sector.name,
      description: route.sector.seoDescription,
      url,
      provider: { '@id': ORG_ID },
      areaServed: AREA_SERVED,
      audience: { '@type': 'Audience', audienceType: route.sector.name },
    })
  }

  if (route.project) {
    graph.push({
      '@type': 'CreativeWork',
      '@id': `${url}#work`,
      name: route.project.name,
      description: route.project.summary,
      url: route.project.url,
      genre: route.project.sector,
      keywords: route.project.tags.join(', '),
      creator: { '@id': ORG_ID },
      inLanguage: SITE.lang,
    })
  }

  if (route.guide) {
    const g = route.guide
    graph.push({
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: g.title,
      description: g.description,
      articleSection: g.category,
      keywords: g.keywords.join(', '),
      datePublished: g.published,
      dateModified: g.updated,
      inLanguage: SITE.lang,
      image,
      author: { '@id': ORG_ID },
      publisher: { '@id': ORG_ID },
      mainEntityOfPage: { '@id': `${url}#webpage` },
    })
  }

  if (route.location) {
    graph.push({
      '@type': 'Service',
      '@id': `${url}#service`,
      name: route.location.headline,
      description: route.location.seoDescription,
      url,
      provider: { '@id': ORG_ID },
      areaServed: { '@type': 'City', name: route.location.place },
    })
  }

  if (route.faq?.length) graph.push(faqNode(route.faq, url))
  if (route.service?.faq?.length) graph.push(faqNode(route.service.faq, url))

  return { '@context': 'https://schema.org', '@graph': graph }
}

/** Páginas que tienen versión en Markdown (la genera scripts/prerender.mjs). */
export const hasMarkdown = (route) => !route.noindex && route.path !== '/404' && (route.priority ?? 0) >= 0.5

export function buildHead(route, { indexable = true } = {}) {
  const url = absoluteUrl(route.path === '/404' ? '/' : route.path)
  const image = absoluteUrl(`/og/${route.og}.png`)
  const robots =
    !indexable || route.noindex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  const isArticle = Boolean(route.guide)

  const tags = [
    { tag: 'meta', attrs: { name: 'description', content: route.description } },
    { tag: 'meta', attrs: { name: 'robots', content: robots } },
    { tag: 'meta', attrs: { property: 'og:type', content: isArticle ? 'article' : 'website' } },
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

  if (isArticle) {
    tags.push(
      { tag: 'meta', attrs: { property: 'article:published_time', content: route.guide.published } },
      { tag: 'meta', attrs: { property: 'article:modified_time', content: route.guide.updated } },
      { tag: 'meta', attrs: { property: 'article:section', content: route.guide.category } },
    )
  }

  if (!route.noindex) {
    tags.push(
      { tag: 'meta', attrs: { property: 'og:url', content: url } },
      { tag: 'link', attrs: { rel: 'canonical', href: url } },
      { tag: 'link', attrs: { rel: 'alternate', hreflang: SITE.lang, href: url } },
      { tag: 'link', attrs: { rel: 'alternate', hreflang: 'x-default', href: url } },
    )
    if (hasMarkdown(route)) {
      // Versión limpia en Markdown para asistentes de IA (ver llms.txt)
      tags.push({
        tag: 'link',
        attrs: { rel: 'alternate', type: 'text/markdown', href: route.path === '/' ? `${SITE.url}/index.md` : `${url}.md` },
      })
    }
    tags.push({
      tag: 'script',
      attrs: { type: 'application/ld+json' },
      text: JSON.stringify(structuredData(route)),
    })
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
