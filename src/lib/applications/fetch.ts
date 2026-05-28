import { connectDB } from "@/lib/db";
import { ApplicationModel } from "@/models/application";
import mongoose from "mongoose";

export type ApplicationItem = {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  status: "applied" | "reviewing" | "interview" | "offer" | "rejected" | "withdrawn";
  matchScore?: number;
  appliedAt: string;
  candidateClerkId: string;
  candidateName?: string;
  candidateEmail?: string;
  resumeUrl?: string;
};

function toItem(d: Record<string, unknown>): ApplicationItem {
  return {
    id: String((d as { _id: unknown })._id),
    jobId: String((d as { jobId: unknown }).jobId),
    jobTitle: String(d.jobTitle ?? ""),
    company: String(d.company ?? ""),
    status: (d.status ?? "applied") as ApplicationItem["status"],
    matchScore: d.matchScore as number | undefined,
    appliedAt: new Date((d.createdAt as Date) ?? Date.now()).toISOString(),
    candidateClerkId: String(d.candidateClerkId ?? ""),
    candidateName: d.candidateName as string | undefined,
    candidateEmail: d.candidateEmail as string | undefined,
    resumeUrl: d.resumeUrl as string | undefined,
  };
}

export async function listMyApplications(clerkId: string) {
  try {
    await connectDB();
    const docs = await ApplicationModel.find({ candidateClerkId: clerkId })
      .sort({ createdAt: -1 })
      .lean();
    return docs.map((d) => toItem(d as Record<string, unknown>));
  } catch (e) {
    console.error("[listMyApplications] DB error", (e as Error).message);
    return [] as ApplicationItem[];
  }
}

export async function listApplicantsForJob(jobId: string) {
  if (!mongoose.isValidObjectId(jobId)) return [];
  try {
    await connectDB();
    const docs = await ApplicationModel.find({ jobId })
      .sort({ createdAt: -1 })
      .lean();
    return docs.map((d) => toItem(d as Record<string, unknown>));
  } catch (e) {
    console.error("[listApplicantsForJob] DB error", (e as Error).message);
    return [] as ApplicationItem[];
  }
}

export async function listApplicantsForRecruiter(recruiterId: string) {
  try {
    await connectDB();
    const docs = await ApplicationModel.find({ recruiterId })
      .sort({ createdAt: -1 })
      .lean();
    return docs.map((d) => toItem(d as Record<string, unknown>));
  } catch (e) {
    console.error("[listApplicantsForRecruiter] DB error", (e as Error).message);
    return [] as ApplicationItem[];
  }
}

export async function countMyApplications(clerkId: string) {
  try {
    await connectDB();
    const [total, interviews] = await Promise.all([
      ApplicationModel.countDocuments({ candidateClerkId: clerkId }),
      ApplicationModel.countDocuments({
        candidateClerkId: clerkId,
        status: "interview",
      }),
    ]);
    return { total, interviews };
  } catch {
    return { total: 0, interviews: 0 };
  }
}

export async function hasApplied(clerkId: string, jobId: string) {
  if (!mongoose.isValidObjectId(jobId)) return false;
  try {
    await connectDB();
    const exists = await ApplicationModel.exists({
      candidateClerkId: clerkId,
      jobId,
    });
    return !!exists;
  } catch {
    return false;
  }
}
