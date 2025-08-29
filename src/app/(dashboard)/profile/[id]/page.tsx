"use client"

import {useParams} from "next/navigation"
import {useEffect, useState} from "react"
import {Avatar, AvatarFallback, AvatarImage} from "@/src/components/ui/avatar"
import api from "@/src/_lib/api/client"
import {UserType} from "@/src/types/user.types"
import {Skeleton} from "@/src/components/ui/skeleton"
import {Button} from "@/src/components/ui/button";
import Link from "next/link";
import {useTranslations} from 'use-intl';

export default function ProfilePage() {
  const {id} = useParams<{ id: string }>()
  const [user, setUser] = useState<UserType | null>(null)
  const [loading, setLoading] = useState(true)
  const t = useTranslations('profile');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/users/${id}`)
        setUser(res.data.data)
      } catch (err) {
        console.error("Error fetching user:", err)
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchUser()
  }, [id])


  return (
    <div>
      {loading ? (
        <div className="px-4 sm:px-8 md:px-16 py-10">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
            <Skeleton className="w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 rounded-full mb-4 md:mb-6" />
            <div className="w-full md:w-auto text-center md:text-left">
              <Skeleton className="h-8 sm:h-10 w-40 sm:w-56 mb-3 sm:mb-4" />
              <Skeleton className="h-5 sm:h-6 w-60 sm:w-80" />
            </div>
          </div>
        </div>
      ) : user ? (
        <div className="px-4 sm:px-8 md:px-16 py-10">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
            <Avatar className="w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 mb-4 md:mb-6">
              <AvatarImage src={user?.avatar} alt="User Avatar" />
              <AvatarFallback className="text-2xl sm:text-3xl md:text-4xl">
                {user?.first_name?.[0]}
              </AvatarFallback>
            </Avatar>

            <div className="text-center md:text-left">
              <p className="text-sm sm:text-base text-muted-foreground">{t('label.profile')}</p>
              <h1 className="text-4xl sm:text-6xl md:text-8xl py-3 sm:py-4 md:py-6 font-bold tracking-tight">
                {user?.first_name} {user?.last_name}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-4 sm:mb-6">
                {t('email')}: {""}
                <a className="underline break-all" href={`mailto:${user?.email}`}>
                  {user?.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-4 sm:px-8 md:px-16 py-10 w-full flex flex-col items-center h-screen justify-center">
          <h1 className="text-4xl font-bold">{t('notFound.title')}</h1>
          <Button className="mt-6" asChild>
            <Link href="/explore">{t('notFound.backToExplore')}</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
