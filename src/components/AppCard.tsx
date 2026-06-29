import Link from "next/link";
import { Eye, FileText, Star } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { BusinessApp } from "@/data/applications";
import { localizedPath } from "@/i18n/utils";
import { interpolate } from "@/i18n/interpolate";

interface AppCardProps {
  app: BusinessApp;
  locale: Locale;
  dict: Dictionary;
}

export function AppCard({ app, locale, dict }: AppCardProps) {
  return (
    <article className="card-hover group flex flex-col overflow-hidden">
      <div className="relative border-b border-tamrix-border bg-gradient-to-br from-tamrix-elevated to-tamrix-surface px-6 py-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(112,209,255,0.08),transparent_60%)]" />
        {app.popular && (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-xs font-semibold text-amber-300">
            <Star className="h-3 w-3 fill-current" />
            {dict.common.popular}
          </span>
        )}
        <span className="badge relative">{dict.categories[app.category]}</span>
        <h3 className="relative mt-4 text-xl font-bold text-tamrix-text">
          {app.name}
        </h3>
        <p className="relative mt-2 text-sm text-tamrix-muted">{app.tagline}</p>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <ul className="space-y-2.5 text-sm text-tamrix-muted">
          {app.features.slice(0, 3).map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-300 shadow-[0_0_6px_rgba(112,209,255,0.8)]" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <span className="text-2xl font-bold text-brand-300">
            {dict.common.onRequest}
          </span>
        </div>
        <p className="mt-1 text-xs text-tamrix-muted/80">
          {interpolate(dict.common.deliveryDays, { days: app.deliveryDays })}
        </p>

        <div className="mt-6 flex flex-col gap-2">
          <Link
            href={localizedPath(locale, `/configurateur?app=${app.slug}`)}
            className="btn-primary w-full"
          >
            <FileText className="h-4 w-4" />
            {dict.common.getQuote}
          </Link>
          <Link
            href={localizedPath(locale, `/applications/${app.slug}/apercu`)}
            className="btn-secondary w-full"
          >
            <Eye className="h-4 w-4" />
            {dict.common.preview}
          </Link>
        </div>
      </div>
    </article>
  );
}
