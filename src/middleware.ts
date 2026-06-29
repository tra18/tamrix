import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales, type Locale } from "./i18n/config";

function getPreferredLocale(request: NextRequest): Locale {
  const accept = request.headers.get("accept-language") ?? "";
  if (accept.toLowerCase().startsWith("en")) return "en";
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (hasLocale) return NextResponse.next();

  const locale = getPreferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|logo.png|.*\\..*).*)"],
};
