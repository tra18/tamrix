import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { localizedPath } from "@/i18n/utils";
import { Logo } from "./Logo";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export function Footer({ locale, dict }: FooterProps) {
  return (
    <footer className="relative border-t border-tamrix-border bg-tamrix-surface">
      <div className="absolute inset-0 bg-hero-glow opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Logo locale={locale} size="md" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-tamrix-muted">
              {dict.footer.tagline}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-10">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-300">
                {dict.footer.product}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-tamrix-muted">
                <li>
                  <Link
                    href={localizedPath(locale, "/configurateur")}
                    className="transition hover:text-brand-300"
                  >
                    {dict.nav.configurateur}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localizedPath(locale, "/catalogue")}
                    className="transition hover:text-brand-300"
                  >
                    {dict.nav.catalogue}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`${localizedPath(locale, "/")}#processus`}
                    className="transition hover:text-brand-300"
                  >
                    {dict.nav.process}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-300">
                {dict.footer.support}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-tamrix-muted">
                <li>
                  <a
                    href="mailto:contact@tmrix.com"
                    className="transition hover:text-brand-300"
                  >
                    contact@tmrix.com
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-300">
                {dict.footer.legal}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-tamrix-muted">
                <li>
                  <Link
                    href={localizedPath(locale, "/a-propos")}
                    className="transition hover:text-brand-300"
                  >
                    {dict.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localizedPath(locale, "/mentions-legales")}
                    className="transition hover:text-brand-300"
                  >
                    {dict.footer.legalNotice}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localizedPath(locale, "/politique-confidentialite")}
                    className="transition hover:text-brand-300"
                  >
                    {dict.footer.privacy}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-tamrix-border pt-6 text-center text-xs text-tamrix-muted">
          © {new Date().getFullYear()} Tamrix. {dict.footer.rights}
        </div>
      </div>
    </footer>
  );
}
