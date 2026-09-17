import styles from './ProjectsIntro.module.css'
import RevealText from '../../components/RevealText/RevealText'

/**
 * TODO: reemplazar por contenido real.
 */
export default function ProjectsIntro() {
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Nuestros Proyectos</span>

      <RevealText as="p" className={styles.text}>
        Páginas web a medida que reflejan la esencia de tu proyecto.
Sin plantillas. Sin improvisación. Solo soluciones pensadas para ti.
      </RevealText>
    </div>
  )
}
