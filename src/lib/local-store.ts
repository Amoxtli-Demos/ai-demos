import type { Cita, Lead, LeadEstado } from "./types";

/**
 * Estado de las demos: vive en el navegador (localStorage), sin base de datos.
 * Si el navegador bloquea localStorage, cae a memoria de la pestaña.
 */
const K_CITAS = "aralia_citas";
const K_LEADS = "garza_leads";
const memoria: Record<string, unknown[]> = {};

function leer<T>(k: string): T[] {
  try {
    return JSON.parse(localStorage.getItem(k) ?? "[]") as T[];
  } catch {
    return (memoria[k] as T[]) ?? [];
  }
}
function escribir<T>(k: string, v: T[]) {
  memoria[k] = v;
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {}
}

// ---- Citas (clínica) ----
export const horasOcupadas = (dia: string): string[] => leer<Cita>(K_CITAS).filter((c) => c.dia === dia).map((c) => c.hora);

export function guardarCita(input: Omit<Cita, "id" | "created_at">): Cita | "ocupado" {
  if (horasOcupadas(input.dia).includes(input.hora)) return "ocupado";
  const cita: Cita = { ...input, id: crypto.randomUUID(), created_at: new Date().toISOString() };
  escribir(K_CITAS, [...leer<Cita>(K_CITAS), cita]);
  return cita;
}

// ---- Leads (despacho) ----
export const listarLeads = (): Lead[] => leer<Lead>(K_LEADS).sort((a, b) => b.created_at.localeCompare(a.created_at));

export function guardarLead(input: Omit<Lead, "id" | "created_at" | "estado">): Lead {
  const lead: Lead = { ...input, id: crypto.randomUUID(), created_at: new Date().toISOString(), estado: "nuevo" };
  escribir(K_LEADS, [...leer<Lead>(K_LEADS), lead]);
  return lead;
}

export function cambiarEstadoLead(id: string, estado: LeadEstado) {
  escribir(K_LEADS, leer<Lead>(K_LEADS).map((l) => (l.id === id ? { ...l, estado } : l)));
}
