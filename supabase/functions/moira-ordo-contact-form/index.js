// Generado desde index.ts: versión JavaScript para el editor de Supabase.
const escapeHtml = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
function buildContactEmail(details) {
  const { name, email, phone, company, message, language, projectTypeLabel } = details;
  const project = projectTypeLabel || "Consulta general";
  const subject = `Nueva solicitud \xB7 ${name} \xB7 ${project}`.replace(/[\r\n]+/g, " ");
  const replyHref = escapeHtml(`mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: Tu proyecto con Moira Ordo \xB7 ${project}`)}`);
  const emailHref = escapeHtml(`mailto:${encodeURIComponent(email)}`);
  const phoneNumber = phone.replace(/[^+0-9]/g, "");
  const labelStyle = "margin:0 0 7px;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;line-height:16px;letter-spacing:1.6px;text-transform:uppercase;color:#6b6e7b;";
  const valueStyle = "margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;color:#00051e;overflow-wrap:anywhere;word-break:break-word;";
  const companyRow = company ? `<tr><td class="side-pad" style="padding:0 38px 20px;"><p style="${labelStyle}">Empresa / Proyecto</p><p style="${valueStyle}">${escapeHtml(company)}</p></td></tr>` : "";
  const phoneRow = phone ? `<tr><td class="side-pad" style="padding:0 38px 20px;"><p style="${labelStyle}">Tel\xE9fono</p><p style="${valueStyle}">${phoneNumber ? `<a href="tel:${escapeHtml(phoneNumber)}" style="color:#1f63cc;text-decoration:underline;">${escapeHtml(phone)}</a>` : escapeHtml(phone)}</p></td></tr>` : "";
  const html = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>Nueva solicitud \xB7 Moira Ordo</title>
  <style>
    body,table,td,a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table,td { mso-table-lspace:0pt; mso-table-rspace:0pt; }
    table { border-collapse:collapse; }
    a:focus-visible { outline:2px solid #4692ff; outline-offset:3px; }
    @media screen and (max-width:640px) {
      .outer-pad { padding:16px 10px !important; }
      .side-pad { padding-left:24px !important; padding-right:24px !important; }
      .hero-title { font-size:34px !important; line-height:39px !important; }
      .brand { font-size:28px !important; }
      .action-link { display:block !important; text-align:center !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#efefed;color:#00051e;">
  <div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${escapeHtml(name)} \xB7 ${escapeHtml(project)}. Una nueva consulta desde moiraordo.es.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#efefed;">
    <tr><td class="outer-pad" align="center" style="padding:40px 20px;">
      <!--[if mso]><table role="presentation" width="600" align="center"><tr><td><![endif]-->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">
        <tr><td class="side-pad" bgcolor="#00051e" style="padding:28px 38px;border-radius:18px 18px 0 0;background-color:#00051e;">
          <a href="https://moiraordo.es" class="brand" style="font-family:Georgia,'Times New Roman',serif;font-size:32px;line-height:38px;letter-spacing:-1.5px;color:#fcfbf7;text-decoration:none;">moira<span style="color:#82daff;">ordo</span></a>
          <p style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:10px;line-height:16px;letter-spacing:1.7px;text-transform:uppercase;color:#c7ccda;">Dise\xF1o &amp; desarrollo digital</p>
        </td></tr>
        <tr><td class="side-pad" bgcolor="#fcfbf7" style="padding:36px 38px 26px;background-color:#fcfbf7;">
          <p style="margin:0 0 18px;font-family:Arial,Helvetica,sans-serif;font-size:10px;line-height:16px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:#1f63cc;">Formulario de contacto / Nueva solicitud</p>
          <h1 class="hero-title" style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:43px;line-height:49px;font-weight:400;letter-spacing:-1.7px;color:#00051e;">Hay un nuevo<br />proyecto en camino<span style="color:#1f63cc;">.</span></h1>
          <p style="margin:18px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:23px;color:#585b6a;">${escapeHtml(name)} te ha escrito desde la web. Aqu\xED tienes su consulta y los datos para continuar la conversaci\xF3n.</p>
        </td></tr>
        <tr><td class="side-pad" bgcolor="#fcfbf7" style="padding:0 38px 28px;background-color:#fcfbf7;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td bgcolor="#e9f2ff" style="padding:16px 20px;border-left:3px solid #4692ff;background-color:#e9f2ff;">
            <p style="margin:0 0 7px;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;line-height:16px;letter-spacing:1.6px;text-transform:uppercase;color:#6b6e7b;color:#1f63cc;">Le interesa</p>
            <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;color:#00051e;overflow-wrap:anywhere;word-break:break-word;font-weight:700;">${escapeHtml(project)}</p>
          </td></tr></table>
        </td></tr>
        <tr><td class="side-pad" bgcolor="#ffffff" style="padding:28px 38px 22px;border-top:1px solid #e8e8ec;background-color:#ffffff;">
          <p style="margin:0 0 7px;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;line-height:16px;letter-spacing:1.6px;text-transform:uppercase;color:#6b6e7b;">Contacto</p>
          <p style="margin:0 0 5px;font-family:Georgia,'Times New Roman',serif;font-size:25px;line-height:32px;color:#00051e;overflow-wrap:anywhere;word-break:break-word;">${escapeHtml(name)}</p>
          <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;color:#00051e;overflow-wrap:anywhere;word-break:break-word;"><a href="${emailHref}" style="color:#1f63cc;text-decoration:underline;">${escapeHtml(email)}</a></p>
        </td></tr>
        <tr><td bgcolor="#ffffff" style="background-color:#ffffff;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${companyRow}${phoneRow}</table>
        </td></tr>
        <tr><td class="side-pad" bgcolor="#ffffff" style="padding:4px 38px 28px;background-color:#ffffff;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td bgcolor="#f7f6f2" style="padding:22px 24px;border:1px solid #eceae3;background-color:#f7f6f2;">
            <p style="margin:0 0 7px;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;line-height:16px;letter-spacing:1.6px;text-transform:uppercase;color:#6b6e7b;">Su mensaje</p>
            <div style="margin:12px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:26px;color:#252a3c;overflow-wrap:anywhere;word-break:break-word;">${escapeHtml(message).replace(/\r\n|\r|\n/g, "<br />")}</div>
          </td></tr></table>
        </td></tr>
        <tr><td class="side-pad" bgcolor="#ffffff" style="padding:0 38px 30px;background-color:#ffffff;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr><td align="left">
            <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${replyHref}" style="height:48px;v-text-anchor:middle;width:218px;" arcsize="50%" stroke="f" fillcolor="#00051e"><w:anchorlock/><center style="color:#fcfbf7;font-family:Arial,sans-serif;font-size:14px;font-weight:bold;">Responder a la consulta</center></v:roundrect><![endif]-->
            <!--[if !mso]><!--><a class="action-link" href="${replyHref}" style="display:inline-block;padding:15px 24px;border-radius:30px;background-color:#00051e;color:#fcfbf7;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;line-height:20px;text-decoration:none;mso-hide:all;">Responder a la consulta &nbsp; &rarr;</a><!--<![endif]-->
          </td></tr></table>
          <p style="margin:14px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:18px;color:#585b6a;">Tambi\xE9n puedes responder directamente a este email: la respuesta ir\xE1 a ${escapeHtml(email)}.</p>
        </td></tr>
        <tr><td class="side-pad" bgcolor="#fcfbf7" style="padding:22px 38px;border-top:1px solid #e8e8ec;border-radius:0 0 18px 18px;background-color:#fcfbf7;">
          <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:10px;line-height:18px;color:#6b6e7b;">Aviso interno de Moira Ordo \xB7 Contacto web${language ? ` \xB7 Idioma: ${escapeHtml(language)}` : ""}<br /><a href="https://moiraordo.es" style="color:#585b6a;text-decoration:none;">moiraordo.es</a> &nbsp; / &nbsp; info@moiraordo.es</p>
        </td></tr>
      </table>
      <!--[if mso]></td></tr></table><![endif]-->
      <p style="margin:20px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:10px;line-height:17px;color:#777a86;">Moira Ordo \xB7 Dise\xF1o con intenci\xF3n. Tecnolog\xEDa a medida.</p>
    </td></tr>
  </table>
</body>
</html>`;
  const text = [
    "MOIRA ORDO \xB7 NUEVA SOLICITUD",
    "",
    `Tipo de proyecto: ${project}`,
    `Nombre: ${name}`,
    `Email: ${email}`,
    phone && `Tel\xE9fono: ${phone}`,
    company && `Empresa / Proyecto: ${company}`,
    "",
    "MENSAJE",
    message,
    "",
    `Responder a: ${email}`,
    "https://moiraordo.es"
  ].filter((value) => value !== false && value !== void 0).join("\n");
  return { subject, html, text };
}
Deno.serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
  };
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const fromEmail = Deno.env.get("CONTACT_FROM_EMAIL") || "Moira Ordo <info@moiraordo.es>";
  const toEmail = "info@moiraordo.es";
  if (!resendApiKey) {
    return new Response(JSON.stringify({ error: "Missing RESEND_API_KEY." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
  try {
    const payload = await req.json();
    const name = String(payload.name ?? "").trim();
    const email = String(payload.email ?? "").trim();
    const phone = String(payload.phone ?? "").trim();
    const company = String(payload.company ?? "").trim();
    const message = String(payload.message ?? "").trim();
    const language = String(payload.language ?? "").trim();
    const projectType = payload.projectType ?? {};
    const projectTypeLabel = String(projectType.label ?? projectType.value ?? "").trim();
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    const { subject, html, text } = buildContactEmail({
      name,
      email,
      phone,
      company,
      message,
      language,
      projectTypeLabel
    });
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject,
        html,
        text,
        reply_to: email
      })
    });
    if (!response.ok) {
      const errorText = await response.text();
      return new Response(JSON.stringify({ error: errorText }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
export {
  buildContactEmail
};
