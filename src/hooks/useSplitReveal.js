import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { easeReveal } from '../utils/easing'

gsap.registerPlugin(ScrollTrigger)

/**
 * Reveal de texto palabra por palabra al entrar en viewport.
 * Usa SplitType (gratis) en vez de GSAP SplitText (plugin de pago).
 * Si tenés licencia de Club GreenSock, reemplazá SplitType por
 * `import { SplitText } from 'gsap/SplitText'` manteniendo la misma API.
 *
 * @param {object} [options]
 * @param {string} [options.type] - 'lines' | 'words' | 'chars'
 * @param {number} [options.stagger]
 * @param {string} [options.start] - punto de trigger para ScrollTrigger
 */
export function useSplitReveal({ type = 'words', stagger = 0.04, start = 'top 85%' } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const split = new SplitType(el, { types: type })
    const targets = type === 'lines' ? split.lines : type === 'chars' ? split.chars : split.words

    gsap.set(targets, { yPercent: 100, opacity: 0 })

    const tween = gsap.to(targets, {
      yPercent: 0,
      opacity: 1,
      duration: 0.7,
      ease: easeReveal,
      stagger,
      scrollTrigger: {
        trigger: el,
        start,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
      split.revert()
    }
  }, [type, stagger, start])

  return ref
}
