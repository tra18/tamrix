import type { ConfiguratorDictionary } from "@/i18n/types";
import type { Dictionary } from "@/i18n/types";

export interface ConfiguratorFormState {
  projectSlugs: string[];
  customProject: boolean;
  sector: string;
  companySize: string;
  description: string;
  modules: string[];
  userCount: string;
  integrations: string[];
  needsMobile: boolean;
  needsMultiSite: boolean;
  existingSystems: string;
  timeline: string;
  company: string;
  contactName: string;
  email: string;
  phone: string;
}

export const initialFormState: ConfiguratorFormState = {
  projectSlugs: [],
  customProject: false,
  sector: "",
  companySize: "",
  description: "",
  modules: [],
  userCount: "",
  integrations: [],
  needsMobile: false,
  needsMultiSite: false,
  existingSystems: "",
  timeline: "",
  company: "",
  contactName: "",
  email: "",
  phone: "",
};

export type ComplexityLevel = "simple" | "standard" | "advanced" | "enterprise";

export function estimateComplexity(state: ConfiguratorFormState): ComplexityLevel {
  let score = 0;

  score += state.projectSlugs.length;
  if (state.customProject) score += 2;
  score += Math.min(state.modules.length, 6);
  if (state.userCount === "21-100") score += 1;
  if (state.userCount === "100+") score += 2;
  score += state.integrations.length;
  if (state.needsMobile) score += 2;
  if (state.needsMultiSite) score += 2;
  if (state.timeline === "urgent") score += 1;

  if (score <= 4) return "simple";
  if (score <= 8) return "standard";
  if (score <= 13) return "advanced";
  return "enterprise";
}

function labelFor<T extends { id: string; label: string }>(
  items: T[],
  id: string
): string {
  return items.find((i) => i.id === id)?.label ?? id;
}

export function buildSpecification(
  state: ConfiguratorFormState,
  dict: ConfiguratorDictionary,
  appsDict: Dictionary["apps"]
): { project: string; needs: string; technical: string; planning: string } {
  const cfg = dict;

  const projectNames = state.projectSlugs
    .map((slug) => appsDict[slug]?.name ?? slug)
    .join(", ");

  const types =
    [
      projectNames,
      state.customProject ? cfg.step1.customProject : null,
    ]
      .filter(Boolean)
      .join(" + ") || cfg.none;

  const project = [
    `• ${cfg.step1.sectorLabel}: ${labelFor(cfg.step1.sectors, state.sector) || cfg.none}`,
    `• ${cfg.step1.companySizeLabel}: ${labelFor(cfg.step1.sizes, state.companySize) || cfg.none}`,
    `• ${cfg.step1.projectTypesLabel}: ${types}`,
    state.description ? `• ${state.description}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const moduleLabels = state.modules
    .map((id) => cfg.step2.modules.find((m) => m.id === id)?.label ?? id)
    .join(", ");

  const needs = moduleLabels || cfg.none;

  const integrationLabels = state.integrations
    .map((id) => cfg.step3.integrations.find((i) => i.id === id)?.label ?? id)
    .join(", ");

  const technical = [
    `• ${cfg.step3.usersLabel}: ${labelFor(cfg.step3.users, state.userCount) || cfg.none}`,
    `• ${cfg.step3.integrationsLabel}: ${integrationLabels || cfg.none}`,
    `• ${cfg.step3.mobile}: ${state.needsMobile ? cfg.yes : cfg.no}`,
    `• ${cfg.step3.multiSite}: ${state.needsMultiSite ? cfg.yes : cfg.no}`,
    state.existingSystems
      ? `• ${cfg.step3.existingLabel}: ${state.existingSystems}`
      : "",
  ]
    .filter(Boolean)
    .join("\n");

  const complexity = estimateComplexity(state);
  const complexityLabel = cfg.step4.complexityLevels[complexity];

  const planning = [
    `• ${cfg.step4.timelineLabel}: ${labelFor(cfg.step4.timelines, state.timeline) || cfg.none}`,
    `• ${cfg.step4.complexityLabel}: ${complexityLabel}`,
    `• ${cfg.step4.priceNote}`,
  ].join("\n");

  return { project, needs, technical, planning };
}

export function getStepBlockers(
  step: number,
  state: ConfiguratorFormState,
  messages: {
    project: string;
    sector: string;
    companySize: string;
    description: string;
    modules: string;
    users: string;
    timeline: string;
    contact: string;
  }
): string[] {
  const blockers: string[] = [];

  switch (step) {
    case 0:
      if (!(state.projectSlugs.length > 0 || state.customProject)) {
        blockers.push(messages.project);
      }
      if (!state.sector) blockers.push(messages.sector);
      if (!state.companySize) blockers.push(messages.companySize);
      if (state.description.trim().length < 20) blockers.push(messages.description);
      break;
    case 1:
      if (state.modules.length === 0) blockers.push(messages.modules);
      break;
    case 2:
      if (!state.userCount) blockers.push(messages.users);
      break;
    case 3:
      if (!state.timeline) blockers.push(messages.timeline);
      break;
    case 4:
      if (!canProceedStep(4, state)) blockers.push(messages.contact);
      break;
  }

  return blockers;
}

export function canProceedStep(step: number, state: ConfiguratorFormState): boolean {
  switch (step) {
    case 0:
      return (
        (state.projectSlugs.length > 0 || state.customProject) &&
        !!state.sector &&
        !!state.companySize &&
        state.description.trim().length >= 20
      );
    case 1:
      return state.modules.length > 0;
    case 2:
      return !!state.userCount;
    case 3:
      return !!state.timeline;
    case 4:
      return (
        !!state.company.trim() &&
        !!state.contactName.trim() &&
        !!state.email.trim() &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)
      );
    default:
      return false;
  }
}

// Map app slugs to default modules for pre-fill
export const slugToModules: Record<string, string[]> = {
  "crm-pro": ["crm", "reporting"],
  "gestion-stock": ["stock", "reporting"],
  "facturation-express": ["facturation", "reporting"],
  "rh-paie": ["rh", "reporting"],
  "suivi-dossiers": ["dossiers", "reporting"],
  "reservation-pro": ["reservation", "reporting"],
  "refonte-sites": ["refonte-site", "seo", "mobile"],
  "branding-identite": ["branding", "refonte-site"],
  "referencement-seo": ["seo", "reporting"],
  "google-ads-sea": ["google-ads", "reporting"],
  "marketing-digital": ["marketing-digital", "seo", "reporting"],
  "e-commerce": ["ecommerce", "facturation", "stock"],
  "ia-automatisation": ["ia", "api", "reporting"],
  "hebergement": ["hebergement", "api"],
};
