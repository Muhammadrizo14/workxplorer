"use client"

import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import {useTranslations} from 'use-intl';

export default function NotFound() {
  const t = useTranslations('notFound');
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-background p-8 shadow-sm">
        <h2 className="text-2xl font-bold tracking-tight">{t('title')}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {t('description')}
        </p>
        <div className="mt-6">
          <Button asChild className="w-full">
            <Link href="/">{t('cta')}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
