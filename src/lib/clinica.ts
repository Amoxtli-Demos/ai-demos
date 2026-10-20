/** Datos ficticios de Clínica Dental Aralia (demo de AMOXTLI®). */
export const CLINICA = {
  nombre: "Clínica Dental Aralia",
  telefono: "55 0000 0000",
  direccion: "Dirección de ejemplo, Ciudad de México",
  horario: "Lunes a viernes de 9:00 a 19:00. Sábado de 9:00 a 14:00.",
};

export const SERVICIOS = [
  { id: "limpieza", nombre: "Limpieza dental", duracion: "40 min", texto: "Quitamos sarro y manchas con ultrasonido y pulido. Se hace cada seis meses y casi no se siente." },
  { id: "revision", nombre: "Revisión general", duracion: "30 min", texto: "Revisamos dientes, encías y mordida, y te decimos qué sí necesita atención y qué puede esperar." },
  { id: "blanqueamiento", nombre: "Blanqueamiento", duracion: "60 min", texto: "Aclaramos el tono en una sola sesión, con protección para encías. Antes revisamos que tus dientes lo aguanten." },
  { id: "ortodoncia", nombre: "Ortodoncia", duracion: "45 min", texto: "Valoración para brackets o alineadores. Sales con un plan de tratamiento por escrito." },
  { id: "endodoncia", nombre: "Endodoncia", duracion: "60 min", texto: "Tratamiento de conducto cuando el dolor no se quita con analgésicos. Con anestesia local." },
  { id: "resinas", nombre: "Resinas", duracion: "45 min", texto: "Reparamos caries y fracturas con resina del color de tu diente, en una sola visita." },
];

export const EQUIPO = [
  { nombre: "Dra. Marina Ibarra", rol: "Odontología general y estética", texto: "Atiende revisiones, limpiezas y blanqueamiento. Explica cada paso antes de empezar." },
  { nombre: "Dr. Tomás Quiroz", rol: "Endodoncia", texto: "Se encarga de los tratamientos de conducto y de las urgencias con dolor." },
  { nombre: "Dra. Elena Sarabia", rol: "Ortodoncia", texto: "Valora brackets y alineadores, y da seguimiento mensual a cada caso." },
];

export const HORAS = ["09:00", "10:00", "11:00", "12:00", "13:00", "16:00", "17:00", "18:00"];
export const HORAS_SABADO = ["09:00", "10:00", "11:00", "12:00", "13:00"];

/** Respuestas guionadas para preguntas frecuentes cuando no hay clave de Claude. */
export function faqLocal(texto: string): string {
  const q = texto.toLowerCase();
  if (/horario|abren|cierran|hora/.test(q)) return `Atendemos ${CLINICA.horario}`;
  if (/dónde|donde|ubicaci|direcci|llegar/.test(q)) return `Estamos en: ${CLINICA.direccion}. Es una clínica de ejemplo, así que la dirección es ilustrativa.`;
  if (/precio|cuesta|costo|cuánto|cuanto/.test(q)) return "El costo depende del tratamiento y se confirma en la consulta, después de revisarte. Nunca cobramos un tratamiento sin explicarlo antes.";
  if (/pago|tarjeta|efectivo|transferencia/.test(q)) return "Aceptamos efectivo, tarjeta y transferencia. El pago se hace en la clínica al terminar tu cita.";
  if (/dolor|duele|urgenc|muela/.test(q)) return "Si tienes dolor fuerte, agenda hoy mismo y marca 'Endodoncia' o 'Revisión general'. Si el dolor es insoportable o hay hinchazón en la cara, llámanos al " + CLINICA.telefono + ".";
  if (/niñ|hij|pediatr/.test(q)) return "Atendemos desde los 6 años con revisión y limpieza. Para tratamientos en menores necesitamos que venga su mamá, papá o tutor.";
  return "Con gusto te ayudo con horarios, tratamientos o para agendar una cita. ¿Qué necesitas?";
}
