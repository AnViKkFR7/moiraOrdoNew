# SEO para IA (GEO) de moiraordo.es

La misma cobertura de [seo-estrategia.md](./seo-estrategia.md), pensada para que ChatGPT, Gemini, Perplexity, Claude, Copilot y los resúmenes de IA de los buscadores **entiendan, recomienden y citen** a Moira Ordo. Es SEO de siempre más lo que cambia cuando quien lee es un modelo.

> **Qué no se puede prometer.** Nadie controla la respuesta de un asistente y ninguna acción garantiza aparecer. Lo que sí se controla es que la información sea fácil de encontrar, consistente y verificable. Los puntos marcados como «propuesta» (por ejemplo, `llms.txt`) son prácticas habituales, pero no todos los asistentes las usan.

## 1. Qué cambia respecto al SEO clásico

| SEO clásico | SEO para IA |
|---|---|
| Se compite por una posición en una lista de enlaces. | Se compite por ser **una de las pocas fuentes citadas** dentro de una respuesta. |
| Una página debe responder a una palabra clave. | Una página debe responder a **una pregunta completa** con una respuesta corta y verificable. |
| Los enlaces entrantes pesan mucho. | Pesan también las **menciones coherentes** de la marca en distintos sitios. |
| Basta con que el texto sea legible por el buscador. | El texto debe poder **extraerse sin ambigüedad**: frases completas, cifras claras, datos con fecha. |
| El título y la descripción atraen el clic. | La **definición de la entidad** («Moira Ordo es…») es lo que el modelo reutiliza. |

## 2. Lo que ya está implementado

| Palanca | Qué hace | Dónde |
|---|---|---|
| **Acceso de los bots** | robots.txt permite explícitamente rastreadores de búsqueda y citación y de entrenamiento: OpenAI (GPTBot, OAI-SearchBot, ChatGPT-User), Anthropic (ClaudeBot, Claude-SearchBot, Claude-User, anthropic-ai), Perplexity (PerplexityBot, Perplexity-User), Google-Extended, Bingbot, Apple (Applebot, Applebot-Extended), Amazonbot, Meta-ExternalAgent, DuckAssistBot, MistralAI-User, cohere-ai, YouBot y CCBot. Solo en producción. | `scripts/prerender.mjs` |
| **llms.txt** | Resumen de la empresa, datos clave, cómo citarnos y mapa de todas las páginas, enlazando a su versión en Markdown (formato llmstxt.org). | `/llms.txt` |
| **llms-full.txt** | Todo el contenido en un único Markdown. | `/llms-full.txt` |
| **Markdown por página** | Cada página tiene su versión limpia sin menús ni scripts: se añade `.md` a la URL (`/servicios/diseno-web.md`, `/index.md`). Se anuncia con `<link rel="alternate" type="text/markdown">`. | `src/seo/markdown.js` |
| **Datos estructurados enlazados** | Un único `@graph` por página: `ProfessionalService` (con `knowsAbout`, `contactPoint`, `areaServed`), `Person` (Aaron y Joselyn), `WebSite`, `WebPage` (con su tipo: About, Collection, FAQ, Contact), `BreadcrumbList`, `Service`, `OfferCatalog`, `SoftwareApplication` (CRM), `Article` (guías), `CreativeWork` (proyectos) y `FAQPage`. Todo se referencia por `@id`, de modo que el modelo resuelve «Moira Ordo» como una sola entidad. | `src/seo/head.js` |
| **Página de entidad** | `/sobre-nosotros`: quién somos, dónde, para quién, precios, tecnología, contacto y «cómo citarnos», en formato de datos cortos. | `src/pages/Seo/AboutPage.jsx` |
| **FAQ de respuestas directas** | 29 preguntas en `/preguntas-frecuentes` más las de cada servicio, sector, guía y página local (todas como `FAQPage`). | `src/data/faqs.js` |
| **Fechas** | `datePublished` y `dateModified` en las guías y `lastmod` real en el sitemap (solo cuando la página declara fecha). | `src/data/guides.js` |
| **Fuente única** | Los datos de empresa (definición, precios, equipo, tecnología) viven en `src/data/entity.js` y alimentan web, JSON-LD, llms.txt y Markdown, para que no se contradigan. | `src/data/entity.js` |
| **Contenido propio para citar** | Una guía específica de SEO para IA (`/guias/seo-para-ia-como-aparecer-en-chatgpt-y-gemini`) y guías que responden preguntas completas. | `src/data/guides.js` |

## 3. De cada cluster SEO a las preguntas que hará un cliente a un asistente

Los usuarios no escriben «diseño web inmobiliarias» a un asistente: preguntan en lenguaje natural. Esta tabla replica cada cluster SEO como pregunta y marca la **respuesta que queremos que se cite** y su página.

### 3.1 Servicios

