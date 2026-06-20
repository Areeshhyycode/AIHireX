"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const types = [
  { id: "tech", label: "Technical", desc: "DSA + system design" },
  { id: "behavioral", label: "Behavioral", desc: "STAR-format questions" },
  { id: "hr", label: "HR / Screening", desc: "Culture-fit + basics" },
];
const levels = ["Intern", "Junior", "Mid", "Senior", "Staff"];
const durations = [15, 30, 45];

export function InterviewSetup() {
  const router = useRouter();
  const [role, setRole] = useState("Senior Frontend Engineer");
  const [company, setCompany] = useState("");
  const [type, setType] = useState("tech");
  const [level, setLevel] = useState("Senior");
  const [duration, setDuration] = useState(30);
  const [starting, setStarting] = useState(false);

  function start() {
    if (!role.trim()) return;
    setStarting(true);
    const qs = new URLSearchParams({
      role: role.trim(),
      type,
      level,
      duration: String(duration),
    });
    if (company.trim()) qs.set("company", company.trim());
    router.push(`/candidate/interview/live?${qs.toString()}`);
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-semibold tracking-tight text-slate-900">
        Set up your mock interview
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        Pick a role and our AI plays the interviewer — voice, follow-ups and all.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Target role" value={role} onChange={setRole} placeholder="Senior Frontend Engineer" />
        <Field label="Target company (optional)" value={company} onChange={setCompany} placeholder="e.g. Stripe" />
      </div>
      <Group label="Interview type">
        {types.map((t) => (
          <Pill
            key={t.id}
            title={t.label}
            desc={t.desc}
            active={t.id === type}
            onClick={() => setType(t.id)}
          />
        ))}
      </Group>
      <Group label="Seniority">
        {levels.map((l) => (
          <Chip key={l} text={l} active={l === level} onClick={() => setLevel(l)} />
        ))}
      </Group>
      <Group label="Duration (minutes)">
        {durations.map((d) => (
          <Chip key={d} text={`${d} min`} active={d === duration} onClick={() => setDuration(d)} />
        ))}
      </Group>
      <div className="mt-6 flex justify-end">
        <Button size="lg" onClick={start} disabled={starting || !role.trim()}>
          {starting ? "Starting..." : "Start interview"}
        </Button>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-brand-500"
      />
    </div>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <p className="mb-2 text-sm font-medium text-slate-700">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Pill({ title, desc, active, onClick }: { title: string; desc: string; active?: boolean; onClick: () => void }) {
  const cls = active
    ? "border-brand-500 bg-brand-50 text-brand-700"
    : "border-slate-200 hover:border-brand-300";
  return (
    <button type="button" onClick={onClick} className={`rounded-lg border px-3 py-2 text-left transition ${cls}`}>
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-xs text-slate-500">{desc}</div>
    </button>
  );
}

function Chip({ text, active, onClick }: { text: string; active?: boolean; onClick: () => void }) {
  const cls = active
    ? "bg-brand-600 text-white"
    : "bg-slate-100 text-slate-700 hover:bg-slate-200";
  return (
    <button type="button" onClick={onClick} className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${cls}`}>
      {text}
    </button>
  );
}
