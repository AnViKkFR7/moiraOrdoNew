import { useEffect, useState } from 'react'
import Loader from './components/Loader/Loader'
import PageTransition from './components/PageTransition/PageTransition'
import { findRoute } from './routes'
import { applyHead, buildHead } from './seo/head'
import { lenisRef, useLenis } from './hooks/useLenis'
import { useViewportUnits } from './hooks/useViewportUnits'
import { notifyPageVisible, useLinkInterception, usePathname } from './router'

/* global __SITE_INDEXABLE__ */

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const pathname = usePathname()
  const route = findRoute(pathname)
  const { Component: Page, props } = route

  useLenis()
  useViewportUnits()
  useLinkInterception()

  // Al navegar en el cliente se reescriben título, metas y datos estructurados
  useEffect(() => {
    applyHead(buildHead(route, { indexable: __SITE_INDEXABLE__ }))
  }, [route])

  useEffect(() => {
    document.body.classList.toggle('is-loaded', isLoaded)
    // Al salir del loader la página siempre empieza desde arriba
    if (isLoaded) {
      lenisRef.current?.scrollTo(0, { immediate: true, force: true })
      window.scrollTo(0, 0)
      notifyPageVisible()
    }
  }, [isLoaded])

  return (
    <>
      <Loader onFinish={() => setIsLoaded(true)} />
      <PageTransition />
      <Page key={pathname} {...props} />
    </>
  )
}
