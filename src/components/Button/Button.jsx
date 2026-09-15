import styles from './Button.module.css'

/**
 * Botón pill con efecto hover-fill (capa interna que sube y tapa el
 * fondo). `as` permite renderizar como <a> o <button> sin duplicar CSS.
 */
export default function Button({
  as: Tag = 'button',
  variant = 'outline',
  children,
  className = '',
  ...props
}) {
  return (
    <Tag
      className={`${styles.button} ${variant === 'filled' ? styles.filled : ''} ${className}`}
      data-cursor-hover
      {...props}
    >
      <span className={styles.fill} aria-hidden="true" />
      <span className={styles.label}>{children}</span>
    </Tag>
  )
}
