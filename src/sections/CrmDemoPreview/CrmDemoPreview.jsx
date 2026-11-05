import Button from '../../components/Button/Button'
import RevealText from '../../components/RevealText/RevealText'
import AdminPanelDemo from '../../components/AdminPanelDemo/AdminPanelDemo'
import styles from './CrmDemoPreview.module.css'

export default function CrmDemoPreview() {
  return (
    <section id="demo-crm" className={styles.section} aria-labelledby="crm-demo-title">
      <div className={`container ${styles.container}`}>
        <div className={styles.intro}>
          <span className={styles.kicker}>Pruébalo ahora</span>
          <RevealText as="h2" id="crm-demo-title" className={styles.title}>
            Un CRM se entiende <span>trasteándolo.</span>
          </RevealText>
          <p className={styles.description}>
            Cambia de empresa, explora el catálogo, revisa contactos y abre un presupuesto. Puedes
            recorrer el panel sin registrarte.
          </p>
        </div>

        <p className={styles.demoNote}>
          Demo interactiva · datos ficticios · no se guarda ni se envía nada
        </p>

        <div className={styles.demoFrame}>
          <AdminPanelDemo />
        </div>

        <div className={styles.footer}>
          <p>¿Quieres ver qué incluye cada módulo y cómo lo adaptamos a cada negocio?</p>
          <Button as="a" href="/crm" variant="filled">
            Conocer el CRM
          </Button>
        </div>
      </div>
    </section>
  )
}
