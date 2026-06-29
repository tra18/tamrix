import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Eye, Shield, Zap, Cpu, ClipboardList } from "lucide-react";
import { AppCard } from "@/components/AppCard";
import { getApplications } from "@/data/applications";
import { getDictionary } from "@/i18n/get-dictionary";
import { locales, type Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/utils";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const loc = locale as Locale;
  const dict = await getDictionary(loc);
  const applications = getApplications(dict);
  const popularApps = applications.filter((a) => a.popular);

  return (
    <>
      <section className="relative overflow-hidden circuit-bg">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 shimmer-line origin-center animate-line-grow" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-4xl text-center animate-hero-content">
            <Link
              href={localizedPath(loc, "/")}
              className="inline-block transition-opacity hover:opacity-80"
              aria-label="Tamrix — Accueil"
            >
              <Image
                src="/logo.png"
                alt="Tamrix"
                width={120}
                height={120}
                className="mx-auto object-contain animate-hero-logo"
                priority
              />
            </Link>

            <span className="badge mt-8">
              <Cpu className="mr-1.5 inline h-3.5 w-3.5" />
              {dict.home.badge}
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {dict.home.title}{" "}
              <span className="bg-gradient-to-r from-brand-300 to-brand-100 bg-clip-text text-transparent">
                {dict.home.titleHighlight}
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-tamrix-muted sm:text-xl">
              {dict.home.subtitle}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
              <Link href={localizedPath(loc, "/configurateur")} className="btn-primary px-8 py-3.5">
                <ClipboardList className="h-4 w-4" />
                {dict.home.ctaConfigurator}
              </Link>
              <Link href={localizedPath(loc, "/catalogue")} className="btn-secondary px-8 py-3.5">
                {dict.home.ctaCatalogue}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={localizedPath(loc, "/applications/crm-pro/apercu")}
                className="btn-ghost px-8 py-3.5"
              >
                <Eye className="h-4 w-4" />
                {dict.home.ctaPreview}
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-tamrix-border to-transparent" />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="stagger-children grid gap-6 md:grid-cols-3">
          {dict.home.features.map((feature, i) => {
            const icons = [Eye, Zap, Shield];
            const Icon = icons[i];
            return (
              <div key={feature.title} className="card-hover p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-300/20 bg-brand-300/10 text-brand-300 shadow-glow">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-tamrix-text">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-tamrix-muted">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-y border-tamrix-border bg-tamrix-surface/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="card-hover mx-auto flex max-w-4xl flex-col items-center gap-6 p-8 text-center sm:flex-row sm:text-left animate-fade-in-up">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-brand-300/20 bg-brand-300/10 text-brand-300 shadow-glow">
              <ClipboardList className="h-7 w-7" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-tamrix-text">
                {dict.home.ctaConfigurator}
              </h2>
              <p className="mt-2 text-sm text-tamrix-muted">
                {dict.home.ctaConfiguratorDesc}
              </p>
            </div>
            <Link href={localizedPath(loc, "/configurateur")} className="btn-primary shrink-0 px-6 py-3">
              {dict.nav.configurateur}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-tamrix-border bg-tamrix-surface/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between animate-fade-in-up">
            <div>
              <h2 className="section-title">{dict.home.popularTitle}</h2>
              <p className="section-subtitle">{dict.home.popularSubtitle}</p>
            </div>
            <Link
              href={localizedPath(loc, "/catalogue")}
              className="hidden text-sm font-semibold text-brand-300 transition hover:text-white sm:block"
            >
              {dict.home.seeAll}
            </Link>
          </div>
          <div className="stagger-children mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {popularApps.map((app) => (
              <AppCard key={app.id} app={app} locale={loc} dict={dict} />
            ))}
          </div>
        </div>
      </section>

      <section id="processus" className="circuit-bg mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center animate-fade-in-up">
          <h2 className="section-title">{dict.home.processTitle}</h2>
          <p className="section-subtitle">{dict.home.processSubtitle}</p>
        </div>
        <div className="stagger-children mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dict.home.steps.map((item, i) => (
            <div key={item.title} className="card-hover relative p-6">
              <span className="text-4xl font-bold text-brand-300/20">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-1 text-lg font-bold text-tamrix-text">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-tamrix-muted">{item.desc}</p>
              <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-brand-300/30 to-transparent" />
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-tamrix-border py-20">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 animate-fade-in-up">
          <h2 className="text-2xl font-bold text-tamrix-text sm:text-3xl">
            {dict.home.ctaFinalTitle}
          </h2>
          <p className="mt-3 text-tamrix-muted">{dict.home.ctaFinalSubtitle}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={localizedPath(loc, "/configurateur")}
              className="btn-primary px-10 py-3.5"
            >
              {dict.home.ctaConfigurator}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={localizedPath(loc, "/catalogue")}
              className="btn-ghost px-10 py-3.5"
            >
              {dict.home.ctaFinalButton}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
