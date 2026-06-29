import Link from "next/link";
import { Quote } from "lucide-react";
import { getDictionary } from "@/i18n/get-dictionary";
import { locales, type Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/utils";

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
    title: dict.about.metaTitle,
    description: dict.about.metaDescription,
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const loc = locale as Locale;
  const dict = await getDictionary(loc);
  const about = dict.about;

  return (
    <div className="circuit-bg min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-3xl animate-fade-in-up">
          <span className="badge">{about.badge}</span>
          <h1 className="mt-4 text-3xl font-bold text-tamrix-text sm:text-4xl">
            {about.title}
          </h1>
          <p className="mt-4 text-lg text-tamrix-muted">{about.subtitle}</p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="card p-6 sm:p-8 animate-fade-in-up">
            <h2 className="text-xl font-bold text-brand-300">{about.missionTitle}</h2>
            <p className="mt-4 text-sm leading-relaxed text-tamrix-muted">
              {about.missionText}
            </p>
          </div>
          <div className="card p-6 sm:p-8 animate-fade-in-up">
            <h2 className="text-xl font-bold text-brand-300">{about.valuesTitle}</h2>
            <ul className="mt-4 space-y-4">
              {about.values.map((value) => (
                <li key={value.title}>
                  <p className="font-semibold text-tamrix-text">{value.title}</p>
                  <p className="mt-1 text-sm text-tamrix-muted">{value.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-tamrix-text">{about.testimonialsTitle}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {about.testimonials.map((item) => (
              <blockquote
                key={item.author}
                className="card flex flex-col p-6 animate-fade-in-up"
              >
                <Quote className="h-5 w-5 text-brand-300/60" />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-tamrix-muted">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="mt-4 border-t border-tamrix-border pt-4">
                  <p className="text-sm font-semibold text-tamrix-text">{item.author}</p>
                  <p className="text-xs text-tamrix-muted">{item.role}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>

        <div className="card mt-16 p-6 text-center sm:p-10 animate-fade-in-up">
          <h2 className="text-xl font-bold text-tamrix-text">{about.ctaTitle}</h2>
          <Link
            href={localizedPath(loc, "/configurateur")}
            className="btn-primary mt-6 inline-flex w-full px-8 py-3 sm:w-auto"
          >
            {about.ctaButton}
          </Link>
        </div>
      </div>
    </div>
  );
}
