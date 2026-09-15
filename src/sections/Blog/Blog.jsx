import styles from './Blog.module.css'
import RevealText from '../../components/RevealText/RevealText'
import GazetaCard from '../../components/GazetaCard/GazetaCard'

// TODO: reemplazar por contenido real
const POSTS = [
  { title: 'Título de la nota uno', date: '01 ene 2026', image: 'https://placehold.co/640x400' },
  { title: 'Título de la nota dos', date: '15 ene 2026', image: 'https://placehold.co/640x400' },
  { title: 'Título de la nota tres', date: '28 ene 2026', image: 'https://placehold.co/640x400' },
]

export default function Blog() {
  return (
    <section className="section container">
      <div className={styles.header}>
        <RevealText as="h2">Últimas noticias</RevealText>
      </div>

      <div className={styles.grid}>
        {POSTS.map((post) => (
          <GazetaCard key={post.title} {...post} />
        ))}
      </div>
    </section>
  )
}
