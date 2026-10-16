import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Hero from '../sections/Hero/Hero'
import Team from '../sections/Team/Team'
import Testimonial from '../sections/Testimonial/Testimonial'
import CaseStudies from '../sections/CaseStudies/CaseStudies'
import ProjectsIntro from '../sections/ProjectsIntro/ProjectsIntro'
import ProjectsShowcase from '../sections/ProjectsShowcase/ProjectsShowcase'
import ServicesHighlight from '../sections/ServicesHighlight/ServicesHighlight'

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />

        <section className="section container">
          <ProjectsIntro />
          <div style={{ marginTop: 'var(--space-lg)' }}>
            <ProjectsShowcase />
          </div>
        </section>

        <ServicesHighlight />

        <CaseStudies />

        <Team />
        <Testimonial />
      </main>

      <Footer />
    </>
  )
}
