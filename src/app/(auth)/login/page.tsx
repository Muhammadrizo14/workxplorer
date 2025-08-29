'use client';

import Link from "next/link";
import {Button} from "@/src/components/ui/button";
import {useForm} from "react-hook-form";
import {FormField} from "@/src/components/ui/form-field";
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import {Suspense} from "react";
import {useActionState} from 'react';
import {authenticate} from '@/src/_lib/actions';
import {useSearchParams} from 'next/navigation';
import {useTranslations} from 'use-intl';

const FormSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required()


function LoginFormInner() {
  const t = useTranslations('login');
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [errorMessage, formAction] = useActionState(
    authenticate,
    undefined,
  );
  const {
    register,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(FormSchema),
  });


  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 p-4 text-gray-900 dark:text-gray-100">
      <div
        className="bg-white dark:bg-gray-900 dark:border dark:border-gray-800 w-full max-w-4xl flex rounded-2xl shadow-lg dark:shadow-none overflow-hidden lg:h-[500px]">

        <div className="w-full p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">{t('title')}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
            {t('testCredentials')}
          </p>
          <form action={formAction} className="space-y-4">
            <FormField
              placeholder={t('emailPlaceholder')}
              variant="green"
              type="email"
              register={register("email", {required: t('validation.emailRequired')})}
              error={errors.email?.message}
            />
            <FormField
              placeholder={t('passwordPlaceholder')}
              variant="green"
              type="password"
              register={register("password", {required: t('validation.passwordRequired')})}
              error={errors.password?.message}
            />
            <input type="hidden" name="redirectTo" value={callbackUrl}/>
            <Button
              className="w-full"
              type="submit"
              variant="green"
            >
              {t('submitButton')}
            </Button>
            {errorMessage && (
              <p className="text-sm text-red-500 dark:text-red-400">{errorMessage}</p>
            )}
          </form>
        </div>

        <div
          className="hidden md:flex md:w-4/5 bg-gradient-to-br from-emerald-400 to-emerald-600 text-white p-8 flex-col justify-center items-center text-center">
          <div className="max-w-xs">
            <h2 className="text-3xl font-bold mb-4">{t('side.title')}</h2>
            <p className="mb-6 text-gray-100">{t('side.description')}</p>
            <Button
              type="button"
              variant="rounded"
              className="bg-white text-emerald-600 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Link className="inline-block px-6 py-2 w-full" href="/register">
                {t('side.cta')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>

  );
}

export default function LoginPage() {
  const tc = useTranslations('common');
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">{tc('loading')}</div>}>
      <LoginFormInner/>
    </Suspense>
  );
}