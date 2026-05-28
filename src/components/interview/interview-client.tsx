"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Volume2 } from "lucide-react";

type Turn = { q: string; a: string };

export function InterviewClient({ role = "Senior Frontend Engineer" }: { role?: string }) {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    askNext([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" });
  }, [turns, question]);

  async function askNext(history: Turn[]) {
    setLoading(true);
    const res = await fetch("/api/ai/interview/next", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, history }),
    });
    setLoading(false);
    if (res.ok) {
      const data = await res.json();
      setQuestion(data.question as string);
    } else {
      setQuestion("Tell me about a recent project you're proud of.");
    }
  }

  async function submit() {
    const a = answer.trim();
    if (!a || !question) return;
    const next = [...turns, { q: question, a }];
    setTurns(next);
    setAnswer("");
    setQuestion("");
    audioRef.current?.pause();
    await askNext(next);
  }

  async function playQuestion() {
    if (!question || playing) return;
    setPlaying(true);
    try {
      const res = await fetch("/api/ai/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: question }),
      });
      if (!res.ok) throw new Error(await res.text());
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => {
        setPlaying(false);
        URL.revokeObjectURL(url);
      };
      audio.onerror = () => setPlaying(false);
      await audio.play();
    } catch {
      setPlaying(false);
    }
  }

  return (
    <div className="flex h-[calc(100vh-12rem)] flex-col rounded-2xl border border-slate-200 bg-white">
      <div ref={ref} className="flex-1 space-y-4 overflow-y-auto p-5">
        {turns.map((t, i) => (
          <div key={i} className="space-y-2">
            <div className="rounded-2xl bg-slate-100 px-4 py-2.5 text-sm">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Q{i + 1}</p>
              {t.q}
            </div>
            <div className="ml-8 rounded-2xl bg-brand-600 px-4 py-2.5 text-sm text-white">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/70">Your answer</p>
              {t.a}
            </div>
          </div>
        ))}
        {question && (
          <div className="rounded-2xl bg-slate-100 px-4 py-2.5 text-sm">
            <div className="mb-1 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Q{turns.length + 1}</p>
              <button
                onClick={playQuestion}
                disabled={playing}
                className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium text-brand-700 hover:bg-white disabled:opacity-50"
              >
                <Volume2 className="h-3.5 w-3.5" />
                {playing ? "Playing..." : "Listen"}
              </button>
            </div>
            {question}
          </div>
        )}
        {loading && (
          <p className="text-center text-xs text-slate-500">AI is thinking of the next question...</p>
        )}
      </div>
      <div className="border-t border-slate-200 p-4">
        <div className="flex items-end gap-2 rounded-xl border border-slate-300 p-2 focus-within:border-brand-400">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) submit(); }}
            rows={2}
            disabled={!question || loading}
            placeholder="Type your answer (Ctrl/Cmd + Enter to send)..."
            className="max-h-40 min-h-[40px] flex-1 resize-none bg-transparent px-2 py-1 text-sm outline-none"
          />
          <button
            onClick={submit}
            disabled={!answer.trim() || !question || loading}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
