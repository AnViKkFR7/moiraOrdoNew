import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import RevealText from '../../components/RevealText/RevealText'
import Reveal from '../../components/Reveal/Reveal'
import Button from '../../components/Button/Button'
import ImageSlot from '../../components/ImageSlot/ImageSlot'
import styles from './Services.module.css'

// TODO: reemplazar `null` por imports de las imágenes reales
const IMAGES = {
  hero: null,
  whatWeDo: null,
  bandLeft: null,
  bandRight: null,
}

const WHAT_WE_DO = [
  {
    title: 'Páginas web a medida',
    text: 'Diseño y desarrollo personalizado que se adapta exactamente a tu visión y objetivos.',
  },
  {
    title: 'Atención personalizada',
    text: 'Acompañamiento continuo desde la primera conversación hasta mucho después del lanzamiento.',
  },
  {
    title: 'Gestión autónoma de contenido',
    text: 'Actualiza textos, imágenes y productos sin depender de nadie. El diseño permanece intacto.',
  },
  {
    title: 'Mantenimiento y soporte',
    text: 'Tu web siempre actualizada, segura y funcionando sin interrupciones.',
  },
  {
    title: 'Escalabilidad real',
    text: 'Tu sitio crece contigo. Añade funcionalidades cuando las necesites, sin rehacer todo.',
  },
]

const STEPS = [
  { title: 'Escuchamos', text: 'Entendemos tu proyecto, tu audiencia y tus objetivos reales.' },
  { title: 'Diseñamos', text: 'Creamos una estructura visual y funcional pensada para durar.' },
  { title: 'Construimos', text: 'Desarrollamos con código limpio y sistemas robustos.' },
  { title: 'Acompañamos', text: 'Te enseñamos a gestionar tu contenido con total autonomía.' },
]

const FEATURES = [
  {
    symbol: '○',
    title: 'Diseño estable',
    text: 'Tu identidad visual permanece consistente. El cliente gestiona contenido sin afectar el diseño.',
  },
  {
    symbol: '△',
    title: 'Contenido dinámico',
    text: 'Actualiza textos, imágenes y productos sin tocar código. El orden se mantiene siempre.',
  },
  {
    symbol: '□',
    title: 'Infraestructura invisible',
    text: 'La tecnología trabaja en segundo plano. Solo percibes la estabilidad.',
  },
  {
    symbol: '◇',
    title: 'Rendimiento optimizado',
    text: 'Carga rápida, experiencia fluida. Tu web funciona como debe funcionar.',
  },
  {
    symbol: '⬡',
    title: 'Responsive por naturaleza',
    text: 'Perfecta en cualquier dispositivo. Desde móviles hasta pantallas grandes.',
  },
  {
    symbol: '⬢',
    title: 'SEO integrado',
    text: 'Construido para ser encontrado. Estructura semántica y optimización desde el día uno.',
  },
]

// TODO: revisar descripciones (las de diseño/desarrollo/software/juegos son provisionales)
const PRICES = [
  {
    name: 'Diseño web',
    text: 'Interfaz a medida pensada para tu marca y tus usuarios.',
    price: '199 €',
  },
  {
    name: 'Desarrollo web',
    text: 'Tu web construida sobre Moira Ordo: estable, rápida y autogestionable.',
    price: '399 €',
  },
  {
    name: 'Diseño de marca',
    text: 'Branding, logo, paleta de colores y tarjetas.',
    price: '199 €',
  },
  {
    name: 'Software a medida',
    text: 'Herramientas y sistemas adaptados a la operativa de tu negocio.',
    price: null,
  },
  {
    name: 'Juegos móviles HTML5',
    text: 'Experiencias jugables para web y móvil con Moira Ordo Games.',
    price: null,
  },
]

