"use client";

import { useEffect, useRef, useState } from "react";
import { ChatMessage, type Msg } from "@/components/chat/chat-message";
import { ChatInput } from "@/components/chat/chat-input";
import { SuggestedPrompts } from "@/components/chat/suggested-prompts";

const INTRO: Msg = {
  role: "assistant",
  text: "Hey! I'm your AI career coach. Ask me about resumes, jobs, salary, or interview prep.",
};

export function ChatWindow() {
  const [messages, setMessages] = useState<Msg[]>([INTRO]);
  const [pending, setPending] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  async function send(text: string) {
    const next: Msg[] = [...messages, { role: "user", text }];
    setMessages(next);
    setPending(true);
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next
            .filter((m) => m.role === "user" || m !== INTRO)
            .map((m) => ({ role: m.role, content: m.text })),
        }),
      });
      const data = await res.json();
      const reply = res.ok ? (data.reply as string) : "Sorry, that failed. Try again.";
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", text: "Network error. Try again." }]);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mt-4 flex min-h-0 flex-1 flex-col rounded-2xl border border-slate-200 bg-white">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6">
        <div className="space-y-5">
          {messages.map((m, i) => (
            <ChatMessage key={i} msg={m} />
          ))}
          {pending && <ChatMessage msg={{ role: "assistant", text: "Thinking..." }} />}
        </div>
        {messages.length === 1 && (
          <div className="mt-6">
            <SuggestedPrompts onPick={send} />
          </div>
        )}
      </div>
      <ChatInput onSend={send} disabled={pending} />
    </div>
  );
}
