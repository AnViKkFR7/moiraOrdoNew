import styles from './Hero.module.css'
import RevealText from '../../components/RevealText/RevealText'

/**
 * TODO: reemplazar por contenido real (imagen/video de fondo, título y texto).
 */
export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.media}>
        <img src="https://placehold.co/1920x1080" alt="" />
      </div>

      <RevealText as="h1" className={styles.title}>
        Título de ejemplo para el hero
      </RevealText>

      <p className={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Texto placeholder que describe
        brevemente la propuesta de valor.
      </p>
    </section>
  )
}
