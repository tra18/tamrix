import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BriefcaseBusiness, ClipboardList, Eye } from "lucide-react";
import { AppCard } from "@/components/AppCard";
import { FeatureCards } from "@/components/home/FeatureCards";
import { HeroLaptopCoder } from "@/components/home/HeroLaptopCoder";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { IconBadge } from "@/components/home/IconBadge";
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

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
            <div className="text-center lg:text-left animate-hero-content">
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
                  className="mx-auto object-contain animate-hero-logo lg:mx-0"
                  priority
                />
              </Link>

              <span className="badge mt-8">
                <BriefcaseBusiness className="mr-1.5 inline h-3.5 w-3.5" />
                {dict.home.badge}
              </span>

              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-5xl xl:text-6xl">
                {dict.home.title}{" "}
                <span className="bg-gradient-to-r from-brand-300 to-brand-100 bg-clip-text text-transparent">
                  {dict.home.titleHighlight}
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-tamrix-muted sm:text-xl lg:mx-0">
                {dict.home.subtitle}
              </p>

              <div className="mt-10 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4 lg:justify-start">
                <Link href={localizedPath(loc, "/configurateur")} className="btn-primary w-full px-8 py-3.5 sm:w-auto">
                  <ClipboardList className="h-4 w-4" />
                  {dict.home.ctaConfigurator}
                </Link>
                <Link href={localizedPath(loc, "/catalogue")} className="btn-secondary w-full px-8 py-3.5 sm:w-auto">
                  {dict.home.ctaCatalogue}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={localizedPath(loc, "/applications/crm-pro/apercu")}
                  className="btn-ghost w-full px-8 py-3.5 sm:w-auto"
                >
                  <Eye className="h-4 w-4" />
                  {dict.home.ctaPreview}
                </Link>
              </div>
            </div>

            <div className="animate-fade-in-up lg:animate-fade-in">
              <HeroLaptopCoder copy={dict.home.codeShowcase} />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-tamrix-border to-transparent" />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <FeatureCards features={dict.home.features} />
      </section>

      <section className="border-y border-tamrix-border bg-tamrix-surface/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="card-hover mx-auto flex max-w-4xl flex-col items-center gap-6 p-6 text-center sm:flex-row sm:p-8 sm:text-left animate-fade-in-up">
            <IconBadge icon={ClipboardList} size="lg" />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-tamrix-text">
                {dict.home.ctaConfigurator}
              </h2>
              <p className="mt-2 text-sm text-tamrix-muted">
                {dict.home.ctaConfiguratorDesc}
              </p>
            </div>
            <Link href={localizedPath(loc, "/configurateur")} className="btn-primary w-full shrink-0 px-6 py-3 sm:w-auto">
              {dict.nav.configurateur}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-tamrix-border bg-tamrix-surface/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between animate-fade-in-up">
            <div>
              <h2 className="section-title">{dict.home.popularTitle}</h2>
              <p className="section-subtitle">{dict.home.popularSubtitle}</p>
            </div>
            <Link
              href={localizedPath(loc, "/catalogue")}
              className="text-sm font-semibold text-brand-300 transition hover:text-white sm:shrink-0"
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

      <ProcessTimeline
        badge={dict.home.processBadge}
        title={dict.home.processTitle}
        subtitle={dict.home.processSubtitle}
        stepLabel={dict.home.stepLabel}
        steps={dict.home.steps}
      />

      <section className="relative overflow-hidden border-t border-tamrix-border py-20">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 animate-fade-in-up">
          <h2 className="text-2xl font-bold text-tamrix-text sm:text-3xl">
            {dict.home.ctaFinalTitle}
          </h2>
          <p className="mt-3 text-tamrix-muted">{dict.home.ctaFinalSubtitle}</p>
          <div className="mt-8 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:mx-auto sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-4">
            <Link
              href={localizedPath(loc, "/configurateur")}
              className="btn-primary w-full px-10 py-3.5 sm:w-auto"
            >
              {dict.home.ctaConfigurator}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={localizedPath(loc, "/catalogue")}
              className="btn-ghost w-full px-10 py-3.5 sm:w-auto"
            >
              {dict.home.ctaFinalButton}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
