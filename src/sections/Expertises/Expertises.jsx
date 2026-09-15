import styles from './Expertises.module.css'
import RevealText from '../../components/RevealText/RevealText'
import { useScrollReveal } from '../../hooks/useScrollReveal'

// TODO: reemplazar por contenido real
const ITEMS = ['Servicio uno', 'Servicio dos', 'Servicio tres', 'Servicio cuatro']

export default function Expertises() {
  const mediaRef = useScrollReveal({ y: 40 })

  return (
    <section className="section container">
      <div className={styles.expertises}>
        <div ref={mediaRef} className={styles.media}>
          <img src="https://placehold.co/800x600" alt="" loading="lazy" />
        </div>

        <div>
          <RevealText as="h2">
            Nuestras <span className="accent-blue">expertises</span>
          </RevealText>
          <p className={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>

          <ul className={styles.list}>
            {/* TODO: reemplazar por contenido real */}
            {ITEMS.map((item, i) => (
              <li key={item} className={styles.item}>
                <span>{item}</span>
                <span>{String(i + 1).padStart(2, '0')}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
