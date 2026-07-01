"use client";

import { useState } from "react";
import { Layout, Sparkles } from "lucide-react";

export function WebsitePreview() {
  const [modern, setModern] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-lg border border-tamrix-border bg-tamrix-bg p-3">
        <div className="flex items-center gap-2">
          <Layout className="h-5 w-5 text-brand-300" />
          <span className="text-sm font-semibold text-tamrix-text">Aperçu page d&apos;accueil</span>
        </div>
        <button
          type="button"
          onClick={() => setModern((v) => !v)}
          className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
            modern
              ? "border-brand-300 bg-brand-300/10 text-brand-300"
              : "border-tamrix-border text-tamrix-muted hover:border-brand-300/50 hover:text-brand-300"
          }`}
        >
          <Sparkles className="h-3.5 w-3.5" />
          {modern ? "Version refondue" : "Avant refonte"}
        </button>
      </div>

      <div
        className={`overflow-hidden rounded-xl border transition-all duration-500 ${
          modern
            ? "border-brand-300/40 bg-gradient-to-br from-tamrix-bg via-tamrix-surface to-brand-300/5"
            : "border-tamrix-border bg-gray-100"
        }`}
      >
        <div
          className={`border-b px-4 py-2 text-[10px] font-bold uppercase tracking-wider ${
            modern
              ? "border-brand-300/20 bg-tamrix-elevated text-brand-300"
              : "border-gray-300 bg-gray-200 text-gray-500"
          }`}
        >
          {modern ? "Design moderne · Responsive · SEO" : "Site actuel · obsolète"}
        </div>

        <div className="space-y-3 p-4">
          <div
            className={`h-3 rounded transition-all duration-500 ${
              modern ? "w-2/5 bg-brand-300/80" : "w-1/3 bg-gray-400"
            }`}
          />
          <div
            className={`h-2 rounded transition-all duration-500 ${
              modern ? "w-3/5 bg-tamrix-muted/40" : "w-full bg-gray-300"
            }`}
          />
          <div className="flex gap-2 pt-1">
            <div
              className={`h-8 flex-1 rounded transition-all duration-500 ${
                modern ? "bg-brand-300/20" : "bg-gray-300"
              }`}
            />
            <div
              className={`h-8 flex-1 rounded transition-all duration-500 ${
                modern ? "bg-brand-300/10" : "bg-gray-200"
              }`}
            />
            <div
              className={`h-8 flex-1 rounded transition-all duration-500 ${
                modern ? "bg-brand-300/10" : "bg-gray-200"
              }`}
            />
          </div>
          <div
            className={`mt-2 inline-block rounded px-4 py-2 text-xs font-semibold transition-all duration-500 ${
              modern
                ? "bg-brand-300 text-tamrix-bg shadow-glow"
                : "bg-gray-400 text-gray-600"
            }`}
          >
            {modern ? "Demander un devis" : "Contact"
            }
          </div>
        </div>
      </div>

      {modern && (
        <div className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-3 text-center">
          <p className="text-sm font-semibold text-emerald-400">Refonte appliquée</p>
          <p className="mt-1 text-xs text-emerald-400/70">
            UX améliorée, mobile-first et temps de chargement optimisé
          </p>
        </div>
      )}
    </div>
  );
}
