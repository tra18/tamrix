import type { Dictionary } from "@/i18n/types";

export type AppCategory =
  | "gestion"
  | "commercial"
  | "rh"
  | "finance"
  | "logistique";

export type PreviewType =
  | "crm"
  | "stock"
  | "facturation"
  | "rh"
  | "dossiers"
  | "reservation";

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
