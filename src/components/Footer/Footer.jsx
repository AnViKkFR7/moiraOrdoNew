import styles from './Footer.module.css'

/**
 * TODO: reemplazar por contenido real (links, contacto y redes).
 */
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <h2 className={styles.heading}>
          Moira <span className="accent-blue">Ordo</span>
          <br />
          El sistema que decide cómo fluye el contenido.
        </h2>

        <div className={styles.columns}>
          <div className={styles.column}>
            <span className={styles.columnTitle}>Producto</span>
            <a className={styles.link} href="#">
              Características
            </a>
            <a className={styles.link} href="#">
              Documentación
            </a>
          </div>

          <div className={styles.column}>
            <span className={styles.columnTitle}>Compañía</span>
            <a className={styles.link} href="#">
              Sobre nosotros
            </a>
            <a className={styles.link} href="#">
              Contacto
            </a>
          </div>

          <div className={styles.column}>
            <span className={styles.columnTitle}>Legal</span>
            <a className={styles.link} href="#">
              Política de Privacidad
            </a>
            <a className={styles.link} href="#">
              Aviso Legal
            </a>
            <a className={styles.link} href="#">
              Cookies
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Moira Ordo. Todos los derechos reservados.</span>
        <div className={styles.social}>
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
