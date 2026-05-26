import { Send, Paperclip } from "lucide-react";

export function ChatInput() {
  return (
    <div className="border-t border-slate-200 bg-white p-4">
      <form className="flex items-end gap-2 rounded-xl border border-slate-300 bg-white p-2 focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100">
        <button
          type="button"
          aria-label="Attach"
          className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        >
          <Paperclip className="h-5 w-5" />
        </button>
        <textarea
          rows={1}
          placeholder="Ask anything about jobs, resumes, interviews..."
          className="max-h-32 min-h-[24px] flex-1 resize-none bg-transparent px-2 py-1 text-sm placeholder:text-slate-400 outline-none"
        />
        <button
          type="submit"
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white hover:bg-brand-700"
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
