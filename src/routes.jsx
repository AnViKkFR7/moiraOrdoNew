import Home from './pages/Home'
import Services from './pages/Services/Services'
import Contact from './pages/Contact/Contact'
import Crm from './pages/Crm/Crm'
import Projects from './pages/Projects/Projects'
import Legal from './pages/Legal/Legal'
import ServicePage from './pages/ServicePage/ServicePage'
import NotFound from './pages/NotFound/NotFound'
import SectorPage from './pages/Seo/SectorPage'
import SectorsIndex from './pages/Seo/SectorsIndex'
import GuidePage from './pages/Seo/GuidePage'
import GuidesIndex from './pages/Seo/GuidesIndex'
import PortfolioPage from './pages/Seo/PortfolioPage'
import LocalPage from './pages/Seo/LocalPage'
import FaqPage from './pages/Seo/FaqPage'
import AboutPage from './pages/Seo/AboutPage'
import { SERVICES } from './data/services'
import { SECTORS } from './data/sectors'
import { GUIDES } from './data/guides'
import { PORTFOLIO } from './data/portfolio'
import { LOCATIONS } from './data/locations'
import { ALL_FAQS } from './data/faqs'

/*
  Registro único de páginas públicas: lo usan el router (App), el prerender
  del build (HTML por página), el sitemap y las etiquetas SEO.
  `og` = imagen 1200×630 en /public/og.
*/
const HOME = { name: 'Inicio', path: '/' }

