import styles from './LiveSitesShowcase.module.css'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import navagliImage from '../../assets/images/projects/navagli.jpg?format=webp'
import musibingoImage from '../../assets/images/projects/musibingo.png?w=1200&format=webp'
import matchriseImage from '../../assets/images/projects/matchrise.webp'
import ArrowIcon from '../../components/ArrowIcon/ArrowIcon'

const SITES = [
  { name: 'Navagli', url: 'https://www.navagli.com/', image: navagliImage },
  { name: 'MusiBingo', url: 'https://musibingo.com/', image: musibingoImage },
  { name: 'MatchRise', url: 'https://www.matchrise.es/', image: matchriseImage },
]

/**
 * Grid de 3 cards que enlazan a sitios reales en producción. Pensado
 * para insertarse dentro de otra sección (ver ServicesHighlight), no
 * trae su propio <section> ni título.
 */
export default function LiveSitesShowcase() {
  const refs = [
    useScrollReveal({ y: 30 }),
    useScrollReveal({ y: 30, delay: 0.1 }),
    useScrollReveal({ y: 30, delay: 0.2 }),
  ]

  return (
    <div className={styles.grid}>
      {SITES.map((site, i) => (
        <a
          key={site.name}
          ref={refs[i]}
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.card}
          data-cursor-hover
        >
          <img src={site.image} alt={site.name} loading="lazy" />
          <div className={styles.overlay} />

          <div className={styles.info}>
            <span className={styles.name}>{site.name}</span>
            <span className={styles.arrow} aria-hidden="true">
              <ArrowIcon />
            </span>
          </div>
        </a>
      ))}
    </div>
  )
}
