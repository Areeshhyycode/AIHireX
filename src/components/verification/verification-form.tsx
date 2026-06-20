"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export type CompanyForm = {
  name: string;
  website: string;
  email: string;
  description: string;
  industry: string;
  size: string;
  address: string;
  contactName: string;
  contactPhone: string;
  linkedin: string;
  registrationNumber: string;
};

const industries = [
  "Software / SaaS",
  "Fintech",
  "Healthcare",
  "E-commerce",
  "Education",
  "Media / Entertainment",
  "Manufacturing",
  "Consulting",
  "Marketing / Agency",
  "Other",
];

const sizes = [
  "1–10 employees",
  "11–50 employees",
  "51–200 employees",
  "201–500 employees",
  "501–1000 employees",
  "1000+ employees",
];

export function VerificationForm({ initial }: { initial: Partial<CompanyForm> }) {
  const router = useRouter();
  const [f, setF] = useState<CompanyForm>({
    name: initial.name ?? "",
    website: initial.website ?? "",
    email: initial.email ?? "",
    description: initial.description ?? "",
    industry: initial.industry ?? "",
    size: initial.size ?? "",
    address: initial.address ?? "",
    contactName: initial.contactName ?? "",
    contactPhone: initial.contactPhone ?? "",
    linkedin: initial.linkedin ?? "",
    registrationNumber: initial.registrationNumber ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function set<K extends keyof CompanyForm>(k: K, v: CompanyForm[K]) {
    setF((p) => ({ ...p, [k]: v }));
    if (fieldErrors[k]) setFieldErrors((p) => ({ ...p, [k]: "" }));
  }

  function validateClient(): string | null {
    if (f.name.trim().length < 2) return "Company name is required.";
    if (!f.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
      return "Enter a valid company email.";
    return null;
  }

  async function submit() {
    const clientErr = validateClient();
    if (clientErr) {
      setMsg(clientErr);
      return;
    }
    setSaving(true);
    setMsg(null);
    setFieldErrors({});
    try {
      const res = await fetch("/api/me/company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (json?.fields) {
          const flat: Record<string, string> = {};
          for (const [k, arr] of Object.entries(json.fields)) {
            const v = Array.isArray(arr) ? (arr[0] as string) : String(arr);
            if (v) flat[k] = v;
          }
          setFieldErrors(flat);
        }
        throw new Error(json?.message ?? json?.error ?? "Failed");
      }
      setMsg("Submitted ✓ — under review");
      router.refresh();
    } catch (e) {
      setMsg((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6">
      <Section title="Company basics">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Company name *" value={f.name} onChange={(v) => set("name", v)} placeholder="Acme Inc." err={fieldErrors.name} />
          <Field label="Industry" value={f.industry} onChange={(v) => set("industry", v)} placeholder="Software / SaaS" select options={industries} />
          <Field label="Company size" value={f.size} onChange={(v) => set("size", v)} select options={sizes} />
          <Field label="Website" value={f.website} onChange={(v) => set("website", v)} placeholder="acme.com" err={fieldErrors.website} />
        </div>
        <div className="mt-4">
          <label className="text-sm font-medium text-slate-700">About the company</label>
          <textarea
            value={f.description}
            onChange={(e) => set("description", e.target.value)}
            rows={3}
            placeholder="Briefly describe what your company does."
            className="mt-1.5 w-full rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-brand-500"
          />
        </div>
      </Section>

      <Section title="Contact">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Company email *" value={f.email} onChange={(v) => set("email", v)} placeholder="hr@acme.com" err={fieldErrors.email} />
          <Field label="Contact person" value={f.contactName} onChange={(v) => set("contactName", v)} placeholder="Areesha Ahmed" />
          <Field label="Contact phone" value={f.contactPhone} onChange={(v) => set("contactPhone", v)} placeholder="+92 322 ..." />
          <Field label="LinkedIn page" value={f.linkedin} onChange={(v) => set("linkedin", v)} placeholder="linkedin.com/company/acme" err={fieldErrors.linkedin} />
        </div>
      </Section>

      <Section title="Legal (optional)">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Registration / Tax #" value={f.registrationNumber} onChange={(v) => set("registrationNumber", v)} placeholder="NTN-12345" />
          <Field label="Office address" value={f.address} onChange={(v) => set("address", v)} placeholder="Street, City, Country" />
        </div>
      </Section>

      {msg && (
        <p className={`text-sm ${msg.startsWith("Submitted") ? "text-emerald-600" : "text-rose-600"}`}>
          {msg}
        </p>
      )}
      <div className="flex items-center justify-end gap-3">
        <Button onClick={submit} disabled={saving}>{saving ? "Submitting..." : "Submit for review"}</Button>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</h3>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  err,
  select,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  err?: string;
  select?: boolean;
  options?: string[];
}) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      {select ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`mt-1.5 h-11 w-full rounded-lg border bg-white px-3 text-sm outline-none ${err ? "border-rose-400" : "border-slate-300"} focus:border-brand-500`}
        >
          <option value="">Select...</option>
          {options?.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`mt-1.5 h-11 w-full rounded-lg border px-3 text-sm outline-none ${err ? "border-rose-400" : "border-slate-300"} focus:border-brand-500`}
        />
      )}
      {err && <p className="mt-1 text-xs text-rose-600">{err}</p>}
    </div>
  );
}
