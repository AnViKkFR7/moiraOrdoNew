import { useSplitReveal } from '../../hooks/useSplitReveal'

/**
 * Wrapper genérico para reveal de texto palabra por palabra al hacer
 * scroll. `as` define el tag (h1, h2, p, etc).
 */
export default function RevealText({ as: Tag = 'div', children, className = '', ...props }) {
  const ref = useSplitReveal()

  return (
    <Tag ref={ref} className={className} {...props}>
      {children}
    </Tag>
  )
}
