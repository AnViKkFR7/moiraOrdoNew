import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Button from '../../components/Button/Button'
import ArrowIcon from '../../components/ArrowIcon/ArrowIcon'
import base from '../ServicePage/ServicePage.module.css'
import extra from './Seo.module.css'
import { SERVICES, formatPrice } from '../../data/services'

export { base, extra }

/** Estructura común: cabecera, migas de pan visibles (las mismas que los datos estructurados) y pie. */
export function Shell({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export function Hero({ crumbs, kicker, title, lead, children }) {
  return (
    <section className={base.hero}>
      <div className="container">
        <nav className={base.breadcrumb} aria-label="Migas de pan">
          {crumbs.map((crumb, i) => (
            <span key={crumb.path} style={{ display: 'contents' }}>
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === crumbs.length - 1 ? (
                <span aria-current="page">{crumb.name}</span>
              ) : (
                <a href={crumb.path}>{crumb.name}</a>
              )}
            </span>
          ))}
        </nav>
        <span className={base.kicker}>{kicker}</span>
        <h1 className={base.title}>{title}</h1>
        {lead && <p className={base.lead}>{lead}</p>}
        {children}
      </div>
    </section>
  )
}

export function Faq({ items, kicker = 'Preguntas frecuentes', title = 'Lo que suelen preguntarnos' }) {
  if (!items?.length) return null
  return (
    <section className={base.faq}>
      <div className={`container ${base.faqInner}`}>
        <span className={base.kicker}>{kicker}</span>
        <h2 className={base.headline}>{title}</h2>
        <div className={base.faqList}>
          {items.map((item) => (
            <details key={item.q} className={base.faqItem}>
              <summary>{item.q}</summary>
              <p className={base.text}>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Cta({ href = '/contacto', title = '¿Empezamos tu proyecto?', text = 'La primera conversación es gratuita y te respondemos en menos de 24 horas.' }) {
  return (
    <section className={base.cta}>
      <div className="container">
        <h2 className={base.ctaTitle}>{title}</h2>
        <p className={base.ctaText}>{text}</p>
        <Button as="a" href={href} variant="filled">
          Contactar
        </Button>
      </div>
    </section>
  )
}

/** Lista de enlaces internos (servicios, sectores, guías, proyectos). */
export function LinkList({ kicker, items }) {
  if (!items?.length) return null
  return (
    <section className={base.related}>
      <div className="container">
        <span className={base.kicker}>{kicker}</span>
        <ul className={base.relatedList}>
          {items.map((item) => (
            <li key={item.href}>
              <a href={item.href} className={base.relatedLink} data-cursor-hover>
                <span className={base.relatedName}>{item.name}</span>
                {item.meta && <span className={base.relatedPrice}>{item.meta}</span>}
                <span className={base.relatedArrow} aria-hidden="true">
                  <ArrowIcon />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function serviceLinks(slugs) {
  return slugs
    .map((slug) => SERVICES.find((s) => s.slug === slug))
    .filter(Boolean)
    .map((s) => ({
      href: `/servicios/${s.slug}`,
      name: s.name,
      meta: s.priceFrom ? `desde ${formatPrice(s.priceFrom)}` : 'A medida',
    }))
}

export const formatDate = (iso) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
