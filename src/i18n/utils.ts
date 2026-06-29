import type { Locale } from "./config";
import { locales } from "./config";

export function localizedPath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (clean === "/") return `/${locale}`;
  return `/${locale}${clean}`;
}

export function switchLocalePath(pathname: string, newLocale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
    segments[0] = newLocale;
    return `/${segments.join("/")}`;
  }
  return localizedPath(newLocale, pathname);
}

export function stripLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname;
}
