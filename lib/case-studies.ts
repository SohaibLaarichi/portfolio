export type CaseStudy = {
  slug: string
  title: string
  eyebrow: string
  summary: string
  context: string
  role: string
  contribution: string[]
  decisions: { title: string; description: string }[]
  architecture: string[]
  stack: string[]
  images: { src: string; alt: string; caption: string }[]
  repository?: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "firelis-openelis",
    title: "FireLIS / OpenELIS",
    eyebrow: "HealthTech · Interopérabilité",
    summary:
      "Modernisation de parcours de laboratoire et intégration de flux FHIR R4 et ASTM, avec une attention particulière portée à la traçabilité et à la fiabilité des données médicales.",
    context:
      "Un système d’information de laboratoire doit coordonner les demandes d’analyses, les patients, les échantillons et les équipements tout en conservant une traçabilité exploitable par les équipes métier.",
    role: "Contribution Full Stack & DevOps réalisée dans le cadre de mon stage de fin d’études chez FireThunder.",
    contribution: [
      "Développement de parcours de demandes d’analyses et de suivi des échantillons.",
      "Intégration et validation de flux conformes à FHIR R4 et aux protocoles ASTM.",
      "Optimisation de requêtes PostgreSQL et évolution de services Spring Boot.",
      "Conteneurisation et préparation du déploiement avec Docker et Kubernetes.",
    ],
    decisions: [
      {
        title: "Interopérabilité explicite",
        description: "Les échanges cliniques sont normalisés autour de FHIR R4 tandis que les automates de laboratoire communiquent via ASTM.",
      },
      {
        title: "Traçabilité métier",
        description: "Les écrans rendent visibles les étapes critiques : création de demande, identification du patient, échantillons et contrôles.",
      },
      {
        title: "Livraison reproductible",
        description: "La conteneurisation homogénéise les environnements et prépare une orchestration plus résiliente.",
      },
    ],
    architecture: ["React", "Spring Boot", "FHIR R4 / ASTM", "PostgreSQL", "Docker / Kubernetes"],
    stack: ["Java", "Spring Boot", "React", "PostgreSQL", "FHIR R4", "ASTM", "Docker", "Kubernetes"],
    images: [
      {
        src: "/projects/firelis-order.webp",
        alt: "Création d’une demande d’analyse dans FireLIS",
        caption: "Parcours guidé de création d’une demande d’analyse.",
      },
      {
        src: "/projects/firelis-cold-storage.webp",
        alt: "Rapports de surveillance de la chaîne du froid dans FireLIS",
        caption: "Surveillance et rapports de la chaîne du froid.",
      },
      {
        src: "/projects/fireintero-login.webp",
        alt: "Écran d’authentification FireINTERO",
        caption: "Point d’entrée sécurisé de la plateforme d’interopérabilité.",
      },
    ],
  },
  {
    slug: "pharmalive",
    title: "PharmaLive",
    eyebrow: "Gestion pharmaceutique · Full Stack",
    summary:
      "Système de gestion de pharmacie couvrant les stocks, les lots, les péremptions, les ventes, la facturation PDF et les droits d’accès.",
    context:
      "La gestion quotidienne d’une pharmacie exige une vue fiable sur le stock, les dates de péremption et les opérations de vente, avec des accès adaptés à chaque rôle.",
    role: "Conception et développement d’une application web complète, de la modélisation des données à l’interface de gestion.",
    contribution: [
      "Gestion des produits, lots, niveaux de stock et alertes de péremption.",
      "Mise en place de rôles Admin, Pharmacien et Vendeur.",
      "Génération de factures et reçus PDF avec iText.",
      "Protection des comptes par hachage BCrypt et contrôle d’accès RBAC.",
    ],
    decisions: [
      {
        title: "Le lot comme unité métier",
        description: "Le suivi par lot permet de rattacher quantité, date de péremption et opérations de stock.",
      },
      {
        title: "Accès par responsabilité",
        description: "Les écrans et actions disponibles sont conditionnés par le rôle de l’utilisateur.",
      },
      {
        title: "Documents opérationnels",
        description: "La facturation PDF transforme les données de vente en documents directement exploitables.",
      },
    ],
    architecture: ["Interface web", "Spring Boot / Java EE", "Services métier", "MySQL", "iText PDF"],
    stack: ["Java EE", "Spring Boot", "MySQL", "BCrypt", "iText PDF", "Bootstrap"],
    images: [
      {
        src: "/projects/pharmalive-dashboard.webp",
        alt: "Tableau de bord de l’application PharmaLive",
        caption: "Vue synthétique des opérations de la pharmacie.",
      },
      {
        src: "/projects/pharmalive-dashboard-full.webp",
        alt: "Vue complète du tableau de bord PharmaLive",
        caption: "Interface complète de suivi des stocks et de l’activité.",
      },
    ],
    repository: "https://github.com/Sohaib-Laarichi/PharmaLive",
  },
  {
    slug: "soukara",
    title: "Soukara",
    eyebrow: "E-commerce · Cloud-ready",
    summary:
      "Plateforme e-commerce full stack avec catalogue, comptes utilisateurs, cycle de commande et espace d’administration dans une architecture conteneurisée.",
    context:
      "Le projet devait réunir une expérience d’achat claire et des outils d’administration cohérents, tout en séparant proprement interface, logique métier et persistance.",
    role: "Conception de l’architecture applicative et développement du frontend, des API et des flux de données.",
    contribution: [
      "Création de l’expérience catalogue et du cycle de commande.",
      "Développement d’API Spring Boot pour les utilisateurs, produits et commandes.",
      "Modélisation relationnelle sous PostgreSQL.",
      "Conteneurisation des services pour des environnements reproductibles.",
    ],
    decisions: [
      { title: "Séparation des responsabilités", description: "Next.js porte l’expérience utilisateur tandis que Spring Boot centralise les règles métier." },
      { title: "Données transactionnelles", description: "PostgreSQL garantit un modèle relationnel adapté aux commandes et à leur cycle de vie." },
      { title: "Environnement portable", description: "Docker réduit les écarts entre développement et déploiement." },
    ],
    architecture: ["Next.js", "API Spring Boot", "Services métier", "PostgreSQL", "Docker"],
    stack: ["Next.js", "TypeScript", "Spring Boot", "PostgreSQL", "Docker", "Tailwind CSS"],
    images: [],
    repository: "https://github.com/Sohaib-Laarichi",
  },
  {
    slug: "mikhamdina",
    title: "Mikhamdina",
    eyebrow: "Marketplace · MERN",
    summary:
      "Plateforme mettant en relation freelances et entreprises, avec profils, missions et suivi des candidatures dans une interface responsive.",
    context:
      "La plateforme devait rendre la mise en relation lisible pour deux publics distincts : les entreprises qui publient des besoins et les freelances qui valorisent leur profil.",
    role: "Développement Full Stack réalisé pendant mon stage chez HA Groupe, de l’interface aux API et aux schémas MongoDB.",
    contribution: [
      "Création des parcours de profils, missions et candidatures.",
      "Développement d’API REST avec Node.js et Express.",
      "Structuration des documents et requêtes MongoDB.",
      "Optimisation du rendu et de l’expérience responsive sous Next.js.",
    ],
    decisions: [
      { title: "Deux parcours cohérents", description: "Les actions principales diffèrent selon que l’utilisateur recrute ou recherche une mission." },
      { title: "Modèle flexible", description: "MongoDB accompagne l’évolution des profils et des missions sans rigidifier les premiers usages." },
      { title: "Interface réactive", description: "Next.js et Tailwind CSS assurent une navigation claire sur ordinateur comme sur mobile." },
    ],
    architecture: ["Next.js", "API Express", "Node.js", "MongoDB", "Déploiement web"],
    stack: ["Next.js", "React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    images: [],
    repository: "https://github.com/Sohaib-Laarichi",
  },
]

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug)
}
