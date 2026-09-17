import { useState } from 'react'
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
    title: 'Arquelia',
    description: 'Rediseño integral de marca y sitio web para un estudio de arquitectura.',
    accent: 'var(--accent-yellow)',
  },
  {
    image: regiamare,
    alt: 'Regiamare',
    city: 'Barcelona',
    size: '240 m²',
    title: 'Regiamare',
    description: 'Plataforma web y sistema visual para un desarrollo residencial de lujo.',
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
  const leftRef = useScrollReveal({ y: 30 })
  const rightRef = useScrollReveal({ y: 30, delay: 0.1 })
  const refs = [leftRef, rightRef]

  return (
    <div className={styles.grid}>
      {PROJECTS.map((project, i) => {
        const isActive = i === activeIndex

        return (
          <a
            key={project.title}
            ref={refs[i]}
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
                {project.title}
              </h3>

              <div className={`${styles.extra} ${isActive ? styles.isActive : ''}`}>
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
