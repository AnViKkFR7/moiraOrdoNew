import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { easeReveal } from '../utils/easing'

gsap.registerPlugin(ScrollTrigger)

/**
 * Reveal genérico (translateY + opacity) para imágenes/bloques al
 * entrar en el viewport durante el scroll.
 */
export function useScrollReveal({ y = 40, duration = 0.8, start = 'top 85%', delay = 0 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    gsap.set(el, { y, opacity: 0 })

    const tween = gsap.to(el, {
      y: 0,
      opacity: 1,
      duration,
      delay,
      ease: easeReveal,
      scrollTrigger: {
        trigger: el,
        start,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [y, duration, start, delay])

  return ref
}
