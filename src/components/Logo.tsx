import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/utils";

interface LogoProps {
  locale: Locale;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: 32,
  md: 40,
  lg: 56,
};

export function Logo({ locale, size = "md", className = "" }: LogoProps) {
  const imgSize = sizes[size];

  return (
    <Link
      href={localizedPath(locale, "/")}
      aria-label="Tamrix — Accueil"
      className={`inline-flex transition-opacity hover:opacity-80 ${className}`}
    >
      <Image
        src="/logo.png"
        alt="Tamrix"
        width={imgSize}
        height={imgSize}
        className="object-contain"
        priority
      />
    </Link>
  );
}
