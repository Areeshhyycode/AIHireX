import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

export type Msg = {
  role: "user" | "assistant";
  text: string;
  time?: string;
};

export function ChatMessage({ msg }: { msg: Msg }) {
  const isAi = msg.role === "assistant";
  return (
    <div className={cn("flex gap-3", !isAi && "flex-row-reverse")}>
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
          isAi
            ? "bg-gradient-to-br from-brand-500 to-violet-600 text-white"
            : "bg-slate-200 text-slate-700",
        )}
      >
        {isAi ? <Sparkles className="h-4 w-4" /> : "A"}
      </div>
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isAi
            ? "bg-slate-100 text-slate-800"
            : "bg-brand-600 text-white",
        )}
      >
        <p className="whitespace-pre-wrap">{msg.text}</p>
        {msg.time && (
          <p className={cn("mt-1 text-[10px]", isAi ? "text-slate-400" : "text-white/70")}>
            {msg.time}
          </p>
        )}
      </div>
    </div>
  );
}
