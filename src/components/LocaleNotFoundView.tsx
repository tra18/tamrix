"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { dictionary as dictEn } from "@/i18n/dictionaries/en";
import { dictionary as dictFr } from "@/i18n/dictionaries/fr";
import { defaultLocale, locales, type Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/utils";

function getLocaleFromPath(pathname: string): Locale {
  const segment = pathname.split("/").filter(Boolean)[0];
  if (segment && locales.includes(segment as Locale)) {
    return segment as Locale;
  }
  return defaultLocale;
}

export function LocaleNotFoundView() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const dict = locale === "en" ? dictEn : dictFr;

  return (
    <div className="circuit-bg mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <Link
        href={localizedPath(locale, "/")}
        className="transition-opacity hover:opacity-80"
        aria-label="Tamrix"
      >
        <Image
          src="/logo.png"
          alt="Tamrix"
          width={64}
          height={64}
          className="opacity-60 animate-glow-pulse"
        />
      </Link>
      <h1 className="mt-6 text-6xl font-bold text-brand-300 animate-fade-in-up">404</h1>
      <p className="mt-4 text-xl font-semibold text-tamrix-text">{dict.notFound.title}</p>
      <p className="mt-2 text-tamrix-muted">{dict.notFound.message}</p>
      <Link href={localizedPath(locale, "/")} className="btn-primary mt-8">
        {dict.notFound.back}
      </Link>
    </div>
  );
}
