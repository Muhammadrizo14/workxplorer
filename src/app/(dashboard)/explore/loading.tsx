import {getTranslations} from 'next-intl/server';

export default async function Loading() {
  const t = await getTranslations('explore');
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold">{t('title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border p-4 shadow animate-pulse"
          >
            <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto" />
            <div className="mt-4 h-4 w-32 bg-gray-300 rounded mx-auto" />
            <div className="mt-2 h-3 w-24 bg-gray-200 rounded mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
