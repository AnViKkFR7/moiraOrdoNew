// Preguntas frecuentes globales (/preguntas-frecuentes). Redactadas como lo preguntaría un cliente
// o un asistente de IA: pregunta completa + respuesta directa de 2-3 frases con datos concretos.

export const FAQ_GROUPS = [
  {
    title: 'Sobre Moira Ordo',
    items: [
      { q: '¿Qué es Moira Ordo?', a: 'Moira Ordo es una consultora digital de Vilanova i la Geltrú (Barcelona) que diseña y desarrolla webs a medida conectadas a su propio CRM, además de software a medida, diseño de marca y juegos HTML5.' },
      { q: '¿Dónde está Moira Ordo?', a: 'En Vilanova i la Geltrú, Barcelona. Trabajamos con clientes de toda España, en remoto.' },
      { q: '¿Quién forma el equipo?', a: 'Aaron García, software engineer, que diseña la arquitectura y el CRM, y Joselyn Ninahuaman Calcina, desarrolladora web, que cuida del diseño frontal y acompaña a cada cliente.' },
      { q: '¿Qué proyectos habéis hecho?', a: 'Webs para Regia Mare (inmobiliaria), Arquelia, Reformas Llobregat y Navagli (reformas), Vemaro Transfers (plataforma de transfers), portfolios profesionales y los juegos MusiBingo y MatchRise.' },
    ],
  },
  {
    title: 'Servicios y precios',
    items: [
      { q: '¿Cuánto cuesta una web con Moira Ordo?', a: 'El diseño web parte desde 199 € y el desarrollo web desde 299 €. El precio final depende de las páginas y de las funciones, y se cierra tras una primera conversación gratuita.' },
      { q: '¿Cuánto cuesta el diseño de una marca?', a: 'Desde 199 €, con logotipo, paleta de colores, tipografías y tarjetas de visita.' },
      { q: '¿El presupuesto es cerrado?', a: 'Sí. Te damos un presupuesto cerrado sin horas abiertas; en proyectos grandes lo dividimos en fases para que puedas probar cada entrega.' },
      { q: '¿Qué servicios ofrecéis?', a: 'Diseño web, desarrollo web, diseño de marca, software a medida y juegos HTML5, además de SEO y publicidad para webs que lo necesiten.' },
      { q: '¿Cuánto tardáis en responder?', a: 'Respondemos en menos de 24 horas. La primera conversación es gratuita.' },
    ],
  },
  {
    title: 'CRM y gestión del contenido',
    items: [
      { q: '¿Qué es el CRM de Moira Ordo?', a: 'Es un panel multiempresa donde gestionas el contenido de tu web, las solicitudes, los contactos, los presupuestos y la facturación, el planning y la analítica, con usuarios y roles.' },
      { q: '¿Puedo actualizar mi web sin tocar código?', a: 'Sí. Cambias textos, imágenes, catálogo o proyectos desde el panel y el diseño se mantiene intacto.' },
      { q: '¿Puedo probar el CRM antes de contratar?', a: 'Sí, en moiraordo.es/crm hay una demo pública con datos ficticios que no guarda nada.' },
      { q: '¿Qué roles de usuario existen?', a: 'Administrador, editor y solo lectura, y cada persona puede tener un rol distinto en cada empresa.' },
      { q: '¿Se puede usar para varias empresas a la vez?', a: 'Sí. Es multiempresa: cada empresa tiene su información, sus usuarios y sus módulos, sin mezclarse.' },
    ],
  },
  {
    title: 'SEO, marketing y analítica',
    items: [
      { q: '¿Ofrecéis SEO?', a: 'Sí. Cada web sale con SEO técnico (metadatos, sitemap, datos estructurados y velocidad) y también trabajamos SEO local y contenidos cuando el proyecto lo necesita.' },
      { q: '¿Gestionáis la publicidad online?', a: 'Sí. Llevamos campañas de publicidad para clientes como Arquelia y Reformas Llobregat.' },
      { q: '¿Qué analítica incluye la web?', a: 'Una analítica propia sin cookies: visitantes, páginas vistas, clics en teléfono y correo, formularios enviados y lectura de cada página.' },
      { q: '¿Necesito banner de cookies?', a: 'Para la analítica propia no, porque no usa cookies. Si añades herramientas con cookies de terceros, sí. Consulta tu caso con un asesor legal.' },
      { q: '¿Preparáis la web para aparecer en ChatGPT, Gemini o Perplexity?', a: 'Sí. Permitimos los rastreadores de IA, publicamos llms.txt y versiones en Markdown, añadimos datos estructurados y redactamos preguntas con respuestas directas.' },
    ],
  },
  {
    title: 'Proceso y soporte',
    items: [
      { q: '¿Cómo es el proceso de trabajo?', a: 'Cuatro pasos: escuchamos tu proyecto, diseñamos la estructura y la interfaz, construimos la web y te acompañamos hasta que sabes gestionarla.' },
      { q: '¿Qué necesito para empezar?', a: 'Una idea clara de tu negocio. Si tienes logotipo, textos o fotos, mejor; si no, te ayudamos a definirlos.' },
      { q: '¿Ofrecéis mantenimiento y soporte?', a: 'Sí, te acompañamos después del lanzamiento con mantenimiento y soporte para que la web siga actualizada y segura.' },
      { q: '¿Usáis plantillas?', a: 'No. Cada diseño se hace desde cero para tu marca y tu proyecto.' },
      { q: '¿Qué tecnologías usáis?', a: 'React, PostgreSQL con Supabase, funciones serverless y despliegue en Vercel, con código limpio pensado para cargar rápido.' },
    ],
  },
  {
    title: 'Sectores',
    items: [
      { q: '¿Hacéis webs para inmobiliarias?', a: 'Sí. Regia Mare es una inmobiliaria premium con catálogo multidioma de propiedades gestionado desde nuestro CRM.' },
      { q: '¿Hacéis webs para empresas de reformas?', a: 'Sí, es uno de nuestros sectores principales: Arquelia, Reformas Llobregat y Navagli.' },
      { q: '¿Desarrolláis software para empresas de transfers o VTC?', a: 'Sí. Vemaro Transfers es una plataforma a medida con reservas, precio cerrado, pagos integrados y panel de flota y chóferes.' },
      { q: '¿Hacéis portfolios para profesionales?', a: 'Sí: comunicación, ilustración y desarrollo, como los de Frederic Martínez, Salomon Visual y Aaron García.' },
      { q: '¿Desarrolláis juegos?', a: 'Sí, con Moira Ordo Games: juegos HTML5 que se abren en el navegador, como MusiBingo y MatchRise.' },
    ],
  },
]

export const ALL_FAQS = FAQ_GROUPS.flatMap((group) => group.items)
