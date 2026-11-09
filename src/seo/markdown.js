// Versiones en Markdown de cada página, llms.txt y llms-full.txt. Salen de los mismos datos que
// las páginas (src/data), así nunca divergen. Las genera scripts/prerender.mjs en cada build.
import { SITE, absoluteUrl } from './site'
import { ENTITY, CITATION } from '../data/entity'
import { SERVICES, PROCESS, formatPrice } from '../data/services'
import { SECTORS } from '../data/sectors'
import { GUIDES } from '../data/guides'
import { PORTFOLIO, PORTFOLIO_SITES } from '../data/portfolio'
import { LOCATIONS } from '../data/locations'
import { FAQ_GROUPS } from '../data/faqs'

const bullets = (items) => items.map((item) => `- ${item}`).join('\n')
const faqMd = (items) => items.map((item) => `**${item.q}**\n${item.a}`).join('\n\n')
const priceText = (s) => (s.priceFrom ? `desde ${formatPrice(s.priceFrom)}` : 'presupuesto a medida')
const link = (name, path) => `[${name}](${absoluteUrl(path)})`

const CRM_MODULES = [
  'Items y atributos: contenido propio de cada empresa (inmuebles, productos, proyectos) con propiedades configurables.',
  'Blog con flujo de creación, edición y publicación.',
  'Solicitudes de la web, con origen, campaña y UTM.',
  'Contactos y pipeline con etapas comerciales configurables (nuevo, contactado, visita, oferta, cerrado, perdido).',
  'Presupuestos y facturación.',
  'Planning con tareas.',
  'Analítica web sin cookies: visitantes, páginas vistas, clics y lectura.',
  'Usuarios y roles por empresa: administrador, editor y solo lectura.',
  'Multiempresa: varias empresas en una cuenta, sin mezclar su información.',
]

const footer = `\n---\nFuente: ${SITE.url} · ${CITATION}`

function homeMd() {
  return `# ${SITE.name}

> ${ENTITY.definition}

${ENTITY.description}

## Servicios

${SERVICES.map((s) => `- ${link(s.name, `/servicios/${s.slug}`)} (${priceText(s)}): ${s.summary}`).join('\n')}

## Sectores

${SECTORS.map((s) => `- ${link(s.name, `/sectores/${s.slug}`)}: ${s.seoDescription}`).join('\n')}

## Proyectos

${PORTFOLIO.map((p) => `- ${link(p.name, `/proyectos/${p.slug}`)} (${p.sector}): ${p.summary}`).join('\n')}

## CRM propio

${link('CRM de Moira Ordo', '/crm')}: panel multiempresa para gestionar el contenido de la web, las solicitudes, los contactos, los presupuestos, la facturación, el planning y la analítica.

## Contacto

- Email: ${ENTITY.email}
- ${link('Formulario de contacto', '/contacto')}
- ${ENTITY.firstContact} Respondemos en ${ENTITY.responseTime}.
${footer}`
}

