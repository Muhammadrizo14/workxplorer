'use server';

import {cookies} from "next/headers";

import {signIn} from '@/src/auth';
import {AuthError} from 'next-auth';


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}





export async function setLocale(locale: string) {
  const store = await cookies();

  // Set cookie with appropriate options
  store.set('locale', locale, {
    httpOnly: false, // Allow client-side access if needed
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });
}