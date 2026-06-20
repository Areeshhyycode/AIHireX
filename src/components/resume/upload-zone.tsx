"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Upload, Loader2, Check } from "lucide-react";

export function UploadZone() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/resume/parse", { method: "POST", body: fd });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error ?? "Upload failed");
      setDone(true);
      // Pass parsed text via URL? Too big. Just route to analyzer.
      router.push("/candidate/resume/analyzer");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-10 text-center transition hover:border-brand-400 hover:bg-brand-50/40">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-100">
        {done ? (
          <Check className="h-6 w-6 text-emerald-600" />
        ) : (
          <Upload className="h-6 w-6 text-brand-600" />
        )}
      </div>
      <h3 className="mt-4 text-base font-semibold text-slate-900">
        Drop your resume here
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        PDF · up to 5MB · we never share it
      </p>
      <input
        id="resume-hub-file"
        type="file"
        accept="application/pdf,.pdf"
        onChange={onFile}
        disabled={uploading}
        className="hidden"
      />
      <label
        htmlFor="resume-hub-file"
        className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        {uploading ? "Uploading..." : "Choose file"}
      </label>
      {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}
    </div>
  );
}
