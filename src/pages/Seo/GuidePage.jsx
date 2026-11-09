import { Shell, Hero, Faq, Cta, LinkList, serviceLinks, formatDate, extra } from './parts'
import { GUIDES } from '../../data/guides'
import { SECTORS } from '../../data/sectors'

/** Artículo informativo (/guias/:slug). */
export default function GuidePage({ slug }) {
  const guide = GUIDES.find((g) => g.slug === slug)
  const crumbs = [
    { name: 'Inicio', path: '/' },
    { name: 'Guías', path: '/guias' },
    { name: guide.title, path: `/guias/${guide.slug}` },
  ]
  const sectors = guide.sectors.map((s) => SECTORS.find((item) => item.slug === s)).filter(Boolean)
  const more = GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 4)

  return (
    <Shell>
      <Hero crumbs={crumbs} kicker={guide.category} title={guide.title}>
        <div className={extra.meta}>
          <span>{guide.readMinutes} min de lectura</span>
          <span>Actualizado el {formatDate(guide.updated)}</span>
          <span>Por el equipo de Moira Ordo</span>
        </div>
      </Hero>

      <article className={extra.article}>
        <div className={`container ${extra.prose}`}>
          <p className={extra.lede}>{guide.intro}</p>
          {guide.sections.map((section) => (
            <section key={section.h}>
              <h2>{section.h}</h2>
              {section.p?.map((text) => (
                <p key={text}>{text}</p>
              ))}
              {section.ul && (
                <ul>
                  {section.ul.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>

      <Faq items={guide.faq} />
      <LinkList kicker="Servicios relacionados" items={serviceLinks(guide.services)} />
      <LinkList
        kicker="Sectores relacionados"
        items={sectors.map((s) => ({ href: `/sectores/${s.slug}`, name: s.name }))}
      />
      <LinkList
        kicker="Sigue leyendo"
        items={more.map((g) => ({ href: `/guias/${g.slug}`, name: g.title, meta: `${g.readMinutes} min` }))}
      />
      <Cta text="Si esta guía te ha dado ideas para tu proyecto, cuéntanoslo: la primera conversación es gratuita." />
    </Shell>
  )
}
