import { useEffect, useRef, useState } from 'react'
import styles from './AdminPanelDemo.module.css'
import { CURRENT_USER, ITEMS, ITEM_TYPES, USERS, ROLE_INFO } from './demoData'
import { crmRecords, billingRecords, money, documentTotal } from './workspaceData'
import DemoIcon from './DemoIcon'

export function ViewHeader({ title, description, children }) {
  return <div className={styles.pageHeader}><div><h3 className={styles.pageTitle}>{title}</h3><p className={styles.pageDescription}>{description}</p></div><div className={styles.headerActions}>{children}</div></div>
}
function Button({ children, onClick, primary = false, ...props }) {
  return <button type="button" className={primary ? styles.buttonPrimary : styles.buttonGhost} onClick={onClick} {...props}>{children}</button>
}
function Filters({ query, setQuery, options, filter, setFilter }) {
  return <div className={styles.workspaceFilters}><input className={styles.input} aria-label="Buscar en esta sección" placeholder="Buscar…" value={query} onChange={e => setQuery(e.target.value)} /><select className={styles.input} aria-label="Filtrar por estado" value={filter} onChange={e => setFilter(e.target.value)}><option value="all">Todos los estados</option>{options.map(x => <option key={x}>{x}</option>)}</select></div>
}
export function Tag({ children }) {
  return <span className={styles.workspaceTag} data-tone={['Pagada', 'Aceptado', 'Ganado', 'Publicado'].includes(children) ? 'green' : ['Nuevo', 'Emitida', 'Enviado'].includes(children) ? 'blue' : 'neutral'}>{children}</span>
}
function Field({ label, children }) {
  return <label className={styles.field}><span className={styles.fieldLabel}>{label}</span>{children}</label>
}
function Empty() { return <div className={styles.emptyState}>No hay resultados para estos filtros.</div> }

// Diálogos contenidos dentro de la demo, con foco y cierre por teclado.
function Detail({ title, onClose, children }) {
  const ref = useRef(null)
  useEffect(() => {
    const previous = document.activeElement
    const panel = ref.current
    panel.focus()
    const keydown = e => {
      if (e.key === 'Escape') { e.stopPropagation(); onClose() }
      if (e.key === 'Tab') {
        const elements = [...panel.querySelectorAll('button, input, select, textarea, [tabindex="0"]')].filter(el => !el.disabled)
        const first = elements[0], last = elements[elements.length - 1]
        if (e.shiftKey && (document.activeElement === first || document.activeElement === panel)) { e.preventDefault(); last?.focus() }
        else if (!e.shiftKey && (document.activeElement === last || document.activeElement === panel)) { e.preventDefault(); first?.focus() }
      }
    }
    panel.addEventListener('keydown', keydown)
    return () => { panel.removeEventListener('keydown', keydown); previous?.focus() }
  }, [onClose])
  return <div className={styles.detailOverlay} onClick={onClose}><section ref={ref} className={styles.detailPanel} role="dialog" aria-modal="true" aria-label={title} tabIndex={-1} onClick={e => e.stopPropagation()}><div className={styles.detailHeading}><h3>{title}</h3><Button onClick={onClose} aria-label="Cerrar detalle">✕</Button></div>{children}</section></div>
}

