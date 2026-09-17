import { useEffect, useRef, useState } from 'react'
import styles from './ProjectsShowcase.module.css'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import arquelia from '../../assets/images/arquelia.png'
import regiamare from '../../assets/images/regiamare.jpg'

// TODO: reemplazar por contenido real
const PROJECTS = [
  {
    image: arquelia,
    alt: 'Arquelia',
    city: 'Madrid',
    size: '120 m²',
    name: 'Arquelia',
    headline: 'Tu hogar llevado a otro nivel',
    description:
      'Lo que prometemos, lo cumplimos en obra.No hacemos reformas en serie. Aceptamos un número limitado de proyectos al año para poder dedicar a cada uno el tiempo, el equipo propio y la atención que merece — desde el primer boceto hasta la última junta.',
    accent: 'var(--accent-yellow)',
  },
  {
    image: regiamare,
    alt: 'Regiamare',
    city: 'Barcelona',
    size: '240 m²',
    name: 'Regiamare',
    headline: 'Encuentra tu vivienda ideal en la costa',
    description:
      'Un enfoque integral.En Regia Mare Properties, no solo vendemos propiedades. Ofrecemos una experiencia completa que abarca desde la primera consulta hasta el seguimiento post-venta. Nuestro equipo de profesionales especializados trabaja de manera coordinada para asegurar cada transacción.',
    accent: 'var(--accent-blue-light)',
  },
]

/**
 * El panel de color con título + descripción + botón se transfiere a la
 * tarjeta bajo el cursor; la otra vuelve a su estado mínimo (solo título
 * en blanco sobre la imagen).
 */
export default function ProjectsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const gridRef = useRef(null)
  const narrowCardRef = useRef(null)
  const leftRef = useScrollReveal({ y: 30 })
  const rightRef = useScrollReveal({ y: 30, delay: 0.1 })
  const refs = [leftRef, rightRef]

  // Los dos paneles deben tener el mismo ancho; como la tarjeta izquierda
  // es la más angosta, medimos su ancho real y lo aplicamos a ambas vía
  // una variable CSS (si no, el panel de la tarjeta derecha —más ancha—
  // terminaría siendo más grande que el de la izquierda).
  useEffect(() => {
    const syncPanelWidth = () => {
      if (!narrowCardRef.current || !gridRef.current) return
      const width = narrowCardRef.current.getBoundingClientRect().width - 28
      gridRef.current.style.setProperty('--panel-width', `${width}px`)
    }

    syncPanelWidth()
    window.addEventListener('resize', syncPanelWidth)
    return () => window.removeEventListener('resize', syncPanelWidth)
  }, [])

  return (
    <div ref={gridRef} className={styles.grid}>
      {PROJECTS.map((project, i) => {
        const isActive = i === activeIndex

        return (
          <a
            key={project.name}
            ref={(node) => {
              refs[i].current = node
              if (i === 0) narrowCardRef.current = node
            }}
            href="#"
            className={styles.card}
            data-cursor-hover
            onMouseEnter={() => setActiveIndex(i)}
          >
            <img src={project.image} alt={project.alt} />
            <div className={styles.overlay} />

            <div className={styles.badges}>
              <span className={styles.badge}>{project.city}</span>
              <span className={styles.badge}>{project.size}</span>
            </div>

            <div
              className={`${styles.panel} ${isActive ? styles.isActive : ''}`}
              style={{ backgroundColor: isActive ? project.accent : 'transparent' }}
            >
              <h3 className={`${styles.title} ${isActive ? styles.titleActive : ''}`}>
                {project.name}
              </h3>

              <div className={`${styles.extra} ${isActive ? styles.isActive : ''}`}>
                <p className={styles.headline}>{project.headline}</p>
                <p className={styles.desc}>{project.description}</p>
              </div>

              <span className={`${styles.arrow} ${isActive ? styles.isActive : ''}`} aria-hidden="true">
                ↗
              </span>
            </div>
          </a>
        )
      })}
    </div>
  )
}
