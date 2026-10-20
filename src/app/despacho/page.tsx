import Link from "next/link";
import { SERVICIOS_D } from "@/lib/despacho";

export default function Inicio() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-7">
          <h1 className="font-despachoDisplay text-[2.4rem] font-semibold leading-[1.1] md:text-[3.6rem]">Contabilidad en orden. Impuestos sin sorpresas.</h1>
          <p className="mt-6 max-w-xl text-lg text-d-slate">
            Llevamos las cuentas, las declaraciones y la nómina de negocios pequeños y medianos. Cuéntanos tu caso y un contador te contacta con una propuesta clara.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/despacho/contacto" className="bg-d-blue px-7 py-3.5 font-medium text-white hover:bg-d-navy">Solicitar una asesoría</Link>
            <Link href="/despacho/servicios" className="border border-d-navy px-7 py-3.5 font-medium hover:bg-d-white">Ver servicios</Link>
          </div>
        </div>
        <aside className="border-t-2 border-d-navy pt-5 md:col-span-5" aria-label="Qué puedes pedirnos">
          <p className="font-despachoDisplay text-xl font-semibold">Qué puedes pedirnos</p>
          <ul className="mt-3 divide-y divide-d-rule">
            {SERVICIOS_D.slice(0, 5).map((s) => (
              <li key={s.id}>
                <Link href={`/despacho/servicios#${s.id}`} className="flex items-baseline justify-between gap-4 py-3 hover:text-d-blue">
                  <span>{s.nombre}</span>
                  <span aria-hidden className="text-d-slate">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="border-y border-d-rule bg-d-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-12">
          <h2 className="font-despachoDisplay text-3xl font-semibold md:col-span-4">Cómo empezamos</h2>
          <dl className="divide-y divide-d-rule border-y border-d-rule md:col-span-8">
            {[
              ["Tú cuentas tu caso", "Un formulario de dos pasos: qué necesitas y cómo contactarte. Tarda menos de un minuto."],
              ["Te escribimos", "Recibimos tu solicitud al instante y un contador te contacta el siguiente día hábil."],
              ["Revisamos y te proponemos", "Vemos tu situación y te damos un alcance y un costo por escrito, antes de empezar."],
            ].map(([t, d]) => (
              <div key={t} className="grid gap-1 py-5 md:grid-cols-[14rem_1fr] md:gap-8">
                <dt className="font-despachoDisplay text-lg font-semibold">{t}</dt>
                <dd className="text-d-slate">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="flex flex-col items-start justify-between gap-6 border-2 border-d-navy bg-d-white p-8 md:flex-row md:items-center">
          <p className="max-w-xl font-despachoDisplay text-2xl font-semibold">¿Te llegó una carta del SAT o no sabes en qué régimen estás?</p>
          <Link href="/despacho/contacto" className="bg-d-blue px-7 py-3.5 font-medium text-white hover:bg-d-navy">Pedir revisión de mi caso</Link>
        </div>
      </section>
    </>
  );
}
