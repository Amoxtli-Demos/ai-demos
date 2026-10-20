"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { CLINICA, HORAS, HORAS_SABADO, SERVICIOS } from "@/lib/clinica";
import { guardarCita, horasOcupadas } from "@/lib/local-store";

type Step = "libre" | "servicio" | "dia" | "hora" | "nombre" | "telefono" | "confirmar" | "hecho";
interface Chip { label: string; value: string }
interface Msg { id: number; from: "bot" | "user"; text: string; chips?: Chip[] }
interface Draft { servicio?: string; dia?: string; hora?: string; nombre?: string; telefono?: string }

const fmtDia = (iso: string) =>
  new Intl.DateTimeFormat("es-MX", { weekday: "long", day: "numeric", month: "long" }).format(new Date(iso + "T12:00:00"));

function proximosDias(n = 6): { iso: string; label: string }[] {
  const out: { iso: string; label: string }[] = [];
  const d = new Date();
  while (out.length < n) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0) continue; // domingo cerrado
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    out.push({ iso, label: new Intl.DateTimeFormat("es-MX", { weekday: "short", day: "numeric", month: "short" }).format(d).replace(".", "") });
  }
  return out;
}

const INICIO: Chip[] = [
  { label: "Agendar cita", value: "agendar" },
  { label: "Horarios", value: "faq:¿Cuál es su horario?" },
  { label: "¿Cuánto cuesta?", value: "faq:¿Cuánto cuesta una consulta?" },
];

