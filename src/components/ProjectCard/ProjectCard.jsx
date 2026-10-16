import { useEffect, useState } from 'react'
import styles from './ProjectCard.module.css'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import ImageSlot from '../ImageSlot/ImageSlot'
import ArrowIcon from '../ArrowIcon/ArrowIcon'

/**
 * Tarjeta de proyecto con el mismo efecto que "Nuestros Proyectos" de la home:
 * al hacer hover sube un panel de color pastel con titular y descripción.
 * En pantallas táctiles el primer toque abre el panel (con una pista que
 * invita a tocar) y el segundo abre la web del proyecto.
 */
export default function ProjectCard({
  image,
  tag,
  title,
  headline,
  description,
  accent = 'var(--accent-yellow)',
  href = '#',
  external = false,
}) {
  const ref = useScrollReveal({ y: 30 })
  const [isTouch, setIsTouch] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(hover: none)')
    setIsTouch(query.matches)
    const onChange = (e) => setIsTouch(e.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const handleClick = (e) => {
    if (isTouch && !isOpen) {
      e.preventDefault()
      setIsOpen(true)
    }
  }

  return (
    <a
      ref={ref}
      href={href}
      className={`${styles.card} ${isOpen ? styles.isOpen : ''}`}
      style={{ '--accent': accent }}
      onClick={handleClick}
      aria-expanded={isTouch ? isOpen : undefined}
      data-cursor-hover
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      <ImageSlot src={image} alt={title} label={title} className={styles.media} />
      <span className={styles.overlay} aria-hidden="true" />

      {tag && <span className={styles.badge}>{tag}</span>}

      {/* Copia invisible del panel abierto: fija desde el inicio el alto que necesita
          la tarjeta, así abrirlo no la hace crecer ni mueve la página */}
      <span className={styles.sizer} aria-hidden="true">
        <span className={styles.title}>{title}</span>
        <span className={styles.extra}>
          {headline && <span className={styles.headline}>{headline}</span>}
          {description && <span className={styles.desc}>{description}</span>}
          <span className={styles.visitHint}>Toca otra vez para visitar la web</span>
        </span>
      </span>

      <span className={styles.panel}>
        <span className={styles.title}>{title}</span>
        {isTouch && !isOpen && <span className={styles.tapHint}>Toca para descubrir</span>}
        {(headline || description) && (
          <span className={styles.extra}>
            {headline && <span className={styles.headline}>{headline}</span>}
            {description && <span className={styles.desc}>{description}</span>}
            {isTouch && <span className={styles.visitHint}>Toca otra vez para visitar la web</span>}
          </span>
        )}
        <span className={styles.arrow} aria-hidden="true"><ArrowIcon /></span>
        {isTouch && !isOpen && (
          <span className={styles.plus} aria-hidden="true">
            +
          </span>
        )}
      </span>
    </a>
  )
}
