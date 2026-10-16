import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import RevealText from '../../components/RevealText/RevealText'
import Reveal from '../../components/Reveal/Reveal'
import Button from '../../components/Button/Button'
import ImageSlot from '../../components/ImageSlot/ImageSlot'
import AdminPanelDemo from '../../components/AdminPanelDemo/AdminPanelDemo'
import { useParallax } from '../../hooks/useParallax'
import heroImage from '../../assets/images/10d22448-d0fc-427c-8eaa-681c5b797ab8.png'
import whatIsImage from '../../assets/images/mackbook.admin.moiraordo.es.png'
import macbookImage from '../../assets/images/Macbook-Air-admin.moiraordo.es.png'
import styles from './Crm.module.css'

const CONCEPTS = [
  {
    title: 'Un panel, todas tus empresas',
    text: 'Gestiona varias empresas o clientes desde la misma cuenta, sin mezclar nunca su información.',
  },
  {
    title: 'Empresa activa',
    text: 'Eliges con qué empresa trabajar y todo el panel — contenido, usuarios, analítica y agenda — se filtra automáticamente por ella.',
  },
  {
    title: 'Roles por empresa',
    text: 'Cada persona puede tener un rol distinto en cada empresa: lo que puede ver y hacer se ajusta según el caso.',
  },
  {
    title: 'Todo en un solo lugar',
    text: 'Contenido, usuarios, blog, analítica y agenda conviven en una misma interfaz, sin saltar entre herramientas.',
  },
]

const MODULES = [
  {
    symbol: '◇',
    title: 'Dashboard',
    text: 'Punto de partida: elige la empresa activa y accede a un resumen de su actividad.',
  },
  {
    symbol: '○',
    title: 'Items',
    text: 'Administra el contenido propio de cada empresa — inmuebles, productos o cualquier elemento genérico — con filtros, búsqueda y vistas de lista o cuadrícula.',
  },
  {
    symbol: '△',
    title: 'Atributos',
    text: 'Define los tipos de ítem de cada empresa y las propiedades que los describen, totalmente configurables.',
  },
  {
    symbol: '□',
    title: 'Empresas',
    text: 'Ficha de cada cliente: datos de contacto, estado del sitio web y un vistazo a sus items publicados.',
  },
  {
    symbol: '⬡',
    title: 'Usuarios',
    text: 'Miembros de cada empresa, su rol y su actividad: cuánto contenido han creado.',
  },
  {
    symbol: '⬢',
    title: 'Blog',
    text: 'Artículos propios de cada empresa, con el mismo flujo de creación, edición y publicación que los items.',
  },
  {
    symbol: '◈',
    title: 'Analítica',
    text: 'Tráfico y clics de cada web sin usar cookies: visitantes, páginas vistas y eventos por periodo.',
  },
  {
    symbol: '▣',
    title: 'Planning',
    text: 'Calendario por día, semana o mes con tareas y facturación asociadas a cada empresa.',
  },
]

const ROLES = [
  {
    key: 'admin',
    badge: 'Admin',
    title: 'Control total',
    text: 'Acceso completo a su empresa: contenido, usuarios, atributos, blog y agenda.',
  },
  {
    key: 'editor',
    badge: 'Editor',
    isEditor: true,
    title: 'Crea y publica',
    text: 'Puede crear y editar items y artículos del blog, sin tocar la configuración de la empresa.',
  },
  {
    key: 'viewer',
    badge: 'Viewer',
    isViewer: true,
    title: 'Solo lectura',
    text: 'Consulta el contenido y la analítica de la empresa, sin poder modificarlos.',
  },
]

function ParallaxImage({ src, alt, label, className, distance = 50 }) {
  const ref = useParallax({ distance })

  return (
    <div className={`${styles.parallaxBox} ${className}`}>
      <div ref={ref} className={styles.parallaxMover}>
        <ImageSlot src={src} alt={alt} label={label} className={styles.parallaxSlot} />
      </div>
    </div>
  )
}

