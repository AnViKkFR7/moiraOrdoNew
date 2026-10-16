import styles from './GridProjects.module.css'
import ProjectCard from '../ProjectCard/ProjectCard'

/**
 * Grid de proyectos. `projects` = [{ image, tag, title, headline, description, accent, href }]
 * `columns` = columnas en escritorio (2 o 3); con 2 las tarjetas son apaisadas.
 */
export default function GridProjects({ projects, columns = 3 }) {
  const style = { '--cols': columns, '--card-ratio': columns === 2 ? '4 / 3' : '4 / 5' }

  return (
    <div className={`${styles.grid} ${columns === 2 ? styles.isTwoCols : ''}`} style={style}>
      {projects.map((project) => (
        <ProjectCard key={project.title} {...project} />
      ))}
    </div>
  )
}
