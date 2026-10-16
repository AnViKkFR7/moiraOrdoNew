import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Button from '../../components/Button/Button'
import Reveal from '../../components/Reveal/Reveal'
import { PROCESS, SERVICES, formatPrice } from '../../data/services'
import styles from './ServicePage.module.css'
import ArrowIcon from '../../components/ArrowIcon/ArrowIcon'

/** Página por intención de búsqueda de un servicio (/servicios/:slug). */
export default function ServicePage({ slug }) {
  const service = SERVICES.find((s) => s.slug === slug)
  const related = SERVICES.filter((s) => s.slug !== slug)
  const contactHref = `/contacto?servicio=${service.slug}`

  return (
    <>
      <Header />

      <main>
        <section className={styles.hero}>
          <div className="container">
            <nav className={styles.breadcrumb} aria-label="Migas de pan">
              <a href="/">Inicio</a>
              <span aria-hidden="true">/</span>
              <a href="/servicios">Servicios</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{service.name}</span>
            </nav>

            <span className={styles.kicker}>Servicios</span>
            <h1 className={styles.title}>{service.name}</h1>
            <p className={styles.lead}>{service.headline}</p>

            <div className={styles.heroActions}>
              <span className={styles.price}>
                {service.priceFrom ? (
                  <>
                    <small>desde</small>
                    {formatPrice(service.priceFrom)}
                  </>
                ) : (
                  <small className={styles.priceAsk}>Presupuesto a medida</small>
                )}
              </span>
              <Button as="a" href={contactHref} variant="filled">
                Pedir presupuesto
              </Button>
            </div>
          </div>
        </section>

        <section className={styles.body}>
          <div className={`container ${styles.bodyGrid}`}>
            <div>
              <p className={styles.intro}>{service.intro}</p>
              {service.paragraphs.map((text) => (
                <p key={text} className={styles.text}>
                  {text}
                </p>
              ))}
            </div>

            <div className={styles.includes}>
              <h2 className={styles.includesTitle}>Qué incluye</h2>
              <ul>
                {service.includes.map((item) => (
                  <li key={item}>
                    <span className={styles.check} aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.process}>
          <div className="container">
            <span className={styles.kicker}>Cómo trabajamos</span>
            <h2 className={styles.headline}>Cuatro pasos, ninguna improvisación</h2>
            <ol className={styles.steps}>
              {PROCESS.map((step, i) => (
                <Reveal as="li" key={step.title} y={24} delay={i * 0.08} className={styles.step}>
                  <span className={styles.stepNumber}>{String(i + 1).padStart(2, '0')}</span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.text}>{step.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.faq}>
          <div className={`container ${styles.faqInner}`}>
            <span className={styles.kicker}>Preguntas frecuentes</span>
            <h2 className={styles.headline}>Lo que suelen preguntarnos</h2>
            <div className={styles.faqList}>
              {service.faq.map((item) => (
                <details key={item.q} className={styles.faqItem}>
                  <summary>{item.q}</summary>
                  <p className={styles.text}>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.related}>
          <div className="container">
            <span className={styles.kicker}>Otros servicios</span>
            <ul className={styles.relatedList}>
              {related.map((item) => (
                <li key={item.slug}>
                  <a href={`/servicios/${item.slug}`} className={styles.relatedLink} data-cursor-hover>
                    <span className={styles.relatedName}>{item.name}</span>
                    <span className={styles.relatedPrice}>
                      {item.priceFrom ? `desde ${formatPrice(item.priceFrom)}` : 'A medida'}
                    </span>
                    <span className={styles.relatedArrow} aria-hidden="true"><ArrowIcon /></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.cta}>
          <div className="container">
            <h2 className={styles.ctaTitle}>¿Empezamos tu proyecto?</h2>
            <p className={styles.ctaText}>
              La primera conversación es gratuita y te respondemos en menos de 24 horas.
            </p>
            <Button as="a" href={contactHref} variant="filled">
              Contactar
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
