import { auth } from "@clerk/nextjs/server";
import { Section } from "@/components/dashboard/section";
import { SettingsClient, type Settings } from "@/components/settings/settings-client";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/user";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const { userId } = auth();
  await connectDB();
  const doc = userId
    ? await UserModel.findOne({ clerkId: userId }).lean<{ settings?: Settings } | null>()
    : null;
  const initial: Settings = {
    emailNotifications: doc?.settings?.emailNotifications ?? true,
    weeklyDigest: doc?.settings?.weeklyDigest ?? true,
    publicProfile: doc?.settings?.publicProfile ?? false,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">
          Notifications and privacy. Changes auto-save. Email/password via user menu (top-right).
        </p>
      </div>
      <SettingsClient initial={initial} />
      <Section title="Danger zone">
        <p className="text-sm text-slate-600">
          To delete your account, use the Clerk user menu (top-right avatar).
        </p>
      </Section>
    </div>
  );
}
