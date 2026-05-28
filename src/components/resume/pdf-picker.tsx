"use client";

import { useRef, useState } from "react";
import { Upload, Loader2, FileText } from "lucide-react";

type Props = {
  onParsed: (data: { text: string; fileName: string; url?: string; pages?: number }) => void;
  disabled?: boolean;
};

export function PdfPicker({ onParsed, disabled }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  async function pick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setLoading(true);
    setName(file.name);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/resume/parse", { method: "POST", body: fd });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error ?? "parse failed");
      onParsed({ text: j.text, fileName: file.name, url: j.url, pages: j.pages });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
      if (ref.current) ref.current.value = "";
    }
  }

  return (
    <div>
      <input
        ref={ref}
        type="file"
        accept="application/pdf,.pdf"
        onChange={pick}
        disabled={disabled || loading}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => ref.current?.click()}
        disabled={disabled || loading}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        {loading ? "Parsing..." : "Upload PDF"}
      </button>
      {name && !loading && !error && (
        <span className="ml-3 inline-flex items-center gap-1 text-xs text-slate-500">
          <FileText className="h-3.5 w-3.5" />
          {name}
        </span>
      )}
      {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
    </div>
  );
}
