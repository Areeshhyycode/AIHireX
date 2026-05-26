import { Mic, MicOff, Video, VideoOff, Phone } from "lucide-react";

export function InterviewStage() {
  return (
    <div className="rounded-2xl bg-slate-950 p-6 text-white">
      <div className="grid gap-4 md:grid-cols-2">
        <Tile name="AI Interviewer" subtitle="Powered by Groq" speaking />
        <Tile name="You" subtitle="Camera on" muted />
      </div>
      <div className="mt-5 flex items-center justify-center gap-3">
        <CtrlBtn icon={<Mic className="h-5 w-5" />} />
        <CtrlBtn icon={<Video className="h-5 w-5" />} />
        <CtrlBtn icon={<MicOff className="h-5 w-5" />} variant="muted" />
        <CtrlBtn icon={<VideoOff className="h-5 w-5" />} variant="muted" />
        <CtrlBtn icon={<Phone className="h-5 w-5 rotate-[135deg]" />} variant="danger" />
      </div>
    </div>
  );
}

function Tile({ name, subtitle, speaking, muted }: { name: string; subtitle: string; speaking?: boolean; muted?: boolean }) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-900">
      <div className="flex h-full items-center justify-center">
        <div className={"h-20 w-20 rounded-full bg-gradient-to-br " + (speaking ? "from-brand-500 to-violet-600" : "from-slate-600 to-slate-800")} />
      </div>
      <div className="absolute bottom-3 left-3 rounded-md bg-black/50 px-2 py-1 text-xs backdrop-blur">
        <div className="font-medium">{name}</div>
        <div className="text-white/60">{subtitle}</div>
      </div>
      {muted && (
        <div className="absolute right-3 top-3 rounded-md bg-rose-500/90 p-1.5">
          <MicOff className="h-3.5 w-3.5" />
        </div>
      )}
    </div>
  );
}

function CtrlBtn({ icon, variant = "default" }: { icon: React.ReactNode; variant?: "default" | "muted" | "danger" }) {
  const cls =
    variant === "danger"
      ? "bg-rose-500 hover:bg-rose-600"
      : variant === "muted"
        ? "bg-slate-700 hover:bg-slate-600"
        : "bg-slate-800 hover:bg-slate-700 ring-1 ring-white/10";
  return <button className={`flex h-11 w-11 items-center justify-center rounded-full ${cls}`}>{icon}</button>;
}
