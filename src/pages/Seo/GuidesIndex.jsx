import { Shell, Hero, Cta, extra } from './parts'
import { GUIDES } from '../../data/guides'

/** Índice de guías (/guias). */
export default function GuidesIndex() {
  const crumbs = [
    { name: 'Inicio', path: '/' },
    { name: 'Guías', path: '/guias' },
  ]
  return (
    <Shell>
      <Hero
        crumbs={crumbs}
        kicker="Guías"
        title="Guías para decidir mejor tu web"
        lead="Precios, CRM, SEO, SEO para IA, analítica y casos por sector, explicados sin jerga."
      />
      <section className={extra.section}>
        <div className="container">
          <div className={extra.cards}>
            {GUIDES.map((guide) => (
              <a key={guide.slug} href={`/guias/${guide.slug}`} className={extra.card} data-cursor-hover>
                <span className={extra.cardKicker}>{guide.category}</span>
                <h2 className={extra.cardTitle}>{guide.title}</h2>
                <p className={extra.cardText}>{guide.description}</p>
                <span className={extra.cardMeta}>{guide.readMinutes} min de lectura</span>
              </a>
            ))}
          </div>
        </div>
      </section>
      <Cta />
    </Shell>
  )
}
