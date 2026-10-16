// Datos ficticios para la demo del panel. Empresas, personas y cifras inventadas.

const DAY = 24 * 60 * 60 * 1000
const HOUR = 60 * 60 * 1000

export const ago = (ms) => new Date(Date.now() - ms)

export function relativeTime(date) {
  const diff = Date.now() - date.getTime()
  if (diff < HOUR) return `Hace ${Math.max(1, Math.round(diff / 60000))}m`
  if (diff < DAY) return `Hace ${Math.round(diff / HOUR)}h`
  return `Hace ${Math.round(diff / DAY)}d`
}

export const CURRENT_USER = {
  id: 'u1',
  username: 'laura.mendez',
  fullName: 'Laura Méndez',
}

export const ROLE_INFO = {
  admin: { label: 'Admin', bg: '#fee2e2', color: '#dc2626' },
  editor: { label: 'Editor', bg: '#eff6ff', color: '#2563eb' },
  viewer: { label: 'Visualizador', bg: '#f0fdf4', color: '#16a34a' },
}

export const STATUS_LABEL = {
  published: 'Publicado',
  draft: 'Borrador',
  archived: 'Archivado',
}

export const COMPANIES = [
  {
    id: 'c1',
    name: 'Costa Serena Homes',
    role: 'admin',
    color: '#0ea5e9',
    responsible: 'Laura Méndez',
    email: 'hola@costaserena.es',
    phone: '+34 931 245 678',
    website: 'costaserena.es',
    itemTypeNoun: 'Inmueble',
  },
  {
    id: 'c2',
    name: 'Atelier Nord Reformas',
    role: 'editor',
    color: '#f59e0b',
    responsible: 'Marc Puig',
    email: 'estudio@ateliernord.es',
    phone: '+34 932 118 904',
    website: 'ateliernord.es',
    itemTypeNoun: 'Proyecto',
  },
  {
    id: 'c3',
    name: 'Ruta Prime Transfers',
    role: 'viewer',
    color: '#10b981',
    responsible: 'Sergio Lado',
    email: 'reservas@rutaprime.es',
    phone: '+34 644 302 117',
    website: null,
    itemTypeNoun: 'Vehículo',
  },
]

export const ITEM_TYPES = {
  c1: [
    {
      key: 'propiedad',
      attributes: [
        { key: 'precio', label: 'Precio (€)', type: 'number', filterable: true, required: true },
        { key: 'habitaciones', label: 'Habitaciones', type: 'number', filterable: true, required: true },
        { key: 'banos', label: 'Baños', type: 'number', filterable: true, required: false },
        { key: 'superficie_m2', label: 'Superficie (m²)', type: 'number', filterable: true, required: true },
        { key: 'zona', label: 'Zona', type: 'select', filterable: true, required: true },
        { key: 'operacion', label: 'Operación', type: 'select', filterable: true, required: true },
        { key: 'piscina', label: 'Piscina', type: 'boolean', filterable: true, required: false },
        { key: 'terraza', label: 'Terraza', type: 'boolean', filterable: false, required: false },
        { key: 'certificado_energetico', label: 'Certificado energético', type: 'select', filterable: false, required: false },
      ],
    },
    {
      key: 'obra_nueva',
      attributes: [
        { key: 'promocion', label: 'Promoción', type: 'text', filterable: true, required: true },
        { key: 'unidades', label: 'Unidades disponibles', type: 'number', filterable: false, required: true },
        { key: 'entrega', label: 'Fecha de entrega', type: 'date', filterable: true, required: true },
        { key: 'precio_desde', label: 'Precio desde (€)', type: 'number', filterable: true, required: false },
      ],
    },
  ],
  c2: [
    {
      key: 'proyecto',
      attributes: [
        { key: 'tipo_reforma', label: 'Tipo de reforma', type: 'select', filterable: true, required: true },
        { key: 'superficie_m2', label: 'Superficie (m²)', type: 'number', filterable: true, required: true },
        { key: 'duracion_semanas', label: 'Duración (semanas)', type: 'number', filterable: false, required: false },
        { key: 'barrio', label: 'Barrio', type: 'text', filterable: true, required: true },
        { key: 'presupuesto', label: 'Presupuesto (€)', type: 'number', filterable: false, required: false },
        { key: 'antes_despues', label: 'Galería antes/después', type: 'boolean', filterable: false, required: false },
      ],
    },
    {
      key: 'material',
      attributes: [
        { key: 'categoria', label: 'Categoría', type: 'select', filterable: true, required: true },
        { key: 'acabado', label: 'Acabado', type: 'text', filterable: false, required: false },
        { key: 'proveedor', label: 'Proveedor', type: 'text', filterable: true, required: false },
      ],
    },
  ],
  c3: [
    {
      key: 'vehiculo',
      attributes: [
        { key: 'modelo', label: 'Modelo', type: 'text', filterable: true, required: true },
        { key: 'plazas', label: 'Plazas', type: 'number', filterable: true, required: true },
        { key: 'maletas', label: 'Maletas', type: 'number', filterable: false, required: false },
        { key: 'categoria', label: 'Categoría', type: 'select', filterable: true, required: true },
        { key: 'wifi', label: 'Wi-Fi a bordo', type: 'boolean', filterable: false, required: false },
      ],
    },
    {
      key: 'servicio',
      attributes: [
        { key: 'origen', label: 'Origen', type: 'text', filterable: true, required: true },
        { key: 'destino', label: 'Destino', type: 'text', filterable: true, required: true },
        { key: 'precio_base', label: 'Precio base (€)', type: 'number', filterable: true, required: true },
        { key: 'duracion_min', label: 'Duración (min)', type: 'number', filterable: false, required: false },
      ],
    },
  ],
}

