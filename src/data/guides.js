// Guías (/guias/:slug): contenido informativo para búsquedas de la fase de investigación.
// Cada guía enlaza a servicios y sectores y publica sus preguntas como FAQPage.
// Honestidad editorial: sin estadísticas de mercado inventadas; los precios son los de /servicios.

const DATE = '2026-11-09'

export const GUIDES = [
  {
    slug: 'cuanto-cuesta-una-pagina-web',
    title: '¿Cuánto cuesta una página web para tu empresa?',
    seoTitle: '¿Cuánto cuesta una página web? Qué influye',
    description:
      'Qué determina el precio de una web a medida: páginas, funciones, idiomas, contenido y mantenimiento. Cómo comparar presupuestos y qué pagas cada año.',
    category: 'Precios',
    readMinutes: 6,
    published: DATE,
    updated: DATE,
    intro:
      'No existe un precio único para una web, porque dos páginas con el mismo número de pantallas pueden requerir trabajos muy distintos. Lo que sí se puede hacer es entender de qué depende el precio para comparar presupuestos con criterio.',
    sections: [
      {
        h: 'Qué determina el precio de una web',
        p: ['El coste se reparte entre diseño, desarrollo y contenido. Cuanto más a medida es cada parte, más trabajo implica.'],
        ul: [
          'Número y complejidad de páginas: una web de cinco páginas informativas no se parece a un catálogo con cientos de fichas.',
          'Diseño a medida o plantilla: un diseño desde cero requiere más horas, pero no se parece a nadie.',
          'Funcionalidades: formularios, reservas, pagos online, áreas privadas, buscadores o integraciones con otros sistemas.',
          'Idiomas: cada idioma añade contenido y tareas de SEO internacional.',
          'Gestión del contenido: si quieres actualizar textos, imágenes o productos tú mismo, hace falta un panel como un CRM.',
          'Textos y fotografías: si hay que redactarlos o producirlos, forman parte del proyecto.',
        ],
      },
      {
        h: 'Lo que pagas una vez y lo que pagas cada año',
        p: ['Un presupuesto serio separa el proyecto de los costes recurrentes, para que no haya sorpresas después.'],
        ul: [
          'Una vez: diseño, desarrollo, puesta en marcha y formación para gestionar el contenido.',
          'Cada año: dominio y alojamiento si no están incluidos.',
          'Opcional y continuo: mantenimiento, soporte, SEO y publicidad, según los objetivos.',
        ],
      },
      {
        h: 'Cómo calculamos el precio en Moira Ordo',
        p: [
          'El diseño web parte desde 199 €, el desarrollo desde 299 € y el diseño de marca desde 199 €. Son precios de partida: el presupuesto final depende de las páginas y de la complejidad.',
          'La primera conversación es gratuita y te damos un presupuesto cerrado, sin horas abiertas. Si el proyecto es más grande —por ejemplo un software a medida— lo dividimos en fases para que puedas probar cada entrega.',
        ],
      },
      {
        h: 'Cómo comparar presupuestos',
        p: ['Dos presupuestos con distinto importe casi nunca incluyen lo mismo. Antes de decidir, pregunta:'],
        ul: [
          '¿El diseño es a medida o una plantilla adaptada?',
          '¿Está incluida la versión móvil y la optimización de velocidad?',
          '¿Puedo editar el contenido sin depender de ti?',
          '¿Qué incluye de SEO técnico (metadatos, sitemap, datos estructurados)?',
          '¿Quién es el propietario del código y del dominio al terminar?',
          '¿Hay mantenimiento y soporte, y cuánto cuestan?',
        ],
      },
    ],
    faq: [
      { q: '¿Cuánto cuesta una página web a medida?', a: 'Depende del número de páginas y de las funciones. En Moira Ordo el diseño web parte desde 199 € y el desarrollo desde 299 €; el precio final se cierra tras una primera conversación gratuita.' },
      { q: '¿Qué gastos tiene una web además del desarrollo?', a: 'Dominio y alojamiento cada año, y de forma opcional mantenimiento, soporte, SEO y publicidad.' },
      { q: '¿Una web más cara es mejor?', a: 'No necesariamente. Lo importante es que el alcance coincida con lo que tu negocio necesita y que el presupuesto detalle qué incluye.' },
    ],
    services: ['diseno-web', 'desarrollo-web'],
    sectors: ['comercios-y-catalogos'],
    keywords: ['cuánto cuesta una página web', 'precio página web empresa', 'presupuesto web a medida', 'tarifas diseño web', 'precio desarrollo web'],
  },
  {
    slug: 'que-es-un-crm-para-tu-web',
    title: 'Qué es un CRM para tu web y cuándo lo necesitas',
    seoTitle: 'Qué es un CRM para tu web y cuándo usarlo',
    description:
      'Qué es un CRM conectado a tu web, qué módulos tiene (contenido, solicitudes, contactos, presupuestos, analítica) y cuándo compensa frente a un CMS.',
    category: 'CRM',
    readMinutes: 7,
    published: DATE,
    updated: DATE,
    intro:
      'Cuando se habla de CRM se piensa en ventas. Pero un CRM conectado a tu web también puede ser el lugar donde gestionas el contenido de la web y las consultas que recibes, en una sola herramienta.',
    sections: [
      {
        h: 'CRM, CMS y gestor de contenidos: en qué se diferencian',
        p: [
          'Un CMS (como WordPress) sirve para publicar contenido. Un CRM comercial sirve para gestionar contactos y ventas. El CRM de Moira Ordo combina ambas cosas: el contenido que ve el público y las solicitudes que llegan desde la web viven en el mismo panel.',
        ],
      },
      {
        h: 'Qué puede incluir un CRM de este tipo',
        p: ['El nuestro se organiza en módulos que se activan según el proyecto:'],
        ul: [
          'Items y atributos: el contenido propio de cada empresa (inmuebles, productos, proyectos) con las propiedades que definas.',
          'Blog: artículos con el mismo flujo de creación, edición y publicación.',
          'Solicitudes: los formularios de la web llegan al panel con su origen.',
          'Contactos y pipeline: etapas comerciales configurables y responsables.',
          'Presupuestos y facturación: documentos, partidas y seguimiento de cobros.',
          'Planning: calendario con tareas y facturación asociadas.',
          'Analítica: visitas y clics sin cookies.',
          'Usuarios y roles: administrador, editor y solo lectura, por empresa.',
        ],
      },
      {
        h: 'Cuándo compensa tener uno',
        p: ['Suele tener sentido si:'],
        ul: [
          'Tu web cambia a menudo (propiedades, productos, proyectos) y no quieres depender de un desarrollador.',
          'Recibes consultas por la web y quieres darles seguimiento ordenado.',
          'Gestionas varias empresas o marcas y necesitas separar su información.',
          'Quieres presupuestar y facturar sin saltar entre herramientas.',
        ],
      },
      {
        h: 'Cuándo no hace falta',
        p: ['Si tu web es una presentación estática que casi nunca cambia, un CRM sería excesivo. Es mejor una web sencilla y bien hecha, y ampliarla cuando haga falta.'],
      },
      {
        h: 'Cómo probarlo',
        p: ['En moiraordo.es/crm hay una demo pública con datos ficticios para navegar el panel sin guardar nada.'],
      },
    ],
    faq: [
      { q: '¿Qué es un CRM conectado a una web?', a: 'Un panel donde gestionas el contenido de tu web y las solicitudes que recibe, junto con contactos, presupuestos y analítica, en una sola herramienta.' },
      { q: '¿En qué se diferencia de WordPress?', a: 'WordPress es un gestor de contenidos genérico; nuestro CRM mantiene el diseño estable y añade solicitudes, contactos, presupuestos y analítica sin plugins externos.' },
      { q: '¿Puedo tener varias empresas en el mismo CRM?', a: 'Sí. Es multiempresa: cada empresa tiene su información, sus usuarios y sus roles, sin mezclarse.' },
    ],
    services: ['desarrollo-web', 'software-a-medida'],
    sectors: ['inmobiliarias', 'comercios-y-catalogos'],
    keywords: ['qué es un CRM', 'CRM para web', 'CRM y CMS diferencias', 'panel de administración web', 'CRM multiempresa', 'gestor de contenidos y contactos'],
  },
  {
    slug: 'web-a-medida-o-plantilla-wordpress',
    title: 'Web a medida o plantilla (WordPress, Wix…): cómo decidir',
    seoTitle: 'Web a medida o plantilla: cómo decidir',
    description:
      'Ventajas e inconvenientes de una web a medida frente a una plantilla de WordPress, Wix o Squarespace: coste, velocidad, SEO, mantenimiento y libertad de diseño.',
    category: 'Decisiones',
    readMinutes: 6,
    published: DATE,
    updated: DATE,
    intro:
      'Una plantilla no es mala ni una web a medida siempre es mejor. La decisión depende de cuánto va a cambiar tu web, de cuánto quieres diferenciarte y de qué funciones necesitas.',
    sections: [
      {
        h: 'Cuándo tiene sentido una plantilla',
        p: ['Una plantilla es una buena opción cuando necesitas salir rápido con un presupuesto ajustado:'],
        ul: [
          'Una presentación sencilla con pocas páginas.',
          'Un proyecto que aún está validando su idea.',
          'Contenido que no va a cambiar mucho.',
        ],
      },
      {
        h: 'Cuándo compensa una web a medida',
        p: ['Una web a medida compensa cuando la web es una herramienta de negocio:'],
        ul: [
          'Quieres un diseño que no se parezca al de nadie.',
          'Necesitas funciones concretas: filtros avanzados, reservas, pagos, áreas privadas.',
          'La velocidad y el SEO técnico son prioritarios.',
          'Quieres evitar la dependencia de decenas de plugins y su mantenimiento.',
        ],
      },
      {
        h: 'Comparativa rápida',
        ul: [
          'Diseño: la plantilla se adapta; la web a medida se diseña desde cero.',
          'Velocidad: una web a medida carga solo lo necesario; las plantillas suelen arrastrar código que no usas.',
          'SEO: ambas pueden posicionar; a medida controlas la estructura, los datos estructurados y la indexación al detalle.',
          'Mantenimiento: las plantillas requieren actualizar plugins y temas; una web a medida con CRM propio reduce esas piezas.',
          'Coste inicial: más bajo en plantillas; más alto en a medida, aunque se compensa con menos dependencias.',
        ],
      },
      {
        h: 'La opción intermedia que proponemos',
        p: [
          'Diseñamos la web a medida y la conectamos a nuestro CRM: el diseño permanece estable y el contenido fluye. Es el equilibrio entre la libertad de una web a medida y la autonomía de un gestor de contenidos.',
        ],
      },
    ],
    faq: [
      { q: '¿Es mejor WordPress o una web a medida?', a: 'Depende. WordPress es práctico para webs sencillas; una web a medida es mejor cuando necesitas diseño propio, funciones específicas y control del rendimiento.' },
      { q: '¿Una web a medida posiciona mejor en Google?', a: 'No por ser a medida, sino porque permite controlar velocidad, estructura y datos estructurados. El posicionamiento depende además del contenido y de la autoridad del sitio.' },
      { q: '¿Puedo editar yo una web a medida?', a: 'Sí, si está conectada a un panel de gestión. En nuestras webs gestionas el contenido desde el CRM sin tocar el diseño.' },
    ],
    services: ['diseno-web', 'desarrollo-web'],
    sectors: [],
    keywords: ['web a medida vs plantilla', 'wordpress o web a medida', 'alternativa a WordPress', 'wix vs web a medida', 'diseño web sin plantillas'],
  },
  {
    slug: 'checklist-antes-de-lanzar-una-web',
    title: 'Checklist antes de lanzar tu web: técnico, SEO y legal',
    seoTitle: 'Checklist para lanzar una web: SEO y legal',
    description:
      'Comprobaciones antes de publicar una web: redirecciones, metadatos, sitemap, datos estructurados, velocidad, textos legales, analítica y alta en buscadores.',
    category: 'SEO técnico',
    readMinutes: 7,
    published: DATE,
    updated: DATE,
    intro:
      'Publicar una web es solo el comienzo. Esta lista reúne lo que revisamos antes de lanzar cada proyecto para que buscadores, personas y asistentes de IA puedan encontrarlo y entenderlo.',
    sections: [
      {
        h: 'Técnico',
        ul: [
          'HTTPS activo y una única versión de la URL (con o sin www) con redirección 301.',
          'Cada página con un título y una descripción únicos y una etiqueta canonical.',
          'Una página 404 real que devuelva estado 404.',
          'Sitemap.xml accesible y robots.txt que permita rastrear.',
          'Imágenes optimizadas y texto alternativo descriptivo.',
          'Versión móvil revisada y velocidad comprobada en dispositivos reales.',
        ],
      },
      {
        h: 'SEO y datos estructurados',
        ul: [
          'Un solo h1 por página y jerarquía lógica de encabezados.',
          'Datos estructurados: organización, migas de pan, servicios y preguntas frecuentes.',
          'Enlaces internos entre servicios, sectores y guías.',
          'Imagen para compartir (Open Graph) por página.',
        ],
      },
      {
        h: 'Contenido',
        ul: [
          'Cada servicio explicado con un lenguaje que use tu cliente.',
          'Preguntas frecuentes reales y respuestas directas.',
          'Datos de contacto visibles y consistentes en toda la web.',
          'Ejemplos de trabajo con contexto.',
        ],
      },
      {
        h: 'Legal y privacidad',
        ul: [
          'Aviso legal, política de privacidad y política de cookies.',
          'Formulario con información básica de protección de datos y casilla de aceptación.',
          'Banner de cookies solo si se usan cookies que lo requieran.',
        ],
      },
      {
        h: 'Después de publicar',
        ul: [
          'Alta en Google Search Console y Bing Webmaster Tools, y envío del sitemap.',
          'Perfil de Empresa de Google con los mismos datos que la web.',
          'Notificación de cambios con IndexNow.',
          'Revisión mensual de consultas, páginas indexadas y velocidad.',
        ],
      },
    ],
    faq: [
      { q: '¿Qué debo revisar antes de publicar una web?', a: 'HTTPS y redirecciones, metadatos únicos, sitemap y robots, versión móvil, velocidad, textos legales y analítica, además del alta en Search Console.' },
      { q: '¿Cuánto tarda Google en indexar una web nueva?', a: 'Varía; enviar el sitemap y pedir la inspección de las páginas principales en Search Console ayuda a acelerarlo, pero no hay plazo garantizado.' },
    ],
    services: ['desarrollo-web'],
    sectors: [],
    keywords: ['checklist lanzar página web', 'SEO técnico básico', 'qué revisar antes de publicar una web', 'lista de comprobación SEO', 'alta web en Google Search Console'],
  },
  {
    slug: 'seo-para-empresas-de-reformas',
    title: 'SEO para empresas de reformas: cómo conseguir presupuestos desde Google',
    seoTitle: 'SEO para empresas de reformas: guía local',
    description:
      'Cómo posicionar una empresa de reformas en Google: web por servicios y zonas, proyectos con contenido, Perfil de Empresa, reseñas y publicidad local.',
    category: 'SEO local',
    readMinutes: 7,
    published: DATE,
    updated: DATE,
    intro:
      'Quien busca una reforma suele escribir el servicio y el lugar: «reforma de baño en Gavà», «reformas integrales Viladecans». Esta guía resume el enfoque que aplicamos con empresas del sector.',
    sections: [
      {
        h: 'Una página por servicio y por zona',
        p: ['Cada servicio principal (cocinas, baños, reforma integral, rehabilitación) merece su propia página, con contenido útil y no copiado. Si trabajas en varias zonas, trata cada zona con contenido propio, no con textos duplicados que solo cambian el nombre.'],
      },
      {
        h: 'Proyectos como contenido que posiciona',
        p: ['Cada obra terminada es una oportunidad: fotos reales, el tipo de reforma, el problema que había y cómo se resolvió. Con un panel que permita publicarlas en minutos, es más fácil mantener el hábito.'],
      },
      {
        h: 'Perfil de Empresa de Google y reseñas',
        p: ['El perfil de empresa con categoría, zona de servicio, fotos y reseñas influye mucho en las búsquedas locales. Pide una reseña a cada cliente al cerrar la obra y respóndelas todas.'],
      },
      {
        h: 'Un formulario que no espante',
        p: ['Una web que posiciona pero tiene un formulario largo pierde gente. Pocos campos, respuesta rápida y un botón de WhatsApp reducen la fricción.'],
      },
      {
        h: 'Publicidad para acelerar',
        p: ['El SEO tarda; la publicidad online puede llevar tráfico cualificado desde el primer día. Combinar ambas permite medir qué búsquedas traen solicitudes y reforzar las que funcionan.'],
      },
      {
        h: 'Medir de dónde vienen las solicitudes',
        p: ['Guardar la página de origen, el proyecto consultado y la campaña de cada solicitud permite decidir dónde invertir. Nuestro CRM lo registra automáticamente.'],
      },
    ],
    faq: [
      { q: '¿Cómo aparecer en Google siendo una empresa de reformas?', a: 'Con una web rápida con páginas por servicio y zona, proyectos publicados con buen contenido, un perfil de empresa en Google con reseñas y, si quieres acelerar, publicidad local.' },
      { q: '¿Cuánto tarda en notarse el SEO?', a: 'Depende de la competencia y de la zona; es un trabajo que se mide en meses. Por eso conviene combinarlo con publicidad mientras madura.' },
      { q: '¿Qué páginas necesita la web de una empresa de reformas?', a: 'Inicio, servicios (uno por página), proyectos, sobre nosotros, opiniones de clientes y contacto o presupuesto.' },
    ],
    services: ['diseno-web', 'desarrollo-web'],
    sectors: ['reformas-y-construccion'],
    keywords: ['SEO para reformas', 'posicionar empresa de reformas en Google', 'marketing digital reformas', 'SEO local reformas', 'captar clientes de reformas online'],
  },
  {
    slug: 'que-debe-tener-la-web-de-una-inmobiliaria',
    title: 'Qué debe tener la web de una inmobiliaria',
    seoTitle: 'Qué debe tener la web de una inmobiliaria',
    description:
      'Funciones imprescindibles en la web de una inmobiliaria: catálogo con filtros, fichas completas, multidioma, SEO por propiedad y un CRM para gestionarlo.',
    category: 'Inmobiliarias',
    readMinutes: 6,
    published: DATE,
    updated: DATE,
    intro:
      'La web de una inmobiliaria es, sobre todo, un catálogo. Cómo se presenta cada propiedad y con qué facilidad se encuentra determina cuántas consultas llegan.',
    sections: [
      {
        h: 'Catálogo con filtros útiles',
        p: ['Zona, precio, habitaciones, baños y metros son los filtros que más se esperan. Lo ideal es que se generen automáticamente a partir de los atributos de cada propiedad, para no mantenerlos a mano.'],
      },
      {
        h: 'Fichas completas',
        ul: [
          'Galería de fotografías de calidad.',
          'Precio, superficie, habitaciones, baños y características destacadas.',
          'Ubicación y descripción única, no copiada de otros portales.',
          'Botones claros para pedir información o visitar.',
        ],
      },
      {
        h: 'Multidioma',
        p: ['Si atiendes a compradores internacionales, ofrecer la web en su idioma marca la diferencia. Requiere URLs por idioma y etiquetas hreflang bien configuradas.'],
      },
      {
        h: 'SEO por propiedad',
        p: ['Cada ficha necesita su URL, su título, su descripción y una imagen para compartir. Un panel con vista previa facilita revisarlo al publicar.'],
      },
      {
        h: 'Gestión de consultas',
        p: ['Cada solicitud debería crear un contacto con su origen y avanzar por etapas: nuevo, contactado, visita, oferta y cerrado, con responsable asignado.'],
      },
      {
        h: 'Un CRM que lo una todo',
        p: ['Con un CRM conectado a la web, el catálogo, las consultas y la analítica viven en el mismo sitio. Es lo que usa Regia Mare, una inmobiliaria premium de la costa de Barcelona.'],
      },
    ],
    faq: [
      { q: '¿Qué funciones necesita la web de una inmobiliaria?', a: 'Catálogo con filtros, fichas completas, formularios de contacto, versión en varios idiomas, SEO por propiedad y un panel para publicar y gestionar consultas.' },
      { q: '¿Merece la pena tener una web propia además de los portales?', a: 'Sí: la web propia refuerza tu marca, permite captar consultas directas y no depende de las condiciones de un portal.' },
    ],
    services: ['diseno-web', 'desarrollo-web'],
    sectors: ['inmobiliarias'],
    keywords: ['web para inmobiliaria', 'qué debe tener una web inmobiliaria', 'diseño web agencia inmobiliaria', 'filtros de propiedades web', 'web inmobiliaria multidioma'],
  },
  {
    slug: 'web-de-reservas-para-transfers-y-vtc',
    title: 'Web de reservas para transfers y VTC: cómo plantearla',
    seoTitle: 'Web de reservas para transfers y VTC',
    description:
      'Cómo plantear una web de reservas para transfers o VTC: formulario en la primera pantalla, precio cerrado, pagos online y panel de flota y chóferes.',
    category: 'Transfers',
    readMinutes: 6,
    published: DATE,
    updated: DATE,
    intro:
      'En un servicio de transfers cada paso de más en la reserva es una oportunidad para abandonar. Esta guía resume cómo plantear la web y el sistema que hay detrás.',
    sections: [
      {
        h: 'El formulario, en la primera pantalla',
        p: ['Origen, destino, fecha y pasajeros deben estar a la vista desde el primer momento, también en el móvil, donde se hace buena parte de las reservas.'],
      },
      {
        h: 'Precio cerrado',
        p: ['Mostrar el precio final, con IVA y peajes incluidos, evita dudas y llamadas. Para calcularlo al instante hace falta un modelo de tarifas bien definido en el sistema.'],
      },
      {
        h: 'Pagos online',
        p: ['Aceptar tarjeta, Apple Pay, Google Pay y PayPal reduce fricción. La confirmación inmediata por correo transmite seguridad.'],
      },
      {
        h: 'Servicios a medida',
        p: ['Bodas, eventos, servicio por horas o varias paradas se resuelven mejor con una solicitud de presupuesto cerrado que con una reserva estándar.'],
      },
      {
        h: 'El panel de la operativa',
        p: ['Detrás de la web hace falta un sistema para flota, chóferes y servicios. Si no, las reservas online se convierten en más trabajo manual. Es lo que construimos para Vemaro Transfers.'],
      },
      {
        h: 'SEO de transfers',
        p: ['Las búsquedas combinan origen y destino («transfer aeropuerto de Barcelona a…»). Páginas por ruta y por tipo de servicio, con información útil, ayudan a captarlas.'],
      },
    ],
    faq: [
      { q: '¿Qué necesita una web de transfers?', a: 'Formulario de reserva claro, precio cerrado, pagos online, confirmación inmediata, páginas por ruta y servicio, y un panel interno para flota y chóferes.' },
      { q: '¿Cuánto cuesta un sistema de reservas a medida?', a: 'Depende del alcance. Se presupuesta por fases tras una primera conversación gratuita.' },
    ],
    services: ['software-a-medida', 'desarrollo-web'],
    sectors: ['transfers-y-movilidad'],
    keywords: ['web de reservas transfers', 'sistema de reservas VTC', 'software para empresa de transfers', 'pagos online reservas', 'reserva transfer aeropuerto web'],
  },
  {
    slug: 'analitica-web-sin-cookies',
    title: 'Analítica web sin cookies: qué mide y cómo funciona',
    seoTitle: 'Analítica web sin cookies: qué mide',
    description:
      'Cómo funciona la analítica web sin cookies, qué se puede medir (visitas, páginas, clics, lectura) y en qué se diferencia de Google Analytics.',
    category: 'Analítica',
    readMinutes: 6,
    published: DATE,
    updated: DATE,
    intro:
      'Medir una web no obliga a llenarla de cookies. Existe una forma de contar visitas y clics que no toca el dispositivo de la persona ni la identifica. Así funciona la que incluye nuestro CRM.',
    sections: [
      {
        h: 'Cómo funciona',
        p: ['El navegador informa de qué ocurrió (la ruta, el tipo de evento, el idioma y de dónde viene la visita). El servidor añade el visitante como un identificador anónimo, además del país y el dispositivo. No se guardan cookies ni datos en el navegador.'],
      },
      {
        h: 'Qué se puede medir',
        ul: [
          'Visitantes únicos, páginas vistas y páginas más visitadas.',
          'De dónde llegan las visitas.',
          'Clics en teléfono y en correo.',
          'Formularios enviados.',
          'Hasta dónde se lee cada página y cuánto tiempo se pasa en ella.',
          'Páginas que no existen y cuántas veces se pidieron.',
        ],
      },
      {
        h: 'Diferencia con Google Analytics',
        p: ['Las herramientas basadas en cookies de terceros requieren consentimiento previo y dejan de medir a quien rechaza el banner. La medición propia sin cookies sigue funcionando, aunque con menos detalle sobre la persona.'],
      },
      {
        h: 'Privacidad',
        p: [
          'Al no usar cookies ni almacenamiento en el dispositivo, no se aplica la obligación de consentimiento de cookies; aun así, conviene informar en la política de privacidad y respetar la oposición del usuario y señales como Global Privacy Control.',
          'Esta guía es informativa y no constituye asesoramiento jurídico: consulta con tu asesor legal cómo aplica a tu caso.',
        ],
      },
    ],
    faq: [
      { q: '¿Se puede medir una web sin cookies?', a: 'Sí. Se pueden medir visitas, páginas, clics y lectura con un identificador anónimo en el servidor, sin guardar nada en el dispositivo.' },
      { q: '¿Necesito banner de cookies si uso analítica sin cookies?', a: 'Para esa medición no, porque no hay cookies. Si usas otras herramientas con cookies (publicidad o analítica de terceros) sí. Consulta tu caso con un asesor legal.' },
    ],
    services: ['desarrollo-web'],
    sectors: [],
    keywords: ['analítica web sin cookies', 'alternativa a Google Analytics', 'medir web sin banner de cookies', 'analítica web RGPD', 'estadísticas web privadas'],
  },
  {
    slug: 'seo-para-ia-como-aparecer-en-chatgpt-y-gemini',
    title: 'SEO para IA: cómo aparecer en ChatGPT, Gemini, Perplexity y Claude',
    seoTitle: 'SEO para IA (GEO): aparecer en ChatGPT',
    description:
      'SEO para inteligencia artificial: permitir los bots, llms.txt, datos estructurados, preguntas frecuentes, consistencia de la entidad y medición de citaciones.',
    category: 'SEO para IA',
    readMinutes: 8,
    published: DATE,
    updated: DATE,
    intro:
      'Cada vez más gente pregunta a un asistente de IA en lugar de buscar en Google. Aparecer en esas respuestas requiere lo mismo que el buen SEO, más algunos detalles específicos. Esto es lo que aplicamos en moiraordo.es.',
    sections: [
      {
        h: 'Cómo eligen las fuentes los asistentes',
        p: ['Los asistentes con búsqueda consultan un índice de la web, resumen las páginas más relevantes y citan algunas. Por eso las páginas claras, rastreables y con información verificable tienen más opciones de ser citadas. No hay garantía de aparecer: nadie controla la respuesta final.'],
      },
      {
        h: '1. Permite el acceso a los bots de IA',
        p: ['En robots.txt conviene permitir los rastreadores de búsqueda y citación: OAI-SearchBot y ChatGPT-User (OpenAI), Claude-SearchBot y Claude-User (Anthropic), PerplexityBot, Google-Extended, Applebot-Extended y otros. Si prefieres no participar en el entrenamiento de modelos, puedes bloquear solo los de entrenamiento (como GPTBot o ClaudeBot) y dejar los de búsqueda.'],
      },
      {
        h: '2. Publica un llms.txt',
        p: ['Es un archivo propuesto como estándar en la raíz del sitio que resume quién eres, qué ofreces y enlaza a las páginas clave. Algunos asistentes lo utilizan y otros no; cuesta poco y ordena tu propia información. El nuestro está en moiraordo.es/llms.txt, con una versión completa en llms-full.txt.'],
      },
      {
        h: '3. Ofrece versiones en Markdown',
        p: ['Una versión limpia de cada página sin menús ni scripts es más fácil de procesar. En nuestro sitio, cada página tiene su versión en Markdown añadiendo .md a la URL.'],
      },
      {
        h: '4. Datos estructurados',
        p: ['Los datos estructurados (schema.org) declaran sin ambigüedad quién eres, qué servicios ofreces, dónde trabajas y qué preguntas respondes: Organization, Service, FAQPage, Article y BreadcrumbList son los más útiles.'],
      },
      {
        h: '5. Responde preguntas reales con respuestas directas',
        p: ['Los asistentes extraen respuestas cortas. Una pregunta clara seguida de una respuesta de dos o tres frases, con datos concretos, es el formato que mejor funciona: precios de partida, plazos de respuesta, qué incluye cada servicio.'],
      },
      {
        h: '6. Consistencia de la entidad',
        p: ['Que el nombre, la descripción, los servicios y los datos de contacto coincidan en tu web, tu Perfil de Empresa de Google, LinkedIn y otros directorios ayuda a que el asistente te identifique como una sola entidad.'],
      },
      {
        h: '7. Mide las citaciones',
        p: ['Una vez al mes, haz las mismas preguntas en varios asistentes («¿quién hace webs a medida con CRM en Barcelona?») y anota si te citan, con qué datos y si son correctos. Corrige en la web lo que salga mal.'],
      },
    ],
    faq: [
      { q: '¿Qué es el SEO para IA o GEO?', a: 'Es el conjunto de acciones para que los asistentes de inteligencia artificial entiendan tu negocio, lo recomienden y lo citen en sus respuestas. Se apoya en el buen SEO tradicional.' },
      { q: '¿Sirve el archivo llms.txt?', a: 'Es una propuesta de estándar que algunos asistentes utilizan y otros no. Ayuda a ordenar tu información y cuesta poco, pero no sustituye a una web clara y bien estructurada.' },
      { q: '¿Cómo sé si ChatGPT me cita?', a: 'Haz una vez al mes las preguntas que haría un cliente en ChatGPT, Gemini, Perplexity, Claude y Copilot, y anota si aparece tu marca y con qué información.' },
    ],
    services: ['desarrollo-web'],
    sectors: [],
    keywords: ['SEO para IA', 'GEO generative engine optimization', 'cómo aparecer en ChatGPT', 'llms.txt', 'optimización para asistentes de IA', 'AEO answer engine optimization', 'aparecer en Perplexity'],
  },
  {
    slug: 'como-elegir-agencia-de-diseno-web',
    title: 'Cómo elegir una agencia o estudio de diseño web',
    seoTitle: 'Cómo elegir agencia de diseño web: preguntas clave',
    description:
      'Preguntas que conviene hacer antes de contratar una agencia o estudio de diseño web: proyectos reales, propiedad del código, mantenimiento, SEO y forma de trabajar.',
    category: 'Decisiones',
    readMinutes: 5,
    published: DATE,
    updated: DATE,
    intro:
      'Elegir con quién trabajar importa tanto como el presupuesto. Estas son las preguntas que haríamos nosotros si estuviéramos al otro lado.',
    sections: [
      {
        h: 'Mira proyectos reales y publicados',
        p: ['Pide ver webs que estén online, no solo maquetas. Fíjate en su velocidad, su versión móvil y si el diseño se parece a otros del mismo estudio.'],
      },
      {
        h: 'Pregunta cómo trabajan',
        p: ['Un proceso claro (escuchar, diseñar, construir y acompañar) evita sorpresas. Pregunta qué entregas hay, cuántas rondas de cambios y quién será tu interlocutor.'],
      },
      {
        h: 'Aclara la propiedad y la autonomía',
        ul: [
          '¿Quién es el propietario del dominio y del código?',
          '¿Podré actualizar el contenido sin depender del estudio?',
          '¿Qué pasa si más adelante quiero cambiar de proveedor?',
        ],
      },
      {
        h: 'SEO desde el principio',
        p: ['El SEO técnico (estructura, metadatos, velocidad) se decide al diseñar y programar, no después. Pregunta qué incluye.'],
      },
      {
        h: 'Cuánto vale el acompañamiento',
        p: ['Una web necesita cuidados después del lanzamiento. Pregunta por mantenimiento, soporte y tiempos de respuesta.'],
      },
    ],
    faq: [
      { q: '¿Qué preguntar a una agencia de diseño web antes de contratarla?', a: 'Por proyectos reales publicados, el proceso de trabajo, la propiedad del código y el dominio, el SEO incluido y el mantenimiento posterior.' },
      { q: '¿Agencia, estudio o freelance?', a: 'Depende del tamaño del proyecto. Un estudio pequeño con equipo de diseño y desarrollo suele ofrecer trato cercano y capacidad para proyectos completos.' },
    ],
    services: ['diseno-web', 'desarrollo-web'],
    sectors: [],
    keywords: ['cómo elegir agencia de diseño web', 'qué preguntar a una agencia web', 'contratar diseñador web', 'estudio de diseño web Barcelona', 'agencia de desarrollo web a medida'],
  },
  {
    slug: 'juegos-html5-para-marcas-y-eventos',
    title: 'Juegos HTML5 para marcas y eventos: qué son y para qué sirven',
    seoTitle: 'Juegos HTML5 para marcas y eventos',
    description:
      'Qué son los juegos HTML5, por qué se abren con un enlace sin instalar nada y cómo pueden usarlos las marcas en campañas y eventos. Ejemplos: MusiBingo y MatchRise.',
    category: 'Juegos',
    readMinutes: 5,
    published: DATE,
    updated: DATE,
    intro:
      'Un juego HTML5 se abre desde el navegador del móvil o del ordenador: sin descargas ni tiendas de aplicaciones. Eso lo hace ideal para campañas, eventos y experiencias que se comparten con un enlace.',
    sections: [
      {
        h: 'Qué es un juego HTML5',
        p: ['Es un juego construido con tecnologías web estándar que funciona en cualquier navegador moderno. Se publica en una dirección web y se juega al instante.'],
      },
      {
        h: 'Para qué lo pueden usar las marcas',
        ul: [
          'Campañas con una mecánica jugable que se comparte fácilmente.',
          'Experiencias para eventos, ferias y celebraciones.',
          'Un juego propio como producto o como imagen de marca.',
        ],
      },
      {
        h: 'Ejemplos de Moira Ordo Games',
        ul: [
          'MusiBingo: un bingo musical para jugar en grupo, creando o uniéndose a una partida.',
          'MatchRise: un manager de fútbol por rondas que empieza en Sexta División.',
        ],
      },
      {
        h: 'Cómo es el proceso',
        p: ['Partimos del concepto y de lo que se quiere conseguir, diseñamos la experiencia, desarrollamos el juego en HTML5 y lo publicamos en tu dominio con soporte posterior.'],
      },
    ],
    faq: [
      { q: '¿Qué es un juego HTML5?', a: 'Un juego que se abre desde el navegador del móvil o del ordenador, sin instalar ninguna aplicación.' },
      { q: '¿Cuánto cuesta desarrollar un juego HTML5?', a: 'Depende de su mecánica y alcance. Se presupuesta a medida tras una primera conversación gratuita.' },
    ],
    services: ['juegos-html5'],
    sectors: [],
    keywords: ['juegos HTML5', 'desarrollo de juegos HTML5', 'juego para marcas', 'advergaming', 'juego para eventos', 'bingo musical online', 'manager de fútbol online'],
  },
  {
    slug: 'diseno-de-marca-para-pymes',
    title: 'Diseño de marca para pymes: qué incluye y por qué importa',
    seoTitle: 'Diseño de marca para pymes: qué incluye',
    description:
      'Qué incluye una identidad de marca para una pyme (logotipo, colores, tipografías y tarjetas), por qué conviene tenerla antes de la web y qué archivos recibir.',
    category: 'Marca',
    readMinutes: 5,
    published: DATE,
    updated: DATE,
    intro:
      'Una marca no es solo un logotipo: es la forma coherente en la que tu negocio se presenta en la web, las redes, los documentos y los materiales impresos.',
    sections: [
      {
        h: 'Qué incluye una identidad de marca básica',
        ul: [
          'Logotipo y sus variantes.',
          'Paleta de colores.',
          'Tipografías.',
          'Tarjetas de visita.',
          'Archivos listos para web, redes sociales e impresión.',
        ],
      },
      {
        h: 'Por qué conviene antes de la web',
        p: ['La identidad es la base visual sobre la que se diseña la web. Si cambias después, hay que rehacer parte del trabajo.'],
      },
      {
        h: 'Qué pedir al terminar',
        p: ['Los archivos en formatos abiertos y las normas básicas de uso: colores exactos, tipografías y espacios mínimos alrededor del logotipo.'],
      },
      {
        h: 'Cómo lo hacemos',
        p: ['Partimos de los valores y del público de tu negocio. El diseño de marca parte desde 199 € y se puede combinar con el diseño de la web.'],
      },
    ],
    faq: [
      { q: '¿Qué incluye el diseño de marca?', a: 'Logotipo y variantes, paleta de colores, tipografías, tarjetas de visita y archivos para web, redes e impresión.' },
      { q: '¿Cuánto cuesta diseñar una marca para una pyme?', a: 'En Moira Ordo el diseño de marca parte desde 199 € y se ajusta a lo que necesites.' },
    ],
    services: ['diseno-de-marca', 'diseno-web'],
    sectors: [],
    keywords: ['diseño de marca para pymes', 'identidad corporativa pequeña empresa', 'diseño de logotipo', 'branding para pymes', 'tarjetas de visita diseño'],
  },
]
