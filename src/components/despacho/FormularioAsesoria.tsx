"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SERVICIOS_D } from "@/lib/despacho";
import { guardarLead } from "@/lib/local-store";

type Resultado = { nombre: string; correo: "enviado" | "no_configurado" | "error" };

const campo = "mt-1.5 block w-full border border-d-rule bg-d-white px-3.5 py-3 text-[16px] text-d-navy placeholder:text-d-slate focus:border-d-blue focus:outline-none";

export default function FormularioAsesoria() {
  const [paso, setPaso] = useState<1 | 2>(1);
  const [servicio, setServicio] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [nombre, setNombre] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const titulo = useRef<HTMLHeadingElement>(null);

  useEffect(() => { titulo.current?.focus(); }, [paso, resultado]);

  const siguiente = (e: React.FormEvent) => {
    e.preventDefault();
    if (!servicio) { setErrores({ servicio: "Elige el servicio que necesitas." }); return; }
    setErrores({});
    setPaso(2);
  };

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (nombre.trim().length < 2) er.nombre = "Escribe tu nombre.";
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) er.email = "Escribe un correo válido.";
    if (telefono && telefono.replace(/\D/g, "").length !== 10) er.telefono = "El teléfono debe tener 10 dígitos.";
    setErrores(er);
    if (Object.keys(er).length) return;
    setEnviando(true);
    // 1) Guarda la solicitud en el panel (este navegador). 2) Pide al servidor enviar el aviso por correo.
    guardarLead({ nombre, empresa, email, telefono: telefono.replace(/\D/g, ""), servicio, mensaje });
    let correo: Resultado["correo"] = "error";
    try {
      const r = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, empresa, email, telefono, servicio, mensaje }),
      });
      const d = await r.json();
      if (r.ok) correo = d.correo;
    } catch {}
    setResultado({ nombre: nombre.split(" ")[0], correo });
    setEnviando(false);
  };

  if (resultado) {
    return (
      <div role="status" className="border-2 border-d-navy bg-d-white p-8">
        <h2 ref={titulo} tabIndex={-1} className="font-despachoDisplay text-3xl font-semibold focus:outline-none">Recibimos tu solicitud, {resultado.nombre}.</h2>
        <p className="mt-3 text-d-slate">Un contador te escribirá el siguiente día hábil con una propuesta. Mientras tanto, esto es lo que ya pasó:</p>
        <ul className="mt-6 divide-y divide-d-rule border-y border-d-rule text-[15px]">
          <li className="flex justify-between gap-4 py-3"><span>Solicitud guardada en el panel de este navegador</span><span className="font-semibold text-[#2F6B3F]">Listo</span></li>
          <li className="flex justify-between gap-4 py-3">
            <span>Aviso por correo al equipo</span>
            <span className={`font-semibold ${resultado.correo === "enviado" ? "text-[#2F6B3F]" : "text-[#8A5A00]"}`}>
              {resultado.correo === "enviado" ? "Enviado" : resultado.correo === "error" ? "Falló el envío" : "No configurado en esta demo"}
            </span>
          </li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link href="/despacho/panel" className="bg-d-blue px-6 py-3 font-medium text-white hover:bg-d-navy">Ver mi solicitud en el panel</Link>
          <button onClick={() => { setResultado(null); setPaso(1); setServicio(""); setMensaje(""); setNombre(""); setEmpresa(""); setEmail(""); setTelefono(""); }} className="border border-d-navy px-6 py-3 font-medium hover:bg-d-paper">Enviar otra</button>
        </div>
      </div>
    );
  }

  return (
    <div className="border-2 border-d-navy bg-d-white p-6 md:p-8">
      <p className="text-sm font-semibold text-d-slate" aria-live="polite">Paso {paso} de 2</p>

      {paso === 1 ? (
        <form onSubmit={siguiente} noValidate>
          <h2 ref={titulo} tabIndex={-1} className="mt-1 font-despachoDisplay text-2xl font-semibold focus:outline-none">¿Qué necesitas?</h2>
          <fieldset className="mt-5">
            <legend className="sr-only">Servicio</legend>
            <div className="divide-y divide-d-rule border-y border-d-rule">
              {SERVICIOS_D.map((s) => (
                <label key={s.id} className="flex cursor-pointer items-center gap-3 py-3 has-[:checked]:font-semibold">
                  <input type="radio" name="servicio" value={s.nombre} checked={servicio === s.nombre} onChange={() => setServicio(s.nombre)} className="h-4 w-4 accent-d-blue" />
                  {s.nombre}
                </label>
              ))}
            </div>
            {errores.servicio && <p role="alert" className="mt-2 text-sm font-medium text-[#A12622]">{errores.servicio}</p>}
          </fieldset>
          <label className="mt-6 block text-sm font-semibold">
            Cuéntanos tu caso (opcional)
            <textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)} rows={3} maxLength={800} placeholder="Ej. Tengo un negocio de comida y no sé si estoy en el régimen correcto." className={campo + " font-normal"} />
          </label>
          <button type="submit" className="mt-6 bg-d-blue px-7 py-3.5 font-medium text-white hover:bg-d-navy">Continuar</button>
        </form>
      ) : (
        <form onSubmit={enviar} noValidate>
          <h2 ref={titulo} tabIndex={-1} className="mt-1 font-despachoDisplay text-2xl font-semibold focus:outline-none">¿Cómo te contactamos?</h2>
          <p className="mt-1 text-sm text-d-slate">Servicio: {servicio}</p>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <label className="block text-sm font-semibold">
              Nombre
              <input value={nombre} onChange={(e) => setNombre(e.target.value)} autoComplete="name" aria-invalid={!!errores.nombre} className={campo + " font-normal"} />
              {errores.nombre && <span role="alert" className="mt-1 block text-sm font-medium text-[#A12622]">{errores.nombre}</span>}
            </label>
            <label className="block text-sm font-semibold">
              Empresa (opcional)
              <input value={empresa} onChange={(e) => setEmpresa(e.target.value)} autoComplete="organization" className={campo + " font-normal"} />
            </label>
            <label className="block text-sm font-semibold">
              Correo
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" aria-invalid={!!errores.email} className={campo + " font-normal"} />
              {errores.email && <span role="alert" className="mt-1 block text-sm font-medium text-[#A12622]">{errores.email}</span>}
            </label>
            <label className="block text-sm font-semibold">
              Teléfono (opcional)
              <input type="tel" inputMode="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} autoComplete="tel" aria-invalid={!!errores.telefono} className={campo + " font-normal"} />
              {errores.telefono && <span role="alert" className="mt-1 block text-sm font-medium text-[#A12622]">{errores.telefono}</span>}
            </label>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={() => setPaso(1)} className="border border-d-navy px-6 py-3.5 font-medium hover:bg-d-paper">Atrás</button>
            <button type="submit" disabled={enviando} className="bg-d-blue px-7 py-3.5 font-medium text-white hover:bg-d-navy disabled:opacity-60">{enviando ? "Enviando…" : "Enviar solicitud"}</button>
          </div>
        </form>
      )}
    </div>
  );
}
