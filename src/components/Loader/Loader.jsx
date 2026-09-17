import { useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import styles from './Loader.module.css'
import preloaderAnimation from '../../assets/lottie/preloader.json'

/**
 * Preloader a pantalla completa. Se oculta con fade-out cuando termina
 * de reproducir la animación (o al llegar al tiempo mínimo configurado).
 * TODO: reemplazar por contenido real — swap del lottie por el del
 * proyecto y ajustar el tiempo mínimo de exposición si hace falta.
 */
export default function Loader({ onFinish }) {
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isHidden ? '' : 'hidden'
  }, [isHidden])

  const handleComplete = () => {
    setIsHidden(true)
    onFinish?.()
  }

  useEffect(() => {
    // Red de seguridad: si el evento onComplete de Lottie no dispara
    // (p. ej. la pestaña estuvo en background y el rAF se pausó), el
    // loader no debe bloquear la página para siempre.
    const timeout = setTimeout(handleComplete, 4000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className={`${styles.loader} ${isHidden ? styles.isHidden : ''}`} aria-hidden={isHidden}>
      <Lottie
        className={styles.animation}
        animationData={preloaderAnimation}
        loop={false}
        onComplete={handleComplete}
      />
    </div>
  )
}
