import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Desplaza el elemento a distinta velocidad que el scroll (parallax),
 * atado al progreso real vía `scrub` para que el movimiento sea fluido
 * y reversible en ambas direcciones.
 */
export function useParallax({ distance = 60 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    gsap.set(el, { y: -distance })

    const tween = gsap.to(el, {
      y: distance,
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement ?? el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [distance])

  return ref
}
