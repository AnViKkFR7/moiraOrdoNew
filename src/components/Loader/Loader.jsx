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
