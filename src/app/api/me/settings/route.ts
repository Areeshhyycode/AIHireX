import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/user";

export const runtime = "nodejs";

const schema = z.object({
  emailNotifications: z.boolean().optional(),
  weeklyDigest: z.boolean().optional(),
  publicProfile: z.boolean().optional(),
});

export async function PATCH(req: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "invalid" }, { status: 400 });

  const update: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(parsed.data)) update[`settings.${k}`] = v;

  await connectDB();
  const doc = await UserModel.findOneAndUpdate(
    { clerkId: userId },
    { $set: update },
    { new: true, upsert: true },
  ).lean();
  return NextResponse.json({
    settings: (doc as { settings?: unknown } | null)?.settings ?? {},
  });
}
