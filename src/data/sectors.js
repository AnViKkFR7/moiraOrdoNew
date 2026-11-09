// Páginas por sector (/sectores/:slug): captan búsquedas del tipo «web para inmobiliaria»,
// «software para empresa de transfers», «web para empresa de reformas»…
// `keywords` es solo documentación interna (docs/seo-estrategia.md); no se publica como meta keywords.

export const SECTORS = [
  {
    slug: 'inmobiliarias',
    name: 'Inmobiliarias',
    title: 'Webs para inmobiliarias',
    seoTitle: 'Diseño web para inmobiliarias con CRM y catálogo',
    seoDescription:
      'Webs a medida para inmobiliarias: catálogo de propiedades con filtros, multidioma y un CRM para publicar viviendas y gestionar consultas. Caso real: Regia Mare.',
    headline: 'Un catálogo que se actualiza en minutos y una web que transmite confianza',
    intro:
      'Una inmobiliaria vive de su catálogo: propiedades que entran y salen cada semana, compradores que buscan por zona, precio y metros, y consultas que hay que atender rápido. Diseñamos la web y el panel para que publicar una vivienda sea cuestión de minutos.',
    pains: [
      'Publicar o retirar una propiedad depende de un desarrollador o de copiar y pegar en varios sitios.',
      'La web no distingue a la inmobiliaria de las de los portales: plantillas genéricas y fichas pobres.',
      'Los compradores internacionales no encuentran la información en su idioma.',
      'Las consultas llegan por correo, teléfono y formularios sueltos, sin seguimiento.',
    ],
    solutions: [
      { t: 'Fichas con atributos propios', d: 'Cada propiedad tiene precio, zona, habitaciones, baños, metros y los campos que definas. La web genera los filtros a partir de esos atributos.' },
      { t: 'Multidioma', d: 'Contenido en varios idiomas con URLs y etiquetas hreflang correctas, para que cada comprador encuentre su versión.' },
      { t: 'SEO por ficha', d: 'Título, descripción, URL propia e imagen para compartir en cada propiedad, con vista previa en el panel.' },
      { t: 'Consultas con seguimiento', d: 'Cada solicitud crea un contacto con su origen y avanza por etapas: nuevo, contactado, visita, oferta, cerrado.' },
      { t: 'Analítica sin cookies', d: 'Visitas, páginas más vistas y clics en teléfono o correo, sin banner de cookies para medir.' },
    ],
    projects: ['regia-mare'],
    services: ['diseno-web', 'desarrollo-web'],
    faq: [
      { q: '¿Cuánto cuesta una web para una inmobiliaria?', a: 'Parte desde 299 € de desarrollo y 199 € de diseño. El precio final depende del número de idiomas, de las páginas y de los atributos del catálogo; tras una primera conversación gratuita te enviamos un presupuesto cerrado.' },
      { q: '¿Puedo publicar yo mismo las propiedades?', a: 'Sí. Das de alta una propiedad desde el panel del CRM —fotos, atributos y textos— y aparece en la web con su ficha, sus filtros y su SEO, sin tocar código.' },
      { q: '¿La web puede estar en varios idiomas?', a: 'Sí. Regia Mare, por ejemplo, está en español, inglés y francés, pensada para compradores nacionales e internacionales.' },
      { q: '¿Se puede conectar con los portales inmobiliarios?', a: 'Podemos estudiar integraciones o exportaciones según cada caso. Lo hablamos en la primera conversación para ver qué tiene sentido en tu operativa.' },
      { q: '¿Qué CRM usa una inmobiliaria con vuestra web?', a: 'El de Moira Ordo: un panel propio con catálogo de propiedades, solicitudes, contactos con etapas comerciales, presupuestos y analítica, que se activa por módulos según lo que necesites.' },
    ],
    keywords: ['diseño web inmobiliarias', 'web para inmobiliaria a medida', 'CRM inmobiliario', 'catálogo de propiedades web', 'web inmobiliaria multidioma', 'software para inmobiliarias', 'página web agencia inmobiliaria'],
  },
  {
    slug: 'reformas-y-construccion',
    name: 'Reformas y construcción',
    title: 'Webs para empresas de reformas y constructoras',
    seoTitle: 'Diseño web para empresas de reformas y constructoras',
    seoDescription:
      'Webs a medida para empresas de reformas: portfolio de obras, formulario de presupuesto, SEO local y publicidad. Casos: Arquelia, Reformas Llobregat y Navagli.',
    headline: 'Una web que enseña tus obras y consigue que te pidan presupuesto',
    intro:
      'En reformas casi todo entra por recomendación, pero el cliente que te conoce siempre mira tu web antes de llamar. Diseñamos webs que muestran el acabado real de tus obras, facilitan pedir presupuesto y se posicionan en las búsquedas de tu zona.',
    pains: [
      'La web no transmite el nivel de acabado de las obras reales.',
      'Publicar un proyecto terminado es una tarea pendiente permanente.',
      'Casi nadie te encuentra cuando busca «reformas» y el nombre de tu zona.',
      'El formulario de presupuesto es largo y se pierde gente por el camino.',
      'No sabes de qué anuncio o página viene cada solicitud.',
    ],
    solutions: [
      { t: 'Portfolio de obras que se gestiona solo', d: 'Cada proyecto es un item con fotos, tipo de reforma y descripción. Lo publicas en minutos desde el panel.' },
      { t: 'Formulario de presupuesto corto', d: 'Pocos campos, respuesta rápida y botón de WhatsApp: menos fricción para quien quiere preguntar.' },
      { t: 'SEO local', d: 'Contenidos y páginas pensados para las búsquedas de tu comarca y de cada tipo de reforma: cocinas, baños, reforma integral, rehabilitación.' },
      { t: 'Publicidad online', d: 'Campañas que llevan tráfico cualificado al formulario, gestionadas por el mismo equipo que hace la web.' },
      { t: 'Origen de cada solicitud', d: 'El CRM guarda la página de origen, el proyecto consultado, la campaña y las UTM de cada consulta.' },
    ],
    projects: ['arquelia', 'reformas-llobregat', 'navagli'],
    services: ['diseno-web', 'desarrollo-web'],
    faq: [
      { q: '¿Cuánto cuesta una web para una empresa de reformas?', a: 'El diseño parte desde 199 € y el desarrollo desde 299 €; el presupuesto final depende de las páginas y de si incluye portfolio gestionable, SEO local o publicidad. Te lo damos cerrado tras una primera conversación gratuita.' },
      { q: '¿Cómo consigo que mi empresa de reformas aparezca en Google?', a: 'Combinando una web rápida y bien estructurada, páginas para cada servicio y zona, fichas de proyectos con buen contenido, un perfil de empresa en Google con reseñas y, si quieres acelerar, publicidad. Es el enfoque que usamos con Arquelia y Reformas Llobregat.' },
      { q: '¿Puedo subir yo las obras nuevas?', a: 'Sí. Es el caso de Navagli: el equipo publica proyectos y servicios desde el panel del CRM, sin tocar el diseño.' },
      { q: '¿Qué debe tener la web de una empresa de reformas?', a: 'Fotografías reales de obras terminadas, servicios claros, proyectos con contexto, opiniones de clientes, datos de contacto visibles y un formulario de presupuesto sencillo.' },
      { q: '¿Gestionáis también la publicidad?', a: 'Sí. Llevamos el marketing online y las campañas de publicidad de clientes del sector, como Arquelia y Reformas Llobregat.' },
    ],
    keywords: ['diseño web empresa de reformas', 'web para constructora', 'página web reformas integrales', 'SEO para reformas', 'captar clientes reformas', 'marketing online reformas', 'web arquitectura y reformas', 'reformas Baix Llobregat web'],
  },
  {
    slug: 'transfers-y-movilidad',
    name: 'Transfers y movilidad',
    title: 'Web y software para empresas de transfers y chófer privado',
    seoTitle: 'Software y web para empresas de transfers y VTC',
    seoDescription:
      'Plataforma a medida para transfers, VTC y chófer privado: reservas con precio cerrado, pagos online y panel de flota y chóferes. Caso: Vemaro Transfers.',
    headline: 'Que el cliente reserve y pague solo, y que tú veas la flota organizada',
    intro:
      'Una empresa de transfers pierde tiempo cuando cada reserva se negocia por teléfono o WhatsApp y cada presupuesto se calcula a mano. Construimos plataformas donde el cliente reserva y paga en minutos y el equipo gestiona la operativa desde un panel.',
    pains: [
      'Las reservas llegan por llamadas y mensajes a deshoras.',
      'Cada presupuesto se calcula a mano, con riesgo de errores y retrasos.',
      'La flota, los chóferes y los servicios se organizan en hojas de cálculo.',
      'La web presenta el servicio pero no permite reservar.',
    ],
    solutions: [
      { t: 'Reserva en la primera pantalla', d: 'Origen, destino, fecha y pasajeros al entrar. Menos pasos, menos abandonos.' },
      { t: 'Precio cerrado al instante', d: 'El cliente ve el precio final con IVA y peajes incluidos antes de reservar.' },
      { t: 'Pagos integrados', d: 'Tarjeta, Apple Pay, Google Pay y PayPal, con confirmación inmediata por correo.' },
      { t: 'Panel de gestión a medida', d: 'Flota, chóferes y servicios en un único sistema, con roles de usuario.' },
      { t: 'Servicios a medida', d: 'Servicio por horas, bodas, eventos, chófer por días y viajes con varias paradas, con presupuesto cerrado.' },
    ],
    projects: ['vemaro-transfers'],
    services: ['software-a-medida', 'desarrollo-web'],
    faq: [
      { q: '¿Cuánto cuesta un software de reservas para una empresa de transfers?', a: 'Es un proyecto a medida: depende del alcance (reservas, pagos, panel de flota, idiomas). Tras una primera conversación gratuita te preparamos un presupuesto por fases para que puedas probar cada entrega.' },
      { q: '¿Se pueden aceptar pagos online?', a: 'Sí. En Vemaro Transfers el cliente paga con tarjeta, Apple Pay, Google Pay o PayPal.' },
      { q: '¿Puedo gestionar mi flota y mis chóferes desde el mismo sistema?', a: 'Sí. La plataforma incluye un panel propio para flota, chóferes y servicios, con roles para cada persona del equipo.' },
      { q: '¿Qué diferencia hay entre una web de transfers y una plataforma?', a: 'La web presenta el servicio; la plataforma además permite reservar, calcular el precio, cobrar y organizar la operativa interna. Podemos empezar por una y evolucionar a la otra.' },
      { q: '¿Funciona en varios idiomas?', a: 'Sí, el frontal se puede ofrecer en varios idiomas; es habitual en un servicio con clientes internacionales.' },
    ],
    keywords: ['software gestión flota VTC', 'web para empresa de transfers', 'reserva online transfer aeropuerto', 'SaaS para transfers', 'plataforma de reservas chófer privado', 'software para empresa de taxi y VTC', 'sistema de reservas con pagos online'],
  },
  {
    slug: 'portfolios-profesionales',
    name: 'Portfolios profesionales',
    title: 'Webs de portfolio para profesionales y creativos',
    seoTitle: 'Portfolio web para profesionales y creativos',
    seoDescription:
      'Portfolios web a medida para profesionales de la comunicación, la ilustración y el desarrollo: experiencias que se recorren, rápidas y fáciles de actualizar.',
    headline: 'Un portfolio que se recorre, no que se hojea',
    intro:
      'Un portfolio es tu primera reunión con un cliente. Diseñamos webs personales que presentan tu trabajo con la personalidad que tiene, cargan rápido y puedes mantener al día sin depender de nadie.',
    pains: [
      'Las plantillas de portfolio se parecen todas y no cuentan tu historia.',
      'Los proyectos nuevos tardan meses en subirse.',
      'La web es lenta o se ve mal en el móvil, donde mucha gente la abre primero.',
      'No aparece cuando alguien busca tu nombre o tu especialidad.',
    ],
    solutions: [
      { t: 'Diseño a la medida de tu trabajo', d: 'Estructura, ritmo y navegación pensados para lo que haces: audiovisual, ilustración, desarrollo o comunicación.' },
      { t: 'Experiencias interactivas', d: 'Recorridos que invitan a explorar, sin perder velocidad ni accesibilidad.' },
      { t: 'Proyectos fáciles de publicar', d: 'Con el CRM añades trabajos y artículos desde un panel.' },
      { t: 'SEO personal', d: 'Títulos, descripciones y datos estructurados para que te encuentren por tu nombre y tu especialidad.' },
    ],
    projects: [],
    services: ['diseno-web', 'diseno-de-marca'],
    faq: [
      { q: '¿Cuánto cuesta un portfolio web profesional?', a: 'El diseño web parte desde 199 € y el desarrollo desde 299 €. Un portfolio suele ser un proyecto contenido; te damos un presupuesto cerrado tras una primera conversación gratuita.' },
      { q: '¿Qué portfolios habéis hecho?', a: 'Los de Frederic Martínez (comunicación y estrategia digital), Salomon Visual (ilustración y libros infantiles) y Aaron García (desarrollo web y software).' },
      { q: '¿Puedo actualizarlo yo?', a: 'Sí, si lo conectamos al CRM: añades proyectos y artículos desde un panel y el diseño se mantiene intacto.' },
      { q: '¿Necesito una marca personal antes?', a: 'No es imprescindible, pero ayuda. Si no la tienes, podemos empezar por una identidad sencilla con logotipo, colores y tipografías.' },
    ],
    keywords: ['portfolio web profesional', 'diseño de portfolio online', 'web para ilustrador', 'portfolio para desarrollador', 'web personal de comunicación', 'página web para creativos', 'portfolio audiovisual web'],
  },
  {
    slug: 'comercios-y-catalogos',
    name: 'Comercios y catálogos',
    title: 'Webs para comercios con catálogo de productos',
    seoTitle: 'Web con catálogo de productos a medida',
    seoDescription:
      'Webs a medida con catálogo de productos gestionable desde un panel: fichas con atributos, estados de publicación, presupuestos y facturación. Prueba la demo del CRM.',
    headline: 'Un catálogo bien ordenado que gestionas sin tocar código',
    intro:
      'Si vendes productos o servicios con muchas variantes, la clave está en cómo se ordena el catálogo. Nuestro CRM trata cada producto como un item con sus propios atributos, estados y fotografías, y la web los presenta con filtros y fichas coherentes.',
    pains: [
      'El catálogo vive en una hoja de cálculo y en la web a la vez.',
      'Añadir un producto nuevo obliga a editar varias páginas.',
      'Los filtros y las fichas no son consistentes entre sí.',
      'Los presupuestos y las facturas se hacen en otra herramienta.',
    ],
    solutions: [
      { t: 'Items con atributos configurables', d: 'Defines los tipos de producto y las propiedades que los describen: marca, material, medidas, precio…' },
      { t: 'Estados de publicación', d: 'Borrador, publicado y archivado: decides qué se ve en la web y cuándo.' },
      { t: 'Fichas con SEO', d: 'Cada producto tiene título, descripción, URL e imagen para compartir.' },
      { t: 'Presupuestos y facturación', d: 'Del interés del cliente al presupuesto y la factura sin cambiar de herramienta.' },
      { t: 'Demo con datos ficticios', d: 'Puedes probar el panel con una empresa de ejemplo (un catálogo de relojes) en moiraordo.es/crm.' },
    ],
    projects: [],
    services: ['desarrollo-web', 'software-a-medida'],
    faq: [
      { q: '¿Es una tienda online con carrito?', a: 'Lo habitual es una web con catálogo, fichas, filtros y solicitud de presupuesto o reserva. Si necesitas carrito y pasarela de pago, lo estudiamos como software a medida con pagos integrados.' },
      { q: '¿Puedo probar el panel antes de contratar?', a: 'Sí. En moiraordo.es/crm hay una demo pública con datos ficticios para navegar el panel sin guardar nada.' },
      { q: '¿Cuántos productos admite el catálogo?', a: 'El catálogo está pensado para crecer: los items se gestionan con búsqueda, filtros y vistas de lista o cuadrícula, y los atributos son configurables.' },
    ],
    keywords: ['web con catálogo de productos', 'panel de administración de productos', 'gestor de catálogo a medida', 'web para comercio con presupuestos', 'CMS a medida para catálogo', 'alternativa a WordPress para catálogo'],
  },
]
