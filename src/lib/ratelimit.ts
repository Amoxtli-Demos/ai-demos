/** Límite simple por visitante para que la demo no genere costos inesperados. */
const g = globalThis as unknown as { __rl?: Map<string, number[]> };
const hits = (g.__rl ??= new Map<string, number[]>());

const WINDOW_MS = 60 * 60 * 1000;

export function limitar(key: string, max = Number(process.env.CHAT_MAX_PER_HOUR ?? 30)): { ok: boolean; restantes: number } {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= max) {
    hits.set(key, recent);
    return { ok: false, restantes: 0 };
  }
  recent.push(now);
  hits.set(key, recent);
  return { ok: true, restantes: max - recent.length };
}

export function visitante(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd?.split(",")[0] ?? "local").trim();
}
