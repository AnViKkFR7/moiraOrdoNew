import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import SplitType from 'split-type'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Button from '../../components/Button/Button'
import { whenPageVisible } from '../../router'
import { easeReveal } from '../../utils/easing'
import styles from './Contact.module.css'

const CONTACT_EMAIL = 'info@moiraordo.es'

// TODO: poner la URL de un servicio de formularios (Formspree, Getform, backend
// propio…). Mientras sea null, "Enviar" abre el cliente de correo con los datos.
const FORM_ENDPOINT = null

const REASONS = [
  { title: 'Consulta gratuita', text: 'Primera conversación sin compromiso' },
  { title: 'Respuesta rápida', text: 'Te contestamos en menos de 24 horas' },
  { title: 'Atención personalizada', text: 'Hablamos directamente contigo, sin intermediarios' },
  { title: 'Presupuesto a medida', text: 'Soluciones adaptadas a tu proyecto y presupuesto' },
]

const PROJECT_TYPES = [
  'Nueva página web',
  'Rediseño de web existente',
  'Tienda online',
  'Web corporativa',
  'Landing page',
  'Backend para mi negocio',
  'Otro',
]

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(data) {
  const errors = {}
  if (!data.name.trim()) errors.name = 'Dinos tu nombre.'
  if (!data.email.trim()) errors.email = 'Necesitamos un email para responderte.'
  else if (!EMAIL_PATTERN.test(data.email.trim())) errors.email = 'Revisa el formato del email.'
  if (!data.type) errors.type = 'Elige un tipo de proyecto.'
  if (!data.message.trim()) errors.message = 'Cuéntanos un poco sobre tu proyecto.'
  if (!data.privacy) errors.privacy = 'Debes aceptar la política de privacidad.'
  return errors
}

function Field({ label, name, required, error, children }) {
  return (
    <label className={`${styles.field} ${error ? styles.hasError : ''}`} data-anim="field">
      <span className={styles.label}>
        {label}
        {required && <span className={styles.required}> *</span>}
      </span>
      {children}
      <span className={styles.line} aria-hidden="true" />
      <span className={styles.error} id={`${name}-error`} role={error ? 'alert' : undefined}>
        {error}
      </span>
    </label>
  )
}

