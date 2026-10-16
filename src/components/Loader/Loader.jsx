import { useEffect, useState } from 'react'
import styles from './Loader.module.css'

/**
 * Preloader a pantalla completa. Se oculta con fade-out cuando termina
 * de reproducir la animación (o al llegar al tiempo mínimo configurado).
 * Lottie y su animación se cargan después de hidratar: no existen en el
 * servidor y así no pesan en el bundle inicial.
 */
export default function Loader({ onFinish }) {
  const [isHidden, setIsHidden] = useState(false)
  const [lottie, setLottie] = useState(null)

  useEffect(() => {
    let active = true
    Promise.all([import('lottie-react'), import('../../assets/lottie/preloader.json')]).then(
      ([lottieModule, animation]) => {
        if (active) setLottie({ Lottie: lottieModule.default, data: animation.default })
      },
    )
    return () => {
      active = false
    }
  }, [])

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
    <div className={`${styles.loader} ${isHidden ? styles.isHidden : ''}`} aria-hidden="true" data-loader>
      {lottie ? (
        <lottie.Lottie
          className={styles.animation}
          animationData={lottie.data}
          loop={false}
          onComplete={handleComplete}
        />
      ) : (
        <div className={styles.animation} />
      )}
    </div>
  )
}
