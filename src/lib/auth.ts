import { auth, currentUser } from "@clerk/nextjs/server";

export type Role = "candidate" | "recruiter" | "admin";

export async function getRole(): Promise<Role | null> {
  const { sessionClaims, userId } = auth();
  if (!userId) return null;
  const meta = (sessionClaims?.publicMetadata ?? {}) as { role?: Role };
  if (meta.role) return meta.role;
  // sessionClaims is cached in JWT — fall back to fresh user fetch (e.g. right after role-set)
  const user = await currentUser();
  return ((user?.publicMetadata as { role?: Role })?.role) ?? null;
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
