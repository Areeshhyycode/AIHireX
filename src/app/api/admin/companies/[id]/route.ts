import { NextResponse } from "next/server";
import { z } from "zod";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { CompanyModel } from "@/models/company";
import { requireRole } from "@/lib/auth-guard";
import { createNotification } from "@/lib/notifications/fetch";

export const runtime = "nodejs";

const schema = z.object({
  status: z.enum(["verified", "rejected", "suspicious", "pending"]),
  reason: z.string().max(500).optional(),
});

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
  const doc = await CompanyModel.findByIdAndUpdate(
    params.id,
    {
      $set: {
        status: parsed.data.status,
        rejectionReason: parsed.data.reason,
        reviewedAt: new Date(),
      },
    },
    { new: true },
  ).lean<{
    recruiterClerkId?: string;
    name?: string;
  } | null>();
  if (!doc) return NextResponse.json({ error: "not found" }, { status: 404 });

  if (doc.recruiterClerkId) {
    const titles: Record<typeof parsed.data.status, string> = {
      verified: `${doc.name ?? "Your company"} is verified ✓`,
      rejected: `Verification update for ${doc.name ?? "your company"}`,
      suspicious: `Verification flagged for ${doc.name ?? "your company"}`,
      pending: `Verification re-opened for ${doc.name ?? "your company"}`,
    };
    createNotification({
      userId: doc.recruiterClerkId,
      type: "info",
      title: titles[parsed.data.status],
      body: parsed.data.reason,
      link: "/recruiter/verification",
    });
  }
  return NextResponse.json({ ok: true });
}
