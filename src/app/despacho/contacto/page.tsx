import type { Metadata } from "next";
import FormularioAsesoria from "@/components/despacho/FormularioAsesoria";

export const metadata: Metadata = { title: "Contacto", description: "Solicita una asesoría contable o fiscal." };

export default function Contacto() {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-12 md:py-20">
      <div className="md:col-span-7">
        <h1 className="mb-8 font-despachoDisplay text-4xl font-semibold md:text-5xl">Solicitar una asesoría</h1>
        <FormularioAsesoria />
      </div>
      <aside className="border-t-2 border-d-navy pt-5 md:col-span-4 md:col-start-9 md:mt-[5.5rem]" aria-label="Qué pasa después">
        <p className="font-despachoDisplay text-xl font-semibold">Qué pasa después</p>
        <ul className="mt-3 divide-y divide-d-rule text-[15px] text-d-slate">
          <li className="py-3">Tu solicitud llega al panel del despacho en el momento.</li>
          <li className="py-3">El equipo recibe un aviso por correo con tus datos.</li>
          <li className="py-3">Un contador te contacta el siguiente día hábil.</li>
        </ul>
      </aside>
    </div>
  );
}
