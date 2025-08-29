"use client"

import {Avatar, AvatarFallback, AvatarImage} from "@/src/components/ui/avatar"
import {useUser} from "@/src/components/user-context";
import {useTranslations} from 'use-intl';

export default function ProfilePage() {
  const data = useUser();
  const t = useTranslations('profile');

  return data && (
    <div className="px-4 sm:px-8 md:px-16 py-10">
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
        <Avatar className="w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 mb-4 md:mb-6">
          <AvatarImage src={data?.avatar} alt="User Avatar"/>
          <AvatarFallback className="text-2xl sm:text-3xl md:text-4xl">
            {data?.first_name}
          </AvatarFallback>
        </Avatar>

        <div className="text-center md:text-left">
          <p className="text-sm sm:text-base text-muted-foreground">{t('label.profile')}</p>
          <h1 className="text-4xl sm:text-6xl md:text-8xl py-3 sm:py-4 md:py-6 font-bold tracking-tight">
            {data.first_name} {data.last_name}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-4 sm:mb-6">
            {t('email')}:
            <a className="underline break-all" href={`mailto:${data.email}`}>
              {data.email}
            </a>
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mt-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight">
          {t('additional.title')}
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground pb-2">
          {t('additional.subtitle')}
        </p>
        <hr/>
        <p className="pt-2 text-sm sm:text-base">{t('additional.empty')}</p>
      </div>
    </div>
  )
}