export function OverviewView({ company, go }) {
  const items = ITEMS[company.id]
  const records = crmRecords(company)
  const invoices = billingRecords(company, 'invoicing')
  const stats = [
    ['items', 'Items', items.length, `${items.filter(x => x.status === 'published').length} publicados · ${items.filter(x => x.status === 'draft').length} borradores`, 'Ver contenido'],
    ['attributes', 'Mis datos', ITEM_TYPES[company.id].length, 'Tipos de contenido y atributos personalizados', 'Ver mis datos'],
    ['leads', 'Solicitudes', records.filter(x => x.stage === 'Nuevo').length, `${records.length} solicitudes recibidas desde la web`, 'Ver solicitudes'],
    ['contacts', 'Contactos', records.length, 'Seguimiento comercial y actividad del equipo', 'Ver contactos'],
    ['planning', 'Planning', 6, 'Próxima: reunión de seguimiento · 10:00', 'Ver agenda'],
    ['analytics', 'Analítica', '1.842', 'Visitantes · 4.316 páginas vistas en 30 días', 'Ver analítica'],
    ['quotes', 'Presupuestos', 4, '1 aceptado · 1 pendiente de respuesta', 'Ver presupuestos'],
    ['invoicing', 'Facturación', money(invoices.reduce((sum, x) => sum + documentTotal(x), 0)), 'Consulta documentos, vencimientos y cobros', 'Ver facturas'],
  ]
  return <><ViewHeader title={company.name} description="Resumen de la actividad de tu empresa."><Tag>{ROLE_INFO[company.role].label}</Tag></ViewHeader><div className={styles.overviewGrid}>{stats.map(([key, title, value, hint, action]) => <button type="button" key={key} className={styles.overviewCard} onClick={() => go(key)}><span className={styles.overviewLabel}><DemoIcon name={key} />{title}</span><strong className={styles.overviewValue}>{value}</strong><span className={styles.mutedText}>{hint}</span><span className={styles.overviewLink}>{action} →</span></button>)}</div><div className={styles.demoNote}>Estás explorando una empresa ficticia. Puedes cambiarla desde el selector del menú.</div></>
}

export function CrmView({ company, can, notify, contacts = false }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [mode, setMode] = useState('Lista')
  const records = crmRecords(company)
  const stages = ['Nuevo', 'Contactado', 'Propuesta', 'Ganado']
  const visible = records.filter(x => (filter === 'all' || filter === x.stage) && `${x.name} ${x.email} ${x.subject}`.toLowerCase().includes(query.toLowerCase()))
  const open = x => setSelected(x)
  return <><ViewHeader title={contacts ? 'Contactos' : 'Solicitudes'} description={contacts ? 'Tu directorio comercial, con etapas, responsables y seguimiento.' : 'Las consultas de tu web, organizadas para que ninguna se quede sin responder.'}>{contacts && <div className={styles.segmented}>{['Lista', 'Pipeline'].map(x => <button type="button" key={x} aria-pressed={mode === x} className={mode === x ? styles.segActive : ''} onClick={() => setMode(x)}>{x}</button>)}</div>}</ViewHeader><div className={styles.summaryStrip}>{stages.map(stage => <button type="button" key={stage} aria-pressed={filter === stage} onClick={() => setFilter(filter === stage ? 'all' : stage)}><span>{stage}</span><strong>{records.filter(x => x.stage === stage).length}</strong></button>)}</div><Filters query={query} setQuery={setQuery} options={stages} filter={filter} setFilter={setFilter} />{mode === 'Pipeline' ? <div className={styles.pipeline}>{stages.map(stage => <section className={styles.pipelineColumn} key={stage}><h4>{stage}</h4>{visible.filter(x => x.stage === stage).map(x => <button type="button" className={styles.pipelineCard} key={x.id} onClick={() => open(x)}><strong>{x.name}</strong><span>{x.subject}</span><small>{x.owner}</small></button>)}</section>)}</div> : <div className={styles.recordList}>{visible.map(x => <button type="button" className={styles.recordRow} key={x.id} onClick={() => open(x)}><span className={styles.contactAvatar}>{x.name.split(' ').map(n => n[0]).join('')}</span><span className={styles.recordMain}><strong>{x.name}</strong><span>{contacts ? x.email : x.subject}</span></span><Tag>{x.stage}</Tag><span className={styles.rowMeta}>{x.owner}</span><span aria-hidden="true">→</span></button>)}</div>}{!visible.length && <Empty />}{selected && <Detail title={selected.name} onClose={() => setSelected(null)}><Tag>{selected.stage}</Tag><p className={styles.mutedText}>{selected.email} · {selected.phone}</p><h4>{selected.subject}</h4><p>{selected.message}</p><div className={styles.formGrid}><Field label="Etapa"><select className={styles.input} defaultValue={selected.stage} disabled={!can.write}>{stages.map(x => <option key={x}>{x}</option>)}</select></Field><Field label="Responsable"><select className={styles.input} defaultValue={selected.owner} disabled={!can.write}><option>Laura Méndez</option><option>Equipo comercial</option></select></Field></div><h4>Actividad</h4><div className={styles.timeline}><p><strong>Nota · Hoy, 09:15</strong><br />Preparar propuesta y confirmar disponibilidad.</p><p><strong>Llamada · Ayer, 12:30</strong><br />Primera toma de contacto con el equipo.</p><p><strong>Solicitud web</strong><br />Consulta recibida desde el formulario de contacto.</p></div>{contacts && <><h4>Documentos vinculados</h4><p className={styles.demoNote}>PRE-2026-002 · Propuesta de servicios · Enviado</p></>}{can.write && <Button primary onClick={() => notify('Simulación: los cambios del contacto no se guardan.')}>Guardar cambios</Button>}</Detail>}</>
}

