import { useEffect, useState } from 'react'
import styles from './Header.module.css'
import MenuProject from '../MenuProject/MenuProject'
import NavigationMobile from '../NavigationMobile/NavigationMobile'
import Button from '../Button/Button'

const NAV_ITEMS = [
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'CRM', href: '/crm' },
  { label: 'Opiniones', href: '/#casos' },
  { label: 'Nosotros', href: '/#equipo' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Tarifas', href: '/servicios#tarifas' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.header} ${isScrolled ? styles.isScrolled : ''}`}>
      <a href="/" className={styles.logo} data-cursor-hover>
        moira<span className="accent-blue">ordo</span>
      </a>

      <div className={styles.rightGroup}>
        <MenuProject items={NAV_ITEMS} />

        <div className={styles.actions}>
          <Button as="a" href="/contacto">
            Contactar
          </Button>
          <NavigationMobile links={NAV_ITEMS} />
        </div>
      </div>
    </header>
  )
}
