import styles from './CaseStudies.module.css'
import RevealText from '../../components/RevealText/RevealText'
import Reveal from '../../components/Reveal/Reveal'
import Button from '../../components/Button/Button'
import { CASE_STUDIES } from '../../data/caseStudies'
import ArrowIcon from '../../components/ArrowIcon/ArrowIcon'

/**
 * Casos de éxito: reto, solución, cifras y una frase de cada cliente.
 */
export default function CaseStudies() {
  return (
    <section id="casos" className={styles.section} aria-labelledby="casos-titulo">
      <div className="container">
        <div className={styles.head}>
          <span className={styles.kicker}>Casos de éxito</span>
          <RevealText as="h2" id="casos-titulo" className={styles.headline}>
            Webs que ya están <span className="accent-blue">trabajando</span>
          </RevealText>
          <p className={styles.intro}>
            Qué problema tenía cada cliente, qué construimos y qué ha cambiado desde entonces.
          </p>
        </div>

        <div className={styles.list}>
          {CASE_STUDIES.map((study, i) => (
            <Reveal
              as="article"
              key={study.client}
              className={styles.case}
              style={{ '--accent': study.accent }}
            >
              <header className={styles.caseHead}>
                <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className={styles.client}>{study.client}</h3>
                <span className={styles.sector}>{study.sector}</span>
                {study.services && <span className={styles.services}>{study.services}</span>}
                <a
                  href={study.href}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.visit}
                  data-cursor-hover
                >
                  Visitar la web <span aria-hidden="true"><ArrowIcon /></span>
                </a>
              </header>

              <div className={styles.caseBody}>
                <div className={styles.story}>
                  <div>
                    <span className={styles.storyLabel}>El reto</span>
                    <p className={styles.storyText}>{study.challenge}</p>
                  </div>
                  <div>
                    <span className={styles.storyLabel}>Lo que construimos</span>
                    <p className={styles.storyText}>{study.solution}</p>
                  </div>
                </div>

                <dl className={styles.metrics}>
                  {study.metrics.map((metric) => (
                    <div key={metric.label} className={styles.metric}>
                      <dt className={styles.metricLabel}>{metric.label}</dt>
                      <dd className={styles.metricValue}>{metric.value}</dd>
                    </div>
                  ))}
                </dl>

                <figure className={styles.quote}>
                  <blockquote>
                    <p>“{study.quote}”</p>
                  </blockquote>
                  <figcaption>— {study.author}</figcaption>
                </figure>
              </div>
            </Reveal>
          ))}
        </div>

        <div className={styles.cta}>
          <Button as="a" href="/proyectos" variant="filled">
            Ver todos los proyectos
          </Button>
        </div>
      </div>
    </section>
  )
}
