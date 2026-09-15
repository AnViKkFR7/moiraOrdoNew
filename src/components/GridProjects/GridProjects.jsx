import styles from './GridProjects.module.css'
import ProjectCard from '../ProjectCard/ProjectCard'

/**
 * Grid de proyectos. `projects` = [{ image, tag, title, href }]
 * TODO: reemplazar por contenido real.
 */
export default function GridProjects({ projects }) {
  return (
    <div className={styles.grid}>
      {projects.map((project) => (
        <ProjectCard key={project.title} {...project} />
      ))}
    </div>
  )
}
