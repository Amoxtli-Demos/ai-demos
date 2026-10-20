export type LeadEstado = "nuevo" | "contacto" | "cerrado";

export interface Lead {
  id: string;
  created_at: string;
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  servicio: string;
  mensaje: string;
  estado: LeadEstado;
}

export interface Cita {
  id: string;
  created_at: string;
  nombre: string;
  telefono: string;
  servicio: string;
  dia: string; // YYYY-MM-DD
  hora: string; // HH:MM
}

export interface ChatMsg {
  role: "user" | "assistant";
  content: string;
}
