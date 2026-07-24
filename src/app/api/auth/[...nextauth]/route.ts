import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "placeholder-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "placeholder-client-secret",
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/gmail.modify",
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "database",
  },
  callbacks: {
    async session({ session, user }: any) {
      // Attach userId and accessToken to the session
      if (session?.user) {
        session.userId = user.id;
      }

      // Get the latest access token from the Account table
      const account = await prisma.account.findFirst({
        where: { userId: user.id, provider: "google" },
      });

      if (account) {
        session.accessToken = account.access_token;
      }

      return session;
    },
  },
  events: {
    async createUser({ user }) {
      // Auto-create UserStat when a new user signs up
      await prisma.userStat.create({
        data: {
          userId: user.id,
        },
      });
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
