import type { Dictionary } from "@/i18n/types";

export type AppCategory =
  | "gestion"
  | "commercial"
  | "rh"
  | "finance"
  | "logistique"
  | "web"
  | "marketing"
  | "tech";

export type PreviewType =
  | "crm"
  | "stock"
  | "facturation"
  | "rh"
  | "dossiers"
  | "reservation"
  | "website"
  | "branding"
  | "seo-ranking"
  | "google-ads"
  | "marketing"
  | "ecommerce"
  | "ia"
  | "hosting";

export interface BusinessApp {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: AppCategory;
  previewType: PreviewType;
  deliveryDays: number;
  features: string[];
  highlights: string[];
  popular?: boolean;
}

export interface ApplicationMeta {
  id: string;
  slug: string;
  category: AppCategory;
  previewType: PreviewType;
  deliveryDays: number;
  popular?: boolean;
}

export const applicationMeta: ApplicationMeta[] = [
  {
    id: "1",
    slug: "crm-pro",
    category: "commercial",
    previewType: "crm",
    deliveryDays: 21,
    popular: true,
  },
  {
    id: "2",
    slug: "gestion-stock",
    category: "logistique",
    previewType: "stock",
    deliveryDays: 18,
    popular: true,
  },
  {
    id: "3",
    slug: "facturation-express",
    category: "finance",
    previewType: "facturation",
    deliveryDays: 14,
  },
  {
    id: "4",
    slug: "rh-paie",
    category: "rh",
    previewType: "rh",
    deliveryDays: 28,
  },
  {
    id: "5",
    slug: "suivi-dossiers",
    category: "gestion",
    previewType: "dossiers",
    deliveryDays: 21,
    popular: true,
  },
  {
    id: "6",
    slug: "reservation-pro",
    category: "commercial",
    previewType: "reservation",
    deliveryDays: 16,
  },
  {
    id: "7",
    slug: "refonte-sites",
    category: "web",
    previewType: "website",
    deliveryDays: 21,
    popular: true,
  },
  {
    id: "8",
    slug: "branding-identite",
    category: "marketing",
    previewType: "branding",
    deliveryDays: 14,
  },
  {
    id: "9",
    slug: "referencement-seo",
    category: "marketing",
    previewType: "seo-ranking",
    deliveryDays: 14,
    popular: true,
  },
  {
    id: "10",
    slug: "google-ads-sea",
    category: "marketing",
    previewType: "google-ads",
    deliveryDays: 7,
  },
  {
    id: "11",
    slug: "marketing-digital",
    category: "marketing",
    previewType: "marketing",
    deliveryDays: 21,
  },
  {
    id: "12",
    slug: "e-commerce",
    category: "commercial",
    previewType: "ecommerce",
    deliveryDays: 28,
    popular: true,
  },
  {
    id: "13",
    slug: "ia-automatisation",
    category: "tech",
    previewType: "ia",
    deliveryDays: 21,
  },
  {
    id: "14",
    slug: "hebergement",
    category: "tech",
    previewType: "hosting",
    deliveryDays: 3,
  },
];

export function getApplications(dict: Dictionary): BusinessApp[] {
  return applicationMeta.map((meta) => {
    const translation = dict.apps[meta.slug];
    return {
      ...meta,
      name: translation.name,
      tagline: translation.tagline,
      description: translation.description,
      features: translation.features,
      highlights: translation.highlights,
    };
  });
}

export function getAppBySlug(
  slug: string,
  dict: Dictionary
): BusinessApp | undefined {
  return getApplications(dict).find((app) => app.slug === slug);
}
