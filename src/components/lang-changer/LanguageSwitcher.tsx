import { cookies } from "next/headers";
import LanguageSwitcherClient from "./LanguageSwitcherClient";

export default async function LanguageSwitcher() {
  const store = await cookies();
  const currentLocale = store.get('locale')?.value || 'en';

  return <LanguageSwitcherClient currentLocale={currentLocale} />;
}
