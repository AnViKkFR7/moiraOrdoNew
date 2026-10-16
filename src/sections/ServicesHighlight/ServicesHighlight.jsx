import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './ServicesHighlight.module.css'
import RevealText from '../../components/RevealText/RevealText'
import Button from '../../components/Button/Button'
import LiveSitesShowcase from '../LiveSitesShowcase/LiveSitesShowcase'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function ServicesHighlight() {
  const iconRef = useScrollReveal({ y: 20 })
  const diamondRef = useRef(null)
  const orbitRef = useRef(null)

  // El rombo gira como una moneda y un punto orbita el círculo; al pasar el
  // mouse ambos aceleran suavemente (timeScale) en vez de saltar.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const spin = gsap.to(diamondRef.current, {
      rotationY: 360,
      duration: 6,
      ease: 'none',
      repeat: -1,
    })
    const orbit = gsap.to(orbitRef.current, { rotation: 360, duration: 12, ease: 'none', repeat: -1 })

    const circle = iconRef.current
    const speedTo = (value) => () =>
      gsap.to([spin, orbit], { timeScale: value, duration: 0.8, ease: 'power2.out', overwrite: true })
    const onEnter = speedTo(3)
    const onLeave = speedTo(1)
    circle.addEventListener('mouseenter', onEnter)
    circle.addEventListener('mouseleave', onLeave)

    return () => {
      circle.removeEventListener('mouseenter', onEnter)
      circle.removeEventListener('mouseleave', onLeave)
      spin.kill()
      orbit.kill()
    }
  }, [iconRef])

  return (
    <section className={styles.section}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.left}>
          <span className={styles.kicker}>Nuestros Servicios</span>
          <RevealText as="h2" className={styles.headline}>
            Para empresas
            <br />
            <span className={styles.plus}>+</span>{' '}
            <span className="accent-blue-light">Moira Ordo Games</span>
          </RevealText>

          <p className={styles.text}>
            Cada proyecto empieza con un diagnóstico real de tu negocio. A partir de ahí,
            diseñamos y desarrollamos un sistema a medida — no una plantilla — pensado para
            crecer contigo.
          </p>
        </div>

        <div className={styles.right}>
          <div ref={iconRef} className={styles.iconCircle}>
            <span ref={orbitRef} className={styles.orbit} aria-hidden="true" />
            <span ref={diamondRef} className={styles.diamond}>
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M24 4 L42 24 L24 44 L6 24 Z"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path d="M24 4 V44" strokeWidth="1.6" />
              </svg>
            </span>
          </div>

          <Button as="a" href="/servicios" className={styles.cta}>
            Descubre Nuestros Servicios
          </Button>
        </div>
      </div>

      <div className={`container ${styles.showcase}`}>
        <LiveSitesShowcase />
      </div>
    </section>
  )
}
