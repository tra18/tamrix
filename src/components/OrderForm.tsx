"use client";

import { useState } from "react";
import { CheckCircle, Send } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { HoneypotField } from "@/components/HoneypotField";
import { BusinessApp } from "@/data/applications";
import { interpolate } from "@/i18n/interpolate";
import { submitOrderRequest } from "@/lib/api-client";

interface OrderFormProps {
  app: BusinessApp;
  locale: Locale;
  dict: Dictionary;
}

export function OrderForm({ app, locale, dict }: OrderFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contactName, setContactName] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const fd = new FormData(e.currentTarget);

    try {
      await submitOrderRequest({
        locale,
        appSlug: app.slug,
        appName: app.name,
        company: String(fd.get("company") ?? ""),
        contactName: String(fd.get("name") ?? ""),
        email: String(fd.get("email") ?? ""),
        phone: String(fd.get("phone") ?? ""),
        website: String(fd.get("website") ?? ""),
        plan: String(fd.get("plan") ?? "standard"),
        notes: String(fd.get("notes") ?? ""),
      });
      setContactName(String(fd.get("name") ?? ""));
      setSubmitted(true);
    } catch {
      setError(dict.order.errorSubmit);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="card border-brand-300/30 p-8 text-center shadow-glow animate-fade-in-up">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
          <CheckCircle className="h-7 w-7 text-emerald-400" />
        </div>
        <h2 className="mt-4 text-xl font-bold text-tamrix-text">
          {dict.order.successTitle}
        </h2>
        <p className="mt-2 text-sm text-tamrix-muted">
          {interpolate(dict.order.successMessage, {
            name: contactName || app.name,
          })}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card relative animate-fade-in-up space-y-5 p-6">
      <HoneypotField />
      <div>
        <h2 className="text-lg font-bold text-tamrix-text">
          {interpolate(dict.order.formTitle, { name: app.name })}
        </h2>
        <p className="mt-1 text-sm text-tamrix-muted">
          {interpolate(dict.order.formSubtitle, { days: app.deliveryDays })}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-tamrix-muted">
            {dict.order.company}
          </label>
          <input
            id="company"
            name="company"
            required
            className="input-field mt-1"
            placeholder={dict.order.companyPlaceholder}
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-tamrix-muted">
            {dict.order.name}
          </label>
          <input
            id="name"
            name="name"
            required
            className="input-field mt-1"
            placeholder={dict.order.namePlaceholder}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-tamrix-muted">
            {dict.order.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="input-field mt-1"
            placeholder={dict.order.emailPlaceholder}
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-tamrix-muted">
            {dict.order.phone}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="input-field mt-1"
            placeholder={dict.order.phonePlaceholder}
          />
        </div>
      </div>

      <div>
        <label htmlFor="plan" className="block text-sm font-medium text-tamrix-muted">
          {dict.order.plan}
        </label>
        <select id="plan" name="plan" className="input-field mt-1">
          <option value="standard">{dict.order.planStandard}</option>
          <option value="pro">{dict.order.planPro}</option>
          <option value="enterprise">{dict.order.planEnterprise}</option>
        </select>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-tamrix-muted">
          {dict.order.notes}
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          className="input-field mt-1 resize-none"
          placeholder={dict.order.notesPlaceholder}
        />
      </div>

      {error && (
        <p className="rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-400">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full py-3 disabled:opacity-60"
      >
        {loading ? (
          dict.order.submitting
        ) : (
          <>
            <Send className="h-4 w-4" />
            {dict.order.submit}
          </>
        )}
      </button>

      <p className="text-center text-xs text-tamrix-muted">
        {dict.order.disclaimer}
      </p>
    </form>
  );
}