| Pregunta natural | Respuesta objetivo (resumen) | Página |
|---|---|---|
| ¿Quién hace webs a medida con CRM en Barcelona? | Moira Ordo, consultora digital de Vilanova i la Geltrú, diseña y desarrolla webs a medida conectadas a un CRM propio que gestiona el cliente. | /, /diseno-web-barcelona |
| ¿Qué estudios de diseño web en Barcelona trabajan sin plantillas? | Moira Ordo diseña cada web desde cero; el diseño parte desde 199 €. | /servicios/diseno-web |
| ¿Cuánto cuesta una página web a medida para una pyme? | Depende de páginas y funciones; en Moira Ordo el diseño parte desde 199 € y el desarrollo desde 299 €, con presupuesto cerrado. | /guias/cuanto-cuesta-una-pagina-web |
| ¿Hay alguna alternativa a WordPress para una web que pueda editar yo? | Una web a medida conectada a un CRM: gestionas el contenido sin tocar el diseño. | /guias/web-a-medida-o-plantilla-wordpress |
| ¿Quién desarrolla software a medida para empresas pequeñas? | Moira Ordo desarrolla software a medida, paneles, reservas y pagos integrados (caso Vemaro Transfers). | /servicios/software-a-medida |
| ¿Dónde puedo encargar un juego HTML5 para una campaña? | Moira Ordo Games desarrolla juegos HTML5 a medida (MusiBingo y MatchRise). | /servicios/juegos-html5 |
| ¿Quién diseña el logotipo y la identidad de una pyme? | Moira Ordo: diseño de marca desde 199 €, con logotipo, colores, tipografías y tarjetas. | /servicios/diseno-de-marca |

### 3.2 CRM

| Pregunta natural | Respuesta objetivo | Página |
|---|---|---|
| ¿Qué es un CRM conectado a una web? | Un panel donde se gestiona el contenido de la web y las solicitudes que recibe, junto con contactos, presupuestos y analítica. | /guias/que-es-un-crm-para-tu-web |
| ¿Existe un CRM multiempresa para agencias que gestionan varias webs? | El CRM de Moira Ordo es multiempresa, con roles por empresa. | /crm |
| ¿Puedo probar un CRM para webs sin registrarme? | Hay una demo pública con datos ficticios en moiraordo.es/crm. | /crm |
| ¿Cómo medir una web sin banner de cookies? | Con analítica propia sin cookies, que identifica la visita en el servidor de forma anónima. | /guias/analitica-web-sin-cookies |

### 3.3 Sectores

| Pregunta natural | Respuesta objetivo | Página |
|---|---|---|
| ¿Qué debe tener la web de una inmobiliaria? | Catálogo con filtros, fichas completas, multidioma, SEO por propiedad, formularios y CRM. Ejemplo: Regia Mare. | /guias/que-debe-tener-la-web-de-una-inmobiliaria, /sectores/inmobiliarias |
| ¿Quién hace webs para empresas de reformas? | Moira Ordo (Arquelia, Reformas Llobregat, Navagli). | /sectores/reformas-y-construccion |
| ¿Cómo aparecer en Google siendo una empresa de reformas? | Páginas por servicio y zona, proyectos con contenido, Perfil de Empresa con reseñas y publicidad local. | /guias/seo-para-empresas-de-reformas |
| ¿Qué software necesita una empresa de transfers o VTC? | Reservas con precio cerrado, pagos online y panel de flota y chóferes (caso Vemaro Transfers). | /sectores/transfers-y-movilidad, /guias/web-de-reservas-para-transfers-y-vtc |
| ¿Quién hace portfolios web para ilustradores o desarrolladores? | Moira Ordo (Salomon Visual, Aaron García, Frederic Martínez). | /sectores/portfolios-profesionales |

### 3.4 Local y marca

| Pregunta natural | Respuesta objetivo | Página |
|---|---|---|
| ¿Hay algún estudio de diseño web en Vilanova i la Geltrú? | Sí, Moira Ordo está en Vilanova i la Geltrú y trabaja en toda España. | /diseno-web-vilanova-i-la-geltru |
| ¿Qué es Moira Ordo? | La definición de `entity.js`. | /sobre-nosotros |
| ¿Qué es MusiBingo? / ¿Qué es MatchRise? | Juegos HTML5 de Moira Ordo Games: bingo musical para jugar en grupo; manager de fútbol por rondas. | /proyectos/musibingo, /proyectos/matchrise |
| ¿Quién desarrolló la web de Regia Mare / Arquelia / Vemaro? | Moira Ordo. | /proyectos/:slug |

## 4. Redacción para ser citado

