import { useState } from "react"
import { useLanguage } from "@/hooks/use-language"
import SectionTitle from "./section-title"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { motion, AnimatePresence } from "framer-motion"
import type { Variants } from "framer-motion"
import Image from "next/image"
import {
  ArrowRight,
  Boxes,
  BrainCircuit,
  Code2,
  Database,
  GitBranch,
  Github,
  Info,
  ServerCog,
  Sparkles,
  X,
} from "lucide-react"
import GitHubRepos from "./github-repos"

interface ProjectItem {
  name: string
  type: string
  category: "healthtech" | "java" | "systems"
  description: string
  stack: string[]
  image?: string
  githubUrl?: string
  details?: string
}

const projectContent = {
  fr: {
    title: "Projets sélectionnés",
    filterLabel: "Filtrer par domaine :",
    caseLabel: "Projet d’ingénierie principal",
    caseTitle: "FireLIS / OpenELIS",
    caseSubtitle: "Système d’information de laboratoire modernisé pour gérer les demandes d’analyses, les échantillons, les résultats et la traçabilité.",
    challenge:
      "Moderniser des parcours de laboratoire critiques tout en préservant la fiabilité des données patient, la traçabilité des échantillons et la conformité des opérations.",
    solution:
      "Contribution full-stack aux parcours de demandes d’analyses, au catalogage et reverse engineering des API, ainsi qu’au module de surveillance de la chaîne du froid.",
    impact: ["Java / Spring Boot", "React", "FHIR", "Workflows laboratoire", "Docker / CI/CD"],
    architectureTitle: "Architecture applicative",
    evidenceTitle: "Ce que démontrent les captures",
    evidence:
      "Un parcours guidé de création de demande, la recherche patient, le suivi des échantillons et des rapports réglementaires de température.",
    contextLabel: "Problème",
    solutionLabel: "Contribution",
    galleryLabel: "Captures réelles du projet FireLIS",
    categories: [
      { id: "all", label: "Tous les projets" },
      { id: "healthtech", label: "HealthTech & FHIR" },
      { id: "java", label: "Java EE & Enterprise" },
      { id: "systems", label: "Systèmes & DevOps" },
    ],
    architecture: [
      { label: "Client", detail: "React & Next.js", icon: Code2 },
      { label: "API Services", detail: "Spring Boot Microservices", icon: ServerCog },
      { label: "Standard", detail: "Interopérabilité FHIR", icon: BrainCircuit },
      { label: "Bases de données", detail: "PostgreSQL / MySQL", icon: Database },
      { label: "DevOps & Cloud", detail: "Docker & CI/CD", icon: Boxes },
    ],
    projects: [
      {
        name: "FireINTERO",
        type: "Interopérabilité HealthTech",
        category: "healthtech" as const,
        description:
          "Plateforme multi-rôles reliant SIH, Mirth Connect, HL7, FHIR et DICOM, avec supervision des flux et dossier patient unifié.",
        stack: ["HL7 v2", "FHIR R4", "DICOM", "Mirth Connect", "OAuth2 / OIDC"],
        image: "/projects/fireintero-dashboard.png",
        details: "Plateforme reliant les Systèmes d'Information Hospitaliers (SIH) aux moteurs d'intégration Mirth Connect, permettant la normalisation automatique des messages HL7v2 vers FHIR R4 avec chiffrement des données de santé.",
      },
      {
        name: "PharmaLive",
        type: "Gestion Pharmaceutique SI",
        category: "java" as const,
        description:
          "Application web complète de gestion de pharmacie (Java EE, Servlets, JSP, MySQL) avec suivi des stocks/lots, alertes de péremption, génération de factures PDF et authentification RBAC (BCrypt).",
        stack: ["Java EE", "Servlets / JSP", "MySQL", "BCrypt", "iText PDF", "Bootstrap"],
        image: "/projects/pharmalive-dashboard.png",
        githubUrl: "https://github.com/Sohaib-Laarichi/PharmaLive",
        details: "Système complet avec gestion des utilisateurs multi-rôles (Admin, Pharmacien, Vendeur), module de vente rapide, traçabilité des lots et péremptions, et génération dynamique de reçus PDF.",
      },
      {
        name: "Architecture Réseau d'Entreprise",
        type: "Systems & Infrastructure",
        category: "systems" as const,
        description: "Déploiement virtuel d'une infrastructure pour 100 utilisateurs avec Active Directory, DHCP, et DNS sous Windows Server.",
        stack: ["Windows Server", "Active Directory", "DHCP", "DNS", "Virtualisation"],
        details: "Mise en place d'un domaine Active Directory d'entreprise avec règles GPO, segmentation VLAN, serveur DHCP redondant et DNS sécurisé sous environnement virtuel.",
      },
      {
        name: "Student Management API",
        type: "Backend & Microservices",
        category: "java" as const,
        description: "API REST complète avec opérations CRUD, documentation Swagger et déploiement Docker.",
        stack: ["Spring Boot 3", "JPA", "MySQL", "Swagger", "Docker"],
        githubUrl: "https://github.com/Sohaib-Laarichi",
        details: "API RESTful documentée avec Swagger OpenAPI, sécurisée par JWT, persistée sous MySQL avec Spring Data JPA et conteneurisée pour déploiement CI/CD.",
      },
    ],
  },
  en: {
    title: "Selected Projects",
    filterLabel: "Filter by domain:",
    caseLabel: "Main engineering project",
    caseTitle: "FireLIS / OpenELIS",
    caseSubtitle: "Modernized laboratory information system managing test orders, samples, results and end-to-end traceability.",
    challenge:
      "Modernize critical laboratory workflows while preserving patient data reliability, sample traceability and operational compliance.",
    solution:
      "Full-stack contribution to test-order workflows, API cataloging and reverse engineering, plus the cold-storage monitoring module.",
    impact: ["Java / Spring Boot", "React", "FHIR", "Laboratory workflows", "Docker / CI/CD"],
    architectureTitle: "Application architecture",
    evidenceTitle: "What the screenshots demonstrate",
    evidence:
      "A guided test-order workflow, patient search, sample tracking and regulatory temperature reporting.",
    contextLabel: "Problem",
    solutionLabel: "Contribution",
    galleryLabel: "Real screenshots from the FireLIS project",
    categories: [
      { id: "all", label: "All Projects" },
      { id: "healthtech", label: "HealthTech & FHIR" },
      { id: "java", label: "Java EE & Enterprise" },
      { id: "systems", label: "Systems & DevOps" },
    ],
    architecture: [
      { label: "Client", detail: "React & Next.js", icon: Code2 },
      { label: "API Services", detail: "Spring Boot Microservices", icon: ServerCog },
      { label: "Standard", detail: "FHIR Interoperability", icon: BrainCircuit },
      { label: "Databases", detail: "PostgreSQL / MySQL", icon: Database },
      { label: "DevOps & Cloud", detail: "Docker & CI/CD", icon: Boxes },
    ],
    projects: [
      {
        name: "FireINTERO",
        type: "HealthTech Interoperability",
        category: "healthtech" as const,
        description:
          "Multi-role platform connecting HIS, Mirth Connect, HL7, FHIR and DICOM with flow monitoring and a unified patient record.",
        stack: ["HL7 v2", "FHIR R4", "DICOM", "Mirth Connect", "OAuth2 / OIDC"],
        image: "/projects/fireintero-dashboard.png",
        details: "Interoperability bridge connecting Hospital Information Systems (HIS) with Mirth Connect integration engines, standardizing HL7v2 to FHIR R4.",
      },
      {
        name: "PharmaLive",
        type: "Pharmacy Management IS",
        category: "java" as const,
        description:
          "Comprehensive pharmacy management web application (Java EE, Servlets, JSP, MySQL) featuring stock & batch tracking, expiry alerts, PDF invoice generation, and RBAC authentication (BCrypt).",
        stack: ["Java EE", "Servlets / JSP", "MySQL", "BCrypt", "iText PDF", "Bootstrap"],
        image: "/projects/pharmalive-dashboard.png",
        githubUrl: "https://github.com/Sohaib-Laarichi/PharmaLive",
        details: "Full pharmacy management system with multi-role RBAC (Admin, Pharmacist, Seller), stock batch tracking, expiry alerts, and dynamic PDF invoice generation.",
      },
      {
        name: "Enterprise Network Architecture",
        type: "Systems & Infrastructure",
        category: "systems" as const,
        description: "Virtual deployment of an infrastructure for 100 users with Active Directory, DHCP, and DNS under Windows Server.",
        stack: ["Windows Server", "Active Directory", "DHCP", "DNS", "Virtualization"],
        details: "Enterprise Active Directory domain setup with GPO policies, VLAN segmentation, redundant DHCP and secure DNS in a virtualized environment.",
      },
      {
        name: "Student Management API",
        type: "Backend & Microservices",
        category: "java" as const,
        description: "Complete REST API with CRUD operations, Swagger documentation and Docker deployment.",
        stack: ["Spring Boot 3", "JPA", "MySQL", "Swagger", "Docker"],
        githubUrl: "https://github.com/Sohaib-Laarichi",
        details: "RESTful API documented with Swagger OpenAPI, secured via JWT, persisted with Spring Data JPA and containerized for CI/CD delivery.",
      },
    ],
  },
}

