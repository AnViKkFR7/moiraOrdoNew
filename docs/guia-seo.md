# Guía SEO para moiraordo.es

Qué está montado en la web y qué hay que hacer fuera de ella para que Google, Bing y los asistentes de IA la encuentren.

## Lo que ya hace la web

- Cada página pública se genera como HTML completo en el build (`npm run build`) y React la hidrata en el navegador.
- Por página: título, meta descripción, canonical, `hreflang` (es + x-default), Open Graph y Twitter con imagen propia 1200×630 (`public/og`).
- `sitemap.xml`, `robots.txt` y `llms.txt` se generan en cada build (`scripts/prerender.mjs`).
- `robots.txt` solo permite rastrear en producción (`VERCEL_ENV=production`), incluidos los bots de IA. En previews y builds locales bloquea todo y las páginas llevan `noindex`.
- Datos estructurados: negocio (ProfessionalService), web, migas de pan, catálogo de servicios con precio «desde» y FAQ en cada página de servicio.
- Páginas por servicio en `/servicios/:slug`, generadas desde `src/data/services.js`. Para añadir un servicio basta con añadirlo ahí: entra solo en el pie, en el sitemap y en los datos estructurados.
- URL única: https, sin `www` (redirección 301 en `vercel.json`) y sin barra final.
- 404 real (estado 404) con página propia.

## Antes de publicar

1. En Vercel, añadir el dominio `moiraordo.es` y `www.moiraordo.es` (este redirige al primero).
2. Comprobar la configuración del formulario en [formulario-contacto.md](./formulario-contacto.md): `COMPANY_ID` (o `VITE_COMPANY_ID`), `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` en servidor. El aviso por email utiliza opcionalmente `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
3. Tras el primer despliegue, abrir `https://moiraordo.es/robots.txt` y confirmar que pone `Allow: /`.

## Google Search Console

1. Entrar en <https://search.google.com/search-console> y añadir la propiedad de tipo **Dominio** `moiraordo.es`.
2. Verificarla con el registro TXT que indica Google en el DNS del dominio.
3. En **Sitemaps**, enviar `https://moiraordo.es/sitemap.xml`.
4. Con **Inspección de URLs**, pedir la indexación de la home, `/servicios` y `/proyectos`.
5. Revisar una vez al mes: Páginas indexadas, Rendimiento (consultas y clics) y Experiencia (Core Web Vitals).

## Bing Webmaster Tools

1. Entrar en <https://www.bing.com/webmasters> e importar el sitio desde Search Console (es lo más rápido).
2. Enviar el mismo sitemap. Bing alimenta también a ChatGPT Search y Copilot.

## IndexNow (avisos instantáneos a Bing, Yandex…)

1. Generar una clave en <https://www.bing.com/indexnow/getstarted>.
2. Crear `public/<clave>.txt` con la clave como único contenido y desplegar.
3. Al publicar cambios importantes, avisar con:
   `https://api.indexnow.org/indexnow?url=https://moiraordo.es/servicios&key=<clave>`

## Perfil de Empresa de Google

1. Crear o reclamar el perfil en <https://business.google.com> con el nombre «Moira Ordo».
2. Categoría principal: «Diseñador de sitios web». Zona de servicio: España (si no se atiende en local, ocultar la dirección).
3. Misma web, email y descripción que en la web. Subir logo (`public/icons/icon-512.png`) y fotos del equipo y proyectos.
4. Publicar una novedad al mes (proyecto nuevo, servicio…).

## Apple Business Connect

1. Dar de alta el negocio en <https://businessconnect.apple.com> con los mismos datos que en Google (aparece en Mapas, Siri y Spotlight).

## Reseñas

- Pedir reseña en Google a cada cliente al cerrar un proyecto (enlace corto desde el Perfil de Empresa).
- Responder todas, también las negativas, en menos de una semana.

## Revisión mensual en asistentes de IA

Una vez al mes, preguntar en ChatGPT, Claude, Perplexity, Gemini y Copilot cosas como:

- «¿Quién hace webs a medida con CRM en Vilanova i la Geltrú?»
- «Estudios de diseño web en Barcelona con precio desde 199 €»
- «¿Qué es Moira Ordo?»

Anotar si nos citan y con qué datos. Si algo sale mal o desactualizado, corregirlo en la web (y en `src/data/services.js` o `src/routes.jsx`) para que el siguiente rastreo lo recoja.
