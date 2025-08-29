"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Button } from "@/src/components/ui/button";
import { setLocale } from "@/src/_lib/actions";
import { ChevronDownIcon } from "lucide-react"


const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
];

interface LanguageSwitcherClientProps {
  currentLocale: string;
}

export default function LanguageSwitcherClient({
                                                 currentLocale: initialLocale
                                               }: LanguageSwitcherClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [currentLocale, setCurrentLocale] = useState(localStorage.getItem("locale") || initialLocale);

  useEffect(() => {
    setCurrentLocale(initialLocale);
  }, [initialLocale]);

  const handleChange = (locale: string) => {
    setCurrentLocale(locale);

    // Update localStorage for client-side persistence
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("locale", locale);
      }
    } catch {
      // noop - localStorage might not be available
    }

    startTransition(async () => {
      await setLocale(locale);
      router.refresh();
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          disabled={isPending}
          className="min-w-[120px] flex items-center justify-between"
        >
          {LANGUAGES.find((l) => l.code === currentLocale)?.label || currentLocale}
          <ChevronDownIcon className="ml-2" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleChange(lang.code)}
            className={currentLocale === lang.code ? "bg-accent" : ""}
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
