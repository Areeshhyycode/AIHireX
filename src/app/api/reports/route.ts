import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { ReportModel } from "@/models/report";

export const runtime = "nodejs";

const schema = z.object({
  targetType: z.enum(["job", "user", "application"]),
  targetId: z.string().min(1),
  reason: z.enum(["scam", "fake", "inappropriate", "spam", "other"]),
  notes: z.string().max(800).optional(),
});

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "invalid" }, { status: 400 });
  if (!mongoose.isValidObjectId(parsed.data.targetId)) {
    return NextResponse.json({ error: "invalid targetId" }, { status: 400 });
  }
  await connectDB();
  await ReportModel.create({
    reporterClerkId: userId,
    targetType: parsed.data.targetType,
    targetId: parsed.data.targetId,
    reason: parsed.data.reason,
    notes: parsed.data.notes,
  });
  return NextResponse.json({ ok: true });
}
