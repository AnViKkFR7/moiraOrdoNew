import { useEffect } from 'react'

/**
 * Recalcula --vw / --vh en cada resize para tener unidades de viewport
 * estables (evita el salto de 100vh en mobile cuando aparece/desaparece
 * la barra de navegación del browser).
 */
export function useViewportUnits() {
  useEffect(() => {
    const setUnits = () => {
      const vw = window.innerWidth / 100
      const vh = window.innerHeight / 100
      document.documentElement.style.setProperty('--vw', `${vw}px`)
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    setUnits()
    window.addEventListener('resize', setUnits)
    return () => window.removeEventListener('resize', setUnits)
  }, [])
}
