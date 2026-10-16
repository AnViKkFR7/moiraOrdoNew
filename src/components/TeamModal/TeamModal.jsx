import { useEffect, useRef, useState } from 'react'
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect'
import gsap from 'gsap'
import styles from './TeamModal.module.css'
import ArrowIcon from '../ArrowIcon/ArrowIcon'

// Recorte cerrado anclado a la esquina superior izquierda
const CLIP_CLOSED = 'inset(0% 100% 100% 0% round 20px)'
const CLIP_OPEN = 'inset(0% 0% 0% 0% round 20px)'

/**
 * Modal con la ficha de un miembro del equipo. `member` = { image, name,
 * firstName, bio: [párrafo1, párrafo2], projects: [{ name, href }], role?, linkedin? }
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

  useIsomorphicLayoutEffect(() => {
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
          {current.role && <span className={styles.role}>{current.role}</span>}

          <div className={styles.bio}>
            {current.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {current.linkedin && (
            <a
              className={styles.linkedin}
              href={current.linkedin}
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              aria-label={`LinkedIn de ${current.firstName}`}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11.5H3V9.75Zm6.5 0h3.83v1.57h.06c.53-1 1.84-2.07 3.78-2.07 4.04 0 4.78 2.66 4.78 6.12v5.88h-4v-5.2c0-1.24-.02-2.84-1.73-2.84-1.73 0-2 1.35-2 2.75v5.29h-4V9.75Z"
                />
              </svg>
              LinkedIn
            </a>
          )}

          <div className={styles.projects}>
            <span className={styles.projectsLabel}>
              {current.projects.length === 1
                ? '1 proyecto'
                : `${current.projects.length} proyectos`}{' '}
              con {current.firstName}
            </span>
            <div className={styles.projectsList}>
              {current.projects.map((project) => (
                <a
                  key={project.name}
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.projectPill}
                  data-cursor-hover
                >
                  {project.name} <span aria-hidden="true"><ArrowIcon /></span>
                </a>
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
