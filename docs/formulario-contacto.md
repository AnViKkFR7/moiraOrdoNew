# Formulario de contacto

El formulario guarda primero la solicitud en `/api/lead`. Solo muestra éxito tras recibir `201`; el aviso por email de la Edge Function es adicional y no cambia una entrega ya confirmada.

## Configuración de Vercel

Configurar en el entorno que se va a desplegar:

- `COMPANY_ID`: UUID de la empresa de esta web en el CRM. Se acepta `VITE_COMPANY_ID` como alternativa para despliegues existentes. El servidor fija la empresa; no acepta que el visitante escoja otra.
- `SUPABASE_URL`: URL de Supabase (solo servidor).
- `SUPABASE_SERVICE_ROLE_KEY`: clave de servidor. Nunca utilizar prefijo `VITE_` para esta clave.
- Opcionales para el aviso por email existente: `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.

Tras cambiar variables, crear un nuevo despliegue. El módulo CRM de la empresa debe estar activo y las migraciones de solicitudes, atribución y consentimiento aplicadas.

El navegador no necesita `VITE_COMPANY_ID` para enviar. Si un bundle antiguo sí lo incluye, el servidor verifica que coincida con la empresa configurada.

## Verificación

- `node --test tests/*.test.js`: petición del cliente sin ID, estados de respuesta, atribución, aislamiento por empresa y módulo CRM. Las pruebas usan datos ficticios y peticiones simuladas.
- `npm run build`: compilación cliente/SSR y prerender.
- En Vercel o con `vercel dev`, un formulario válido debe hacer un POST a `/api/lead`, devolver `201` y aparecer en Solicitudes. `vite` por sí solo no ejecuta las funciones de Vercel.
- `503`: comprobar el ID de empresa y que el módulo CRM esté activo. `500`: comprobar configuración de Supabase, migraciones y conectividad. No registrar el mensaje ni los datos personales en logs.

## Incidencia del 28/10/2026

El bundle público devolvía `{ ok: false, reason: 'invalid' }` sin petición HTTP: `VITE_COMPANY_ID` no estaba disponible al compilar y el optimizador había eliminado el envío. Se traslada la autoridad de empresa al servidor y se declara la función de Vercel con la firma Web Standard `export default { fetch: handler }`. Los tests se ubican fuera de `api/` para que no se desplieguen como endpoints.

## Destinatario del aviso por email

La fuente de la Edge Function está en `supabase/functions/moira-ordo-contact-form/index.ts` en este proyecto. También se actualizó la copia del proyecto anterior `moira_ordo`.

- Destinatario fijo: `info@moiraordo.es`.
- Remitente predeterminado: `Moira Ordo <info@moiraordo.es>`.
- Si se necesita otro remitente de un dominio verificado, configurar `CONTACT_FROM_EMAIL` en los secretos de Supabase (no en Vercel).
- Mantener `RESEND_API_KEY` en los secretos de la función de Supabase.

Antes de enviar: comprobar que `moiraordo.es` aparece como verificado en la cuenta Resend de esa API key. El remitente anterior `onboarding@resend.dev` solo permite pruebas al correo de la propia cuenta.

Publicar este código en Supabase → Edge Functions → `moira-ordo-contact-form` → editor → Deploy. Alternativamente, con una CLI autenticada: `supabase functions deploy moira-ordo-contact-form --project-ref <referencia-del-proyecto>`.

Cambiar las variables de Vercel o desplegar únicamente la web no actualiza esta función. El cambio local no acredita el despliegue ni la recepción del correo.

## Diseño del email de contacto

La plantilla actual utiliza la paleta de la web (azul noche, crema y azul), cabecera de marca, bloque de proyecto, ficha de contacto, mensaje destacado y botón para responder. Incluye texto plano y estilos inline con estructura de tablas y alternativa de botón para Outlook.

La fuente a desplegar es la de este proyecto: `supabase/functions/moira-ordo-contact-form/index.ts`. La copia histórica del proyecto `moira_ordo` no contiene este rediseño.

- Generar una muestra con datos ficticios: `node scripts/preview-contact-email.mjs <ruta-de-salida.html>`.
- Verificar plantilla y envío simulado: `node --test tests/contact-email.test.mjs`.
- Se verifican escape HTML, enlaces de respuesta, omisión de opcionales vacíos, texto plano, destinatario y reply-to. No se envían correos durante estas pruebas.
- La herramienta de navegador bloqueó la apertura del archivo local de vista previa. No se ha completado revisión visual en navegador ni en clientes de correo reales.
- Para aplicar el estilo, volver a desplegar la Edge Function en Supabase. No requiere cambios de variables de entorno.
