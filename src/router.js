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

/*
 * "Página visible": las animaciones de entrada de una página esperan a que
 * el loader termine y el telón de transición se levante, para no correr
 * escondidas detrás.
 */
let isTransitioning = false
let visibleWaiters = []

const isPageVisible = () => !isTransitioning && document.body.classList.contains('is-loaded')

function flushVisibleWaiters() {
  if (!isPageVisible()) return
  const waiters = visibleWaiters
  visibleWaiters = []
  waiters.forEach((waiter) => waiter())
}

export function setTransitioning(value) {
  isTransitioning = value
  flushVisibleWaiters()
}

/** Avisar cuando cambia algo que afecta la visibilidad (p. ej. fin del loader). */
export function notifyPageVisible() {
  flushVisibleWaiters()
}

/** Ejecuta `cb` cuando la página está a la vista. Devuelve una función para cancelar. */
export function whenPageVisible(cb) {
  if (isPageVisible()) {
    cb()
    return () => {}
  }
  visibleWaiters.push(cb)
  return () => {
    visibleWaiters = visibleWaiters.filter((waiter) => waiter !== cb)
  }
}

/** Lleva a una sección por id (ej. "equipo"), compensando el header fijo. */
const HEADER_OFFSET = 80
const MAX_SCROLL_ATTEMPTS = 4

export function scrollToHash(hash, { immediate = false } = {}) {
  const el = hash && document.getElementById(hash)
  if (!el) return

  const lenis = lenisRef.current
  if (!lenis) {
    el.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth' })
    return
  }

  // La posición se calcula al empezar el scroll; si mientras tanto cambia el alto de la
  // página (imágenes diferidas, animaciones de entrada), se aterriza fuera de sitio.
  // Al terminar se comprueba y se corrige, para que llegue a la sección a la primera.
  const scroll = (attempt, instant) => {
    lenis.scrollTo(el, { offset: -HEADER_OFFSET, immediate: instant, force: true })
    const startedAt = Date.now()
    const settle = () => {
      if (lenis.isScrolling && Date.now() - startedAt < 4000) return window.setTimeout(settle, 120)
      const off = el.getBoundingClientRect().top - HEADER_OFFSET
      if (Math.abs(off) > 6 && attempt < MAX_SCROLL_ATTEMPTS) scroll(attempt + 1, true)
    }
    window.setTimeout(settle, instant ? 150 : 400)
  }
  scroll(1, immediate)
}

/** `to` admite query y hash: "/servicios", "/#equipo", "/contacto?servicio=diseno-web". */
export function navigate(to) {
  const [pathAndQuery, hash] = to.split('#')
  const [pathname, query = ''] = pathAndQuery.split('?')
  const targetPath = pathname || '/'
  const sameQuery = (query ? `?${query}` : '') === window.location.search

  // Misma página: scroll suave a la sección, o de vuelta arriba si no hay hash
  if (targetPath === window.location.pathname && sameQuery) {
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

// Ruta que se está pregenerando en el build (en el servidor no hay window)
let serverPathname = '/'
export function setServerPathname(path) {
  serverPathname = path
}

export function usePathname() {
  const [pathname, setPathname] = useState(() =>
    typeof window === 'undefined' ? serverPathname : window.location.pathname
  )

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
