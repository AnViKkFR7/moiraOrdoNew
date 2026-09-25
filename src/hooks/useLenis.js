import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Instancia compartida (p. ej. para volver arriba al cambiar de página)
export const lenisRef = { current: null }

/**
 * Inicializa Lenis y lo sincroniza con el ticker de GSAP para que
 * ScrollTrigger reaccione al smooth scroll en vez del scroll nativo.
 */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(raf)
      lenisRef.current = null
    }
  }, [])
}
