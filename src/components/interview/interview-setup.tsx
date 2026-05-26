import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const types = [
  { id: "tech", label: "Technical", desc: "DSA + system design" },
  { id: "behavioral", label: "Behavioral", desc: "STAR-format questions" },
  { id: "hr", label: "HR / Screening", desc: "Culture-fit + basics" },
];
const levels = ["Intern", "Junior", "Mid", "Senior", "Staff"];
const durations = [15, 30, 45];

export function InterviewSetup() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-slate-900">
        Set up your mock interview
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        Pick a role and our AI plays the interviewer — voice, follow-ups and all.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Input id="role" label="Target role" placeholder="e.g. Senior Frontend Engineer" />
        <Input id="company" label="Target company (optional)" placeholder="e.g. Stripe" />
      </div>
      <Group label="Interview type">
        {types.map((t) => (
          <Pill key={t.id} title={t.label} desc={t.desc} active={t.id === "tech"} />
        ))}
      </Group>
      <Group label="Seniority">
        {levels.map((l) => (
          <Chip key={l} text={l} active={l === "Senior"} />
        ))}
      </Group>
      <Group label="Duration (minutes)">
        {durations.map((d) => (
          <Chip key={d} text={`${d} min`} active={d === 30} />
        ))}
      </Group>
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="outline">Save preset</Button>
        <Button size="lg">Start interview</Button>
      </div>
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

function Pill({ title, desc, active }: { title: string; desc: string; active?: boolean }) {
  const cls = active
    ? "border-brand-500 bg-brand-50 text-brand-700"
    : "border-slate-200 hover:border-brand-300";
  return (
    <button className={`rounded-lg border px-3 py-2 text-left ${cls}`}>
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-xs text-slate-500">{desc}</div>
    </button>
  );
}

function Chip({ text, active }: { text: string; active?: boolean }) {
  const cls = active
    ? "bg-brand-600 text-white"
    : "bg-slate-100 text-slate-700 hover:bg-slate-200";
  return <button className={`rounded-full px-3 py-1.5 text-xs font-semibold ${cls}`}>{text}</button>;
}
