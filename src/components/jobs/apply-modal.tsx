"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Upload, Loader2, Check } from "lucide-react";

type Step = "questions" | "resume" | "review" | "done";

export function ApplyModal({
  jobId,
  jobTitle,
  company,
  onClose,
}: {
  jobId: string;
  jobTitle: string;
  company: string;
  onClose: () => void;
}) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("questions");
  const [whyYou, setWhyYou] = useState("");
  const [yearsExp, setYearsExp] = useState("");
  const [availability, setAvailability] = useState("Within 2 weeks");
  const [resumeUrl, setResumeUrl] = useState<string | undefined>(undefined);
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [parsedText, setParsedText] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function pickFile(e: React.ChangeEvent<HTMLInputElement>) {
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
      setParsedText(j.text ?? "");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setUploading(false);
    }
  }

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      const coverNote = [
        whyYou && `Why you're a fit:\n${whyYou}`,
        yearsExp && `Experience: ${yearsExp} years`,
        availability && `Availability: ${availability}`,
      ]
        .filter(Boolean)
        .join("\n\n");
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, coverNote }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error ?? "Apply failed");
      setStep("done");
      router.refresh();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
      <div className="relative z-10 max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-100 p-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Apply to {jobTitle}</h2>
            <p className="text-xs text-slate-500">{company}</p>
          </div>
          <button onClick={onClose} className="rounded-md p-1 text-slate-400 hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-3 text-xs text-slate-500">
          <Bullet active={step === "questions"} done={step !== "questions" && step !== "done"} label="1. Questions" />
          <Bar />
          <Bullet active={step === "resume"} done={step === "review" || step === "done"} label="2. Resume" />
          <Bar />
          <Bullet active={step === "review"} done={step === "done"} label="3. Review" />
        </div>

        {step === "questions" && (
          <div className="space-y-4 p-5">
            <Field label="Why are you a great fit for this role?">
              <textarea
                value={whyYou}
                onChange={(e) => setWhyYou(e.target.value)}
                rows={4}
                placeholder="Share what excites you about this role and what you'd bring..."
                className="w-full rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-brand-500"
              />
            </Field>
            <Field label="Years of relevant experience">
              <input
                value={yearsExp}
                onChange={(e) => setYearsExp(e.target.value)}
                placeholder="3"
                className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-brand-500"
              />
            </Field>
            <Field label="When can you start?">
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none focus:border-brand-500"
              >
                <option>Immediately</option>
                <option>Within 2 weeks</option>
                <option>Within 1 month</option>
                <option>2–3 months</option>
              </select>
            </Field>
            <div className="flex justify-end">
              <button
                onClick={() => setStep("resume")}
                disabled={!whyYou.trim()}
                className="rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {step === "resume" && (
          <div className="space-y-4 p-5">
            <p className="text-sm text-slate-600">Attach your resume. We&apos;ll auto-extract the text for the recruiter.</p>
            <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center">
              <input id="apply-file" type="file" accept="application/pdf,.pdf" onChange={pickFile} className="hidden" />
              <label htmlFor="apply-file" className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-white border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50">
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                {uploading ? "Uploading..." : resumeName ? "Change resume" : "Upload PDF"}
              </label>
              {resumeName && !uploading && (
                <p className="mt-2 inline-flex items-center gap-1 text-xs text-emerald-600">
                  <Check className="h-3.5 w-3.5" />
                  {resumeName}
                </p>
              )}
            </div>
            {error && <p className="text-sm text-rose-600">{error}</p>}
            <div className="flex justify-between">
              <button onClick={() => setStep("questions")} className="text-sm font-medium text-slate-600 hover:text-slate-900">← Back</button>
              <button
                onClick={() => setStep("review")}
                disabled={!parsedText && !resumeUrl}
                className="rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {step === "review" && (
          <div className="space-y-4 p-5">
            <h3 className="text-sm font-semibold text-slate-900">Review your application</h3>
            <Box label="Why you're a fit" value={whyYou} />
            <Box label="Experience" value={`${yearsExp} years`} />
            <Box label="Availability" value={availability} />
            <Box label="Resume" value={resumeName ?? "Not uploaded"} />
            {error && <p className="text-sm text-rose-600">{error}</p>}
            <div className="flex justify-between">
              <button onClick={() => setStep("resume")} className="text-sm font-medium text-slate-600 hover:text-slate-900">← Back</button>
              <button
                onClick={submit}
                disabled={submitting}
                className="rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit application"}
              </button>
            </div>
          </div>
        )}

        {step === "done" && (
          <div className="space-y-4 p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
              <Check className="h-7 w-7 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Application sent 🎉</h3>
            <p className="text-sm text-slate-600">We&apos;ve emailed you a confirmation. Track status in Applications.</p>
            <div className="flex justify-center gap-2">
              <button onClick={onClose} className="rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700">Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      {children}
    </div>
  );
}

function Box({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-0.5 whitespace-pre-wrap text-sm text-slate-900">{value || "—"}</p>
    </div>
  );
}

function Bullet({ active, done, label }: { active: boolean; done?: boolean; label: string }) {
  return (
    <span
      className={
        active
          ? "rounded-full bg-brand-100 px-2 py-0.5 text-xs font-semibold text-brand-700"
          : done
            ? "rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700"
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
