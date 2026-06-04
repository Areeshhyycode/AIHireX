"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export type ProfileForm = {
  name: string;
  headline: string;
  bio: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  skills: string[];
};

export function ProfileFormCard({ initial }: { initial: ProfileForm }) {
  const [form, setForm] = useState<ProfileForm>(initial);
  const [skillInput, setSkillInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  function set<K extends keyof ProfileForm>(k: K, v: ProfileForm[K]) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  function addSkill() {
    const s = skillInput.trim();
    if (!s || form.skills.includes(s)) return;
    set("skills", [...form.skills, s]);
    setSkillInput("");
  }

  async function save() {
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch("/api/me/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setMsg("Saved ✓");
    } catch (e) {
      setMsg((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" value={form.name} onChange={(v) => set("name", v)} placeholder="Areesha Ahmed" />
        <Field label="Headline" value={form.headline} onChange={(v) => set("headline", v)} placeholder="Senior Frontend Engineer" />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">Bio</label>
        <textarea
          value={form.bio}
          onChange={(e) => set("bio", e.target.value)}
          rows={4}
          placeholder="Tell recruiters about yourself..."
          className="mt-1.5 w-full rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-brand-500"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Location" value={form.location} onChange={(v) => set("location", v)} placeholder="Karachi, Pakistan" />
        <Field label="Website" value={form.website} onChange={(v) => set("website", v)} placeholder="areesha.dev" />
        <Field label="GitHub" value={form.github} onChange={(v) => set("github", v)} placeholder="areeshhyycode" />
        <Field label="LinkedIn" value={form.linkedin} onChange={(v) => set("linkedin", v)} placeholder="linkedin.com/in/..." />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">Skills</label>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {form.skills.map((s) => (
            <button
              key={s}
              onClick={() => set("skills", form.skills.filter((x) => x !== s))}
              className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700 hover:bg-rose-50 hover:text-rose-700"
            >
              {s} ×
            </button>
          ))}
        </div>
        <div className="mt-2 flex gap-2">
          <input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }}
            placeholder="Add a skill and press Enter"
            className="h-10 flex-1 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-brand-500"
          />
          <Button onClick={addSkill}>Add</Button>
        </div>
      </div>
      <div className="flex items-center justify-end gap-3">
        {msg && <span className="text-sm text-slate-600">{msg}</span>}
        <Button onClick={save} disabled={saving}>{saving ? "Saving..." : "Save profile"}</Button>
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
