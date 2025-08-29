import {getRequestConfig} from 'next-intl/server';
import {cookies} from "next/headers";

export default getRequestConfig(async () => {
  const store = await cookies();
  const locale:string = store.get('locale')?.value || 'en';

  return {
    locale,
    messages: (await import(`@/src/locales/${locale}/common.json`)).default
  };
});