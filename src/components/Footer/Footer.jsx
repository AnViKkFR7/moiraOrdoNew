import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Footer.module.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * Footer "telón": queda fijo detrás del contenido y la página lo va
 * descubriendo al hacer scroll. Una capa oscura se aclara a medida que
 * aparece. El wrapper con clip-path reserva el alto y recorta el fijo.
 *
 * TODO: reemplazar por contenido real (links, contacto y redes).
 */
export default function Footer() {
  const wrapperRef = useRef(null)
  const innerRef = useRef(null)
  const shadeRef = useRef(null)
  const [height, setHeight] = useState(0)
  // Si el footer no entra en el viewport (móvil), se desactiva el efecto
  const [isStatic, setIsStatic] = useState(false)

  useEffect(() => {
    const inner = innerRef.current
    const measure = () => {
      const h = inner.offsetHeight
      setHeight(h)
      setIsStatic(h > window.innerHeight)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(inner)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  useEffect(() => {
    if (!height) return
    ScrollTrigger.refresh()
    if (isStatic) return

    const tween = gsap.fromTo(
      shadeRef.current,
      { opacity: 0.55 },
      {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
        },
      }
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [height, isStatic])

  return (
    <div
      ref={wrapperRef}
      className={`${styles.wrapper} ${isStatic ? styles.isStatic : ''}`}
      style={{ height: height || undefined }}
    >
      <footer ref={innerRef} className={styles.footer}>
        <div className={styles.wordmark} aria-label="Moira Ordo">
          Moira<span className="accent-blue">Ordo</span>
        </div>

        <p className={styles.tagline}>
          El sistema que decide
          <br />
          cómo fluye el contenido.
        </p>

        <div className={styles.bottom}>
          <div className={styles.columns}>
            <div className={styles.column}>
              <span>© {new Date().getFullYear()} Moira Ordo</span>
              <a className={styles.link} href="#">
                Política de Privacidad
              </a>
              <a className={styles.link} href="#">
                Aviso Legal
              </a>
              <a className={styles.link} href="#">
                Cookies
              </a>
            </div>

            <div className={styles.column}>
              <a className={styles.link} href="#">
                Características
              </a>
              <a className={styles.link} href="#">
                Documentación
              </a>
            </div>

            <div className={styles.column}>
              <a className={styles.link} href="#">
                Sobre nosotros
              </a>
              <a className={styles.link} href="/contacto">
                Contacto
              </a>
            </div>
          </div>

          <div className={styles.social}>
            <a className={styles.socialLink} href="#" aria-label="Instagram" data-cursor-hover>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
              </svg>
            </a>
            <a className={styles.socialLink} href="#" aria-label="LinkedIn" data-cursor-hover>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4v11H3v-11Zm6.5 0h3.8v1.6c.6-1 1.9-1.9 3.8-1.9 3.4 0 3.9 2.2 3.9 5v6.3h-4v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7h-3.5v-11Z" />
              </svg>
            </a>
          </div>
        </div>

        <div ref={shadeRef} className={styles.shade} aria-hidden="true" />
      </footer>
    </div>
  )
}