export function DocumentsView({ company, can, notify, kind }) {
  const quote = kind === 'quotes'
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [editor, setEditor] = useState(null)
  const [tab, setTab] = useState('Documento')
  const [palette, setPalette] = useState('#4f46e5')
  const records = billingRecords(company, kind)
  const visible = records.filter(x => (filter === 'all' || x.status === filter) && `${x.number} ${x.client} ${x.concept}`.toLowerCase().includes(query.toLowerCase()))
  const open = record => { setEditor({ ...record, lines: record.lines.map(x => ({ ...x })) }); setTab('Documento') }
  const create = () => open({ id: 'new', number: 'Sin numerar', client: crmRecords(company)[0].name, concept: '', date: '26/10/2026', due: '26/11/2026', status: 'Borrador', paid: 0, lines: [{ id: 'a', name: 'Servicio profesional', qty: 1, price: 850 }] })
  const update = (key, value) => setEditor(x => ({ ...x, [key]: value }))
  const readOnly = !can.write || (!quote && editor && editor.status !== 'Borrador')
  if (editor) {
    const base = editor.lines.reduce((sum, line) => sum + line.qty * line.price, 0)
    return <><ViewHeader title={`${quote ? 'Presupuesto' : 'Factura'} · ${editor.number}`} description={readOnly ? 'Consulta el documento, su diseño y su historial.' : 'Editor de demostración. Puedes probar los campos y la previsualización.'}><Button onClick={() => setEditor(null)}>← Volver</Button>{!readOnly && <Button primary onClick={() => notify('Simulación: el documento no se guarda ni se emite.')}>Guardar borrador</Button>}</ViewHeader><div className={styles.documentTabs}>{['Documento', 'Diseño', 'Historial', ...(!quote ? ['Cobros'] : [])].map(x => <Button key={x} aria-pressed={tab === x} onClick={() => setTab(x)}>{x}</Button>)}</div>{tab === 'Historial' ? <div className={`${styles.card} ${styles.timeline}`}><h4>Historial del documento</h4><p><strong>Laura Méndez · {editor.date}</strong><br />{editor.status === 'Borrador' ? 'Borrador creado' : 'Documento guardado y enviado a revisión'}</p><p className={styles.mutedText}>Los datos de este historial son de ejemplo.</p></div> : tab === 'Cobros' ? <div className={styles.card}><h4>Saldo y movimientos</h4><div className={styles.summaryStrip}><div>Total<strong>{money(base * 1.21)}</strong></div><div>Cobrado<strong>{money(editor.paid)}</strong></div><div>Pendiente<strong>{money(Math.max(0, base * 1.21 - editor.paid))}</strong></div></div><p>Vencimiento: {editor.due}</p>{editor.paid > 0 && <p className={styles.demoNote}>Transferencia bancaria · {money(editor.paid)} · {editor.date}</p>}{can.write && editor.status !== 'Borrador' && <Button primary onClick={() => notify('Simulación: no se registra ningún cobro.')}>Registrar cobro</Button>}</div> : <div className={styles.documentLayout}><div className={styles.card}>{tab === 'Diseño' ? <><h4>Personalización del documento</h4><p className={styles.mutedText}>Prueba una paleta en la vista previa.</p><div className={styles.paletteRow}>{[['Índigo', '#4f46e5'], ['Océano', '#0369a1'], ['Bosque', '#166534']].map(([name, color]) => <button type="button" key={name} aria-pressed={palette === color} className={styles.paletteButton} onClick={() => setPalette(color)}><i style={{ background: color }} />{name}</button>)}</div><p className={styles.demoNote}>El diseño se aplica solo a esta previsualización.</p></> : <><h4>Datos del documento</h4><div className={styles.formGrid}><Field label="Cliente"><select className={styles.input} value={editor.client} disabled={readOnly} onChange={e => update('client', e.target.value)}>{crmRecords(company).map(x => <option key={x.id}>{x.name}</option>)}</select></Field><Field label="Estado"><span className={styles.input}><Tag>{editor.status}</Tag></span></Field></div><Field label="Concepto"><input className={styles.input} value={editor.concept} disabled={readOnly} onChange={e => update('concept', e.target.value)} /></Field><h4>{quote ? 'Capítulo 1 · Servicios' : 'Partidas'}</h4>{editor.lines.map((line, i) => <div className={styles.lineEditor} key={line.id}><Field label="Descripción"><input className={styles.input} value={line.name} disabled={readOnly} onChange={e => update('lines', editor.lines.map((x, j) => j === i ? { ...x, name: e.target.value } : x))} /></Field><Field label="Cantidad"><input className={styles.input} type="number" min="0" value={line.qty} disabled={readOnly} onChange={e => update('lines', editor.lines.map((x, j) => j === i ? { ...x, qty: Math.max(0, Number(e.target.value)) } : x))} /></Field><Field label="Precio (€)"><input className={styles.input} type="number" min="0" value={line.price} disabled={readOnly} onChange={e => update('lines', editor.lines.map((x, j) => j === i ? { ...x, price: Math.max(0, Number(e.target.value)) } : x))} /></Field></div>)}{!readOnly && <Button onClick={() => update('lines', [...editor.lines, { id: `line-${editor.lines.length}`, name: 'Nueva partida', qty: 1, price: 0 }])}>+ Añadir partida</Button>}</>}</div><div className={styles.paperWrap}><div className={styles.documentPaper} style={{ '--document-accent': palette }}><div className={styles.paperBrand}>{company.name}</div><div className={styles.paperHeading}>{quote ? 'PRESUPUESTO' : 'FACTURA'}</div><div className={styles.paperMeta}>{editor.number} · {editor.date}</div><hr /><small>CLIENTE</small><strong>{editor.client}</strong><p>{editor.concept || 'Propuesta de servicios profesionales'}</p><div className={styles.paperLine}><strong>Descripción</strong><strong>Importe</strong></div>{editor.lines.map(line => <div className={styles.paperLine} key={line.id}><span>{line.name}<small>{line.qty} × {money(line.price)}</small></span><span>{money(line.qty * line.price)}</span></div>)}<div className={styles.paperTotals}><span>Base imponible <b>{money(base)}</b></span><span>IVA (21 %) <b>{money(base * .21)}</b></span><strong>Total <b>{money(base * 1.21)}</b></strong></div><p className={styles.paperFooter}>Documento de ejemplo · Sin validez comercial ni fiscal</p></div></div></div>}</>
  }
  return <><ViewHeader title={quote ? 'Presupuestos' : 'Facturación'} description={quote ? 'Propuestas por capítulos, estados y diseño personalizado.' : 'Documentos, cobros parciales, saldos e historial por empresa.'}>{can.write && <Button primary onClick={create}>+ {quote ? 'Nuevo presupuesto' : 'Nueva factura'}</Button>}</ViewHeader><div className={styles.summaryStrip}><div>{quote ? 'Propuestas' : 'Facturado'}<strong>{money(records.filter(x => x.status !== 'Borrador').reduce((sum, x) => sum + documentTotal(x), 0))}</strong></div><div>{quote ? 'Aceptados' : 'Cobrado'}<strong>{quote ? '1 de 4' : money(records.reduce((sum, x) => sum + x.paid, 0))}</strong></div><div>Borradores<strong>1</strong></div></div><Filters query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} options={quote ? ['Borrador', 'Enviado', 'Aceptado', 'Rechazado'] : ['Borrador', 'Emitida', 'Pagada']} /><div className={styles.recordList}>{visible.map(x => <button type="button" className={styles.recordRow} key={x.id} onClick={() => open(x)}><DemoIcon name={kind} /><span className={styles.recordMain}><strong>{x.number}</strong><span>{x.client} · {x.concept}</span></span><Tag>{x.status}</Tag><strong>{money(documentTotal(x))}</strong><span aria-hidden="true">→</span></button>)}</div>{!visible.length && <Empty />}<p className={styles.demoNote}>Abre un documento para consultar su contenido{can.write ? ' o prueba el editor creando un borrador' : ''}. Todos los importes son ficticios.</p></>
}

