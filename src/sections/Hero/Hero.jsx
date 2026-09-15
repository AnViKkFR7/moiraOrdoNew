import styles from './Hero.module.css'
import RevealText from '../../components/RevealText/RevealText'
import heroImage from '../../assets/images/creacion-paginas.webp'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.textBlock}>
        <RevealText as="h1" className={styles.title}>
          El destino ordenado del contenido. Un sistema estable para contenido cambiante. Pensado
          para <span className="accent-blue">webs que no se improvisan</span>.
        </RevealText>
      </div>

      <div className={styles.media}>
        <img src={heroImage} alt="" />
        <a href="#proyectos" className={styles.scrollButton} data-cursor-hover aria-label="Ver más">
          ↓
        </a>
      </div>
    </section>
  )
}
