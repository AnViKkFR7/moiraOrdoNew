import { Shell, Hero, Cta, extra } from './parts'
import { SECTORS } from '../../data/sectors'

/** Índice de sectores (/sectores). */
export default function SectorsIndex() {
  const crumbs = [
    { name: 'Inicio', path: '/' },
    { name: 'Sectores', path: '/sectores' },
  ]
  return (
    <Shell>
      <Hero
        crumbs={crumbs}
        kicker="Sectores"
        title="Webs y software para cada sector"
        lead="Trabajamos con inmobiliarias, empresas de reformas, transfers, profesionales creativos y negocios con catálogo."
      />
      <section className={extra.section}>
        <div className="container">
          <div className={extra.cards}>
            {SECTORS.map((sector) => (
              <a key={sector.slug} href={`/sectores/${sector.slug}`} className={extra.card} data-cursor-hover>
                <span className={extra.cardKicker}>Sector</span>
                <h2 className={extra.cardTitle}>{sector.name}</h2>
                <p className={extra.cardText}>{sector.seoDescription}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
      <Cta />
    </Shell>
  )
}