export function BlogWorkspace({ company, can, notify }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [editor, setEditor] = useState(null)
  const posts = [
    { title: `Las novedades de ${company.name}`, status: 'Publicado', intro: 'Una mirada a nuestros últimos proyectos y a lo que viene.', body: 'Cada proyecto empieza escuchando. Descubre cómo acompañamos a nuestros clientes, desde la primera conversación hasta el último detalle.', slug: 'novedades', seo: `Actualidad y proyectos de ${company.name}` },
    { title: 'Cómo preparamos tu próximo proyecto', status: 'Borrador', intro: 'Nuestro proceso, paso a paso.', body: 'Planificación, atención personalizada y un equipo que te acompaña. Aquí te contamos cómo trabajamos.', slug: 'proximo-proyecto', seo: 'Conoce nuestro proceso de trabajo' },
    { title: 'Cinco preguntas antes de empezar', status: 'Publicado', intro: 'Resolvemos las dudas más habituales.', body: 'Una buena conversación es el primer paso. Estas son las preguntas que nos ayudan a entender lo que necesitas.', slug: 'preguntas-frecuentes', seo: 'Preguntas frecuentes y consejos' },
  ]
  if (editor) return <><ViewHeader title="Editar artículo" description="Contenido y vista previa SEO de ejemplo."><Button onClick={() => setEditor(null)}>← Volver</Button>{can.write && <Button primary onClick={() => notify('Simulación: el artículo no se guarda ni se publica.')}>Guardar artículo</Button>}</ViewHeader><div className={styles.documentLayout}><div className={styles.card}>{[['title', 'Título'], ['slug', 'Slug'], ['intro', 'Introducción'], ['body', 'Contenido'], ['seo', 'Título SEO']].map(([key, label]) => <Field key={key} label={label}>{key === 'body' ? <textarea className={styles.input} rows={6} disabled={!can.write} value={editor[key]} onChange={e => setEditor({ ...editor, [key]: e.target.value })} /> : <input className={styles.input} disabled={!can.write} value={editor[key]} onChange={e => setEditor({ ...editor, [key]: e.target.value })} />}</Field>)}<Field label="Estado"><select className={styles.input} disabled={!can.write} value={editor.status} onChange={e => setEditor({ ...editor, status: e.target.value })}><option>Borrador</option><option>Publicado</option><option>Archivado</option></select></Field></div><article className={styles.card}><Tag>Vista previa</Tag><h3>{editor.title}</h3><p><strong>{editor.intro}</strong></p><p style={{ whiteSpace: 'pre-wrap' }}>{editor.body}</p><hr /><h4>Vista previa en buscadores</h4><small>example.com/blog/{editor.slug}</small><p className={styles.seoTitle}>{editor.seo}</p><p className={styles.mutedText}>{editor.intro}</p></article></div></>
  const visible = posts.filter(x => (filter === 'all' || x.status === filter) && x.title.toLowerCase().includes(query.toLowerCase()))
  return <><ViewHeader title="Blog" description="Artículos, borradores y campos SEO por empresa.">{can.write && <Button primary onClick={() => setEditor({ title: '', status: 'Borrador', intro: '', body: '', slug: '', seo: '' })}>+ Nuevo artículo</Button>}</ViewHeader><Filters query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} options={['Borrador', 'Publicado', 'Archivado']} /><div className={styles.recordList}>{visible.map(x => <button type="button" className={styles.recordRow} key={x.slug} onClick={() => setEditor({ ...x })}><DemoIcon name="blog" /><span className={styles.recordMain}><strong>{x.title}</strong><span>{x.intro}</span></span><Tag>{x.status}</Tag><span>→</span></button>)}</div>{!visible.length && <Empty />}</>
}

