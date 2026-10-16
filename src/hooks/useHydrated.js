import { useEffect, useState } from 'react'

/**
 * false en el HTML pregenerado y en el primer render del cliente (para que
 * la hidratación coincida); true en cuanto la app ya está montada.
 * Todo lo que dependa del navegador (matchMedia, tamaño de ventana…) debe esperar a esto.
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  return hydrated
}
