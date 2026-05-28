import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { ApplicationModel } from "@/models/application";
import { sendInterviewEmail } from "@/lib/email/send";

export const runtime = "nodejs";

const schema = z.object({
  status: z.enum(["applied", "reviewing", "interview", "offer", "rejected"]),
});

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!mongoose.isValidObjectId(params.id)) {
    return NextResponse.json({ error: "invalid id" }, { status: 400 });
  }
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "invalid" }, { status: 400 });

  try {
    await connectDB();
    const doc = await ApplicationModel.findOneAndUpdate(
      { _id: params.id, recruiterId: userId },
      { $set: { status: parsed.data.status } },
      { new: true },
    ).lean<{
      candidateEmail?: string;
      candidateName?: string;
      jobTitle: string;
      company: string;
    } | null>();
    if (!doc) return NextResponse.json({ error: "not found" }, { status: 404 });

    if (parsed.data.status === "interview" && doc.candidateEmail) {
      sendInterviewEmail({
        to: doc.candidateEmail,
        name: doc.candidateName ?? "there",
        jobTitle: doc.jobTitle,
        company: doc.company,
      }).catch((e) => console.warn("[email]", e.message));
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
