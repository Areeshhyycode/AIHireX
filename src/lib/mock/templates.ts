import type { Template } from "@/components/resume/template-card";

export const mockTemplates: Template[] = [
  { id: "modern", name: "Modern", tagline: "Clean sans-serif, two-column", accent: "bg-gradient-to-br from-brand-500 to-violet-600" },
  { id: "minimal", name: "Minimal", tagline: "Lots of whitespace, ATS-safe", accent: "bg-slate-900" },
  { id: "classic", name: "Classic", tagline: "Serif, single-column", accent: "bg-gradient-to-br from-amber-500 to-rose-500" },
  { id: "tech", name: "Tech", tagline: "Mono accents, code blocks", accent: "bg-gradient-to-br from-emerald-500 to-teal-600", isPro: true },
  { id: "creative", name: "Creative", tagline: "Bold colors, designer feel", accent: "bg-gradient-to-br from-pink-500 to-orange-500", isPro: true },
  { id: "executive", name: "Executive", tagline: "Authoritative, leadership", accent: "bg-gradient-to-br from-slate-700 to-slate-900", isPro: true },
];
