import type { Metadata } from "next";
import Link from "next/link";
import { SERVICIOS_D } from "@/lib/despacho";

export const metadata: Metadata = { title: "Servicios", description: "Contabilidad, impuestos, nómina, constitución de empresas, facturación y asesoría fiscal." };

export default function Servicios() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
      <h1 className="font-despachoDisplay text-4xl font-semibold md:text-5xl">Servicios</h1>
      <p className="mt-4 max-w-2xl text-lg text-d-slate">Cada servicio se cotiza después de revisar tu caso. No cobramos por la primera conversación.</p>
      <div className="mt-12 border-t-2 border-d-navy">
        {SERVICIOS_D.map((s) => (
          <article key={s.id} id={s.id} className="grid scroll-mt-6 gap-3 border-b border-d-rule py-8 md:grid-cols-12 md:gap-8">
            <h2 className="font-despachoDisplay text-2xl font-semibold md:col-span-4">{s.nombre}</h2>
            <p className="text-d-slate md:col-span-5">{s.texto}</p>
            <div className="md:col-span-3">
              <p className="text-sm font-semibold">Ideal si</p>
              <p className="text-sm text-d-slate">{s.ideal}</p>
            </div>
          </article>
        ))}
      </div>
      <Link href="/despacho/contacto" className="mt-10 inline-block bg-d-blue px-7 py-3.5 font-medium text-white hover:bg-d-navy">Solicitar asesoría</Link>
    </div>
  );
}
