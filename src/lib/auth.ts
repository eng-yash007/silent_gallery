import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/**
 * Get the authenticated user's ID from the session.
 * Throws an error if the user is not logged in.
 */
export async function getAuthUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Not authenticated");
  }

  return {
    id: (session as any).userId as string,
    email: session.user.email,
    name: session.user.name,
    image: session.user.image,
    accessToken: (session as any).accessToken as string | undefined,
  };
}
