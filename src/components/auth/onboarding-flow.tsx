"use client";

import { useState } from "react";
import { User, Building2, Upload, Sparkles, Check, Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Role = "candidate" | "recruiter";
type Step = "role" | "resume" | "preferences" | "done";

const workTypes = ["Remote", "Hybrid", "Onsite"] as const;
const levels = ["Intern", "Junior", "Mid", "Senior", "Lead+"] as const;

export function OnboardingFlow({
  initialRole,
  existing,
}: {
  initialRole: Role;
  existing?: string | null;
}) {
  const [role, setRole] = useState<Role>(initialRole);
  const [step, setStep] = useState<Step>("role");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Candidate prefs
  const [primaryRole, setPrimaryRole] = useState("");
  const [tracks, setTracks] = useState<string[]>([]);
  const [level, setLevel] = useState("Mid");
  const [workType, setWorkType] = useState<string[]>(["Remote"]);
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [skills, setSkills] = useState("");

  // Resume
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | undefined>();
  const [resumeText, setResumeText] = useState("");
  const [uploading, setUploading] = useState(false);

  async function saveRole() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/me/role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? "Failed");
      }
      if (role === "recruiter") {
        window.location.assign("/recruiter");
        return;
      }
      setStep("resume");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function uploadResume(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    setResumeName(file.name);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/resume/parse", { method: "POST", body: fd });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error ?? "Upload failed");
      setResumeUrl(j.url);
      setResumeText(j.text ?? "");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploading(false);
    }
  }

  async function finish() {
    setSaving(true);
    setError(null);
    try {
      // Save profile + skills + tracks
      await fetch("/api/me/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          headline: primaryRole,
          location,
          skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
          bio: tracks.length
            ? `Tracks: ${tracks.join(", ")}. Level: ${level}. Work: ${workType.join(
                "/",
              )}. Salary: ${salary}.`
            : undefined,
        }),
      });
      // Best-effort: kick off resume analysis if we have text
      if (resumeText.length > 80) {
        fetch("/api/ai/resume/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: resumeText,
            targetRole: primaryRole || undefined,
            resumeUrl,
          }),
        }).catch(() => null);
      }
      setStep("done");
      setTimeout(() => window.location.assign("/candidate"), 800);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  function toggle<T>(list: T[], v: T): T[] {
    return list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
  }

  return (
    <div className="w-full max-w-2xl">
      {/* Stepper */}
      {role === "candidate" && step !== "role" && (
        <div className="mb-6 flex items-center gap-2 text-xs font-medium text-slate-500">
          <StepDot active={false} done label="1. Role" />
          <Bar />
          <StepDot active={step === "resume"} done={step === "preferences" || step === "done"} label="2. Resume" />
          <Bar />
          <StepDot active={step === "preferences"} done={step === "done"} label="3. Preferences" />
        </div>
      )}

      {step === "role" && (
        <div>
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {existing ? "Switch role" : "Welcome to AIHireX"}
            </h1>
            <p className="mt-2 text-slate-600">
              {existing
                ? `You're currently ${existing}. Pick a new role to switch.`
                : "Pick how you'll use AIHireX. You can switch later."}
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <RoleCard
              active={role === "candidate"}
              onClick={() => setRole("candidate")}
              title="I'm looking for a job"
              desc="Get AI resume help, mock interviews, and smart job matches."
              icon={<User className="h-6 w-6" />}
            />
            <RoleCard
              active={role === "recruiter"}
              onClick={() => setRole("recruiter")}
              title="I'm hiring"
              desc="Post jobs, filter candidates with AI, and run smart screenings."
              icon={<Building2 className="h-6 w-6" />}
            />
          </div>
          {error && <p className="mt-4 text-center text-sm text-rose-600">{error}</p>}
          <button
            onClick={saveRole}
            disabled={saving}
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Continue"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {step === "resume" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Upload your resume
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            We&apos;ll extract your skills + experience to match you with the right
            roles.
          </p>
          <div className="mt-6 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <input
              id="onb-resume"
              type="file"
              accept="application/pdf,.pdf"
              onChange={uploadResume}
              disabled={uploading}
              className="hidden"
            />
            <label
              htmlFor="onb-resume"
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
            >
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              {uploading ? "Uploading..." : resumeName ? "Replace PDF" : "Choose PDF"}
            </label>
            {resumeName && !uploading && (
              <p className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                <Check className="h-3.5 w-3.5" />
                {resumeName}
              </p>
            )}
          </div>
          {error && <p className="mt-4 text-sm text-rose-600">{error}</p>}
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => setStep("preferences")}
              className="text-sm font-medium text-slate-500 hover:text-slate-700"
            >
              Skip for now →
            </button>
            <button
              onClick={() => setStep("preferences")}
              disabled={uploading}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-brand-600 px-5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {step === "preferences" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Tell us what you&apos;re looking for
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Helps our AI rank the right roles for you across multiple tracks.
          </p>
          <div className="mt-6 space-y-5">
            <Field label="Primary role you want">
              <input
                value={primaryRole}
                onChange={(e) => setPrimaryRole(e.target.value)}
                placeholder="e.g. Senior Frontend Engineer"
                className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-brand-500"
              />
            </Field>

            <Field label="Other career tracks (open to)">
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Frontend",
                  "Full Stack",
                  "MERN",
                  "Backend",
                  "Mobile",
                  "DevOps",
                  "Data",
                  "AI/ML",
                ].map((t) => (
                  <Chip
                    key={t}
                    text={t}
                    active={tracks.includes(t)}
                    onClick={() => setTracks(toggle(tracks, t))}
                  />
                ))}
              </div>
            </Field>

            <Field label="Experience level">
              <div className="flex flex-wrap gap-1.5">
                {levels.map((l) => (
                  <Chip
                    key={l}
                    text={l}
                    active={level === l}
                    onClick={() => setLevel(l)}
                  />
                ))}
              </div>
            </Field>

            <Field label="Preferred work type">
              <div className="flex flex-wrap gap-1.5">
                {workTypes.map((w) => (
                  <Chip
                    key={w}
                    text={w}
                    active={workType.includes(w)}
                    onClick={() => setWorkType(toggle(workType, w))}
                  />
                ))}
              </div>
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Preferred location">
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Karachi · Remote · Anywhere"
                  className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-brand-500"
                />
              </Field>
              <Field label="Expected salary">
                <input
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="$80k–$120k"
                  className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-brand-500"
                />
              </Field>
            </div>

            <Field label="Top skills (comma-separated)">
              <input
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="React, TypeScript, Next.js, Node.js"
                className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-brand-500"
              />
            </Field>
          </div>

          {error && <p className="mt-4 text-sm text-rose-600">{error}</p>}
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => setStep("resume")}
              className="text-sm font-medium text-slate-500 hover:text-slate-700"
            >
              ← Back
            </button>
            <button
              onClick={finish}
              disabled={saving || !primaryRole.trim()}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-brand-600 px-5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
            >
              {saving ? "Setting up..." : "Finish setup"}
              <Sparkles className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {step === "done" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <Check className="h-8 w-8 text-emerald-600" />
          </div>
          <h2 className="font-display text-2xl font-bold">You&apos;re all set 🎉</h2>
          <p className="mt-2 text-sm text-slate-600">Taking you to your dashboard...</p>
        </div>
      )}
    </div>
  );
}

function RoleCard({
  active,
  onClick,
  title,
  desc,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-2xl border p-5 text-left transition",
        active
          ? "border-brand-500 bg-brand-50 ring-2 ring-brand-100"
          : "border-slate-200 bg-white hover:border-slate-300",
      )}
    >
      <div
        className={cn(
          "inline-flex rounded-lg p-2",
          active ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600",
        )}
      >
        {icon}
      </div>
      <p className="mt-3 text-base font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-sm text-slate-600">{desc}</p>
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function Chip({ text, active, onClick }: { text: string; active?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "rounded-full px-3 py-1.5 text-xs font-semibold transition " +
        (active ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200")
      }
    >
      {text}
    </button>
  );
}

function StepDot({ active, done, label }: { active: boolean; done?: boolean; label: string }) {
  return (
    <span
      className={
        active
          ? "rounded-full bg-brand-100 px-2.5 py-1 text-xs font-semibold text-brand-700"
          : done
            ? "rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700"
            : "text-xs text-slate-400"
      }
    >
      {label}
    </span>
  );
}

function Bar() {
  return <span className="h-px flex-1 bg-slate-200" />;
}
