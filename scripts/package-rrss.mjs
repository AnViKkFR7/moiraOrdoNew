// Copia únicamente el pack editorial; nunca publica el directorio de trabajo ni sus herramientas.
import { copyFile, mkdir, readFile } from 'node:fs/promises'
import { unzipSync } from 'fflate'
const source = new URL('../rrss/PACK_PUBLICACION.zip', import.meta.url)
const target = new URL('../server/private/rrss.zip', import.meta.url)
const archive = await readFile(source)
const names = []
unzipSync(archive, { filter: file => { names.push(file.name); return false } })
if (!names.includes('00_EMPIEZA_AQUI.html') || !names.includes('08_calendario/CALENDARIO.html')) throw new Error('El pack no contiene la galería y el calendario HTML')
if (names.some(name => /(?:^|\/)(?:\.env[^/]*|_generador)(?:\/|$)/.test(name))) throw new Error('El pack incluye archivos de trabajo no publicables')
await mkdir(new URL('../server/private/', import.meta.url), { recursive: true })
await copyFile(source, target)
console.log(`Pack privado preparado: ${names.length} archivos. No se copia a public/ ni a dist/.`)
