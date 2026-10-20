import Link from "next/link";

const DEMOS = [
  { href: "/clinica", nombre: "Clínica Dental Aralia", punto: "Chatbot", texto: "Un chat que responde dudas y agenda citas con horarios libres." },
  { href: "/tostador", nombre: "Tostaduría Ceniza", punto: "IA personalizada", texto: "Un asistente que solo recomienda cafés de su catálogo." },
  { href: "/despacho", nombre: "Garza Rivas Contadores", punto: "Automatización", texto: "Un formulario que llega a un panel de solicitudes y avisa por correo." },
];

export default function Hub() {
  return (
    <main className="min-h-screen bg-[#111] px-5 py-16 font-sans text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold md:text-5xl">Demos de IA y automatización</h1>
        <p className="mt-4 text-lg text-white/70">Tres sitios ficticios, cada uno con su identidad y una pieza funcionando.</p>
        <ul className="mt-12 divide-y divide-white/15 border-y border-white/15">
          {DEMOS.map((d) => (
            <li key={d.href}>
              <Link href={d.href} className="grid gap-1 py-6 transition hover:bg-white/5 md:grid-cols-[14rem_1fr] md:gap-8 md:px-3">
                <span>
                  <span className="block text-xl font-semibold">{d.nombre}</span>
                  <span className="text-sm text-white/60">{d.punto}</span>
                </span>
                <span className="text-white/80">{d.texto}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm text-white/60">Desarrollado por AMOXTLI®. Marcas y datos ficticios.</p>
      </div>
    </main>
  );
}
