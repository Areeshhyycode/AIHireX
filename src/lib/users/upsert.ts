import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/user";
import { getMe } from "@/lib/auth";

export async function upsertMeProfile() {
  const me = await getMe();
  if (!me) return null;
  await connectDB();
  return UserModel.findOneAndUpdate(
    { clerkId: me.id },
    {
      $set: {
        clerkId: me.id,
        name: me.name ?? "",
        email: me.email ?? "",
        role: me.role ?? "candidate",
      },
    },
    { new: true, upsert: true },
  ).lean();
}

export async function getMyProfile() {
  const me = await getMe();
  if (!me) return null;
  await connectDB();
  return UserModel.findOne({ clerkId: me.id }).lean();
}
