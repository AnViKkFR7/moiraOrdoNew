import { Shell, Hero, Faq, Cta, LinkList, serviceLinks, base, extra } from './parts'
import { SECTORS } from '../../data/sectors'
import { PORTFOLIO } from '../../data/portfolio'
import { GUIDES } from '../../data/guides'

/** Página por sector (/sectores/:slug): problemas, solución, casos reales, preguntas y enlaces internos. */
export default function SectorPage({ slug }) {
  const sector = SECTORS.find((s) => s.slug === slug)
  const crumbs = [
    { name: 'Inicio', path: '/' },
    { name: 'Sectores', path: '/sectores' },
    { name: sector.name, path: `/sectores/${sector.slug}` },
  ]
  const projects = sector.projects.map((p) => PORTFOLIO.find((item) => item.slug === p)).filter(Boolean)
  const guides = GUIDES.filter((g) => g.sectors.includes(sector.slug))

  return (
    <Shell>
      <Hero crumbs={crumbs} kicker="Sectores" title={sector.title} lead={sector.headline}>
        <div className={base.heroActions}>
          <a href={`/contacto?servicio=${sector.services[0]}`} className={extra.pill} data-cursor-hover>
            Pedir presupuesto
          </a>
        </div>
      </Hero>

      <section className={extra.section}>
        <div className={`container ${extra.twoCol}`}>
          <div>
            <p className={extra.lede}>{sector.intro}</p>
          </div>
          <div>
            <h2 className={base.headline}>Los problemas que vemos en el sector</h2>
            <ul className={extra.list}>
              {sector.pains.map((pain) => (
                <li key={pain}>{pain}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={`${extra.section} ${extra.sectionAlt}`}>
        <div className="container">
          <span className={base.kicker}>Cómo lo resolvemos</span>
          <h2 className={base.headline}>Lo que incluye una web pensada para tu sector</h2>
          <div className={extra.cards}>
            {sector.solutions.map((item) => (
              <div key={item.t} className={extra.card}>
                <h3 className={extra.cardTitle}>{item.t}</h3>
                <p className={extra.cardText}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {projects.length > 0 && (
        <LinkList
          kicker="Casos reales"
          items={projects.map((p) => ({ href: `/proyectos/${p.slug}`, name: p.name, meta: p.sector }))}
        />
      )}

      <LinkList kicker="Servicios relacionados" items={serviceLinks(sector.services)} />
      <Faq items={sector.faq} />
      <LinkList
        kicker="Guías relacionadas"
        items={guides.map((g) => ({ href: `/guias/${g.slug}`, name: g.title, meta: `${g.readMinutes} min` }))}
      />
      <Cta />
    </Shell>
  )
}
