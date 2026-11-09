// Avisa a Bing, Yandex y otros buscadores compatibles (IndexNow) de las URLs del sitemap.
// Uso (tras desplegar):  INDEXNOW_KEY=<clave> node scripts/indexnow.mjs
// Antes: generar una clave en https://www.bing.com/indexnow/getstarted y publicar
// public/<clave>.txt con la clave como único contenido (ver docs/guia-seo.md).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const key = process.env.INDEXNOW_KEY
const host = 'moiraordo.es'

if (!key) {
  console.error('Falta INDEXNOW_KEY. Ver docs/guia-seo.md → IndexNow.')
  process.exit(1)
}

const sitemap = fs.readFileSync(path.join(root, 'dist', 'sitemap.xml'), 'utf8')
const urlList = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList }),
})

console.log(`IndexNow: ${urlList.length} URLs enviadas · respuesta ${response.status}`)
if (response.status >= 400) process.exit(1)
