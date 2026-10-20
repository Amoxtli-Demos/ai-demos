import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Cita, Lead, LeadEstado } from "./types";

/**
 * Almacenamiento de las demos.
 * - Con SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY usa Supabase (ver supabase/migrations).
 * - Sin ellas usa memoria del proceso: sirve para grabar en local, se pierde al reiniciar.
 */

type Mem = { leads: Lead[]; citas: Cita[] };
const g = globalThis as unknown as { __demoMem?: Mem };
const mem: Mem = (g.__demoMem ??= { leads: [], citas: [] });

let sb: SupabaseClient | null | undefined;
function supabase(): SupabaseClient | null {
  if (sb !== undefined) return sb;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  sb = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
  return sb;
}

export function storageMode(): "supabase" | "memoria" {
  return supabase() ? "supabase" : "memoria";
}

const uid = () => crypto.randomUUID();

// ---------- Leads (despacho) ----------
export async function listLeads(): Promise<Lead[]> {
  const db = supabase();
  if (db) {
    const { data, error } = await db.from("demo_leads").select("*").order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as Lead[];
  }
  return [...mem.leads].sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function createLead(input: Omit<Lead, "id" | "created_at" | "estado">): Promise<Lead> {
  const lead: Lead = { ...input, id: uid(), created_at: new Date().toISOString(), estado: "nuevo" };
  const db = supabase();
  if (db) {
    const { error } = await db.from("demo_leads").insert(lead);
    if (error) throw new Error(error.message);
    return lead;
  }
  mem.leads.push(lead);
  return lead;
}

export async function updateLeadEstado(id: string, estado: LeadEstado): Promise<Lead | null> {
  const db = supabase();
  if (db) {
    const { data, error } = await db.from("demo_leads").update({ estado }).eq("id", id).select().maybeSingle();
    if (error) throw new Error(error.message);
    return (data as Lead) ?? null;
  }
  const l = mem.leads.find((x) => x.id === id);
  if (!l) return null;
  l.estado = estado;
  return l;
}

// ---------- Citas (clínica) ----------
export async function horasOcupadas(dia: string): Promise<string[]> {
  const db = supabase();
  if (db) {
    const { data, error } = await db.from("demo_citas").select("hora").eq("dia", dia);
    if (error) throw new Error(error.message);
    return (data ?? []).map((r: { hora: string }) => r.hora);
  }
  return mem.citas.filter((c) => c.dia === dia).map((c) => c.hora);
}

export async function createCita(input: Omit<Cita, "id" | "created_at">): Promise<Cita | "ocupado"> {
  const ocupadas = await horasOcupadas(input.dia);
  if (ocupadas.includes(input.hora)) return "ocupado";
  const cita: Cita = { ...input, id: uid(), created_at: new Date().toISOString() };
  const db = supabase();
  if (db) {
    const { error } = await db.from("demo_citas").insert(cita);
    if (error) throw new Error(error.message);
    return cita;
  }
  mem.citas.push(cita);
  return cita;
}
