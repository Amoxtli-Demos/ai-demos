import { NextResponse } from "next/server";
import { updateLeadEstado } from "@/lib/store";
import type { LeadEstado } from "@/lib/types";

export const runtime = "nodejs";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const b = await req.json().catch(() => null);
  const estado = b?.estado as LeadEstado;
  if (!["nuevo", "contacto", "cerrado"].includes(estado)) return NextResponse.json({ error: "Estado inválido" }, { status: 400 });
  const lead = await updateLeadEstado(params.id, estado);
  if (!lead) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  return NextResponse.json({ lead });
}
