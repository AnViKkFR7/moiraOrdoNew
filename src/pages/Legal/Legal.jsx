import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { LEGAL_PAGES, LEGAL_UPDATED } from './legalContent'
import styles from './Legal.module.css'

/** Página legal genérica: `slug` = 'privacidad' | 'aviso-legal' | 'cookies'. */
export default function Legal({ slug }) {
  const page = LEGAL_PAGES[slug]

  return (
    <>
      <Header />

      <main className={styles.page}>
        <div className={`container ${styles.inner}`}>
          <span className={styles.kicker}>Legal</span>
          <h1 className={styles.title}>{page.title}</h1>
          <p className={styles.updated}>{LEGAL_UPDATED}</p>
          <p className={styles.intro}>{page.intro}</p>

          <div className={styles.sections}>
            {page.sections.map((section) => (
              <section key={section.title} className={styles.section}>
                <h2 className={styles.sectionTitle}>{section.title}</h2>
                {section.paragraphs.map((text) => (
                  <p key={text} className={styles.text}>
                    {text}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
