"use client"

import { useLanguage } from "@/hooks/use-language"
import SectionTitle from "./section-title"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import {
  ArrowRight,
  Boxes,
  BrainCircuit,
  Code2,
  Database,
  GitBranch,
  Network,
  ServerCog,
  ShieldCheck,
} from "lucide-react"
import GitHubRepos from "./github-repos"

const projectContent = {
  fr: {
    title: "Projets sélectionnés",
    caseLabel: "Étude de cas principale",
    caseTitle: "FireLIS / OpenELIS",
    caseSubtitle: "Système d'Information de Laboratoire (LIS) moderne, hautement interopérable et conforme aux standards FHIR.",
    challenge:
      "Analyser, concevoir et moderniser un système d'information de santé critique, en assurant le reverse engineering d'API existantes et le catalogage conforme aux exigences FHIR.",
    solution:
      "Architecture microservices avec Spring Boot et React, implémentant des endpoints interopérables, la sécurisation des flux de données cliniques et un pipeline CI/CD robuste.",
    impact: ["Standard FHIR", "Architecture API", "Reverse Engineering", "CI/CD & DevOps"],
    architectureTitle: "Architecture & Interopérabilité",
    architecture: [
      { label: "Client", detail: "React & Next.js", icon: Code2 },
      { label: "API Services", detail: "Spring Boot Microservices", icon: ServerCog },
      { label: "Standard", detail: "Interopérabilité FHIR", icon: BrainCircuit },
      { label: "Bases de données", detail: "PostgreSQL / MySQL", icon: Database },
      { label: "DevOps & Cloud", detail: "Docker & CI/CD", icon: Boxes },
    ],
    projects: [
      {
        name: "PharmaLive",
        type: "Enterprise App",
        description: "Développement d'un SI complet de gestion de pharmacie (Java, MySQL) intégrant le contrôle des stocks et la gestion des rôles utilisateurs.",
        stack: ["Java", "MySQL", "Spring Boot"],
      },
      {
        name: "Architecture Réseau d'Entreprise",
        type: "Systems",
        description: "Déploiement virtuel d'une infrastructure pour 100 utilisateurs avec Active Directory, DHCP, et DNS sous Windows Server.",
        stack: ["Windows Server", "Active Directory", "DHCP", "DNS", "Virtualisation"],
      },
      {
        name: "Student Management API",
        type: "Backend",
        description: "API REST complète avec opérations CRUD, documentation Swagger et déploiement Docker.",
        stack: ["Spring Boot 3", "JPA", "MySQL", "Swagger", "Docker"],
      },
    ],
  },
  en: {
    title: "Selected Projects",
    caseLabel: "Main case study",
    caseTitle: "FireLIS / OpenELIS",
    caseSubtitle: "Modern Laboratory Information System (LIS), highly interoperable and compliant with FHIR standards.",
    challenge:
      "Analyze, design, and modernize a critical healthcare information system, ensuring reverse engineering of existing APIs and mapping compliant with FHIR requirements.",
    solution:
      "Microservices architecture built with Spring Boot and React, implementing interoperable endpoints, secure clinical data flows, and a robust CI/CD pipeline.",
    impact: ["FHIR Standards", "API Architecture", "Reverse Engineering", "CI/CD & DevOps"],
    architectureTitle: "Architecture & Interoperability",
    architecture: [
      { label: "Client", detail: "React & Next.js", icon: Code2 },
      { label: "API Services", detail: "Spring Boot Microservices", icon: ServerCog },
      { label: "Standard", detail: "FHIR Interoperability", icon: BrainCircuit },
      { label: "Databases", detail: "PostgreSQL / MySQL", icon: Database },
      { label: "DevOps & Cloud", detail: "Docker & CI/CD", icon: Boxes },
    ],
    projects: [
      {
        name: "PharmaLive",
        type: "Enterprise App",
        description: "Development of a comprehensive pharmacy management IS (Java, MySQL) integrating stock control and user role management.",
        stack: ["Java", "MySQL", "Spring Boot"],
      },
      {
        name: "Enterprise Network Architecture",
        type: "Systems",
        description: "Virtual deployment of an infrastructure for 100 users with Active Directory, DHCP, and DNS under Windows Server.",
        stack: ["Windows Server", "Active Directory", "DHCP", "DNS", "Virtualization"],
      },
      {
        name: "Student Management API",
        type: "Backend",
        description: "Complete REST API with CRUD operations, Swagger documentation and Docker deployment.",
        stack: ["Spring Boot 3", "JPA", "MySQL", "Swagger", "Docker"],
      },
    ],
  },
}

export default function Projects() {
  const { lang } = useLanguage()
  const content = projectContent[lang]
  const { ref, isVisible } = useScrollReveal()

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
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.95fr]">
          <div className="p-6 lg:p-8">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold uppercase text-primary">
              <BrainCircuit size={14} />
              {content.caseLabel}
            </p>
            <h3 className="text-3xl font-black text-foreground">{content.caseTitle}</h3>
            <p className="mt-2 max-w-2xl text-base font-semibold text-foreground/80">{content.caseSubtitle}</p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-border/70 bg-background/45 p-4">
                <p className="mb-2 text-xs font-bold uppercase text-muted-foreground">Problem</p>
                <p className="text-sm leading-relaxed text-foreground/82">{content.challenge}</p>
              </div>
              <div className="rounded-lg border border-border/70 bg-background/45 p-4">
                <p className="mb-2 text-xs font-bold uppercase text-muted-foreground">Solution</p>
                <p className="text-sm leading-relaxed text-foreground/82">{content.solution}</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
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

          <div className="border-t border-border/70 bg-background/35 p-6 lg:border-l lg:border-t-0 lg:p-8">
            <p className="mb-4 flex items-center gap-2 text-sm font-bold text-foreground">
              <GitBranch size={16} className="text-primary" />
              {content.architectureTitle}
            </p>
            <div className="space-y-3">
              {content.architecture.map((node, index) => {
                const Icon = node.icon
                return (
                  <div key={node.label} className="flex items-center gap-3">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-border/70 bg-card text-primary">
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0 flex-1 rounded-lg border border-border/70 bg-card/55 p-3">
                      <p className="font-bold text-foreground">{node.label}</p>
                      <p className="text-sm text-muted-foreground">{node.detail}</p>
                    </div>
                    {index < content.architecture.length - 1 && (
                      <ArrowRight className="hidden shrink-0 text-primary/60 xl:block" size={18} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {content.projects.map((project) => (
          <motion.article
            key={project.name}
            className="relative overflow-hidden rounded-lg border border-border/70 bg-card/45 p-5 shadow-lg shadow-black/5 backdrop-blur transition-colors hover:border-primary/45 hover:bg-card/70"
            variants={cardVariants}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-bold uppercase text-primary">{project.type}</p>
                <h3 className="text-xl font-black text-foreground">{project.name}</h3>
              </div>
              <Network className="mt-1 text-primary/70" size={20} />
            </div>

            <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

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

      <div className="mt-16 pt-16 border-t border-border/70">
        <GitHubRepos />
      </div>
    </section>
  )
}
