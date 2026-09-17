import styles from './ProjectsShowcase.module.css'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import arquelia from '../../assets/images/arquelia.png'
import regiamare from '../../assets/images/regiamare.jpg'

/**
 * TODO: reemplazar por contenido real (imágenes, badges, título y
 * descripción de cada proyecto).
 */
export default function ProjectsShowcase() {
  const leftRef = useScrollReveal({ y: 30 })
  const rightRef = useScrollReveal({ y: 30, delay: 0.1 })

  return (
    <div className={styles.grid}>
      <a ref={leftRef} href="#" className={styles.card} data-cursor-hover>
        <img src={arquelia} alt="Arquelia" />
        <div className={styles.overlay} />

        <div className={styles.badges}>
          <span className={styles.badge}>Madrid</span>
          <span className={styles.badge}>120 m²</span>
        </div>

        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>Arquelia</h3>
          <p className={styles.panelText}>
            Rediseño integral de marca y sitio web para un estudio de arquitectura.
          </p>
          <span className={styles.panelArrow} aria-hidden="true">
            ↗
          </span>
        </div>
      </a>

      <a ref={rightRef} href="#" className={styles.card} data-cursor-hover>
        <img src={regiamare} alt="Regiamare" />
        <div className={styles.overlay} />

        <div className={styles.badges}>
          <span className={styles.badge}>Barcelona</span>
          <span className={styles.badge}>240 m²</span>
        </div>

        <h3 className={styles.wideTitle}>Regiamare</h3>
      </a>
    </div>
  )
}
