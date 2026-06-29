"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { localizedPath } from "@/i18n/utils";

const STORAGE_KEY = "tamrix-cookie-consent";

interface CookieConsentProps {
  locale: Locale;
  dict: Dictionary;
}

export function CookieConsent({ locale, dict }: CookieConsentProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) !== "accepted") {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-[60] border-t border-tamrix-border bg-tamrix-surface/95 p-4 shadow-glow-lg backdrop-blur-xl animate-fade-in-up sm:p-5"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-tamrix-muted">
          {dict.cookies.message}{" "}
          <Link
            href={localizedPath(locale, "/politique-confidentialite")}
            className="text-brand-300 underline-offset-2 hover:underline"
          >
            {dict.cookies.learnMore}
          </Link>
        </p>
        <button type="button" onClick={accept} className="btn-primary shrink-0 px-6 py-2.5">
          {dict.cookies.accept}
        </button>
      </div>
    </div>
  );
}
