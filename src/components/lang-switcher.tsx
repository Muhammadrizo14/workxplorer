"use client";

import {useEffect, useState, useTransition} from "react";
import {useRouter} from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {Button} from "@/src/components/ui/button";
import {setLocale} from "@/src/_lib/actions/locale";

const LANGUAGES = [
  {code: "en", label: "English"},
  {code: "ru", label: "Русский"}
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [currentLocale, setCurrentLocale] = useState<string>("en");
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = typeof window !== "undefined" ? window.localStorage.getItem("locale") : null;
      if (stored) {
        setCurrentLocale(stored);
        return;
      }
      const cookieValue = typeof document !== "undefined"
        ? document.cookie
          .split(";")
          .map((c) => c.trim())
          .find((c) => c.startsWith("locale="))
        : undefined;
      const value = cookieValue ? decodeURIComponent(cookieValue.split("=")[1] || "") : "";
      if (value) setCurrentLocale(value);
    } catch {
    }
  }, []);

  const handleChange = (locale: string) => {
    setCurrentLocale(locale);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("locale", locale);
    }

    startTransition(async () => {
      await setLocale(locale);
      router.refresh();
    });
  };

  const currentLabel = LANGUAGES.find((l) => l.code === currentLocale)?.label || currentLocale;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="rounded-2xl px-4 "
          disabled={isPending}
        >
          {mounted ? currentLabel : ""}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleChange(lang.code)}
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
