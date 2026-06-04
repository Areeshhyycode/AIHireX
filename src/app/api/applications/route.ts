import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { JobModel } from "@/models/job";
import { ApplicationModel } from "@/models/application";
import { getMe } from "@/lib/auth";
import { getMyProfile, upsertMeProfile } from "@/lib/users/upsert";
import { sendApplicationEmail } from "@/lib/email/send";
import { createNotification } from "@/lib/notifications/fetch";

export const runtime = "nodejs";

const schema = z.object({
  jobId: z.string().min(1),
  coverNote: z.string().max(2000).optional(),
});

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "invalid" }, { status: 400 });
  if (!mongoose.isValidObjectId(parsed.data.jobId)) {
    return NextResponse.json({ error: "invalid jobId" }, { status: 400 });
  }

  try {
    await connectDB();
    const job = await JobModel.findById(parsed.data.jobId).lean<{
      _id: unknown;
      title: string;
      company: string;
      recruiterId: string;
    } | null>();
    if (!job) return NextResponse.json({ error: "job not found" }, { status: 404 });

    const me = await getMe();
    await upsertMeProfile();
    const profile = await getMyProfile();
    const resume = (profile as { resume?: { url?: string; text?: string } } | null)?.resume;

    const doc = await ApplicationModel.findOneAndUpdate(
      { candidateClerkId: userId, jobId: job._id },
      {
        $setOnInsert: {
          candidateClerkId: userId,
          candidateName: me?.name,
          candidateEmail: me?.email,
          jobId: job._id,
          jobTitle: job.title,
          company: job.company,
          recruiterId: job.recruiterId,
          status: "applied",
          resumeUrl: resume?.url,
          resumeText: resume?.text,
          coverNote: parsed.data.coverNote,
        },
      },
      { upsert: true, new: true },
    ).lean<{ _id: unknown } | null>();

    if (doc?._id && me?.email) {
      sendApplicationEmail({
        to: me.email,
        name: me.name ?? "there",
        jobTitle: job.title,
        company: job.company,
      }).catch((e) => console.warn("[email]", e.message));
    }
    if (doc?._id) {
      createNotification({
        userId,
        type: "application",
        title: `Application sent: ${job.title}`,
        body: `Your application to ${job.company} is in. We'll notify you on updates.`,
        link: `/candidate/applications`,
      });
      createNotification({
        userId: job.recruiterId,
        type: "application",
        title: `New applicant: ${job.title}`,
        body: `${me?.name ?? "Someone"} applied to your job.`,
        link: `/recruiter/applicants/${String(doc._id)}`,
      });
    }

    return NextResponse.json({ ok: true, id: doc ? String(doc._id) : null });
  } catch (e) {
    if ((e as { code?: number }).code === 11000) {
      return NextResponse.json({ ok: true, duplicate: true });
    }
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
