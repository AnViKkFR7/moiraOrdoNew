import { useEffect, useState } from 'react'
import Loader from './components/Loader/Loader'
import CustomCursor from './components/CustomCursor/CustomCursor'
import Home from './pages/Home'
import { useLenis } from './hooks/useLenis'
import { useViewportUnits } from './hooks/useViewportUnits'

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  useLenis()
  useViewportUnits()

  useEffect(() => {
    document.body.classList.toggle('is-loaded', isLoaded)
  }, [isLoaded])

  return (
    <>
      <Loader onFinish={() => setIsLoaded(true)} />
      <CustomCursor />
      <Home />
    </>
  )
}
