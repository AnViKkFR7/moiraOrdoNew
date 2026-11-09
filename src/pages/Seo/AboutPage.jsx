import { Shell, Hero, Cta, LinkList, serviceLinks, extra } from './parts'
import { ENTITY, CITATION } from '../../data/entity'
import { SERVICES } from '../../data/services'
import { PORTFOLIO } from '../../data/portfolio'

/** Página de entidad (/sobre-nosotros): quién es Moira Ordo, en datos cortos y verificables. */
export default function AboutPage() {
  const crumbs = [
    { name: 'Inicio', path: '/' },
    { name: 'Sobre nosotros', path: '/sobre-nosotros' },
  ]
  return (
    <Shell>
      <Hero crumbs={crumbs} kicker="Sobre nosotros" title="Quiénes somos" lead={ENTITY.definition} />
      <section className={extra.section}>
        <div className="container">
          <dl className={extra.facts}>
            <div>
              <dt>Qué hacemos</dt>
              <dd>{ENTITY.description}</dd>
            </div>
            <div>
              <dt>Dónde estamos</dt>
              <dd>
                {ENTITY.locality}, {ENTITY.region} ({ENTITY.country}). Trabajamos en remoto con clientes de toda
                España.
              </dd>
            </div>
            <div>
              <dt>Para quién</dt>
              <dd>{ENTITY.audience.join(', ')}.</dd>
            </div>
            <div>
              <dt>Servicios</dt>
              <dd>{SERVICES.map((s) => s.name).join(', ')}.</dd>
            </div>
            <div>
              <dt>Precios de partida</dt>
              <dd>{ENTITY.pricing}</dd>
            </div>
            <div>
              <dt>Cómo trabajamos</dt>
              <dd>
                Escuchamos, diseñamos, construimos y acompañamos. {ENTITY.firstContact} Respondemos en{' '}
                {ENTITY.responseTime}.
              </dd>
            </div>
            <div>
              <dt>Tecnología</dt>
              <dd>{ENTITY.stack}</dd>
            </div>
            <div>
              <dt>Proyectos</dt>
              <dd>
                {PORTFOLIO.map((p, i) => (
                  <span key={p.slug}>
                    {i > 0 && ', '}
                    <a href={`/proyectos/${p.slug}`}>{p.name}</a>
                  </span>
                ))}
                .
              </dd>
            </div>
            <div>
              <dt>Contacto</dt>
              <dd>
                <a href={`mailto:${ENTITY.email}`}>{ENTITY.email}</a> · <a href="/contacto">moiraordo.es/contacto</a>
              </dd>
            </div>
            <div>
              <dt>Cómo citarnos</dt>
              <dd>{CITATION}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className={`${extra.section} ${extra.sectionAlt}`}>
        <div className="container">
          <span className="eyebrow">Equipo</span>
          <div className={extra.cards}>
            {ENTITY.team.map((person) => (
              <div key={person.name} className={extra.card}>
                <span className={extra.cardKicker}>{person.jobTitle}</span>
                <h2 className={extra.cardTitle}>{person.name}</h2>
                <p className={extra.cardText}>{person.description}</p>
                {person.sameAs.map((url) => (
                  <a key={url} href={url} target="_blank" rel="noopener" className={extra.inlineLink}>
                    LinkedIn
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <LinkList kicker="Servicios" items={serviceLinks(SERVICES.map((s) => s.slug))} />
      <Cta />
    </Shell>
  )
}
