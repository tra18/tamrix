import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CookieConsent } from "@/components/CookieConsent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { OrganizationJsonLd } from "@/components/JsonLd";
import { SetHtmlLang } from "@/components/SetHtmlLang";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getAppUrl } from "@/lib/site-url";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const base = getAppUrl();

  return {
    title: {
      default: dict.meta.title,
      template: `%s | Tamrix`,
    },
    description: dict.meta.description,
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `${base}/${locale}`,
      siteName: "Tamrix",
      images: [{ url: `${base}/logo.png`, width: 512, height: 512, alt: "Tamrix" }],
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: [`${base}/logo.png`],
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <OrganizationJsonLd />
      <SetHtmlLang locale={locale} />
      <Header locale={locale as Locale} dict={dict} />
      <main className="min-h-screen">{children}</main>
      <Footer locale={locale as Locale} dict={dict} />
      <CookieConsent locale={locale as Locale} dict={dict} />
    </>
  );
}
