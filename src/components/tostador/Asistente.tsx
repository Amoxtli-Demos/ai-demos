"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { CAFES } from "@/lib/catalog";

interface Msg { role: "user" | "assistant"; content: string }

const SUGERENCIAS = [
  "Quiero algo para espresso",
  "Busco un café suave para tomar con leche",
  "¿Cuál le regalo a alguien que apenas empieza?",
  "¿Tienen descafeinado?",
  "Algo frutal para cold brew",
];

const mencionados = (texto: string) => CAFES.filter((c) => new RegExp(`\\b${c.nombre}\\b`, "i").test(texto));

export default function Asistente({ inicial = "" }: { inicial?: string }) {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", content: "Hola, soy el tostador. Cuéntame cómo preparas tu café o qué sabor buscas y te digo cuál llevarte del catálogo." },
  ]);
  const [input, setInput] = useState("");
  const [cargando, setCargando] = useState(false);
  const fin = useRef<HTMLDivElement>(null);
  const enviado = useRef(false);

  useEffect(() => { fin.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [msgs, cargando]);

  const enviar = async (texto: string) => {
    const t = texto.trim();
    if (!t || cargando) return;
    const nuevo: Msg[] = [...msgs, { role: "user", content: t }];
    setMsgs(nuevo);
    setInput("");
    setCargando(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cliente: "tostador", messages: nuevo.slice(-8) }),
      });
      const d = await r.json();
      setMsgs((p) => [...p, { role: "assistant", content: d.reply ?? "No pude responder ahora. Intenta de nuevo." }]);
    } catch {
      setMsgs((p) => [...p, { role: "assistant", content: "No pude conectarme. Intenta de nuevo en un momento." }]);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (inicial && !enviado.current) { enviado.current = true; enviar(inicial); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inicial]);

  return (
    <div className="flex min-h-[32rem] flex-col rounded-[1.25rem] bg-t-paper p-4 md:p-6">
      <div role="log" aria-live="polite" className="flex-1 space-y-5 pb-4">
        {msgs.map((m, i) => (
          <div key={i} className={`flex flex-col gap-3 ${m.role === "user" ? "items-end" : "items-start"}`}>
            <p className={`max-w-[88%] whitespace-pre-line rounded-[1.25rem] px-5 py-3 text-[16px] leading-relaxed ${m.role === "user" ? "bg-t-emberDark text-t-paper" : "bg-t-dough text-t-roast"}`}>
              {m.content}
            </p>
            {m.role === "assistant" && mencionados(m.content).length > 0 && (
              <div className="flex flex-wrap gap-2">
                {mencionados(m.content).map((c) => (
                  <Link key={c.slug} href={`/tostador/catalogo/${c.slug}`} className="rounded-[1.25rem] border border-t-roast/30 px-4 py-1.5 text-sm font-medium transition hover:border-t-roast hover:bg-t-roast hover:text-t-paper">
                    Ver {c.nombre} · ${c.precio}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        {cargando && <p className="text-sm text-t-clay" aria-live="polite">El tostador está pensando…</p>}
        <div ref={fin} />
      </div>

      {msgs.length < 3 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {SUGERENCIAS.map((s) => (
            <button key={s} onClick={() => enviar(s)} disabled={cargando} className="rounded-[1.25rem] border border-t-roast/30 px-4 py-2 text-left text-[15px] transition hover:border-t-roast hover:bg-t-dough disabled:opacity-50">
              {s}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); enviar(input); }} className="flex gap-2">
        <label htmlFor="tostador-input" className="sr-only">Tu pregunta</label>
        <input
          id="tostador-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={300}
          placeholder="Ej. me gusta el café fuerte y lo preparo en moka"
          className="h-12 flex-1 rounded-[1.25rem] border border-t-roast/30 bg-white px-4 text-[16px] placeholder:text-t-clay focus:border-t-roast focus:outline-none"
        />
        <button type="submit" disabled={cargando || !input.trim()} aria-label="Enviar pregunta" className="flex h-12 items-center gap-2 rounded-[1.25rem] bg-t-emberDark px-5 font-semibold text-t-paper transition hover:bg-t-ember disabled:opacity-40">
          <span className="hidden sm:inline">Preguntar</span><Send size={18} />
        </button>
      </form>
    </div>
  );
}
