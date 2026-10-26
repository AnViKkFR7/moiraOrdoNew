// Solo ejemplos inventados: nunca se consultan servicios del CRM.
export const CONTACT_NAMES = {
  c1: ['Clara Vidal', 'Álex Costa', 'Marta Rius', 'Daniel Solé', 'Elena Bosch'],
  c2: ['Julia Font', 'Hugo Serra', 'Carla Mas', 'Leo Roca', 'Emma Gil'],
  c3: ['Lucas Marín', 'Olivia Grau', 'Bruno Sala', 'Abril Soler', 'Eric Vidal'],
}
export function crmRecords(company) {
  const subjects = {
    c1: ['Visita al ático de Sitges', 'Información sobre la villa', 'Valoración de vivienda', 'Consulta de alquiler', 'Nueva promoción'],
    c2: ['Reforma de cocina', 'Proyecto de baño', 'Reforma integral', 'Visita al local', 'Consulta de materiales'],
    c3: ['Traslado al aeropuerto', 'Reserva de grupo', 'Servicio de empresa', 'Transfer a hotel', 'Ruta privada'],
  }
  return CONTACT_NAMES[company.id].map((name, i) => ({
    id: `${company.id}-contact-${i}`, name, email: `contacto${i + 1}@example.com`,
    phone: '+34 600 000 000', subject: subjects[company.id][i],
    stage: ['Nuevo', 'Contactado', 'Propuesta', 'Ganado', 'Nuevo'][i],
    owner: i % 2 ? 'Equipo comercial' : 'Laura Méndez',
    message: `Hola, me gustaría recibir información sobre ${subjects[company.id][i].toLowerCase()}. ¿Podemos concertar una llamada esta semana? Gracias.`,
  }))
}
export function billingRecords(company, kind) {
  return crmRecords(company).slice(0, 4).map((person, i) => ({
    id: `${kind}-${company.id}-${i}`, number: `${kind === 'quotes' ? 'PRE' : 'FAC'}-2026-00${i + 1}`,
    client: person.name, concept: person.subject, date: `${String(5 + i * 5).padStart(2, '0')}/10/2026`,
    due: `${String(5 + i * 5).padStart(2, '0')}/11/2026`,
    status: (kind === 'quotes' ? ['Borrador', 'Enviado', 'Aceptado', 'Rechazado'] : ['Borrador', 'Emitida', 'Pagada', 'Emitida'])[i],
    lines: [{ id: 'a', name: 'Servicio profesional', qty: 1, price: [850, 1200, 640, 2100][i] }, { id: 'b', name: 'Gestión y seguimiento', qty: 2, price: 75 }],
    paid: kind === 'invoicing' ? [0, 400, 955.9, 0][i] : 0,
  }))
}
export const money = (n) => Number(n).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })
export const documentTotal = (record) => record.lines.reduce((sum, l) => sum + l.qty * l.price, 0) * 1.21
