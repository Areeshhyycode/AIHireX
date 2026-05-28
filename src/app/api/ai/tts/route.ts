import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { env } from "@/lib/env";

export const runtime = "nodejs";

const schema = z.object({ text: z.string().min(1).max(2000) });
const VOICE_ID = "EXAVITQu4vr4xnSDxMaL"; // ElevenLabs "Sarah" — clear, female, friendly

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!env.ELEVENLABS_API_KEY) {
    return NextResponse.json({ error: "voice not configured" }, { status: 503 });
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "invalid" }, { status: 400 });

  const r = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: {
        "xi-api-key": env.ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: parsed.data.text,
        model_id: "eleven_turbo_v2_5",
        voice_settings: { stability: 0.4, similarity_boost: 0.75 },
      }),
    },
  );
  if (!r.ok) {
    return NextResponse.json(
      { error: `tts ${r.status}: ${await r.text()}` },
      { status: 502 },
    );
  }
  return new Response(r.body, {
    headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store" },
  });
}
