import styles from './Hero.module.css'
import RevealText from '../../components/RevealText/RevealText'
import heroImage from '../../assets/images/creacion-paginas.webp'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.media}>
        <img src={heroImage} alt="" />
      </div>

      <RevealText as="h1" className={styles.title}>
        El destino ordenado del contenido
      </RevealText>

      <p className={styles.text}>
        Un sistema estable para contenido cambiante.
        <br />
        Pensado para webs que no se improvisan.
      </p>
    </section>
  )
}
