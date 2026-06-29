type EmailPayload = {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
};

export async function sendEmail(payload: EmailPayload): Promise<void> {
  const recipients = Array.isArray(payload.to) ? payload.to : [payload.to];
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from =
    process.env.EMAIL_FROM?.trim() ?? "Tamrix <onboarding@resend.dev>";

  if (!apiKey) {
    console.info(
      `[email] RESEND_API_KEY manquant — e-mail simulé pour ${recipients.join(", ")}`
    );
    console.info(`[email] Sujet: ${payload.subject}`);
    console.info(payload.text);
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: recipients,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend ${res.status}: ${body}`);
  }
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
