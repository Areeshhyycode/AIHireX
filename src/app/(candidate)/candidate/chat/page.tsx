import { ChatMessage } from "@/components/chat/chat-message";
import { ChatInput } from "@/components/chat/chat-input";
import { SuggestedPrompts } from "@/components/chat/suggested-prompts";
import { mockChat } from "@/lib/mock/chat";

export default function ChatPage() {
  return (
    <div className="flex h-[calc(100vh-7rem)] flex-col">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Career chat</h1>
        <p className="mt-1 text-sm text-slate-500">
          Your AI career coach — trained on AIHireX data, available 24/7.
        </p>
      </div>
      <div className="mt-4 flex min-h-0 flex-1 flex-col rounded-2xl border border-slate-200 bg-white">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-5">
            {mockChat.map((m, i) => (
              <ChatMessage key={i} msg={m} />
            ))}
          </div>
          <div className="mt-6">
            <SuggestedPrompts />
          </div>
        </div>
        <ChatInput />
      </div>
    </div>
  );
}
