import fs from 'node:fs/promises'
import vm from 'node:vm'
import { transform } from 'esbuild'

const source = await fs.readFile(new URL('../supabase/functions/moira-ordo-contact-form/index.ts', import.meta.url), 'utf8')
const { code } = await transform(source, { loader: 'ts', format: 'cjs', target: 'es2022' })
const context = { exports: {}, module: { exports: {} }, Deno: { serve() {} } }
vm.runInNewContext(code, context)
const { buildContactEmail } = context.module.exports
const { html } = buildContactEmail({
  name: 'Clara Vidal', email: 'clara@example.com', phone: '+34 600 000 000',
  company: 'Estudio Noma', projectTypeLabel: 'Nueva página web', language: 'es',
  message: 'Hola, equipo:\n\nEstamos preparando la nueva web de nuestro estudio y nos gustaría trabajar con vosotros. Buscamos una página que refleje nuestra identidad, muestre nuestros proyectos y nos permita gestionar el contenido.\n\n¿Podemos organizar una primera llamada esta semana?\n\nMuchas gracias,\nClara',
})
const output = process.argv[2]
if (!output) throw new Error('Indica la ruta de salida para la vista previa HTML')
await fs.writeFile(output, html)
console.log(`Vista previa creada: ${output}`)
