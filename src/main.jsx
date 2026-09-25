import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'

// La restauración del scroll y el #hash se desactivan en index.html; acá se
// asegura el arranque arriba de todo (ver también App al terminar el loader).
window.scrollTo(0, 0)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
