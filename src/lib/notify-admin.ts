import type { OrderRequestInput, QuoteRequestInput } from "@/lib/validation";
import { escapeHtml, sendEmail } from "@/lib/email";
import { getAppUrl } from "@/lib/site-url";

function listItems(values: string[]): string {
  return values.length ? values.join(", ") : "—";
}

export async function notifyAdminNewQuote(
  id: string,
  data: QuoteRequestInput
): Promise<void> {
  const to = process.env.ADMIN_NOTIFICATION_EMAIL?.trim();
  if (!to) {
    console.warn(
      "[notify-admin] ADMIN_NOTIFICATION_EMAIL manquant — notification ignorée"
    );
    return;
  }

  const adminUrl = `${getAppUrl()}/admin?quote=${encodeURIComponent(id)}`;
  const projects = data.customProject
    ? `Projet sur mesure${data.projectSlugs.length ? ` (${listItems(data.projectSlugs)})` : ""}`
    : listItems(data.projectSlugs);

  const text = [
    "Nouveau cahier des charges / devis",
    "",
    `ID : ${id}`,
    `Entreprise : ${data.company}`,
    `Contact : ${data.contactName}`,
    `E-mail : ${data.email}`,
    `Téléphone : ${data.phone || "—"}`,
    `Projets : ${projects}`,
    `Secteur : ${data.sector}`,
    `Taille : ${data.companySize}`,
    `Utilisateurs : ${data.userCount}`,
    `Modules : ${listItems(data.modules)}`,
    `Intégrations : ${listItems(data.integrations)}`,
    `Mobile : ${data.needsMobile ? "oui" : "non"}`,
    `Multi-site : ${data.needsMultiSite ? "oui" : "non"}`,
    `Délai : ${data.timeline}`,
    `Complexité : ${data.complexity}`,
    "",
    `Description :`,
    data.description,
    "",
    `Voir dans l'admin : ${adminUrl}`,
  ].join("\n");

  const html = `
    <h2>Nouveau cahier des charges</h2>
    <p><strong>ID :</strong> ${escapeHtml(id)}</p>
    <table cellpadding="4" cellspacing="0">
      <tr><td><strong>Entreprise</strong></td><td>${escapeHtml(data.company)}</td></tr>
      <tr><td><strong>Contact</strong></td><td>${escapeHtml(data.contactName)}</td></tr>
      <tr><td><strong>E-mail</strong></td><td><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
      <tr><td><strong>Téléphone</strong></td><td>${escapeHtml(data.phone || "—")}</td></tr>
      <tr><td><strong>Projets</strong></td><td>${escapeHtml(projects)}</td></tr>
      <tr><td><strong>Secteur</strong></td><td>${escapeHtml(data.sector)}</td></tr>
      <tr><td><strong>Taille</strong></td><td>${escapeHtml(data.companySize)}</td></tr>
      <tr><td><strong>Utilisateurs</strong></td><td>${escapeHtml(data.userCount)}</td></tr>
      <tr><td><strong>Modules</strong></td><td>${escapeHtml(listItems(data.modules))}</td></tr>
      <tr><td><strong>Intégrations</strong></td><td>${escapeHtml(listItems(data.integrations))}</td></tr>
      <tr><td><strong>Mobile</strong></td><td>${data.needsMobile ? "oui" : "non"}</td></tr>
      <tr><td><strong>Multi-site</strong></td><td>${data.needsMultiSite ? "oui" : "non"}</td></tr>
      <tr><td><strong>Délai</strong></td><td>${escapeHtml(data.timeline)}</td></tr>
      <tr><td><strong>Complexité</strong></td><td>${escapeHtml(data.complexity)}</td></tr>
    </table>
    <h3>Description</h3>
    <p>${escapeHtml(data.description).replace(/\n/g, "<br>")}</p>
    <p><a href="${escapeHtml(adminUrl)}">Ouvrir le panneau admin</a></p>
  `.trim();

  await sendEmail({
    to,
    subject: `[Tamrix] Nouveau devis — ${data.company}`,
    html,
    text,
  });
}

export async function notifyAdminNewOrder(
  id: string,
  data: OrderRequestInput
): Promise<void> {
  const to = process.env.ADMIN_NOTIFICATION_EMAIL?.trim();
  if (!to) {
    console.warn(
      "[notify-admin] ADMIN_NOTIFICATION_EMAIL manquant — notification ignorée"
    );
    return;
  }

  const adminUrl = `${getAppUrl()}/admin?order=${encodeURIComponent(id)}`;

  const text = [
    "Nouvelle commande",
    "",
    `ID : ${id}`,
    `Application : ${data.appName} (${data.appSlug})`,
    `Formule : ${data.plan}`,
    `Entreprise : ${data.company}`,
    `Contact : ${data.contactName}`,
    `E-mail : ${data.email}`,
    `Téléphone : ${data.phone || "—"}`,
    `Notes : ${data.notes || "—"}`,
    "",
    `Voir dans l'admin : ${adminUrl}`,
  ].join("\n");

  const html = `
    <h2>Nouvelle commande</h2>
    <p><strong>ID :</strong> ${escapeHtml(id)}</p>
    <table cellpadding="4" cellspacing="0">
      <tr><td><strong>Application</strong></td><td>${escapeHtml(data.appName)} (${escapeHtml(data.appSlug)})</td></tr>
      <tr><td><strong>Formule</strong></td><td>${escapeHtml(data.plan)}</td></tr>
      <tr><td><strong>Entreprise</strong></td><td>${escapeHtml(data.company)}</td></tr>
      <tr><td><strong>Contact</strong></td><td>${escapeHtml(data.contactName)}</td></tr>
      <tr><td><strong>E-mail</strong></td><td><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
      <tr><td><strong>Téléphone</strong></td><td>${escapeHtml(data.phone || "—")}</td></tr>
      <tr><td><strong>Notes</strong></td><td>${escapeHtml(data.notes || "—").replace(/\n/g, "<br>")}</td></tr>
    </table>
    <p><a href="${escapeHtml(adminUrl)}">Ouvrir le panneau admin</a></p>
  `.trim();

  await sendEmail({
    to,
    subject: `[Tamrix] Nouvelle commande — ${data.appName}`,
    html,
    text,
  });
}
