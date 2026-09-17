import styles from './LiveSitesShowcase.module.css'
import { useScrollReveal } from '../../hooks/useScrollReveal'

// TODO: reemplazar por contenido real
const SITES = [
  { name: 'Navagli', url: 'https://www.navagli.com/' },
  { name: 'MusiBingo', url: 'https://musibingo.com/' },
  { name: 'Matchrise', url: 'https://matchrise.es/' },
]

// Captura de pantalla en vivo del sitio, vía el servicio público mshots
// de WordPress (no requiere API key). Se actualiza sola con el tiempo.
const screenshotUrl = (url) => `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1200&h=1500`

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
          <img src={screenshotUrl(site.url)} alt={site.name} loading="lazy" />
          <div className={styles.overlay} />

          <div className={styles.info}>
            <span className={styles.name}>{site.name}</span>
            <span className={styles.arrow} aria-hidden="true">
              ↗
            </span>
          </div>
        </a>
      ))}
    </div>
  )
}