export default function Chat() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: 1, from: "bot", text: `Hola, soy el asistente de ${CLINICA.nombre}. ¿Quieres agendar una cita o tienes una pregunta?`, chips: INICIO },
  ]);
  const [step, setStep] = useState<Step>("libre");
  const [draft, setDraft] = useState<Draft>({});
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [busy, setBusy] = useState(false);
  const idRef = useRef(2);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  const add = useCallback((m: Omit<Msg, "id">) => setMsgs((p) => [...p, { ...m, id: idRef.current++ }]), []);

  const botSay = useCallback(
    async (text: string, chips?: Chip[]) => {
      setTyping(true);
      await new Promise((r) => setTimeout(r, 550));
      setTyping(false);
      add({ from: "bot", text, chips });
    },
    [add],
  );

  const preguntar = useCallback(
    async (texto: string, historial: Msg[]) => {
      setBusy(true);
      const messages = [...historial.filter((m) => m.text), { id: 0, from: "user" as const, text: texto }]
        .slice(-8)
        .map((m) => ({ role: m.from === "user" ? ("user" as const) : ("assistant" as const), content: m.text }));
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cliente: "clinica", messages }),
        });
        const data = await res.json();
        await botSay(data.reply ?? "No pude responder en este momento.", [{ label: "Agendar cita", value: "agendar" }]);
      } catch {
        await botSay("No pude conectarme. Intenta de nuevo en un momento o llámanos al " + CLINICA.telefono + ".", [{ label: "Agendar cita", value: "agendar" }]);
      } finally {
        setBusy(false);
      }
    },
    [botSay],
  );

  const empezarAgenda = useCallback(async () => {
    setStep("servicio");
    setDraft({});
    await botSay("Claro. ¿Qué necesitas?", SERVICIOS.map((s) => ({ label: s.nombre, value: s.nombre })));
  }, [botSay]);

  const elegirServicio = async (nombre: string) => {
    setDraft((d) => ({ ...d, servicio: nombre }));
    setStep("dia");
    await botSay("¿Qué día te acomoda?", proximosDias().map((d) => ({ label: d.label, value: d.iso })));
  };

  const elegirDia = async (iso: string) => {
    setBusy(true);
    setDraft((d) => ({ ...d, dia: iso }));
    const ocupadas = horasOcupadas(iso);
    const base = new Date(iso + "T12:00:00").getDay() === 6 ? HORAS_SABADO : HORAS;
    const libres = base.filter((h) => !ocupadas.includes(h));
    if (!libres.length) {
      await botSay("Ese día ya no tiene lugares. ¿Probamos otro?", proximosDias().filter((d) => d.iso !== iso).map((d) => ({ label: d.label, value: d.iso })));
      setBusy(false);
      return;
    }
    setStep("hora");
    await botSay(`Estos horarios están libres el ${fmtDia(iso)}:`, libres.map((h) => ({ label: h, value: h })));
    setBusy(false);
  };

  const elegirHora = async (hora: string) => {
    setDraft((d) => ({ ...d, hora }));
    setStep("nombre");
    await botSay("Perfecto. ¿A nombre de quién agendamos?");
  };

  const confirmar = async () => {
    setBusy(true);
    const res = guardarCita({
      nombre: draft.nombre!,
      telefono: draft.telefono!,
      servicio: draft.servicio!,
      dia: draft.dia!,
      hora: draft.hora!,
    });
    if (res === "ocupado") {
      setStep("dia");
      await botSay("Ese horario ya está ocupado. Elige otro día y te muestro lo que queda.", proximosDias().map((d) => ({ label: d.label, value: d.iso })));
    } else {
      setStep("hecho");
      await botSay(
        `Listo, ${draft.nombre}. Tu cita de ${draft.servicio?.toLowerCase()} quedó para el ${fmtDia(draft.dia!)} a las ${draft.hora}. Te escribiremos al ${draft.telefono} para recordártela. (Cita de demostración.)`,
        [{ label: "Hacer otra pregunta", value: "pregunta" }],
      );
    }
    setBusy(false);
  };

  const onChip = async (c: Chip) => {
    if (busy || typing) return;
    const historial = msgs;
    add({ from: "user", text: c.label });
    // Retira chips del mensaje anterior para que no se repitan acciones.
    setMsgs((p) => p.map((m) => ({ ...m, chips: undefined })));
    if (c.value === "agendar" || c.value === "reintentar") {
      if (c.value === "reintentar" && draft.hora) return confirmar();
      return empezarAgenda();
    }
    if (c.value === "pregunta") { setStep("libre"); return botSay("Dime qué quieres saber.", INICIO); }
    if (c.value.startsWith("faq:")) return preguntar(c.value.slice(4), historial);
    if (c.value === "confirmar") return confirmar();
    if (c.value === "cambiar") return empezarAgenda();
    if (step === "servicio") return elegirServicio(c.label);
    if (step === "dia") return elegirDia(c.value);
    if (step === "hora") return elegirHora(c.value);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const texto = input.trim();
    if (!texto || busy || typing) return;
    setInput("");
    const historial = msgs;
    add({ from: "user", text: texto });
    setMsgs((p) => p.map((m) => ({ ...m, chips: undefined })));

    if (step === "nombre") {
      if (texto.length < 2) return botSay("Escribe tu nombre para la cita.");
      setDraft((d) => ({ ...d, nombre: texto }));
      setStep("telefono");
      return botSay(`Gracias, ${texto.split(" ")[0]}. ¿A qué número de celular te confirmamos? (10 dígitos)`);
    }
    if (step === "telefono") {
      const tel = texto.replace(/\D/g, "");
      if (tel.length !== 10) return botSay("El número debe tener 10 dígitos. ¿Me lo repites?");
      const nuevo = { ...draft, telefono: tel };
      setDraft(nuevo);
      setStep("confirmar");
      return botSay(
        `Confirmo: ${nuevo.servicio}, ${fmtDia(nuevo.dia!)} a las ${nuevo.hora}, a nombre de ${nuevo.nombre}. ¿Todo bien?`,
        [{ label: "Confirmar cita", value: "confirmar" }, { label: "Cambiar algo", value: "cambiar" }],
      );
    }
    if (/agendar|cita|reservar/i.test(texto) && step === "libre") return empezarAgenda();
    return preguntar(texto, historial);
  };

  const ultimoId = msgs[msgs.length - 1]?.id;
  const placeholder = step === "nombre" ? "Tu nombre" : step === "telefono" ? "Tu celular de 10 dígitos" : "Escribe tu mensaje";

  return (
    <section aria-label="Chat para agendar cita" className="flex h-[34rem] max-h-[80vh] w-full flex-col overflow-hidden rounded-[2rem] border border-c-line bg-c-surface shadow-[0_30px_60px_-40px_rgba(12,34,41,0.45)]">
      <header className="flex items-center gap-3 border-b border-c-line px-5 py-4">
        <span aria-hidden className="flex h-10 w-10 items-center justify-center rounded-full bg-c-accent font-clinicaDisplay text-lg font-semibold text-white">A</span>
        <div>
          <p className="font-clinicaDisplay text-base font-semibold leading-tight">Asistente de Aralia</p>
          <p className="text-sm text-c-muted">Responde al instante · Demo</p>
        </div>
      </header>

      <div ref={logRef} role="log" aria-live="polite" className="flex-1 space-y-3 overflow-y-auto bg-c-bg px-4 py-5">
        {msgs.map((m) => (
          <div key={m.id} className={`flex flex-col gap-2 animate-rise ${m.from === "user" ? "items-end" : "items-start"}`}>
            <p className={`max-w-[85%] px-4 py-2.5 text-[15px] leading-relaxed ${m.from === "user" ? "rounded-[1.25rem] rounded-br-[0.25rem] bg-c-accent text-white" : "rounded-[1.25rem] rounded-bl-[0.25rem] bg-c-surface text-c-ink ring-1 ring-c-line"}`}>
              {m.text}
            </p>
            {m.chips && m.id === ultimoId && !typing && (
              <div className="flex max-w-[92%] flex-wrap gap-2">
                {m.chips.map((c) => (
                  <button key={c.value + c.label} onClick={() => onChip(c)} disabled={busy} className="rounded-full border border-c-accent bg-c-surface px-4 py-2 text-sm font-medium text-c-accent transition hover:bg-c-accent hover:text-white disabled:opacity-50">
                    {c.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        {typing && (
          <div className="flex items-start" aria-label="Escribiendo">
            <span className="flex gap-1 rounded-[1.25rem] rounded-bl-[0.25rem] bg-c-surface px-4 py-3 ring-1 ring-c-line">
              {[0, 150, 300].map((d) => (
                <span key={d} className="h-1.5 w-1.5 animate-pulse rounded-full bg-c-muted" style={{ animationDelay: `${d}ms` }} />
              ))}
            </span>
          </div>
        )}
      </div>

      <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-c-line bg-c-surface p-3">
        <label htmlFor="clinica-input" className="sr-only">Mensaje</label>
        <input
          id="clinica-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          inputMode={step === "telefono" ? "tel" : "text"}
          autoComplete={step === "nombre" ? "name" : step === "telefono" ? "tel" : "off"}
          maxLength={300}
          className="h-12 flex-1 rounded-full border border-c-line bg-c-bg px-5 text-[15px] text-c-ink placeholder:text-c-muted focus:border-c-accent focus:outline-none"
        />
        <button type="submit" disabled={busy || typing || !input.trim()} aria-label="Enviar mensaje" className="flex h-12 w-12 items-center justify-center rounded-full bg-c-accent text-white transition hover:bg-c-accentDark disabled:opacity-40">
          <Send size={18} />
        </button>
      </form>
    </section>
  );
}
