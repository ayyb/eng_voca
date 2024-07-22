import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import type { User } from '@/app/lib/definitions';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { authConfig } from './auth.config';
import { Session } from "inspector";

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
    ...authConfig,
  providers: [
    Credentials({
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        credentials: {
          id: {},
          pw: {},
        },
        authorize: async (credentials) => {
            console.log(credentials)
          let user = null
          const parsedCredentials = z
          .object({ id: z.string(), pw: z.string().min(4) })
          .safeParse(credentials);
          // logic to verify if user exists
          console.log(parsedCredentials)
          if (parsedCredentials.success) {
            const { id, pw } = parsedCredentials.data;
            const user = await getUser(id);
            console.log('user',user)
            if (!user) return null;
            // const passwordsMatch = await bcrypt.compare(password, user.password);
            return {
              ...user,
              customAttribute: 'customValue'
            }
            
          }   
          return null;
        },
      }),
  ],
})