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
    return () => {
      document.body.style.overflow = ''
    }
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
        {links.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            className={styles.link}
            style={{ '--i': i }}
            tabIndex={isOpen ? 0 : -1}
            onClick={() => setIsOpen(false)}
          >
            <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
            {link.label}
          </a>
        ))}
      </div>
    </>
  )
}
