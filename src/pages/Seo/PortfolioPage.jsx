import { Shell, Hero, Faq, Cta, LinkList, serviceLinks, base, extra } from './parts'
import { PORTFOLIO } from '../../data/portfolio'
import { SECTORS } from '../../data/sectors'

/** Caso de estudio (/proyectos/:slug). Solo hechos comprobables; sin métricas sin validar. */
export default function PortfolioPage({ slug }) {
  const project = PORTFOLIO.find((p) => p.slug === slug)
  const sector = SECTORS.find((s) => s.slug === project.sectorSlug)
  const crumbs = [
    { name: 'Inicio', path: '/' },
    { name: 'Proyectos', path: '/proyectos' },
    { name: project.name, path: `/proyectos/${project.slug}` },
  ]
  const others = PORTFOLIO.filter((p) => p.slug !== project.slug).slice(0, 4)

  return (
    <Shell>
      <Hero crumbs={crumbs} kicker={project.sector} title={project.name} lead={project.headline}>
        <div className={base.heroActions}>
          <a href={project.url} target="_blank" rel="noopener" className={extra.pill} data-cursor-hover>
            Visitar {project.domain}
          </a>
        </div>
        <div className={extra.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={extra.pill}>
              {tag}
            </span>
          ))}
        </div>
      </Hero>

      <section className={extra.section}>
        <div className={`container ${extra.twoCol}`}>
          <div>
            <p className={extra.lede}>{project.summary}</p>
            <h2 className={base.headline}>El reto</h2>
            <p className={base.text}>{project.challenge}</p>
          </div>
          <div>
            <h2 className={base.headline}>Qué construimos</h2>
            <ul className={extra.list}>
              {project.built.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <LinkList kicker="Servicios que utilizamos" items={serviceLinks(project.services)} />
      {sector && (
        <LinkList kicker="Más sobre el sector" items={[{ href: `/sectores/${sector.slug}`, name: sector.title }]} />
      )}
      <Faq
        title={`Sobre el proyecto ${project.name}`}
        items={[
          { q: `¿Qué es ${project.name}?`, a: `${project.name}: ${project.sector}. ${project.summary}` },
          {
            q: `¿Quién ha desarrollado la web de ${project.name}?`,
            a: 'Moira Ordo, consultora digital de Vilanova i la Geltrú, se ha encargado del diseño y el desarrollo.',
          },
        ]}
      />
      <LinkList
        kicker="Otros proyectos"
        items={others.map((p) => ({ href: `/proyectos/${p.slug}`, name: p.name, meta: p.sector }))}
      />
      <Cta />
    </Shell>
  )
}
