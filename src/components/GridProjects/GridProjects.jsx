import styles from './GridProjects.module.css'
import ProjectCard from '../ProjectCard/ProjectCard'

/**
 * Grid de proyectos. `projects` = [{ image, tag, title, href }]
 * `columns` = columnas en escritorio (2 o 3); con 2 las tarjetas son apaisadas.
 * `aside` (opcional) se pinta como última celda del grid.
 */
export default function GridProjects({ projects, aside, columns = 3 }) {
  const style = { '--cols': columns, '--card-ratio': columns === 2 ? '4 / 3' : '4 / 5' }

  return (
    <div className={styles.grid} style={style}>
      {projects.map((project) => (
        <ProjectCard key={project.title} {...project} />
      ))}
      {aside && <div className={styles.aside}>{aside}</div>}
    </div>
  )
}
