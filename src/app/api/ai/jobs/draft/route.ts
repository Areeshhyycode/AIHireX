import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { chat } from "@/lib/ai/chat";
import { SYSTEM_PROMPTS } from "@/lib/ai/prompts";

export const runtime = "nodejs";

const schema = z.object({
  title: z.string().min(2).max(120),
  company: z.string().max(120).optional(),
  brief: z.string().max(2000).optional(),
});

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "invalid" }, { status: 400 });

  const userMsg = [
    `Title: ${parsed.data.title}`,
    parsed.data.company ? `Company: ${parsed.data.company}` : "",
    parsed.data.brief ? `Brief / hints: ${parsed.data.brief}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const raw = await chat(
    [
      { role: "system", content: SYSTEM_PROMPTS.jobDescriptionDraft },
      { role: "user", content: userMsg },
    ],
    { model: "smart", json: true, temperature: 0.5 },
  );
  try {
    return NextResponse.json(JSON.parse(raw));
  } catch {
    return NextResponse.json({ error: "ai returned invalid json", raw }, { status: 502 });
  }
}
