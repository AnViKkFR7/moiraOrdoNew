// Textos legales (Política de Privacidad, Aviso Legal y Política de Cookies).
// Revisados el 16/10/2026 frente a RGPD (UE 2016/679), LOPDGDD (LO 3/2018), LSSI-CE (Ley 34/2002)
// y la Guía sobre el uso de las cookies de la AEPD. Si cambia algo de la web (cookies, proveedores,
// formulario), hay que actualizarlos y la fecha de abajo.
//
// PENDIENTE para el titular: el art. 10 de la LSSI exige indicar el domicilio completo
// (calle, número, código postal). Ahora solo figura la localidad.

export const LEGAL_UPDATED = 'Última actualización: 16/10/2026'

export const LEGAL_PAGES = {
  privacidad: {
    title: 'Política de Privacidad',
    intro:
      'En esta política te explicamos, de forma clara, qué datos personales tratamos cuando nos escribes a través del formulario o navegas por esta web, para qué los usamos y qué derechos tienes.',
    sections: [
      {
        title: 'Responsable del tratamiento',
        paragraphs: [
          'Titular: Aaron García Sánchez (NIF 53321515V), que opera bajo el nombre comercial Moira Ordo.',
          'Domicilio: Vilanova i la Geltrú, España.',
          'Email de contacto: info@moiraordo.es.',
        ],
      },
      {
        title: 'Datos que tratamos',
        paragraphs: [
          'Los que nos facilitas en el formulario de contacto: nombre, email, teléfono (opcional), empresa (opcional), tipo de proyecto y el mensaje que escribes.',
          'Datos técnicos de la visita (como la dirección IP en los registros del servidor) que se explican en el apartado «Navegación y medición de audiencia».',
          'No te pedimos datos especiales (salud, ideología, etc.) ni te pedimos ningún dato bancario. Te rogamos que no los incluyas en el mensaje.',
        ],
      },
      {
        title: 'Finalidades del tratamiento',
        paragraphs: [
          'Gestionar las solicitudes de contacto que recibimos a través del formulario y responderte.',
          'Preparar propuestas o presupuestos relacionados con nuestros servicios, si nos lo pides.',
          'Mantener las comunicaciones necesarias sobre el proyecto o servicio que solicites.',
          'No enviamos publicidad ni boletines si no nos lo has pedido expresamente, no elaboramos perfiles y no tomamos decisiones automatizadas.',
        ],
      },
      {
        title: 'Legitimación',
        paragraphs: [
          'La base legal es tu consentimiento (art. 6.1.a RGPD), que nos das al marcar la casilla y enviar el formulario. Puedes retirarlo en cualquier momento escribiendo a info@moiraordo.es, sin que ello afecte a lo ya tratado.',
          'Cuando solicitas un presupuesto o un servicio, también tratamos tus datos para aplicar medidas precontractuales a petición tuya (art. 6.1.b RGPD).',
        ],
      },
      {
        title: '¿Es obligatorio facilitar los datos?',
        paragraphs: [
          'El nombre, el email, el tipo de proyecto y el mensaje son necesarios para poder responderte; sin ellos no podemos atender tu solicitud. El teléfono y la empresa son opcionales.',
        ],
      },
      {
        title: 'Conservación de los datos',
        paragraphs: [
          'Si tu consulta no llega a convertirse en un encargo, conservamos tus datos mientras la atendemos y hasta 12 meses después de la última comunicación; pasado ese plazo los eliminamos.',
          'Si llegamos a trabajar juntos, los conservamos mientras dure la relación y, después, debidamente bloqueados, durante los plazos de prescripción de las obligaciones legales que nos afectan (con carácter general, entre 4 y 6 años en materia fiscal y mercantil).',
        ],
      },
      {
        title: 'Destinatarios',
        paragraphs: [
          'No cedemos tus datos a terceros, salvo obligación legal.',
          'Para prestar el servicio utilizamos proveedores que tratan datos por nuestra cuenta, como encargados del tratamiento y con el correspondiente contrato (art. 28 RGPD): Vercel Inc. (alojamiento de la web), Supabase Inc. (procesamiento del envío del formulario), Resend (envío del email de aviso) y nuestro proveedor de correo electrónico, donde recibimos las solicitudes.',
        ],
      },
      {
        title: 'Transferencias internacionales',
        paragraphs: [
          'Algunos de estos proveedores tienen su sede en Estados Unidos, por lo que tus datos pueden tratarse fuera del Espacio Económico Europeo. Estas transferencias se realizan con las garantías del capítulo V del RGPD: una decisión de adecuación de la Comisión Europea (como el Marco de Privacidad de Datos UE-EE. UU.) o las cláusulas contractuales tipo.',
        ],
      },
      {
        title: 'Navegación y medición de audiencia',
        paragraphs: [
          'La web está alojada en Vercel, que registra los datos técnicos necesarios para entregarte las páginas y mantener su seguridad (por ejemplo, la dirección IP, la fecha y la página solicitada). La base legal es nuestro interés legítimo en que la web funcione y sea segura (art. 6.1.f RGPD).',
          'Medimos cuántas personas visitan la web y cómo de rápido carga con Vercel Web Analytics y Vercel Speed Insights. No usan cookies, no guardan nada en tu dispositivo, no te identifican y no te siguen entre webs. Más información en la Política de Cookies.',
        ],
      },
      {
        title: 'Derechos',
        paragraphs: [
          'Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad escribiendo a info@moiraordo.es e indicando el derecho que quieres ejercer. Si tenemos dudas razonables sobre tu identidad, podremos pedirte una copia de tu documento de identidad. Te responderemos en el plazo máximo de un mes.',
          'Si consideras que no hemos atendido correctamente tus derechos, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).',
        ],
      },
      {
        title: 'Menores de edad',
        paragraphs: [
          'Nuestros servicios se dirigen a profesionales y empresas. No tratamos conscientemente datos de menores de 14 años; si crees que un menor nos ha escrito, avísanos y los eliminaremos.',
        ],
      },
      {
        title: 'Seguridad',
        paragraphs: [
          'Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos, como la conexión cifrada (HTTPS), el acceso restringido a la información y el uso de proveedores con certificaciones de seguridad reconocidas.',
        ],
      },
    ],
  },
  'aviso-legal': {
    title: 'Aviso Legal',
    intro:
      'Este aviso legal regula el acceso y el uso de este sitio web y proporciona la información que exige el artículo 10 de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE).',
    sections: [
      {
        title: 'Datos del titular',
        paragraphs: [
          'Titular: Aaron García Sánchez (NIF 53321515V), bajo el nombre comercial Moira Ordo.',
          'Domicilio: Vilanova i la Geltrú, España.',
          'Email de contacto: info@moiraordo.es.',
          'Sitio web: https://moiraordo.es.',
        ],
      },
      {
        title: 'Actividad',
        paragraphs: [
          'Diseño y desarrollo web, software a medida, diseño de marca, marketing digital y consultoría digital para empresas, así como el desarrollo de juegos HTML5 bajo la marca Moira Ordo Games.',
        ],
      },
      {
        title: 'Condiciones de uso',
        paragraphs: [
          'El acceso a esta web es gratuito y supone aceptar este aviso legal. Te comprometes a usarla de forma lícita y de buena fe, sin dañar su funcionamiento ni intentar acceder a áreas o sistemas no autorizados.',
          'La información de la web tiene carácter informativo. Los precios indicados son orientativos («desde») y no constituyen una oferta vinculante: cada proyecto se presupuesta a medida.',
        ],
      },
      {
        title: 'Propiedad intelectual e industrial',
        paragraphs: [
          'Los contenidos de esta web (textos, diseños, imágenes propias, código, logotipos y marca Moira Ordo) están protegidos por la normativa de propiedad intelectual e industrial. No se permite su reproducción, distribución ni transformación sin autorización expresa del titular.',
          'Los nombres, logotipos y capturas de los proyectos de nuestros clientes que se muestran en el portfolio pertenecen a sus respectivos titulares y se exhiben únicamente con fines informativos.',
        ],
      },
      {
        title: 'Enlaces a otros sitios',
        paragraphs: [
          'Esta web contiene enlaces a sitios de terceros (por ejemplo, los de nuestros clientes). No controlamos sus contenidos ni sus políticas de privacidad y cookies, y no nos hacemos responsables de ellos.',
        ],
      },
      {
        title: 'Responsabilidad',
        paragraphs: [
          'Nos esforzamos por mantener la información actualizada y la web disponible, pero no garantizamos la ausencia de errores ni la disponibilidad ininterrumpida del servicio. No nos hacemos responsables del uso que se haga de la información ni de los daños derivados de interrupciones o fallos ajenos a nuestro control.',
        ],
      },
      {
        title: 'Protección de datos',
        paragraphs: [
          'El tratamiento de tus datos personales se explica en la Política de Privacidad, y el uso de cookies y tecnologías similares, en la Política de Cookies.',
        ],
      },
      {
        title: 'Legislación aplicable y jurisdicción',
        paragraphs: [
          'Este sitio se rige por la legislación española. Para cualquier controversia, las partes se someterán a los juzgados y tribunales que resulten competentes conforme a la ley; si eres consumidor, los de tu domicilio.',
        ],
      },
    ],
  },
  cookies: {
    title: 'Política de Cookies',
    intro:
      'Esta web no utiliza cookies ni guarda información en tu dispositivo. Por eso no te mostramos ningún banner de cookies: no hay nada que aceptar ni rechazar.',
    sections: [
      {
        title: '¿Qué son las cookies?',
        paragraphs: [
          'Las cookies, y otras tecnologías similares como el almacenamiento local del navegador, son archivos o datos que una web guarda en tu dispositivo para recordar información sobre tu visita. Su uso está regulado por el artículo 22.2 de la LSSI-CE, que exige informar y, salvo que sean estrictamente necesarias, pedir tu consentimiento.',
        ],
      },
      {
        title: 'Qué usamos en esta web',
        paragraphs: [
          'Ninguna cookie, ni propia ni de terceros, y ningún otro tipo de almacenamiento en tu dispositivo (ni siquiera para recordar tu idioma o tus preferencias).',
          'Tampoco incluimos publicidad, píxeles de seguimiento, botones de redes sociales ni vídeos incrustados que puedan instalar cookies. Las tipografías se sirven desde nuestro propio dominio.',
        ],
      },
      {
        title: 'Medición de audiencia',
        paragraphs: [
          'Para saber cuántas personas visitan la web, qué páginas interesan más y cómo de rápido carga, usamos Vercel Web Analytics y Vercel Speed Insights, de Vercel Inc.',
          'Estas herramientas no usan cookies ni guardan identificadores en tu dispositivo; recogen únicamente datos agregados y anónimos (páginas vistas, origen de la visita, país, tipo de dispositivo, navegador y datos de rendimiento). No te identifican, no te siguen entre distintas webs y no combinamos estos datos con otros ni los usamos para publicidad o perfiles.',
          'Al no instalar ni leer nada en tu dispositivo, no es necesario recabar tu consentimiento conforme al artículo 22.2 de la LSSI-CE.',
        ],
      },
      {
        title: 'Webs de terceros',
        paragraphs: [
          'Si sales de esta web a través de un enlace (por ejemplo, a la web de uno de nuestros clientes), ese sitio puede usar sus propias cookies. Consulta su política de cookies.',
        ],
      },
      {
        title: 'Si esto cambia',
        paragraphs: [
          'Si en el futuro añadimos cookies que requieran tu consentimiento (por ejemplo, de analítica avanzada o publicidad), te lo pediremos antes de instalarlas, con un panel que te permitirá aceptar o rechazar con la misma facilidad, y actualizaremos esta política.',
        ],
      },
      {
        title: 'Cómo gestionar o eliminar cookies',
        paragraphs: [
          'Aunque esta web no las utiliza, puedes bloquear o eliminar las cookies de cualquier sitio desde los ajustes de privacidad de tu navegador (Chrome, Firefox, Safari, Edge, etc.).',
          'Si tienes dudas sobre esta política, escríbenos a info@moiraordo.es.',
        ],
      },
    ],
  },
}
