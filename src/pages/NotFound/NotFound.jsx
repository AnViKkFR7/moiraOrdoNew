import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Button from '../../components/Button/Button'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <>
      <Header />

      <main className={styles.page}>
        <div className={`container ${styles.inner}`}>
          <span className={styles.code} aria-hidden="true">404</span>
          <h1 className={styles.title}>
            Esta página <span className="accent-blue">no existe</span>
          </h1>
          <p className={styles.text}>
            Puede que el enlace esté mal escrito o que la página se haya movido. Te dejamos por
            dónde seguir:
          </p>
          <div className={styles.actions}>
            <Button as="a" href="/" variant="filled">
              Volver al inicio
            </Button>
            <Button as="a" href="/contacto">
              Contactar
            </Button>
          </div>
          <nav className={styles.links} aria-label="Páginas principales">
            <a href="/proyectos">Proyectos</a>
            <a href="/servicios">Servicios</a>
            <a href="/crm">CRM</a>
          </nav>
        </div>
      </main>

      <Footer />
    </>
  )
}