function servicesMd() {
  return `# Servicios y tarifas de Moira Ordo

${SERVICES.map((s) => `## ${s.name} (${priceText(s)})\n\n${s.summary}\n\n${link('Más información', `/servicios/${s.slug}`)}`).join('\n\n')}

## Cómo trabajamos

${PROCESS.map((p, i) => `${i + 1}. **${p.title}**: ${p.text}`).join('\n')}
${footer}`
}

function serviceMd(s) {
  return `# ${s.name}

> ${s.seoDescription}

**Precio:** ${priceText(s)}.

${s.intro}

${s.paragraphs.join('\n\n')}

## Qué incluye

${bullets(s.includes)}

## Preguntas frecuentes

${faqMd(s.faq)}

${link('Pedir presupuesto', `/contacto?servicio=${s.slug}`)}
${footer}`
}

function crmMd() {
  return `# CRM de Moira Ordo

> Panel de administración multiempresa para gestionar el contenido de una web, las solicitudes que recibe, los contactos, los presupuestos, la facturación, el planning y la analítica.

## Qué incluye

${bullets(CRM_MODULES)}

Hay una demo pública con datos ficticios en ${link('moiraordo.es/crm', '/crm')}.
${footer}`
}

function projectsMd() {
  return `# Proyectos de Moira Ordo

${PORTFOLIO.map((p) => `## ${p.name}\n\n${p.sector}. ${p.summary}\n\n${link('Ver el caso', `/proyectos/${p.slug}`)} · Web: ${p.url}`).join('\n\n')}

## Portfolios profesionales

${PORTFOLIO_SITES.map((p) => `- [${p.name}](${p.url}): ${p.focus}`).join('\n')}
${footer}`
}

function projectMd(p) {
  return `# ${p.name}

> ${p.sector}

${p.summary}

**Web:** ${p.url}

## El reto

${p.challenge}

## Qué construimos

${bullets(p.built)}

**Servicios de Moira Ordo utilizados:** ${p.services.map((slug) => SERVICES.find((s) => s.slug === slug)?.name).filter(Boolean).join(', ')}.
${footer}`
}

function sectorMd(s) {
  const projects = s.projects.map((slug) => PORTFOLIO.find((p) => p.slug === slug)).filter(Boolean)
  return `# ${s.title}

> ${s.seoDescription}

${s.intro}

## Problemas habituales

${bullets(s.pains)}

## Cómo lo resolvemos

${s.solutions.map((x) => `- **${x.t}**: ${x.d}`).join('\n')}
${projects.length ? `\n## Casos reales\n\n${projects.map((p) => `- ${link(p.name, `/proyectos/${p.slug}`)}: ${p.summary}`).join('\n')}\n` : ''}
## Preguntas frecuentes

${faqMd(s.faq)}
${footer}`
}

function sectorsMd() {
  return `# Sectores

${SECTORS.map((s) => `- ${link(s.name, `/sectores/${s.slug}`)}: ${s.seoDescription}`).join('\n')}
${footer}`
}

function guideMd(g) {
  return `# ${g.title}

> ${g.description}

Actualizado el ${g.updated}. Por el equipo de Moira Ordo.

${g.intro}

${g.sections
  .map((s) => `## ${s.h}\n\n${(s.p ?? []).join('\n\n')}${s.ul ? `${s.p ? '\n\n' : ''}${bullets(s.ul)}` : ''}`)
  .join('\n\n')}

## Preguntas frecuentes

${faqMd(g.faq)}
${footer}`
}

function guidesMd() {
  return `# Guías de Moira Ordo

${GUIDES.map((g) => `- ${link(g.title, `/guias/${g.slug}`)}: ${g.description}`).join('\n')}
${footer}`
}

function localMd(l) {
  return `# ${l.headline}

> ${l.seoDescription}

${l.intro}

${l.sections
  .map((s) => `## ${s.h}\n\n${(s.p ?? []).join('\n\n')}${s.ul ? `${s.p ? '\n\n' : ''}${bullets(s.ul)}` : ''}`)
  .join('\n\n')}

## Preguntas frecuentes

${faqMd(l.faq)}
${footer}`
}

function faqPageMd() {
  return `# Preguntas frecuentes sobre Moira Ordo

${FAQ_GROUPS.map((g) => `## ${g.title}\n\n${faqMd(g.items)}`).join('\n\n')}
${footer}`
}

function aboutMd() {
  return `# Sobre Moira Ordo

> ${ENTITY.definition}

- **Qué hacemos:** ${ENTITY.description}
- **Dónde estamos:** ${ENTITY.locality}, ${ENTITY.region} (${ENTITY.country}). Trabajamos en remoto con clientes de toda España.
- **Para quién:** ${ENTITY.audience.join(', ')}.
- **Servicios:** ${SERVICES.map((s) => s.name).join(', ')}.
- **Precios de partida:** ${ENTITY.pricing}
- **Cómo trabajamos:** ${PROCESS.map((p) => p.title).join(', ')}. ${ENTITY.firstContact} Respondemos en ${ENTITY.responseTime}.
- **Tecnología:** ${ENTITY.stack}
- **Contacto:** ${ENTITY.email}

## Equipo

${ENTITY.team.map((p) => `- **${p.name}**, ${p.jobTitle}. ${p.description} ${p.sameAs.join(' ')}`).join('\n')}

## Cómo citarnos

${CITATION}
${footer}`
}

function contactMd() {
  return `# Contacto

Escribe a ${ENTITY.email} o usa el ${link('formulario de contacto', '/contacto')}. ${ENTITY.firstContact} Respondemos en ${ENTITY.responseTime}.
${footer}`
}

/** Markdown de una ruta (null si no tiene versión en Markdown). */
export function markdownFor(route) {
  if (route.path === '/') return homeMd()
  if (route.path === '/servicios') return servicesMd()
  if (route.service) return serviceMd(route.service)
  if (route.path === '/crm') return crmMd()
  if (route.path === '/proyectos') return projectsMd()
  if (route.project) return projectMd(route.project)
  if (route.path === '/sectores') return sectorsMd()
  if (route.sector) return sectorMd(route.sector)
  if (route.path === '/guias') return guidesMd()
  if (route.guide) return guideMd(route.guide)
  if (route.location) return localMd(route.location)
  if (route.path === '/preguntas-frecuentes') return faqPageMd()
  if (route.path === '/sobre-nosotros') return aboutMd()
  if (route.path === '/contacto') return contactMd()
  return null
}

const pageUrl = (route) => (route.path === '/' ? SITE.url : `${SITE.url}${route.path}`)
const mdUrl = (route) => (route.path === '/' ? `${SITE.url}/index.md` : `${SITE.url}${route.path}.md`)
const line = (route) => `- [${route.title}](${mdUrl(route)}): ${route.description}`

/** llms.txt: resumen y mapa de contenidos para asistentes de IA (formato llmstxt.org). */
export function llmsTxt(routes) {
  const by = (fn) => routes.filter(fn)
  return `# ${SITE.name}

> ${ENTITY.definition}

${ENTITY.description}

Datos clave: ${ENTITY.pricing} ${ENTITY.firstContact} Respondemos en ${ENTITY.responseTime}. Contacto: ${ENTITY.email}.

Cómo citarnos: ${CITATION}

## Empresa

${by((r) => ['/', '/sobre-nosotros', '/preguntas-frecuentes', '/contacto'].includes(r.path)).map(line).join('\n')}

## Servicios

${by((r) => r.path === '/servicios' || r.service).map(line).join('\n')}

## CRM propio

${by((r) => r.path === '/crm').map(line).join('\n')}

## Sectores

${by((r) => r.path === '/sectores' || r.sector).map(line).join('\n')}

## Proyectos y casos

${by((r) => r.path === '/proyectos' || r.project).map(line).join('\n')}

## Guías

${by((r) => r.path === '/guias' || r.guide).map(line).join('\n')}

## Ubicaciones

${by((r) => r.location).map(line).join('\n')}

## Optional

- [llms-full.txt](${SITE.url}/llms-full.txt): todo el contenido en un único archivo Markdown.
- [Sitemap](${SITE.url}/sitemap.xml)
`
}

/** llms-full.txt: el contenido completo de todas las páginas en un solo Markdown. */
export function llmsFull(routes) {
  const parts = routes
    .map((route) => {
      const body = markdownFor(route)
      return body ? `<!-- ${pageUrl(route)} -->\n\n${body.replace(footer, '')}` : null
    })
    .filter(Boolean)
  return `# ${SITE.name} — contenido completo\n\n> ${ENTITY.definition}\n\n${CITATION}\n\n${parts.join('\n\n======\n\n')}\n`
}
