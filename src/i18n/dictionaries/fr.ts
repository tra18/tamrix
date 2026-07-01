import type { Dictionary } from "../types";
import { configurateurFr } from "./configurateur-fr";

export const dictionary: Dictionary = {
  meta: {
    title: "Tamrix — Applications métier sur mesure",
    description:
      "Commandez des applications métier et services digitaux avec aperçu interactif. CRM, SEO, e-commerce, IA, hébergement et plus.",
  },
  nav: {
    home: "Accueil",
    catalogue: "Catalogue",
    configurateur: "Configurateur",
    process: "Notre méthode",
    order: "Commander",
    menu: "Menu",
    about: "À propos",
  },
  home: {
    badge: "Applications métier sur mesure",
    title: "Commandez. Testez.",
    titleHighlight: "Déployez.",
    subtitle:
      "Applications métier, marketing digital, e-commerce, IA et hébergement — testez en aperçu interactif avant de commander.",
    ctaCatalogue: "Voir le catalogue",
    ctaPreview: "Essayer un aperçu",
    codeShowcase: {
      filename: "tamrix-app.config.ts",
      statusTyping: "Écriture du code en cours…",
      statusDone: "Application prête au déploiement",
      lines: [
        "// Construction de votre application métier",
        "export async function buildApp() {",
        '  const app = await tamrix.create({',
        '    modules: ["crm", "stock", "rh"],',
        '    locale: "fr",',
        "  });",
        "  await app.deploy(); // ✓ Mise en ligne",
        "}",
      ],
    },
    features: [
      {
        title: "Aperçu interactif",
        desc: "Testez chaque application en conditions réelles avant de vous engager.",
      },
      {
        title: "Livraison rapide",
        desc: "Déploiement en 14 à 28 jours selon la complexité de votre projet.",
      },
      {
        title: "Support inclus",
        desc: "Formation, maintenance et évolutions garanties pendant 12 mois.",
      },
    ],
    popularTitle: "Applications populaires",
    popularSubtitle: "Les solutions les plus demandées par nos clients",
    seeAll: "Tout voir →",
    processTitle: "Un parcours maîtrisé de bout en bout",
    processSubtitle:
      "Une méthode claire et accompagnée, de la découverte de nos solutions jusqu'à la mise en production.",
    processBadge: "Méthodologie",
    stepLabel: "Étape",
    steps: [
      {
        title: "Découverte",
        desc: "Explorez le catalogue et validez vos besoins grâce aux démos interactives.",
      },
      {
        title: "Cadrage",
        desc: "Définissez votre projet via le configurateur et recevez un devis personnalisé.",
      },
      {
        title: "Conception",
        desc: "Notre équipe adapte l'application à vos processus et à votre organisation.",
      },
      {
        title: "Déploiement",
        desc: "Livraison, formation utilisateurs et accompagnement à la mise en ligne.",
      },
    ],
    ctaFinalTitle: "Prêt à digitaliser votre activité ?",
    ctaFinalSubtitle: "Commencez par un aperçu gratuit, sans engagement.",
    ctaFinalButton: "Découvrir le catalogue",
    ctaConfigurator: "Définir mon projet",
    ctaConfiguratorDesc:
      "Questionnaire interactif pour cerner vos besoins et obtenir un devis sur mesure.",
  },
  catalogue: {
    badge: "Catalogue",
    title: "Applications métier",
    subtitle:
      "Parcourez nos solutions, testez l'aperçu interactif et commandez en quelques clics.",
    all: "Toutes",
    empty: "Aucune application dans cette catégorie.",
    searchPlaceholder: "Rechercher une application…",
    noResults: "Aucun résultat pour votre recherche.",
  },
  preview: {
    back: "Retour au catalogue",
    priceLabel: "Tarif",
    onRequest: "Sur demande",
    delivery: "Livraison en {days} jours ouvrés",
    orderApp: "Commander cette application",
    interactiveDemo: "Démo interactive",
    previewOf: "Aperçu — {name}",
    guideStep: "Guide",
    guideNext: "Suivant",
    guideSkip: "Passer",
    guides: {
      crm: {
        hint: "Explorez le pipeline commercial",
        steps: [
          "Consultez les indicateurs en haut du tableau de bord.",
          "Cliquez sur une carte opportunité pour la faire avancer dans le pipeline.",
          "Observez le déplacement automatique entre les colonnes.",
        ],
      },
      stock: {
        hint: "Gérez vos niveaux de stock",
        steps: [
          "Parcourez la liste des articles et leurs quantités.",
          "Cliquez sur un article en alerte pour simuler une réapprovisionnement.",
          "Vérifiez la mise à jour des indicateurs.",
        ],
      },
      facturation: {
        hint: "Créez et suivez vos factures",
        steps: [
          "Sélectionnez un client dans la liste.",
          "Cliquez sur « Nouvelle facture » pour générer un document.",
          "Marquez une facture comme payée pour mettre à jour la trésorerie.",
        ],
      },
      rh: {
        hint: "Pilotez vos équipes",
        steps: [
          "Consultez les effectifs et congés en attente.",
          "Cliquez sur un employé pour voir son dossier.",
          "Validez une demande de congé en un clic.",
        ],
      },
      dossiers: {
        hint: "Suivez l'avancement des dossiers",
        steps: [
          "Filtrez les dossiers par statut.",
          "Ouvrez un dossier pour voir les étapes complétées.",
          "Faites avancer un dossier vers l'étape suivante.",
        ],
      },
      reservation: {
        hint: "Planifiez vos rendez-vous",
        steps: [
          "Naviguez dans le calendrier hebdomadaire.",
          "Cliquez sur un créneau libre pour créer une réservation.",
          "Confirmez pour voir la mise à jour du planning.",
        ],
      },
      website: {
        hint: "Visualisez la refonte de votre site",
        steps: [
          "Comparez l'aperçu « Avant refonte » et « Version refondue ».",
          "Cliquez sur le bouton pour basculer entre les deux versions.",
          "Observez l'amélioration du design, du responsive et des appels à l'action.",
        ],
      },
      branding: {
        hint: "Explorez une identité visuelle",
        steps: [
          "Parcourez les palettes de couleurs proposées.",
          "Cliquez sur un style pour voir la charte s'appliquer.",
          "Imaginez votre logo et vos supports de marque.",
        ],
      },
      "seo-ranking": {
        hint: "Simulez une optimisation SEO",
        steps: [
          "Consultez l'état des audits techniques et contenus.",
          "Cliquez sur « Optimiser » pour lancer la simulation.",
          "Observez l'amélioration de visibilité estimée.",
        ],
      },
      "google-ads": {
        hint: "Pilotez une campagne publicitaire",
        steps: [
          "Consultez les indicateurs clés (clics, CTR, coût).",
          "Cliquez sur « Lancer la campagne ».",
          "Observez les métriques se mettre à jour.",
        ],
      },
      marketing: {
        hint: "Activez vos canaux marketing",
        steps: [
          "Sélectionnez les canaux à activer (social, newsletter, blog).",
          "Cliquez pour ajouter ou retirer un canal.",
          "Construisez votre stratégie multicanale.",
        ],
      },
      ecommerce: {
        hint: "Testez une boutique en ligne",
        steps: [
          "Parcourez la fiche produit démo.",
          "Cliquez sur « Ajouter au panier ».",
          "Vérifiez le compteur panier se mettre à jour.",
        ],
      },
      ia: {
        hint: "Découvrez l'automatisation IA",
        steps: [
          "Lisez le scénario d'automatisation affiché.",
          "Cliquez sur « Simuler l'automatisation ».",
          "Observez le workflow se dérouler étape par étape.",
        ],
      },
      hosting: {
        hint: "Surveillez votre hébergement",
        steps: [
          "Vérifiez le statut du serveur (en ligne).",
          "Consultez les indicateurs SSL et sauvegardes.",
          "Visualisez la fiabilité de l'infrastructure.",
        ],
      },
    },
  },
  order: {
    badge: "Commande",
    title: "Finaliser votre commande",
    subtitle: "Vous avez testé l'aperçu de {name}. Complétez le formulaire pour recevoir un devis personnalisé.",
    back: "Retour à l'aperçu",
    formTitle: "Commander {name}",
    formSubtitle: "Tarif sur demande — livraison en {days} jours",
    company: "Entreprise *",
    companyPlaceholder: "Nom de votre société",
    name: "Nom complet *",
    namePlaceholder: "Prénom Nom",
    email: "Email *",
    emailPlaceholder: "contact@entreprise.fr",
    phone: "Téléphone",
    phonePlaceholder: "+33 6 00 00 00 00",
    plan: "Formule",
    planStandard: "Standard — Sur demande",
    planPro: "Pro — Sur demande (personnalisation avancée)",
    planEnterprise: "Enterprise — Sur devis (intégrations & support dédié)",
    notes: "Besoins spécifiques",
    notesPlaceholder:
      "Décrivez vos besoins, intégrations souhaitées, nombre d'utilisateurs...",
    submit: "Envoyer ma commande",
    submitting: "Envoi en cours...",
    disclaimer: "Sans engagement. Devis détaillé envoyé sous 24h ouvrées.",
    successTitle: "Commande envoyée !",
    successMessage:
      "Nous avons bien reçu votre demande pour {name}. Un conseiller vous contactera sous 24h pour finaliser votre projet.",
    errorSubmit: "Envoi impossible. Réessayez ou contactez-nous à contact@tmrix.com",
  },
  footer: {
    tagline:
      "Applications métier professionnelles, livrées clé en main avec aperçu interactif avant commande.",
    product: "Produit",
    support: "Support",
    legal: "Légal",
    rights: "Tous droits réservés.",
    legalNotice: "Mentions légales",
    privacy: "Confidentialité",
    about: "À propos",
  },
  cookies: {
    message:
      "Nous utilisons des cookies techniques pour le bon fonctionnement du site. Aucun cookie publicitaire.",
    learnMore: "En savoir plus",
    accept: "J'accepte",
  },
  notFound: {
    title: "Page introuvable",
    message: "Cette page n'existe pas ou a été déplacée.",
    back: "Retour à l'accueil",
  },
  about: {
    metaTitle: "À propos — Tamrix",
    metaDescription:
      "Tamrix conçoit et déploie des applications métier sur mesure avec aperçu interactif avant commande.",
    badge: "Notre histoire",
    title: "Digitaliser votre métier, sans compromis",
    subtitle:
      "Tamrix accompagne les PME et ETI dans la commande d'applications métier professionnelles — livrées clé en main, avec démo interactive avant engagement.",
    missionTitle: "Notre mission",
    missionText:
      "Rendre la transformation digitale accessible : explorer, tester, commander et déployer des outils adaptés à chaque secteur, sans surprise sur le périmètre ni sur le budget.",
    valuesTitle: "Nos engagements",
    values: [
      {
        title: "Transparence",
        desc: "Aperçu interactif et cahier des charges détaillé avant tout engagement.",
      },
      {
        title: "Sur mesure",
        desc: "Chaque application est adaptée à vos processus et à votre secteur.",
      },
      {
        title: "Accompagnement",
        desc: "Formation, support et évolutions inclus pendant 12 mois.",
      },
    ],
    testimonialsTitle: "Ils nous font confiance",
    testimonials: [
      {
        quote:
          "L'aperçu nous a permis de valider le CRM avant de signer. Livraison conforme au cahier des charges.",
        author: "Sophie M.",
        role: "Directrice commerciale — Services B2B",
      },
      {
        quote:
          "Configurateur clair, équipe réactive. Notre outil de facturation est en production en 3 semaines.",
        author: "Karim B.",
        role: "Gérant — PME logistique",
      },
      {
        quote:
          "Enfin une approche structurée pour commander une application métier sans projet interminable.",
        author: "Élise D.",
        role: "DRH — Groupe industriel",
      },
    ],
    ctaTitle: "Prêt à lancer votre projet ?",
    ctaButton: "Définir mon cahier des charges",
  },
  legal: {
    noticeTitle: "Mentions légales",
    noticeDescription: "Informations légales relatives au site Tamrix.",
    privacyTitle: "Politique de confidentialité",
    privacyDescription:
      "Comment nous collectons, utilisons et protégeons vos données personnelles.",
    noticeSections: [
        {
          title: "Éditeur du site",
          paragraphs: [
            "Tamrix — contact@tmrix.com",
            "Site édité par Tamrix, plateforme de commande d'applications métier.",
          ],
        },
        {
          title: "Hébergement",
          paragraphs: [
            "Le site est hébergé par un prestataire cloud conforme aux standards de sécurité en vigueur.",
          ],
        },
        {
          title: "Propriété intellectuelle",
          paragraphs: [
            "L'ensemble des contenus du site (textes, visuels, démos) est protégé. Toute reproduction sans autorisation est interdite.",
          ],
        },
      ],
    privacySections: [
        {
          title: "Données collectées",
          paragraphs: [
            "Nous collectons les données que vous saisissez dans les formulaires de commande et de configurateur : identité, coordonnées, informations sur votre projet.",
          ],
        },
        {
          title: "Finalité",
          paragraphs: [
            "Ces données servent à traiter votre demande, vous recontacter et établir un devis personnalisé.",
          ],
        },
        {
          title: "Conservation",
          paragraphs: [
            "Les données sont conservées le temps nécessaire au traitement commercial, puis archivées conformément aux obligations légales.",
          ],
        },
        {
          title: "Vos droits",
          paragraphs: [
            "Vous pouvez demander l'accès, la rectification ou la suppression de vos données en écrivant à contact@tmrix.com.",
          ],
        },
        {
          title: "Cookies",
          paragraphs: [
            "Seuls des cookies techniques essentiels au fonctionnement du site sont utilisés. Aucun cookie publicitaire tiers.",
          ],
        },
      ],
  },
  common: {
    popular: "Populaire",
    onRequest: "Sur demande",
    deliveryDays: "Livraison estimée : {days} jours",
    preview: "Aperçu",
    order: "Commander",
    getQuote: "Obtenir un devis",
    submitError: "Envoi impossible. Réessayez ou contactez-nous à contact@tmrix.com",
  },
  categories: {
    gestion: "Gestion",
    commercial: "Commercial",
    rh: "Ressources humaines",
    finance: "Finance",
    logistique: "Logistique",
    web: "Web & digital",
    marketing: "Marketing",
    tech: "Tech & infra",
  },
  apps: {
    "crm-pro": {
      name: "CRM Pro",
      tagline: "Pilotez vos clients et opportunités commerciales",
      description:
        "Solution complète de gestion de la relation client : pipeline commercial, suivi des leads, historique des échanges et tableaux de bord en temps réel.",
      features: [
        "Pipeline Kanban personnalisable",
        "Fiches clients centralisées",
        "Rappels et tâches automatiques",
        "Export et rapports PDF",
      ],
      highlights: ["+35% de conversion", "Vue 360° client", "Multi-utilisateurs"],
    },
    "gestion-stock": {
      name: "Gestion de Stock",
      tagline: "Inventaire, alertes et traçabilité en un clic",
      description:
        "Application de gestion des stocks avec entrées/sorties, seuils d'alerte, codes-barres et synchronisation multi-entrepôts.",
      features: [
        "Inventaire temps réel",
        "Alertes stock bas",
        "Mouvements tracés",
        "Tableaux de bord logistique",
      ],
      highlights: ["Zéro rupture", "Multi-dépôts", "Historique complet"],
    },
    "facturation-express": {
      name: "Facturation Express",
      tagline: "Devis, factures et suivi des paiements",
      description:
        "Outil de facturation professionnel conforme aux normes locales, avec génération automatique de documents et relances clients.",
      features: [
        "Devis et factures PDF",
        "Suivi des paiements",
        "Relances automatiques",
        "Tableau de trésorerie",
      ],
      highlights: ["Conforme légalement", "Gain de temps", "Multi-devises"],
    },
    "rh-paie": {
      name: "RH & Paie",
      tagline: "Gérez vos équipes et bulletins de paie",
      description:
        "Plateforme RH pour la gestion des employés, congés, absences et préparation des éléments de paie.",
      features: [
        "Dossiers employés",
        "Gestion des congés",
        "Pointage et absences",
        "Exports comptables",
      ],
      highlights: ["Conformité sociale", "Self-service salarié", "Archivage sécurisé"],
    },
    "suivi-dossiers": {
      name: "Suivi de Dossiers",
      tagline: "Workflow et traçabilité de vos dossiers clients",
      description:
        "Application de suivi de dossiers avec étapes personnalisables, notifications et portail client pour le dépôt de documents.",
      features: [
        "Workflow par étapes",
        "Portail client sécurisé",
        "Notifications email/SMS",
        "Statistiques d'avancement",
      ],
      highlights: ["Transparence client", "Zéro perte", "Audit trail"],
    },
    "reservation-pro": {
      name: "Réservation Pro",
      tagline: "Agenda, créneaux et confirmations automatiques",
      description:
        "Système de prise de rendez-vous en ligne avec calendrier partagé, rappels automatiques et gestion des ressources.",
      features: [
        "Calendrier multi-agents",
        "Réservation en ligne 24/7",
        "Rappels SMS/email",
        "Synchronisation Google Calendar",
      ],
      highlights: ["Moins de no-shows", "Widget intégrable", "Multi-sites"],
    },
    "refonte-sites": {
      name: "Refonte de sites",
      tagline: "Modernisez votre présence en ligne",
      description:
        "Refonte complète de site vitrine ou corporate : design sur mesure, expérience mobile, performance et référencement naturel.",
      features: [
        "Audit UX et design responsive",
        "Maquettes interactives avant développement",
        "Optimisation SEO et temps de chargement",
        "Migration de contenu et mise en ligne",
      ],
      highlights: ["Image professionnelle", "Mobile-first", "Visibilité Google"],
    },
    "branding-identite": {
      name: "Branding & Identité",
      tagline: "Construisez une marque mémorable",
      description:
        "Création ou refonte d'identité visuelle : logo, charte graphique, typographies, palettes et déclinaisons sur tous vos supports.",
      features: [
        "Atelier de positionnement de marque",
        "Logo et charte graphique complète",
        "Templates réseaux sociaux et print",
        "Guide d'utilisation de la marque",
      ],
      highlights: ["Cohérence visuelle", "Différenciation", "Supports clés en main"],
    },
    "referencement-seo": {
      name: "Référencement SEO",
      tagline: "Gagnez en visibilité sur Google",
      description:
        "Stratégie SEO technique et éditoriale : audit, mots-clés, optimisation on-page, netlinking et suivi de positions.",
      features: [
        "Audit technique et sémantique",
        "Optimisation contenus et balises",
        "Suivi de positions et rapports",
        "Recommandations mensuelles",
      ],
      highlights: ["Trafic organique", "ROI durable", "Reporting transparent"],
    },
    "google-ads-sea": {
      name: "Google Ads & SEA",
      tagline: "Acquérez des clients via la publicité",
      description:
        "Gestion de campagnes Google Ads : Search, Display, Shopping et remarketing avec optimisation du budget et des conversions.",
      features: [
        "Configuration et structuration des campagnes",
        "Rédaction d'annonces performantes",
        "Suivi conversions et ROAS",
        "Optimisation continue du budget",
      ],
      highlights: ["Résultats mesurables", "Ciblage précis", "Expert certifié"],
    },
    "marketing-digital": {
      name: "Marketing Digital",
      tagline: "Développez votre audience en ligne",
      description:
        "Stratégie marketing multicanale : réseaux sociaux, content marketing, newsletters et campagnes d'acquisition.",
      features: [
        "Plan éditorial et calendrier",
        "Gestion réseaux sociaux",
        "Newsletters et automation",
        "Analyse des performances",
      ],
      highlights: ["Notoriété", "Engagement", "Leads qualifiés"],
    },
    "e-commerce": {
      name: "E-commerce",
      tagline: "Vendez en ligne, simplement",
      description:
        "Boutique en ligne clé en main : catalogue produits, paiement sécurisé, gestion des commandes et tableaux de bord ventes.",
      features: [
        "Catalogue et fiches produits",
        "Paiement CB et PayPal",
        "Gestion stocks et commandes",
        "Tableau de bord ventes",
      ],
      highlights: ["Vente 24/7", "Paiement sécurisé", "Évolutif"],
    },
    "ia-automatisation": {
      name: "IA & Automatisation",
      tagline: "Automatisez vos processus avec l'IA",
      description:
        "Intégration d'IA et workflows automatisés : qualification de leads, réponses clients, traitement de documents et agents métier.",
      features: [
        "Audit des processus automatisables",
        "Workflows et agents IA sur mesure",
        "Intégration CRM et outils existants",
        "Formation et accompagnement",
      ],
      highlights: ["Gain de temps", "Moins d'erreurs", "Scalable"],
    },
    hebergement: {
      name: "Hébergement",
      tagline: "Infrastructure fiable et sécurisée",
      description:
        "Hébergement web et applicatif : serveurs performants, certificat SSL, sauvegardes automatiques et monitoring 24/7.",
      features: [
        "Serveurs haute disponibilité",
        "Certificat SSL inclus",
        "Sauvegardes quotidiennes",
        "Support et monitoring",
      ],
      highlights: ["99,9 % uptime", "Sécurisé", "Support réactif"],
    },
  },
  configurateur: configurateurFr,
};
