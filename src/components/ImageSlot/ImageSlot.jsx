import styles from './ImageSlot.module.css'

/**
 * Hueco para imagen. Sin `src` muestra un placeholder con `label` para
 * saber qué va ahí; con `src` renderiza la imagen a sangre (object-fit).
 * El tamaño/aspect-ratio lo define el contenedor vía `className`.
 */
export default function ImageSlot({ src, alt = '', label = 'Imagen', className = '' }) {
  return (
    <div className={`${styles.slot} ${className}`}>
      {src ? (
        <img src={src} alt={alt} loading="lazy" />
      ) : (
        <div className={styles.placeholder}>
          <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <path d="M24 4 L42 24 L24 44 L6 24 Z" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
          <span>{label}</span>
        </div>
      )}
    </div>
  )
}
