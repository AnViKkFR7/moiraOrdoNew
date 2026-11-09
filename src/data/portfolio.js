// Proyectos reales con página propia (/proyectos/:slug). Solo hechos comprobables en cada web publicada.
// No se incluyen métricas de resultados: las de caseStudies.js están pendientes de validar con cada cliente.

export const PORTFOLIO = [
  {
    slug: 'regia-mare',
    name: 'Regia Mare Properties',
    sectorSlug: 'inmobiliarias',
    sector: 'Inmobiliaria premium · Costa de Barcelona',
    url: 'https://regiamare.com/',
    domain: 'regiamare.com',
    seoTitle: 'Regia Mare: web inmobiliaria a medida con CRM',
    seoDescription:
      'Caso de estudio: web inmobiliaria premium multidioma con catálogo de propiedades, filtros y fichas gestionadas desde el CRM de Moira Ordo.',
    headline: 'Una inmobiliaria premium con el catálogo en su propio panel',
    summary:
      'Web a medida, en español, inglés y francés, para una inmobiliaria de la costa de Barcelona. El catálogo de propiedades se gestiona desde el CRM de Moira Ordo.',
    services: ['diseno-web', 'desarrollo-web'],
    challenge:
      'Un catálogo que cambia cada semana y compradores nacionales e internacionales que necesitan encontrar rápido la vivienda adecuada.',
    built: [
      'Diseño a medida con identidad propia, sin plantillas.',
      'Web multidioma (español, inglés y francés).',
      'Cada propiedad es una ficha con atributos propios —precio, zona, habitaciones, baños y metros— y la web genera los filtros a partir de ellos.',
      'Propiedades destacadas, páginas de servicios y formularios de contacto para compradores y propietarios.',
      'Gestión del catálogo, el blog y los contactos desde el CRM de Moira Ordo.',
      'Analítica propia sin cookies.',
    ],
    tags: ['Inmobiliaria', 'Multidioma', 'CRM', 'Catálogo'],
  },
  {
    slug: 'arquelia',
    name: 'Arquelia',
    sectorSlug: 'reformas-y-construccion',
    sector: 'Reformas integrales de alta gama · Cataluña',
    url: 'https://arquelia.es/',
    domain: 'arquelia.es',
    seoTitle: 'Arquelia: web editorial, CRM y marketing online',
    seoDescription:
      'Caso de estudio: web editorial para una empresa de reformas de alta gama en Cataluña, con contenido en el CRM de Moira Ordo y marketing online.',
    headline: 'Una web a la altura de sus obras',
    summary:
      'Diseño editorial a medida para una empresa de reformas integrales de alta gama en Barcelona y Cataluña, con el contenido gestionado desde el CRM y marketing online.',
    services: ['diseno-web', 'desarrollo-web'],
    challenge:
      'Transmitir en la web el nivel de acabado de sus obras y poder publicar proyectos nuevos sin depender de un desarrollador.',
    built: [
      'Diseño editorial a medida: fotografía a pantalla completa, tipografía cuidada y mucho espacio para el proyecto.',
      'Servicios por tipo de obra: cocinas, baños, reforma integral y rehabilitación.',
      'Sección de proyectos con filtros por tipo de reforma.',
      'Contenido conectado al CRM de Moira Ordo para publicar obras sin tocar el diseño.',
      'Marketing online y publicidad para llevar tráfico cualificado a la solicitud de presupuesto.',
    ],
    tags: ['Reformas', 'Diseño editorial', 'CRM', 'Marketing online'],
  },
  {
    slug: 'reformas-llobregat',
    name: 'Reformas Llobregat',
    sectorSlug: 'reformas-y-construccion',
    sector: 'Reformas integrales · Baix Llobregat',
    url: 'https://reformasllobregat.com/',
    domain: 'reformasllobregat.com',
    seoTitle: 'Reformas Llobregat: web, SEO local y publicidad',
    seoDescription:
      'Caso de estudio: web orientada a solicitar presupuesto para una empresa de reformas del Baix Llobregat, con SEO local y publicidad gestionada por Moira Ordo.',
    headline: 'Una web pensada para que pidan presupuesto',
    summary:
      'Web de captación para una empresa de reformas integrales del Baix Llobregat, con formulario de presupuesto corto, SEO local y campañas de publicidad.',
    services: ['diseno-web', 'desarrollo-web'],
    challenge:
      'Buen trabajo en obra pero poca presencia online: los presupuestos llegaban sobre todo por recomendación.',
    built: [
      'Web orientada a conversión: servicios claros, proyectos recientes y llamadas a la acción visibles.',
      'Formulario de presupuesto corto y rápido, con opción de contacto por WhatsApp.',
      'Páginas y contenidos pensados para búsquedas locales de la zona.',
      'Publicidad online gestionada cada mes por Moira Ordo.',
    ],
    tags: ['Reformas', 'SEO local', 'Publicidad', 'Captación'],
  },
  {
    slug: 'navagli',
    name: 'Navagli',
    sectorSlug: 'reformas-y-construccion',
    sector: 'Reformas y construcción · empresa familiar',
    url: 'https://www.navagli.com/',
    domain: 'navagli.com',
    seoTitle: 'Navagli: web de reformas conectada al CRM',
    seoDescription:
      'Caso de estudio: web corporativa de una empresa familiar de reformas que publica proyectos y servicios desde el CRM de Moira Ordo, sin depender de nadie.',
    headline: 'Una empresa familiar que actualiza su propia web',
    summary:
      'Web corporativa para una empresa familiar de reformas y construcción, alimentada por el CRM: el equipo publica proyectos y servicios desde el panel.',
    services: ['diseno-web', 'desarrollo-web'],
    challenge:
      'Una empresa sin tiempo para pelearse con la web, que necesitaba enseñar sus obras y recibir solicitudes de presupuesto.',
    built: [
      'Web corporativa a medida con presentación de la empresa, servicios y proyectos destacados.',
      'Proyectos y servicios gestionados desde el CRM de Moira Ordo, sin tocar código.',
      'Solicitudes de presupuesto que llegan directamente al panel.',
    ],
    tags: ['Reformas', 'Web corporativa', 'CRM'],
  },
  {
    slug: 'vemaro-transfers',
    name: 'Vemaro Transfers',
    sectorSlug: 'transfers-y-movilidad',
    sector: 'Transfers privados con chófer · Barcelona',
    url: 'https://www.vemarotransfers.com/',
    domain: 'vemarotransfers.com',
    seoTitle: 'Vemaro Transfers: SaaS de reservas y flota con pagos',
    seoDescription:
      'Caso de estudio: plataforma a medida para transfers privados con presupuesto al instante, pagos integrados y panel de gestión de flota, chóferes y reservas.',
    headline: 'De la reserva al panel de la flota, todo en una plataforma',
    summary:
      'Plataforma a medida para una empresa de transfers privados con chófer: frontal de reserva con precio cerrado y pagos, y panel para gestionar flota, chóferes y servicios.',
    services: ['software-a-medida', 'diseno-web', 'desarrollo-web'],
    challenge:
      'Pasar de gestionar reservas y presupuestos a mano a una plataforma donde el cliente reserva y paga en minutos.',
    built: [
      'Frontal de reserva con origen, destino, fecha y pasajeros en la primera pantalla.',
      'Precio cerrado con IVA y peajes incluidos, calculado al instante.',
      'Pagos integrados con tarjeta, Apple Pay, Google Pay y PayPal.',
      'Servicio por horas y servicios a medida: bodas, eventos, chófer por días y viajes con varias paradas.',
      'Panel propio para gestionar flota, chóferes y servicios.',
      'Web responsive en varios idiomas.',
    ],
    tags: ['SaaS', 'Reservas', 'Pagos', 'Flota'],
  },
  {
    slug: 'musibingo',
    name: 'MusiBingo',
    sectorSlug: 'juegos',
    sector: 'Juego HTML5 · Moira Ordo Games',
    url: 'https://musibingo.com/',
    domain: 'musibingo.com',
    seoTitle: 'MusiBingo: bingo musical online, juego HTML5',
    seoDescription:
      'MusiBingo es un bingo musical para jugar en grupo desde el navegador, sin instalar nada. Un juego HTML5 de Moira Ordo Games.',
    headline: 'Un bingo musical que se juega con un enlace',
    summary:
      'Bingo musical para jugar en grupo: se crea una partida o se une uno a una existente desde el navegador del móvil o del ordenador.',
    services: ['juegos-html5'],
    challenge: 'Un juego social que funcionara en cualquier móvil sin descargas.',
    built: [
      'Crear una partida o unirse a una con un código.',
      'Juego HTML5 que funciona en el navegador del móvil y del ordenador.',
      'Publicado en su propio dominio, sin instalación.',
    ],
    tags: ['Juego HTML5', 'Multijugador', 'Navegador'],
  },
  {
    slug: 'matchrise',
    name: 'MatchRise',
    sectorSlug: 'juegos',
    sector: 'Juego HTML5 · Moira Ordo Games',
    url: 'https://www.matchrise.es/',
    domain: 'matchrise.es',
    seoTitle: 'MatchRise: manager de fútbol online en HTML5',
    seoDescription:
      'MatchRise es un manager de fútbol por rondas que se juega en el navegador: empiezas en Sexta División, fichas, eliges formación y asciendes. Moira Ordo Games.',
    headline: 'Construye. Adapta. Asciende.',
    summary:
      'Manager de fútbol por rondas: se empieza en Sexta División con un club modesto y se toman decisiones de plantilla, formación y partido para llegar a Primera.',
    services: ['juegos-html5'],
    challenge: 'Un manager de fútbol con profundidad que se jugara cómodamente desde el móvil.',
    built: [
      'Modos de juego: nueva carrera, legado simulado de diez temporadas y Copa Mundial de Naciones.',
      'Plan de temporada, estilo de juego y política de plantilla.',
      'Juego HTML5 que se abre desde el navegador, sin instalar.',
    ],
    tags: ['Juego HTML5', 'Manager de fútbol', 'Navegador'],
  },
]

// Portfolios profesionales ya publicados (referencia para el sector «portfolios-profesionales»).
export const PORTFOLIO_SITES = [
  {
    name: 'Frederic Martínez',
    focus: 'Comunicación corporativa, estrategia de marca y producción audiovisual',
    url: 'https://fredericmartinez.vercel.app/',
  },
  {
    name: 'Salomon Visual',
    focus: 'Ilustración editorial y libros infantiles',
    url: 'https://salomon-visual.vercel.app/',
  },
  {
    name: 'Aaron García',
    focus: 'Desarrollo web, software a medida e integraciones',
    url: 'https://aaron-garcia-portfolio-phi.vercel.app/',
  },
]
