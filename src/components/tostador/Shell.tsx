"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/tostador", label: "Inicio" },
  { href: "/tostador/catalogo", label: "Catálogo" },
  { href: "/tostador/pregunta", label: "Pregúntale al tostador" },
  { href: "/tostador/nosotros", label: "Nosotros" },
];

export function Nav() {
  const path = usePathname() ?? "";
  const activo = (h: string) => (h === "/tostador" ? path === h : path.startsWith(h));
  return (
    <header className="sticky top-0 z-30 bg-t-roast text-t-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link href="/tostador" className="font-tostadorDisplay text-2xl">Ceniza</Link>
        <nav aria-label="Principal" className="hidden items-center gap-8 text-[15px] md:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} aria-current={activo(l.href) ? "page" : undefined} className={activo(l.href) ? "border-b-2 border-t-ember pb-0.5 font-semibold" : "opacity-85 transition hover:opacity-100"}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <nav aria-label="Principal móvil" className="flex gap-6 overflow-x-auto border-t border-white/10 px-5 py-2.5 text-sm md:hidden">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} aria-current={activo(l.href) ? "page" : undefined} className={`whitespace-nowrap ${activo(l.href) ? "font-semibold underline decoration-t-ember decoration-2 underline-offset-4" : "opacity-85"}`}>
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-t-roast text-t-paper">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="font-tostadorDisplay text-3xl">Tostaduría Ceniza</p>
          <p className="mt-3 max-w-xs text-[15px] opacity-80">Café mexicano en bolsas de 250 gramos. Pregunta, elige y pide por WhatsApp.</p>
        </div>
        <div className="text-[15px]">
          <p className="font-semibold">Pedidos</p>
          <a href="https://wa.me/520000000000" className="mt-2 block opacity-80 hover:opacity-100">WhatsApp 55 0000 0000</a>
          <p className="opacity-80">Lunes a sábado</p>
        </div>
        <div className="text-[15px]">
          <p className="font-semibold">Explora</p>
          {LINKS.slice(1).map((l) => (
            <Link key={l.href} href={l.href} className="mt-1 block opacity-80 hover:opacity-100">{l.label}</Link>
          ))}
        </div>
      </div>
      <p className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 border-t border-white/10 px-5 py-4 text-sm opacity-80">
        <span>Sitio demo de AMOXTLI®. Marca, cafés y precios ficticios.</span>
        <span>Desarrollado por AMOXTLI®</span>
      </p>
    </footer>
  );
}
