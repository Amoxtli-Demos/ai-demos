import type { Metadata } from "next";
import Link from "next/link";
import { SERVICIOS } from "@/lib/clinica";

export const metadata: Metadata = { title: "Tratamientos", description: "Limpieza, revisión, blanqueamiento, ortodoncia, endodoncia y resinas." };

export default function Tratamientos() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
      <h1 className="font-clinicaDisplay text-4xl font-semibold tracking-[-0.02em] md:text-6xl">Tratamientos</h1>
      <p className="mt-5 text-lg text-c-muted">Antes de cualquier tratamiento hacemos una revisión y te explicamos las opciones. El costo se confirma en consulta.</p>
      <div className="mt-12 space-y-12">
        {SERVICIOS.map((s) => (
          <article key={s.id} id={s.id} className="scroll-mt-28 border-t border-c-line pt-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-clinicaDisplay text-2xl font-semibold">{s.nombre}</h2>
              <p className="text-sm text-c-muted">Duración: {s.duracion}</p>
            </div>
            <p className="mt-3 text-c-muted">{s.texto}</p>
            <Link href="/clinica#chat" className="mt-4 inline-block font-semibold text-c-accent underline-offset-4 hover:underline">Agendar {s.nombre.toLowerCase()}</Link>
          </article>
        ))}
      </div>
    </div>
  );
}
