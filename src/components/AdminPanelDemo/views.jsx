import { useMemo, useRef, useState } from 'react'
import styles from './AdminPanelDemo.module.css'
import {
  BILLS,
  CLIENTS,
  COMPANIES,
  ITEMS,
  ITEM_TYPES,
  MONTHS,
  ROLE_INFO,
  STATUS_LABEL,
  TASK_TEMPLATES,
  TASK_TYPE_LABEL,
  USERS,
  WEEKDAYS_LONG,
  WEEKDAYS_SHORT,
  ANALYTICS_PROFILE,
  buildAnalytics,
  relativeTime,
} from './demoData'

const TYPE_ICON = {
  propiedad: '🏡',
  obra_nueva: '🏗️',
  proyecto: '🛠️',
  material: '🧱',
  vehiculo: '🚘',
  servicio: '🛣️',
}

const TYPE_HUE = {
  propiedad: 199,
  obra_nueva: 32,
  proyecto: 38,
  material: 20,
  vehiculo: 160,
  servicio: 245,
}

function PageHeader({ title, description, children }) {
  return (
    <div className={styles.pageHeader}>
      <div>
        <div className={styles.pageTitle}>{title}</div>
        {description && <div className={styles.pageDescription}>{description}</div>}
      </div>
      {children && <div className={styles.headerActions}>{children}</div>}
    </div>
  )
}

function Pill({ status }) {
  return <span className={`${styles.pill} ${styles[status]}`}>{STATUS_LABEL[status]}</span>
}

function RoleBadge({ role, rounded = false }) {
  const info = ROLE_INFO[role]
  return (
    <span
      className={rounded ? styles.roleBadgeRound : styles.roleBadge}
      style={{ background: info.bg, color: info.color }}
    >
      {info.label}
    </span>
  )
}

function SearchInput({ value, onChange, placeholder }) {
  return (
    <div className={styles.searchWrap}>
      <span className={styles.searchIcon} aria-hidden="true">🔍</span>
      <input
        type="text"
        className={styles.input}
        style={{ paddingLeft: 36 }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button type="button" className={styles.searchClear} onClick={() => onChange('')} aria-label="Borrar búsqueda">
          ✕
        </button>
      )}
    </div>
  )
}

/* ---------------- Dashboard ---------------- */

