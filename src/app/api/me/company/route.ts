import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { CompanyModel } from "@/models/company";
import { createNotification } from "@/lib/notifications/fetch";

export const runtime = "nodejs";

// Helper: normalize a URL-ish field — accept "acme.com" or "https://acme.com"
const flexibleUrl = z
  .string()
  .trim()
  .max(200)
  .optional()
  .transform((v) => {
    if (!v) return undefined;
    if (/^https?:\/\//i.test(v)) return v;
    return `https://${v}`;
  });

const schema = z.object({
  name: z.string().trim().min(2, "Company name is required").max(120),
  email: z.string().trim().email("A valid company email is required").max(160),
  website: flexibleUrl,
  description: z.string().trim().max(2000).optional(),
  industry: z.string().trim().max(120).optional(),
  size: z.string().trim().max(40).optional(),
  address: z.string().trim().max(300).optional(),
  contactName: z.string().trim().max(120).optional(),
  contactPhone: z.string().trim().max(40).optional(),
  linkedin: flexibleUrl,
  registrationNumber: z.string().trim().max(60).optional(),
  domain: z.string().trim().toLowerCase().max(120).optional(),
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
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const first = Object.entries(fieldErrors)
      .map(([k, v]) => `${k}: ${(v as string[])?.[0]}`)
      .filter(Boolean)
      .slice(0, 3)
      .join(" · ");
    return NextResponse.json(
      {
        error: "invalid",
        message: first || "Some fields are missing or invalid.",
        fields: fieldErrors,
      },
      { status: 400 },
    );
  }

  const data = parsed.data;
  // Derive domain from email if not supplied
  if (!data.domain && data.email) {
    data.domain = data.email.split("@")[1]?.toLowerCase();
  }

  await connectDB();
  const doc = await CompanyModel.findOneAndUpdate(
    { recruiterClerkId: userId },
    {
      $set: {
        ...data,
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
    body: `${data.name} is in review. We'll notify you on the decision.`,
    link: "/recruiter/verification",
  });

  return NextResponse.json({ ok: true, id: doc ? String(doc._id) : null });
}
