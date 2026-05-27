import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { chat } from "@/lib/ai/chat";
import { SYSTEM_PROMPTS } from "@/lib/ai/prompts";

export const runtime = "nodejs";

const schema = z.object({
  title: z.string().min(2).max(200),
  description: z.string().min(30).max(10000),
  salary: z.string().max(120).optional(),
});

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "invalid" }, { status: 400 });

  const user = `Title: ${parsed.data.title}\nSalary: ${parsed.data.salary ?? "(not stated)"}\n\nJob description:\n${parsed.data.description}`;

  const raw = await chat(
    [
      { role: "system", content: SYSTEM_PROMPTS.scamCheck },
      { role: "user", content: user },
    ],
    { model: "fast", json: true, temperature: 0.1 },
  );

  try {
    return NextResponse.json(JSON.parse(raw));
  } catch {
    return NextResponse.json({ error: "ai returned invalid json", raw }, { status: 502 });
  }
}
