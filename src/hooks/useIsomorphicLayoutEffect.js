import { useEffect, useLayoutEffect } from 'react'

// useLayoutEffect en el navegador; en el prerender (sin DOM) useEffect, que no avisa.
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
