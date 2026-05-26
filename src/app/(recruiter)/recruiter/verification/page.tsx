import { ShieldCheck, BadgeCheck } from "lucide-react";
import { Section } from "@/components/dashboard/section";
import { VerifyStep } from "@/components/verification/verify-step";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function VerificationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Verification</h1>
        <p className="mt-1 text-sm text-slate-500">
          Verified companies get a blue tick, better visibility, and zero scam reports.
        </p>
      </div>
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-emerald-500 p-2 text-white">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-emerald-900">
              Acme Inc. is{" "}
              <BadgeCheck className="-mt-0.5 inline h-4 w-4" /> verified
            </p>
            <p className="text-xs text-emerald-800">
              Trust score 98/100 · last reviewed 2 weeks ago
            </p>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Section title="Verification checklist" subtitle="6 of 7 steps complete">
            <VerifyStep status="done" title="Official domain email" desc="hr@acme.com confirmed via DKIM + DNS check." />
            <VerifyStep status="done" title="Company website" desc="acme.com · 8 years old · SSL valid · low spam score." />
            <VerifyStep status="done" title="LinkedIn company page" desc="11,000+ followers · matches business records." />
            <VerifyStep status="done" title="Business registration" desc="Registration #ABC-12345 verified." />
            <VerifyStep status="done" title="Office address" desc="Confirmed via business registry + Google Maps." />
            <VerifyStep status="in_progress" title="Admin review" desc="Final manual review by AIHireX team." />
            <VerifyStep status="pending" title="Blue tick" desc="Granted automatically after admin review." />
          </Section>
        </div>
        <Section title="Submit additional documents">
          <div className="space-y-4">
            <Input id="reg" label="Business registration #" placeholder="e.g. ABC-12345" />
            <Input id="addr" label="Office address" placeholder="Street, City, Country" />
            <Input id="li" label="LinkedIn company URL" placeholder="https://linkedin.com/company/..." />
            <Button fullWidth>Submit for review</Button>
          </div>
        </Section>
      </div>
    </div>
  );
}