export default function Contact() {
  const rootRef = useRef(null)
  const titleRef = useRef(null)
  const formRef = useRef(null)
  const successRef = useRef(null)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | failed

  // Entrada de la página: una sola timeline que arranca al levantarse el telón
  useLayoutEffect(() => {
    const root = rootRef.current
    const split = new SplitType(titleRef.current, { types: 'words' })
    let tl

    const ctx = gsap.context(() => {
      gsap.set(split.words, { yPercent: 100, opacity: 0 })
      gsap.set('[data-anim~="fade"]', { y: 30, autoAlpha: 0 })
      gsap.set('[data-anim~="card"]', { clipPath: 'inset(100% 0% 0% 0% round 20px)' })
      gsap.set('[data-anim~="field"], [data-anim~="reason"]', { y: 24, autoAlpha: 0 })
      gsap.set('[data-anim~="check"]', { scale: 0 })
    }, root)

    const cancel = whenPageVisible(() => {
      ctx.add(() => {
        tl = gsap
          .timeline({ defaults: { ease: easeReveal } })
          .to('[data-anim~="kicker"]', { y: 0, autoAlpha: 1, duration: 0.6 })
          .to(split.words, { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.05 }, '<0.1')
          .to('[data-anim~="lead"]', { y: 0, autoAlpha: 1, duration: 0.7 }, '-=0.5')
          .to(
            '[data-anim~="card"]',
            { clipPath: 'inset(0% 0% 0% 0% round 20px)', duration: 1, ease: 'expo.inOut' },
            '-=0.5'
          )
          .to('[data-anim~="field"]', { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.06 }, '-=0.45')
          .to('[data-anim~="reasonsTitle"]', { y: 0, autoAlpha: 1, duration: 0.6 }, '<')
          .to('[data-anim~="reason"]', { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1 }, '<0.1')
          .to(
            '[data-anim~="check"]',
            { scale: 1, duration: 0.5, ease: 'back.out(2.2)', stagger: 0.1 },
            '<0.15'
          )
          .to('[data-anim~="other"]', { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.08 }, '-=0.3')
      })
    })

    return () => {
      cancel()
      tl?.kill()
      ctx.revert()
      split.revert()
    }
  }, [])

  // Pantalla de "enviado": check que se dibuja + texto
  useLayoutEffect(() => {
    if (status !== 'sent') return
    const panel = successRef.current
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: easeReveal } })
        .from(panel, { autoAlpha: 0, duration: 0.3 })
        .from('[data-success="circle"]', { scale: 0, duration: 0.6, ease: 'back.out(1.8)' })
        .fromTo(
          '[data-success="tick"]',
          { strokeDashoffset: 40 },
          { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.2'
        )
        .from('[data-success="text"]', { y: 24, autoAlpha: 0, duration: 0.6, stagger: 0.08 }, '-=0.2')
    }, panel)
    return () => ctx.revert()
  }, [status])

  const clearError = (e) => {
    const { name } = e.target
    if (errors[name]) setErrors(({ [name]: _removed, ...rest }) => rest)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = new FormData(formRef.current)
    const data = {
      name: form.get('name') ?? '',
      email: form.get('email') ?? '',
      phone: form.get('phone') ?? '',
      company: form.get('company') ?? '',
      type: form.get('type') ?? '',
      message: form.get('message') ?? '',
      privacy: form.get('privacy') === 'on',
    }

    const nextErrors = validate(data)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      // Pequeño "shake" en el primer campo con error y foco ahí
      const first = formRef.current.querySelector(`[name="${Object.keys(nextErrors)[0]}"]`)
      first?.focus({ preventScroll: true })
      gsap.fromTo(
        first?.closest('label') ?? formRef.current,
        { x: -8 },
        { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' }
      )
      return
    }

    setStatus('sending')
    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
      } else {
        const details = [
          `Nombre: ${data.name}`,
          `Email: ${data.email}`,
          data.phone && `Teléfono: ${data.phone}`,
          data.company && `Empresa / Proyecto: ${data.company}`,
          `Tipo de proyecto: ${data.type}`,
        ].filter(Boolean)
        const body = [...details, '', data.message].join('\n')
        const subject = `Nuevo proyecto: ${data.type} — ${data.name}`
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      }
      setStatus('sent')
    } catch {
      setStatus('failed')
    }
  }

  return (
    <>
      <Header />

      <main ref={rootRef} className={styles.page}>
        <div className={`container ${styles.grid}`}>
          {/* Título */}
          <div className={styles.head}>
            <span className={styles.kicker} data-anim="fade kicker">
              Contacto
            </span>
            <h1 ref={titleRef} className={styles.title}>
              Comencemos tu <span className="accent-blue">proyecto</span>
            </h1>
            <p className={styles.lead} data-anim="fade lead">
              Cuéntanos qué necesitas. Te respondemos en menos de 24 horas.
            </p>
          </div>

          {/* Motivos y otras vías de contacto */}
          <div className={styles.aside}>
            <div className={styles.reasons}>
              <h2 className={styles.blockTitle} data-anim="fade reasonsTitle">
                ¿Por qué contactarnos?
              </h2>
              <ul className={styles.reasonList}>
                {REASONS.map((reason) => (
                  <li key={reason.title} className={styles.reason} data-anim="reason">
                    <span className={styles.check} data-anim="check" aria-hidden="true">
                      ✓
                    </span>
                    <div>
                      <span className={styles.reasonTitle}>{reason.title}</span>
                      <span className={styles.reasonText}>{reason.text}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.other}>
              <h2 className={styles.blockTitle} data-anim="fade other">
                Otras formas de contacto
              </h2>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className={styles.email}
                data-anim="fade other"
                data-cursor-hover
              >
                {CONTACT_EMAIL}
              </a>
              <p className={styles.schedule} data-anim="fade other">
                <span>Horario</span>
                Lun - Vie, 9:00 - 18:00
              </p>
            </div>
          </div>

          {/* Formulario */}
          <div className={styles.card} data-anim="card">
            {status === 'sent' ? (
              <div ref={successRef} className={styles.success} role="status">
                <svg className={styles.successIcon} viewBox="0 0 64 64" fill="none" aria-hidden="true">
                  <circle data-success="circle" cx="32" cy="32" r="31" />
                  <path
                    data-success="tick"
                    d="M20 33 L28 41 L45 24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="40"
                  />
                </svg>
                <h2 className={styles.successTitle} data-success="text">
                  ¡Gracias! <span className="accent-blue">Ya estamos en ello.</span>
                </h2>
                <p className={styles.successText} data-success="text">
                  {FORM_ENDPOINT
                    ? 'Recibimos tu solicitud. Te respondemos en menos de 24 horas.'
                    : `Se abrió tu correo con la solicitud lista para enviar a ${CONTACT_EMAIL}. Te respondemos en menos de 24 horas.`}
                </p>
                <div data-success="text">
                  <Button as="a" href="/">
                    Volver al inicio
                  </Button>
                </div>
              </div>
            ) : (
              <form ref={formRef} className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.row}>
                  <Field label="Nombre completo" name="name" required error={errors.name}>
                    <input
                      name="name"
                      required
                      type="text"
                      autoComplete="name"
                      className={styles.input}
                      onInput={clearError}
                      aria-invalid={!!errors.name}
                      aria-describedby="name-error"
                    />
                  </Field>
                  <Field label="Email" name="email" required error={errors.email}>
                    <input
                      name="email"
                      required
                      type="email"
                      autoComplete="email"
                      className={styles.input}
                      onInput={clearError}
                      aria-invalid={!!errors.email}
                      aria-describedby="email-error"
                    />
                  </Field>
                </div>

                <div className={styles.row}>
                  <Field label="Teléfono" name="phone">
                    <input name="phone" type="tel" autoComplete="tel" className={styles.input} />
                  </Field>
                  <Field label="Empresa / Proyecto" name="company">
                    <input
                      name="company"
                      type="text"
                      autoComplete="organization"
                      className={styles.input}
                    />
                  </Field>
                </div>

                <Field label="Tipo de proyecto" name="type" required error={errors.type}>
                  <select
                    name="type"
                    required
                    defaultValue=""
                    className={`${styles.input} ${styles.select}`}
                    onChange={clearError}
                    aria-invalid={!!errors.type}
                    aria-describedby="type-error"
                  >
                    <option value="" disabled>
                      Selecciona una opción
                    </option>
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Cuéntanos tu proyecto" name="message" required error={errors.message}>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className={`${styles.input} ${styles.textarea}`}
                    onInput={clearError}
                    aria-invalid={!!errors.message}
                    aria-describedby="message-error"
                  />
                </Field>

                <div
                  className={`${styles.privacy} ${errors.privacy ? styles.hasError : ''}`}
                  data-anim="field"
                >
                  <label className={styles.checkbox}>
                    <input
                      name="privacy"
                      type="checkbox"
                      onChange={clearError}
                      aria-invalid={!!errors.privacy}
                      aria-describedby="privacy-error"
                    />
                    <span className={styles.box} aria-hidden="true" />
                    <span>
                      He leído y acepto la{' '}
                      {/* TODO: enlazar la política de privacidad real */}
                      <a href="#" className={styles.inlineLink}>
                        política de privacidad
                      </a>
                      <span className={styles.required}> *</span>
                    </span>
                  </label>
                  <span className={styles.error} id="privacy-error" role={errors.privacy ? 'alert' : undefined}>
                    {errors.privacy}
                  </span>
                </div>

                <div className={styles.submitRow} data-anim="field">
                  <Button type="submit" variant="filled" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Enviando…' : 'Enviar solicitud'}
                  </Button>
                  <p className={styles.note}>
                    * Campos obligatorios. Respetamos tu privacidad y no compartimos tu información.
                  </p>
                </div>

                {status === 'failed' && (
                  <p className={styles.failed} role="alert">
                    No pudimos enviar la solicitud. Prueba de nuevo o escríbenos a{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
