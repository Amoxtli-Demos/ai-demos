import Link from "next/link";
import Bolsa from "@/components/tostador/Bolsa";
import CatalogoGrid from "@/components/tostador/CatalogoGrid";
import { getCafe } from "@/lib/catalog";

const GRANOS = [8, 22, 37, 51, 66, 79, 90];

export default function Inicio() {
  const hero = ["pico-verde", "barranca", "humo-suave"].map((s) => getCafe(s)!);
  return (
    <>
      <section className="relative overflow-hidden bg-t-roast text-t-paper">
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          {GRANOS.map((left, i) => (
            <span key={left} className="absolute top-0 h-4 w-2.5 rounded-full bg-t-ember/30 animate-bean" style={{ left: `${left}%`, animationDelay: `${i * 0.55}s` }} />
          ))}
        </div>
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:py-24 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <h1 className="font-tostadorDisplay text-[2.6rem] leading-[1.05] md:text-[4.4rem]">Siete cafés de México. Uno es para ti.</h1>
            <p className="mt-6 max-w-lg text-lg opacity-90">
              No hace falta saber de café. Dile al tostador cómo lo preparas y qué sabor buscas, y te dice cuál llevarte.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/tostador/pregunta" className="rounded-[1.25rem] bg-t-paper px-7 py-3.5 font-semibold text-t-roast transition hover:bg-t-dough">Pregúntale al tostador</Link>
              <Link href="/tostador/catalogo" className="rounded-[1.25rem] border border-t-paper/50 px-7 py-3.5 font-semibold transition hover:border-t-paper">Ver el catálogo</Link>
            </div>
          </div>
          <ul className="grid grid-cols-3 gap-4">
            {hero.map((c, i) => (
              <li key={c.slug} className={i === 1 ? "pt-8" : ""}>
                <Link href={`/tostador/catalogo/${c.slug}`} className="group block">
                  <Bolsa cafe={c} className="w-full origin-bottom transition-transform duration-300 group-hover:-rotate-2" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-xl font-tostadorDisplay text-3xl md:text-5xl">El catálogo completo</h2>
          <Link href="/tostador/catalogo" className="font-semibold text-t-emberDark underline-offset-4 hover:underline">Filtrar por cómo lo preparas</Link>
        </div>
        <CatalogoGrid conFiltros={false} />
      </section>

      <section className="bg-t-moss text-t-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:py-28 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <h2 className="font-tostadorDisplay text-3xl md:text-5xl">Un asistente que solo conoce nuestro café.</h2>
            <p className="mt-5 max-w-md text-lg opacity-90">
              No recomienda marcas de afuera ni inventa sabores. Responde con lo que hay en el catálogo, con sus notas, su precio y la cafetera que mejor le queda.
            </p>
          </div>
          <ul className="space-y-3">
            {["Quiero algo para espresso", "Busco un café suave para tomar con leche", "Algo frutal para cold brew"].map((q) => (
              <li key={q}>
                <Link href={`/tostador/pregunta?q=${encodeURIComponent(q)}`} className="block rounded-[1.25rem] bg-t-paper px-6 py-4 text-t-roast transition hover:bg-t-dough">
                  “{q}”
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="grid gap-8 md:grid-cols-[1fr_1.2fr]">
          <h2 className="font-tostadorDisplay text-3xl md:text-5xl">Del grano a la taza, sin vueltas.</h2>
          <div className="space-y-4 text-lg text-t-clay">
            <p>Cada café viene de una región distinta de México: Chiapas, Veracruz, Oaxaca, Guerrero y Puebla.</p>
            <p>Cada bolsa trae el proceso, el tueste y la cafetera que mejor le queda, para que no tengas que adivinar.</p>
            <Link href="/tostador/nosotros" className="inline-block font-semibold text-t-emberDark underline-offset-4 hover:underline">Conoce la tostaduría</Link>
          </div>
        </div>
      </section>
    </>
  );
}
