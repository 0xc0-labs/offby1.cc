import type { Lang } from "./types";

// offby1's research notes. Generalized security writing drawn from our own
// work: classes of bug and how we test for them, taught with invented
// examples and public references. No identifiable target, no live endpoint,
// no runnable exploit against anyone else's system.

export const AUTHOR = "Sergio Atenciano";

export interface ArticleSection {
  heading?: string;
  paragraphs?: string[];
  items?: string[];
  /** A fenced block: pseudo-HTTP or pseudo-code, never a real host. */
  code?: { caption?: string; body: string };
}

export interface ArticleL10n {
  slug: string;
  title: string;
  lede: string;
  sections: ArticleSection[];
}

export interface Article {
  id: string;
  /** ISO date, last meaningful change. */
  date: string;
  readingMinutes: number;
  es: ArticleL10n;
  en: ArticleL10n;
}

export interface IndexCopy {
  path: string;
  eyebrow: string;
  title: string;
  lede: string;
  by: string;
  readMore: string;
  minutes: string;
  backToList: string;
  disclaimer: string;
}

export const researchIndex: Record<Lang, IndexCopy> = {
  es: {
    path: "/investigacion/",
    eyebrow: "Investigación",
    title: "Notas de investigación",
    lede: "Clases de fallo y cómo las buscamos, a partir de nuestro trabajo. Sin objetivos, sin endpoints reales y sin exploits: ideas que se pueden aplicar en cualquier sistema.",
    by: "Por",
    readMore: "Leer",
    minutes: "min de lectura",
    backToList: "Volver a investigación",
    disclaimer:
      "Todo lo que publicamos aquí es genérico. Nunca describimos un fallo concreto de un cliente ni de un programa de recompensas, ni mientras está sin corregir ni después.",
  },
  en: {
    path: "/en/research/",
    eyebrow: "Research",
    title: "Research notes",
    lede: "Classes of bug and how we hunt them, drawn from our own work. No targets, no live endpoints and no exploits: ideas you can apply to any system.",
    by: "By",
    readMore: "Read",
    minutes: "min read",
    backToList: "Back to research",
    disclaimer:
      "Everything here is generic. We never describe a specific flaw in a client or a bug-bounty program, neither while it is unfixed nor after.",
  },
};

