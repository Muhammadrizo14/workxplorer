import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;
      const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register'); // no allowance to home route too

      if (isAuthRoute && !isLoggedIn) return true;


      if (isAuthRoute && isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl));
      }

      return isLoggedIn;
    },
  },
  providers: [],
} satisfies NextAuthConfig;