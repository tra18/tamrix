import Image from "next/image";
import Link from "next/link";
import { defaultLocale } from "@/i18n/config";
import { localizedPath } from "@/i18n/utils";
import "../globals.css";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-tamrix-bg text-tamrix-text">
      <div className="border-b border-tamrix-border bg-tamrix-surface/80 px-4 py-3 sm:px-6">
        <Link
          href={localizedPath(defaultLocale, "/")}
          className="mx-auto flex max-w-7xl items-center gap-3 transition-opacity hover:opacity-80"
          aria-label="Tamrix — Accueil"
        >
          <Image src="/logo.png" alt="Tamrix" width={32} height={32} />
          <span className="text-sm font-bold uppercase tracking-[0.15em] text-brand-300">
            Tamrix Admin
          </span>
        </Link>
      </div>
      {children}
    </div>
  );
}
