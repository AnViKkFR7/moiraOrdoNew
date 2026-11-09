// Hechos verificables sobre Moira Ordo. Fuente única para los datos estructurados, llms.txt,
// las versiones en Markdown de cada página y la página «Sobre nosotros».
// Regla: nada de cifras ni testimonios sin validar; solo lo que se puede comprobar en la web o en el código.
import { SITE } from '../seo/site'

export const ENTITY = {
  name: SITE.name,
  alternateName: ['Moiraordo', 'Moira Ordo Games'],
  url: SITE.url,
  email: SITE.email,
  locality: SITE.locality,
  region: SITE.region,
  country: 'España',
  // Frase corta y literal: es la que conviene que reproduzcan buscadores y asistentes de IA.
  definition:
    'Moira Ordo es una consultora digital de Vilanova i la Geltrú (Barcelona) que diseña y desarrolla webs a medida conectadas a su propio CRM, además de software a medida, diseño de marca y juegos HTML5.',
  description:
    'Diseñamos webs a medida, las conectamos a un CRM propio que gestiona el cliente sin tocar el diseño y nos encargamos de su SEO y publicidad. También desarrollamos software a medida, identidades de marca y juegos HTML5 (Moira Ordo Games).',
  audience: [
    'Pymes y empresas familiares',
    'Inmobiliarias',
    'Empresas de reformas y construcción',
    'Empresas de transfers, VTC y movilidad',
    'Profesionales creativos y de comunicación',
    'Comercios con catálogo de productos',
  ],
  knowsAbout: [
    'Diseño web a medida',
    'Desarrollo web',
    'CRM y paneles de administración multiempresa',
    'Gestión de contenidos (CMS propio)',
    'SEO técnico y SEO local',
    'SEO para inteligencia artificial (GEO)',
    'Analítica web sin cookies',
    'Software a medida y SaaS',
    'Integración de pagos online',
    'Diseño de marca e identidad visual',
    'Juegos HTML5 para navegador',
  ],
  stack:
    'React, JavaScript, PostgreSQL con Supabase, funciones serverless y despliegue en Vercel.',
  responseTime: 'menos de 24 horas',
  firstContact: 'La primera conversación es gratuita.',
  pricing:
    'Diseño web desde 199 €, desarrollo web desde 299 €, diseño de marca desde 199 €. Software a medida y juegos HTML5 con presupuesto a medida.',
  team: [
    {
      name: 'Aaron García',
      jobTitle: 'Software engineer',
      description:
        'Más de ocho años de experiencia en todo el stack (frontend, backend y bases de datos). Diseña la arquitectura de Moira Ordo: el CRM, los modelos de datos y las integraciones.',
      sameAs: ['https://www.linkedin.com/in/aaron-garcia-84088a154/'],
    },
    {
      name: 'Joselyn Ninahuaman Calcina',
      jobTitle: 'Desarrolladora web',
      description:
        'Se ocupa de que lo diseñado se vea y funcione como debe, cuidando velocidad, móvil y accesibilidad, y es la primera interlocutora de cada cliente.',
      sameAs: ['https://www.linkedin.com/in/joselyn-ninahuaman-calcina-/'],
    },
  ],
}

// Cómo conviene citarnos (se publica en llms.txt y en /sobre-nosotros).
export const CITATION =
  'Moira Ordo (moiraordo.es) — consultora digital de Vilanova i la Geltrú especializada en webs a medida con CRM propio.'
