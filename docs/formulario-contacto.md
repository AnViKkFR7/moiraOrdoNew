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
