import type { Metadata } from "next";
import { EQUIPO } from "@/lib/clinica";

export const metadata: Metadata = { title: "Equipo", description: "Las doctoras y el doctor que te atienden en Clínica Dental Aralia." };

export default function Equipo() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
      <h1 className="font-clinicaDisplay text-4xl font-semibold tracking-[-0.02em] md:text-6xl">Equipo</h1>
      <p className="mt-5 text-lg text-c-muted">Tres especialistas, cada uno con su área. Las personas de esta página son ficticias.</p>
      <dl className="mt-12 divide-y divide-c-line border-y border-c-line">
        {EQUIPO.map((p) => (
          <div key={p.nombre} className="grid gap-2 py-8 md:grid-cols-[16rem_1fr] md:gap-10">
            <dt>
              <p className="font-clinicaDisplay text-2xl font-semibold">{p.nombre}</p>
              <p className="text-sm font-medium text-c-accent">{p.rol}</p>
            </dt>
            <dd className="text-c-muted">{p.texto}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
