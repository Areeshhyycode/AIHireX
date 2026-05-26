import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Sparkles,
  Mic,
  MessageSquare,
  BarChart3,
  User,
  Settings,
} from "lucide-react";
import type { SidebarLink } from "@/components/dashboard/sidebar-item";

export const candidateNav: SidebarLink[] = [
  { href: "/candidate", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
  { href: "/candidate/jobs", label: "Browse Jobs", icon: <Briefcase className="h-5 w-5" /> },
  { href: "/candidate/applications", label: "Applications", icon: <FileText className="h-5 w-5" />, badge: "3" },
  { href: "/candidate/resume", label: "Resume Tools", icon: <Sparkles className="h-5 w-5" /> },
  { href: "/candidate/interview", label: "Mock Interview", icon: <Mic className="h-5 w-5" /> },
  { href: "/candidate/chat", label: "Career Chat", icon: <MessageSquare className="h-5 w-5" /> },
  { href: "/candidate/insights", label: "Insights", icon: <BarChart3 className="h-5 w-5" /> },
  { href: "/candidate/profile", label: "Profile", icon: <User className="h-5 w-5" /> },
  { href: "/candidate/settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
];
