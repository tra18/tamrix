import { getAppUrl } from "@/lib/site-url";

export function OrganizationJsonLd() {
  const base = getAppUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tamrix",
    url: base,
    logo: `${base}/logo.png`,
    email: "contact@tamrix.fr",
    description:
      "Applications métier professionnelles avec aperçu interactif avant commande.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
