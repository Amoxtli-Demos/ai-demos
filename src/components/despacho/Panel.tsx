"use client";

import { useCallback, useEffect, useState } from "react";
import { ESTADOS } from "@/lib/despacho";
import type { Lead, LeadEstado } from "@/lib/types";

const fmt = (iso: string) => new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
const ORDEN: LeadEstado[] = ["nuevo", "contacto", "cerrado"];

export default function Panel() {
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [modo, setModo] = useState("");
  const [error, setError] = useState(false);
  const [filtro, setFiltro] = useState<LeadEstado | "todos">("todos");

  const cargar = useCallback(async () => {
    try {
      const r = await fetch("/api/leads", { cache: "no-store" });
      if (!r.ok) throw new Error();
      const d = await r.json();
      setLeads(d.leads);
      setModo(d.almacenamiento);
      setError(false);
    } catch {
      setError(true);
    }
  }, []);

  useEffect(() => {
    cargar();
    const t = setInterval(cargar, 4000);
    return () => clearInterval(t);
  }, [cargar]);

  const cambiar = async (id: string, estado: LeadEstado) => {
    setLeads((p) => p?.map((l) => (l.id === id ? { ...l, estado } : l)) ?? p);
    const r = await fetch(`/api/leads/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ estado }) });
    if (!r.ok) cargar();
  };

  const visibles = leads?.filter((l) => filtro === "todos" || l.estado === filtro) ?? [];
  const cuenta = (e: LeadEstado) => leads?.filter((l) => l.estado === e).length ?? 0;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-despachoDisplay text-4xl font-semibold">Panel de solicitudes</h1>
          <p className="mt-2 text-d-slate">Se actualiza solo cada pocos segundos. {modo && <span>Almacenamiento: {modo}.</span>}</p>
        </div>
        <div role="group" aria-label="Filtrar por estado" className="flex flex-wrap border border-d-navy">
          {(["todos", ...ORDEN] as const).map((e) => (
            <button key={e} onClick={() => setFiltro(e)} aria-pressed={filtro === e} className={`px-4 py-2 text-sm font-medium ${filtro === e ? "bg-d-navy text-white" : "bg-d-white hover:bg-d-paper"}`}>
              {e === "todos" ? `Todas${leads ? ` (${leads.length})` : ""}` : `${ESTADOS[e].label} (${cuenta(e)})`}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        {error && !leads && (
          <p role="alert" className="border border-[#A12622] bg-[#FBEAE9] p-4 text-[#A12622]">No se pudo cargar el panel. <button onClick={cargar} className="font-semibold underline">Reintentar</button></p>
        )}
        {!error && !leads && <p className="border border-d-rule bg-d-white p-6 text-d-slate" role="status">Cargando solicitudes…</p>}
        {leads && !visibles.length && (
          <div className="border border-d-rule bg-d-white p-10 text-center">
            <p className="font-despachoDisplay text-2xl font-semibold">{leads.length ? "No hay solicitudes con ese estado." : "Aún no hay solicitudes."}</p>
            {!leads.length && <p className="mt-2 text-d-slate">Cuando alguien llene el formulario de contacto, aparecerá aquí en segundos.</p>}
          </div>
        )}
        {leads && visibles.length > 0 && (
          <ul className="divide-y divide-d-rule border border-d-rule bg-d-white md:hidden" aria-label="Solicitudes de asesoría recibidas">
            {visibles.map((l) => (
              <li key={l.id} className="space-y-3 p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-semibold">{l.nombre}</p>
                  <p className="whitespace-nowrap text-sm text-d-slate">{fmt(l.created_at)}</p>
                </div>
                <div className="text-[15px] text-d-slate">
                  {l.empresa && <p>{l.empresa}</p>}
                  <p>{l.email}</p>
                  {l.telefono && <p>{l.telefono}</p>}
                </div>
                <div>
                  <p className="font-medium">{l.servicio}</p>
                  {l.mensaje && <p className="mt-1 text-[15px] text-d-slate">{l.mensaje}</p>}
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                  <label className="sr-only" htmlFor={`m-${l.id}`}>Estado de {l.nombre}</label>
                  <select id={`m-${l.id}`} value={l.estado} onChange={(e) => cambiar(l.id, e.target.value as LeadEstado)} className={`border border-d-rule px-2.5 py-1.5 text-sm font-semibold ${ESTADOS[l.estado].cls}`}>
                    {ORDEN.map((e) => <option key={e} value={e}>{ESTADOS[e].label}</option>)}
                  </select>
                  <a href={`mailto:${l.email}?subject=${encodeURIComponent("Tu solicitud de asesoría")}`} className="text-d-blue underline underline-offset-4">Correo</a>
                  {l.telefono && <a href={`https://wa.me/52${l.telefono}`} className="text-d-blue underline underline-offset-4">WhatsApp</a>}
                </div>
              </li>
            ))}
          </ul>
        )}
        {leads && visibles.length > 0 && (
          <div className="relative hidden overflow-x-auto border border-d-rule bg-d-white md:block">
            <table className="w-full min-w-[56rem] border-collapse text-left text-[15px]">
              <caption className="sr-only">Solicitudes de asesoría recibidas</caption>
              <thead className="border-b-2 border-d-navy text-sm">
                <tr>
                  <th scope="col" className="px-4 py-3">Recibida</th>
                  <th scope="col" className="px-4 py-3">Contacto</th>
                  <th scope="col" className="px-4 py-3">Servicio y mensaje</th>
                  <th scope="col" className="px-4 py-3">Estado</th>
                  <th scope="col" className="px-4 py-3">Responder</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-d-rule">
                {visibles.map((l) => (
                  <tr key={l.id} className="align-top">
                    <td className="whitespace-nowrap px-4 py-4 text-d-slate">{fmt(l.created_at)}</td>
                    <td className="px-4 py-4">
                      <p className="font-semibold">{l.nombre}</p>
                      {l.empresa && <p className="text-d-slate">{l.empresa}</p>}
                      <p className="text-d-slate">{l.email}</p>
                      {l.telefono && <p className="text-d-slate">{l.telefono}</p>}
                    </td>
                    <td className="max-w-xs px-4 py-4">
                      <p className="font-medium">{l.servicio}</p>
                      {l.mensaje && <p className="mt-1 text-d-slate">{l.mensaje}</p>}
                    </td>
                    <td className="px-4 py-4">
                      <label className="sr-only" htmlFor={`e-${l.id}`}>Estado de {l.nombre}</label>
                      <select id={`e-${l.id}`} value={l.estado} onChange={(e) => cambiar(l.id, e.target.value as LeadEstado)} className={`border border-d-rule px-2.5 py-1.5 text-sm font-semibold ${ESTADOS[l.estado].cls}`}>
                        {ORDEN.map((e) => <option key={e} value={e}>{ESTADOS[e].label}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col items-start gap-1.5 text-sm font-medium">
                        <a href={`mailto:${l.email}?subject=${encodeURIComponent("Tu solicitud de asesoría")}`} className="text-d-blue underline underline-offset-4 hover:text-d-navy">Correo</a>
                        {l.telefono && <a href={`https://wa.me/52${l.telefono}`} className="text-d-blue underline underline-offset-4 hover:text-d-navy">WhatsApp</a>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
