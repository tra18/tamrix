"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Globe } from "lucide-react";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { switchLocalePath } from "@/i18n/utils";

interface LanguageSwitcherProps {
  locale: Locale;
}

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 rounded-lg border border-tamrix-border bg-tamrix-elevated p-0.5">
      <Globe className="ml-2 hidden h-3.5 w-3.5 text-tamrix-muted sm:block" />
      {locales.map((loc) => (
        <Link
          key={loc}
          href={switchLocalePath(pathname, loc)}
          className={`rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wide transition ${
            locale === loc
              ? "bg-brand-300 text-tamrix-bg"
              : "text-tamrix-muted hover:text-brand-300"
          }`}
          aria-label={localeNames[loc]}
        >
          {loc}
        </Link>
      ))}
    </div>
  );
}
