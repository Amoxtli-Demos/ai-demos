import type { Metadata } from "next";
import Asistente from "@/components/tostador/Asistente";

export const metadata: Metadata = { title: "Pregúntale al tostador", description: "Un asistente que solo recomienda cafés de nuestro catálogo." };

export default function Pregunta({ searchParams }: { searchParams: { q?: string } }) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:py-20">
      <h1 className="font-tostadorDisplay text-4xl md:text-6xl">Pregúntale al tostador</h1>
      <p className="mt-4 mb-8 text-lg text-t-clay">Responde con el catálogo real de la tostaduría: nada de cafés de otras marcas ni sabores inventados.</p>
      <Asistente inicial={searchParams.q?.slice(0, 200) ?? ""} />
    </div>
  );
}
