import styles from './ProjectCard.module.css'
import { useScrollReveal } from '../../hooks/useScrollReveal'

/**
 * Tarjeta de proyecto: imagen + tag/categoría + título.
 * TODO: reemplazar por contenido real (imagen, tag y título del proyecto).
 */
export default function ProjectCard({ image, tag, title, href = '#' }) {
  const ref = useScrollReveal({ y: 30 })

  return (
    <a ref={ref} href={href} className={styles.card} data-cursor-hover>
      <div className={styles.media}>
        <img src={image} alt={title} loading="lazy" />
      </div>
      <span className={styles.tag}>{tag}</span>
      <h3 className={styles.title}>{title}</h3>
    </a>
  )
}
