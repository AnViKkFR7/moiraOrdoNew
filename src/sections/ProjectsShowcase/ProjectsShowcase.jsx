import { useEffect, useRef, useState } from 'react'
import styles from './ProjectsShowcase.module.css'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import arquelia from '../../assets/images/arquelia.png?w=1400&format=webp'
import vemaro from '../../assets/images/projects/vemaro-transfers.webp?w=1600&format=webp'
import ArrowIcon from '../../components/ArrowIcon/ArrowIcon'

const PROJECTS = [
  {
    image: arquelia,
    alt: 'Web de Arquelia, constructora de reformas premium',
    name: 'Arquelia',
    headline: 'Una web a la altura de sus obras',
    description:
      'Diseño editorial a medida para una constructora premium en Cataluña, con las obras gestionadas desde nuestro CRM. Además llevamos su marketing online y su publicidad para que la web traiga clientes.',
    accent: 'var(--accent-yellow)',
    href: 'https://arquelia.es/',
  },
  {
    image: vemaro,
    alt: 'Web de Vemaro Transfers con el formulario de reserva de traslados',
    name: 'Vemaro Transfers',
    headline: 'SaaS a medida para la gestión de flota',
    description:
      'Plataforma propia para gestionar flota, chóferes y reservas, más un frontal moderno y responsive que calcula el precio al instante y cobra online con tarjeta, Apple Pay, Google Pay o PayPal.',
    accent: 'var(--accent-blue-light)',
    href: 'https://www.vemarotransfers.com/',
  },
]

/**
 * El panel de color con título + descripción + botón se transfiere a la
 * tarjeta bajo el cursor; la otra vuelve a su estado mínimo (solo título
 * en blanco sobre la imagen).
 */
const HOVER_QUERY = '(min-width: 1000px) and (hover: hover)'

export default function ProjectsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  // En móvil/tablet o en pantallas táctiles no hay hover: cada panel se abre al tocar su tarjeta.
  // Se arranca en modo escritorio (igual que el HTML pregenerado) y se ajusta al hidratar
  const [canHover, setCanHover] = useState(true)
  const [openCards, setOpenCards] = useState([])

  const toggleCard = (i) =>
    setOpenCards((open) => (open.includes(i) ? open.filter((n) => n !== i) : [...open, i]))
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
    const query = window.matchMedia(HOVER_QUERY)
    setCanHover(query.matches)
    const onChange = (e) => setCanHover(e.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

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
        const isActive = canHover ? i === activeIndex : openCards.includes(i)
        const showHint = !canHover && !isActive

        return (
          <a
            key={project.name}
            ref={(node) => {
              refs[i].current = node
              if (i === 0) narrowCardRef.current = node
            }}
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className={styles.card}
            style={{ '--accent': project.accent }}
            data-cursor-hover
            onMouseEnter={() => setActiveIndex(i)}
            onClick={(e) => {
              // En táctil, el primer toque abre el panel y el segundo abre la web
              if (canHover || isActive) return
              e.preventDefault()
              toggleCard(i)
            }}
            aria-expanded={canHover ? undefined : isActive}
          >
            <img src={project.image} alt={project.alt} />
            <div className={styles.overlay} />

            <div
              className={`${styles.panel} ${isActive ? styles.isActive : ''}`}
              style={{ backgroundColor: isActive ? project.accent : 'transparent' }}
            >
              <h3 className={`${styles.title} ${isActive ? styles.titleActive : ''}`}>
                {project.name}
              </h3>

              {showHint && <span className={styles.tapHint}>Toca para descubrir</span>}

              <div className={`${styles.extra} ${isActive ? styles.isActive : ''}`}>
                <p className={styles.headline}>{project.headline}</p>
                <p className={styles.desc}>{project.description}</p>
              </div>

              <span className={`${styles.arrow} ${isActive ? styles.isActive : ''}`} aria-hidden="true">
                <ArrowIcon />
              </span>
              {showHint && (
                <span className={styles.plus} aria-hidden="true">
                  +
                </span>
              )}
            </div>
          </a>
        )
      })}
    </div>
  )
}
