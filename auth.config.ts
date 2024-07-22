import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnHome = nextUrl.pathname.startsWith("/home");
      if (isOnHome) {
        return isLoggedIn;
      }
      return true;
    },
    async jwt({ token, user }) {
        if (user) {
            token.id = user.id;
            token.email = user.email
        }
        return token
    },
    async session({ session, token }) {
        session.user.id = token.id as string;
        return session;
    }
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
