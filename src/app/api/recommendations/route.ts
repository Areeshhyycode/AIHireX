import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import { JobModel } from "@/models/job";
import { getMyProfile } from "@/lib/users/upsert";
import { embedOne } from "@/lib/embeddings";
import { queryJobs } from "@/lib/pinecone";

export const runtime = "nodejs";

export async function GET() {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const profile = await getMyProfile();
  const text =
    (profile as { resume?: { text?: string } } | null)?.resume?.text ?? "";
  if (text.length < 80) {
    return NextResponse.json({ items: [], reason: "no-resume" });
  }

  try {
    const v = await embedOne(text.slice(0, 4000));
    const matches = await queryJobs(v, 10);
    const ids = matches
      .filter((m) => mongoose.isValidObjectId(m.id))
      .map((m) => new mongoose.Types.ObjectId(m.id));
    if (ids.length === 0) return NextResponse.json({ items: [] });

    await connectDB();
    const jobs = await JobModel.find({ _id: { $in: ids }, status: "published" }).lean();
    const byId = new Map(jobs.map((j) => [String((j as { _id: unknown })._id), j]));
    const items = matches
      .map((m) => {
        const job = byId.get(m.id);
        if (!job) return null;
        return { ...job, id: m.id, matchScore: Math.round(m.score * 100) };
      })
      .filter(Boolean);
    return NextResponse.json({ items });
  } catch (e) {
    return NextResponse.json(
      { items: [], error: (e as Error).message },
      { status: 200 },
    );
  }
}
