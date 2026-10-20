"use client";

import Link from "next/link";
import { useState } from "react";
import Bolsa from "./Bolsa";
import { CAFES, type Metodo } from "@/lib/catalog";

const FILTROS: { label: string; value: Metodo | "todos" }[] = [
  { label: "Todos", value: "todos" },
  { label: "Espresso", value: "espresso" },
  { label: "Cafetera italiana", value: "moka" },
  { label: "Prensa francesa", value: "prensa francesa" },
  { label: "Cafetera de goteo", value: "cafetera de goteo" },
  { label: "Filtro", value: "filtro (V60 o Chemex)" },
  { label: "Cold brew", value: "cold brew" },
];

export default function CatalogoGrid({ conFiltros = true, light = true }: { conFiltros?: boolean; light?: boolean }) {
  const [f, setF] = useState<Metodo | "todos">("todos");
  const lista = CAFES.filter((c) => f === "todos" || c.metodos.includes(f));
  return (
    <div>
      {conFiltros && (
        <div role="group" aria-label="¿Cómo lo preparas?" className="-mx-5 mb-10 flex gap-2 overflow-x-auto px-5 pb-2">
          {FILTROS.map((x) => (
            <button
              key={x.value}
              onClick={() => setF(x.value)}
              aria-pressed={f === x.value}
              className={`whitespace-nowrap rounded-[1.25rem] border px-4 py-2 text-[15px] font-medium transition ${
                f === x.value ? "border-t-roast bg-t-roast text-t-paper" : "border-t-roast/30 text-t-roast hover:border-t-roast"
              }`}
            >
              {x.label}
            </button>
          ))}
        </div>
      )}
      <ul className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
        {lista.map((c) => (
          <li key={c.slug} className="group">
            <Link href={`/tostador/catalogo/${c.slug}`} className="block">
              <Bolsa cafe={c} className="mx-auto w-full max-w-[11rem] origin-bottom transition-transform duration-300 group-hover:-rotate-2 group-hover:scale-[1.03]" />
              <h3 className={`mt-4 font-tostadorDisplay text-xl ${light ? "text-t-roast" : "text-t-paper"}`}>{c.nombre}</h3>
              <p className={`text-sm ${light ? "text-t-clay" : "opacity-80"}`}>{c.notas.join(", ")}</p>
              <p className={`mt-1 text-[15px] font-semibold ${light ? "text-t-emberDark" : ""}`}>${c.precio} MXN</p>
            </Link>
          </li>
        ))}
      </ul>
      {!lista.length && <p className="py-10 text-t-clay">Ninguno de nuestros cafés es ideal para ese método todavía.</p>}
    </div>
  );
}
