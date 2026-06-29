"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { localizedPath, stripLocale } from "@/i18n/utils";

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

export function Header({ locale, dict }: HeaderProps) {
  const pathname = usePathname();
  const pathWithoutLocale = stripLocale(pathname);
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: localizedPath(locale, "/"), path: "/", label: dict.nav.home },
    {
      href: localizedPath(locale, "/catalogue"),
      path: "/catalogue",
      label: dict.nav.catalogue,
    },
    {
      href: localizedPath(locale, "/configurateur"),
      path: "/configurateur",
      label: dict.nav.configurateur,
    },
    {
      href: localizedPath(locale, "/a-propos"),
      path: "/a-propos",
      label: dict.nav.about,
    },
    {
      href: `${localizedPath(locale, "/")}#processus`,
      path: "/",
      label: dict.nav.process,
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-tamrix-border/80 bg-tamrix-bg/85 backdrop-blur-xl animate-fade-in">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Logo locale={locale} size="sm" className="relative z-10" />

        <nav className="hidden items-center gap-4 lg:flex xl:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition ${
                pathWithoutLocale === link.path
                  ? "text-brand-300"
                  : "text-tamrix-muted hover:text-brand-300"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher locale={locale} />
          <Link href={localizedPath(locale, "/configurateur")} className="btn-secondary hidden sm:inline-flex">
            {dict.nav.configurateur}
          </Link>
          <Link href={localizedPath(locale, "/catalogue")} className="btn-primary">
            {dict.nav.order}
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher locale={locale} />
          <button
            type="button"
            className="rounded-lg p-2 text-tamrix-muted hover:text-brand-300"
            onClick={() => setOpen(!open)}
            aria-label={dict.nav.menu}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-tamrix-border bg-tamrix-surface px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-tamrix-muted hover:bg-tamrix-elevated hover:text-brand-300"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={localizedPath(locale, "/configurateur")}
              className="btn-secondary mt-2 text-center"
              onClick={() => setOpen(false)}
            >
              {dict.nav.configurateur}
            </Link>
            <Link
              href={localizedPath(locale, "/catalogue")}
              className="btn-primary mt-2 text-center"
              onClick={() => setOpen(false)}
            >
              {dict.nav.order}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
