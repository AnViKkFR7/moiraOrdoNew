import { Shell, Hero, Cta, base, extra } from './parts'
import { FAQ_GROUPS } from '../../data/faqs'

/** Todas las preguntas frecuentes en un solo sitio (/preguntas-frecuentes). */
export default function FaqPage() {
  const crumbs = [
    { name: 'Inicio', path: '/' },
    { name: 'Preguntas frecuentes', path: '/preguntas-frecuentes' },
  ]
  return (
    <Shell>
      <Hero
        crumbs={crumbs}
        kicker="Preguntas frecuentes"
        title="Todo lo que suelen preguntarnos"
        lead="Precios, CRM, SEO, proceso y sectores, con respuestas directas."
      />
      <section className={extra.section}>
        <div className={`container ${base.faqInner}`}>
          {FAQ_GROUPS.map((group) => (
            <div key={group.title} className={extra.group}>
              <h2 className={extra.groupTitle}>{group.title}</h2>
              <div className={base.faqList}>
                {group.items.map((item) => (
                  <details key={item.q} className={base.faqItem}>
                    <summary>{item.q}</summary>
                    <p className={base.text}>{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <Cta />
    </Shell>
  )
}
