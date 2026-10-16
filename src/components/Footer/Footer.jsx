import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SERVICES } from '../../data/services'
import styles from './Footer.module.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * Footer "telón": queda fijo detrás del contenido y la página lo va
 * descubriendo al hacer scroll. Una capa oscura se aclara a medida que
 * aparece. El wrapper con clip-path reserva el alto y recorta el fijo.
 *
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
            <nav className={styles.column} aria-label="Web">
              <a className={styles.link} href="/proyectos">Proyectos</a>
              <a className={styles.link} href="/crm">CRM</a>
              <a className={styles.link} href="/servicios">Servicios</a>
              <a className={styles.link} href="/servicios#tarifas">Tarifas</a>
            </nav>

            <nav className={styles.column} aria-label="Servicios">
              {SERVICES.map((service) => (
                <a key={service.slug} className={styles.link} href={`/servicios/${service.slug}`}>
                  {service.name}
                </a>
              ))}
            </nav>

            <nav className={styles.column} aria-label="Empresa">
              <a className={styles.link} href="/#casos">Opiniones de clientes</a>
              <a className={styles.link} href="/#equipo">Sobre nosotros</a>
              <a className={styles.link} href="/contacto">Contacto</a>
              <a className={styles.link} href="mailto:info@moiraordo.es">info@moiraordo.es</a>
            </nav>

            <nav className={styles.column} aria-label="Legal">
              <a className={styles.link} href="/privacidad">Política de Privacidad</a>
              <a className={styles.link} href="/aviso-legal">Aviso Legal</a>
              <a className={styles.link} href="/cookies">Cookies</a>
              <span>© {new Date().getFullYear()} Moira Ordo</span>
            </nav>
          </div>
        </div>

        <div ref={shadeRef} className={styles.shade} aria-hidden="true" />
      </footer>
    </div>
  )
}
