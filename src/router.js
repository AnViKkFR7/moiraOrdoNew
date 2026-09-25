import { useEffect, useState } from 'react'

/**
 * Router mínimo basado en History API (sin dependencias). Los <a> con
 * href interno ("/servicios") se interceptan de forma global, así los
 * componentes pueden seguir usando links normales.
 */
const listeners = new Set()
let transitionHandler = null

/** PageTransition registra acá la animación que envuelve cada cambio. */
export function setTransitionHandler(fn) {
  transitionHandler = fn
}

export function navigate(to) {
  if (to === window.location.pathname) return
  const go = () => {
    window.history.pushState({}, '', to)
    listeners.forEach((listener) => listener(to))
  }
  if (transitionHandler) transitionHandler(go)
  else go()
}

export function usePathname() {
  const [pathname, setPathname] = useState(window.location.pathname)

  useEffect(() => {
    const onPop = () => setPathname(window.location.pathname)
    listeners.add(setPathname)
    window.addEventListener('popstate', onPop)
    return () => {
      listeners.delete(setPathname)
      window.removeEventListener('popstate', onPop)
    }
  }, [])

  return pathname
}

export function useLinkInterception() {
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return
      }
      const link = e.target.closest('a[href]')
      if (!link || (link.target && link.target !== '_self')) return
      const href = link.getAttribute('href')
      if (!href.startsWith('/') || href.startsWith('//')) return
      e.preventDefault()
      navigate(href)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
}
