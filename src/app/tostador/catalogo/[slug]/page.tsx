import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Bolsa from "@/components/tostador/Bolsa";
import { CAFES, getCafe } from "@/lib/catalog";

export function generateStaticParams() {
  return CAFES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = getCafe(params.slug);
  return c ? { title: c.nombre, description: `${c.nombre}, café de ${c.origen}: ${c.notas.join(", ")}.` } : {};
}

const Medidor = ({ valor, etiqueta }: { valor: number; etiqueta: string }) => (
  <div className="flex items-center justify-between gap-4">
    <dt>{etiqueta}</dt>
    <dd className="flex gap-1.5" aria-label={`${valor} de 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={`h-3 w-3 rounded-full ${n <= valor ? "bg-t-emberDark" : "bg-t-roast/15"}`} />
      ))}
    </dd>
  </div>
);

export default function Detalle({ params }: { params: { slug: string } }) {
  const c = getCafe(params.slug);
  if (!c) notFound();
  const wa = `https://wa.me/520000000000?text=${encodeURIComponent(`Hola, quiero pedir una bolsa de ${c.nombre} (250 g).`)}`;
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:py-20">
      <Link href="/tostador/catalogo" className="text-[15px] font-semibold text-t-emberDark underline-offset-4 hover:underline">Volver al catálogo</Link>
      <div className="mt-8 grid gap-12 md:grid-cols-[0.8fr_1fr] md:items-center">
        <div className="rounded-[1.25rem] bg-t-paper px-10 py-12">
          <Bolsa cafe={c} className="mx-auto w-full max-w-[16rem]" />
        </div>
        <div>
          <h1 className="font-tostadorDisplay text-5xl md:text-6xl">{c.nombre}</h1>
          <p className="mt-2 text-lg text-t-clay">{c.origen} · {c.proceso} · tueste {c.tueste.toLowerCase()}</p>
          <p className="mt-6 text-lg">{c.historia}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {c.notas.map((n) => (
              <li key={n} className="rounded-[1.25rem] bg-t-moss px-4 py-1.5 text-[15px] text-t-paper">{n}</li>
            ))}
          </ul>

          <dl className="mt-8 max-w-sm space-y-3 border-y border-t-roast/20 py-5 text-[16px]">
            <Medidor etiqueta="Cuerpo" valor={c.cuerpo} />
            <Medidor etiqueta="Acidez" valor={c.acidez} />
          </dl>
          <p className="mt-5 text-[16px]"><span className="font-semibold">Ideal para:</span> {c.metodos.join(", ")}.</p>

          <p className="mt-8 font-tostadorDisplay text-4xl text-t-emberDark">${c.precio} <span className="font-tostadorText text-base text-t-clay">MXN · bolsa de 250 g</span></p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a href={wa} className="rounded-[1.25rem] bg-t-emberDark px-7 py-3.5 font-semibold text-t-paper transition hover:bg-t-ember">Pedir por WhatsApp</a>
            <Link href={`/tostador/pregunta?q=${encodeURIComponent(`¿Para quién es bueno ${c.nombre}?`)}`} className="rounded-[1.25rem] border border-t-roast/40 px-7 py-3.5 font-semibold transition hover:border-t-roast">¿Es para mí?</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
