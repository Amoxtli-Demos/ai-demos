"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/despacho", label: "Inicio" },
  { href: "/despacho/servicios", label: "Servicios" },
  { href: "/despacho/casos", label: "Casos" },
  { href: "/despacho/contacto", label: "Contacto" },
];

export function Nav() {
  const path = usePathname() ?? "";
  const activo = (h: string) => (h === "/despacho" ? path === h : path.startsWith(h));
  return (
    <header className="border-b-2 border-d-navy bg-d-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link href="/despacho" className="font-despachoDisplay text-xl font-semibold text-d-navy">
          Garza Rivas <span className="font-normal text-d-slate">Contadores</span>
        </Link>
        <nav aria-label="Principal" className="hidden items-center gap-8 text-[15px] md:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} aria-current={activo(l.href) ? "page" : undefined} className={activo(l.href) ? "border-b-2 border-d-blue pb-0.5 font-semibold text-d-navy" : "text-d-slate hover:text-d-navy"}>
              {l.label}
            </Link>
          ))}
        </nav>
        <Link href="/despacho/contacto" className="bg-d-blue px-5 py-2.5 text-[15px] font-medium text-white hover:bg-d-navy">Solicitar asesoría</Link>
      </div>
      <nav aria-label="Principal móvil" className="flex gap-6 overflow-x-auto border-t border-d-rule px-5 py-2.5 text-sm md:hidden">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} aria-current={activo(l.href) ? "page" : undefined} className={`whitespace-nowrap ${activo(l.href) ? "font-semibold text-d-navy underline decoration-d-blue decoration-2 underline-offset-4" : "text-d-slate"}`}>
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t-2 border-d-navy bg-d-white text-d-slate">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 text-[15px] md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-despachoDisplay text-xl font-semibold text-d-navy">Garza Rivas Contadores</p>
          <p className="mt-2 max-w-sm">Contabilidad, impuestos y nómina para negocios pequeños y medianos.</p>
        </div>
        <div className="md:col-span-3">
          <p className="font-semibold text-d-navy">Contacto</p>
          <p className="mt-2">hola@ejemplo.mx</p>
          <p>55 0000 0000</p>
        </div>
        <div className="md:col-span-4">
          <p className="font-semibold text-d-navy">Uso interno</p>
          <Link href="/despacho/panel" className="mt-2 block text-d-blue underline underline-offset-4 hover:text-d-navy">Panel de solicitudes</Link>
        </div>
      </div>
      <p className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 border-t border-d-rule px-5 py-4 text-sm">
        <span>Sitio demo de AMOXTLI®. Despacho, casos y datos ficticios.</span>
        <span>Desarrollado por AMOXTLI®</span>
      </p>
    </footer>
  );
}
