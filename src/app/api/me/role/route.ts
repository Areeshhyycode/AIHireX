import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";

const schema = z.object({
  role: z.enum(["candidate", "recruiter", "admin"]),
});

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid role" }, { status: 400 });
  }

  await clerkClient().users.updateUser(userId, {
    publicMetadata: { role: parsed.data.role },
  });

  return NextResponse.json({ ok: true, role: parsed.data.role });
}
