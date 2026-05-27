import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { JobModel } from "@/models/job";
import { jobInput } from "@/lib/jobs/schema";

type Ctx = { params: { id: string } };

export async function GET(_req: Request, { params }: Ctx) {
  if (!mongoose.isValidObjectId(params.id)) {
    return NextResponse.json({ error: "invalid id" }, { status: 400 });
  }
  await connectDB();
  const job = await JobModel.findByIdAndUpdate(
    params.id,
    { $inc: { views: 1 } },
    { new: true },
  ).lean();
  if (!job) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ job });
}

export async function PATCH(req: Request, { params }: Ctx) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  await connectDB();
  const existing = await JobModel.findById(params.id);
  if (!existing) return NextResponse.json({ error: "not found" }, { status: 404 });
  if (existing.recruiterId !== userId) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const parsed = jobInput.partial().safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "invalid" }, { status: 400 });

  Object.assign(existing, parsed.data);
  await existing.save();
  return NextResponse.json({ job: existing });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  await connectDB();
  const job = await JobModel.findById(params.id);
  if (!job) return NextResponse.json({ error: "not found" }, { status: 404 });
  if (job.recruiterId !== userId) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  await job.deleteOne();
  return NextResponse.json({ ok: true });
}
