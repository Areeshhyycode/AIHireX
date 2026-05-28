import { env } from "@/lib/env";

const HF_MODEL = "sentence-transformers/all-MiniLM-L6-v2";

export async function embed(texts: string[]): Promise<number[][]> {
  if (!env.HUGGINGFACE_API_KEY) throw new Error("HUGGINGFACE_API_KEY not set");
  const res = await fetch(
    `https://api-inference.huggingface.co/pipeline/feature-extraction/${HF_MODEL}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: texts, options: { wait_for_model: true } }),
    },
  );
  if (!res.ok) throw new Error(`HF embed ${res.status}: ${await res.text()}`);
  const json = (await res.json()) as number[][] | number[];
  return Array.isArray(json[0]) ? (json as number[][]) : ([json] as number[][]);
}

export async function embedOne(text: string): Promise<number[]> {
  const [v] = await embed([text]);
  return v;
}
