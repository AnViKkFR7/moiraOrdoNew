import styles from './MenuProject.module.css'

/**
 * Nav de proyectos. `items` = [{ label, href }]
 * TODO: reemplazar por contenido real (links del proyecto).
 */
export default function MenuProject({ items }) {
  return (
    <nav className={styles.nav}>
      {items.map((item) => (
        <a key={item.label} href={item.href} className={styles.item} data-cursor-hover>
          {item.label}
        </a>
      ))}
    </nav>
  )
}
