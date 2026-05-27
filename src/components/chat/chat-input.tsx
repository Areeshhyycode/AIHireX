"use client";

import { useState } from "react";
import { Send, Paperclip } from "lucide-react";

type Props = {
  onSend?: (text: string) => void;
  disabled?: boolean;
};

export function ChatInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const text = value.trim();
    if (!text || disabled) return;
    onSend?.(text);
    setValue("");
  }

  return (
    <div className="border-t border-slate-200 bg-white p-4">
      <form
        onSubmit={submit}
        className="flex items-end gap-2 rounded-xl border border-slate-300 bg-white p-2 focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100"
      >
        <button
          type="button"
          aria-label="Attach"
          className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        >
          <Paperclip className="h-5 w-5" />
        </button>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) submit(e);
          }}
          rows={1}
          disabled={disabled}
          placeholder="Ask anything about jobs, resumes, interviews..."
          className="max-h-32 min-h-[24px] flex-1 resize-none bg-transparent px-2 py-1 text-sm placeholder:text-slate-400 outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
      <p className="mt-2 text-center text-xs text-slate-400">
        AI may be inaccurate. Verify important answers.
      </p>
    </div>
  );
}
