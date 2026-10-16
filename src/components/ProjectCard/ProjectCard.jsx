import styles from './ProjectCard.module.css'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import ImageSlot from '../ImageSlot/ImageSlot'

/**
 * Tarjeta de proyecto: imagen + tag/categoría + título.
 * Sin `image` muestra el placeholder de ImageSlot con `title` como label.
 */
export default function ProjectCard({ image, tag, title, href = '#', external = false }) {
  const ref = useScrollReveal({ y: 30 })

  return (
    <a
      ref={ref}
      href={href}
      className={styles.card}
      data-cursor-hover
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      <ImageSlot src={image} alt={title} label={title} className={styles.media} />
      <span className={styles.tag}>{tag}</span>
      <h3 className={styles.title}>{title}</h3>
    </a>
  )
}
