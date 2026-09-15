import styles from './Testimonial.module.css'
import RevealText from '../../components/RevealText/RevealText'

/**
 * TODO: reemplazar por contenido real (cita y autor).
 */
export default function Testimonial() {
  return (
    <section className={`section container ${styles.testimonial}`}>
      <RevealText as="p" className={`h2 ${styles.quote}`}>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, testimonio de ejemplo."
      </RevealText>
      <p className={styles.author}>Nombre Apellido — Cargo, Empresa</p>
    </section>
  )
}
