import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import { NotificationModel } from "@/models/notification";

export const runtime = "nodejs";

export async function GET() {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  await connectDB();
  const docs = await NotificationModel.find({ userId })
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();
  return NextResponse.json({ items: docs });
}

export async function POST() {
  // Mark all as read
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  await connectDB();
  await NotificationModel.updateMany({ userId, read: false }, { $set: { read: true } });
  return NextResponse.json({ ok: true });
}