export const USERS = {
  c1: [
    { id: 'u1', fullName: 'Laura Méndez', role: 'admin', phone: '+34 612 448 203' },
    { id: 'u2', fullName: 'Pablo Ferrer', role: 'editor', phone: '+34 655 120 987' },
    { id: 'u3', fullName: 'Nuria Casals', role: 'editor', phone: null },
    { id: 'u4', fullName: 'Jordi Alemany', role: 'viewer', phone: '+34 699 310 422' },
  ],
  c2: [
    { id: 'u5', fullName: 'Marc Puig', role: 'admin', phone: '+34 622 908 115' },
    { id: 'u1', fullName: 'Laura Méndez', role: 'editor', phone: '+34 612 448 203' },
    { id: 'u6', fullName: 'Irene Soler', role: 'viewer', phone: null },
  ],
  c3: [
    { id: 'u7', fullName: 'Sergio Lado', role: 'admin', phone: '+34 644 302 117' },
    { id: 'u8', fullName: 'Ana Ribas', role: 'editor', phone: '+34 677 541 230' },
    { id: 'u1', fullName: 'Laura Méndez', role: 'viewer', phone: '+34 612 448 203' },
  ],
}

const item = (id, title, type, status, updatedMs, createdBy, summary, values) => ({
  id,
  title,
  type,
  status,
  updatedAt: ago(updatedMs),
  createdBy,
  summary,
  values,
})

