"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { AppCard } from "@/components/AppCard";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import type { AppCategory, BusinessApp } from "@/data/applications";

const categoryKeys: (AppCategory | "all")[] = [
  "all",
  "commercial",
  "gestion",
  "finance",
  "rh",
  "logistique",
];

interface CatalogueClientProps {
  applications: BusinessApp[];
  locale: Locale;
  dict: Dictionary;
}

export function CatalogueClient({
  applications,
  locale,
  dict,
}: CatalogueClientProps) {
  const [filter, setFilter] = useState<AppCategory | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = applications.filter((app) => {
    const matchesCategory = filter === "all" || app.category === filter;
    const query = search.trim().toLowerCase();
    const matchesSearch =
      !query ||
      app.name.toLowerCase().includes(query) ||
      app.tagline.toLowerCase().includes(query) ||
      app.description.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="circuit-bg min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-2xl animate-fade-in-up">
          <span className="badge">{dict.catalogue.badge}</span>
          <h1 className="mt-4 text-3xl font-bold text-tamrix-text sm:text-4xl">
            {dict.catalogue.title}
          </h1>
          <p className="mt-3 text-lg text-tamrix-muted">
            {dict.catalogue.subtitle}
          </p>
        </div>

        <div className="relative mt-8 max-w-md animate-fade-in-up">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tamrix-muted" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={dict.catalogue.searchPlaceholder}
            className="input-field w-full pl-10"
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-2 animate-fade-in-up">
          {categoryKeys.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold transition sm:px-4 sm:text-sm ${
                filter === cat
                  ? "bg-brand-300 text-tamrix-bg shadow-glow"
                  : "border border-tamrix-border bg-tamrix-surface text-tamrix-muted hover:border-brand-300/40 hover:text-brand-300"
              }`}
            >
              {cat === "all" ? dict.catalogue.all : dict.categories[cat]}
            </button>
          ))}
        </div>

        <div className="stagger-children mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((app) => (
            <AppCard key={app.id} app={app} locale={locale} dict={dict} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-tamrix-muted">
            {search.trim() ? dict.catalogue.noResults : dict.catalogue.empty}
          </p>
        )}
      </div>
    </div>
  );
}
