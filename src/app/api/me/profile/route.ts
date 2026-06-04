import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/user";
import { getMe } from "@/lib/auth";

export const runtime = "nodejs";

const patchSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  headline: z.string().max(160).optional(),
  bio: z.string().max(2000).optional(),
  location: z.string().max(120).optional(),
  website: z.string().max(200).optional(),
  github: z.string().max(120).optional(),
  linkedin: z.string().max(200).optional(),
  skills: z.array(z.string().max(60)).max(60).optional(),
});

export async function GET() {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const me = await getMe();
  await connectDB();
  const doc = await UserModel.findOneAndUpdate(
    { clerkId: userId },
    { $setOnInsert: { clerkId: userId, name: me?.name ?? "", email: me?.email ?? "" } },
    { new: true, upsert: true },
  ).lean();
  return NextResponse.json({ profile: doc });
}

export async function PATCH(req: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }
  await connectDB();
  const updated = await UserModel.findOneAndUpdate(
    { clerkId: userId },
    { $set: parsed.data },
    { new: true, upsert: true },
  ).lean();
  return NextResponse.json({ profile: updated });
}
