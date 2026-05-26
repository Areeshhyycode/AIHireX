import {
  FileSearch,
  Sparkles,
  ShieldX,
  Wand2,
  FileText,
  Mic,
  Brain,
  Gauge,
  ShieldAlert,
  MessageCircle,
  Mail,
  Coins,
} from "lucide-react";

export type Feature = {
  icon: typeof FileSearch;
  title: string;
  desc: string;
};

export const features: Feature[] = [
  { icon: FileSearch, title: "AI Resume Analyzer", desc: "ATS score, missing skills, grammar & gap detection." },
  { icon: Sparkles, title: "Smart Job Recommendations", desc: "Personalized matches based on skills and history." },
  { icon: ShieldX, title: "Auto-Rejection", desc: "Filter unqualified or spam applications automatically." },
  { icon: Wand2, title: "Resume Enhancement", desc: "One-click rewrite with strong action verbs." },
  { icon: FileText, title: "AI Resume Builder", desc: "Generate PDF resumes from a few inputs." },
  { icon: Mic, title: "AI Mock Interview", desc: "Tech, HR and behavioral question practice." },
  { icon: Brain, title: "Skill Gap Detection", desc: "See exactly what to learn for your target role." },
  { icon: Gauge, title: "AI Hiring Score", desc: "Match %, comms score and resume quality at a glance." },
  { icon: ShieldAlert, title: "Fake Resume Detection", desc: "Catch copied, AI-generated or stuffed resumes." },
  { icon: MessageCircle, title: "Career Assistant Chatbot", desc: "Ask anything — jobs, resumes, interview prep." },
  { icon: Mail, title: "AI Email Generator", desc: "Interview, rejection, offer & follow-up emails." },
  { icon: Coins, title: "Salary Prediction", desc: "Realistic salary ranges based on market signals." },
];
