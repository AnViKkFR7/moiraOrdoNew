import styles from './Testimonial.module.css'
import RevealText from '../../components/RevealText/RevealText'

export default function Testimonial() {
  return (
    <section className={`section container ${styles.testimonial}`}>
      <RevealText as="p" className={`h2 ${styles.quote}`}>
        "No creamos el mundo. Decidimos cómo fluye."
      </RevealText>
      <p className={styles.author}>— Filosofía Moira Ordo</p>
      <p className={styles.text}>
        Esta es nuestra guía. No sobreactuamos. No complicamos lo simple. Creamos sistemas que
        funcionan en silencio y permiten que tu contenido y tu mensaje sean los protagonistas.
      </p>
    </section>
  )
}
