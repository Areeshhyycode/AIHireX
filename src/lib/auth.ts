import { auth, currentUser } from "@clerk/nextjs/server";

export type Role = "candidate" | "recruiter" | "admin";

export async function getRole(): Promise<Role | null> {
  const { sessionClaims } = auth();
  const meta = (sessionClaims?.publicMetadata ?? {}) as { role?: Role };
  return meta.role ?? null;
}

export async function getMe() {
  const user = await currentUser();
  if (!user) return null;
  const role = ((user.publicMetadata as { role?: Role })?.role) ?? null;
  const name =
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    user.username ||
    user.emailAddresses[0]?.emailAddress ||
    "You";
  return {
    id: user.id,
    name,
    email: user.emailAddresses[0]?.emailAddress ?? null,
    imageUrl: user.imageUrl ?? null,
    role,
  };
}