export const ITEMS = {
  c1: [
    item('i1', 'Ático con vistas al mar en Sitges', 'propiedad', 'published', 2 * HOUR, 'u1',
      'Ático de 3 dormitorios con terraza de 40 m² a 200 m de la playa.',
      { precio: '685.000', habitaciones: 3, banos: 2, superficie_m2: 118, zona: 'Sitges', operacion: 'Venta', piscina: false, terraza: true, certificado_energetico: 'B' }),
    item('i2', 'Villa mediterránea en Castelldefels', 'propiedad', 'published', 5 * HOUR, 'u2',
      'Villa independiente con jardín, piscina privada y vistas al Garraf.',
      { precio: '1.250.000', habitaciones: 5, banos: 4, superficie_m2: 320, zona: 'Castelldefels', operacion: 'Venta', piscina: true, terraza: true, certificado_energetico: 'C' }),
    item('i3', 'Piso reformado en el Eixample', 'propiedad', 'draft', 1 * DAY, 'u3',
      'Finca regia con techos altos, suelos hidráulicos y balcón a la calle.',
      { precio: '540.000', habitaciones: 3, banos: 2, superficie_m2: 105, zona: 'Barcelona', operacion: 'Venta', piscina: false, terraza: false, certificado_energetico: 'D' }),
    item('i4', 'Casa de pueblo en Altafulla', 'propiedad', 'published', 2 * DAY, 'u1',
      'Casa de piedra rehabilitada en el casco antiguo, a 5 minutos del mar.',
      { precio: '420.000', habitaciones: 4, banos: 2, superficie_m2: 160, zona: 'Altafulla', operacion: 'Venta', piscina: false, terraza: true, certificado_energetico: 'E' }),
    item('i5', 'Apartamento en primera línea en Salou', 'propiedad', 'published', 3 * DAY, 'u2',
      'Apartamento luminoso con piscina comunitaria y parking.',
      { precio: '1.450 /mes', habitaciones: 2, banos: 1, superficie_m2: 72, zona: 'Salou', operacion: 'Alquiler', piscina: true, terraza: true, certificado_energetico: 'C' }),
    item('i6', 'Loft industrial en Poblenou', 'propiedad', 'archived', 9 * DAY, 'u3',
      'Antigua nave convertida en loft de doble altura.',
      { precio: '2.100 /mes', habitaciones: 1, banos: 1, superficie_m2: 95, zona: 'Barcelona', operacion: 'Alquiler', piscina: false, terraza: false, certificado_energetico: 'D' }),
    item('i7', 'Residencial Mirador del Garraf', 'obra_nueva', 'published', 4 * DAY, 'u1',
      'Promoción de 24 viviendas con zonas comunes y piscina.',
      { promocion: 'Mirador del Garraf', unidades: 9, entrega: 'Jun 2027', precio_desde: '395.000' }),
    item('i8', 'Dúplex con jardín en Sant Cugat', 'propiedad', 'draft', 6 * DAY, 'u2',
      'Dúplex en planta baja con jardín privado de 60 m².',
      { precio: '760.000', habitaciones: 4, banos: 3, superficie_m2: 175, zona: 'Sant Cugat', operacion: 'Venta', piscina: false, terraza: true, certificado_energetico: 'A' }),
  ],
  c2: [
    item('i20', 'Reforma integral piso en Gràcia', 'proyecto', 'published', 3 * HOUR, 'u5',
      'Redistribución completa, cocina abierta y nuevo baño en suite.',
      { tipo_reforma: 'Integral', superficie_m2: 88, duracion_semanas: 12, barrio: 'Gràcia', presupuesto: '72.000', antes_despues: true }),
    item('i21', 'Cocina abierta en Sarrià', 'proyecto', 'published', 1 * DAY, 'u1',
      'Cocina con isla de microcemento y carpintería de roble.',
      { tipo_reforma: 'Cocina', superficie_m2: 22, duracion_semanas: 4, barrio: 'Sarrià', presupuesto: '28.500', antes_despues: true }),
    item('i22', 'Baño de diseño en Les Corts', 'proyecto', 'draft', 2 * DAY, 'u1',
      'Ducha de obra, porcelánico gran formato y luz indirecta.',
      { tipo_reforma: 'Baño', superficie_m2: 7, duracion_semanas: 3, barrio: 'Les Corts', presupuesto: '14.200', antes_despues: false }),
    item('i23', 'Local comercial en el Born', 'proyecto', 'published', 5 * DAY, 'u5',
      'Adecuación de local para tienda de cerámica artesanal.',
      { tipo_reforma: 'Local', superficie_m2: 64, duracion_semanas: 6, barrio: 'El Born', presupuesto: '45.000', antes_despues: true }),
    item('i24', 'Microcemento Arena', 'material', 'published', 8 * DAY, 'u5',
      'Revestimiento continuo para suelos y paredes.',
      { categoria: 'Revestimientos', acabado: 'Mate', proveedor: 'Topciment' }),
  ],
  c3: [
    item('i30', 'Mercedes Clase E — Berlina', 'vehiculo', 'published', 6 * HOUR, 'u8',
      'Berlina ejecutiva para traslados de 1 a 3 pasajeros.',
      { modelo: 'Mercedes-Benz E 300 e', plazas: 3, maletas: 3, categoria: 'Business', wifi: true }),
    item('i31', 'Mercedes Clase V — Van', 'vehiculo', 'published', 2 * DAY, 'u7',
      'Monovolumen premium para grupos y familias.',
      { modelo: 'Mercedes-Benz V 250', plazas: 7, maletas: 7, categoria: 'Van', wifi: true }),
    item('i32', 'Traslado Aeropuerto BCN → Sitges', 'servicio', 'published', 1 * DAY, 'u8',
      'Recogida en terminal con cartel y seguimiento de vuelo.',
      { origen: 'Aeropuerto El Prat', destino: 'Sitges', precio_base: '85', duracion_min: 30 }),
    item('i33', 'Barcelona → Andorra la Vella', 'servicio', 'draft', 3 * DAY, 'u8',
      'Trayecto directo con parada opcional.',
      { origen: 'Barcelona', destino: 'Andorra la Vella', precio_base: '390', duracion_min: 180 }),
    item('i34', 'Tesla Model S — Eléctrico', 'vehiculo', 'archived', 12 * DAY, 'u7',
      'Vehículo retirado de la flota en septiembre.',
      { modelo: 'Tesla Model S', plazas: 3, maletas: 2, categoria: 'Business', wifi: false }),
  ],
}