export default function Projects() {
  const { lang } = useLanguage()
  const content = projectContent[lang]
  const { ref, isVisible } = useScrollReveal()
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [selectedModalProject, setSelectedModalProject] = useState<ProjectItem | null>(null)

  const filteredProjects =
    activeCategory === "all"
      ? content.projects
      : content.projects.filter((p) => p.category === activeCategory)

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 border-t border-border/70" ref={ref}>
      <SectionTitle>{content.title}</SectionTitle>

      <motion.div
        className="mb-8 overflow-hidden rounded-lg border border-primary/25 bg-card/55 shadow-xl shadow-black/5 backdrop-blur"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="p-6 lg:p-8">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold uppercase text-primary">
              <BrainCircuit size={14} />
              {content.caseLabel}
            </p>
            <h3 className="text-3xl font-black text-foreground">{content.caseTitle}</h3>
            <p className="mt-2 max-w-2xl text-base font-semibold text-foreground/80">{content.caseSubtitle}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {content.impact.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-primary/15 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 lg:grid-cols-2" aria-label={content.galleryLabel}>
            <figure className="overflow-hidden rounded-lg border border-border/70 bg-background">
              <div className="relative aspect-[16/10]">
                <Image
                  src="/projects/firelis-order.png"
                  alt={lang === "fr" ? "Création d’une demande d’analyse dans FireLIS" : "Creating a test order in FireLIS"}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>
              <figcaption className="border-t border-border/70 px-4 py-3 text-xs font-semibold text-muted-foreground">
                {lang === "fr" ? "Parcours guidé de création d’une demande d’analyse" : "Guided test-order workflow"}
              </figcaption>
            </figure>
            <figure className="overflow-hidden rounded-lg border border-border/70 bg-background">
              <div className="relative aspect-[16/10]">
                <Image
                  src="/projects/firelis-cold-storage.png"
                  alt={lang === "fr" ? "Rapports de surveillance de la chaîne du froid FireLIS" : "FireLIS cold-storage monitoring reports"}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 30vw"
                />
              </div>
              <figcaption className="border-t border-border/70 px-4 py-3 text-xs font-semibold text-muted-foreground">
                {lang === "fr" ? "Surveillance et rapports de la chaîne du froid" : "Cold-storage monitoring and reporting"}
              </figcaption>
            </figure>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="rounded-lg border border-border/70 bg-background/45 p-4">
                <p className="mb-2 text-xs font-bold uppercase text-muted-foreground">{content.contextLabel}</p>
                <p className="text-sm leading-relaxed text-foreground/82">{content.challenge}</p>
              </div>
              <div className="rounded-lg border border-border/70 bg-background/45 p-4">
                <p className="mb-2 text-xs font-bold uppercase text-muted-foreground">{content.solutionLabel}</p>
                <p className="text-sm leading-relaxed text-foreground/82">{content.solution}</p>
              </div>
              <div className="rounded-lg border border-primary/20 bg-primary/8 p-4">
                <p className="mb-2 text-xs font-bold uppercase text-primary">{content.evidenceTitle}</p>
                <p className="text-sm leading-relaxed text-foreground/82">{content.evidence}</p>
              </div>
            </div>

          <div className="mt-6 rounded-lg border border-border/70 bg-background/35 p-5">
            <p className="mb-4 flex items-center gap-2 text-sm font-bold text-foreground">
              <GitBranch size={16} className="text-primary" />
              {content.architectureTitle}
            </p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
              {content.architecture.map((node, index) => {
                const Icon = node.icon
                return (
                  <div key={node.label} className="relative flex items-center gap-3 md:block">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-border/70 bg-card text-primary">
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0 flex-1 py-2 md:pt-3">
                      <p className="font-bold text-foreground">{node.label}</p>
                      <p className="text-sm text-muted-foreground">{node.detail}</p>
                    </div>
                    {index < content.architecture.length - 1 && (
                      <ArrowRight className="absolute right-0 top-3 hidden shrink-0 text-primary/60 md:block" size={18} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Category Filter Tabs */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm font-bold text-muted-foreground">{content.filterLabel}</p>
        <div className="flex flex-wrap gap-2">
          {content.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              type="button"
              className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-105"
                  : "border border-border/70 bg-card/40 text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key={activeCategory}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {filteredProjects.map((project) => (
          <motion.article
            key={project.name}
            onClick={() => setSelectedModalProject(project as ProjectItem)}
            className="group relative cursor-pointer overflow-hidden rounded-lg border border-border/70 bg-card/45 p-5 shadow-lg shadow-black/5 backdrop-blur transition-all hover:border-primary/50 hover:bg-card/70"
            variants={cardVariants}
            whileHover={{ y: -4 }}
          >
            {"image" in project && project.image && (
              <div className="relative -mx-5 -mt-5 mb-5 aspect-[16/9] overflow-hidden border-b border-border/70 bg-background">
                <Image
                  src={project.image}
                  alt={lang === "fr" ? `Aperçu du projet ${project.name}` : `${project.name} project preview`}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-bold uppercase text-primary">{project.type}</p>
                <h3 className="text-xl font-black text-foreground group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {"githubUrl" in project && project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="grid h-8 w-8 place-items-center rounded-md border border-border/70 bg-background/50 text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                    aria-label={`Voir le projet ${project.name} sur GitHub`}
                    title="Voir le code source sur GitHub"
                  >
                    <Github size={16} />
                  </a>
                )}
                <span className="grid h-8 w-8 place-items-center rounded-md border border-border/70 bg-background/40 text-muted-foreground group-hover:border-primary/40 group-hover:text-primary">
                  <Info size={16} />
                </span>
              </div>
            </div>

            <p className="mb-5 text-sm leading-relaxed text-muted-foreground line-clamp-3">{project.description}</p>

            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border/70 bg-background/45 px-2.5 py-1 text-xs font-semibold text-foreground/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>

      {/* Interactive Project Detail Modal */}
      <AnimatePresence>
        {selectedModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedModalProject(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl border border-primary/30 bg-card/95 p-6 sm:p-8 shadow-2xl backdrop-blur-xl z-10"
            >
              <button
                onClick={() => setSelectedModalProject(null)}
                type="button"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-border/70 bg-background/60 text-muted-foreground hover:bg-secondary hover:text-foreground"
                aria-label="Fermer"
              >
                <X size={18} />
              </button>

              <div className="mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-bold uppercase text-primary">
                  <Sparkles size={13} />
                  {selectedModalProject.type}
                </span>
                <h3 className="mt-2 text-3xl font-black text-foreground">{selectedModalProject.name}</h3>
              </div>

              {selectedModalProject.image && (
                <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-lg border border-border/70 bg-background">
                  <Image
                    src={selectedModalProject.image}
                    alt={selectedModalProject.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold uppercase text-muted-foreground mb-1">
                    {lang === "fr" ? "Aperçu & Description" : "Overview & Description"}
                  </h4>
                  <p className="text-base text-foreground/90 leading-relaxed">{selectedModalProject.description}</p>
                </div>

                {selectedModalProject.details && (
                  <div className="rounded-lg border border-border/70 bg-background/40 p-4">
                    <h4 className="text-xs font-bold uppercase text-primary mb-2">
                      {lang === "fr" ? "Détails d'Ingénierie & Fonctionnalités" : "Engineering Details & Features"}
                    </h4>
                    <p className="text-sm text-foreground/80 leading-relaxed">{selectedModalProject.details}</p>
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-bold uppercase text-muted-foreground mb-2">
                    {lang === "fr" ? "Technologies & Outils" : "Technologies & Tools"}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedModalProject.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedModalProject.githubUrl && (
                  <div className="pt-4 border-t border-border/70 flex justify-end gap-3">
                    <a
                      href={selectedModalProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-lg hover:bg-primary/90"
                    >
                      <Github size={18} />
                      <span>{lang === "fr" ? "Voir le code sur GitHub" : "View Code on GitHub"}</span>
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="mt-16 pt-16 border-t border-border/70">
        <GitHubRepos />
      </div>
    </section>
  )
}
