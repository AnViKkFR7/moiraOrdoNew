import styles from './Hero.module.css'
import RevealText from '../../components/RevealText/RevealText'
import Button from '../../components/Button/Button'
import heroImage from '../../assets/images/hero-equipo.webp?w=1600&format=webp'
// La imagen anterior (creacion-paginas.webp) se conserva en assets por si hay que volver atrás
import heroSrcSet from '../../assets/images/hero-equipo.webp?w=640;1024;1600&format=webp&as=srcset'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.textBlock}>
        <RevealText as="h1" className={styles.title}>
          El destino ordenado del contenido. Un sistema estable para contenido cambiante. Pensado
          para <span className="accent-blue">webs que no se improvisan</span>.
        </RevealText>
      </div>

      <div className={styles.media}>
        <img
          src={heroImage}
          srcSet={heroSrcSet}
          sizes="(min-width: 1000px) calc(100vw - 6.4rem), calc(100vw - 48px)"
          width="1600"
          height="900"
          alt="Equipo de Moira Ordo revisando el diseño y el código de una web"
          fetchpriority="high"
          decoding="async"
        />
      </div>

      <div className={styles.textWrap}>
        <span className={styles.eyebrow}>Tu Centro de Control</span>

        <p className={styles.mediaText}>
          Analizamos a fondo la operativa de tu negocio para diseñar un modelo de datos
          dinámico a medida. Estructuramos meticulosamente toda tu información —desde contenidos
          multimedia y documentos corporativos hasta catálogos complejos— creando{' '}
          <span className="accent-blue">un ecosistema digital que se adapta exactamente a tus
          necesidades reales</span>.
        </p>
      </div>

      <div className={styles.cta}>
        <Button as="a" href="/contacto" variant="filled">
          Contactar
        </Button>
      </div>
    </section>
  )
}
