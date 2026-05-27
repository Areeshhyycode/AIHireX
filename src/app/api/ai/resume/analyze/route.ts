import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { chat } from "@/lib/ai/chat";
import { SYSTEM_PROMPTS } from "@/lib/ai/prompts";

export const runtime = "nodejs";

const schema = z.object({
  text: z.string().min(40).max(20000),
  targetRole: z.string().max(120).optional(),
});

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "invalid" }, { status: 400 });

  const user = parsed.data.targetRole
    ? `Target role: ${parsed.data.targetRole}\n\nResume:\n${parsed.data.text}`
    : `Resume:\n${parsed.data.text}`;

  const raw = await chat(
    [
      { role: "system", content: SYSTEM_PROMPTS.resumeAnalyzer },
      { role: "user", content: user },
    ],
    { model: "smart", json: true, temperature: 0.2 },
  );

  try {
    return NextResponse.json(JSON.parse(raw));
  } catch {
    return NextResponse.json({ error: "ai returned invalid json", raw }, { status: 502 });
  }
}
