import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import api from "@/src/_lib/serverApiClient";
import {UserType} from "@/src/types/user.types";

export async function getUser(): Promise<UserType | null> {
  try {
    const user = await api.get(`/users/4`, { timeout: 3000 });
    return user.data.data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      authorize: async (credentials) => {
        try {
          const email = typeof credentials?.get === 'function'
            ? (credentials.get('email') as string | null)
            : ((credentials as Record<string, unknown>)?.email as string | undefined) ?? null;
          const password = typeof credentials?.get === 'function'
            ? (credentials.get('password') as string | null)
            : ((credentials as Record<string, unknown>)?.password as string | undefined) ?? null;

          if (!email || !password) {
            return null;
          }

          await api.post('/login', { email, password });

          const userProfile = await getUser();
          if (!userProfile) return null;

          return {
            id: String(userProfile.id),
            name: `${userProfile.first_name} ${userProfile.last_name}`.trim(),
            email: userProfile.email,
            image: userProfile.avatar,
          };
        } catch (error) {
          console.error('Authorize error:', error);
          return null;
        }
      },
    }),
  ],
});