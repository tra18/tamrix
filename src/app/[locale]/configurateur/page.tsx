import { Suspense } from "react";
import { QuoteConfigurator } from "@/components/configurator/QuoteConfigurator";
import { getDictionary } from "@/i18n/get-dictionary";
import { locales, type Locale } from "@/i18n/config";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict.configurateur.metaTitle,
    description: dict.configurateur.metaDescription,
  };
}

export default async function ConfigurateurPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const cfg = dict.configurateur;

  return (
    <div className="circuit-bg min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center animate-fade-in-up">
          <span className="badge">{cfg.badge}</span>
          <h1 className="mt-4 text-3xl font-bold text-tamrix-text sm:text-4xl">
            {cfg.title}
          </h1>
          <p className="mt-3 text-lg text-tamrix-muted">{cfg.subtitle}</p>
        </div>

        <div className="mt-12">
          <Suspense
            fallback={
              <div className="card mx-auto max-w-4xl animate-pulse p-12 text-center text-tamrix-muted">
                ...
              </div>
            }
          >
            <QuoteConfigurator locale={locale as Locale} dict={dict} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
