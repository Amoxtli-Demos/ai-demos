# DESIGN.md — AMOXTLI AI Demos

Tres identidades que no comparten nada visual: tipografía, forma, densidad, movimiento y estructura cambian en cada una. Lo único común es la infraestructura (API de chat, almacenamiento, correo) y la firma del pie.

## Respuestas A, B y C (Paso 1 de la skill)

| | Clínica Dental Aralia | Tostaduría Ceniza | Garza Rivas Contadores |
|---|---|---|---|
| A. Adjetivos | limpia, tranquila, precisa | cálida, terrosa, con carácter | sobria, rigurosa, confiable |
| B. Sector | Llega con miedo o prisa por un dolor. Necesita calma y saber que alguien contesta ya. Competencia: sitios con sonrisas de stock y WhatsApp que nadie atiende fuera de horario. | Llega con curiosidad y poco vocabulario de café. Necesita que le digan qué comprar sin sentirse tonto. Competencia: catálogos fríos con filtros técnicos. | Llega con preocupación por el SAT o un trámite. Necesita autoridad y sentir que su caso se lleva con orden. Competencia: despachos con sitios genéricos y formularios que no responden. |
| C. Función | Agendar una cita en menos de 3 toques. El chat va primero. | Elegir un café. El catálogo es la estrella y el asistente lo acompaña. | Solicitar una asesoría. El formulario de 2 pasos es la acción y el panel es la prueba. |

## Palancas del Paso 2

| | Clínica | Tostador | Despacho |
|---|---|---|---|
| Tipografía | Schibsted Grotesk + Public Sans | Young Serif + Work Sans | Source Serif 4 + IBM Plex Sans |
| Retícula | Dos columnas: texto y chat | Asimétrica editorial, bolsas en rejilla uniforme | Retícula rígida de 12 columnas, filas con regla |
| Forma | Pill (radio 9999px) | Suave (1.25rem) | Radio 0 |
| Densidad | Mucho aire | Media, con color en bloques | Densa y ordenada |
| Imagen | Ilustración lineal SVG, sin foto | Etiquetas de bolsa ilustradas en SVG, sin foto | Sin imagen; tipografía y regla |
| Movimiento | Sutil: el chat escribe, chips que entran | Juguetón: la bolsa se inclina, granos que caen | Casi nulo: solo estados de foco |
| Fondo | Blanco azulado plano | Capítulos alternados tinta de tueste y masa | Gris papel plano con reglas |
| Elemento firma | Chat de WhatsApp que agenda | "Pregúntale al tostador" | Formulario de 2 pasos → panel |
| Orden de secciones | Chat y acción → tratamientos → equipo → contacto | Catálogo primero, historia al final | Servicios → casos → contacto con formulario |

## Diales (1 a 10)

| | Variación de composición | Intensidad de movimiento | Densidad visual |
|---|---|---|---|
| Clínica | 3 | 3 | 3 |
| Tostador | 7 | 7 | 6 |
| Despacho | 2 | 1 | 7 |

Diferencias entre las tres, y contra el último proyecto del registro (Hilitos Lili, Fraunces + Hanken, bordes punteados, lila): tipografía, forma, densidad, movimiento, fondo y estructura cambian en las tres.

## 1. Clínica Dental Aralia

**Visual Theme & Atmosphere:** consultorio luminoso y callado. Poco contenido por pantalla, mucho espacio y un solo acento frío.

**Color Palette & Roles**
- `--c-bg` #F5F9FA fondo
- `--c-surface` #FFFFFF superficies
- `--c-ink` #0C2229 texto
- `--c-muted` #4F6970 texto secundario (contraste 5.6:1 sobre fondo)
- `--c-accent` #0A6F7E acento único, botones y burbujas del usuario
- `--c-line` #D5E4E8 reglas y bordes

**Typography Rules:** Schibsted Grotesk 600 para titulares (tracking -0.02em, máximo 4.5rem); Public Sans 400/500 para texto a 17px con interlineado 1.65.

**Component Stylings:** botones pill de 48px de alto; burbujas de chat de 1.25rem con la esquina inferior del emisor en 0.25rem; chips pill con borde.

**Layout Principles:** hero en dos columnas separadas (texto y acción / chat); resto en una columna de 40rem para lectura.

**Depth & Elevation:** una sombra suave solo en la ventana del chat; el resto plano con reglas.

**Do's and Don'ts:** una sola acción principal visible ("Agendar mi cita"); sin fotos de sonrisas; sin iconos en círculo; sin subtítulos decorativos.

