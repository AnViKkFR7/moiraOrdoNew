import { Shell, Hero, Faq, Cta, LinkList, serviceLinks, extra } from './parts'
import { LOCATIONS } from '../../data/locations'

/** Página local (/diseno-web-:lugar). */
export default function LocalPage({ slug }) {
  const loc = LOCATIONS.find((l) => l.slug === slug)
  const crumbs = [
    { name: 'Inicio', path: '/' },
    { name: loc.place, path: `/${loc.slug}` },
  ]
  return (
    <Shell>
      <Hero crumbs={crumbs} kicker={loc.place} title={loc.headline} lead={loc.intro} />
      <article className={extra.article}>
        <div className={`container ${extra.prose}`}>
          {loc.sections.map((section) => (
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
      <Faq items={loc.faq} />
      <LinkList kicker="Servicios" items={serviceLinks(loc.services)} />
      <Cta />
    </Shell>
  )
}
