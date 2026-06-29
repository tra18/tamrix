import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/utils";

interface LogoProps {
  locale: Locale;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const sizes = {
  sm: { img: 32, text: "text-base" },
  md: { img: 40, text: "text-lg" },
  lg: { img: 56, text: "text-2xl" },
};

export function Logo({
  locale,
  size = "md",
  showText = true,
  className = "",
}: LogoProps) {
  const s = sizes[size];

  return (
    <Link
      href={localizedPath(locale, "/")}
      aria-label="Tamrix — Accueil"
      className={`flex items-center gap-3 transition-opacity hover:opacity-80 ${className}`}
    >
      <Image
        src="/logo.png"
        alt="Tamrix"
        width={s.img}
        height={s.img}
        className="object-contain"
        priority
      />
      {showText && (
        <span
          className={`font-bold uppercase tracking-[0.2em] text-brand-300 ${s.text}`}
        >
          Tamrix
        </span>
      )}
    </Link>
  );
}
