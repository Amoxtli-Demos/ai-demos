import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  const b = await req.json().catch(() => null);
  const nombre = String(b?.nombre ?? "").trim().slice(0, 80);
  const empresa = String(b?.empresa ?? "").trim().slice(0, 80);
  const email = String(b?.email ?? "").trim().slice(0, 120);
  const telefono = String(b?.telefono ?? "").replace(/\D/g, "").slice(0, 15);
  const servicio = String(b?.servicio ?? "").trim().slice(0, 60);
  const mensaje = String(b?.mensaje ?? "").trim().slice(0, 800);
  if (nombre.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || !servicio) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  // Esta ruta solo envía el aviso por correo; la solicitud se guarda en el navegador. Correo opcional: sin RESEND_API_KEY la demo sigue funcionando y lo informa.
  let correo: "enviado" | "no_configurado" | "error" = "no_configurado";
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_NOTIFY_TO;
  if (key && to) {
    try {
      const resend = new Resend(key);
      const html = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;color:#14233F;background:#EEF0F2;padding:24px"><tr><td>
<table role="presentation" width="560" align="center" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #B9C0CA">
<tr><td style="padding:20px 24px;border-bottom:2px solid #14233F;font-family:Georgia,serif;font-size:20px">Nueva solicitud de asesoría</td></tr>
<tr><td style="padding:20px 24px;font-size:15px;line-height:1.6">
<p style="margin:0 0 8px"><b>${esc(nombre)}</b>${empresa ? ` · ${esc(empresa)}` : ""}</p>
<p style="margin:0 0 8px">Servicio: ${esc(servicio)}</p>
<p style="margin:0 0 8px">Correo: ${esc(email)}${telefono ? `<br>Teléfono: ${esc(telefono)}` : ""}</p>
${mensaje ? `<p style="margin:12px 0 0;padding:12px;background:#EEF0F2">${esc(mensaje)}</p>` : ""}
</td></tr>
<tr><td style="padding:0 24px 24px"><a href="mailto:${esc(email)}" style="display:inline-block;background:#1F4E8C;color:#fff;text-decoration:none;padding:12px 20px;font-size:15px">Responder por correo</a>${telefono ? ` <a href="tel:${esc(telefono)}" style="display:inline-block;border:1px solid #1F4E8C;color:#1F4E8C;text-decoration:none;padding:11px 20px;font-size:15px">Llamar</a>` : ""}</td></tr>
<tr><td style="padding:12px 24px;background:#EEF0F2;font-size:12px;color:#4A5568">Correo de demostración de AMOXTLI®. Datos ficticios.</td></tr>
</table></td></tr></table>`;
      const text = `Nueva solicitud de asesoría\n${nombre}${empresa ? ` (${empresa})` : ""}\nServicio: ${servicio}\nCorreo: ${email}\nTeléfono: ${telefono || "no indicado"}\n\n${mensaje}\n\nCorreo de demostración de AMOXTLI. Datos ficticios.`;
      const { error } = await resend.emails.send({
        from: process.env.RESEND_FROM ?? "Garza Rivas Demo <demo@amoxtli.tech>",
        to,
        replyTo: email,
        subject: `Nueva asesoría: ${nombre} · ${servicio}`,
        html,
        text,
      });
      correo = error ? "error" : "enviado";
    } catch {
      correo = "error";
    }
  }

  return NextResponse.json({ correo }, { status: 200 });
}
