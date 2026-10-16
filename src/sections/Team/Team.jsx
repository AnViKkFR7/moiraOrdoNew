import { useState } from 'react'
import styles from './Team.module.css'
import RevealText from '../../components/RevealText/RevealText'
import Button from '../../components/Button/Button'
import TeamModal from '../../components/TeamModal/TeamModal'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import aaron from '../../assets/images/aaron.png?w=1000&format=webp'
import joselyn from '../../assets/images/joselyn.png?w=1000&format=webp'
import fede from '../../assets/images/fede.png?w=1000&format=webp'
import ArrowIcon from '../../components/ArrowIcon/ArrowIcon'

// Webs y juegos publicados (Aaron y Joselyn han participado en todos)
const SITES = {
  Navagli: 'https://www.navagli.com/',
  'Regia Mare': 'https://regiamare.com/',
  Arquelia: 'https://arquelia.es/',
  'Reformas Llobregat': 'https://reformasllobregat.com/',
  'Vemaro Transfers': 'https://www.vemarotransfers.com/',
  MusiBingo: 'https://musibingo.com/',
  MatchRise: 'https://www.matchrise.es/',
}
const projectsOf = (...names) => names.map((name) => ({ name, href: SITES[name] }))

// TODO: añadir la URL de LinkedIn de cada miembro en `linkedin` (el botón aparece solo si hay URL)
const MEMBERS = [
  {
    image: aaron,
    name: 'Aaron',
    firstName: 'Aaron',
    className: 'col1',
    role: 'Software engineer',
    linkedin: '',
    bio: [
      'Soy software engineer con más de ocho años de experiencia. Trabajo en todo el stack: frontend, backend y bases de datos.',
      'Diseño la arquitectura de Moira Ordo —el CRM, los modelos de datos y las integraciones— para que cada pieza sea sencilla de mantener y siga funcionando mucho después del lanzamiento.',
    ],
    projects: projectsOf('Navagli', 'Regia Mare', 'Arquelia', 'Reformas Llobregat', 'Vemaro Transfers', 'MusiBingo', 'MatchRise'),
  },
  {
    image: joselyn,
    name: 'Joselyn',
    firstName: 'Joselyn',
    className: 'col2',
    role: 'Desarrolladora web',
    linkedin: '',
    bio: [
      'Soy desarrolladora web y me ocupo de que lo que diseñamos se vea y funcione como debe: del diseño de cada web a su frontal, cuidando la velocidad, el móvil y la accesibilidad.',
      'También soy tu primera interlocutora: escucho qué necesita tu negocio y te acompaño hasta que la web está publicada y sabes gestionarla.',
    ],
    projects: projectsOf('Navagli', 'Regia Mare', 'Arquelia', 'Reformas Llobregat', 'Vemaro Transfers', 'MusiBingo', 'MatchRise'),
  },
  {
    image: fede,
    name: 'Fede',
    firstName: 'Fede',
    className: 'col3',
    role: 'Marketing, SEO y publicidad',
    linkedin: '',
    bio: [
      'Me ocupo de que una web no se quede en bonita: que se encuentre y traiga clientes. Llevo el marketing online, el SEO y la publicidad de las webs de nuestros clientes.',
      'Investigo qué busca su público, optimizo la web para posicionarla y gestiono las campañas de pago midiendo cada euro. Así, el formulario de Reformas Llobregat trae cuatro veces más clientes.',
    ],
    projects: projectsOf('Reformas Llobregat', 'Arquelia', 'Vemaro Transfers'),
  },
]

export default function Team() {
  const [activeIndex, setActiveIndex] = useState(null)
  const [loadingIndex, setLoadingIndex] = useState(null)

  const photoRefs = [
    useScrollReveal({ y: 30 }),
    useScrollReveal({ y: 30, delay: 0.1 }),
    useScrollReveal({ y: 30, delay: 0.2 }),
  ]

  const handleOpen = (i) => {
    setLoadingIndex(i)
    setTimeout(() => {
      setLoadingIndex(null)
      setActiveIndex(i)
    }, 350)
  }

  return (
    <section id="equipo" className={styles.team}>
      <div className="section container">
        <RevealText as="h2">
          Conoce al <span className="accent-yellow">equipo</span>
        </RevealText>

        <p className={styles.text}>
          Somos un equipo especializado en crear experiencias digitales duraderas. No seguimos
          tendencias: construimos fundamentos. Nacimos para encontrar el equilibrio entre el
          caos de los constructores visuales y la rigidez de las soluciones empresariales.
          Creamos webs profesionales donde el diseño permanece estable y el contenido fluye con
          orden. Moira Ordo es nuestra respuesta: un sistema que respeta al diseñador, empodera
          al desarrollador y libera al cliente, ofreciendo una forma más clara, flexible y
          duradera de trabajar.
        </p>

        <div className={styles.grid}>
          {MEMBERS.map((member, i) => (
            <div key={member.name + i} className={styles.column}>
              <button
                type="button"
                ref={photoRefs[i]}
                className={`${styles.photo} ${styles[member.className]}`}
                onClick={() => handleOpen(i)}
                data-cursor-hover
                aria-label={`Ver ficha de ${member.name}`}
              >
                <img src={member.image} alt={member.name} loading="lazy" />

                <span className={styles.hoverCircle} aria-hidden="true">
                  <ArrowIcon />
                </span>
                <span className={styles.hoverName} aria-hidden="true">
                  {member.firstName}
                </span>

                <span className={`${styles.photoLoader} ${loadingIndex === i ? styles.isVisible : ''}`}>
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4 L42 24 L24 44 L6 24 Z" strokeWidth="2" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <Button as="a" href="/contacto" variant="filled">
            Habla con el equipo
          </Button>
        </div>
      </div>

      <TeamModal
        member={activeIndex !== null ? MEMBERS[activeIndex] : null}
        isOpen={activeIndex !== null}
        onClose={() => setActiveIndex(null)}
      />
    </section>
  )
}