**Responsive Behavior:** en móvil el chat pasa debajo del titular y ocupa el ancho completo; la acción principal queda a un toque.

**Agent Prompt Guide:** "Clínica tranquila, grotesca firme, un solo acento frío, pill, aire, movimiento que solo confirma."

## 2. Tostaduría Ceniza

**Visual Theme & Atmosphere:** cocina de tostador. Colores de grano tostado y masa de pan, bloques de color que cambian por capítulo.

**Color Palette & Roles**
- `--t-roast` #261710 capítulos oscuros
- `--t-dough` #F1E4CF capítulos claros
- `--t-ember` #C4501F acento (botones, precios)
- `--t-moss` #4D5A2F segundo tono para proceso y notas
- `--t-ink` #261710 texto sobre claro; `--t-paper` #FBF4E6 texto sobre oscuro

**Typography Rules:** Young Serif para titulares y nombres de café (sin cursiva); Work Sans 400/500 para texto a 17px.

**Component Stylings:** bolsas de café como tarjeta ilustrada (SVG) con etiqueta de proceso; botones de 1.25rem de radio; chips de nota de cata redondeados.

**Layout Principles:** catálogo en rejilla uniforme de bolsas a la misma proporción; detalle de producto en dos columnas (bolsa / ficha); el asistente ocupa su propia página con la conversación al centro.

**Depth & Elevation:** bloques de color plano; sombra cálida solo al levantar una bolsa en hover.

**Do's and Don'ts:** sin fotos de stock; la bolsa se inclina 2 grados en hover (un solo gesto juguetón repetido); el asistente nunca recomienda algo fuera del catálogo; sin etiquetas decorativas sobre títulos.

**Responsive Behavior:** rejilla de 1 a 2 columnas en móvil; filtros como chips con scroll horizontal.

**Agent Prompt Guide:** "Tostador artesanal con serif de carácter, tierras y brasa, bolsas ilustradas, movimiento juguetón y contenido."

## 3. Garza Rivas Contadores

**Visual Theme & Atmosphere:** despacho de cuentas. Papel gris, azul marino, reglas finas y mucha información ordenada.

**Color Palette & Roles**
- `--d-paper` #EEF0F2 fondo
- `--d-navy` #14233F texto y encabezados
- `--d-blue` #1F4E8C acción y enlaces
- `--d-rule` #B9C0CA reglas
- `--d-slate` #4A5568 texto secundario (contraste 6.5:1)
- Estados del panel: Nuevo `#8A5A00` sobre `#FFF3D6`, En contacto `#1F4E8C` sobre `#E3EDF9`, Cerrado `#2F6B3F` sobre `#E1F1E5`.

**Typography Rules:** Source Serif 4 600 para titulares y cifras de servicio; IBM Plex Sans 400/500 para texto a 16px.

**Component Stylings:** botones rectos de 44px; campos con borde de 1px y foco con contorno de 2px; filas separadas por regla, no por tarjetas; tabla del panel con encabezados reales.

**Layout Principles:** retícula de 12 columnas; servicios como lista con regla; el formulario ocupa 7 columnas y el aviso de qué pasa después 5.

**Depth & Elevation:** ninguna. Plano con reglas.

**Do's and Don'ts:** sin animación decorativa; sin cifras de resultados inventadas; los casos se rotulan como ilustrativos; el panel tiene estados vacío, cargando, error y éxito.

**Responsive Behavior:** retícula colapsa a una columna; la tabla del panel se vuelve lista de filas apiladas con la misma información.

**Agent Prompt Guide:** "Despacho serio, serif sobria, radio 0, retícula rígida, reglas finas, sin animación."

## Referencias (Paso 1.5) — pendientes de captura
Refero, Details y Design Spells piden cuenta o plan de pago y no se pueden abrir desde esta sesión. Para cerrar el registro, buscar capturas de:
- Clínica: agendado conversacional en sitios de salud; qué se toma: el orden "acción primero"; qué se descarta: fotos de stock y carruseles.
- Tostador: fichas de producto de cafés de especialidad; qué se toma: notas de cata como protagonista; qué se descarta: filtros técnicos sin explicación.
- Despacho: sitios de despachos con formularios por pasos; qué se toma: el paso corto con aviso de qué sigue; qué se descarta: la tarjeta genérica con icono.

## Elementos de biblioteca de componentes
Ninguno. Todo está escrito a mano en el estilo de cada demo; Radix no es necesario porque no hay diálogos ni menús complejos.
