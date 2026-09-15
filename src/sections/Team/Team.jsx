import styles from './Team.module.css'
import RevealText from '../../components/RevealText/RevealText'
import Button from '../../components/Button/Button'
import { useScrollReveal } from '../../hooks/useScrollReveal'

/**
 * TODO: reemplazar por contenido real (imagen grupal, texto y CTA).
 */
export default function Team() {
  const mediaRef = useScrollReveal({ y: 40 })

  return (
    <section className={`section container ${styles.team}`}>
      <RevealText as="h2">
        Conocé al <span className="accent-yellow">equipo</span>
      </RevealText>

      <p className={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Un equipo multidisciplinario
        detrás de cada proyecto.
      </p>

      <div ref={mediaRef} className={styles.media}>
        <img src="https://placehold.co/1600x686" alt="" loading="lazy" />
      </div>

      <div className={styles.cta}>
        <Button as="a" href="#" variant="filled">
          Conocer al equipo
        </Button>
      </div>
    </section>
  )
}
