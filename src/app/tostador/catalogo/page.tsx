import type { Metadata } from "next";
import CatalogoGrid from "@/components/tostador/CatalogoGrid";

export const metadata: Metadata = { title: "Catálogo", description: "Siete cafés de México con sus notas, precio y la cafetera ideal para cada uno." };

export default function Catalogo() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <h1 className="font-tostadorDisplay text-4xl md:text-6xl">Catálogo</h1>
      <p className="mt-4 mb-10 max-w-xl text-lg text-t-clay">Elige cómo lo preparas y te mostramos los cafés que mejor le quedan. Todas las bolsas son de 250 gramos.</p>
      <CatalogoGrid />
    </div>
  );
}
