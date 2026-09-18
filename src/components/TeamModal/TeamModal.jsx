import { useEffect } from 'react'
import styles from './TeamModal.module.css'

/**
 * Modal con la ficha de un miembro del equipo. `member` = { image, name,
 * firstName, bio: [párrafo1, párrafo2], projects: [nombre, ...] }
 */
export default function TeamModal({ member, isOpen, onClose }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  }, [isOpen])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  if (!member) return null

  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.isOpen : ''}`}
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose} data-cursor-hover aria-label="Cerrar">
          ✕
        </button>

        <div className={styles.left}>
          <h3 className={styles.name}>{member.firstName}</h3>

          <div className={styles.bio}>
            {member.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <span className={styles.projectsLabel}>Proyectos de {member.firstName}:</span>
          <div className={styles.projectsList}>
            {member.projects.map((project) => (
              <span key={project} className={styles.projectPill} data-cursor-hover>
                {project} ↗
              </span>
            ))}
          </div>
        </div>

        <div className={styles.right}>
          <img src={member.image} alt={member.name} />
        </div>
      </div>
    </div>
  )
}
