/** Datos ficticios de Garza Rivas Contadores (demo de AMOXTLI®). */
export const SERVICIOS_D = [
  { id: "contabilidad", nombre: "Contabilidad mensual", texto: "Registro de ingresos y gastos, conciliación bancaria y estados financieros al cierre de cada mes.", ideal: "Negocios que hoy llevan sus cuentas en hojas de cálculo." },
  { id: "impuestos", nombre: "Declaraciones e impuestos", texto: "Declaraciones mensuales y anual, pagos provisionales y respuesta a requerimientos del SAT.", ideal: "Personas físicas con actividad empresarial y empresas pequeñas." },
  { id: "nomina", nombre: "Nómina e IMSS", texto: "Cálculo de nómina, altas y bajas ante el IMSS, recibos timbrados y cuotas obrero-patronales.", ideal: "Empresas con equipo contratado, desde dos personas." },
  { id: "constitucion", nombre: "Constitución de empresas", texto: "Acompañamiento para elegir el régimen, dar de alta la empresa y abrir su registro fiscal.", ideal: "Quien está por abrir un negocio y quiere hacerlo bien desde el inicio." },
  { id: "facturacion", nombre: "Facturación electrónica", texto: "Configuración de CFDI, complementos de pago y cancelaciones, con capacitación para tu equipo.", ideal: "Negocios que facturan a mano o con un sistema que ya no les sirve." },
  { id: "asesoria", nombre: "Asesoría fiscal", texto: "Revisión de tu situación actual y un plan por escrito para pagar lo justo y evitar multas.", ideal: "Quien recibió una carta del SAT o no sabe en qué régimen debería estar." },
];

export const CASOS = [
  { titulo: "Una cafetería con las cuentas en un cuaderno", situacion: "Vendía bien, pero no sabía cuánto ganaba al mes ni si estaba pagando de más.", hicimos: "Ordenamos ingresos y gastos, migramos a facturación electrónica y dejamos un cierre mensual de una página.", resultado: "El dueño conoce su utilidad cada mes y presenta declaraciones a tiempo." },
  { titulo: "Un despacho de arquitectura con carta del SAT", situacion: "Recibió un requerimiento por una declaración que no coincidía con sus facturas.", hicimos: "Conciliamos facturas contra declaraciones, preparamos la respuesta y presentamos la aclaración.", resultado: "El requerimiento se atendió en tiempo y el cliente ya no recibió cartas por ese ejercicio." },
  { titulo: "Una tienda en línea que contrató a su primer equipo", situacion: "Pasó de una persona a cinco y no tenía nómina ni alta en el IMSS.", hicimos: "Dimos de alta al personal, configuramos nómina quincenal y recibos timbrados.", resultado: "La nómina se paga en fecha y las cuotas se calculan sin que el dueño intervenga." },
];

export const ESTADOS = {
  nuevo: { label: "Nuevo", cls: "bg-[#FFF3D6] text-[#8A5A00]" },
  contacto: { label: "En contacto", cls: "bg-[#E3EDF9] text-[#1F4E8C]" },
  cerrado: { label: "Cerrado", cls: "bg-[#E1F1E5] text-[#2F6B3F]" },
} as const;
