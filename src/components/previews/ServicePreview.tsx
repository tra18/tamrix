"use client";

import { useState } from "react";
import type { PreviewType } from "@/data/applications";

type ServiceVariant = Extract<
  PreviewType,
  "branding" | "seo-ranking" | "google-ads" | "marketing" | "ecommerce" | "ia" | "hosting"
>;

interface ServicePreviewProps {
  variant: ServiceVariant;
}

export function ServicePreview({ variant }: ServicePreviewProps) {
  switch (variant) {
    case "branding":
      return <BrandingPreview />;
    case "seo-ranking":
      return <SeoPreview />;
    case "google-ads":
      return <GoogleAdsPreview />;
    case "marketing":
      return <MarketingPreview />;
    case "ecommerce":
      return <EcommercePreview />;
    case "ia":
      return <IaPreview />;
    case "hosting":
      return <HostingPreview />;
    default:
      return null;
  }
}

function BrandingPreview() {
  const [palette, setPalette] = useState(0);
  const palettes = [
    { name: "Corporate", primary: "bg-blue-500", accent: "bg-slate-700" },
    { name: "Créatif", primary: "bg-violet-500", accent: "bg-fuchsia-500" },
    { name: "Nature", primary: "bg-emerald-500", accent: "bg-amber-500" },
  ];
  const current = palettes[palette];

  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold text-tamrix-text">Identité visuelle</p>
      <div className="flex gap-2">
        {palettes.map((p, i) => (
          <button
            key={p.name}
            type="button"
            onClick={() => setPalette(i)}
            className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
              palette === i
                ? "border-brand-300 bg-brand-300/10 text-brand-300"
                : "border-tamrix-border text-tamrix-muted hover:border-brand-300/40"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>
      <div className="rounded-xl border border-tamrix-border bg-tamrix-bg p-4">
        <div className="flex items-center gap-3">
          <div className={`h-10 w-10 rounded-lg ${current.primary}`} />
          <div>
            <div className={`h-2 w-24 rounded ${current.accent}`} />
            <div className="mt-2 h-2 w-32 rounded bg-tamrix-muted/30" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SeoPreview() {
  const [optimized, setOptimized] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-lg border border-tamrix-border bg-tamrix-bg p-3">
        <span className="text-sm font-semibold text-tamrix-text">Position Google</span>
        <button
          type="button"
          onClick={() => setOptimized(true)}
          className="rounded-lg border border-brand-300/40 px-3 py-1.5 text-xs font-semibold text-brand-300 transition hover:bg-brand-300/10"
        >
          Optimiser
        </button>
      </div>
      <div className="space-y-2">
        {["Audit technique", "Mots-clés", "Contenu"].map((item, i) => (
          <div
            key={item}
            className="flex items-center justify-between rounded-lg border border-tamrix-border px-3 py-2"
          >
            <span className="text-xs text-tamrix-muted">{item}</span>
            <span
              className={`text-xs font-bold ${
                optimized ? "text-emerald-400" : i === 0 ? "text-amber-400" : "text-tamrix-muted"
              }`}
            >
              {optimized ? "✓ OK" : i === 0 ? "En cours" : "—"}
            </span>
          </div>
        ))}
      </div>
      {optimized && (
        <p className="text-center text-xs font-semibold text-emerald-400">
          Visibilité estimée : +42 %
        </p>
      )}
    </div>
  );
}

function GoogleAdsPreview() {
  const [active, setActive] = useState(false);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Clics", value: active ? "1 240" : "0" },
          { label: "CTR", value: active ? "3,8 %" : "—" },
          { label: "Coût/conv.", value: active ? "12 €" : "—" },
        ].map((m) => (
          <div
            key={m.label}
            className="rounded-lg border border-tamrix-border bg-tamrix-bg p-2 text-center"
          >
            <p className="text-[10px] uppercase text-tamrix-muted">{m.label}</p>
            <p className="mt-1 text-sm font-bold text-brand-300">{m.value}</p>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setActive(true)}
        className={`w-full rounded-lg border py-2.5 text-sm font-semibold transition ${
          active
            ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-400"
            : "border-brand-300/40 text-brand-300 hover:bg-brand-300/10"
        }`}
      >
        {active ? "Campagne active" : "Lancer la campagne"}
      </button>
    </div>
  );
}

function MarketingPreview() {
  const [channels, setChannels] = useState<string[]>([]);
  const options = ["Réseaux sociaux", "Newsletter", "Contenu blog"];

  const toggle = (c: string) =>
    setChannels((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-tamrix-text">Canaux marketing</p>
      {options.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => toggle(c)}
          className={`flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-left text-sm transition ${
            channels.includes(c)
              ? "border-brand-300 bg-brand-300/10 text-brand-300"
              : "border-tamrix-border text-tamrix-muted hover:border-brand-300/40"
          }`}
        >
          {c}
          <span>{channels.includes(c) ? "✓" : "+"}</span>
        </button>
      ))}
    </div>
  );
}

function EcommercePreview() {
  const [cart, setCart] = useState(0);

  return (
    <div className="space-y-4">
      <div className="flex gap-3 rounded-xl border border-tamrix-border bg-tamrix-bg p-3">
        <div className="h-14 w-14 rounded-lg bg-brand-300/20" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-tamrix-text">Produit démo</p>
          <p className="text-xs text-tamrix-muted">49,00 €</p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setCart((n) => n + 1)}
        className="w-full rounded-lg bg-brand-300 py-2.5 text-sm font-semibold text-tamrix-bg"
      >
        Ajouter au panier {cart > 0 ? `(${cart})` : ""}
      </button>
    </div>
  );
}

function IaPreview() {
  const [running, setRunning] = useState(false);

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-tamrix-border bg-tamrix-bg p-3 font-mono text-xs text-tamrix-muted">
        <p>trigger: nouveau_lead</p>
        <p className={running ? "text-brand-300" : ""}>
          → {running ? "qualification IA ✓" : "en attente…"}
        </p>
        <p className={running ? "text-emerald-400" : ""}>
          → {running ? "email personnalisé envoyé" : "—"}
        </p>
      </div>
      <button
        type="button"
        onClick={() => setRunning(true)}
        className="w-full rounded-lg border border-brand-300/40 py-2.5 text-sm font-semibold text-brand-300 hover:bg-brand-300/10"
      >
        Simuler l&apos;automatisation
      </button>
    </div>
  );
}

function HostingPreview() {
  const [status] = useState("online");

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 rounded-lg border border-tamrix-border bg-tamrix-bg p-3">
        <span
          className={`h-3 w-3 rounded-full ${
            status === "online" ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" : "bg-red-400"
          }`}
        />
        <div>
          <p className="text-sm font-semibold text-tamrix-text">Serveur production</p>
          <p className="text-xs text-emerald-400">En ligne · 99,9 % uptime</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-center">
        <div className="rounded-lg border border-tamrix-border p-2">
          <p className="text-[10px] text-tamrix-muted">SSL</p>
          <p className="text-xs font-bold text-brand-300">Actif</p>
        </div>
        <div className="rounded-lg border border-tamrix-border p-2">
          <p className="text-[10px] text-tamrix-muted">Sauvegardes</p>
          <p className="text-xs font-bold text-brand-300">Quotidiennes</p>
        </div>
      </div>
    </div>
  );
}