export const articles: Article[] = [
  {
    id: "authorization-two-questions",
    date: "2026-10-08",
    readingMinutes: 9,
    es: {
      slug: "la-autorizacion-son-dos-preguntas",
      title: "La autorización son dos preguntas: quién y cuál",
      lede: "La mayoría de los fallos de control de acceso no son falta de autenticación. Son una autenticación que responde bien a «¿quién eres?» y nunca pregunta «¿puedes ver este objeto?».",
      sections: [
        {
          paragraphs: [
            "Cuando una API se diseña, casi siempre se piensa primero en la autenticación: ¿quién hace la petición? Hay un login, un token, una sesión, y en cuanto eso funciona parece que el acceso está resuelto. No lo está. La autenticación responde a quién eres. La autorización responde a dos preguntas distintas: qué puedes hacer y, sobre todo, sobre qué objeto.",
            "Esa segunda pregunta es la que más se olvida. El servidor comprueba que tienes una sesión válida, da por hecho que el identificador de objeto que acompaña a la petición es tuyo, y responde. Si cambias ese identificador por el de otra persona, te entrega sus datos. Es la clase de fallo que OWASP llama Broken Object Level Authorization (BOLA), y la que más veces aparece cuando audita de verdad una API.",
          ],
        },
        {
          heading: "El patrón, en una frase",
          paragraphs: [
            "Un fallo de autorización a nivel de objeto es cualquier endpoint que comprueba quién eres y no comprueba si el objeto que pides es tuyo. El identificador del objeto viaja en la URL, en el cuerpo, en una cabecera o dentro de un token, y el servidor lo usa para leer o escribir sin atar ese objeto a quien hace la petición.",
          ],
          code: {
            caption: "La forma mínima, en pseudo-HTTP",
            body: "GET /api/invoices/10482\nAuthorization: Bearer <sesión válida de Ana>\n\n200 OK\n{ \"id\": 10482, \"owner\": \"Bruno\", \"total\": \"12,50\" }\n\n# Ana está autenticada. La factura es de Bruno.\n# El servidor comprobó la sesión y no comprobó el dueño.",
          },
        },
        {
          heading: "Por qué cuesta tanto verlo desde dentro",
          paragraphs: [
            "En desarrollo todo funciona: cada persona entra con su cuenta y ve sus cosas. El identificador que llega al servidor es el correcto porque lo puso la propia interfaz. El fallo solo aparece cuando alguien cambia ese identificador a mano, y eso no ocurre en las pruebas normales.",
            "Además, el control que falta suele estar a un nivel distinto del que se revisa. El equipo mira el middleware de sesión, lo ve bien, y da por buena la ruta. Pero la pregunta «¿este objeto es suyo?» se responde en la capa de datos, no en la de sesión, y ahí es donde falta.",
          ],
        },
        {
          heading: "Las variantes que conviene conocer",
          paragraphs: [
            "El mismo fallo se disfraza de muchas maneras. Reconocer la familia ahorra tiempo:",
          ],
          items: [
            "Lectura directa por identificador: cambias un número de la URL y lees el objeto de otro. La más clásica.",
            "Escritura, no solo lectura: el mismo endpoint que lee sin comprobar dueño también actualiza o borra sin comprobarlo. Suele revisarse la lectura y olvidarse la escritura.",
            "Fuga en listados y búsquedas: el GET de un objeto está bien protegido, pero el listado o el buscador olvidan el filtro por inquilino y devuelven lo de todos.",
            "Identificador dentro de un token que no lo cubre: la firma autentica quién eres, pero el objeto va en un campo que la firma no abarca (hay un artículo entero sobre esto).",
            "Scope que falla abierto: cuando el identificador de organización llega vacío o nulo, el filtro degrada a «todo» en lugar de a «nada».",
          ],
        },
        {
          heading: "Multi-tenant: el mismo fallo, más caro",
          paragraphs: [
            "En un sistema con muchos clientes (multi-tenant), la autorización a nivel de objeto no es una molestia para un usuario, es una fuga entre empresas. Un inquilino que lee los objetos de otro ve datos de una organización entera: facturas, usuarios, vehículos, conversaciones.",
            "El patrón peligroso es tratar el identificador de inquilino como un dato de entrada más, en lugar de como una frontera. Si el servidor acepta el tenant que el cliente dice ser, en vez de deducirlo de la sesión, la separación entre clientes es una sugerencia, no un muro.",
          ],
          code: {
            caption: "Dos formas de resolver el mismo listado",
            body: "# Frágil: el inquilino viene del cliente\nSELECT * FROM vehicles WHERE tenant_id = :tenant_de_la_query\n\n# Robusto: el inquilino sale de la sesión, y es obligatorio\nSELECT * FROM vehicles WHERE tenant_id = :tenant_de_la_sesión\n# sin ese predicado, la consulta no se ejecuta",
          },
        },
        {
          heading: "Cómo se arregla",
          paragraphs: [
            "La corrección no es una comprobación más en el controlador, es un principio sobre dónde vive la autorización:",
          ],
          items: [
            "Autoriza sobre el objeto, en la capa de datos. La pregunta «¿este objeto pertenece a quien pide?» se responde donde se lee el objeto, no en un guardia lejano que se puede saltar por otra ruta.",
            "Deduce el inquilino de la sesión, nunca de la petición. El cliente no debería poder nombrar la organización sobre la que opera.",
            "Niega por defecto. Un identificador vacío, nulo o ausente debe cerrar el acceso, no abrirlo.",
            "Cubre todo el ciclo de vida. Si create comprueba el dueño, también deben hacerlo update, delete, cancel, reopen y cualquier verbo que toque el objeto.",
            "Prueba los listados como pruebas los objetos. El filtro por inquilino es tan autorización como el control del GET individual.",
          ],
        },
        {
          heading: "El resumen",
          paragraphs: [
            "Antes de dar por segura una ruta, haz las dos preguntas por separado. ¿Sé quién eres? Casi siempre sí. ¿Sé que este objeto es tuyo? Esa es la que descubre los fallos. Una API que solo responde a la primera es una API que entrega los datos de cualquiera a quien sepa pedir por su identificador.",
          ],
        },
      ],
    },
    en: {
      slug: "authorization-is-two-questions",
      title: "Authorization is two questions: who, and which one",
      lede: "Most access-control bugs are not missing authentication. They are authentication that answers \"who are you?\" correctly and never asks \"are you allowed this object?\".",
      sections: [
        {
          paragraphs: [
            "When an API is designed, authentication usually comes first: who is making the request? There is a login, a token, a session, and once that works, access looks solved. It is not. Authentication answers who you are. Authorization answers two different questions: what you may do and, above all, to which object.",
            "That second question is the one that gets dropped. The server checks that you hold a valid session, assumes the object identifier riding along with the request is yours, and answers. Swap that identifier for someone else's and it hands you their data. This is the class OWASP calls Broken Object Level Authorization (BOLA), and it is the one that turns up most often when you actually audit an API.",
          ],
        },
        {
          heading: "The pattern, in one sentence",
          paragraphs: [
            "An object-level authorization bug is any endpoint that checks who you are and never checks whether the object you ask for is yours. The object identifier travels in the URL, the body, a header or inside a token, and the server uses it to read or write without binding that object to the caller.",
          ],
          code: {
            caption: "The minimal shape, in pseudo-HTTP",
            body: "GET /api/invoices/10482\nAuthorization: Bearer <valid session for Ana>\n\n200 OK\n{ \"id\": 10482, \"owner\": \"Bruno\", \"total\": \"12.50\" }\n\n# Ana is authenticated. The invoice is Bruno's.\n# The server checked the session and not the owner.",
          },
        },
        {
          heading: "Why it is hard to see from the inside",
          paragraphs: [
            "In development everything works: each person signs in with their own account and sees their own things. The identifier reaching the server is correct because the interface put it there. The bug only shows up when someone changes that identifier by hand, and that does not happen in ordinary testing.",
            "The missing check also tends to live at a different layer than the one being reviewed. The team looks at the session middleware, sees it is fine, and signs off on the route. But \"does this object belong to them?\" is answered at the data layer, not the session layer, and that is where it is missing.",
          ],
        },
        {
          heading: "The variants worth knowing",
          paragraphs: ["The same bug wears many disguises. Recognizing the family saves time:"],
          items: [
            "Direct read by identifier: change a number in the URL and read someone else's object. The classic.",
            "Write, not just read: the same endpoint that reads without an owner check also updates or deletes without one. The read gets reviewed; the write is forgotten.",
            "Leak through lists and search: the single-object GET is well guarded, but the list or the search endpoint forgets the tenant filter and returns everyone's.",
            "Identifier inside a token that does not cover it: the signature authenticates who you are, but the object sits in a field the signature never spans (there is a whole article on this).",
            "Scope that fails open: when the organization identifier arrives empty or null, the filter degrades to \"everything\" instead of \"nothing\".",
          ],
        },
        {
          heading: "Multi-tenant: the same bug, more expensive",
          paragraphs: [
            "In a system with many customers (multi-tenant), object-level authorization is not an annoyance for one user, it is a leak between companies. A tenant that reads another tenant's objects sees a whole organization's data: invoices, users, vehicles, conversations.",
            "The dangerous pattern is treating the tenant identifier as one more input, rather than as a boundary. If the server accepts the tenant the client claims to be, instead of deriving it from the session, the separation between customers is a suggestion, not a wall.",
          ],
          code: {
            caption: "Two ways to resolve the same list",
            body: "# Fragile: the tenant comes from the client\nSELECT * FROM vehicles WHERE tenant_id = :tenant_from_query\n\n# Robust: the tenant comes from the session, and it is mandatory\nSELECT * FROM vehicles WHERE tenant_id = :tenant_from_session\n# without that predicate, the query does not run",
          },
        },
        {
          heading: "How it is fixed",
          paragraphs: ["The fix is not one more check in the controller, it is a principle about where authorization lives:"],
          items: [
            "Authorize on the object, at the data layer. \"Does this object belong to the caller?\" is answered where the object is read, not by a distant guard a different route can bypass.",
            "Derive the tenant from the session, never from the request. The client should not be able to name the organization it operates on.",
            "Deny by default. An empty, null or absent identifier must close access, not open it.",
            "Cover the whole lifecycle. If create checks the owner, so must update, delete, cancel, reopen and every verb that touches the object.",
            "Test lists the way you test objects. The tenant filter is as much authorization as the single-object GET check.",
          ],
        },
        {
          heading: "The takeaway",
          paragraphs: [
            "Before calling a route safe, ask the two questions separately. Do I know who you are? Almost always yes. Do I know this object is yours? That is the one that finds the bugs. An API that only answers the first is an API that hands anyone's data to whoever knows how to ask for it by identifier.",
          ],
        },
      ],
    },
  },
  {
    id: "token-signs-who-not-what",
    date: "2026-10-08",
    readingMinutes: 7,
    es: {
      slug: "el-token-firma-quien-no-que",
      title: "El token firma quién, no qué",
      lede: "Un token firmado que autentica al actor, colocado junto a un identificador de objeto que la firma nunca cubre, parece seguro y no lo es.",
      sections: [
        {
          paragraphs: [
            "Los tokens firmados dan una sensación de seguridad justificada: nadie puede falsificarlos sin la clave. El problema no es la firma, es qué abarca. Un fallo que aparece una y otra vez es un token que firma correctamente la identidad de quien lo porta, mientras el objeto sobre el que actúa viaja en un campo aparte que la firma no toca.",
            "La firma autentica quién. El identificador de objeto dice qué. Si el segundo no está dentro de lo firmado, el servidor confía en un dato que el cliente controla, y lo hace precisamente porque el token de al lado parecía garantizarlo todo.",
          ],
        },
        {
          heading: "Un ejemplo genérico",
          paragraphs: [
            "Imagina un enlace para descargar un adjunto. Lleva un token firmado que identifica al usuario y, al lado, el número del adjunto:",
          ],
          code: {
            caption: "pseudo-HTTP",
            body: "GET /download?user_token=<firmado: user=Ana>&attachment=5501\n\n# La firma prueba que el token es de Ana.\n# «attachment=5501» no está dentro de la firma.\n# Cambia 5501 por 5502 y bajas el adjunto de otra persona.",
          },
        },
        {
          heading: "Su inverso, que confunde",
          paragraphs: [
            "Existe la forma contraria, y distinguirlas evita perder el tiempo: un token que firma el objeto pero no comprueba al actor. Ahí la firma garantiza qué recurso es, pero cualquiera con el enlace lo usa, porque no ata la acción a una persona.",
            "Son dos fallos distintos con el mismo aspecto. En uno falta el objeto dentro de la firma; en el otro falta el actor en la comprobación. Antes de reportar o de corregir, di en una frase cuál de las dos mitades tienes delante: ahorra una discusión y evita un duplicado.",
          ],
        },
        {
          heading: "Dónde buscarlo",
          items: [
            "Enlaces de descarga, vistas previas y exportaciones firmadas, donde el recurso va en un parámetro separado del token.",
            "Webhooks y callbacks con un secreto compartido que valida el origen pero no ata el evento a una cuenta.",
            "Tokens de invitación o de restablecimiento que firman al invitado y aceptan un identificador de destino aparte.",
            "Cualquier sitio donde veas un valor firmado y, al lado, un número o un identificador en claro.",
          ],
        },
        {
          heading: "La corrección",
          paragraphs: [
            "La regla es sencilla: lo que la firma garantiza debe incluir todo lo que el servidor va a dar por cierto. Si el objeto importa para la decisión de acceso, el objeto va dentro de lo firmado.",
          ],
          items: [
            "Mete el identificador de objeto en el contenido firmado, no al lado.",
            "Y aun así, comprueba la propiedad en el momento de servir: la firma dice qué se pidió, no quién puede tenerlo hoy. El estado cambia; una revocación o un cambio de dueño deben contar.",
            "No uses un único secreto para firmar cosas de clases distintas: un token válido para una no debería valer para otra.",
          ],
        },
        {
          heading: "El resumen",
          paragraphs: [
            "Una firma solo protege lo que firma. Cuando veas un token junto a un identificador suelto, pregunta qué cubre exactamente la firma. Si el objeto queda fuera, la seguridad es aparente: el candado es real, pero la puerta de al lado está abierta.",
          ],
        },
      ],
    },
    en: {
      slug: "the-token-signs-who-not-what",
      title: "The token signs who, not what",
      lede: "A signed token that authenticates the actor, sitting next to an object identifier the signature never covers, looks secure and is not.",
      sections: [
        {
          paragraphs: [
            "Signed tokens give a justified sense of safety: no one can forge them without the key. The problem is not the signature, it is what it spans. A bug that shows up again and again is a token that correctly signs the identity of its bearer, while the object it acts on rides in a separate field the signature never touches.",
            "The signature authenticates who. The object identifier says what. If the second is not inside what was signed, the server trusts a value the client controls, and it does so precisely because the token next to it seemed to guarantee everything.",
          ],
        },
        {
          heading: "A generic example",
          paragraphs: [
            "Picture a link to download an attachment. It carries a signed token identifying the user and, beside it, the attachment number:",
          ],
          code: {
            caption: "pseudo-HTTP",
            body: "GET /download?user_token=<signed: user=Ana>&attachment=5501\n\n# The signature proves the token is Ana's.\n# \"attachment=5501\" is not inside the signature.\n# Change 5501 to 5502 and you download someone else's file.",
          },
        },
        {
          heading: "Its inverse, which confuses",
          paragraphs: [
            "The opposite shape exists, and telling them apart saves time: a token that signs the object but never checks the actor. There the signature guarantees which resource it is, but anyone with the link can use it, because it binds the action to no person.",
            "They are two different bugs with the same look. One is missing the object inside the signature; the other is missing the actor in the check. Before you report or fix, say in one sentence which of the two halves you are holding: it saves an argument and avoids a duplicate.",
          ],
        },
        {
          heading: "Where to look for it",
          items: [
            "Download links, previews and signed exports, where the resource sits in a parameter separate from the token.",
            "Webhooks and callbacks with a shared secret that validates the origin but does not bind the event to an account.",
            "Invitation or reset tokens that sign the invitee and accept a separate target identifier.",
            "Anywhere you see a signed value and, beside it, a plain number or identifier.",
          ],
        },
        {
          heading: "The fix",
          paragraphs: [
            "The rule is simple: what the signature guarantees must include everything the server will take as true. If the object matters to the access decision, the object goes inside what is signed.",
          ],
          items: [
            "Put the object identifier inside the signed payload, not next to it.",
            "And even then, check ownership at serving time: the signature says what was asked for, not who may have it today. State changes; a revocation or an owner change must count.",
            "Do not use one secret to sign things of different classes: a token valid for one should not be valid for another.",
          ],
        },
        {
          heading: "The takeaway",
          paragraphs: [
            "A signature only protects what it signs. When you see a token beside a loose identifier, ask exactly what the signature covers. If the object falls outside it, the security is apparent: the lock is real, but the door next to it is open.",
          ],
        },
      ],
    },
  },
  {
    id: "authorization-testing-controls",
    date: "2026-10-08",
    readingMinutes: 8,
    es: {
      slug: "controles-para-probar-autorizacion",
      title: "Probar autorización sin falsos positivos",
      lede: "Un «200 OK» no demuestra un fallo. Lo que separa un hallazgo real de una ilusión son los controles: positivos, negativos y del mismo tamaño.",
      sections: [
        {
          paragraphs: [
            "Probar control de acceso es fácil de hacer mal. Cambias un identificador, recibes un 200 con datos y parece que has encontrado una fuga. Muchas veces no lo es: el servidor devuelve una página vacía, un error genérico que también da 200, o tus propios datos porque el identificador cayó en un objeto tuyo. La diferencia entre un hallazgo y un espejismo no está en la petición, está en los controles que la rodean.",
          ],
        },
        {
          heading: "Dos cuentas, siempre",
          paragraphs: [
            "La prueba básica de autorización a nivel de objeto necesita dos identidades, A y B, con objetos propios. Entonces cruzas: que A pida el objeto de B. Pero una sola dirección no basta.",
          ],
          items: [
            "A pide el objeto de B: ¿lo recibe? (el fallo que buscas)",
            "B pide el objeto de A: ¿también? (confirma que es sistémico, no un permiso puntual)",
            "A pide su propio objeto: debe funcionar (control positivo: la ruta existe y responde)",
            "A pide un objeto inexistente: debe fallar (control negativo: distingues «no autorizado» de «no encontrado»)",
          ],
        },
        {
          heading: "El control del mismo tamaño",
          paragraphs: [
            "El falso positivo más común: pides el objeto de otro, recibes un 200 de 15.000 bytes, y lo cuentas como fuga. Pero quizá ese endpoint devuelve 15.000 bytes para cualquier entrada, porque pinta una plantilla de error o una página vacía. El tamaño de la respuesta por sí solo no prueba nada.",
            "La forma de matarlo es un control del mismo tamaño: repite la petición con un parámetro de longitud idéntica pero sin sentido, de modo que la única diferencia posible sea que el servidor use tu valor. Si la respuesta buena y la del control son byte a byte iguales, tu parámetro no se está consumiendo, y no hay fallo.",
          ],
          code: {
            caption: "La idea, en pseudo-pruebas",
            body: "real:    GET /page?function=ADMIN_EXPORT   -> 200, 15.371 bytes\ncontrol: GET /page?zzzzzzzz=ADMIN_EXPORT   -> 200, 15.371 bytes\n\n# Mismo tamaño, byte a byte: el nombre del parámetro no cambia nada.\n# El servidor no consume «function». No hay hallazgo.",
          },
        },
        {
          heading: "Todo el ciclo de vida, no un verbo",
          paragraphs: [
            "Una comprobación de dueño en la lectura no dice nada de la escritura. Un objeto tiene una vida: se crea, se lee, se actualiza, se cancela, se reabre, se borra. Cada transición es un endpoint distinto, y la autorización puede estar en unos y faltar en otros.",
            "El error habitual es probar el GET, verlo protegido y dar por segura la familia entera. Enumera todos los verbos del objeto y prueba cada uno con los mismos cruces. El fallo suele vivir en el verbo que nadie revisa: el reopen, el cancel, el resolve.",
          ],
        },
        {
          heading: "Ritmo y ruido",
          paragraphs: [
            "Dos detalles prácticos que estropean una campaña de pruebas:",
          ],
          items: [
            "El ritmo: un barrido a muchos hilos sobre un único túnel de salida provoca cortes que parecen bloqueos del objetivo y no lo son. Baja el ritmo antes de leer una matriz de resultados como un patrón real.",
            "El ruido de las extensiones del navegador: carteras, traductores y bloqueadores inyectan scripts y disparan violaciones de CSP que no son del sitio. Repite la prueba en un perfil limpio antes de anotar nada.",
          ],
        },
        {
          heading: "El resumen",
          paragraphs: [
            "Un hallazgo de autorización se sostiene cuando puedes enseñar las cuatro esquinas: tu objeto funciona, el de otro también, el inexistente falla y el control del mismo tamaño descarta que el servidor ignore tu entrada. Sin esos controles tienes una captura de pantalla; con ellos tienes un hallazgo que un equipo puede reproducir y corregir.",
          ],
        },
      ],
    },
    en: {
      slug: "controls-for-testing-authorization",
      title: "Testing authorization without false positives",
      lede: "A 200 OK does not prove a bug. What separates a real finding from an illusion are the controls: positive, negative, and length-matched.",
      sections: [
        {
          paragraphs: [
            "Testing access control is easy to do badly. You change an identifier, get a 200 with data, and it looks like you found a leak. Often it is not: the server returns an empty page, a generic error that also answers 200, or your own data because the identifier landed on an object of yours. The difference between a finding and a mirage is not in the request, it is in the controls around it.",
          ],
        },
        {
          heading: "Two accounts, always",
          paragraphs: [
            "The basic object-level authorization test needs two identities, A and B, each with their own objects. Then you cross them: have A ask for B's object. But one direction is not enough.",
          ],
          items: [
            "A asks for B's object: does it come back? (the bug you are after)",
            "B asks for A's object: does it too? (confirms it is systemic, not a one-off grant)",
            "A asks for its own object: it must work (positive control: the route exists and answers)",
            "A asks for a non-existent object: it must fail (negative control: you tell \"unauthorized\" from \"not found\")",
          ],
        },
        {
          heading: "The length-matched control",
          paragraphs: [
            "The most common false positive: you ask for someone else's object, get a 200 of 15,000 bytes, and call it a leak. But maybe that endpoint returns 15,000 bytes for any input, because it paints an error template or an empty page. Response size on its own proves nothing.",
            "The way to kill it is a length-matched control: repeat the request with a same-length but meaningless parameter, so the only possible difference is whether the server uses your value. If the real response and the control are byte-for-byte identical, your parameter is not being consumed, and there is no bug.",
          ],
          code: {
            caption: "The idea, in pseudo-tests",
            body: "real:    GET /page?function=ADMIN_EXPORT   -> 200, 15,371 bytes\ncontrol: GET /page?zzzzzzzz=ADMIN_EXPORT   -> 200, 15,371 bytes\n\n# Same size, byte for byte: the parameter name changes nothing.\n# The server does not consume \"function\". No finding.",
          },
        },
        {
          heading: "The whole lifecycle, not one verb",
          paragraphs: [
            "An owner check on the read says nothing about the write. An object has a life: it is created, read, updated, cancelled, reopened, deleted. Each transition is a different endpoint, and authorization may be present in some and missing in others.",
            "The usual mistake is to test the GET, see it protected, and call the whole family safe. Enumerate every verb on the object and test each with the same crosses. The bug tends to live in the verb no one reviews: the reopen, the cancel, the resolve.",
          ],
        },
        {
          heading: "Pace and noise",
          paragraphs: ["Two practical details that wreck a test run:"],
          items: [
            "Pace: a many-threaded sweep over a single egress tunnel causes resets that look like the target blocking you and are not. Slow down before you read a result matrix as a real pattern.",
            "Browser-extension noise: wallets, translators and blockers inject scripts and trigger CSP violations that are not the site's. Repeat the test in a clean profile before you write anything down.",
          ],
        },
        {
          heading: "The takeaway",
          paragraphs: [
            "An authorization finding holds up when you can show all four corners: your object works, someone else's works too, the non-existent one fails, and the length-matched control rules out the server ignoring your input. Without those controls you have a screenshot; with them you have a finding a team can reproduce and fix.",
          ],
        },
      ],
    },
  },
];

/** The article whose slug matches, in the given language. */
export function articleBySlug(lang: Lang, slug: string): Article | undefined {
  return articles.find((a) => a[lang].slug === slug);
}

/** A research page's path pair: the index, or one article. */
export function researchPaths(article?: Article): Record<Lang, string> {
  if (!article) return { es: researchIndex.es.path, en: researchIndex.en.path };
  return {
    es: `${researchIndex.es.path}${article.es.slug}/`,
    en: `${researchIndex.en.path}${article.en.slug}/`,
  };
}
