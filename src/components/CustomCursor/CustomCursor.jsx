import { useEffect, useRef, useState } from 'react'
import styles from './CustomCursor.module.css'

const LERP = 0.18

/**
 * Cursor custom circular que sigue al mouse con lerp/delay.
 * Agrega la clase "is-hover" (data-cursor-hover) a cualquier elemento
 * interactivo para escalarlo x2 al pasar por encima.
 */
export default function CustomCursor() {
  const dotRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const raf = useRef(null)
  const [isHover, setIsHover] = useState(false)

  useEffect(() => {
    document.documentElement.classList.add('has-custom-cursor')

    const onMove = (e) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
    }

    const onOver = (e) => {
      if (e.target.closest('[data-cursor-hover]')) setIsHover(true)
    }
    const onOut = (e) => {
      if (e.target.closest('[data-cursor-hover]')) setIsHover(false)
    }

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * LERP
      pos.current.y += (target.current.y - pos.current.y) * LERP
      if (dotRef.current) {
        dotRef.current.style.setProperty('--cursor-x', `${pos.current.x}px`)
        dotRef.current.style.setProperty('--cursor-y', `${pos.current.y}px`)
      }
      raf.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mouseout', onOut)
    raf.current = requestAnimationFrame(tick)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <div
      ref={dotRef}
      className={`${styles.cursor} ${isHover ? styles.isHover : ''}`}
      aria-hidden="true"
    />
  )
}