export const ROUTES = [
  {
    path: '/',
    Component: Home,
    title: 'Moira Ordo — Webs a medida y CRM para empresas',
    description:
      'Consultora digital: diseñamos tu web a medida, la conectamos a un CRM que gestionas tú y nos encargamos de tu SEO y publicidad. También software y juegos HTML5.',
    og: 'inicio',
    priority: 1,
  },
  {
    path: '/proyectos',
    Component: Projects,
    title: 'Proyectos: webs, portfolios profesionales y juegos | Moira Ordo',
    description:
      'Webs a medida para empresas y portfolios profesionales de comunicación, ilustración y desarrollo, junto con juegos HTML5 como MusiBingo y MatchRise.',
    og: 'proyectos',
    breadcrumbs: [HOME, { name: 'Proyectos', path: '/proyectos' }],
    schema: 'collection',
    items: PORTFOLIO.map((p) => ({ name: p.name, path: `/proyectos/${p.slug}` })),
    priority: 0.8,
  },
  {
    path: '/crm',
    Component: Crm,
    title: 'CRM multiempresa para gestionar tu web | Moira Ordo',
    description:
      'Panel de administración multiempresa: items, atributos, usuarios, analítica sin cookies y planning con facturación. Prueba la demo interactiva.',
    og: 'crm',
    breadcrumbs: [HOME, { name: 'CRM', path: '/crm' }],
    schema: 'software',
    priority: 0.8,
  },
  {
    path: '/servicios',
    Component: Services,
    title: 'Servicios y tarifas de diseño y desarrollo web | Moira Ordo',
    description:
      'Diseño web desde 199 €, desarrollo web autogestionable desde 299 €, diseño de marca, software a medida y juegos HTML5. Presupuesto a medida.',
    og: 'servicios',
    breadcrumbs: [HOME, { name: 'Servicios', path: '/servicios' }],
    schema: 'serviceCatalog',
    priority: 0.9,
  },
  ...SERVICES.map((service) => ({
    path: `/servicios/${service.slug}`,
    Component: ServicePage,
    props: { slug: service.slug },
    title: `${service.seoTitle} | Moira Ordo`,
    description: service.seoDescription,
    og: `servicio-${service.slug}`,
    breadcrumbs: [
      HOME,
      { name: 'Servicios', path: '/servicios' },
      { name: service.name, path: `/servicios/${service.slug}` },
    ],
    service,
    priority: 0.8,
  })),
  // ── Cobertura SEO ampliada: sectores, casos, guías, preguntas, entidad y páginas locales ──
  {
    path: '/sectores',
    Component: SectorsIndex,
    title: 'Sectores: webs y software a medida | Moira Ordo',
    description:
      'Webs a medida y software para inmobiliarias, empresas de reformas, transfers y VTC, portfolios profesionales y negocios con catálogo.',
    og: 'sectores',
    breadcrumbs: [HOME, { name: 'Sectores', path: '/sectores' }],
    schema: 'collection',
    items: SECTORS.map((s) => ({ name: s.name, path: `/sectores/${s.slug}` })),
    priority: 0.8,
    modified: '2026-11-09',
  },
  ...SECTORS.map((sector) => ({
    path: `/sectores/${sector.slug}`,
    Component: SectorPage,
    props: { slug: sector.slug },
    title: `${sector.seoTitle} | Moira Ordo`,
    description: sector.seoDescription,
    og: `sector-${sector.slug}`,
    breadcrumbs: [HOME, { name: 'Sectores', path: '/sectores' }, { name: sector.name, path: `/sectores/${sector.slug}` }],
    schema: 'sector',
    sector,
    faq: sector.faq,
    priority: 0.8,
    modified: '2026-11-09',
  })),
  ...PORTFOLIO.map((project) => ({
    path: `/proyectos/${project.slug}`,
    Component: PortfolioPage,
    props: { slug: project.slug },
    title: `${project.seoTitle} | Moira Ordo`,
    description: project.seoDescription,
    og: `proyecto-${project.slug}`,
    breadcrumbs: [HOME, { name: 'Proyectos', path: '/proyectos' }, { name: project.name, path: `/proyectos/${project.slug}` }],
    schema: 'project',
    project,
    priority: 0.7,
    modified: '2026-11-09',
  })),
  {
    path: '/guias',
    Component: GuidesIndex,
    title: 'Guías de diseño web, CRM, SEO y SEO para IA | Moira Ordo',
    description:
      'Guías prácticas sobre cuánto cuesta una web, qué es un CRM, web a medida frente a plantilla, SEO técnico y local, analítica sin cookies y SEO para IA.',
    og: 'guias',
    breadcrumbs: [HOME, { name: 'Guías', path: '/guias' }],
    schema: 'collection',
    items: GUIDES.map((g) => ({ name: g.title, path: `/guias/${g.slug}` })),
    priority: 0.8,
    modified: '2026-11-09',
  },
  ...GUIDES.map((guide) => ({
    path: `/guias/${guide.slug}`,
    Component: GuidePage,
    props: { slug: guide.slug },
    title: `${guide.seoTitle} | Moira Ordo`,
    description: guide.description,
    og: `guia-${guide.slug}`,
    breadcrumbs: [HOME, { name: 'Guías', path: '/guias' }, { name: guide.title, path: `/guias/${guide.slug}` }],
    schema: 'article',
    guide,
    faq: guide.faq,
    priority: 0.7,
    modified: guide.updated,
  })),
  ...LOCATIONS.map((loc) => ({
    path: `/${loc.slug}`,
    Component: LocalPage,
    props: { slug: loc.slug },
    title: loc.seoTitle,
    description: loc.seoDescription,
    og: `local-${loc.slug}`,
    breadcrumbs: [HOME, { name: loc.place, path: `/${loc.slug}` }],
    schema: 'local',
    location: loc,
    faq: loc.faq,
    priority: 0.8,
    modified: '2026-11-09',
  })),
  {
    path: '/preguntas-frecuentes',
    Component: FaqPage,
    title: 'Preguntas frecuentes sobre webs a medida, CRM y SEO | Moira Ordo',
    description:
      'Respuestas directas sobre precios, CRM, SEO, analítica, proceso de trabajo y sectores: todo lo que suelen preguntarnos sobre Moira Ordo.',
    og: 'preguntas-frecuentes',
    breadcrumbs: [HOME, { name: 'Preguntas frecuentes', path: '/preguntas-frecuentes' }],
    schema: 'faq',
    faq: ALL_FAQS,
    priority: 0.7,
    modified: '2026-11-09',
  },
  {
    path: '/sobre-nosotros',
    Component: AboutPage,
    title: 'Sobre Moira Ordo: webs a medida con CRM en Vilanova',
    description:
      'Quiénes somos, dónde estamos y cómo trabajamos: Moira Ordo, consultora digital de Vilanova i la Geltrú (Barcelona) especializada en webs a medida con CRM propio.',
    og: 'sobre-nosotros',
    breadcrumbs: [HOME, { name: 'Sobre nosotros', path: '/sobre-nosotros' }],
    schema: 'about',
    priority: 0.6,
    modified: '2026-11-09',
  },
  {
    path: '/contacto',
    Component: Contact,
    title: 'Contacto — Pide presupuesto para tu web | Moira Ordo',
    description:
      'Cuéntanos tu proyecto: primera consulta gratuita y respuesta en menos de 24 horas.',
    og: 'contacto',
    breadcrumbs: [HOME, { name: 'Contacto', path: '/contacto' }],
    schema: 'contact',
    priority: 0.7,
  },
  ...[
    ['privacidad', 'Política de Privacidad'],
    ['aviso-legal', 'Aviso Legal'],
    ['cookies', 'Política de Cookies'],
  ].map(([slug, name]) => ({
    path: `/${slug}`,
    Component: Legal,
    props: { slug },
    title: `${name} | Moira Ordo`,
    description: `${name} de Moira Ordo: información legal sobre el uso de esta web y el tratamiento de datos.`,
    og: 'inicio',
    breadcrumbs: [HOME, { name, path: `/${slug}` }],
    priority: 0.2,
  })),
]

export const NOT_FOUND = {
  path: '/404',
  Component: NotFound,
  title: 'Página no encontrada | Moira Ordo',
  description: 'La página que buscas no existe.',
  og: 'inicio',
  noindex: true,
}

export function findRoute(pathname) {
  const clean = pathname.replace(/\/+$/, '') || '/'
  return ROUTES.find((route) => route.path === clean) ?? NOT_FOUND
}
