import { Section } from "@/components/dashboard/section";
import { SettingsTabs } from "@/components/settings/settings-tabs";
import { ToggleRow } from "@/components/settings/toggle-row";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your account, notifications and privacy.
        </p>
      </div>
      <SettingsTabs />
      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="Account">
          <div className="space-y-4">
            <Input id="email-set" label="Email" type="email" placeholder="you@example.com" />
            <Input id="pass-set" label="Password" type="password" placeholder="••••••••" />
            <Button>Save changes</Button>
          </div>
        </Section>
        <Section title="Email preferences">
          <ToggleRow enabled title="Job recommendations" desc="A weekly digest of your top matches." />
          <ToggleRow enabled title="Application updates" desc="Get notified when status changes." />
          <ToggleRow title="Career tips" desc="Resume + interview content from AIHireX." />
          <ToggleRow title="Product updates" desc="Occasional emails about new features." />
        </Section>
        <Section title="Privacy">
          <ToggleRow enabled title="Show profile to recruiters" desc="Verified companies can find you in search." />
          <ToggleRow enabled title="Anonymous applications" desc="Hide your name from initial screening." />
          <ToggleRow title="Show salary expectations" desc="Display on your public profile." />
        </Section>
        <Section title="Danger zone">
          <p className="mb-3 text-sm text-slate-600">
            Deleting your account is permanent and cannot be undone.
          </p>
          <button className="rounded-lg border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50">
            Delete account
          </button>
        </Section>
      </div>
    </div>
  );
}
