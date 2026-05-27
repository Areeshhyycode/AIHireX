import { connectDB } from "@/lib/db";
import { JobModel, type Job } from "@/models/job";
import mongoose from "mongoose";

export type JobListItem = Job & { id: string };

function toListItem(j: Record<string, unknown>): JobListItem {
  return { ...(j as Job), id: String((j as { _id: unknown })._id) };
}

export async function listJobs(opts: { q?: string; limit?: number } = {}) {
  try {
    await connectDB();
    const filter: Record<string, unknown> = { status: "published" };
    if (opts.q) filter.$text = { $search: opts.q };
    const docs = await JobModel.find(filter)
      .sort({ createdAt: -1 })
      .limit(opts.limit ?? 30)
      .lean();
    return docs.map(toListItem);
  } catch (e) {
    console.error("[listJobs] DB error — returning []", (e as Error).message);
    return [] as JobListItem[];
  }
}

export async function getJob(id: string) {
  if (!mongoose.isValidObjectId(id)) return null;
  try {
    await connectDB();
    const doc = await JobModel.findById(id).lean();
    return doc ? toListItem(doc as Record<string, unknown>) : null;
  } catch (e) {
    console.error("[getJob] DB error", (e as Error).message);
    return null;
  }
}

export async function listJobsByRecruiter(recruiterId: string) {
  try {
    await connectDB();
    const docs = await JobModel.find({ recruiterId })
      .sort({ createdAt: -1 })
      .lean();
    return docs.map(toListItem);
  } catch (e) {
    console.error("[listJobsByRecruiter] DB error", (e as Error).message);
    return [] as JobListItem[];
  }
}
