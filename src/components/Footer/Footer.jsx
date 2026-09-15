import styles from './Footer.module.css'

/**
 * TODO: reemplazar por contenido real (nav secundaria, contacto, redes).
 */
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <h2 className={styles.heading}>
          Hablemos de tu <span className="accent-blue">próximo proyecto</span>
        </h2>

        <div className={styles.column}>
          <span className={styles.columnTitle}>Contacto</span>
          <a className={styles.link} href="mailto:hola@ejemplo.com">
            hola@ejemplo.com
          </a>
          <a className={styles.link} href="tel:+000000000">
            +00 000 000 000
          </a>
        </div>

        <div className={styles.column}>
          <span className={styles.columnTitle}>Navegación</span>
          <a className={styles.link} href="#">
            Proyectos
          </a>
          <a className={styles.link} href="#">
            Servicios
          </a>
          <a className={styles.link} href="#">
            Equipo
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} [Nombre del proyecto]</span>
        <div className={styles.column} style={{ flexDirection: 'row', gap: '1.6rem' }}>
          <a className={styles.link} href="#">
            Instagram
          </a>
          <a className={styles.link} href="#">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
