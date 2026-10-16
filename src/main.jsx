import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'

// La restauración del scroll y el #hash se desactivan en index.html; acá se
// asegura el arranque arriba de todo (ver también App al terminar el loader).
window.scrollTo(0, 0)

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// En producción cada página llega pregenerada: se hidrata, no se repinta.
// En desarrollo (vite) el contenedor viene vacío y se monta desde cero.
if (container.firstElementChild) hydrateRoot(container, app)
else createRoot(container).render(app)
