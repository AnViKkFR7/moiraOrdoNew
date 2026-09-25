import { useEffect, useState } from 'react'
import Loader from './components/Loader/Loader'
import PageTransition from './components/PageTransition/PageTransition'
import Home from './pages/Home'
import Services from './pages/Services/Services'
import { lenisRef, useLenis } from './hooks/useLenis'
import { useViewportUnits } from './hooks/useViewportUnits'
import { useLinkInterception, usePathname } from './router'

const ROUTES = {
  '/': Home,
  '/servicios': Services,
}

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const pathname = usePathname()
  const Page = ROUTES[pathname.replace(/\/+$/, '') || '/'] ?? Home

  useLenis()
  useViewportUnits()
  useLinkInterception()

  useEffect(() => {
    document.body.classList.toggle('is-loaded', isLoaded)
    // Al salir del loader la página siempre empieza desde arriba
    if (isLoaded) {
      lenisRef.current?.scrollTo(0, { immediate: true, force: true })
      window.scrollTo(0, 0)
    }
  }, [isLoaded])

  return (
    <>
      <Loader onFinish={() => setIsLoaded(true)} />
      <PageTransition />
      <Page key={pathname} />
    </>
  )
}
