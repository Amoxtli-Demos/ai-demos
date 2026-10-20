import Link from "next/link";
import Chat from "@/components/clinica/Chat";
import { EQUIPO, SERVICIOS } from "@/lib/clinica";

export default function Inicio() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 md:py-20 lg:grid-cols-[1fr_28rem]">
        <div>
          <h1 className="font-clinicaDisplay text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.02em] md:text-[4.2rem]">
            Tu cita dental, agendada en un minuto.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-c-muted">
            Dinos qué necesitas, elige un horario libre y listo. Si tienes una duda antes, pregúntala: el asistente responde a cualquier hora.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#chat" className="rounded-full bg-c-accent px-7 py-3.5 font-semibold text-white transition hover:bg-c-accentDark">
              Agendar mi cita
            </a>
            <Link href="/clinica/tratamientos" className="px-2 py-3.5 font-semibold text-c-accent underline-offset-4 hover:underline">
              Ver tratamientos
            </Link>
          </div>
        </div>
        <div id="chat" className="scroll-mt-24">
          <Chat />
        </div>
      </section>

      <section className="border-t border-c-line bg-c-surface">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="font-clinicaDisplay text-3xl font-semibold tracking-[-0.02em] md:text-4xl">Lo que atendemos</h2>
          <ul className="mt-10 divide-y divide-c-line border-y border-c-line">
            {SERVICIOS.map((s) => (
              <li key={s.id} className="grid gap-2 py-6 md:grid-cols-[14rem_1fr_6rem] md:items-baseline md:gap-8">
                <h3 className="font-clinicaDisplay text-xl font-semibold">{s.nombre}</h3>
                <p className="text-c-muted">{s.texto}</p>
                <p className="text-sm text-c-muted md:text-right">{s.duracion}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
          <h2 className="font-clinicaDisplay text-3xl font-semibold tracking-[-0.02em] md:text-4xl">Quién te atiende</h2>
          <ul className="space-y-6">
            {EQUIPO.map((p) => (
              <li key={p.nombre}>
                <p className="font-clinicaDisplay text-xl font-semibold">{p.nombre}</p>
                <p className="text-sm font-medium text-c-accent">{p.rol}</p>
                <p className="mt-1 text-c-muted">{p.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-c-line bg-c-accent text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-14 md:flex-row md:items-center">
          <p className="max-w-xl font-clinicaDisplay text-3xl font-semibold leading-tight tracking-[-0.02em]">¿Dolor hoy? Escribe al asistente y te damos el primer horario libre.</p>
          <a href="#chat" className="rounded-full bg-white px-7 py-3.5 font-semibold text-c-accentDark transition hover:bg-c-tint">Agendar ahora</a>
        </div>
      </section>
    </>
  );
}
