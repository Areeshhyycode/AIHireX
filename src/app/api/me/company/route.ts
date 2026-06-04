import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { CompanyModel } from "@/models/company";
import { createNotification } from "@/lib/notifications/fetch";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().min(2).max(120),
  domain: z.string().max(120).optional(),
  email: z.string().email().max(160),
  website: z.string().url().max(200).optional(),
  linkedin: z.string().max(200).optional(),
  registrationNumber: z.string().max(60).optional(),
  address: z.string().max(300).optional(),
});

export async function GET() {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  await connectDB();
  const doc = await CompanyModel.findOne({ recruiterClerkId: userId }).lean();
  return NextResponse.json({ company: doc });
}

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  await connectDB();
  const doc = await CompanyModel.findOneAndUpdate(
    { recruiterClerkId: userId },
    {
      $set: {
        ...parsed.data,
        recruiterClerkId: userId,
        status: "pending",
        reviewedAt: undefined,
        rejectionReason: undefined,
      },
    },
    { new: true, upsert: true },
  ).lean<{ _id: unknown } | null>();

  createNotification({
    userId,
    type: "info",
    title: "Verification submitted",
    body: `${parsed.data.name} is in review. We'll notify you on the decision.`,
    link: "/recruiter/verification",
  });

  return NextResponse.json({ ok: true, id: doc ? String(doc._id) : null });
}
