import { useState } from 'react'
import styles from './Team.module.css'
import RevealText from '../../components/RevealText/RevealText'
import Button from '../../components/Button/Button'
import TeamModal from '../../components/TeamModal/TeamModal'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import aaron from '../../assets/images/aaron.png'
import joselyn from '../../assets/images/joselyn.png'
import fede from '../../assets/images/fede.png'

// TODO: reemplazar por contenido real (apellidos, cargos, bios y proyectos)
const MEMBERS = [
  {
    image: aaron,
    name: 'Aaron',
    firstName: 'Aaron',
    role: 'Cargo',
    className: 'col1',
    bio: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Encargado de traducir cada brief en un sistema de diseño claro y funcional.',
      'Con más de ocho años de experiencia, se especializa en interfaces que priorizan la legibilidad y la estabilidad del contenido por sobre la moda pasajera.',
    ],
    projects: ['Arquelia', 'Regiamare'],
  },
  {
    image: joselyn,
    name: 'Joselyn',
    firstName: 'Joselyn',
    role: 'Cargo',
    className: 'col2',
    bio: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lidera el desarrollo técnico, cuidando cada detalle de rendimiento y accesibilidad.',
      'Cree que un buen sistema es aquel que un desarrollador nuevo puede entender en minutos, no en semanas.',
    ],
    projects: ['Navagli', 'MusiBingo', 'Matchrise'],
  },
  {
    image: fede,
    name: 'Fede',
    firstName: 'Fede',
    role: 'Cargo',
    className: 'col3',
    bio: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Acompaña a cada cliente desde el primer diagnóstico hasta la entrega final.',
      'Su trabajo es asegurar que el sistema que construimos siga sirviendo al negocio mucho después de la entrega.',
    ],
    projects: ['Arquelia', 'Navagli'],
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
    <section className={styles.team}>
      <div className="section container">
        <RevealText as="h2">
          Conocé al <span className="accent-yellow">equipo</span>
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

              <span className={styles.name}>{member.name}</span>
              <span className={styles.role}>{member.role}</span>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <Button as="a" href="#" variant="filled">
            Conocer al equipo
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
