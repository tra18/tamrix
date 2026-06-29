import type { Dictionary } from "../types";
import { configurateurEn } from "./configurateur-en";

export const dictionary: Dictionary = {
  meta: {
    title: "Tamrix — Custom business applications",
    description:
      "Order professional business applications with interactive preview before purchase. CRM, inventory, invoicing, HR and more.",
  },
  nav: {
    home: "Home",
    catalogue: "Catalog",
    configurateur: "Configurator",
    process: "How it works",
    order: "Order",
    menu: "Menu",
    about: "About",
  },
  home: {
    badge: "Custom business applications",
    title: "Order. Preview.",
    titleHighlight: "Deploy.",
    subtitle:
      "Discover our professional applications with interactive preview before ordering. CRM, inventory, invoicing, HR and more.",
    ctaCatalogue: "View catalog",
    ctaPreview: "Try a preview",
    features: [
      {
        title: "Interactive preview",
        desc: "Test each application in real conditions before committing.",
      },
      {
        title: "Fast delivery",
        desc: "Deployment in 14 to 28 days depending on project complexity.",
      },
      {
        title: "Support included",
        desc: "Training, maintenance and updates guaranteed for 12 months.",
      },
    ],
    popularTitle: "Popular applications",
    popularSubtitle: "The most requested solutions by our clients",
    seeAll: "View all →",
    processTitle: "How it works",
    processSubtitle: "From preview to production in 4 steps",
    steps: [
      { title: "Explore", desc: "Browse the catalog and try the interactive preview" },
      { title: "Order", desc: "Fill out the form with your specific requirements" },
      { title: "Customize", desc: "Our team adapts the application to your business" },
      { title: "Deploy", desc: "Delivery, training and go-live" },
    ],
    ctaFinalTitle: "Ready to digitize your business?",
    ctaFinalSubtitle: "Start with a free preview, no commitment.",
    ctaFinalButton: "Discover the catalog",
    ctaConfigurator: "Define my project",
    ctaConfiguratorDesc:
      "Interactive questionnaire to clarify your needs and get a tailored quote.",
  },
  catalogue: {
    badge: "Catalog",
    title: "Business applications",
    subtitle:
      "Browse our solutions, try the interactive preview and order in a few clicks.",
    all: "All",
    empty: "No applications in this category.",
    searchPlaceholder: "Search an application…",
    noResults: "No results for your search.",
  },
  preview: {
    back: "Back to catalog",
    priceLabel: "Pricing",
    onRequest: "On request",
    delivery: "Delivery in {days} business days",
    orderApp: "Order this application",
    interactiveDemo: "Interactive demo",
    previewOf: "Preview — {name}",
    guideStep: "Guide",
    guideNext: "Next",
    guideSkip: "Skip",
    guides: {
      crm: {
        hint: "Explore the sales pipeline",
        steps: [
          "Review the KPIs at the top of the dashboard.",
          "Click an opportunity card to move it through the pipeline.",
          "Watch it move automatically between columns.",
        ],
      },
      stock: {
        hint: "Manage inventory levels",
        steps: [
          "Browse the product list and quantities.",
          "Click a low-stock item to simulate replenishment.",
          "Check the updated indicators.",
        ],
      },
      facturation: {
        hint: "Create and track invoices",
        steps: [
          "Select a client from the list.",
          "Click « New invoice » to generate a document.",
          "Mark an invoice as paid to update cash flow.",
        ],
      },
      rh: {
        hint: "Manage your teams",
        steps: [
          "Review headcount and pending leave requests.",
          "Click an employee to view their file.",
          "Approve a leave request in one click.",
        ],
      },
      dossiers: {
        hint: "Track case progress",
        steps: [
          "Filter cases by status.",
          "Open a case to see completed steps.",
          "Move a case to the next stage.",
        ],
      },
      reservation: {
        hint: "Schedule appointments",
        steps: [
          "Navigate the weekly calendar.",
          "Click an available slot to create a booking.",
          "Confirm to see the schedule update.",
        ],
      },
    },
  },
  order: {
    badge: "Order",
    title: "Complete your order",
    subtitle:
      "You tested the preview of {name}. Complete the form to receive a personalized quote.",
    back: "Back to preview",
    formTitle: "Order {name}",
    formSubtitle: "Pricing on request — delivery in {days} days",
    company: "Company *",
    companyPlaceholder: "Your company name",
    name: "Full name *",
    namePlaceholder: "First Last",
    email: "Email *",
    emailPlaceholder: "contact@company.com",
    phone: "Phone",
    phonePlaceholder: "+1 555 000 0000",
    plan: "Plan",
    planStandard: "Standard — On request",
    planPro: "Pro — On request (advanced customization)",
    planEnterprise: "Enterprise — Custom quote (integrations & dedicated support)",
    notes: "Specific requirements",
    notesPlaceholder:
      "Describe your needs, desired integrations, number of users...",
    submit: "Submit my order",
    submitting: "Sending...",
    disclaimer: "No commitment. Detailed quote sent within 24 business hours.",
    successTitle: "Order sent!",
    successMessage:
      "We received your request for {name}. An advisor will contact you within 24 hours to finalize your project.",
    errorSubmit: "Submission failed. Please try again or email contact@tamrix.fr",
  },
  footer: {
    tagline:
      "Professional business applications, delivered turnkey with interactive preview before ordering.",
    product: "Product",
    support: "Support",
    legal: "Legal",
    rights: "All rights reserved.",
    legalNotice: "Legal notice",
    privacy: "Privacy",
    about: "About",
  },
  cookies: {
    message:
      "We use technical cookies required for the site to work. No advertising cookies.",
    learnMore: "Learn more",
    accept: "I accept",
  },
  notFound: {
    title: "Page not found",
    message: "This page does not exist or has been moved.",
    back: "Back to home",
  },
  about: {
    metaTitle: "About — Tamrix",
    metaDescription:
      "Tamrix designs and deploys custom business applications with interactive preview before ordering.",
    badge: "Our story",
    title: "Digitize your business, without compromise",
    subtitle:
      "Tamrix helps SMBs order professional business applications — delivered turnkey, with interactive demo before commitment.",
    missionTitle: "Our mission",
    missionText:
      "Make digital transformation accessible: explore, test, order and deploy tools suited to each industry, with no surprises on scope or budget.",
    valuesTitle: "Our commitments",
    values: [
      {
        title: "Transparency",
        desc: "Interactive preview and detailed requirements before any commitment.",
      },
      {
        title: "Custom fit",
        desc: "Every application is adapted to your processes and industry.",
      },
      {
        title: "Support",
        desc: "Training, support and updates included for 12 months.",
      },
    ],
    testimonialsTitle: "Trusted by our clients",
    testimonials: [
      {
        quote:
          "The preview let us validate the CRM before signing. Delivery matched the requirements document.",
        author: "Sophie M.",
        role: "Sales Director — B2B Services",
      },
      {
        quote:
          "Clear configurator, responsive team. Our invoicing tool went live in 3 weeks.",
        author: "Karim B.",
        role: "Owner — Logistics SMB",
      },
      {
        quote:
          "Finally a structured way to order a business app without an endless project.",
        author: "Élise D.",
        role: "HR Director — Industrial group",
      },
    ],
    ctaTitle: "Ready to start your project?",
    ctaButton: "Define my requirements",
  },
  legal: {
    noticeTitle: "Legal notice",
    noticeDescription: "Legal information about the Tamrix website.",
    privacyTitle: "Privacy policy",
    privacyDescription: "How we collect, use and protect your personal data.",
    noticeSections: [
      {
        title: "Publisher",
        paragraphs: [
          "Tamrix — contact@tamrix.fr",
          "Website published by Tamrix, business application ordering platform.",
        ],
      },
      {
        title: "Hosting",
        paragraphs: [
          "The site is hosted by a cloud provider meeting current security standards.",
        ],
      },
      {
        title: "Intellectual property",
        paragraphs: [
          "All site content (text, visuals, demos) is protected. Reproduction without permission is prohibited.",
        ],
      },
    ],
    privacySections: [
      {
        title: "Data collected",
        paragraphs: [
          "We collect data you enter in order and configurator forms: identity, contact details, project information.",
        ],
      },
      {
        title: "Purpose",
        paragraphs: [
          "This data is used to process your request, contact you and prepare a personalized quote.",
        ],
      },
      {
        title: "Retention",
        paragraphs: [
          "Data is kept as long as needed for sales processing, then archived per legal obligations.",
        ],
      },
      {
        title: "Your rights",
        paragraphs: [
          "You may request access, correction or deletion of your data at contact@tamrix.fr.",
        ],
      },
      {
        title: "Cookies",
        paragraphs: [
          "Only essential technical cookies are used. No third-party advertising cookies.",
        ],
      },
    ],
  },
  common: {
    popular: "Popular",
    onRequest: "On request",
    deliveryDays: "Estimated delivery: {days} days",
    preview: "Preview",
    order: "Order",
    getQuote: "Get a quote",
    submitError: "Submission failed. Please try again or email contact@tamrix.fr",
  },
  categories: {
    gestion: "Management",
    commercial: "Sales",
    rh: "Human resources",
    finance: "Finance",
    logistique: "Logistics",
  },
  apps: {
    "crm-pro": {
      name: "CRM Pro",
      tagline: "Manage your clients and sales opportunities",
      description:
        "Complete customer relationship management: sales pipeline, lead tracking, interaction history and real-time dashboards.",
      features: [
        "Customizable Kanban pipeline",
        "Centralized client records",
        "Automatic reminders and tasks",
        "PDF export and reports",
      ],
      highlights: ["+35% conversion", "360° client view", "Multi-user"],
    },
    "gestion-stock": {
      name: "Inventory Management",
      tagline: "Inventory, alerts and traceability in one click",
      description:
        "Stock management with in/out movements, alert thresholds, barcodes and multi-warehouse sync.",
      features: [
        "Real-time inventory",
        "Low stock alerts",
        "Tracked movements",
        "Logistics dashboards",
      ],
      highlights: ["Zero stockouts", "Multi-warehouse", "Full history"],
    },
    "facturation-express": {
      name: "Invoicing Express",
      tagline: "Quotes, invoices and payment tracking",
      description:
        "Professional invoicing tool compliant with local standards, with automatic document generation and client reminders.",
      features: [
        "PDF quotes and invoices",
        "Payment tracking",
        "Automatic reminders",
        "Cash flow dashboard",
      ],
      highlights: ["Legally compliant", "Time saving", "Multi-currency"],
    },
    "rh-paie": {
      name: "HR & Payroll",
      tagline: "Manage your teams and payslips",
      description:
        "HR platform for employee management, leave, absences and payroll preparation.",
      features: [
        "Employee records",
        "Leave management",
        "Time tracking and absences",
        "Accounting exports",
      ],
      highlights: ["Social compliance", "Employee self-service", "Secure archiving"],
    },
    "suivi-dossiers": {
      name: "Case Tracking",
      tagline: "Workflow and traceability for client cases",
      description:
        "Case tracking application with customizable steps, notifications and secure client portal for document upload.",
      features: [
        "Step-by-step workflow",
        "Secure client portal",
        "Email/SMS notifications",
        "Progress statistics",
      ],
      highlights: ["Client transparency", "Zero loss", "Audit trail"],
    },
    "reservation-pro": {
      name: "Booking Pro",
      tagline: "Calendar, slots and automatic confirmations",
      description:
        "Online appointment system with shared calendar, automatic reminders and resource management.",
      features: [
        "Multi-agent calendar",
        "24/7 online booking",
        "SMS/email reminders",
        "Google Calendar sync",
      ],
      highlights: ["Fewer no-shows", "Embeddable widget", "Multi-location"],
    },
  },
  configurateur: configurateurEn,
};