export const ANALYTICS_PROFILE = {
  c1: {
    base: 58,
    weekendFactor: 1.25,
    paths: [
      ['/', 30], ['/propiedades', 22], ['/propiedades/atico-sitges', 12], ['/propiedades/villa-castelldefels', 9],
      ['/obra-nueva', 8], ['/contacto', 7], ['/vender-mi-casa', 6], ['/sobre-nosotros', 4],
    ],
    events: [
      { key: 'click_whatsapp', label: 'Clic en WhatsApp', weight: 0.09, active: true },
      { key: 'click_llamar', label: 'Clic en Llamar', weight: 0.04, active: true },
      { key: 'form_contacto', label: 'Formulario de contacto enviado', weight: 0.025, active: true },
      { key: 'descargar_dossier', label: 'Descargar dossier', weight: 0.015, active: false },
    ],
  },
  c2: {
    base: 24,
    weekendFactor: 0.6,
    paths: [
      ['/', 32], ['/proyectos', 24], ['/proyectos/reforma-gracia', 11], ['/servicios', 10],
      ['/presupuesto', 9], ['/contacto', 8], ['/materiales', 6],
    ],
    events: [
      { key: 'pedir_presupuesto', label: 'Pedir presupuesto', weight: 0.06, active: true },
      { key: 'click_whatsapp', label: 'Clic en WhatsApp', weight: 0.05, active: true },
      { key: 'ver_galeria', label: 'Abrir galería antes/después', weight: 0.12, active: true },
    ],
  },
  c3: {
    base: 41,
    weekendFactor: 1.4,
    paths: [
      ['/', 34], ['/reservar', 26], ['/flota', 14], ['/aeropuerto', 12], ['/a-medida', 7], ['/ayuda', 5],
    ],
    events: [
      { key: 'reserva_iniciada', label: 'Reserva iniciada', weight: 0.11, active: true },
      { key: 'reserva_completada', label: 'Reserva completada', weight: 0.035, active: true },
      { key: 'click_whatsapp', label: 'Clic en WhatsApp', weight: 0.03, active: false },
    ],
  },
}

function seeded(seed) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function buildAnalytics(companyId, days) {
  const profile = ANALYTICS_PROFILE[companyId]
  const rand = seeded(companyId.charCodeAt(1) * 97 + days)
  const today = new Date()
  const timeline = []

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today.getTime() - i * DAY)
    const weekday = date.getDay()
    const weekend = weekday === 0 || weekday === 6
    const trend = 1 + ((days - i) / days) * 0.18
    const noise = 0.75 + rand() * 0.5
    const visitors = Math.round(profile.base * trend * noise * (weekend ? profile.weekendFactor : 1))
    const views = Math.round(visitors * (1.55 + rand() * 0.6))
    timeline.push({
      label: `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`,
      visitors,
      views,
    })
  }

  const totalViews = timeline.reduce((sum, d) => sum + d.views, 0)
  const totalVisitors = Math.round(timeline.reduce((sum, d) => sum + d.visitors, 0) * 0.82)
  const weightSum = profile.paths.reduce((sum, [, w]) => sum + w, 0)
  const topPaths = profile.paths.map(([path, w]) => ({ name: path, value: Math.round((totalViews * w) / weightSum) }))
  const events = profile.events
    .filter((e) => e.active)
    .map((e) => ({ key: e.key, label: e.label, value: Math.round(totalVisitors * e.weight * (0.85 + rand() * 0.3)) }))

  return { timeline, totalViews, totalVisitors, topPaths, events }
}

