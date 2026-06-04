import { NextResponse } from "next/server";
import { z } from "zod";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { ReportModel } from "@/models/report";
import { requireRole } from "@/lib/auth-guard";

export const runtime = "nodejs";

const schema = z.object({ status: z.enum(["resolved", "dismissed", "open"]) });

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  await requireRole("admin");
  if (!mongoose.isValidObjectId(params.id)) {
    return NextResponse.json({ error: "invalid id" }, { status: 400 });
  }
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "invalid" }, { status: 400 });

  await connectDB();
  const doc = await ReportModel.findByIdAndUpdate(
    params.id,
    { $set: { status: parsed.data.status } },
    { new: true },
  ).lean();
  if (!doc) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
