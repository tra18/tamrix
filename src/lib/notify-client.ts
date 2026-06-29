import type { Locale } from "@/i18n/config";
import type { OrderRequestInput, QuoteRequestInput } from "@/lib/validation";
import { escapeHtml, sendEmail } from "@/lib/email";
import { getAppUrl } from "@/lib/site-url";

const copy = {
  fr: {
    quote: {
      subject: "Tamrix — Confirmation de votre demande de devis",
      greeting: (name: string) => `Bonjour ${name},`,
      intro:
        "Nous avons bien reçu votre cahier des charges. Notre équipe analyse votre projet.",
      reference: "Référence",
      company: "Entreprise",
      response: "Vous recevrez un devis personnalisé sous 48 h ouvrées.",
      questions: "Une question ? Répondez à cet e-mail ou écrivez-nous à contact@tamrix.fr",
      cta: "Explorer le catalogue",
      footer: "Tamrix — Applications métier sur mesure",
    },
    order: {
      subject: (app: string) => `Tamrix — Confirmation de votre commande (${app})`,
      greeting: (name: string) => `Bonjour ${name},`,
      intro: (app: string) =>
        `Nous avons bien reçu votre demande pour ${app}. Un conseiller Tamrix vous contactera rapidement.`,
      reference: "Référence",
      application: "Application",
      plan: "Formule",
      company: "Entreprise",
      response: "Nous vous recontactons sous 24 h ouvrées pour finaliser votre projet.",
      questions: "Une question ? Répondez à cet e-mail ou écrivez-nous à contact@tamrix.fr",
      cta: "Voir le catalogue",
      footer: "Tamrix — Applications métier sur mesure",
    },
  },
  en: {
    quote: {
      subject: "Tamrix — Your quote request confirmation",
      greeting: (name: string) => `Hello ${name},`,
      intro:
        "We received your requirements document. Our team is reviewing your project.",
      reference: "Reference",
      company: "Company",
      response: "You will receive a personalized quote within 48 business hours.",
      questions: "Questions? Reply to this email or contact us at contact@tamrix.fr",
      cta: "Browse the catalog",
      footer: "Tamrix — Custom business applications",
    },
    order: {
      subject: (app: string) => `Tamrix — Order confirmation (${app})`,
      greeting: (name: string) => `Hello ${name},`,
      intro: (app: string) =>
        `We received your request for ${app}. A Tamrix advisor will contact you shortly.`,
      reference: "Reference",
      application: "Application",
      plan: "Plan",
      company: "Company",
      response: "We will get back to you within 24 business hours to finalize your project.",
      questions: "Questions? Reply to this email or contact us at contact@tamrix.fr",
      cta: "View the catalog",
      footer: "Tamrix — Custom business applications",
    },
  },
} as const;

function getCopy(locale: string) {
  return locale === "en" ? copy.en : copy.fr;
}

function catalogUrl(locale: Locale): string {
  return `${getAppUrl()}/${locale}/catalogue`;
}

export async function notifyClientQuoteConfirmation(
  id: string,
  data: QuoteRequestInput
): Promise<void> {
  const t = getCopy(data.locale).quote;
  const catalog = catalogUrl(data.locale);

  const text = [
    t.greeting(data.contactName),
    "",
    t.intro,
    "",
    `${t.reference} : ${id}`,
    `${t.company} : ${data.company}`,
    "",
    t.response,
    "",
    t.questions,
    "",
    `${t.cta} : ${catalog}`,
  ].join("\n");

  const html = `
    <p>${escapeHtml(t.greeting(data.contactName))}</p>
    <p>${escapeHtml(t.intro)}</p>
    <table cellpadding="6" cellspacing="0" style="margin:16px 0">
      <tr><td><strong>${escapeHtml(t.reference)}</strong></td><td>${escapeHtml(id)}</td></tr>
      <tr><td><strong>${escapeHtml(t.company)}</strong></td><td>${escapeHtml(data.company)}</td></tr>
    </table>
    <p>${escapeHtml(t.response)}</p>
    <p style="color:#666;font-size:14px">${escapeHtml(t.questions)}</p>
    <p><a href="${escapeHtml(catalog)}">${escapeHtml(t.cta)}</a></p>
    <hr style="margin:24px 0;border:none;border-top:1px solid #eee" />
    <p style="color:#888;font-size:12px">${escapeHtml(t.footer)}</p>
  `.trim();

  await sendEmail({
    to: data.email,
    subject: t.subject,
    html,
    text,
  });
}

export async function notifyClientOrderConfirmation(
  id: string,
  data: OrderRequestInput
): Promise<void> {
  const t = getCopy(data.locale).order;
  const catalog = catalogUrl(data.locale);

  const text = [
    t.greeting(data.contactName),
    "",
    t.intro(data.appName),
    "",
    `${t.reference} : ${id}`,
    `${t.application} : ${data.appName}`,
    `${t.plan} : ${data.plan}`,
    `${t.company} : ${data.company}`,
    "",
    t.response,
    "",
    t.questions,
    "",
    `${t.cta} : ${catalog}`,
  ].join("\n");

  const html = `
    <p>${escapeHtml(t.greeting(data.contactName))}</p>
    <p>${escapeHtml(t.intro(data.appName))}</p>
    <table cellpadding="6" cellspacing="0" style="margin:16px 0">
      <tr><td><strong>${escapeHtml(t.reference)}</strong></td><td>${escapeHtml(id)}</td></tr>
      <tr><td><strong>${escapeHtml(t.application)}</strong></td><td>${escapeHtml(data.appName)}</td></tr>
      <tr><td><strong>${escapeHtml(t.plan)}</strong></td><td>${escapeHtml(data.plan)}</td></tr>
      <tr><td><strong>${escapeHtml(t.company)}</strong></td><td>${escapeHtml(data.company)}</td></tr>
    </table>
    <p>${escapeHtml(t.response)}</p>
    <p style="color:#666;font-size:14px">${escapeHtml(t.questions)}</p>
    <p><a href="${escapeHtml(catalog)}">${escapeHtml(t.cta)}</a></p>
    <hr style="margin:24px 0;border:none;border-top:1px solid #eee" />
    <p style="color:#888;font-size:12px">${escapeHtml(t.footer)}</p>
  `.trim();

  await sendEmail({
    to: data.email,
    subject: t.subject(data.appName),
    html,
    text,
  });
}
