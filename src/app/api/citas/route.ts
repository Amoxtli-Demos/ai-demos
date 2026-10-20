import { NextResponse } from "next/server";
import { createCita, horasOcupadas } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const reDia = /^\d{4}-\d{2}-\d{2}$/;
const reHora = /^\d{2}:\d{2}$/;

export async function GET(req: Request) {
  const dia = new URL(req.url).searchParams.get("dia") ?? "";
  if (!reDia.test(dia)) return NextResponse.json({ error: "Día inválido" }, { status: 400 });
  return NextResponse.json({ ocupadas: await horasOcupadas(dia) });
}

export async function POST(req: Request) {
  const b = await req.json().catch(() => null);
  const nombre = String(b?.nombre ?? "").trim().slice(0, 80);
  const telefono = String(b?.telefono ?? "").replace(/\D/g, "");
  const servicio = String(b?.servicio ?? "").trim().slice(0, 60);
  const dia = String(b?.dia ?? "");
  const hora = String(b?.hora ?? "");
  if (nombre.length < 2 || telefono.length !== 10 || !servicio || !reDia.test(dia) || !reHora.test(hora)) {
    return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
  }
  const res = await createCita({ nombre, telefono, servicio, dia, hora });
  if (res === "ocupado") return NextResponse.json({ error: "Ese horario ya se ocupó" }, { status: 409 });
  return NextResponse.json({ cita: res }, { status: 201 });
}
