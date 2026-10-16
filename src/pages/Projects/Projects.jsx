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

const COMPANIES = [
  {
    image: navagliImage,
    tag: 'Reformas y construcción',
    title: 'Navagli',
    href: 'https://www.navagli.com/',
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
    image: vemaroImage,
    tag: 'Transfers privados',
    title: 'Vemaro Transfers',
    href: 'https://www.vemarotransfers.com/',
    external: true,
  },
  {
    image: arqueliaImage,
    tag: 'Arquitectura y reformas',
    title: 'Arquelia',
    href: 'https://arquelia.es/',
    external: true,
  },
]

const GAMES = [
  {
    image: musibingoImage,
    tag: 'Bingo musical',
    title: 'MusiBingo',
    href: 'https://musibingo.com/',
    external: true,
  },
  {
    image: matchriseImage,
    tag: 'Manager de fútbol',
    title: 'MatchRise',
    href: 'https://www.matchrise.es/',
    external: true,
  },
]

const GROUPS = [
  { id: 'empresas', index: '01', label: 'Para empresas', count: COMPANIES.length },
  { id: 'games', index: '02', label: 'Moira Ordo Games', count: GAMES.length },
]

export default function Projects() {
  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.kicker}>Proyectos</span>
            <RevealText as="h1" className={styles.heroTitle}>
              Proyectos que <span className="accent-blue">hablan por sí solos</span>
            </RevealText>
            <p className={styles.heroLead}>
              Webs y productos digitales que diseñamos y desarrollamos de principio a fin para
              negocios reales.
            </p>
            <nav className={styles.groupNav} aria-label="Tipos de proyecto">
              {GROUPS.map((group) => (
                <a key={group.id} href={`/proyectos#${group.id}`} className={styles.groupLink} data-cursor-hover>
                  <span className={styles.groupIndex}>{group.index}</span>
                  {group.label}
                  <span className={styles.groupCount}>{group.count}</span>
                </a>
              ))}
            </nav>
          </div>
        </section>

        {/* Para empresas */}
        <section id="empresas" className={styles.showcase}>
          <div className="container">
            <div className={`${styles.groupHead} ${styles.group}`}>
              <span className={styles.groupNumber}>01</span>
              <div>
                <span className={styles.kicker}>Para empresas</span>
                <RevealText as="h2" className={styles.headline}>
                  Webs a medida para <span className="accent-blue">negocios reales</span>
                </RevealText>
              </div>
              <div>
                <p className={styles.groupText}>
                  Inmobiliaria, construcción y movilidad: sitios diseñados y desarrollados con
                  contenido que el cliente gestiona solo.
                </p>
                <span className={styles.groupMeta}>{COMPANIES.length} proyectos</span>
              </div>
            </div>

            <GridProjects projects={COMPANIES} columns={2} />
          </div>
        </section>

        {/* Moira Ordo Games */}
        <section id="games" className={`${styles.showcase} ${styles.games}`}>
          <div className="container">
            <div className={`${styles.groupHead} ${styles.group}`}>
              <span className={styles.groupNumber}>02</span>
              <div>
                <span className={styles.kicker}>Moira Ordo Games</span>
                <RevealText as="h2" className={styles.headline}>
                  Juegos que <span className="accent-blue">se juegan en el navegador</span>
                </RevealText>
              </div>
              <div>
                <p className={styles.groupText}>
                  Experiencias jugables para web y móvil, creadas con la misma estabilidad que
                  nuestras webs.
                </p>
                <span className={styles.groupMeta}>{GAMES.length} juegos</span>
              </div>
            </div>

            <GridProjects
              projects={GAMES}
              aside={
                <div className={styles.gamesAside}>
                  <div>
                    <div className={styles.gamesAsideTitle}>¿Tienes una idea de juego?</div>
                    <p className={styles.gamesAsideText}>
                      Juegos móviles HTML5 a medida, listos para jugar desde cualquier navegador.
                    </p>
                  </div>
                  <Button as="a" href="/contacto" variant="filled">
                    Hablemos
                  </Button>
                </div>
              }
            />
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