export default function Services() {
  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.kicker}>Servicios</span>
            <RevealText as="h1" className={styles.heroTitle}>
              Creamos tu <span className="accent-blue">presencia digital</span>
            </RevealText>
            <p className={styles.heroLead}>
              Páginas web a medida que reflejan la esencia de tu proyecto.
            </p>
            <p className={styles.heroTagline}>
              Sin plantillas. Sin improvisación. Solo soluciones pensadas para ti.
            </p>
          </div>

          <Reveal className={styles.heroMedia}>
            <ImageSlot
              src={IMAGES.hero}
              label="Imagen principal · 16:9"
              className={styles.heroImage}
            />
            <a
              href="#lo-que-hacemos"
              className={styles.scrollButton}
              data-cursor-hover
              aria-label="Ver más"
            >
              ↓
            </a>
          </Reveal>
        </section>

        {/* Lo que hacemos */}
        <section id="lo-que-hacemos" className={styles.whatWeDo}>
          <div className={`container ${styles.whatWeDoGrid}`}>
            <div className={styles.whatWeDoIntro}>
              <span className={styles.kicker}>Lo que hacemos</span>
              <RevealText as="h2" className={styles.headline}>
                Moira Ordo en el <span className="accent-blue">núcleo</span> de cada web
              </RevealText>
              <p className={styles.text}>
                Desarrollamos sitios web profesionales con Moira Ordo en su núcleo. Cada proyecto
                es único, diseñado específicamente para tus necesidades y construido con la
                estabilidad que tu negocio merece.
              </p>
              <Reveal y={30}>
                <ImageSlot
                  src={IMAGES.whatWeDo}
                  label="Imagen de equipo / proceso · 4:5"
                  className={styles.whatWeDoImage}
                />
              </Reveal>
            </div>

            <ul className={styles.serviceList}>
              {WHAT_WE_DO.map((item, i) => (
                <Reveal as="li" key={item.title} y={24} delay={i * 0.05} className={styles.serviceItem}>
                  <span className={styles.serviceIndex}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className={styles.serviceTitle}>{item.title}</h3>
                    <p className={styles.serviceText}>{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Nuestro enfoque */}
        <section className={styles.approach}>
          <div className="container">
            <span className={styles.kicker}>Nuestro enfoque</span>
            <RevealText as="h2" className={styles.headline}>
              Cuatro pasos, <span className="accent-blue">ninguna improvisación</span>
            </RevealText>

            <ol className={styles.steps}>
              {STEPS.map((step, i) => (
                <Reveal as="li" key={step.title} y={30} delay={i * 0.1} className={styles.step}>
                  <span className={styles.stepNumber}>{String(i + 1).padStart(2, '0')}</span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepText}>{step.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Banda de imágenes */}
        <section className={styles.band}>
          <div className={`container ${styles.bandGrid}`}>
            <Reveal y={30}>
              <ImageSlot src={IMAGES.bandLeft} label="Imagen de proyecto · 4:3" className={styles.bandLeft} />
            </Reveal>
            <Reveal y={30} delay={0.1}>
              <ImageSlot src={IMAGES.bandRight} label="Imagen de detalle · 3:4" className={styles.bandRight} />
            </Reveal>
          </div>
        </section>

        {/* Características */}
        <section className={styles.features}>
          <div className="container">
            <div className={styles.featuresHead}>
              <span className={styles.kicker}>Características que importan</span>
              <RevealText as="h2" className={styles.headline}>
                Tecnología invisible. <span className="accent-blue">Resultados visibles.</span>
              </RevealText>
            </div>

            <div className={styles.featureGrid}>
              {FEATURES.map((feature, i) => (
                <Reveal key={feature.title} y={30} delay={(i % 3) * 0.1} className={styles.feature}>
                  <span className={styles.featureIcon} aria-hidden="true">
                    {feature.symbol}
                  </span>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureText}>{feature.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Tarifas */}
        <section className={styles.pricing}>
          <div className="container">
            <div className={styles.pricingHead}>
              <div>
                <span className={styles.kicker}>Tarifas</span>
                <RevealText as="h2" className={styles.headline}>
                  Servicios y <span className="accent-blue">precios</span>
                </RevealText>
              </div>
              <p className={styles.text}>
                Precios de partida orientativos. Cada proyecto se presupuesta a medida después de
                una primera conversación.
              </p>
            </div>

            <ul className={styles.priceList}>
              {PRICES.map((item, i) => (
                <Reveal as="li" key={item.name} y={20} delay={i * 0.05}>
                  <a href="#contacto" className={styles.priceRow} data-cursor-hover>
                    <span className={styles.priceFill} aria-hidden="true" />
                    <span className={styles.priceName}>{item.name}</span>
                    <span className={styles.priceText}>{item.text}</span>
                    <span className={styles.priceValue}>
                      {item.price ? (
                        <>
                          <small>desde</small>
                          {item.price}
                        </>
                      ) : (
                        <small className={styles.priceAsk}>Preguntar + info</small>
                      )}
                    </span>
                    <span className={styles.priceArrow} aria-hidden="true">
                      ↗
                    </span>
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section id="contacto" className={styles.cta}>
          <div className="container">
            <RevealText as="h2" className={styles.ctaTitle}>
              ¿Empezamos tu <span className="accent-blue">proyecto</span>?
            </RevealText>
            <p className={styles.ctaText}>
              Cuéntanos qué necesitas y te respondemos con una propuesta pensada para ti.
            </p>
            {/* TODO: poner el email/formulario de contacto real */}
            <Button as="a" href="#" variant="filled">
              Contactar
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
