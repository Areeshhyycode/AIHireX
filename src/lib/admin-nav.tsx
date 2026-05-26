import {
  LayoutDashboard,
  ShieldCheck,
  Briefcase,
  Users,
  Flag,
  BarChart3,
  Settings,
} from "lucide-react";
import type { SidebarLink } from "@/components/dashboard/sidebar-item";

export const adminNav: SidebarLink[] = [
  { href: "/admin", label: "Overview", icon: <LayoutDashboard className="h-5 w-5" /> },
  { href: "/admin/verifications", label: "Verifications", icon: <ShieldCheck className="h-5 w-5" />, badge: "12" },
  { href: "/admin/jobs", label: "Job posts", icon: <Briefcase className="h-5 w-5" /> },
  { href: "/admin/users", label: "Users", icon: <Users className="h-5 w-5" /> },
  { href: "/admin/reports", label: "Reports", icon: <Flag className="h-5 w-5" />, badge: "5" },
  { href: "/admin/insights", label: "Insights", icon: <BarChart3 className="h-5 w-5" /> },
  { href: "/admin/settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
];
