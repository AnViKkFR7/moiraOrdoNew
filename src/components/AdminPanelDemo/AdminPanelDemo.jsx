import { useEffect, useRef, useState } from 'react'
import styles from './AdminPanelDemo.module.css'
import { COMPANIES, CURRENT_USER } from './demoData'
import {
  AnalyticsView,
  AttributesView,
  CompaniesView,
  ItemDetailView,
  ItemsView,
  PlanningView,
  UsersView,
} from './views'

import DemoIcon from './DemoIcon'
import { OverviewView, CrmView, DocumentsView, BlogWorkspace, SettingsView } from './workspaceViews'

const NAV_GROUPS = [
  { label: '', items: [['dashboard', 'Dashboard']] },
  { label: 'Contenido', items: [['items', 'Items'], ['attributes', 'Mis datos'], ['blog', 'Blog']] },
  { label: 'Operativa', items: [['leads', 'Solicitudes'], ['contacts', 'Contactos'], ['planning', 'Planning'], ['quotes', 'Presupuestos'], ['invoicing', 'Facturación'], ['analytics', 'Analítica']] },
  { label: 'Administración', admin: true, items: [['users', 'Usuarios'], ['companies', 'Empresas'], ['modules', 'Módulos'], ['privacy', 'Privacidad CRM'], ['summary', 'Resumen semanal']] },
]
const NAV = NAV_GROUPS.flatMap(group => group.items)

/**
 * Réplica navegable del panel de administración con datos ficticios.
 * Todo ocurre dentro del marco: no hay rutas reales ni llamadas a la BBDD.
 */
