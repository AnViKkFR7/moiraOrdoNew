/**
 * Flecha en diagonal (↗) dibujada con SVG. Los caracteres "↗" los móviles (iOS sobre todo)
 * los pintan como emoji; el SVG se ve igual en todas partes y hereda color y tamaño del texto.
 */
export default function ArrowIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      style={{ display: 'inline-block', verticalAlign: '-0.12em', flexShrink: 0 }}
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}
