import Anthropic from "@anthropic-ai/sdk";
import type { ChatMsg } from "./types";

let client: Anthropic | null | undefined;
function getClient(): Anthropic | null {
  if (client !== undefined) return client;
  client = process.env.ANTHROPIC_API_KEY ? new Anthropic() : null;
  return client;
}

export const hasLLM = () => getClient() !== null;

/** Devuelve el texto de Claude o null si no hay clave o falla (el llamador usa su respuesta guionada). */
export async function askClaude(system: string, messages: ChatMsg[]): Promise<string | null> {
  const c = getClient();
  if (!c) return null;
  try {
    const res = await c.messages.create({
      model: process.env.CHAT_MODEL ?? "claude-haiku-5-5",
      max_tokens: 400,
      system,
      messages: messages.slice(-12).map((m) => ({ role: m.role, content: m.content })),
    });
    const block = res.content.find((b) => b.type === "text");
    return block && block.type === "text" ? block.text.trim() : null;
  } catch {
    return null;
  }
}
