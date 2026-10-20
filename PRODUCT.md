# PRODUCT.md — AMOXTLI AI Demos

Repo de demostración de AMOXTLI®. Tres sitios de clientes **ficticios**, cada uno con una pieza de IA o automatización funcionando, para mostrar en video lo que AMOXTLI puede construir.

## Propósito
Que una persona que ve el video entienda, sin explicación técnica, tres cosas que AMOXTLI hace:
1. Chatbots (web o WhatsApp) que atienden y agendan.
2. Modelos de IA personalizados que responden solo con la información del negocio.
3. Automatizaciones que convierten un formulario en un cliente gestionado.

## Audiencia
Dueños de PyMEs en México que hoy atienden por WhatsApp a mano. Segunda audiencia: el equipo de marketing de AMOXTLI, que graba y edita el video.

## Reglas de honestidad
- Marcas, personas, precios, horarios y cantidades son **ficticios** y cada sitio lo dice en el pie ("Sitio demo de AMOXTLI®. Marca y datos ficticios.").
- Sin testimonios, reseñas ni cifras de resultados inventados.
- Los casos reales de AMOXTLI (FRACTAE, Fisio Gad, Hilitos Lili) se mencionan aparte en el video, nunca dentro de estas demos.

## Las tres demos
| Ruta | Negocio ficticio | Punto del video | Pieza firma |
|---|---|---|---|
| `/clinica` | Clínica Dental Aralia | Chatbots | Chat estilo WhatsApp que agenda citas |
| `/tostador` | Tostaduría Ceniza | IA personalizada | Asistente que solo responde con el catálogo |
| `/despacho` | Garza Rivas Contadores | Automatizaciones | Formulario de 2 pasos → correo → panel de leads |

## Restricciones
- Todo en `dev`. Nada a `main` sin aprobación.
- La clave de Claude vive solo en el servidor; `/api/chat` limita mensajes por visitante.
- Sin clave configurada, cada demo funciona con respuestas guionadas, para poder grabar sin depender de la red.
- Los sitios llevan `noindex`: son demos, no deben competir en buscadores.

## Voz
Español de México, directo. Cada demo con su propia voz según sus adjetivos (ver DESIGN.md).
