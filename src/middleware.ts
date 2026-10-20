import { NextResponse, type NextRequest } from "next/server";

/**
 * Si los tres subdominios apuntan a este mismo proyecto de Vercel
 * (clinica.*, tostador.*, despacho.*), reescribe a la ruta de cada demo.
 */
const MAPA: Record<string, string> = { clinica: "/clinica", tostador: "/tostador", despacho: "/despacho" };

export function middleware(req: NextRequest) {
  const sub = (req.headers.get("host") ?? "").split(".")[0];
  const base = MAPA[sub];
  const { pathname } = req.nextUrl;
  if (!base || pathname.startsWith("/api") || pathname.startsWith("/_next") || pathname.startsWith(base)) return NextResponse.next();
  const url = req.nextUrl.clone();
  url.pathname = base + (pathname === "/" ? "" : pathname);
  return NextResponse.rewrite(url);
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
