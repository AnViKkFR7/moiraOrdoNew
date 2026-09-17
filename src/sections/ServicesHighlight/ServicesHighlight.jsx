import styles from './ServicesHighlight.module.css'
import RevealText from '../../components/RevealText/RevealText'
import Button from '../../components/Button/Button'
import LiveSitesShowcase from '../LiveSitesShowcase/LiveSitesShowcase'
import { useScrollReveal } from '../../hooks/useScrollReveal'

/**
 * TODO: reemplazar por contenido real (kicker, titular, ícono, párrafo y CTA).
 */
export default function ServicesHighlight() {
  const iconRef = useScrollReveal({ y: 20 })

  return (
    <section className={styles.section}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.left}>
          <span className={styles.kicker}>Nuestros Servicios</span>
          <RevealText as="h2" className={styles.headline}>
            Para empresas
            <br />
            <span className={styles.plus}>+</span>{' '}
            <span className="accent-blue-light">Moira Ordo Games</span>
          </RevealText>
        </div>

        <div className={styles.right}>
          <div ref={iconRef} className={styles.iconCircle}>
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M24 4 L42 24 L24 44 L6 24 Z"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path d="M24 4 V44" strokeWidth="1.6" />
            </svg>
          </div>

          <div className={styles.textBlock}>
            <p className={styles.text}>
              Cada proyecto empieza con un diagnóstico real de tu negocio. A partir de ahí,
              diseñamos y desarrollamos un sistema a medida — no una plantilla — pensado para
              crecer contigo.
            </p>

            <Button as="a" href="#" className={styles.cta}>
              Descubre Nuestros Servicios
            </Button>
          </div>
        </div>
      </div>

      <div className={`container ${styles.showcase}`}>
        <LiveSitesShowcase />
      </div>
    </section>
  )
}
