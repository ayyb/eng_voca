import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import type { User } from '@/app/lib/definitions';
import { sql } from '@vercel/postgres';

async function getUser(email: string): Promise<User | undefined> {
    try {
      const user = await sql<User>`SELECT * FROM members WHERE id=${email}`;
      return user.rows[0];
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
    }
  }

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        credentials: {
          email: {},
          password: {},
        },
        authorize: async (credentials) => {
          let user = null
   
          // logic to verify if user exists
          user = await getUser('test')
   
          if (!user) {
            // No user found, so this is their first attempt to login
            // meaning this is also the place you could do registration
            throw new Error("User not found.")
          }
   
          // return user object with the their profile data
          return user
        },
      }),
  ],
})