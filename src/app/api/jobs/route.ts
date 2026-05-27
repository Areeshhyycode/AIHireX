import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import { JobModel } from "@/models/job";
import { jobInput } from "@/lib/jobs/schema";
import { getRole } from "@/lib/auth";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim();
  const recruiterId = searchParams.get("recruiterId");
  const limit = Math.min(Number(searchParams.get("limit") ?? 30), 100);

  const filter: Record<string, unknown> = { status: "published" };
  if (recruiterId) filter.recruiterId = recruiterId;
  if (q) Object.assign(filter, { $text: { $search: q } });

  const jobs = await JobModel.find(filter).sort({ createdAt: -1 }).limit(limit).lean();
  return NextResponse.json({ jobs });
}

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const role = await getRole();
  if (role !== "recruiter") return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const body = await req.json().catch(() => null);
  const parsed = jobInput.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid", issues: parsed.error.flatten() }, { status: 400 });
  }

  await connectDB();
  const created = await JobModel.create({ ...parsed.data, recruiterId: userId });
  return NextResponse.json({ job: created }, { status: 201 });
}
