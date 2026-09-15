import { useRef, useState } from 'react'
import styles from './MenuProject.module.css'

/**
 * Nav de proyectos con preview de imagen que sigue el mouse al hacer
 * hover sobre cada link. `items` = [{ label, href, image }]
 * TODO: reemplazar por contenido real (links e imágenes del proyecto).
 */
export default function MenuProject({ items }) {
  const [active, setActive] = useState(null)
  const previewRef = useRef(null)

  const handleMove = (e) => {
    if (!previewRef.current) return
    previewRef.current.style.left = `${e.clientX}px`
    previewRef.current.style.top = `${e.clientY}px`
  }

  return (
    <nav className={styles.nav} onMouseMove={handleMove}>
      {items.map((item, i) => (
        <a
          key={item.label}
          href={item.href}
          className={styles.item}
          data-cursor-hover
          onMouseEnter={() => setActive(i)}
          onMouseLeave={() => setActive(null)}
        >
          {item.label}
        </a>
      ))}

      <div
        ref={previewRef}
        className={`${styles.preview} ${active !== null ? styles.isVisible : ''}`}
      >
        {active !== null && <img src={items[active].image} alt="" />}
      </div>
    </nav>
  )
}
