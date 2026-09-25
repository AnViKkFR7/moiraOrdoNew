import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from './TeamModal.module.css'

// Recorte cerrado anclado a la esquina superior izquierda
const CLIP_CLOSED = 'inset(0% 100% 100% 0% round 20px)'
const CLIP_OPEN = 'inset(0% 0% 0% 0% round 20px)'

/**
 * Modal con la ficha de un miembro del equipo. `member` = { image, name,
 * firstName, bio: [párrafo1, párrafo2], projects: [nombre, ...] }
 *
 * Apertura: el fondo se oscurece y la tarjeta se revela desde la esquina
 * superior izquierda (clip-path), sin escalar el contenido. Cierre: inverso.
 */
export default function TeamModal({ member, isOpen, onClose }) {
  // Mantiene el último miembro montado mientras corre la animación de cierre
  const [current, setCurrent] = useState(member)
  const overlayRef = useRef(null)
  const modalRef = useRef(null)
  const imageRef = useRef(null)
  const closeRef = useRef(null)
  const tlRef = useRef(null)

  useEffect(() => {
    if (member) setCurrent(member)
  }, [member])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  }, [isOpen])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  useLayoutEffect(() => {
    if (!current) return
    const overlay = overlayRef.current
    const modal = modalRef.current
    const image = imageRef.current
    const close = closeRef.current

    tlRef.current?.kill()

    if (isOpen) {
      gsap.set(overlay, { autoAlpha: 0 })
      gsap.set(modal, { clipPath: CLIP_CLOSED })
      gsap.set(image, { yPercent: 12, scale: 1.08 })
      gsap.set(close, { scale: 0, autoAlpha: 0 })

      tlRef.current = gsap
        .timeline()
        .to(overlay, { autoAlpha: 1, duration: 0.35, ease: 'power2.out' })
        .fromTo(
          modal,
          { clipPath: CLIP_CLOSED },
          { clipPath: CLIP_OPEN, duration: 0.8, ease: 'expo.inOut' },
          '-=0.1'
        )
        .to(image, { yPercent: 0, scale: 1, duration: 1, ease: 'expo.out' }, '<0.25')
        .to(close, { scale: 1, autoAlpha: 1, duration: 0.4, ease: 'back.out(2)' }, '<0.3')
    } else {
      tlRef.current = gsap
        .timeline({ onComplete: () => setCurrent(null) })
        .to(close, { scale: 0, autoAlpha: 0, duration: 0.2, ease: 'power2.in' })
        .fromTo(
          modal,
          { clipPath: CLIP_OPEN },
          { clipPath: CLIP_CLOSED, duration: 0.6, ease: 'expo.inOut' },
          '<'
        )
        .to(overlay, { autoAlpha: 0, duration: 0.3, ease: 'power2.out' }, '-=0.2')
    }
  }, [isOpen, current])

  useEffect(() => () => tlRef.current?.kill(), [])

  if (!current) return null

  return (
    <div
      ref={overlayRef}
      className={`${styles.overlay} ${isOpen ? styles.isOpen : ''}`}
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <div ref={modalRef} className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          ref={closeRef}
          className={styles.close}
          onClick={onClose}
          data-cursor-hover
          aria-label="Cerrar"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 3 L21 21 M21 3 L3 21" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>

        <div className={styles.left}>
          <h3 className={styles.name}>{current.firstName}</h3>

          <div className={styles.bio}>
            {current.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className={styles.projects}>
            <span className={styles.projectsLabel}>Proyectos de {current.firstName}:</span>
            <div className={styles.projectsList}>
              {current.projects.map((project) => (
                <span key={project} className={styles.projectPill} data-cursor-hover>
                  {project} ↗
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.photo}>
          <img ref={imageRef} src={current.image} alt={current.name} />
        </div>
      </div>
    </div>
  )
}
