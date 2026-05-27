import { ChatWindow } from "@/components/chat/chat-window";

export default function ChatPage() {
  return (
    <div className="flex h-[calc(100vh-7rem)] flex-col">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Career chat</h1>
        <p className="mt-1 text-sm text-slate-500">
          Your AI career coach — powered by Groq. Available 24/7.
        </p>
      </div>
      <ChatWindow />
    </div>
  );
}
