import { useEffect, useState } from 'react'
import { lenisRef } from './hooks/useLenis'

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

/** Lleva a una sección por id (ej. "equipo"), compensando el header fijo. */
export function scrollToHash(hash, { immediate = false } = {}) {
  const el = hash && document.getElementById(hash)
  if (!el) return
  if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: -80, immediate, force: true })
  else el.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth' })
}

/** `to` admite hash: "/servicios", "/#equipo". */
export function navigate(to) {
  const [pathname, hash] = to.split('#')
  const targetPath = pathname || '/'

  // Misma página: scroll suave a la sección, o de vuelta arriba si no hay hash
  if (targetPath === window.location.pathname) {
    if (window.location.hash !== (hash ? `#${hash}` : '')) {
      window.history.pushState({}, '', to)
    }
    if (hash) scrollToHash(hash)
    else if (lenisRef.current) lenisRef.current.scrollTo(0, { force: true })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  const go = () => {
    window.history.pushState({}, '', to)
    listeners.forEach((listener) => listener(targetPath))
  }
  if (transitionHandler) transitionHandler(go, hash)
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
