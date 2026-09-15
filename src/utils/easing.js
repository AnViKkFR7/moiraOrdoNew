/**
 * Implementación liviana de cubic-bezier easing para usar como función
 * custom de ease en GSAP (el string "cubic-bezier(...)" de CSS no lo
 * entiende el core de GSAP sin el plugin de pago CustomEase).
 */
function cubicBezier(p1x, p1y, p2x, p2y) {
  const A = (a1, a2) => 1.0 - 3.0 * a2 + 3.0 * a1
  const B = (a1, a2) => 3.0 * a2 - 6.0 * a1
  const C = (a1) => 3.0 * a1

  const bezierX = (t) => ((A(p1x, p2x) * t + B(p1x, p2x)) * t + C(p1x)) * t
  const bezierY = (t) => ((A(p1y, p2y) * t + B(p1y, p2y)) * t + C(p1y)) * t
  const dBezierX = (t) => 3.0 * A(p1x, p2x) * t * t + 2.0 * B(p1x, p2x) * t + C(p1x)

  const solveXForT = (x) => {
    let t = x
    for (let i = 0; i < 8; i++) {
      const dx = bezierX(t) - x
      if (Math.abs(dx) < 1e-6) return t
      const d = dBezierX(t)
      if (Math.abs(d) < 1e-6) break
      t -= dx / d
    }
    return t
  }

  return (x) => bezierY(solveXForT(x))
}

// Curvas del sistema — mismos valores que las variables CSS.
export const easeMicro = cubicBezier(0.645, 0.045, 0.355, 1)
export const easeReveal = cubicBezier(0.215, 0.61, 0.355, 1)
export const easeWipe = cubicBezier(0.55, 0.055, 0.675, 0.19)

export { cubicBezier }
