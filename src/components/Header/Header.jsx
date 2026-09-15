import styles from './Header.module.css'
import MenuProject from '../MenuProject/MenuProject'
import NavigationMobile from '../NavigationMobile/NavigationMobile'
import Button from '../Button/Button'

// TODO: reemplazar por contenido real
const NAV_ITEMS = [
  { label: 'Proyecto uno', href: '#', image: 'https://placehold.co/480x600' },
  { label: 'Proyecto dos', href: '#', image: 'https://placehold.co/480x600' },
  { label: 'Servicios', href: '#', image: 'https://placehold.co/480x600' },
  { label: 'Equipo', href: '#', image: 'https://placehold.co/480x600' },
]

export default function Header() {
  return (
    <header className={styles.header}>
      <a href="/" className={styles.logo} data-cursor-hover>
        moira<span className="accent-blue">ordo</span>
      </a>

      <MenuProject items={NAV_ITEMS} />

      <div className={styles.actions}>
        <Button as="a" href="#contacto">
          Contactar
        </Button>
        <NavigationMobile links={NAV_ITEMS} />
      </div>
    </header>
  )
}
