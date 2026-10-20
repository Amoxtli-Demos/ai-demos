import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Nosotros", description: "La tostaduría detrás de Ceniza." };

export default function Nosotros() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
      <h1 className="font-tostadorDisplay text-4xl md:text-6xl">Nosotros</h1>
      <div className="mt-8 space-y-5 text-lg">
        <p>Ceniza es una tostaduría de ejemplo creada por AMOXTLI® para mostrar cómo se ve un asistente de IA entrenado con el catálogo de un negocio real.</p>
        <p>Los cafés, los precios y las personas de este sitio son ficticios. Lo que sí es real es el funcionamiento: el asistente solo conoce los siete cafés del catálogo y no puede recomendar nada fuera de él.</p>
        <p>Si tienes un catálogo de productos, servicios o preguntas frecuentes, se puede hacer lo mismo con tu información.</p>
      </div>
      <Link href="/tostador/pregunta" className="mt-10 inline-block rounded-[1.25rem] bg-t-emberDark px-7 py-3.5 font-semibold text-t-paper transition hover:bg-t-ember">Probar el asistente</Link>
    </div>
  );
}
