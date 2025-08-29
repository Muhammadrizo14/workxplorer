"use client";

import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { FormField } from "@/src/components/ui/form-field";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/src/_lib/api/client";
import { useTranslations } from "use-intl";
import { toast } from "sonner"

export type RegisterFormType = InferType<ReturnType<typeof createSchema>>;

function createSchema(t: ReturnType<typeof useTranslations>) {
  return yup.object({
    email: yup
      .string()
      .email(t("register.validation.emailRequired"))
      .required(t("register.validation.emailRequired")),
    password: yup
      .string()
      .min(6, t("register.validation.passwordMinLength"))
      .required(
        t("register.validation.emailRequired").replace(
          "Email",
          t("common.password")
        )
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], t("register.validation.passwordsNotMatch"))
      .required(t("register.confirmPassword")),
  });
}

export default function RegisterPage() {
  const t = useTranslations();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createSchema(t)),
  });

  const onSubmit = async (data: RegisterFormType) => {
    const { confirmPassword, ...rest } = data;

    setIsLoading(true);

    try {
      await api.post(`/register`, rest, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Успешно", {
        description: "Вы успешно зарегистрировались",
      });
      router.push("/login");
    } catch (error) {
      toast.error("Ошибка", {
        description: "Ошибка при регистрации, попробуйте позже",
      });
      throw new Error("Register failed" + error);
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 p-4 text-gray-900 dark:text-gray-100">
      <div className="bg-white dark:bg-gray-900 dark:border dark:border-gray-800 w-full max-w-4xl flex rounded-2xl shadow-lg dark:shadow-none overflow-hidden lg:h-[500px]">

        <div
          style={{ background: "linear-gradient(170deg, #3b82f6, #2563eb)" }}
          className="hidden md:flex md:w-4/5 text-white p-8 flex-col justify-center items-center text-center"
        >
          <div className="max-w-xs">
            <h2 className="text-3xl font-bold mb-4">
              {t("register.side.title")}
            </h2>
            <p className="mb-6">{t("register.side.description")}</p>
            <Button
              type="button"
              variant="rounded"
              className="inline-block bg-white text-blue-600 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Link className="inline-block px-6 py-2 w-full" href="/login">
                {t("register.side.cta")}
              </Link>
            </Button>
          </div>
        </div>

        <div className="w-full p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
            {t("register.title")}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              placeholder={t("common.email")}
              variant="blue"
              type="email"
              register={register("email")}
              error={errors.email?.message}
              aria-invalid={errors.email ? "true" : "false"}
            />

            <FormField
              placeholder={t("common.password")}
              variant="blue"
              type="password"
              register={register("password")}
              error={errors.password?.message}
            />

            <FormField
              placeholder={t("register.confirmPassword")}
              variant="blue"
              type="password"
              register={register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />

            <Button
              className="w-full"
              type="submit"
              variant="blue"
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className='flex items-center gap-2'>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                  </svg>
                  <span>{t("common.loading")}</span>
                </div>
              ) : (
                t("register.submitButton")
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}