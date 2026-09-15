import { useEffect, useState } from 'react'
import styles from './NavigationMobile.module.css'

/**
 * Menu mobile a pantalla completa con efecto "cortina" (clip-path).
 * TODO: reemplazar por contenido real (links del nav).
 */
export default function NavigationMobile({ links }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  }, [isOpen])

  return (
    <>
      <button
        className={`${styles.trigger} ${isOpen ? styles.isOpen : ''}`}
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-label="Abrir menú"
      >
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </button>

      <div className={`${styles.panel} ${isOpen ? styles.isOpen : ''}`}>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={styles.link}
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  )
}
