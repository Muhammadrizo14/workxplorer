'use client'

import {useUser} from "@/src/components/user-context";
import {useTranslations} from "use-intl";

export default function Home() {
  const data = useUser();
  const t = useTranslations('common');

  return (
    <div className="p-6">
      <div className="flex items-center gap-5">
        <h1 className="text-5xl">
          {t('welcome')} {data?.first_name}!
        </h1>
      </div>
    </div>
  );
}