export default function Crm() {
  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.kicker}>CRM</span>
            <RevealText as="h1" className={styles.heroTitle}>
              El panel que <span className="accent-blue">ordena</span> cada empresa
            </RevealText>
            <p className={styles.heroLead}>
              Un panel de administración multiempresa pensado para gestionar contenido, usuarios,
              analítica y agenda desde un único lugar.
            </p>
            <p className={styles.heroTagline}>
              Una empresa activa. Todo filtrado por ella. Sin cambiar de herramienta.
            </p>
          </div>

          <Reveal className={styles.heroMedia}>
            <ImageSlot
              src={heroImage}
              alt="Panel de administración mostrado en un monitor y un portátil sobre un escritorio"
              label="Captura del panel · 16:9"
              className={styles.heroImage}
            />
            <a
              href="#que-es"
              className={styles.scrollButton}
              data-cursor-hover
              aria-label="Ver más"
            >
              ↓
            </a>
          </Reveal>
        </section>

        {/* Qué es */}
        <section id="que-es" className={styles.whatIs}>
          <div className={`container ${styles.whatIsGrid}`}>
            <div className={styles.whatIsIntro}>
              <span className={styles.kicker}>Qué es</span>
              <RevealText as="h2" className={styles.headline}>
                Un panel <span className="accent-blue">privado</span> por empresa
              </RevealText>
              <p className={styles.text}>
                El CRM es el panel privado donde se gestiona cada empresa o cliente dado de alta en
                tu cuenta. Antes de trabajar eliges una empresa activa, y a partir de ahí todo lo que
                ves y editas pertenece solo a ella.
              </p>
              <Reveal y={30}>
                <ImageSlot
                  src={whatIsImage}
                  alt="Listado de items del panel de administración visto en un MacBook Air"
                  label="Selector de empresa activa"
                  className={styles.whatIsImage}
                />
              </Reveal>
            </div>

            <ul className={styles.conceptList}>
              {CONCEPTS.map((item, i) => (
                <Reveal as="li" key={item.title} y={24} delay={i * 0.05} className={styles.conceptItem}>
                  <span className={styles.conceptIndex}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className={styles.conceptTitle}>{item.title}</h3>
                    <p className={styles.conceptText}>{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Vista previa del panel */}
        <section className={styles.preview}>
          <div className="container">
            <div className={styles.previewHead}>
              <span className={styles.kicker}>Cómo es</span>
              <RevealText as="h2" className={styles.headline}>
                La estructura del <span className="accent-blue">panel</span>
              </RevealText>
              <p className={styles.text}>
                Pruébalo tú mismo: navega por el menú, cambia de empresa, filtra items, abre su
                ficha o mira la analítica. Es una demo con datos de ejemplo; nada se guarda.
              </p>
            </div>

            <Reveal y={40} className={styles.demoWrap}>
              <AdminPanelDemo />
            </Reveal>
          </div>
        </section>

        {/* Banda de imágenes */}
        <section className={styles.band}>
          <div className={`container ${styles.bandGrid}`}>
            <ParallaxImage
              src={macbookImage}
              alt="Analítica del panel de administración en un MacBook Air"
              label="Analítica · 16:9"
              className={styles.bandSingle}
              distance={40}
            />
          </div>
        </section>

        {/* Módulos */}
        <section className={styles.features}>
          <div className="container">
            <div className={styles.featuresHead}>
              <span className={styles.kicker}>Módulos</span>
              <RevealText as="h2" className={styles.headline}>
                Todo lo que necesita <span className="accent-blue">cada empresa</span>
              </RevealText>
            </div>

            <div className={styles.featureGrid}>
              {MODULES.map((module, i) => (
                <Reveal key={module.title} y={30} delay={(i % 4) * 0.08} className={styles.feature}>
                  <span className={styles.featureIcon} aria-hidden="true">
                    {module.symbol}
                  </span>
                  <h3 className={styles.featureTitle}>{module.title}</h3>
                  <p className={styles.featureText}>{module.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Roles y permisos */}
        <section className={styles.roles}>
          <div className="container">
            <span className={styles.kicker}>Roles y permisos</span>
            <RevealText as="h2" className={styles.headline}>
              Cada persona, <span className="accent-blue">su acceso</span>
            </RevealText>

            <ul className={styles.rolesList}>
              {ROLES.map((role, i) => (
                <Reveal
                  as="li"
                  key={role.key}
                  y={30}
                  delay={i * 0.1}
                  className={`${styles.role} ${role.isEditor ? styles.isEditor : ''} ${
                    role.isViewer ? styles.isViewer : ''
                  }`}
                >
                  <span className={styles.roleBadge}>{role.badge}</span>
                  <h3 className={styles.roleTitle}>{role.title}</h3>
                  <p className={styles.roleText}>{role.text}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.cta}>
          <div className="container">
            <RevealText as="h2" className={styles.ctaTitle}>
              ¿Lo implementamos en <span className="accent-blue">tu negocio</span>?
            </RevealText>
            <p className={styles.ctaText}>
              Cuéntanos cómo trabajas y te mostramos cómo encajaría este panel en tu operativa.
            </p>
            <Button as="a" href="/contacto" variant="filled">
              Contactar
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
