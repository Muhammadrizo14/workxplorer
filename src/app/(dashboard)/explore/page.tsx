import api from "@/src/_lib/api/client";
import Link from "next/link";
import {UserType} from "@/src/types/user.types";
import {getTranslations} from 'next-intl/server';


async function getProfiles(): Promise<UserType[]> {
  try {
    const res = await api.get(`/users?page=1&per_page=9`);
    return res.data.data || [];
  } catch (err) {
    console.error("Error fetching profiles:", err);
    return [];
  }
}

export default async function Page() {
  const profiles = await getProfiles();
  const t = await getTranslations('explore');

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold">{t('title')}</h1>


      {profiles.length === 0 ? (
        <p className="mt-6 text-gray-500">{t('empty')}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
          {profiles.map((profile) => (
            <Link
              href={`/profile/${profile.id}`}
              key={profile.id}
              className="rounded-2xl border p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={profile.avatar}
                alt={profile.first_name}
                className="w-24 h-24 rounded-full mx-auto"
              />
              <p className="mt-4 text-lg font-medium text-center">
                {profile.first_name} {profile.last_name}
              </p>
              <p className="text-sm text-gray-500 text-center">{profile.email}</p>
            </Link>
          ))}
        </div>
      )}

    </div>
  );
}
