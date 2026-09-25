import { useScrollReveal } from '../../hooks/useScrollReveal'

/**
 * Versión componente de useScrollReveal, para usar dentro de un .map()
 * (donde no se pueden llamar hooks por item).
 */
export default function Reveal({ as: Tag = 'div', y = 40, delay = 0, children, ...props }) {
  const ref = useScrollReveal({ y, delay })

  return (
    <Tag ref={ref} {...props}>
      {children}
    </Tag>
  )
}
