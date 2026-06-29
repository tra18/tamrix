import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { OrderForm } from "@/components/OrderForm";
import { AppPreview } from "@/components/AppPreview";
import { getAppBySlug, applicationMeta } from "@/data/applications";
import { getDictionary } from "@/i18n/get-dictionary";
import { interpolate } from "@/i18n/interpolate";
import { locales, type Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/utils";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    applicationMeta.map((app) => ({ locale, slug: app.slug }))
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale as Locale);
  const app = getAppBySlug(slug, dict);
  if (!app) return { title: "404" };
  return {
    title: `${dict.common.order} — ${app.name}`,
    description: app.tagline,
  };
}

export default async function CommanderPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const loc = locale as Locale;
  const dict = await getDictionary(loc);
  const app = getAppBySlug(slug, dict);
  if (!app) notFound();

  return (
    <div className="circuit-bg min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href={localizedPath(loc, `/applications/${app.slug}/apercu`)}
          className="inline-flex items-center gap-2 text-sm font-medium text-tamrix-muted transition hover:text-brand-300"
        >
          <ArrowLeft className="h-4 w-4" />
          {dict.order.back}
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div className="order-2 animate-fade-in-up lg:order-1">
            <span className="badge">{dict.order.badge}</span>
            <h1 className="mt-4 text-2xl font-bold text-tamrix-text sm:text-3xl">
              {dict.order.title}
            </h1>
            <p className="mt-3 text-tamrix-muted">
              {interpolate(dict.order.subtitle, { name: app.name })}
            </p>
            <div className="mt-8">
              <AppPreview type={app.previewType} appName={app.name} dict={dict} />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <OrderForm app={app} locale={loc} dict={dict} />
          </div>
        </div>
      </div>
    </div>
  );
}
