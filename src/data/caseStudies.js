// Casos de éxito y testimonio de la home.
// IMPORTANTE: las cifras y las frases son una propuesta redactada a partir de cada web
// entregada. Hay que validarlas (o sustituirlas por datos reales) con cada cliente antes
// de publicar: un testimonio o un dato inventado no puede presentarse como real.

export const CASE_STUDIES = [
  {
    client: 'Vemaro Transfers',
    sector: 'Transfers privados · Barcelona',
    href: 'https://www.vemarotransfers.com/',
    challenge:
      'Las reservas llegaban por WhatsApp y teléfono, cada presupuesto se calculaba a mano y la flota se organizaba en hojas de cálculo.',
    solution:
      'Un SaaS a medida para gestionar flota, chóferes y reservas, con un frontal que calcula el precio cerrado al instante y cobra con tarjeta, Apple Pay, Google Pay o PayPal.',
    metrics: [
      { value: '78 %', label: 'de las reservas, ya online' },
      { value: '< 1 min', label: 'para reservar y pagar un traslado' },
      { value: '−60 %', label: 'de tiempo en gestión diaria' },
    ],
    quote:
      'Antes cerrábamos cada traslado por WhatsApp y a deshoras. Ahora el cliente reserva y paga solo, y cuando abrimos el panel la flota ya está organizada.',
    author: 'Dirección, Vemaro Transfers',
    accent: 'var(--accent-yellow)',
  },
  {
    client: 'Arquelia',
    sector: 'Reformas premium · Cataluña',
    href: 'https://arquelia.es/',
    services: 'Web + CRM + marketing online y publicidad',
    challenge:
      'Su web anterior no transmitía el nivel de acabado de sus obras, casi nadie los encontraba en Google y publicar un proyecto nuevo dependía siempre de un desarrollador.',
    solution:
      'Una web editorial de diseñador conectada a nuestro CRM, más su marketing online: SEO para aparecer cuando buscan reformas premium y campañas de publicidad que llevan tráfico cualificado al formulario.',
    metrics: [
      { value: '×2,4', label: 'solicitudes de presupuesto' },
      { value: '+120 %', label: 'de visitas desde buscadores' },
      { value: '5 min', label: 'para publicar una obra terminada' },
    ],
    quote:
      'La web por fin se parece a nuestras obras, y además se ocupan de que nos encuentren. Ahora los clientes llegan sabiendo ya el nivel de acabado que buscan.',
    author: 'Gerencia, Arquelia',
    accent: '#c8f0d8',
  },
  {
    client: 'Reformas Llobregat',
    sector: 'Reformas integrales · Baix Llobregat',
    href: 'https://reformasllobregat.com/',
    services: 'Web + marketing online y publicidad',
    challenge:
      'Muy buen trabajo en obra pero poca presencia online: los presupuestos llegaban sobre todo por boca a boca y la web antigua casi no generaba solicitudes.',
    solution:
      'Una web pensada para convertir, con un formulario de presupuesto corto y rápido, SEO local para Gavà, Viladecans y Castelldefels, y campañas de publicidad que gestionamos nosotros cada mes.',
    metrics: [
      { value: '×4', label: 'clientes desde el formulario' },
      { value: '24-48 h', label: 'para enviar cada presupuesto' },
      { value: '4,9', label: 'de media en 28 opiniones de clientes' },
    ],
    quote:
      'Desde que cambiamos la web y empezaron a llevarnos la publicidad, el teléfono no para. El formulario nos trae cuatro veces más clientes que antes.',
    author: 'Gerencia, Reformas Llobregat',
    accent: 'var(--accent-yellow)',
  },
  {
    client: 'Regia Mare Properties',
    sector: 'Inmobiliaria · Costa de Barcelona',
    href: 'https://regiamare.com/',
    challenge:
      'Un catálogo de propiedades que cambia cada semana y compradores nacionales e internacionales que necesitaban encontrar rápido la vivienda adecuada.',
    solution:
      'Web premium sobre nuestro CRM: cada propiedad es una ficha con atributos propios —precio, zona, metros, dormitorios— y la web genera los filtros automáticamente.',
    metrics: [
      { value: '+65 %', label: 'contactos cualificados' },
      { value: '3 min', label: 'para dar de alta una propiedad' },
      { value: '40 %', label: 'de visitas internacionales' },
    ],
    quote:
      'Publicamos una propiedad en minutos y, con los filtros, el comprador llega directo a lo que busca. Las consultas que recibimos ahora son mucho más concretas.',
    author: 'Dirección comercial, Regia Mare Properties',
    accent: 'var(--accent-blue-light)',
  },
]

export const TESTIMONIAL = {
  quote:
    'Somos una empresa familiar y no teníamos tiempo para pelearnos con la web. Moira Ordo nos la dejó lista y ahora la actualizamos nosotros mismos, sin llamar a nadie.',
  author: 'Gerencia, Navagli Inversiones y Construcciones',
  text: 'Navagli publica sus proyectos de reforma y recibe las solicitudes de presupuesto desde el mismo panel con el que trabajan el resto de nuestros clientes.',
}
