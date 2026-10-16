// Fuente única de los servicios: alimenta la tabla de tarifas de /servicios,
// las páginas /servicios/:slug, los datos estructurados y el sitemap.
// `priceFrom` en euros (null = presupuesto a medida).

export const SERVICES = [
  {
    slug: 'diseno-web',
    name: 'Diseño web',
    summary: 'Interfaz a medida pensada para tu marca y tus usuarios.',
    priceFrom: 199,
    contactType: 'Nueva página web',
    seoTitle: 'Diseño web a medida desde 199 €',
    seoDescription:
      'Diseño de páginas web a medida, sin plantillas: interfaz pensada para tu marca y tus usuarios, responsive y lista para desarrollarse. Desde 199 €.',
    headline: 'Una web que se parece a tu marca, no a una plantilla',
    intro:
      'Diseñamos la interfaz de tu web desde cero: estructura, jerarquía visual, tipografía y color pensados para tu marca y para lo que tus usuarios necesitan encontrar.',
    paragraphs: [
      'Partimos de una conversación sobre tu negocio y tu público. Con eso definimos la arquitectura de la web —qué páginas hay, qué contiene cada una y cómo se conectan— antes de dibujar una sola pantalla.',
      'Después diseñamos cada página en versión escritorio, tablet y móvil, con un sistema visual coherente que facilita que la web crezca sin perder su identidad.',
    ],
    includes: [
      'Arquitectura de contenidos y estructura de páginas',
      'Diseño responsive para escritorio, tablet y móvil',
      'Sistema visual: tipografías, colores y componentes',
      'Diseño preparado para desarrollarse sobre nuestro CRM',
    ],
    faq: [
      {
        q: '¿Cuánto cuesta el diseño de una web?',
        a: 'El diseño web parte desde 199 €. El precio final depende del número de páginas y de su complejidad; te enviamos un presupuesto cerrado después de una primera conversación gratuita.',
      },
      {
        q: '¿Usáis plantillas?',
        a: 'No. Cada diseño se hace a medida para tu marca y tu proyecto.',
      },
      {
        q: '¿El diseño incluye la versión móvil?',
        a: 'Sí. Diseñamos cada página para escritorio, tablet y móvil.',
      },
    ],
  },
  {
    slug: 'desarrollo-web',
    name: 'Desarrollo web',
    summary: 'Tu web construida sobre Moira Ordo: estable, rápida y autogestionable.',
    priceFrom: 299,
    contactType: 'Nueva página web',
    seoTitle: 'Desarrollo web autogestionable desde 299 €',
    seoDescription:
      'Desarrollo de webs a medida sobre el CRM de Moira Ordo: rápidas, estables y con contenido que gestionas tú sin tocar el diseño. Desde 299 €.',
    headline: 'Tu web, rápida y estable, con contenido que gestionas tú',
    intro:
      'Convertimos el diseño en una web real construida sobre Moira Ordo, nuestro CRM: tú actualizas textos, imágenes y catálogo desde un panel, y el diseño se mantiene intacto.',
    paragraphs: [
      'Programamos con código limpio y pensado para rendir: carga rápida, buena puntuación en buscadores y una experiencia fluida en cualquier dispositivo.',
      'El contenido vive en nuestro CRM, así que no dependes de nadie para publicar una novedad, cambiar un precio o añadir un proyecto. Y si un día necesitas más funciones, la web crece sin rehacerla.',
    ],
    includes: [
      'Desarrollo a medida del diseño aprobado',
      'Conexión con el CRM de Moira Ordo para gestionar el contenido',
      'Optimización de velocidad y SEO técnico',
      'Formulario de contacto y analítica sin cookies',
    ],
    faq: [
      {
        q: '¿Cuánto cuesta desarrollar una web?',
        a: 'El desarrollo web parte desde 299 €. Te damos un presupuesto a medida según las páginas y funcionalidades que necesites.',
      },
      {
        q: '¿Podré actualizar la web yo mismo?',
        a: 'Sí. Gestionas textos, imágenes y catálogo desde el panel de nuestro CRM, sin tocar código y sin romper el diseño.',
      },
      {
        q: '¿Ofrecéis mantenimiento?',
        a: 'Sí, te acompañamos después del lanzamiento con mantenimiento y soporte para que la web siga actualizada y segura.',
      },
    ],
  },
  {
    slug: 'diseno-de-marca',
    name: 'Diseño de marca',
    summary: 'Branding, logo, paleta de colores y tarjetas.',
    priceFrom: 199,
    contactType: 'Otro',
    seoTitle: 'Diseño de marca y logotipo desde 199 €',
    seoDescription:
      'Diseño de identidad de marca: logotipo, paleta de colores, tipografías y tarjetas de visita para que tu negocio se reconozca en todas partes. Desde 199 €.',
    headline: 'Una identidad que se reconoce a primera vista',
    intro:
      'Creamos la identidad visual de tu negocio: logotipo, paleta de colores, tipografías y aplicaciones básicas como las tarjetas de visita.',
    paragraphs: [
      'Una marca coherente transmite confianza. Trabajamos a partir de los valores de tu negocio para que el logotipo y el resto de elementos cuenten la misma historia.',
      'Te entregamos los archivos listos para usar en web, redes sociales e impresión, y la base visual sobre la que después podemos diseñar tu web.',
    ],
    includes: [
      'Logotipo y sus variantes',
      'Paleta de colores y tipografías',
      'Diseño de tarjetas de visita',
      'Archivos listos para web, redes e impresión',
    ],
    faq: [
      {
        q: '¿Cuánto cuesta diseñar una marca?',
        a: 'El diseño de marca parte desde 199 € e incluye logotipo, paleta de colores y tarjetas. Ajustamos el presupuesto a lo que necesites.',
      },
      {
        q: '¿Puedo combinarlo con el diseño de mi web?',
        a: 'Sí. Es lo ideal: la identidad de marca es la base visual sobre la que diseñamos la web.',
      },
    ],
  },
  {
    slug: 'software-a-medida',
    name: 'Software a medida',
    summary: 'Herramientas y sistemas adaptados a la operativa de tu negocio.',
    priceFrom: null,
    contactType: 'Backend para mi negocio',
    seoTitle: 'Software a medida para tu negocio',
    seoDescription:
      'Desarrollamos software a medida: plataformas SaaS, paneles de gestión y sistemas con pagos integrados adaptados a la operativa de tu negocio.',
    headline: 'Herramientas hechas para cómo trabaja tu negocio',
    intro:
      'Cuando una web no basta, construimos el sistema que tu negocio necesita: paneles de gestión, reservas, pagos integrados o plataformas SaaS completas.',
    paragraphs: [
      'Analizamos tu operativa para diseñar un modelo de datos a medida y automatizar lo que hoy haces a mano. Un ejemplo es Vemaro Transfers: un SaaS para gestionar flota y reservas con un frontal responsive y pagos integrados.',
      'Desarrollamos por fases, con entregas que puedes probar desde el principio, y dejamos el sistema preparado para crecer contigo.',
    ],
    includes: [
      'Análisis de la operativa y modelo de datos a medida',
      'Panel de gestión y roles de usuario',
      'Integraciones: pagos, emails y servicios externos',
      'Frontal web responsive conectado al sistema',
    ],
    faq: [
      {
        q: '¿Cuánto cuesta un software a medida?',
        a: 'Depende del alcance. Tras una primera conversación gratuita te preparamos un presupuesto a medida por fases.',
      },
      {
        q: '¿Podéis integrar pagos online?',
        a: 'Sí, integramos pasarelas de pago en el frontal y en el panel de gestión.',
      },
    ],
  },
  {
    slug: 'juegos-html5',
    name: 'Juegos móviles HTML5',
    summary: 'Experiencias jugables para web y móvil con Moira Ordo Games.',
    priceFrom: null,
    contactType: 'Otro',
    seoTitle: 'Desarrollo de juegos HTML5 para web y móvil',
    seoDescription:
      'Moira Ordo Games desarrolla juegos HTML5 a medida que se juegan desde el navegador del móvil o del ordenador, sin instalar nada.',
    headline: 'Juegos que se juegan en el navegador, sin instalar nada',
    intro:
      'Con Moira Ordo Games creamos juegos HTML5 a medida para web y móvil: se abren con un enlace y funcionan en cualquier navegador.',
    paragraphs: [
      'Hemos lanzado MusiBingo, un bingo musical para jugar en grupo, y MatchRise, un manager de fútbol por rondas. Los dos funcionan directamente en el navegador.',
      'Podemos desarrollar un juego propio para tu marca, un evento o una campaña, con el mismo cuidado por el diseño y la estabilidad que ponemos en nuestras webs.',
    ],
    includes: [
      'Concepto y diseño del juego',
      'Desarrollo HTML5 para móvil y escritorio',
      'Publicación en tu dominio, sin descargas',
      'Ajustes y soporte tras el lanzamiento',
    ],
    faq: [
      {
        q: '¿Hace falta descargar una app?',
        a: 'No. Los juegos HTML5 se abren con un enlace desde el navegador del móvil o del ordenador.',
      },
      {
        q: '¿Cuánto cuesta desarrollar un juego?',
        a: 'Cada juego se presupuesta a medida según su mecánica y alcance, después de una primera conversación gratuita.',
      },
    ],
  },
]

export const PROCESS = [
  { title: 'Escuchamos', text: 'Entendemos tu proyecto, tu audiencia y tus objetivos reales.' },
  { title: 'Diseñamos', text: 'Creamos una estructura visual y funcional pensada para durar.' },
  { title: 'Construimos', text: 'Desarrollamos con código limpio y sistemas robustos.' },
  { title: 'Acompañamos', text: 'Te enseñamos a gestionar tu contenido con total autonomía.' },
]

export const formatPrice = (euros) => `${euros} €`
