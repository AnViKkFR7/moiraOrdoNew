import styles from './Testimonial.module.css'
import RevealText from '../../components/RevealText/RevealText'
import { TESTIMONIAL } from '../../data/caseStudies'

export default function Testimonial() {
  return (
    <section className={`section container ${styles.testimonial}`}>
      <figure>
        <blockquote>
          <RevealText as="p" className={`h2 ${styles.quote}`}>
            “{TESTIMONIAL.quote}”
          </RevealText>
        </blockquote>
        <figcaption className={styles.author}>— {TESTIMONIAL.author}</figcaption>
      </figure>
      <p className={styles.text}>{TESTIMONIAL.text}</p>
    </section>
  )
}
