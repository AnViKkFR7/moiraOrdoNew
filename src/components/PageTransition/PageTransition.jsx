import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { setTransitionHandler } from '../../router'
import { lenisRef } from '../../hooks/useLenis'
import styles from './PageTransition.module.css'

/**
 * Telón entre páginas: sube desde abajo, se cambia la página por
 * detrás y se retira hacia arriba (mismo lenguaje que el fill del Button).
 */
export default function PageTransition() {
  const curtainRef = useRef(null)
  const markRef = useRef(null)

  useEffect(() => {
    const curtain = curtainRef.current
    const mark = markRef.current

    setTransitionHandler((go) => {
      gsap
        .timeline()
        .set(curtain, { visibility: 'visible', transformOrigin: 'bottom', scaleY: 0 })
        .set(mark, { autoAlpha: 0, yPercent: 40 })
        .to(curtain, { scaleY: 1, duration: 0.6, ease: 'expo.inOut' })
        .to(mark, { autoAlpha: 1, yPercent: 0, duration: 0.4, ease: 'power3.out' }, '-=0.15')
        .add(() => {
          go()
          lenisRef.current?.scrollTo(0, { immediate: true, force: true })
          window.scrollTo(0, 0)
        })
        .add(() => ScrollTrigger.refresh(), '+=0.15')
        .to(mark, { autoAlpha: 0, yPercent: -40, duration: 0.3, ease: 'power2.in' })
        .set(curtain, { transformOrigin: 'top' })
        .to(curtain, { scaleY: 0, duration: 0.7, ease: 'expo.inOut' }, '-=0.1')
        .set(curtain, { visibility: 'hidden' })
    })

    return () => setTransitionHandler(null)
  }, [])

  return (
    <div ref={curtainRef} className={styles.curtain} aria-hidden="true">
      <span ref={markRef} className={styles.mark}>
        Moira<span className="accent-blue">Ordo</span>
      </span>
    </div>
  )
}
