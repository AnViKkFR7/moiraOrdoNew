import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import GridProjects from '../components/GridProjects/GridProjects'
import Hero from '../sections/Hero/Hero'
import Expertises from '../sections/Expertises/Expertises'
import Team from '../sections/Team/Team'
import Blog from '../sections/Blog/Blog'
import Testimonial from '../sections/Testimonial/Testimonial'
import RevealText from '../components/RevealText/RevealText'

// TODO: reemplazar por contenido real
const PROJECTS = [
  { title: '[Nombre del proyecto]', tag: 'Categoría', image: 'https://placehold.co/640x800' },
  { title: '[Nombre del proyecto]', tag: 'Categoría', image: 'https://placehold.co/640x800' },
  { title: '[Nombre del proyecto]', tag: 'Categoría', image: 'https://placehold.co/640x800' },
]

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />

        <section className="section container">
          <RevealText as="h2">Proyectos seleccionados</RevealText>
          <div style={{ marginTop: 'var(--space-md)' }}>
            <GridProjects projects={PROJECTS} />
          </div>
        </section>

        <Expertises />
        <Team />
        <Blog />
        <Testimonial />
      </main>

      <Footer />
    </>
  )
}
