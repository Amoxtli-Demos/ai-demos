# AMOXTLI AI Demos

Tres sitios de clientes ficticios con IA y automatización funcionando, para el video de AMOXTLI®.

| Ruta | Demo | Punto del video |
|---|---|---|
| `/clinica` | Clínica Dental Aralia | Chatbot que responde y agenda citas |
| `/tostador` | Tostaduría Ceniza | IA que solo recomienda del catálogo |
| `/despacho` | Garza Rivas Contadores | Formulario → correo → panel (`/despacho/panel`) |

Dirección de diseño en `DESIGN.md`; contexto del producto en `PRODUCT.md`.

## Correr en local
```bash
npm install
cp .env.example .env.local   # opcional
npm run build && npm start   # http://localhost:3000
```
Sin variables de entorno todo funciona: el chat responde con texto guionado y el estado de las demos se guarda en el navegador. Para grabar con Claude real, agrega `ANTHROPIC_API_KEY`.

## Variables de entorno
| Variable | Para qué |
|---|---|
| `ANTHROPIC_API_KEY` | Respuestas reales de Claude en `/clinica` y `/tostador` |
| `CHAT_MODEL`, `CHAT_MAX_PER_HOUR` | Modelo y límite de mensajes por visitante (por defecto 30/hora) |
| `RESEND_API_KEY`, `RESEND_FROM`, `LEADS_NOTIFY_TO` | Correo de aviso del despacho (el remitente requiere dominio verificado) |

## Subdominios
Un solo proyecto de Vercel con tres dominios (`clinica.`, `tostador.`, `despacho.`): `middleware.ts` reescribe cada uno a su ruta.

## Notas
- Todo es demo: marcas, personas, precios y casos son ficticios y así se indica en el pie de cada sitio.
- Sin base de datos: citas y solicitudes viven en el `localStorage` del navegador. Formulario y panel del despacho deben abrirse en el mismo navegador (ideal para grabar).
- Los sitios llevan `noindex`. El panel del despacho no tiene login: no usarlo con datos reales.
- Trabajo en `dev`; nada a `main` sin aprobación.
