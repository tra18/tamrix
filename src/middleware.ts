import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE } from "./lib/admin-constants";
import { verifySessionTokenEdge } from "./lib/admin-session-edge";
import { defaultLocale, locales, type Locale } from "./i18n/config";

function getPreferredLocale(request: NextRequest): Locale {
  const accept = request.headers.get("accept-language") ?? "";
  if (accept.toLowerCase().startsWith("en")) return "en";
  return defaultLocale;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/admin")) {
    if (
      pathname === "/api/admin/login" ||
      pathname === "/api/admin/logout"
    ) {
      return NextResponse.next();
    }

    const valid = await verifySessionTokenEdge(
      request.cookies.get(ADMIN_COOKIE)?.value
    );
    if (!valid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  if (
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin/login")
  ) {
    const valid = await verifySessionTokenEdge(
      request.cookies.get(ADMIN_COOKIE)?.value
    );
    if (!valid) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

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
  matcher: ["/((?!_next|api|favicon.ico|logo.png|.*\\..*).*)", "/api/admin/:path*"],
};