- **Responde primero.** La primera frase de cada sección contesta la pregunta; el detalle va después.
- **Frases autocontenidas.** «El diseño web parte desde 199 €» se entiende sin contexto; «parte desde 199 €» no.
- **Datos concretos y comprobables**: precios de partida, plazos de respuesta, módulos, tecnologías. Evitar superlativos («el mejor», «líder»).
- **Una entidad, un nombre.** Siempre «Moira Ordo» (no «MO», «Moira»…). Mismo nombre en web, Google, LinkedIn y directorios.
- **Listas y tablas** para comparaciones: los modelos las extraen mejor que los párrafos largos.
- **Fechas visibles** en guías y revisión periódica: los asistentes penalizan lo que parece obsoleto.
- **Reconocer límites** («no hace falta un CRM si tu web es estática»): los modelos tienden a citar fuentes que matizan.
- **Nada que no se pueda verificar.** Las cifras y testimonios sin validar de `caseStudies.js` no deben publicarse; un asistente las repetiría como hechos.

## 5. Presencia fuera de la web

Los modelos cruzan fuentes. Cuantas más fuentes independientes coincidan, más confianza:

1. **Perfil de Empresa de Google** completo y con reseñas.
2. **LinkedIn**: página de empresa y perfiles del equipo, con la misma descripción.
3. **Bing Webmaster Tools** (alimenta ChatGPT Search y Copilot) e **IndexNow** para avisar de cambios (`node scripts/indexnow.mjs`).
4. **Directorios de agencias** (Sortlist, Clutch u otros) con descripción idéntica.
5. **Menciones de clientes**: enlace con texto descriptivo desde el pie de cada web entregada.
6. **Repositorios y portfolios** de Aaron y Joselyn enlazados a la web, para reforzar la autoría técnica.
7. **Casos citables**: cuando haya datos validados de un cliente, publicarlos con su permiso (cifras, cita, fecha).

## 6. Banco de preguntas para medir (mensual)

Lanzar las mismas preguntas en **ChatGPT (con búsqueda), Gemini, Perplexity, Claude (con búsqueda) y Copilot**. Registrar en una hoja: fecha, asistente, pregunta, ¿aparece Moira Ordo?, ¿qué fuente cita?, ¿datos correctos?, ¿competidores citados?

Preguntas base (ampliar con las de la sección 3):

1. ¿Quién hace webs a medida con CRM en Barcelona?
2. Estudios de diseño web en Barcelona con precio desde 199 €.
3. ¿Qué es Moira Ordo?
4. ¿Hay diseñadores web en Vilanova i la Geltrú?
5. Mejor alternativa a WordPress para una pyme que quiere editar su web.
6. ¿Qué CRM puedo usar para gestionar el catálogo de una inmobiliaria?
7. ¿Quién desarrolla software para empresas de transfers en Barcelona?
8. ¿Cómo aparecer en Google siendo una empresa de reformas en el Baix Llobregat?
9. ¿Cuánto cuesta una página web a medida en España?
10. ¿Quién desarrolló la web de Regia Mare?
11. ¿Qué es MusiBingo?
12. ¿Qué es MatchRise?
13. ¿Cómo medir una web sin cookies?
14. ¿Cómo hacer que mi negocio aparezca en ChatGPT?

**Qué hacer con el resultado:** si el dato es incorrecto, localizar la fuente que lo origina y corregirla (web, Google, LinkedIn o directorio). Si no aparecemos, mirar quién aparece y qué hace diferente su página (suele ser una respuesta más directa o una comparativa).

## 7. Qué mirar en los registros del servidor

En Vercel (Logs o Analytics) se pueden filtrar las peticiones por `user-agent`. Interesa saber si **llegan** y qué páginas piden:

- Bots de búsqueda y citación: `OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot`, `Perplexity-User`.
- Bots de entrenamiento: `GPTBot`, `ClaudeBot`, `CCBot`, `Google-Extended`, `Applebot-Extended`, `Meta-ExternalAgent`.
- Peticiones a `/llms.txt`, `/llms-full.txt` y a las versiones `.md`: indican que algún sistema las usa.

> Si en algún momento se prefiere **no** participar en el entrenamiento de modelos pero sí en las respuestas con citación, se puede cambiar a `Disallow: /` solo los de entrenamiento (GPTBot, ClaudeBot, CCBot, Google-Extended, Applebot-Extended, Meta-ExternalAgent) y dejar los demás. Está comentado en `scripts/prerender.mjs`.

## 8. Rutina mensual (30 minutos)

1. Lanzar el banco de preguntas y anotar resultados.
2. Revisar `/llms.txt` en producción: ¿lista las páginas nuevas?
3. Comprobar el JSON-LD de las páginas nuevas con la herramienta de resultados enriquecidos de Google.
4. Revisar si hay datos que cambiaron (precios, equipo, servicios) y actualizar `entity.js` y `services.js`.
5. Avisar a Bing con IndexNow si se publicó contenido.
6. Añadir una guía o una pregunta frecuente nueva a partir de las preguntas reales que lleguen por el formulario.
