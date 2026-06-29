import type { AppCategory } from "@/data/applications";

export interface AppTranslation {
  name: string;
  tagline: string;
  description: string;
  features: string[];
  highlights: string[];
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    catalogue: string;
    configurateur: string;
    process: string;
    order: string;
    menu: string;
    about: string;
  };
  home: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    ctaCatalogue: string;
    ctaPreview: string;
    features: { title: string; desc: string }[];
    popularTitle: string;
    popularSubtitle: string;
    seeAll: string;
    processTitle: string;
    processSubtitle: string;
    steps: { title: string; desc: string }[];
    ctaFinalTitle: string;
    ctaFinalSubtitle: string;
    ctaFinalButton: string;
    ctaConfigurator: string;
    ctaConfiguratorDesc: string;
  };
  catalogue: {
    badge: string;
    title: string;
    subtitle: string;
    all: string;
    empty: string;
    searchPlaceholder: string;
    noResults: string;
  };
  preview: {
    back: string;
    priceLabel: string;
    onRequest: string;
    delivery: string;
    orderApp: string;
    interactiveDemo: string;
    previewOf: string;
    guideStep: string;
    guideNext: string;
    guideSkip: string;
    guides: Record<
      string,
      { hint: string; steps: string[] }
    >;
  };
  order: {
    badge: string;
    title: string;
    subtitle: string;
    back: string;
    formTitle: string;
    formSubtitle: string;
    company: string;
    companyPlaceholder: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    plan: string;
    planStandard: string;
    planPro: string;
    planEnterprise: string;
    notes: string;
    notesPlaceholder: string;
    submit: string;
    submitting: string;
    disclaimer: string;
    successTitle: string;
    successMessage: string;
    errorSubmit: string;
  };
  footer: {
    tagline: string;
    product: string;
    support: string;
    legal: string;
    rights: string;
    legalNotice: string;
    privacy: string;
    about: string;
  };
  cookies: {
    message: string;
    learnMore: string;
    accept: string;
  };
  notFound: {
    title: string;
    message: string;
    back: string;
  };
  about: {
    metaTitle: string;
    metaDescription: string;
    badge: string;
    title: string;
    subtitle: string;
    missionTitle: string;
    missionText: string;
    valuesTitle: string;
    values: { title: string; desc: string }[];
    testimonialsTitle: string;
    testimonials: { quote: string; author: string; role: string }[];
    ctaTitle: string;
    ctaButton: string;
  };
  legal: {
    noticeTitle: string;
    noticeDescription: string;
    privacyTitle: string;
    privacyDescription: string;
    noticeSections: { title: string; paragraphs: string[] }[];
    privacySections: { title: string; paragraphs: string[] }[];
  };
  common: {
    popular: string;
    onRequest: string;
    deliveryDays: string;
    preview: string;
    order: string;
    getQuote: string;
    submitError: string;
  };
  categories: Record<AppCategory, string>;
  apps: Record<string, AppTranslation>;
  configurateur: ConfiguratorDictionary;
}

export interface ConfiguratorDictionary {
  metaTitle: string;
  metaDescription: string;
  badge: string;
  title: string;
  subtitle: string;
  steps: { label: string; title: string }[];
  step1: {
    projectTypesLabel: string;
    projectTypesHint: string;
    customProject: string;
    sectorLabel: string;
    sectors: { id: string; label: string }[];
    companySizeLabel: string;
    sizes: { id: string; label: string }[];
    descriptionLabel: string;
    descriptionPlaceholder: string;
  };
  step2: {
    modulesLabel: string;
    modulesHint: string;
    modules: { id: string; label: string; desc: string }[];
  };
  step3: {
    usersLabel: string;
    users: { id: string; label: string }[];
    integrationsLabel: string;
    integrations: { id: string; label: string }[];
    optionsLabel: string;
    mobile: string;
    multiSite: string;
    existingLabel: string;
    existingPlaceholder: string;
  };
  step4: {
    timelineLabel: string;
    timelines: { id: string; label: string }[];
    complexityLabel: string;
    complexityLevels: Record<string, string>;
    complexityHint: string;
    priceNote: string;
  };
  step5: {
    specTitle: string;
    specSubtitle: string;
    specSections: {
      project: string;
      needs: string;
      technical: string;
      planning: string;
    };
    contactTitle: string;
    company: string;
    companyPlaceholder: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    submit: string;
    submitting: string;
    disclaimer: string;
    successTitle: string;
    successMessage: string;
    errorSubmit: string;
    downloadPdf: string;
    draftRestored: string;
    clearDraft: string;
  };
  nav: {
    back: string;
    next: string;
    submit: string;
  };
  none: string;
  yes: string;
  no: string;
}
