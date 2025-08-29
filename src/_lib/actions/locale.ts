'use server';

import {cookies} from "next/headers";

export async function setLocale(locale: string) {
  const store = await cookies();

  store.set('locale', locale, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
  });
}