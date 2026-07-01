"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { switchLocalePath } from "@/i18n/utils";

interface LanguageSwitcherProps {
  locale: Locale;
}

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname();

  return (
    <div
      role="group"
      aria-label="Langue / Language"
      className="inline-flex gap-0.5 rounded-full border border-tamrix-border/90 bg-tamrix-elevated/90 p-1 shadow-[inset_0_1px_0_rgba(112,209,255,0.06)] backdrop-blur-sm"
    >
      {locales.map((loc) => {
        const active = locale === loc;
        return (
          <Link
            key={loc}
            href={switchLocalePath(pathname, loc)}
            aria-current={active ? "page" : undefined}
            aria-label={localeNames[loc]}
            title={localeNames[loc]}
            className={`relative flex min-h-[2rem] min-w-[2.75rem] items-center justify-center rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300 sm:min-h-[2.125rem] sm:min-w-[3rem] sm:px-4 sm:text-xs ${
              active
                ? "bg-brand-300 text-tamrix-bg shadow-glow"
                : "text-tamrix-muted hover:bg-tamrix-surface/80 hover:text-brand-300"
            }`}
          >
            {loc}
          </Link>
        );
      })}
    </div>
  );
}
