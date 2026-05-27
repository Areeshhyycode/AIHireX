import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { chat } from "@/lib/ai/chat";
import { SYSTEM_PROMPTS } from "@/lib/ai/prompts";

export const runtime = "nodejs";

const schema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(4000),
      }),
    )
    .min(1)
    .max(40),
});

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "invalid" }, { status: 400 });

  const reply = await chat(
    [{ role: "system", content: SYSTEM_PROMPTS.careerCoach }, ...parsed.data.messages],
    { model: "smart" },
  );
  return NextResponse.json({ reply });
}