export function DashboardView({ company, onSelectCompany }) {
  return (
    <>
      <PageHeader title="Dashboard" description="Elige una empresa para empezar a trabajar" />

      <div className={`${styles.card} ${styles.heroCard}`}>
        <div className={styles.heroInner}>
          <div className={styles.heroIcon} aria-hidden="true">⚠️</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className={styles.heroTitle}>Selecciona una Empresa</div>
            <div className={styles.heroText}>Elige una empresa para empezar a trabajar</div>

            <div className={styles.companyGrid}>
              {COMPANIES.map((c) => {
                const isSelected = c.id === company.id
                return (
                  <button
                    type="button"
                    key={c.id}
                    className={`${styles.companyCard} ${isSelected ? styles.isSelected : ''}`}
                    onClick={() => onSelectCompany(c.id)}
                    data-cursor-hover
                  >
                    {isSelected && <span className={styles.companyCheck}>✓</span>}
                    <span className={styles.companyCardHead}>
                      <span className={styles.companyAvatar}>{c.name.charAt(0)}</span>
                      <span className={styles.companyCardName}>{c.name}</span>
                    </span>
                    <span
                      className={styles.roleBadge}
                      style={{ background: ROLE_INFO[c.role].bg, color: ROLE_INFO[c.role].color }}
                    >
                      {ROLE_INFO[c.role].label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardTitle}>Trabajando en: {company.name}</div>
        <div className={styles.mutedText}>
          Todos los datos que veas en las demás secciones pertenecen a <strong>{company.name}</strong>.
          Puedes cambiar de empresa en cualquier momento volviendo a este dashboard.
        </div>
      </div>
    </>
  )
}

/* ---------------- Items ---------------- */

function Thumb({ type, seed = 0, className = '' }) {
  const hue = TYPE_HUE[type] ?? 230
  return (
    <span
      className={`${styles.thumb} ${className}`}
      style={{
        background: `linear-gradient(135deg, hsl(${hue + seed * 9} 70% 82%), hsl(${hue + seed * 9 + 25} 60% 62%))`,
      }}
      aria-hidden="true"
    >
      {TYPE_ICON[type]}
    </span>
  )
}

export function ItemsView({ company, can, notify, onOpenItem }) {
  const [viewMode, setViewMode] = useState('rows')
  const [status, setStatus] = useState('all')
  const [type, setType] = useState('all')
  const [sort, setSort] = useState('newest')
  const [query, setQuery] = useState('')

  const types = ITEM_TYPES[company.id].map((t) => t.key)
  const activeFilters = (status !== 'all') + (type !== 'all') + (query ? 1 : 0)

  const items = ITEMS[company.id]
    .filter((i) => status === 'all' || i.status === status)
    .filter((i) => type === 'all' || i.type === type)
    .filter((i) => i.title.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => (sort === 'newest' ? b.updatedAt - a.updatedAt : a.updatedAt - b.updatedAt))

  const clear = () => {
    setStatus('all')
    setType('all')
    setQuery('')
    setSort('newest')
  }

  return (
    <>
      <PageHeader title="Items" description="Gestiona los elementos genéricos por empresa y tipo.">
        <div className={styles.segmented}>
          <button
            type="button"
            className={viewMode === 'rows' ? styles.segActive : ''}
            onClick={() => setViewMode('rows')}
            aria-pressed={viewMode === 'rows'}
            title="Vista de tabla"
          >
            ☰
          </button>
          <button
            type="button"
            className={viewMode === 'cards' ? styles.segActive : ''}
            onClick={() => setViewMode('cards')}
            aria-pressed={viewMode === 'cards'}
            title="Vista de cards"
          >
            ▦
          </button>
        </div>
        {can.write && (
          <button type="button" className={styles.buttonPrimary} onClick={() => notify('Formulario de nuevo item (demo)')} data-cursor-hover>
            Nuevo Item
          </button>
        )}
      </PageHeader>

      <div className={`${styles.card} ${styles.filtersCard}`}>
        <div className={styles.filtersGrid}>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Estado</span>
            <select className={styles.input} value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="all">Todos</option>
              <option value="published">Publicado</option>
              <option value="draft">Borrador</option>
              <option value="archived">Archivado</option>
            </select>
          </label>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Tipo de ítem</span>
            <select className={styles.input} value={type} onChange={(e) => setType(e.target.value)}>
              <option value="all">Todos</option>
              {types.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Ordenar por fecha</span>
            <select className={styles.input} value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="newest">Más recientes primero</option>
              <option value="oldest">Más antiguos primero</option>
            </select>
          </label>
        </div>

        <div className={styles.filtersBottom}>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Buscar por título</span>
            <SearchInput value={query} onChange={setQuery} placeholder="Escribe para filtrar por título..." />
          </label>
          <div className={styles.filterButtons}>
            <button type="button" className={styles.buttonGhost} onClick={() => notify('Configurar filtros avanzados (demo)')}>
              Filtros Avanzados ({activeFilters})
            </button>
            <button type="button" className={styles.buttonGhost} onClick={clear}>
              Borrar Filtros
            </button>
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <div className={`${styles.card} ${styles.emptyState}`}>No se encontraron items</div>
      ) : viewMode === 'rows' ? (
        <div className={`${styles.table} ${styles.itemsTable}`}>
          <div className={`${styles.tableRow} ${styles.tableHeader}`}>
            <span>Título</span>
            <span>Tipo</span>
            <span>Estado</span>
            <span>Actualizado</span>
          </div>
          {items.map((i) => (
            <button type="button" key={i.id} className={styles.tableRow} onClick={() => onOpenItem(i.id)} data-cursor-hover>
              <span className={styles.rowTitle}>{i.title}</span>
              <span className={styles.mono}>{i.type}</span>
              <span><Pill status={i.status} /></span>
              <span className={styles.mutedSmall}>{relativeTime(i.updatedAt)}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className={styles.itemCards}>
          {items.map((i, idx) => (
            <button type="button" key={i.id} className={styles.itemCard} onClick={() => onOpenItem(i.id)} data-cursor-hover>
              <Thumb type={i.type} seed={idx} className={styles.itemCardImage} />
              <span className={styles.itemCardBody}>
                <span className={styles.itemCardTitle}>{i.title}</span>
                <Pill status={i.status} />
              </span>
            </button>
          ))}
        </div>
      )}

      <div className={styles.tableFoot}>
        Mostrando {items.length} de {ITEMS[company.id].length}
      </div>
    </>
  )
}

function formatValue(attr, value) {
  if (value === undefined || value === null || value === '') return '—'
  if (attr.type === 'boolean') return value ? 'Sí' : 'No'
  return String(value)
}

export function ItemDetailView({ company, itemId, can, notify, onBack }) {
  const item = ITEMS[company.id].find((i) => i.id === itemId)
  const [filter, setFilter] = useState('')
  if (!item) return null

  const attributes = ITEM_TYPES[company.id].find((t) => t.key === item.type)?.attributes ?? []
  const author = USERS[company.id].find((u) => u.id === item.createdBy)
  const visible = attributes.filter((a) => a.label.toLowerCase().includes(filter.toLowerCase()))

  return (
    <>
      <div className={styles.detailHeader}>
        <button type="button" className={styles.buttonGhost} onClick={onBack} data-cursor-hover>
          ← Volver
        </button>
        <div className={styles.detailHeading}>
          <div className={styles.pageTitle}>{item.title}</div>
          <div className={styles.mutedSmall}>
            Creado por {author?.fullName ?? '—'} · Última edición {relativeTime(item.updatedAt).toLowerCase()}
          </div>
        </div>
        <Pill status={item.status} />
      </div>

      <div className={styles.detailGrid}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Información Básica</div>
          <div className={styles.formStack}>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>Título del {company.itemTypeNoun.toLowerCase()}</span>
              <input className={styles.input} value={item.title} readOnly />
            </label>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>Resumen</span>
              <textarea className={`${styles.input} ${styles.textarea}`} value={item.summary} readOnly />
            </label>
            <div className={styles.twoCols}>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Estado</span>
                <input className={styles.input} value={STATUS_LABEL[item.status]} readOnly />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Tipo</span>
                <input className={`${styles.input} ${styles.mono}`} value={item.type} readOnly />
              </label>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>Imágenes y Documentos</div>
          <div className={styles.mediaStrip}>
            {[0, 1, 2].map((n) => (
              <span key={n} className={styles.mediaThumbWrap}>
                <Thumb type={item.type} seed={n + 2} className={styles.mediaThumb} />
                {n === 0 && <span className={styles.coverBadge}>Portada</span>}
              </span>
            ))}
          </div>
          {can.write && (
            <button type="button" className={styles.buttonGhost} style={{ marginTop: 14 }} onClick={() => notify('Subida de imágenes (demo)')}>
              + Añadir Imágenes
            </button>
          )}
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardTitle}>Atributos del {company.itemTypeNoun}</div>
        <SearchInput value={filter} onChange={setFilter} placeholder="Filtrar por nombre de atributo..." />
        <div className={styles.attrList}>
          {visible.map((a) => (
            <div key={a.key} className={styles.attrItem}>
              <span className={styles.attrLabel}>
                {a.label}
                {a.required && <span className={styles.required}>*</span>}
              </span>
              <span className={styles.attrValue}>{formatValue(a, item.values[a.key])}</span>
            </div>
          ))}
          {visible.length === 0 && (
            <div className={styles.mutedText}>No se encontraron atributos que coincidan con “{filter}”</div>
          )}
        </div>
      </div>

      <div className={styles.detailFooter}>
        <span className={styles.mutedSmall}>Sin cambios pendientes</span>
        <div className={styles.headerActions}>
          <button type="button" className={styles.buttonGhost} onClick={onBack}>Cancelar</button>
          {can.write && (
            <button type="button" className={styles.buttonPrimary} onClick={() => notify('Cambios guardados (demo)')}>
              Guardar cambios
            </button>
          )}
        </div>
      </div>
    </>
  )
}

/* ---------------- Analítica ---------------- */

function smoothPath(points) {
  if (points.length < 2) return ''
  let d = `M${points[0][0]},${points[0][1]}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] || p2
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`
  }
  return d
}

function niceMax(value) {
  const step = value > 200 ? 50 : value > 80 ? 20 : 10
  return Math.ceil(value / step) * step || step
}

function LineChart({ data }) {
  const svgRef = useRef(null)
  const [hover, setHover] = useState(null)
  const W = 640
  const H = 230
  const pad = { l: 38, r: 14, t: 12, b: 28 }
  const max = niceMax(Math.max(...data.map((d) => d.views)))
  const n = data.length
  const x = (i) => pad.l + (i * (W - pad.l - pad.r)) / Math.max(n - 1, 1)
  const y = (v) => pad.t + (1 - v / max) * (H - pad.t - pad.b)

  const visitors = data.map((d, i) => [x(i), y(d.visitors)])
  const views = data.map((d, i) => [x(i), y(d.views)])
  const labelEvery = Math.ceil(n / 7)

  const onMove = (e) => {
    const rect = svgRef.current.getBoundingClientRect()
    const vx = ((e.clientX - rect.left) / rect.width) * W
    const idx = Math.round(((vx - pad.l) / (W - pad.l - pad.r)) * (n - 1))
    setHover(Math.min(n - 1, Math.max(0, idx)))
  }

  return (
    <div className={styles.chartWrap}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className={styles.chart}
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
        role="img"
        aria-label="Visitantes y páginas vistas por día"
      >
        {[0, 0.25, 0.5, 0.75, 1].map((f) => (
          <g key={f}>
            <line x1={pad.l} x2={W - pad.r} y1={y(max * f)} y2={y(max * f)} className={styles.gridLine} />
            <text x={pad.l - 8} y={y(max * f) + 4} textAnchor="end" className={styles.axisText}>
              {Math.round(max * f)}
            </text>
          </g>
        ))}
        {data.map((d, i) =>
          i % labelEvery === 0 ? (
            <text key={d.label} x={x(i)} y={H - 8} textAnchor="middle" className={styles.axisText}>
              {d.label}
            </text>
          ) : null,
        )}
        <path d={smoothPath(views)} className={styles.lineViews} />
        <path d={smoothPath(visitors)} className={styles.lineVisitors} />
        {hover !== null && (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={pad.t} y2={H - pad.b} className={styles.hoverLine} />
            <circle cx={x(hover)} cy={y(data[hover].views)} r="4" className={styles.dotViews} />
            <circle cx={x(hover)} cy={y(data[hover].visitors)} r="4" className={styles.dotVisitors} />
          </g>
        )}
      </svg>
      {hover !== null && (
        <div
          className={styles.tooltip}
          style={{ left: `${(x(hover) / W) * 100}%`, transform: `translateX(${hover > n / 2 ? '-105%' : '5%'})` }}
        >
          <strong>{data[hover].label}</strong>
          <span className={styles.tooltipVisitors}>Visitantes únicos: {data[hover].visitors}</span>
          <span>Páginas vistas: {data[hover].views}</span>
        </div>
      )}
      <div className={styles.legend}>
        <span><i className={styles.legendViews} />Páginas vistas</span>
        <span><i className={styles.legendVisitors} />Visitantes únicos</span>
      </div>
    </div>
  )
}

export function AnalyticsView({ company, can, notify }) {
  const [days, setDays] = useState(30)
  const [definitions, setDefinitions] = useState(() => ANALYTICS_PROFILE[company.id].events.map((e) => ({ ...e })))
  const data = useMemo(() => buildAnalytics(company.id, days), [company.id, days])
  const activeKeys = definitions.filter((d) => d.active).map((d) => d.key)
  const events = data.events.filter((e) => activeKeys.includes(e.key))
  const totalEvents = events.reduce((s, e) => s + e.value, 0)
  const maxPath = Math.max(...data.topPaths.map((p) => p.value))

  const toggle = (key) => setDefinitions((defs) => defs.map((d) => (d.key === key ? { ...d, active: !d.active } : d)))

  return (
    <>
      <PageHeader title="Analítica" description="Tráfico y eventos de clic de tu web, sin cookies." />

      <div className={styles.rangeRow}>
        <div className={styles.rangeButtons}>
          {[7, 30, 90].map((d) => (
            <button
              type="button"
              key={d}
              className={days === d ? styles.buttonPrimary : styles.buttonGhost}
              onClick={() => setDays(d)}
              data-cursor-hover
            >
              {d} días
            </button>
          ))}
        </div>
        {can.write && (
          <button type="button" className={styles.buttonGhost} onClick={() => notify('Datos de hoy actualizados.')}>
            🔄 Agregar ahora
          </button>
        )}
      </div>

      <div className={styles.statGrid}>
        <div className={`${styles.card} ${styles.statCard}`}>
          <span className={styles.statValue}>{data.totalVisitors.toLocaleString('es-ES')}</span>
          <span className={styles.statLabel}>Visitantes únicos</span>
        </div>
        <div className={`${styles.card} ${styles.statCard}`}>
          <span className={styles.statValue}>{data.totalViews.toLocaleString('es-ES')}</span>
          <span className={styles.statLabel}>Páginas vistas</span>
        </div>
        <div className={`${styles.card} ${styles.statCard}`}>
          <span className={styles.statValue}>{totalEvents.toLocaleString('es-ES')}</span>
          <span className={styles.statLabel}>Eventos totales</span>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardTitle}>Visitantes y páginas vistas por día</div>
        <LineChart data={data.timeline} />
      </div>

      <div className={styles.card}>
        <div className={styles.cardTitle}>Páginas más visitadas</div>
        <div className={styles.barList}>
          {data.topPaths.map((p) => (
            <div key={p.name} className={styles.barRow}>
              <span className={styles.barLabel}>{p.name}</span>
              <span className={styles.barTrack}>
                <span className={styles.barFill} style={{ width: `${(p.value / maxPath) * 100}%` }} />
              </span>
              <span className={styles.barValue}>{p.value.toLocaleString('es-ES')}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardTitle}>Eventos de este periodo</div>
        {events.length === 0 ? (
          <div className={styles.mutedText}>Todavía no se ha registrado ningún clic en este periodo.</div>
        ) : (
          <div className={styles.eventList}>
            {events.map((e) => (
              <div key={e.key} className={styles.eventRow}>
                <span>{e.label}</span>
                <strong>{e.value}</strong>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeadRow}>
          <div className={styles.cardTitle} style={{ margin: 0 }}>Gestión de eventos</div>
          {can.write && (
            <button type="button" className={styles.buttonPrimary} onClick={() => notify('Nuevo evento de clic (demo)')}>
              + Nuevo evento
            </button>
          )}
        </div>
        <div className={styles.defList}>
          {definitions.map((d) => (
            <div key={d.key} className={styles.defRow} style={{ opacity: d.active ? 1 : 0.55 }}>
              <div style={{ minWidth: 0 }}>
                <div className={styles.defLabel}>{d.label}</div>
                <code className={styles.code}>data-track-event="{d.key}"</code>
              </div>
              {can.write && (
                <button type="button" className={`${styles.buttonGhost} ${styles.buttonSmall}`} onClick={() => toggle(d.key)}>
                  {d.active ? 'Desactivar' : 'Activar'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

/* ---------------- Atributos ---------------- */

export function AttributesView({ company, can, notify }) {
  const types = ITEM_TYPES[company.id]
  const [selected, setSelected] = useState(types[0].key)
  const [query, setQuery] = useState('')
  const current = types.find((t) => t.key === selected) ?? types[0]
  const rows = current.attributes.filter((a) => a.label.toLowerCase().includes(query.toLowerCase()))

  return (
    <>
      <PageHeader
        title="Mis Datos"
        description="Gestiona los tipos de items de tu empresa y sus propiedades. Desde aquí puedes editar las etiquetas de los atributos existentes y crear nuevos atributos personalizados para cada tipo de item."
      >
        {can.admin && (
          <button type="button" className={styles.buttonPrimary} onClick={() => notify('Crear nuevo tipo de ítem (demo)')}>
            Crear Tipo de Ítem
          </button>
        )}
      </PageHeader>

      <div className={styles.card}>
        <div className={styles.cardTitle}>Tipos de Items</div>
        <div className={styles.mutedSmall} style={{ marginBottom: 14 }}>Selecciona un tipo de item para gestionar sus atributos</div>
        <div className={styles.typeChips}>
          {types.map((t) => (
            <button
              type="button"
              key={t.key}
              className={`${styles.typeChip} ${t.key === current.key ? styles.typeChipActive : ''}`}
              onClick={() => {
                setSelected(t.key)
                setQuery('')
              }}
              data-cursor-hover
            >
              <span aria-hidden="true">{TYPE_ICON[t.key]}</span>
              {t.key}
              <span className={styles.typeCount}>{t.attributes.length}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeadRow}>
          <div className={styles.cardTitle} style={{ margin: 0 }}>Atributos de {current.key}</div>
          {can.admin && (
            <button type="button" className={styles.buttonPrimary} onClick={() => notify('Crear attribute definition (demo)')}>
              Crear Attribute Definition
            </button>
          )}
        </div>
        <SearchInput value={query} onChange={setQuery} placeholder="Buscar por label..." />

        <div className={`${styles.table} ${styles.attrTable}`} style={{ marginTop: 16 }}>
          <div className={`${styles.tableRow} ${styles.tableHeader}`}>
            <span>Label</span>
            <span>Key</span>
            <span>Data Type</span>
            <span>Filtrable</span>
            <span>Requerido</span>
            <span />
          </div>
          {rows.map((a) => (
            <div key={a.key} className={styles.tableRow}>
              <span className={styles.rowTitle}>{a.label}</span>
              <span className={styles.mono}>{a.key}</span>
              <span><span className={`${styles.pill} ${styles.typePill}`}>{a.type}</span></span>
              <span>{a.filterable ? '✅' : '❌'}</span>
              <span>{a.required ? '✅' : '❌'}</span>
              <span>
                {can.admin && (
                  <button type="button" className={`${styles.buttonGhost} ${styles.buttonSmall}`} onClick={() => notify(`Editar label “${a.label}” (demo)`)}>
                    ✏️
                  </button>
                )}
              </span>
            </div>
          ))}
          {rows.length === 0 && <div className={styles.tableEmpty}>No hay atributos que coincidan</div>}
        </div>
      </div>
    </>
  )
}

/* ---------------- Empresas ---------------- */

export function CompaniesView({ notify }) {
  return (
    <>
      <PageHeader
        title="Empresas"
        description="Administra la información de las empresas y consulta sus items publicados y usuarios."
      />
      <div className={styles.companiesGrid}>
        {COMPANIES.map((c) => {
          const published = ITEMS[c.id].filter((i) => i.status === 'published').length
          return (
            <div key={c.id} className={`${styles.card} ${styles.companyInfoCard}`}>
              {c.role === 'admin' && (
                <button type="button" className={styles.editButton} onClick={() => notify(`Editar ${c.name} (demo)`)} aria-label="Editar">
                  ✏️
                </button>
              )}
              <div className={styles.companyNameRow}>
                <span className={styles.colorDot} style={{ background: c.color }} />
                <div className={styles.companyInfoName}>{c.name}</div>
              </div>
              <div>
                <span className={styles.infoLabel}>Responsable</span>
                <div className={styles.infoValue}>{c.responsible}</div>
              </div>
              <div className={styles.twoCols}>
                <div>
                  <span className={styles.infoLabel}>Email</span>
                  <div className={styles.infoValueSmall}>{c.email}</div>
                </div>
                <div>
                  <span className={styles.infoLabel}>Teléfono</span>
                  <div className={styles.infoValueSmall}>{c.phone}</div>
                </div>
              </div>
              <div className={styles.twoCols}>
                <div>
                  <span className={styles.infoLabel}>Items publicados</span>
                  <div className={styles.bigNumber}>{published}</div>
                </div>
                <div>
                  <span className={styles.infoLabel}>Usuarios</span>
                  <div className={styles.bigNumber}>{USERS[c.id].length}</div>
                </div>
              </div>
              {c.website ? (
                <button type="button" className={styles.websiteButton} onClick={() => notify(`Abriría ${c.website}`)}>
                  🌐 Visitar sitio web <span aria-hidden="true">↗</span>
                </button>
              ) : (
                <span className={styles.websitePending}>🚧 Sitio web en construcción</span>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}

/* ---------------- Usuarios ---------------- */

export function UsersView({ company, can, notify }) {
  const [query, setQuery] = useState('')
  const users = USERS[company.id].filter((u) => u.fullName.toLowerCase().includes(query.toLowerCase()))
  const createdBy = (id) => ITEMS[company.id].filter((i) => i.createdBy === id).length

  return (
    <>
      <PageHeader
        title="Usuarios"
        description="Administra los miembros de tu empresa, edita sus datos de contacto y consulta las estadísticas de creación de contenido de editores y administradores."
      />
      <div style={{ marginBottom: 20 }}>
        <SearchInput value={query} onChange={setQuery} placeholder="Buscar por nombre..." />
      </div>
      <div className={styles.usersGrid}>
        {users.map((u) => (
          <div key={u.id} className={`${styles.card} ${styles.userCard}`}>
            {can.admin && (
              <button type="button" className={styles.editButton} onClick={() => notify(`Editar a ${u.fullName} (demo)`)} aria-label="Editar">
                ✏️
              </button>
            )}
            <span className={styles.upperLabel}>Nombre Completo</span>
            <div className={styles.userName}>{u.fullName}</div>
            <div style={{ margin: '10px 0 14px' }}>
              <RoleBadge role={u.role} rounded />
            </div>
            <span className={styles.upperLabel}>Teléfono</span>
            <div className={u.phone ? styles.infoValueSmall : styles.mutedSmall}>{u.phone ?? 'Sin teléfono'}</div>
            {(u.role === 'admin' || u.role === 'editor') && (
              <div className={styles.userStats}>
                <div>
                  <span className={styles.mutedSmall}>Items Creados</span>
                  <div className={styles.bigNumber}>{createdBy(u.id)}</div>
                </div>
                <div>
                  <span className={styles.mutedSmall}>Blogs Creados</span>
                  <div className={styles.bigNumber}>0</div>
                </div>
              </div>
            )}
          </div>
        ))}
        {users.length === 0 && <div className={`${styles.card} ${styles.emptyState}`}>No hay usuarios disponibles</div>}
      </div>
    </>
  )
}

/* ---------------- Blog ---------------- */

export function BlogView() {
  return (
    <div className={`${styles.card} ${styles.comingSoon}`}>
      <div className={styles.comingSoonIcon} aria-hidden="true">🚧</div>
      <div className={styles.comingSoonTitle}>Blog</div>
      <div className={styles.mutedText}>Próximamente...</div>
    </div>
  )
}

/* ---------------- Planning ---------------- */

const HOUR_START = 8
const HOUR_END = 20
const HOUR_H = 44

const startOfWeek = (date) => {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7))
  return d
}
const addDays = (date, n) => {
  const d = new Date(date)
  d.setDate(d.getDate() + n)
  return d
}
const sameDay = (a, b) => a.toDateString() === b.toDateString()
const fmtHour = (h) => `${Math.floor(h)}:${h % 1 ? '30' : '00'}`

function buildTasks() {
  const base = startOfWeek(new Date())
  const tasks = []
  ;[-1, 0, 1, 2].forEach((week) => {
    TASK_TEMPLATES.forEach((t, i) => {
      if (week !== 0 && (i + week * 3) % 3 === 0) return
      const day = addDays(base, week * 7 + t.day)
      tasks.push({ ...t, id: `${week}-${i}`, date: day })
    })
  })
  return tasks
}

const ALL_TASKS = buildTasks()

function TaskBlock({ task, client, style }) {
  return (
    <div
      className={styles.taskBlock}
      style={{ ...style, borderLeftColor: client.color, background: `${client.color}1f` }}
      title={`${task.title} · ${client.name}`}
    >
      <span className={styles.taskTitle}>{task.title}</span>
      <span className={styles.taskMeta}>{fmtHour(task.start)} · {TASK_TYPE_LABEL[task.type]}</span>
    </div>
  )
}

function TimeGrid({ days, tasks, clients }) {
  const hours = Array.from({ length: HOUR_END - HOUR_START }, (_, i) => HOUR_START + i)
  const now = new Date()
  const nowH = now.getHours() + now.getMinutes() / 60
  const cols = `44px repeat(${days.length}, minmax(0, 1fr))`

  return (
    <div className={styles.timeGrid}>
      <div className={styles.dayHeads} style={{ gridTemplateColumns: cols }}>
        <span />
        {days.map((d, i) => {
          const today = sameDay(d, now)
          const weekday = (d.getDay() + 6) % 7
          return (
            <div key={i} className={styles.dayHead}>
              <span className={weekday >= 5 ? styles.weekendLabel : styles.dayLabel}>{WEEKDAYS_SHORT[weekday]}</span>
              <span className={`${styles.dayNumber} ${today ? styles.dayToday : ''}`}>{d.getDate()}</span>
            </div>
          )
        })}
      </div>
      <div className={styles.gridScroll} data-lenis-prevent>
        <div className={styles.gridBody} style={{ gridTemplateColumns: cols, height: hours.length * HOUR_H }}>
          <div className={styles.hourCol}>
            {hours.map((h) => (
              <span key={h} className={styles.hourLabel} style={{ top: (h - HOUR_START) * HOUR_H - 6 }}>
                {h === HOUR_START ? '' : `${h}:00`}
              </span>
            ))}
          </div>
          {days.map((d, i) => {
            const today = sameDay(d, now)
            const dayTasks = tasks.filter((t) => sameDay(t.date, d))
            return (
              <div key={i} className={`${styles.dayCol} ${today ? styles.dayColToday : ''}`}>
                {hours.map((h) => (
                  <span key={h} className={styles.hourLine} style={{ top: (h - HOUR_START) * HOUR_H }} />
                ))}
                {today && nowH >= HOUR_START && nowH <= HOUR_END && (
                  <span className={styles.nowLine} style={{ top: (nowH - HOUR_START) * HOUR_H }} />
                )}
                {dayTasks.map((t) => (
                  <TaskBlock
                    key={t.id}
                    task={t}
                    client={clients.find((c) => c.id === t.client)}
                    style={{
                      top: (t.start - HOUR_START) * HOUR_H + 1,
                      height: Math.max((t.end - t.start) * HOUR_H - 2, 30),
                    }}
                  />
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function MonthGrid({ current, tasks, clients }) {
  const first = new Date(current.getFullYear(), current.getMonth(), 1)
  const start = startOfWeek(first)
  const cells = Array.from({ length: 42 }, (_, i) => addDays(start, i))
  const now = new Date()

  return (
    <div className={styles.monthGrid} data-lenis-prevent>
      {WEEKDAYS_SHORT.map((d) => (
        <span key={d} className={styles.monthHead}>{d}</span>
      ))}
      {cells.map((d, i) => {
        const dayTasks = tasks.filter((t) => sameDay(t.date, d))
        const outside = d.getMonth() !== current.getMonth()
        return (
          <div key={i} className={`${styles.monthCell} ${outside ? styles.monthOutside : ''}`}>
            <span className={`${styles.monthNumber} ${sameDay(d, now) ? styles.dayToday : ''}`}>{d.getDate()}</span>
            {dayTasks.slice(0, 2).map((t) => {
              const client = clients.find((c) => c.id === t.client)
              return (
                <span key={t.id} className={styles.monthChip} style={{ background: `${client.color}26`, borderLeftColor: client.color }}>
                  {t.title}
                </span>
              )
            })}
            {dayTasks.length > 2 && <span className={styles.monthMore}>+{dayTasks.length - 2} más</span>}
          </div>
        )
      })}
    </div>
  )
}

function BillingView({ clients }) {
  const today = new Date()
  const groups = [
    { key: 'cobrar', title: 'A cobrar' },
    { key: 'pagar', title: 'A pagar' },
  ]
  const ids = clients.map((c) => c.id)
  return (
    <div className={styles.billing} data-lenis-prevent>
      {groups.map((g) => {
        const bills = BILLS.filter((b) => b.direction === g.key && ids.includes(b.client))
        const total = bills.reduce((s, b) => s + b.amount, 0)
        return (
          <div key={g.key} className={styles.billGroup}>
            <div className={styles.billGroupHead}>
              <span>{g.title}</span>
              <strong className={g.key === 'cobrar' ? styles.amountIn : styles.amountOut}>
                {total.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
              </strong>
            </div>
            {bills.length === 0 && <div className={styles.mutedSmall}>Sin pendientes</div>}
            {bills.map((b) => {
              const client = CLIENTS.find((c) => c.id === b.client)
              const date = addDays(today, b.dayOffset)
              return (
                <div key={b.id} className={styles.billRow}>
                  <span className={styles.colorDotSmall} style={{ background: client.color }} />
                  <div className={styles.billInfo}>
                    <span className={styles.billTitle}>{b.title}</span>
                    <span className={styles.mutedSmall}>
                      {client.name} · {date.getDate()} {MONTHS[date.getMonth()].slice(0, 3).toLowerCase()}
                    </span>
                  </div>
                  <span className={g.key === 'cobrar' ? styles.amountIn : styles.amountOut}>
                    {b.amount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                  </span>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export function PlanningView({ notify }) {
  const [selected, setSelected] = useState(CLIENTS.map((c) => c.id))
  const [search, setSearch] = useState('')
  const [view, setView] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 760px)').matches ? 'day' : 'week',
  )
  const [current, setCurrent] = useState(() => new Date())
  const [mainView, setMainView] = useState('calendar')

  const clients = CLIENTS.filter((c) => selected.includes(c.id))
  const tasks = ALL_TASKS.filter((t) => selected.includes(t.client))
  const matches = search ? CLIENTS.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())) : []

  const shift = (dir) => {
    setCurrent((d) => {
      if (view === 'month') return new Date(d.getFullYear(), d.getMonth() + dir, 1)
      return addDays(d, dir * (view === 'week' ? 7 : 1))
    })
  }

  const title = (() => {
    if (view === 'month') return `${MONTHS[current.getMonth()]} ${current.getFullYear()}`
    if (view === 'week') {
      const ws = startOfWeek(current)
      const we = addDays(ws, 6)
      if (ws.getMonth() === we.getMonth()) return `${MONTHS[ws.getMonth()]} ${ws.getFullYear()}`
      return `${MONTHS[ws.getMonth()]} – ${MONTHS[we.getMonth()]} ${we.getFullYear()}`
    }
    return `${WEEKDAYS_LONG[current.getDay()]}, ${current.getDate()} ${MONTHS[current.getMonth()]}`
  })()

  const days = view === 'week' ? Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(current), i)) : [current]

  const now = new Date()
  const upcoming = tasks
    .map((t) => ({ ...t, when: new Date(t.date.getTime() + t.start * 3600000) }))
    .filter((t) => t.when >= now)
    .sort((a, b) => a.when - b.when)
    .slice(0, 6)

  const toggleClient = (id) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))

  return (
    <div className={styles.planning}>
      <div className={styles.planningTop}>
        <div className={styles.planningSearch}>
          <input
            type="text"
            className={styles.input}
            placeholder="Buscar empresa cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {matches.length > 0 && (
            <div className={styles.dropdown}>
              {matches.map((c) => (
                <button
                  type="button"
                  key={c.id}
                  className={styles.dropdownItem}
                  onClick={() => {
                    toggleClient(c.id)
                    setSearch('')
                  }}
                >
                  <span className={styles.colorDotSmall} style={{ background: c.color }} />
                  {c.name}
                  {selected.includes(c.id) && <span className={styles.checkMark}>✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>
        <button type="button" className={styles.iosPrimary} onClick={() => notify('Nueva empresa cliente (demo)')}>
          + Empresa
        </button>
        <button type="button" className={styles.iosSecondary} onClick={() => setSelected(CLIENTS.map((c) => c.id))}>
          Seleccionar todas
        </button>
      </div>

      {clients.length > 0 && (
        <ul className={styles.clientChips}>
          {clients.map((c) => (
            <li key={c.id} className={styles.clientChip} style={{ background: `${c.color}18`, borderColor: `${c.color}50` }}>
              <span className={styles.colorDotSmall} style={{ background: c.color }} />
              {c.name}
              <button type="button" onClick={() => toggleClient(c.id)} style={{ color: c.color }} aria-label={`Quitar ${c.name}`}>
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className={styles.planningBody}>
        <div className={styles.calendarCard}>
          {mainView === 'calendar' ? (
            <>
              <div className={styles.calendarBar}>
                <div className={styles.calNav}>
                  <button type="button" className={styles.navArrow} onClick={() => shift(-1)} aria-label="Anterior">‹</button>
                  <button type="button" className={styles.todayButton} onClick={() => setCurrent(new Date())}>Hoy</button>
                  <button type="button" className={styles.navArrow} onClick={() => shift(1)} aria-label="Siguiente">›</button>
                </div>
                <span className={styles.calTitle}>{title}</span>
                <div className={styles.iosSegmented}>
                  {[
                    { k: 'day', l: 'Día' },
                    { k: 'week', l: 'Semana' },
                    { k: 'month', l: 'Mes' },
                  ].map((v) => (
                    <button type="button" key={v.k} className={view === v.k ? styles.iosSegActive : ''} onClick={() => setView(v.k)}>
                      {v.l}
                    </button>
                  ))}
                </div>
              </div>
              {clients.length === 0 ? (
                <div className={styles.calendarEmpty}>Selecciona al menos una empresa</div>
              ) : view === 'month' ? (
                <MonthGrid current={current} tasks={tasks} clients={CLIENTS} />
              ) : (
                <TimeGrid days={days} tasks={tasks} clients={CLIENTS} />
              )}
            </>
          ) : clients.length === 0 ? (
            <div className={styles.calendarEmpty}>Selecciona al menos una empresa</div>
          ) : (
            <BillingView clients={clients} />
          )}
        </div>

        <aside className={styles.planningSide}>
          <div className={styles.iosSwitch}>
            {[
              { k: 'calendar', l: 'Calendario' },
              { k: 'billing', l: 'Facturación' },
            ].map((v) => (
              <button type="button" key={v.k} className={mainView === v.k ? styles.iosSegActive : ''} onClick={() => setMainView(v.k)}>
                {v.l}
              </button>
            ))}
          </div>
          <button type="button" className={styles.iosPrimaryBlock} onClick={() => notify('Nueva tarea (demo)')}>
            + Nueva tarea
          </button>
          <button type="button" className={styles.iosSecondaryBlock} onClick={() => notify('Nueva facturación (demo)')}>
            + Nueva facturación
          </button>
          {mainView === 'calendar' && (
            <div className={styles.upcoming} data-lenis-prevent>
              <span className={styles.upcomingTitle}>Próximas tareas</span>
              {upcoming.length === 0 && <div className={styles.mutedSmall}>Sin tareas próximas</div>}
              {upcoming.map((t) => {
                const client = CLIENTS.find((c) => c.id === t.client)
                return (
                  <div key={t.id} className={styles.upcomingCard} style={{ borderLeftColor: client.color, background: `${client.color}14` }}>
                    <span className={styles.upcomingName}>{t.title}</span>
                    <span className={styles.mutedSmall}>
                      {t.when.getDate()} {MONTHS[t.when.getMonth()].slice(0, 3).toLowerCase()} · {fmtHour(t.start)}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
