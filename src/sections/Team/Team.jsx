import { useState } from 'react'
import styles from './Team.module.css'
import RevealText from '../../components/RevealText/RevealText'
import Button from '../../components/Button/Button'
import TeamModal from '../../components/TeamModal/TeamModal'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import aaron from '../../assets/images/aaron.png?w=1000&format=webp'
import joselyn from '../../assets/images/joselyn.png?w=1000&format=webp'
import fede from '../../assets/images/fede.png?w=1000&format=webp'

// Webs y juegos publicados: Aaron y Joselyn han participado en todos
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
      'Soy software engineer y llevo más de ocho años construyendo software. Trabajo en todo el stack: el frontend que ve el usuario, el backend que lo sostiene y las bases de datos donde vive la información.',
      'Me encargo de la arquitectura de Moira Ordo: el CRM, los modelos de datos a medida y las integraciones, como los pagos o el envío de emails. Me gusta que cada pieza sea sencilla de entender y de mantener, y que lo que entregamos siga funcionando bien mucho después del lanzamiento.',
      'He participado en todos los proyectos que verás aquí, desde las webs de empresa hasta los juegos.',
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
      'Soy desarrolladora web y me ocupo de que lo que diseñamos se vea y funcione como debe: del diseño de cada web a su frontal, con atención a la velocidad, al móvil y a la accesibilidad.',
      'También soy la persona con la que hablarás al empezar. Escucho qué necesita tu negocio, te explico las opciones sin tecnicismos y te acompaño hasta que la web está publicada y sabes gestionarla.',
      'He participado en todos los proyectos que verás aquí, desde las webs de empresa hasta los juegos.',
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
      'Me ocupo de la parte que hace que una web no se quede en bonita: que se encuentre y que traiga clientes. Llevo el marketing online, el SEO y la publicidad de las webs de los clientes que confían en nosotros.',
      'Empiezo por entender el negocio y a quién quiere llegar: qué busca esa gente en Google, qué zonas y servicios dan más margen y qué competencia hay. Con eso defino las palabras clave, ordeno la estructura de la web para posicionarla y mejoro los textos y los formularios para que cada visita tenga más opciones de convertirse en una solicitud.',
      'Después gestiono las campañas de publicidad de pago —Google Ads y redes sociales—, mido cada euro invertido con analítica sin cookies y ajusto mes a mes lo que funciona. Así, en Reformas Llobregat el formulario trae cuatro veces más clientes y en Arquelia las visitas desde buscadores se han más que duplicado.',
      'Mi trabajo es que el sistema que construimos siga sirviendo al negocio mucho después de la entrega, con informes claros y sin jerga.',
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
                  ↗
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