export default function AdminPanelDemo() {
  const [active, setActive] = useState('dashboard')
  const [companyId, setCompanyId] = useState(COMPANIES[0].id)
  const [itemId, setItemId] = useState(null)
  const [dark, setDark] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const [companyOpen, setCompanyOpen] = useState(false)
  const companyRef = useRef(null)
  const pageRef = useRef(null)
  const toastTimer = useRef(null)

  const company = COMPANIES.find((c) => c.id === companyId)
  const can = { write: company.role !== 'viewer', admin: company.role === 'admin' }

  useEffect(() => {
    if (!companyOpen) return
    const close = e => { if (!companyRef.current?.contains(e.target)) setCompanyOpen(false) }
    const escape = e => { if (e.key === 'Escape') setCompanyOpen(false) }
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', escape)
    return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', escape) }
  }, [companyOpen])

  const notify = (message) => {
    clearTimeout(toastTimer.current)
    setToast({ message, id: Date.now() })
    toastTimer.current = setTimeout(() => setToast(null), 2400)
  }

  useEffect(() => () => clearTimeout(toastTimer.current), [])

  useEffect(() => {
    pageRef.current?.scrollTo({ top: 0 })
  }, [active, itemId, companyId])

  const go = (key) => {
    setActive(key)
    setItemId(null)
    setMobileOpen(false)
  }

  const selectCompany = (id) => {
    setCompanyId(id)
    setActive('dashboard')
    setCompanyOpen(false)
    setMobileOpen(false)
    setItemId(null)
    notify(`Empresa activa: ${COMPANIES.find((c) => c.id === id).name}`)
  }

  const viewProps = { company, can, notify }
  const viewKey = `${companyId}-${active}-${itemId ?? ''}`

  let view
  if (active === 'dashboard') view = <OverviewView company={company} go={go} />
  else if (active === 'items' && itemId) view = <ItemDetailView {...viewProps} itemId={itemId} onBack={() => setItemId(null)} />
  else if (active === 'items') view = <ItemsView {...viewProps} onOpenItem={setItemId} />
  else if (active === 'analytics') view = <AnalyticsView {...viewProps} />
  else if (active === 'attributes') view = <AttributesView {...viewProps} />
  else if (active === 'companies') view = <CompaniesView notify={notify} />
  else if (active === 'users') view = <UsersView {...viewProps} />
  else if (active === 'blog') view = <BlogWorkspace {...viewProps} />
  else if (active === 'leads' || active === 'contacts') view = <CrmView {...viewProps} contacts={active === 'contacts'} />
  else if (active === 'quotes' || active === 'invoicing') view = <DocumentsView {...viewProps} kind={active} />
  else if (['modules', 'privacy', 'summary', 'profile'].includes(active)) view = <SettingsView {...viewProps} section={active} />
  else view = <PlanningView notify={notify} />

  return (
    <div className={styles.frame}>
      <div className={styles.browserBar} aria-hidden="true">
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.address}>🔒 admin.moiraordo.es</span>
        <span className={styles.demoBadge}>Demo interactiva</span>
      </div>

      <div
        className={`${styles.root} ${dark ? styles.dark : ''} ${collapsed ? styles.collapsed : ''} ${mobileOpen ? styles.mobileOpen : ''}`}
      >
        <aside className={styles.sidebar}>
          <div className={styles.companySwitcher} ref={companyRef}>
            <button type="button" className={styles.brand} onClick={() => setCompanyOpen(v => !v)} aria-label="Cambiar empresa" aria-expanded={companyOpen}>
            <span className={styles.brandMark}>{company.name.charAt(0)}</span>
            <div className={styles.brandInfo}>
              <div className={styles.brandTitle}>{company.name}</div>
              <div className={styles.brandSubtitle}>Cambiar empresa⌄</div>
            </div>
            </button>
            {companyOpen && <div className={styles.companyMenu}>{COMPANIES.map(c => <button type="button" key={c.id} onClick={() => selectCompany(c.id)} aria-pressed={c.id === companyId}><span>{c.name}</span><small>{c.role === 'admin' ? 'Admin' : c.role === 'editor' ? 'Editor' : 'Solo lectura'} {c.id === companyId ? '✓' : ''}</small></button>)}</div>}
            </div>
          <nav className={styles.nav} aria-label="Navegación de la demo" data-lenis-prevent>
            {NAV_GROUPS.filter(group => !group.admin || can.admin).map(group => <div className={styles.navGroup} key={group.label}>
              {group.label && <span className={styles.navGroupTitle}>{group.label}</span>}
              {group.items.map(([key, label]) => <button type="button" key={key} className={`${styles.navLink} ${active === key ? styles.navActive : ''}`} onClick={() => go(key)} title={label} aria-current={active === key ? 'page' : undefined} data-cursor-hover><span className={styles.navIcon}><DemoIcon name={key} /></span><span className={styles.navLabel}>{label}</span></button>)}
            </div>)}
          </nav>

          <div className={styles.sidebarFooter}>
            <button type="button" className={styles.navLink} onClick={() => go('profile')} title="Mi cuenta"><DemoIcon name="profile" /><span className={styles.navLabel}>Mi cuenta</span></button>
            <button type="button" className={`${styles.navLink} ${styles.collapseButton}`} onClick={() => setCollapsed((v) => !v)} aria-label={collapsed ? 'Expandir menú' : 'Contraer menú'} aria-expanded={!collapsed}>
              <span className={styles.collapseIcon} aria-hidden="true">{collapsed ? '▶︎' : '◀︎'}</span>
              <span className={styles.navLabel}>Contraer menú</span>
            </button>
            <button type="button" className={styles.themeSwitch} aria-label={dark ? 'Activar modo claro' : 'Activar modo oscuro'} onClick={() => setDark((v) => !v)} data-cursor-hover>
              <span aria-hidden="true">{dark ? '☼' : '☾'}</span>
              <span className={styles.themeLabel}>{dark ? 'Modo Claro' : 'Modo Oscuro'}</span>
            </button>
          </div>
        </aside>

        {mobileOpen && <button type="button" className={styles.backdrop} onClick={() => setMobileOpen(false)} aria-label="Cerrar menú" />}

        <div className={styles.main}>
          <header className={styles.topbar}>
            <div className={styles.topbarLeft}>
              <button type="button" className={styles.burger} onClick={() => setMobileOpen((v) => !v)} aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={mobileOpen}>
                {mobileOpen ? '✕' : '☰'}
              </button>
              <div className={styles.topbarTitle}>{NAV.find(([key]) => key === active)?.[1] || 'Mi cuenta'}</div>
            </div>
            <div className={styles.topbarRight}>
              <div className={styles.userChip}>
                <span className={styles.userAvatar}>{CURRENT_USER.username.charAt(0).toUpperCase()}</span>
                <span className={styles.userText}>
                  <span className={styles.userName}>{CURRENT_USER.username}</span>
                  <span className={styles.userRole}>{company.role === 'admin' ? 'Admin' : company.role === 'editor' ? 'Editor' : 'Solo lectura'}</span>
                </span>
              </div>
              <button type="button" className={styles.circleButton} onClick={() => notify('Demo disponible solo en español')} aria-label="Idioma">
                ES
              </button>
              <button
                type="button"
                className={`${styles.circleButton} ${styles.logout}`}
                onClick={() => notify('En la demo la sesión no se puede cerrar 🙂')}
                aria-label="Cerrar sesión"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z" />
                </svg>
              </button>
            </div>
          </header>

          <div className={styles.demoNotice}><span className={styles.liveDot} />Demo · Datos ficticios · Nada se guarda ni se envía</div>
          <main ref={pageRef} className={`${styles.page} ${active === 'planning' ? styles.pagePlanning : ''}`} data-lenis-prevent>
            <div key={viewKey} className={styles.pageContent}>
              {view}
            </div>
          </main>
        </div>

        {toast && (
          <div key={toast.id} className={styles.toast} role="status">
            {toast.message}
          </div>
        )}
      </div>
    </div>
  )
}
