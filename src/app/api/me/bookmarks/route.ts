import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/user";

export const runtime = "nodejs";

const schema = z.object({
  jobId: z.string().min(1),
  action: z.enum(["add", "remove"]),
});

export async function GET() {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  await connectDB();
  const doc = await UserModel.findOne({ clerkId: userId }).lean<{
    savedJobs?: unknown[];
  } | null>();
  const ids = (doc?.savedJobs ?? []).map(String);
  return NextResponse.json({ ids });
}

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "invalid" }, { status: 400 });
  if (!mongoose.isValidObjectId(parsed.data.jobId)) {
    return NextResponse.json({ error: "invalid jobId" }, { status: 400 });
  }

  await connectDB();
  const op =
    parsed.data.action === "add"
      ? { $addToSet: { savedJobs: parsed.data.jobId } }
      : { $pull: { savedJobs: parsed.data.jobId } };

  await UserModel.findOneAndUpdate({ clerkId: userId }, op, { upsert: true });
  return NextResponse.json({ ok: true });
}
