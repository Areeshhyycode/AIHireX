import { redirect } from "next/navigation";
import { getRole, type Role } from "@/lib/auth";

const dashFor: Record<Role, string> = {
  candidate: "/candidate",
  recruiter: "/recruiter",
  admin: "/admin",
};

export async function requireRole(expected: Role) {
  const role = await getRole();
  if (!role) redirect("/onboarding/role");
  if (role !== expected) redirect(dashFor[role]);
  return role;
}
