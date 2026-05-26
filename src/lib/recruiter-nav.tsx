import {
  LayoutDashboard,
  Briefcase,
  Users,
  CalendarCheck,
  BarChart3,
  Building2,
  Settings,
  ShieldCheck,
} from "lucide-react";
import type { SidebarLink } from "@/components/dashboard/sidebar-item";

export const recruiterNav: SidebarLink[] = [
  { href: "/recruiter", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
  { href: "/recruiter/jobs", label: "Job Posts", icon: <Briefcase className="h-5 w-5" />, badge: "8" },
  { href: "/recruiter/applicants", label: "Applicants", icon: <Users className="h-5 w-5" />, badge: "23" },
  { href: "/recruiter/interviews", label: "Interviews", icon: <CalendarCheck className="h-5 w-5" /> },
  { href: "/recruiter/analytics", label: "Analytics", icon: <BarChart3 className="h-5 w-5" /> },
  { href: "/recruiter/company", label: "Company", icon: <Building2 className="h-5 w-5" /> },
  { href: "/recruiter/verification", label: "Verification", icon: <ShieldCheck className="h-5 w-5" /> },
  { href: "/recruiter/settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
];
