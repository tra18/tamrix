"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle,
  Download,
  FileText,
  Sparkles,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { interpolate } from "@/i18n/interpolate";
import { applicationMeta } from "@/data/applications";
import { downloadSpecificationPdf } from "@/lib/spec-pdf";
import {
  buildSpecification,
  canProceedStep,
  estimateComplexity,
  initialFormState,
  slugToModules,
  type ConfiguratorFormState,
} from "./configurator-utils";
import { submitQuoteRequest } from "@/lib/api-client";

interface QuoteConfiguratorProps {
  locale: Locale;
  dict: Dictionary;
}

const DRAFT_KEY = "tamrix-configurator-draft";

export function QuoteConfigurator({ locale, dict }: QuoteConfiguratorProps) {
  const cfg = dict.configurateur;
  const searchParams = useSearchParams();
  const prefillApp = searchParams.get("app");

  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [website, setWebsite] = useState("");
  const [draftNotice, setDraftNotice] = useState(false);
  const [form, setForm] = useState<ConfiguratorFormState>(() => {
    if (!prefillApp || !dict.apps[prefillApp]) return initialFormState;
    return {
      ...initialFormState,
      projectSlugs: [prefillApp],
      modules: slugToModules[prefillApp] ?? [],
    };
  });

  const update = useCallback(
    <K extends keyof ConfiguratorFormState>(key: K, value: ConfiguratorFormState[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const toggleArray = useCallback(
    (key: "projectSlugs" | "modules" | "integrations", id: string) => {
      setForm((prev) => {
        const arr = prev[key];
        const next = arr.includes(id)
          ? arr.filter((x) => x !== id)
          : [...arr, id];
        return { ...prev, [key]: next };
      });
    },
    []
  );

  const complexity = useMemo(() => estimateComplexity(form), [form]);
  const spec = useMemo(
    () => buildSpecification(form, cfg, dict.apps),
    [form, cfg, dict.apps]
  );

  useEffect(() => {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return;
    try {
      const saved = JSON.parse(raw) as {
        form?: ConfiguratorFormState;
        step?: number;
      };
      if (saved.form) setForm(saved.form);
      if (typeof saved.step === "number") setStep(saved.step);
      setDraftNotice(true);
    } catch {
      localStorage.removeItem(DRAFT_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ form, step }));
  }, [form, step]);

  const clearDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
    setForm(initialFormState);
    setStep(0);
    setDraftNotice(false);
  };

  const handleDownloadPdf = () => {
    downloadSpecificationPdf({
      title: "Cahier des charges — Tamrix",
      subtitle: form.company || undefined,
      sections: [
        { label: cfg.step5.specSections.project, content: spec.project },
        { label: cfg.step5.specSections.needs, content: spec.needs },
        { label: cfg.step5.specSections.technical, content: spec.technical },
        { label: cfg.step5.specSections.planning, content: spec.planning },
      ],
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await submitQuoteRequest({
        locale,
        company: form.company,
        contactName: form.contactName,
        email: form.email,
        phone: form.phone,
        website,
        projectSlugs: form.projectSlugs,
        customProject: form.customProject,
        sector: form.sector,
        companySize: form.companySize,
        description: form.description,
        modules: form.modules,
        userCount: form.userCount,
        integrations: form.integrations,
        needsMobile: form.needsMobile,
        needsMultiSite: form.needsMultiSite,
        existingSystems: form.existingSystems,
        timeline: form.timeline,
        complexity: estimateComplexity(form),
        specification: spec,
      });
      localStorage.removeItem(DRAFT_KEY);
      setSubmitted(true);
    } catch {
      setError(cfg.step5.errorSubmit);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="card mx-auto max-w-lg border-brand-300/30 p-10 text-center shadow-glow animate-fade-in-up">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
          <CheckCircle className="h-8 w-8 text-emerald-400" />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-tamrix-text">
          {cfg.step5.successTitle}
        </h2>
        <p className="mt-3 text-tamrix-muted">
          {interpolate(cfg.step5.successMessage, { name: form.contactName })}
        </p>
        <button
          type="button"
          onClick={handleDownloadPdf}
          className="btn-secondary mt-6 inline-flex"
        >
          <Download className="h-4 w-4" />
          {cfg.step5.downloadPdf}
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      {draftNotice && (
        <div className="mb-6 flex flex-col gap-3 rounded-xl border border-brand-300/30 bg-brand-300/10 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-tamrix-muted">{cfg.step5.draftRestored}</p>
          <button type="button" onClick={clearDraft} className="btn-ghost text-xs">
            {cfg.step5.clearDraft}
          </button>
        </div>
      )}
      {/* Progress */}
      <div className="mb-10 animate-fade-in">
        <div className="flex items-center justify-between gap-1 overflow-x-auto pb-2">
          {cfg.steps.map((s, i) => (
            <div key={s.label} className="flex min-w-0 flex-1 flex-col items-center">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition ${
                  i < step
                    ? "border-brand-300 bg-brand-300 text-tamrix-bg"
                    : i === step
                      ? "border-brand-300 bg-brand-300/20 text-brand-300 shadow-glow"
                      : "border-tamrix-border text-tamrix-muted"
                }`}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span
                className={`mt-2 hidden truncate text-center text-[10px] font-semibold uppercase tracking-wide sm:block ${
                  i === step ? "text-brand-300" : "text-tamrix-muted"
                }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-tamrix-elevated">
          <div
            className="h-full rounded-full bg-brand-300 transition-all duration-500"
            style={{ width: `${((step + 1) / cfg.steps.length) * 100}%` }}
          />
        </div>
        <h2 className="mt-6 text-xl font-bold text-tamrix-text">
          {cfg.steps[step].title}
        </h2>
      </div>

      <div className="card animate-fade-in-up p-6 sm:p-8">
        {/* Step 1 — Context */}
        {step === 0 && (
          <div className="space-y-6">
            <div>
              <p className="font-medium text-tamrix-text">{cfg.step1.projectTypesLabel}</p>
              <p className="mt-1 text-sm text-tamrix-muted">{cfg.step1.projectTypesHint}</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {applicationMeta.map((meta) => {
                  const app = dict.apps[meta.slug];
                  const selected = form.projectSlugs.includes(meta.slug);
                  return (
                    <button
                      key={meta.slug}
                      type="button"
                      onClick={() => toggleArray("projectSlugs", meta.slug)}
                      className={`rounded-xl border p-4 text-left transition ${
                        selected
                          ? "border-brand-300 bg-brand-300/10 shadow-glow"
                          : "border-tamrix-border hover:border-brand-300/40"
                      }`}
                    >
                      <p className="font-semibold text-tamrix-text">{app.name}</p>
                      <p className="mt-1 text-xs text-tamrix-muted">{app.tagline}</p>
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => update("customProject", !form.customProject)}
                  className={`rounded-xl border p-4 text-left transition ${
                    form.customProject
                      ? "border-brand-300 bg-brand-300/10 shadow-glow"
                      : "border-tamrix-border hover:border-brand-300/40"
                  }`}
                >
                  <p className="font-semibold text-tamrix-text">
                    {cfg.step1.customProject}
                  </p>
                  <p className="mt-1 text-xs text-tamrix-muted">+</p>
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-tamrix-muted">
                  {cfg.step1.sectorLabel} *
                </label>
                <select
                  value={form.sector}
                  onChange={(e) => update("sector", e.target.value)}
                  className="input-field mt-1"
                >
                  <option value="">—</option>
                  {cfg.step1.sectors.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-tamrix-muted">
                  {cfg.step1.companySizeLabel} *
                </label>
                <select
                  value={form.companySize}
                  onChange={(e) => update("companySize", e.target.value)}
                  className="input-field mt-1"
                >
                  <option value="">—</option>
                  {cfg.step1.sizes.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-tamrix-muted">
                {cfg.step1.descriptionLabel} *
              </label>
              <textarea
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                rows={4}
                className="input-field mt-1 resize-none"
                placeholder={cfg.step1.descriptionPlaceholder}
              />
              <p className="mt-1 text-xs text-tamrix-muted">
                {form.description.length}/20 min.
              </p>
            </div>
          </div>
        )}

        {/* Step 2 — Modules */}
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-sm text-tamrix-muted">{cfg.step2.modulesHint}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {cfg.step2.modules.map((mod) => {
                const selected = form.modules.includes(mod.id);
                return (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => toggleArray("modules", mod.id)}
                    className={`flex items-start gap-3 rounded-xl border p-4 text-left transition ${
                      selected
                        ? "border-brand-300 bg-brand-300/10"
                        : "border-tamrix-border hover:border-brand-300/40"
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                        selected
                          ? "border-brand-300 bg-brand-300 text-tamrix-bg"
                          : "border-tamrix-border"
                      }`}
                    >
                      {selected && <Check className="h-3 w-3" />}
                    </div>
                    <div>
                      <p className="font-semibold text-tamrix-text">{mod.label}</p>
                      <p className="text-xs text-tamrix-muted">{mod.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3 — Technical */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-tamrix-muted">
                {cfg.step3.usersLabel} *
              </label>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {cfg.step3.users.map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => update("userCount", u.id)}
                    className={`rounded-lg border py-3 text-sm font-medium transition ${
                      form.userCount === u.id
                        ? "border-brand-300 bg-brand-300/10 text-brand-300"
                        : "border-tamrix-border text-tamrix-muted hover:border-brand-300/40"
                    }`}
                  >
                    {u.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-tamrix-muted">
                {cfg.step3.integrationsLabel}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {cfg.step3.integrations.map((int) => {
                  const selected = form.integrations.includes(int.id);
                  return (
                    <button
                      key={int.id}
                      type="button"
                      onClick={() => toggleArray("integrations", int.id)}
                      className={`rounded-full border px-4 py-2 text-sm transition ${
                        selected
                          ? "border-brand-300 bg-brand-300/10 text-brand-300"
                          : "border-tamrix-border text-tamrix-muted hover:border-brand-300/40"
                      }`}
                    >
                      {int.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-tamrix-muted">
                {cfg.step3.optionsLabel}
              </p>
              <div className="mt-3 space-y-2">
                {(
                  [
                    ["needsMobile", cfg.step3.mobile],
                    ["needsMultiSite", cfg.step3.multiSite],
                  ] as const
                ).map(([key, label]) => (
                  <label
                    key={key}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border border-tamrix-border p-3 hover:border-brand-300/40"
                  >
                    <input
                      type="checkbox"
                      checked={form[key]}
                      onChange={(e) => update(key, e.target.checked)}
                      className="h-4 w-4 rounded border-tamrix-border accent-brand-300"
                    />
                    <span className="text-sm text-tamrix-text">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-tamrix-muted">
                {cfg.step3.existingLabel}
              </label>
              <input
                value={form.existingSystems}
                onChange={(e) => update("existingSystems", e.target.value)}
                className="input-field mt-1"
                placeholder={cfg.step3.existingPlaceholder}
              />
            </div>
          </div>
        )}

        {/* Step 4 — Estimation */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-tamrix-muted">
                {cfg.step4.timelineLabel} *
              </label>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {cfg.step4.timelines.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => update("timeline", t.id)}
                    className={`rounded-xl border p-4 text-left text-sm font-medium transition ${
                      form.timeline === t.id
                        ? "border-brand-300 bg-brand-300/10 text-brand-300"
                        : "border-tamrix-border text-tamrix-muted hover:border-brand-300/40"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-brand-300/30 bg-brand-300/5 p-6">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-brand-300" />
                <p className="font-semibold text-tamrix-text">
                  {cfg.step4.complexityLabel}
                </p>
              </div>
              <p className="mt-3 text-3xl font-bold text-brand-300">
                {cfg.step4.complexityLevels[complexity]}
              </p>
              <p className="mt-3 text-sm text-tamrix-muted">{cfg.step4.complexityHint}</p>
              <p className="mt-4 rounded-lg border border-tamrix-border bg-tamrix-bg px-4 py-3 text-sm font-medium text-brand-300">
                {cfg.step4.priceNote}
              </p>
            </div>
          </div>
        )}

        {/* Step 5 — Spec + Contact */}
        {step === 4 && (
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-brand-300" />
                <h3 className="font-bold text-tamrix-text">{cfg.step5.specTitle}</h3>
              </div>
              <p className="mt-1 text-sm text-tamrix-muted">{cfg.step5.specSubtitle}</p>

              <div className="mt-4 space-y-4 rounded-xl border border-tamrix-border bg-tamrix-bg p-5 font-mono text-xs leading-relaxed text-tamrix-muted sm:text-sm">
                <div>
                  <p className="mb-2 font-bold text-brand-300">
                    {cfg.step5.specSections.project}
                  </p>
                  <pre className="whitespace-pre-wrap font-sans">{spec.project}</pre>
                </div>
                <div>
                  <p className="mb-2 font-bold text-brand-300">
                    {cfg.step5.specSections.needs}
                  </p>
                  <pre className="whitespace-pre-wrap font-sans">{spec.needs}</pre>
                </div>
                <div>
                  <p className="mb-2 font-bold text-brand-300">
                    {cfg.step5.specSections.technical}
                  </p>
                  <pre className="whitespace-pre-wrap font-sans">{spec.technical}</pre>
                </div>
                <div>
                  <p className="mb-2 font-bold text-brand-300">
                    {cfg.step5.specSections.planning}
                  </p>
                  <pre className="whitespace-pre-wrap font-sans">{spec.planning}</pre>
                </div>
              </div>
              <button
                type="button"
                onClick={handleDownloadPdf}
                className="btn-secondary mt-4 inline-flex"
              >
                <Download className="h-4 w-4" />
                {cfg.step5.downloadPdf}
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
              />
              <h3 className="font-bold text-tamrix-text">{cfg.step5.contactTitle}</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm text-tamrix-muted">
                    {cfg.step5.company}
                  </label>
                  <input
                    value={form.company}
                    onChange={(e) => update("company", e.target.value)}
                    className="input-field mt-1"
                    placeholder={cfg.step5.companyPlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm text-tamrix-muted">{cfg.step5.name}</label>
                  <input
                    value={form.contactName}
                    onChange={(e) => update("contactName", e.target.value)}
                    className="input-field mt-1"
                    placeholder={cfg.step5.namePlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm text-tamrix-muted">
                    {cfg.step5.email}
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="input-field mt-1"
                    placeholder={cfg.step5.emailPlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm text-tamrix-muted">
                    {cfg.step5.phone}
                  </label>
                  <input
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className="input-field mt-1"
                    placeholder={cfg.step5.phonePlaceholder}
                  />
                </div>
              </div>
              <p className="mt-4 text-center text-xs text-tamrix-muted">
                {cfg.step5.disclaimer}
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        {error && (
          <p className="mt-6 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-400">
            {error}
          </p>
        )}
        <div className="mt-8 flex items-center justify-between border-t border-tamrix-border pt-6">
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 0}
            className="btn-ghost disabled:invisible"
          >
            <ArrowLeft className="h-4 w-4" />
            {cfg.nav.back}
          </button>

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              disabled={!canProceedStep(step, form)}
              className="btn-primary disabled:opacity-40"
            >
              {cfg.nav.next}
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canProceedStep(4, form) || loading}
              className="btn-primary disabled:opacity-40"
            >
              {loading ? cfg.step5.submitting : cfg.nav.submit}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
