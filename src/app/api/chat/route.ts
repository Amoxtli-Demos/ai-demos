import { NextResponse } from "next/server";
import { askClaude } from "@/lib/llm";
import { limitar, visitante } from "@/lib/ratelimit";
import { PROMPT_CLINICA, PROMPT_TOSTADOR } from "@/lib/prompts";
import { faqLocal } from "@/lib/clinica";
import { recomendarLocal } from "@/lib/catalog";
import type { ChatMsg } from "@/lib/types";

export const runtime = "nodejs";

const SISTEMAS = { clinica: PROMPT_CLINICA, tostador: PROMPT_TOSTADOR } as const;

export async function POST(req: Request) {
  let body: { cliente?: string; messages?: ChatMsg[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }
  const cliente = body.cliente as keyof typeof SISTEMAS;
  if (!(cliente in SISTEMAS)) return NextResponse.json({ error: "Cliente desconocido" }, { status: 400 });

  const messages = (body.messages ?? [])
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .map((m) => ({ role: m.role, content: m.content.slice(0, 600) }));
  const ultimo = messages[messages.length - 1];
  if (!ultimo || ultimo.role !== "user") return NextResponse.json({ error: "Falta el mensaje" }, { status: 400 });

  const lim = limitar(`${cliente}:${visitante(req)}`);
  if (!lim.ok) {
    return NextResponse.json(
      { reply: "Llegaste al límite de mensajes de esta demo por ahora. Vuelve en un rato o escríbenos a hello@amoxtli.tech.", limitado: true },
      { status: 429 },
    );
  }

  const claude = await askClaude(SISTEMAS[cliente], messages);
  if (claude) return NextResponse.json({ reply: claude, origen: "claude" });

  const reply = cliente === "clinica" ? faqLocal(ultimo.content) : recomendarLocal(ultimo.content);
  return NextResponse.json({ reply, origen: "guion" });
}
