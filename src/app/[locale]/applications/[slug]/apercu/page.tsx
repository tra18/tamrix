import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShoppingCart, Check, FileText } from "lucide-react";
import { AppPreview } from "@/components/AppPreview";
import {
  getAppBySlug,
  applicationMeta,
} from "@/data/applications";
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
    title: `${dict.common.preview} — ${app.name}`,
    description: app.description,
  };
}

export default async function ApercuPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const loc = locale as Locale;
  const dict = await getDictionary(loc);
  const app = getAppBySlug(slug, dict);
  if (!app) notFound();

  return (
    <div className="circuit-bg min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href={localizedPath(loc, "/catalogue")}
          className="inline-flex items-center gap-2 text-sm font-medium text-tamrix-muted transition hover:text-brand-300 animate-fade-in"
        >
          <ArrowLeft className="h-4 w-4" />
          {dict.preview.back}
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-5">
          <div className="order-2 lg:order-1 lg:col-span-3">
            <AppPreview type={app.previewType} appName={app.name} dict={dict} />
          </div>

          <div className="order-1 lg:order-2 lg:col-span-2 animate-fade-in-up">
            <span className="badge">{dict.categories[app.category]}</span>
            <h1 className="mt-4 text-2xl font-bold text-tamrix-text sm:text-3xl">
              {app.name}
            </h1>
            <p className="mt-3 text-tamrix-muted">{app.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {app.highlights.map((h) => (
                <span
                  key={h}
                  className="inline-flex items-center gap-1 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300"
                >
                  <Check className="h-3 w-3" />
                  {h}
                </span>
              ))}
            </div>

            <ul className="mt-6 space-y-2.5">
              {app.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 text-sm text-tamrix-muted"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="card mt-8 border-brand-300/20 p-6">
              <p className="text-sm text-tamrix-muted">{dict.preview.priceLabel}</p>
              <p className="text-3xl font-bold text-brand-300">
                {dict.preview.onRequest}
              </p>
              <p className="mt-1 text-sm text-tamrix-muted">
                {interpolate(dict.preview.delivery, { days: app.deliveryDays })}
              </p>
              <div className="mt-6 flex flex-col gap-2">
                <Link
                  href={localizedPath(loc, `/configurateur?app=${app.slug}`)}
                  className="btn-primary w-full py-3"
                >
                  <FileText className="h-4 w-4" />
                  {dict.common.getQuote}
                </Link>
                <Link
                  href={localizedPath(loc, `/commander/${app.slug}`)}
                  className="btn-secondary w-full py-3"
                >
                  <ShoppingCart className="h-4 w-4" />
                  {dict.preview.orderApp}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
