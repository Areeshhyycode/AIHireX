"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export type CompanyForm = {
  name: string;
  domain: string;
  email: string;
  website: string;
  linkedin: string;
  registrationNumber: string;
  address: string;
};

export function VerificationForm({ initial }: { initial: Partial<CompanyForm> }) {
  const [f, setF] = useState<CompanyForm>({
    name: initial.name ?? "",
    domain: initial.domain ?? "",
    email: initial.email ?? "",
    website: initial.website ?? "",
    linkedin: initial.linkedin ?? "",
    registrationNumber: initial.registrationNumber ?? "",
    address: initial.address ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  function set<K extends keyof CompanyForm>(k: K, v: CompanyForm[K]) {
    setF((p) => ({ ...p, [k]: v }));
  }

  async function submit() {
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch("/api/me/company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Failed");
      setMsg("Submitted ✓ — under review");
    } catch (e) {
      setMsg((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
      <Field label="Company name *" value={f.name} onChange={(v) => set("name", v)} placeholder="Acme Inc." />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Company domain" value={f.domain} onChange={(v) => set("domain", v)} placeholder="acme.com" />
        <Field label="Official email *" value={f.email} onChange={(v) => set("email", v)} placeholder="hr@acme.com" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Website" value={f.website} onChange={(v) => set("website", v)} placeholder="https://acme.com" />
        <Field label="LinkedIn page" value={f.linkedin} onChange={(v) => set("linkedin", v)} placeholder="https://linkedin.com/company/acme" />
      </div>
      <Field label="Business registration #" value={f.registrationNumber} onChange={(v) => set("registrationNumber", v)} placeholder="ABC-12345" />
      <Field label="Office address" value={f.address} onChange={(v) => set("address", v)} placeholder="Street, City, Country" />
      <div className="flex items-center justify-end gap-3">
        {msg && <span className="text-sm text-slate-600">{msg}</span>}
        <Button onClick={submit} disabled={saving}>{saving ? "Submitting..." : "Submit for review"}</Button>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-brand-500"
      />
    </div>
  );
}
