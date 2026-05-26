import { getGroq, GROQ_MODELS } from "@/lib/ai/groq";

type Msg = { role: "system" | "user" | "assistant"; content: string };

export async function chat(
  messages: Msg[],
  opts: { model?: keyof typeof GROQ_MODELS; temperature?: number; json?: boolean } = {},
) {
  const model = GROQ_MODELS[opts.model ?? "fast"];
  const res = await getGroq().chat.completions.create({
    model,
    messages,
    temperature: opts.temperature ?? 0.4,
    response_format: opts.json ? { type: "json_object" } : undefined,
  });
  return res.choices[0]?.message?.content ?? "";
}
