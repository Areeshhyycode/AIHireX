import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { chat } from "@/lib/ai/chat";
import { SYSTEM_PROMPTS } from "@/lib/ai/prompts";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/user";
import { getMe } from "@/lib/auth";

export const runtime = "nodejs";

const schema = z.object({
  text: z.string().min(40).max(20000),
  targetRole: z.string().max(120).optional(),
  resumeUrl: z.string().url().optional(),
  pages: z.number().int().nonnegative().optional(),
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

  let result: Record<string, unknown>;
  try {
    result = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "ai returned invalid json", raw }, { status: 502 });
  }

  // Persist to user profile (best-effort, don't break analyze if DB down)
  try {
    const me = await getMe();
    await connectDB();
    await UserModel.findOneAndUpdate(
      { clerkId: userId },
      {
        $set: {
          clerkId: userId,
          name: me?.name ?? "",
          email: me?.email ?? "",
          role: me?.role ?? "candidate",
          resume: {
            url: parsed.data.resumeUrl,
            text: parsed.data.text,
            pages: parsed.data.pages,
            atsScore: result.atsScore as number | undefined,
            summary: result.summary as string | undefined,
            missingSkills: (result.missingSkills as string[] | undefined) ?? [],
            analyzedAt: new Date(),
          },
        },
      },
      { upsert: true },
    );
  } catch (e) {
    console.warn("[analyze] persist skipped:", (e as Error).message);
  }

  return NextResponse.json(result);
}
