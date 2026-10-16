import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import RevealText from '../../components/RevealText/RevealText'
import Button from '../../components/Button/Button'
import GridProjects from '../../components/GridProjects/GridProjects'
import arqueliaImage from '../../assets/images/arquelia.png'
import regiamareImage from '../../assets/images/regiamare.jpg'
import vemaroImage from '../../assets/images/projects/vemaro-transfers.jpg'
import navagliImage from '../../assets/images/projects/navagli.jpg'
import musibingoImage from '../../assets/images/projects/musibingo.jpg'
import matchriseImage from '../../assets/images/projects/matchrise.png'
import styles from './Projects.module.css'

const PROJECTS = [
  {
    image: vemaroImage,
    tag: 'Transfers privados',
    title: 'Vemaro Transfers',
    href: 'https://www.vemarotransfers.com/',
    external: true,
  },
  {
    image: regiamareImage,
    tag: 'Inmobiliaria de lujo',
    title: 'Regia Mare',
    href: 'https://regiamare.com/',
    external: true,
  },
  {
    image: navagliImage,
    tag: 'Reformas y construcción',
    title: 'Navagli',
    href: 'https://www.navagli.com/',
    external: true,
  },
  {
    image: arqueliaImage,
    tag: 'Arquitectura y reformas',
    title: 'Arquelia',
    href: 'https://arquelia.es/',
    external: true,
  },
  {
    image: musibingoImage,
    tag: 'Videojuego · Bingo musical',
    title: 'MusiBingo',
    href: 'https://musibingo.com/',
    external: true,
  },
  {
    image: matchriseImage,
    tag: 'Videojuego · Manager de fútbol',
    title: 'MatchRise',
    href: 'https://www.matchrise.es/',
    external: true,
  },
  {
    tag: 'División de videojuegos',
    title: 'Moira Ordo Games',
    href: '#',
  },
]

export default function Projects() {
  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.kicker}>Para empresas</span>
            <RevealText as="h1" className={styles.heroTitle}>
              Proyectos que <span className="accent-blue">hablan por sí solos</span>
            </RevealText>
            <p className={styles.heroLead}>
              Webs y productos digitales que diseñamos y desarrollamos de principio a fin para
              negocios reales.
            </p>
            <p className={styles.heroTagline}>
              Inmobiliaria · Construcción · Movilidad · Videojuegos
            </p>
          </div>
        </section>

        {/* Grid de proyectos */}
        <section className={styles.showcase}>
          <div className="container">
            <div className={styles.showcaseHead}>
              <span className={styles.kicker}>Proyectos</span>
              <RevealText as="h2" className={styles.headline}>
                Cada proyecto, <span className="accent-blue">su propio mundo</span>
              </RevealText>
            </div>

            <GridProjects projects={PROJECTS} />
          </div>
        </section>

        {/* CTA */}
        <section className={styles.cta}>
          <div className="container">
            <RevealText as="h2" className={styles.ctaTitle}>
              ¿Tu proyecto es el <span className="accent-blue">siguiente</span>?
            </RevealText>
            <p className={styles.ctaText}>
              Cuéntanos qué necesitas y te respondemos con una propuesta pensada para ti.
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
