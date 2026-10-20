import type { Metadata } from "next";
import { CASOS } from "@/lib/despacho";

export const metadata: Metadata = { title: "Casos", description: "Ejemplos ilustrativos de cómo trabajamos." };

export default function Casos() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
      <h1 className="font-despachoDisplay text-4xl font-semibold md:text-5xl">Casos</h1>
      <p className="mt-4 max-w-2xl text-lg text-d-slate">Tres situaciones típicas. Son ilustrativas: este despacho y sus clientes son ficticios.</p>
      <div className="mt-12 border-t-2 border-d-navy">
        {CASOS.map((c) => (
          <article key={c.titulo} className="grid gap-4 border-b border-d-rule py-8 md:grid-cols-12 md:gap-8">
            <h2 className="font-despachoDisplay text-2xl font-semibold md:col-span-4">{c.titulo}</h2>
            <dl className="grid gap-4 md:col-span-8 md:grid-cols-3">
              {[["Situación", c.situacion], ["Lo que hicimos", c.hicimos], ["Resultado", c.resultado]].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-sm font-semibold">{k}</dt>
                  <dd className="mt-1 text-[15px] text-d-slate">{v}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}
