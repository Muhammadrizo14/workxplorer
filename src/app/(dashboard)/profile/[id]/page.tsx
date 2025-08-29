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
        <div className="p-16">
          <div className="flex items-end gap-5">
            <Skeleton className="w-80 h-80 rounded-full mb-6" />
            <div>
              <Skeleton className="h-10 w-40 mb-4" />
              <Skeleton className="h-6 w-60" />
            </div>
          </div>
        </div>
      ) : user ? (
        <div className="p-16">
          <div className="flex items-end gap-5">
            <Avatar className="w-80 h-80 mb-6">
              <AvatarImage src={user?.avatar} alt="User Avatar" />
              <AvatarFallback className="text-4xl">
                {user?.first_name?.[0]}
              </AvatarFallback>
            </Avatar>

            <div>
              <p>{t('label.profile')}</p>
              <h1 className="text-8xl py-6 font-bold tracking-tight">
                {user?.first_name} {user?.last_name}
              </h1>
              <p className="text-2lg text-muted-foreground mb-6">
                {t('email')}:{" "}
                <a className="underline" href={`mailto:${user?.email}`}>
                  {user?.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-16 w-full flex flex-col items-center h-screen justify-center">
          <h1 className="text-4xl font-bold">{t('notFound.title')}</h1>
          <Button className="mt-6" asChild>
            <Link href="/explore">{t('notFound.backToExplore')}</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
