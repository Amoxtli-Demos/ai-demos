import type { Metadata } from "next";
import Chat from "@/components/clinica/Chat";
import { CLINICA } from "@/lib/clinica";

export const metadata: Metadata = { title: "Contacto", description: "Horario, teléfono y agenda en línea de Clínica Dental Aralia." };

export default function Contacto() {
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:py-24 lg:grid-cols-[1fr_28rem]">
      <div>
        <h1 className="font-clinicaDisplay text-4xl font-semibold tracking-[-0.02em] md:text-6xl">Contacto</h1>
        <dl className="mt-10 space-y-8 text-lg">
          <div>
            <dt className="font-semibold">Teléfono</dt>
            <dd className="text-c-muted"><a href="tel:+520000000000" className="hover:text-c-ink">{CLINICA.telefono}</a></dd>
          </div>
          <div>
            <dt className="font-semibold">Horario</dt>
            <dd className="text-c-muted">{CLINICA.horario}</dd>
          </div>
          <div>
            <dt className="font-semibold">Dónde estamos</dt>
            <dd className="text-c-muted">{CLINICA.direccion}</dd>
          </div>
        </dl>
        <p className="mt-10 max-w-md text-c-muted">Si prefieres no llamar, agenda con el asistente: tarda un minuto y te muestra solo los horarios libres.</p>
      </div>
      <Chat />
    </div>
  );
}
