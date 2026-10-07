import { OWNER } from "./owner";
import type { Content } from "./types";

// Sample copy from the design system: provisional until the real offering
// (services, standards, response times) replaces it. README.md, Content.
export const es: Content = {
  lang: "es",
  meta: {
    title: "offby1 — Auditoría y consultoría de ciberseguridad",
    description:
      "Auditorías de seguridad, pentesting y consultoría para equipos que no pueden permitirse ni un solo fallo.",
  },
  nav: {
    links: [
      { label: "Servicios", href: "#servicios" },
      { label: "Método", href: "#metodo" },
      { label: "Contacto", href: "#contacto" },
      { label: "Investigación", href: "/investigacion/" },
    ],
    cta: { label: "Solicitar auditoría", href: "#contacto" },
    theme: { label: "Tema", system: "Según el sistema", light: "Claro", dark: "Oscuro" },
  },
  hero: {
    eyebrow: "Auditoría y consultoría de ciberseguridad",
    title: ["Encontramos el fallo ", "antes que los atacantes."],
    lede: "Auditorías de seguridad, pentesting y consultoría para equipos que no pueden permitirse ni un solo fallo.",
    primary: { label: "Solicitar auditoría", href: "#contacto" },
    secondary: { label: "Ver servicios", href: "#servicios" },
    note: "Alcance acordado y NDA firmado antes de empezar.",
    terminal: {
      title: "audit.log",
      status: "En curso",
      label: "Ejemplo de registro de una auditoría",
      lines: [
        { kind: "cmd", text: "offby1 audit --scope app.cliente.es" },
        { kind: "out", text: "214 endpoints · 3 roles · 2 entornos" },
        { kind: "finding", level: "critical", text: "Inyección SQL en /buscar?q=" },
        { kind: "finding", level: "high", text: "IDOR en /api/v2/facturas/{id}" },
        { kind: "finding", level: "medium", text: "Sin CSP en /panel" },
        { kind: "finding", level: "low", text: "Versión de servidor expuesta" },
        { kind: "ok", text: "informe priorizado · 4 hallazgos" },
      ],
    },
  },
  services: {
    id: "servicios",
    eyebrow: "Servicios",
    title: "Qué hacemos",
    lede: "Tres servicios con un mismo resultado: saber qué falla, cuánto importa y cómo arreglarlo.",
    cards: [
      {
        icon: "shield-check",
        title: "Auditoría de seguridad",
        description: "Revisamos infraestructura, código y configuración, y entregamos un informe priorizado por riesgo.",
        items: ["Revisión de arquitectura", "Bastionado de servidores y nube", "Análisis de código fuente"],
      },
      {
        icon: "scan-search",
        title: "Pentesting",
        description: "Atacamos tus sistemas como lo haría un atacante real, dentro de un alcance acordado por escrito.",
        items: ["Aplicaciones web y APIs", "Infraestructura expuesta", "Verificación de las correcciones"],
      },
      {
        icon: "clipboard-check",
        title: "Consultoría y cumplimiento",
        description: "Te ayudamos a cumplir la normativa que te aplica y a mantenerla sin frenar a tu equipo.",
        items: ["ENS e ISO 27001", "NIS2 y DORA", "Políticas y respuesta a incidentes"],
      },
    ],
  },
  method: {
    id: "metodo",
    eyebrow: "Método",
    title: "Cómo trabajamos",
    lede: "Cuatro pasos, siempre los mismos. En todo momento sabes qué estamos probando y qué viene después.",
    steps: [
      { title: "Alcance", body: "Acordamos qué se prueba, cuándo y con qué límites, y firmamos el NDA antes de tocar nada." },
      { title: "Pruebas", body: "Combinamos herramientas automáticas y revisión manual. Si encontramos algo crítico, te avisamos el mismo día." },
      { title: "Informe", body: "Cada hallazgo, ordenado por severidad, con su impacto en el negocio y cómo corregirlo." },
      { title: "Verificación", body: "Cuando lo corrijas, volvemos a probarlo y confirmamos que está resuelto." },
    ],
    report: {
      label: "Ejemplo de informe",
      title: "Resumen de hallazgos",
      columns: ["Severidad", "Hallazgo", "Estado"],
      findings: [
        { level: "critical", title: "Inyección SQL en el buscador", status: "Corregido", remediated: true },
        { level: "high", title: "IDOR en la API de facturas", status: "Corregido", remediated: true },
        { level: "medium", title: "Sin CSP en el panel", status: "En curso" },
        { level: "low", title: "Versión de servidor expuesta", status: "Asumido" },
      ],
    },
  },
  contact: {
    id: "contacto",
    eyebrow: "Contacto",
    title: "Cuéntanos qué necesitas",
    lede: "Te respondemos con una propuesta de alcance y plazos. Sin compromiso y sin llamadas comerciales.",
    form: {
      name: "Nombre",
      email: "Email corporativo",
      emailPlaceholder: "nombre@empresa.com",
      company: "Empresa",
      need: "¿Qué necesitas?",
      pick: "Elige una opción",
      options: ["Auditoría de seguridad", "Pentesting", "Consultoría y cumplimiento", "Informar de un fallo de seguridad", "Otro"],
      message: "Cuéntanos el contexto",
      messageHint: "Alcance aproximado, plazos y normativa aplicable. No incluyas nada confidencial todavía.",
      optional: "(opcional)",
      consent: ["Acepto la ", { label: "política de privacidad", href: "/privacidad/" }, " y que offby1 me contacte sobre esta solicitud."],
      submit: "Solicitar propuesta",
      sending: "Enviando…",
      note: "Respondemos en un día laborable como máximo.",
      sent: "Recibido. Te escribimos en un día laborable como máximo.",
      failed: "No hemos podido enviarlo. Inténtalo de nuevo en unos minutos.",
      errors: {
        required: "Este campo es obligatorio.",
        email: "Revisa el formato: nombre@empresa.com",
        consent: "Necesitamos tu consentimiento para responderte.",
        tooLong: "Es demasiado largo. Resúmelo un poco.",
      },
    },
  },
  footer: {
    tagline: "Auditoría y consultoría de ciberseguridad para equipos que no pueden permitirse ni un solo fallo.",
    columns: [
      {
        title: "Servicios",
        links: [
          { label: "Auditoría de seguridad", href: "#servicios" },
          { label: "Pentesting", href: "#servicios" },
          { label: "Consultoría y cumplimiento", href: "#servicios" },
        ],
      },
      {
        title: "Empresa",
        links: [
          { label: "Método", href: "#metodo" },
          { label: "Investigación", href: "/investigacion/" },
          { label: "Contacto", href: "#contacto" },
        ],
      },
      {
        title: "Seguridad",
        links: [
          { label: "security.txt", href: "/.well-known/security.txt" },
          { label: "Divulgación responsable", href: "/divulgacion-responsable/" },
        ],
      },
    ],
    legal: [
      { label: "Aviso legal", href: "/aviso-legal/" },
      { label: "Privacidad", href: "/privacidad/" },
      { label: "Cookies", href: "/cookies/" },
    ],
  },
  pages: {
    back: { label: "Volver al inicio", href: "/" },
    updated: "Última actualización",
    list: {
      legal: {
        path: "/aviso-legal/",
        title: "Aviso legal",
        noindex: true,
        sections: [
          {
            heading: "Titular",
            paragraphs: [
              "En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE), estos son los datos del titular de offby1.cc:",
            ],
            items: [
              `Titular: ${OWNER.name}`,
              `NIF: ${OWNER.taxId}`,
              `Domicilio: ${OWNER.address}`,
              `Correo electrónico: ${OWNER.email}`,
            ],
          },
          {
            heading: "Qué es esta web",
            paragraphs: [
              "offby1.cc presenta los servicios de auditoría de seguridad, pentesting y consultoría de offby1, y permite pedir una propuesta a través del formulario de contacto. Usarla no supone ningún contrato: cada encargo se acuerda por escrito, con su alcance.",
            ],
          },
          {
            heading: "Contenido",
            paragraphs: [
              "Cuidamos que la información sea correcta y esté al día, pero es orientativa y puede cambiar sin aviso. Los ejemplos de auditoría que aparecen en la web (registros, hallazgos, informes) son ilustrativos y no corresponden a ningún cliente.",
              "Si enlazamos a webs de terceros, no respondemos de lo que publiquen.",
            ],
          },
          {
            heading: "Propiedad intelectual",
            paragraphs: [
              "Los textos, el diseño y el logotipo de offby1 son de su titular. Puedes citarlos indicando la fuente; para cualquier otro uso, pide permiso antes. Las tipografías Instrument Sans y JetBrains Mono se usan bajo la licencia SIL Open Font License.",
            ],
          },
          {
            heading: "Legislación aplicable",
            paragraphs: ["Este aviso legal se rige por la legislación española."],
          },
        ],
      },
      privacy: {
        path: "/privacidad/",
        title: "Política de privacidad",
        noindex: true,
        sections: [
          {
            heading: "Responsable",
            items: [
              `Responsable: ${OWNER.name}`,
              `NIF: ${OWNER.taxId}`,
              `Domicilio: ${OWNER.address}`,
              `Correo electrónico: ${OWNER.email}`,
            ],
          },
          {
            heading: "Qué datos tratamos",
            items: [
              "Si usas el formulario de contacto: tu nombre, tu email y, si los indicas, tu empresa, el servicio que te interesa y el contexto que nos cuentes.",
              "De cada visita: la dirección IP, la fecha y hora, la página pedida y el navegador, en los registros del servidor.",
              "De cada visita, también cómo funciona la web en tu navegador: tiempos de carga, errores, recursos lentos, clics, el tipo de dispositivo y navegador, y una ubicación aproximada (país y ciudad) deducida de la IP. No guardamos nada en tu dispositivo para ello y no te identificamos.",
            ],
          },
          {
            heading: "Para qué y con qué base",
            items: [
              "Responder a tu solicitud y, si nos lo pides, preparar una propuesta. La base es tu consentimiento (art. 6.1.a RGPD), que das al enviar el formulario y puedes retirar cuando quieras.",
              "Mantener la web segura y en marcha: detectar abusos y ataques. La base es nuestro interés legítimo (art. 6.1.f RGPD).",
              "Medir y mejorar el rendimiento de la web y corregir sus errores. La base es nuestro interés legítimo (art. 6.1.f RGPD).",
            ],
            paragraphs: [
              "No usamos tus datos para publicidad, no hacemos perfiles y no tomamos decisiones automatizadas sobre ti.",
            ],
          },
          {
            heading: "Cuánto tiempo",
            items: [
              "Los del formulario: lo necesario para atender tu solicitud y, como máximo, 12 meses desde el último contacto. Si acordamos un encargo, lo que exija la ley.",
              "Los registros del servidor y las medidas de rendimiento: 30 días. Las copias de seguridad del sistema pueden conservarlos hasta 6 meses.",
            ],
          },
          {
            heading: "Quién más los trata",
            items: [
              "Cloudflare, Inc. sirve la web y la protege frente a ataques: las visitas pasan por su red. Puede tratar datos fuera de la Unión Europea, con las garantías del Marco de Privacidad de Datos UE-EE. UU. y cláusulas contractuales tipo.",
              "Hetzner Online GmbH aloja nuestros servidores, en centros de datos de la Unión Europea.",
            ],
            paragraphs: ["No cedemos tus datos a nadie más, salvo obligación legal."],
          },
          {
            heading: "Tus derechos",
            paragraphs: [
              `Puedes pedir el acceso, la rectificación, la supresión, la limitación o la portabilidad de tus datos, oponerte a su tratamiento y retirar tu consentimiento escribiendo a ${OWNER.email}, desde la dirección con la que nos contactaste.`,
              "Si crees que no hemos tratado bien tus datos, puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).",
            ],
          },
          {
            heading: "Cookies",
            paragraphs: ["Esta web no usa cookies. Los detalles, en la página de cookies."],
          },
        ],
      },
      cookies: {
        path: "/cookies/",
        title: "Cookies",
        sections: [
          {
            paragraphs: [
              "Esta web no instala cookies: ni propias ni de terceros, ni de análisis ni de publicidad. Por eso no te mostramos ningún aviso ni te pedimos consentimiento.",
            ],
          },
          {
            heading: "Lo único que guarda tu navegador",
            paragraphs: [
              "Si eliges el tema claro u oscuro, tu navegador guarda esa preferencia en su almacenamiento local (la clave offby1-theme) para recordarla en tu próxima visita. Solo se guarda si la eliges, nunca se envía a nuestro servidor y desaparece si vuelves a «Según el sistema» o borras los datos del sitio.",
              "Si eliges idioma con el selector ES / EN, tu navegador guarda esa elección en su almacenamiento local (la clave offby1-lang). Sin ella, la primera vez que entras te mostramos la web en el idioma de tu dispositivo: en español si es español, catalán, gallego o euskera, y en inglés en cualquier otro caso. Esa decisión la toma tu propio navegador, nunca se envía a nuestro servidor y desaparece si borras los datos del sitio.",
            ],
          },
          {
            heading: "Si esto cambia",
            paragraphs: [
              "Si algún día usamos cookies, actualizaremos esta página y te pediremos permiso antes de instalar cualquiera que no sea estrictamente necesaria.",
            ],
          },
        ],
      },
      disclosure: {
        path: "/divulgacion-responsable/",
        title: "Divulgación responsable",
        sections: [
          {
            paragraphs: [
              "Si has encontrado un fallo de seguridad en offby1.cc o en cualquier sistema nuestro, queremos saberlo.",
              "Usa el formulario de contacto y elige «Informar de un fallo de seguridad». Cuéntanos qué has visto y cómo reproducirlo. Te respondemos en 3 días laborables como máximo y te mantenemos al tanto.",
              "No accedas a datos de otras personas, no degrades el servicio y danos un plazo razonable para corregirlo antes de publicarlo. Si lo haces así, no tomaremos ninguna acción legal contra ti.",
            ],
          },
        ],
      },
    },
  },
};
