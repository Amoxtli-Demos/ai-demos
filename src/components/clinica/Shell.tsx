"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/clinica", label: "Inicio" },
  { href: "/clinica/tratamientos", label: "Tratamientos" },
  { href: "/clinica/equipo", label: "Equipo" },
  { href: "/clinica/contacto", label: "Contacto" },
];

export function Nav() {
  const path = usePathname() ?? "";
  return (
    <header className="sticky top-0 z-30 border-b border-c-line bg-c-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link href="/clinica" className="font-clinicaDisplay text-xl font-semibold tracking-tight text-c-ink">
          Aralia <span className="font-normal text-c-muted">Clínica Dental</span>
        </Link>
        <nav aria-label="Principal" className="hidden items-center gap-7 text-[15px] md:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} aria-current={path === l.href ? "page" : undefined} className={path === l.href ? "font-semibold text-c-ink" : "text-c-muted transition hover:text-c-ink"}>
              {l.label}
            </Link>
          ))}
        </nav>
        <Link href="/clinica#chat" className="rounded-full bg-c-accent px-5 py-2.5 text-[15px] font-semibold text-white transition hover:bg-c-accentDark">
          Agendar cita
        </Link>
      </div>
      <nav aria-label="Principal móvil" className="flex gap-6 overflow-x-auto border-t border-c-line px-5 py-2.5 text-sm md:hidden">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} aria-current={path === l.href ? "page" : undefined} className={`whitespace-nowrap ${path === l.href ? "font-semibold text-c-ink" : "text-c-muted"}`}>
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-c-line bg-c-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-clinicaDisplay text-lg font-semibold">Clínica Dental Aralia</p>
          <p className="mt-2 max-w-xs text-[15px] text-c-muted">Revisiones, limpiezas y tratamientos con citas que se agendan en un minuto.</p>
        </div>
        <div className="text-[15px]">
          <p className="font-semibold">Horario</p>
          <p className="mt-2 text-c-muted">Lunes a viernes, 9:00 a 19:00</p>
          <p className="text-c-muted">Sábado, 9:00 a 14:00</p>
        </div>
        <div className="text-[15px]">
          <p className="font-semibold">Contacto</p>
          <a href="tel:+520000000000" className="mt-2 block text-c-muted hover:text-c-ink">55 0000 0000</a>
          <p className="text-c-muted">Dirección de ejemplo, CDMX</p>
        </div>
      </div>
      <div className="border-t border-c-line">
        <p className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-5 py-4 text-sm text-c-muted">
          <span>Sitio demo de AMOXTLI®. Marca y datos ficticios.</span>
          <span>Desarrollado por AMOXTLI®</span>
        </p>
      </div>
    </footer>
  );
}
