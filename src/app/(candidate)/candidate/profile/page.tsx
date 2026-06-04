import { auth } from "@clerk/nextjs/server";
import { ProfileFormCard, type ProfileForm } from "@/components/candidate/profile-form";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/user";
import { getMe } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const { userId } = auth();
  const me = await getMe();
  await connectDB();
  const doc = userId
    ? await UserModel.findOneAndUpdate(
        { clerkId: userId },
        {
          $setOnInsert: {
            clerkId: userId,
            name: me?.name ?? "",
            email: me?.email ?? "",
          },
        },
        { new: true, upsert: true },
      ).lean<Record<string, unknown> | null>()
    : null;

  const initial: ProfileForm = {
    name: (doc?.name as string) ?? me?.name ?? "",
    headline: (doc?.headline as string) ?? "",
    bio: (doc?.bio as string) ?? "",
    location: (doc?.location as string) ?? "",
    website: (doc?.website as string) ?? "",
    github: (doc?.github as string) ?? "",
    linkedin: (doc?.linkedin as string) ?? "",
    skills: (doc?.skills as string[]) ?? [],
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
        <p className="mt-1 text-sm text-slate-500">
          Recruiters see this. Keep it sharp.
        </p>
      </div>
      <ProfileFormCard initial={initial} />
    </div>
  );
}
