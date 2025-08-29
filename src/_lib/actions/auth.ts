'use server'

import { signOut } from "@/src/auth";
import {signIn} from '@/src/auth';
import {AuthError} from 'next-auth';

export async function logoutAction() {
  await signOut({ redirectTo: '/login' });
}

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