export function SettingsView({ section, company, notify }) {
  const titles = { modules: 'Módulos', privacy: 'Privacidad CRM', summary: 'Resumen semanal', profile: 'Mi cuenta' }
  return <><ViewHeader title={titles[section]} description={section === 'profile' ? 'Perfil de la cuenta de demostración.' : `Configuración de ${company.name}.`} /><div className={styles.card}>{section === 'modules' ? <><h4>Módulos de la empresa</h4><p className={styles.mutedText}>Cada empresa activa las herramientas que necesita. En esta demo están todas disponibles.</p>{['Contenido e items', 'Blog', 'CRM y contactos', 'Planning', 'Presupuestos y facturación', 'Analítica'].map(x => <div className={styles.settingRow} key={x}><span>{x}</span><Tag>Activo</Tag></div>)}</> : section === 'privacy' ? <><h4>Conservación y privacidad</h4><p className={styles.mutedText}>Revisa el estado de las solicitudes y el seguimiento de los contactos.</p><div className={styles.settingRow}>Solicitudes sin actividad<Tag>2 por revisar</Tag></div><div className={styles.settingRow}>Exportaciones pendientes<Tag>Ninguna</Tag></div><Button onClick={() => notify('Simulación: no se exportan ni se eliminan datos.')}>Revisar solicitudes</Button></> : section === 'summary' ? <><h4>La actividad de tu empresa, de un vistazo</h4><p className={styles.mutedText}>Resumen con cifras agregadas de CRM, facturación, agenda y analítica.</p><Field label="Frecuencia"><select className={styles.input} defaultValue="Lunes · 09:00 · Europe/Madrid"><option>Lunes · 09:00 · Europe/Madrid</option><option>Viernes · 09:00 · Europe/Madrid</option></select></Field><label className={styles.settingRow}><span>Recibir resumen semanal</span><input type="checkbox" defaultChecked /></label><Button primary onClick={() => notify('Simulación: no se guarda la preferencia ni se envía ningún email.')}>Guardar preferencias</Button></> : <><div className={styles.contactAvatar}>LM</div><h4>{CURRENT_USER.fullName}</h4><p>{CURRENT_USER.username}</p><p className={styles.mutedText}>Rol en {company.name}: {ROLE_INFO[company.role].label}</p><div className={styles.settingRow}>Empresas disponibles<strong>3</strong></div><div className={styles.settingRow}>Miembros del equipo<strong>{USERS[company.id].length}</strong></div></>}</div><p className={styles.demoNote}>Configuración ilustrativa. No se modifica ninguna cuenta ni servicio.</p></>
}
