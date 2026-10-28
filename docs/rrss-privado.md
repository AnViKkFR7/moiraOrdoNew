# Acceso privado al contenido de Instagram

## URL de entrada

`https://moiraordo.es/srr?key=TU_CLAVE`

No hay enlaces en la navegación pública ni entradas en el sitemap. La galería, el calendario, los textos, los logos y las imágenes se sirven desde una función que valida el acceso antes de devolver cada recurso.

## Configuración de Vercel

1. Añadir `RRSS_ACCESS_KEY` en Settings → Environment Variables → Production, con la clave elegida. Usar una clave larga y propia para este acceso.
2. Incluir en el despliegue los archivos nuevos de `api/`, `server/`, `scripts/`, los cambios de dependencias y `vercel.json`.
3. Crear un nuevo despliegue y abrir la URL de entrada desde el móvil.

La clave no se incorpora al JavaScript del navegador. Quien conozca la clave podrá acceder. Al entrar, se retira de la URL y se crea una cookie firmada, HttpOnly y Secure durante 7 días. Al cambiar la variable y desplegar, las sesiones firmadas con la clave anterior dejan de funcionar.

Sin configuración, sin cookie válida o con una clave incorrecta, la función responde 404 sin devolver el contenido. Todas sus respuestas llevan no-store y noindex; los enlaces externos no reciben la URL como referrer.

## Contenido y actualizaciones

- `rrss/` sigue ignorada por Git: contiene el entorno de trabajo, fuentes y generadores.
- `server/private/rrss.zip` contiene solo el pack de publicación, con imágenes, documentos HTML y fuentes necesarias. Es un artefacto versionable para el despliegue y no contiene la clave.
- El pack no se copia a `public/` ni a `dist/`. `vercel.json` lo incluye únicamente en la función `api/srr.js`.
- Tras regenerar o editar el banco editorial local, actualizar `rrss/PACK_PUBLICACION.zip` y ejecutar `npm run rrss:package` antes del nuevo despliegue. El build de Vercel utiliza el paquete ya preparado; no depende de la carpeta local ignorada.
- El ZIP completo se descarga por streaming. Los PNG se sirven individualmente con autorización.

## Uso desde el móvil

1. Abrir la URL con la clave y guardar el acceso a la galería en favoritos.
2. Entrar en Calendario y elegir el lunes de inicio. Esa fecha se recuerda en ese navegador.
3. Usar «Ver semana actual», abrir la pieza del día y descargar su PNG o copiar el caption.
4. En un carrusel, descargar las cinco imágenes en su orden.

No se publica ni se programa contenido automáticamente en Instagram.

## Desarrollo y validación

En `.env.local`, definir `RRSS_ACCESS_KEY` y ejecutar `npm run dev`; la ruta `/srr` está disponible también en el servidor local. Solo ese middleware de desarrollo usa una cookie sin Secure para permitir HTTP local; producción utiliza la cookie segura.

`node --test tests/srr.test.js` comprueba denegación de páginas y archivos, entrada con clave, firma y caducidad de cookies, rotación de clave, rutas con y sin .html, rewrites, PNG reales, HEAD, bloqueo de recorridos de directorio y descarga ZIP por streaming.

El cambio requiere despliegue de la web y su función de Vercel. No requiere modificar Supabase ni Resend.
