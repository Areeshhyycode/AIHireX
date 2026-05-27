import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { chat } from "@/lib/ai/chat";
import { SYSTEM_PROMPTS } from "@/lib/ai/prompts";

export const runtime = "nodejs";

const schema = z.object({
  role: z.string().min(2).max(120),
  history: z
    .array(
      z.object({
        q: z.string().max(2000),
        a: z.string().max(4000),
      }),
    )
    .max(20)
    .default([]),
});

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "invalid" }, { status: 400 });

  const transcript = parsed.data.history
    .map((t, i) => `Q${i + 1}: ${t.q}\nA${i + 1}: ${t.a}`)
    .join("\n\n");

  const reply = await chat(
    [
      { role: "system", content: SYSTEM_PROMPTS.interviewQuestion },
      {
        role: "user",
        content: `Candidate is interviewing for: ${parsed.data.role}\n\nSo far:\n${transcript || "(no answers yet)"}\n\nAsk the next single question.`,
      },
    ],
    { model: "fast", temperature: 0.6 },
  );
  return NextResponse.json({ question: reply });
}
