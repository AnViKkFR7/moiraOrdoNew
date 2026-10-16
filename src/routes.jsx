import Home from './pages/Home'
import Services from './pages/Services/Services'
import Contact from './pages/Contact/Contact'
import Crm from './pages/Crm/Crm'
import Projects from './pages/Projects/Projects'
import Legal from './pages/Legal/Legal'
import ServicePage from './pages/ServicePage/ServicePage'
import NotFound from './pages/NotFound/NotFound'
import { SERVICES } from './data/services'

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
      'Diseñamos y desarrollamos webs a medida conectadas a nuestro CRM: contenido que gestionas tú y un diseño que no se rompe. Webs para empresas y juegos HTML5.',
    og: 'inicio',
    priority: 1,
  },
  {
    path: '/proyectos',
    Component: Projects,
    title: 'Proyectos: webs para empresas y Moira Ordo Games | Moira Ordo',
    description:
      'Webs a medida para inmobiliarias, constructoras y movilidad conectadas a nuestro CRM, un SaaS de gestión de flota y juegos HTML5 como MusiBingo y MatchRise.',
    og: 'proyectos',
    breadcrumbs: [HOME, { name: 'Proyectos', path: '/proyectos' }],
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
  {
    path: '/contacto',
    Component: Contact,
    title: 'Contacto — Pide presupuesto para tu web | Moira Ordo',
    description:
      'Cuéntanos tu proyecto: primera consulta gratuita y respuesta en menos de 24 horas.',
    og: 'contacto',
    breadcrumbs: [HOME, { name: 'Contacto', path: '/contacto' }],
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
