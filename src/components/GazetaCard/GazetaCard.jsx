import styles from './GazetaCard.module.css'
import { useScrollReveal } from '../../hooks/useScrollReveal'

/**
 * Tarjeta de blog/noticias.
 * TODO: reemplazar por contenido real.
 */
export default function GazetaCard({ image, date, title, href = '#' }) {
  const ref = useScrollReveal({ y: 30 })

  return (
    <a ref={ref} href={href} className={styles.card} data-cursor-hover>
      <div className={styles.media}>
        <img src={image} alt={title} loading="lazy" />
      </div>
      <div className={styles.body}>
        <span className={styles.date}>{date}</span>
        <h3 className={styles.title}>{title}</h3>
      </div>
    </a>
  )
}