// Planning: empresas cliente y tareas relativas a la semana actual
export const CLIENTS = [
  { id: 'k1', name: 'Costa Serena Homes', color: '#0ea5e9' },
  { id: 'k2', name: 'Atelier Nord Reformas', color: '#f59e0b' },
  { id: 'k3', name: 'Ruta Prime Transfers', color: '#10b981' },
  { id: 'k4', name: 'Bodega Vall Antiga', color: '#a855f7' },
  { id: 'k5', name: 'Clínica Dental Mar', color: '#ef4444' },
]

export const TASK_TEMPLATES = [
  { day: 0, start: 9.5, end: 10.5, client: 'k1', type: 'reunion', title: 'Kickoff nueva ficha de inmuebles' },
  { day: 0, start: 12, end: 13, client: 'k4', type: 'entregable', title: 'Entrega fotos de la vendimia' },
  { day: 1, start: 10, end: 11.5, client: 'k2', type: 'reunion', title: 'Revisión diseño home' },
  { day: 1, start: 16, end: 17, client: 'k5', type: 'todo', title: 'Configurar eventos de analítica' },
  { day: 2, start: 9, end: 9.5, client: 'k3', type: 'recibir_pago', title: 'Cobro mantenimiento mensual' },
  { day: 2, start: 11, end: 13, client: 'k1', type: 'entregable', title: 'Publicar 6 inmuebles de Sitges' },
  { day: 2, start: 15.5, end: 16.5, client: 'k4', type: 'reunion', title: 'Llamada tienda online' },
  { day: 3, start: 10, end: 11, client: 'k5', type: 'reunion', title: 'Presentación propuesta web' },
  { day: 3, start: 13, end: 14, client: 'k2', type: 'todo', title: 'Subir galería reforma Gràcia' },
  { day: 3, start: 17, end: 18, client: 'k3', type: 'entregable', title: 'Nueva página de flota' },
  { day: 4, start: 9.5, end: 10, client: 'k1', type: 'realizar_pago', title: 'Pago hosting anual' },
  { day: 4, start: 11, end: 12.5, client: 'k3', type: 'reunion', title: 'Demo reservas por horas' },
  { day: 4, start: 16, end: 17, client: 'k2', type: 'todo', title: 'Revisar textos de servicios' },
  { day: 5, start: 10.5, end: 11.5, client: 'k4', type: 'todo', title: 'Programar newsletter' },
]

export const TASK_TYPE_LABEL = {
  recibir_pago: '💰 Recibir pago',
  realizar_pago: '💸 Realizar pago',
  todo: '✅ ToDo',
  entregable: '📦 Entregable',
  reunion: '🤝 Reunión',
}

export const BILLS = [
  { id: 'b1', client: 'k1', title: 'Mantenimiento web — mensual', amount: 180, direction: 'cobrar', dayOffset: 2 },
  { id: 'b2', client: 'k3', title: 'Módulo de reservas por horas', amount: 1450, direction: 'cobrar', dayOffset: 6 },
  { id: 'b3', client: 'k2', title: 'Sesión de fotos de obra', amount: 320, direction: 'pagar', dayOffset: 4 },
  { id: 'b4', client: 'k5', title: 'Diseño web — 50% inicial', amount: 1100, direction: 'cobrar', dayOffset: 9 },
  { id: 'b5', client: 'k4', title: 'Licencia plugin tienda', amount: 89, direction: 'pagar', dayOffset: 12 },
  { id: 'b6', client: 'k1', title: 'Hosting y dominio anual', amount: 240, direction: 'pagar', dayOffset: 4 },
]

export const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
export const WEEKDAYS_SHORT = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
export const WEEKDAYS_LONG = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
