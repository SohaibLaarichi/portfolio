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

const projectContent = {
  fr: {
    title: "Projets sélectionnés",
    caseLabel: "Étude de cas principale",
    caseTitle: "Mkhademia",
    caseSubtitle: "Plateforme full-stack de gestion d'interventions, pensée comme un produit métier et une architecture fiable.",
    challenge:
      "Structurer une application capable de centraliser les demandes, suivre les interventions, organiser les utilisateurs et fiabiliser les données opérationnelles.",
    solution:
      "Architecture full-stack avec séparation claire entre interface, API, base de données et sécurité, avec une logique prête pour les rôles, le suivi métier et le déploiement.",
    impact: ["Workflow métier", "Architecture API", "Gestion des rôles", "UI responsive"],
    architectureTitle: "Architecture applicative",
    architecture: [
      { label: "Client", detail: "Next.js UI", icon: Code2 },
      { label: "API", detail: "Node.js services", icon: ServerCog },
      { label: "Data", detail: "MongoDB models", icon: Database },
      { label: "Security", detail: "Auth + roles", icon: ShieldCheck },
      { label: "Deploy", detail: "Docker-ready", icon: Boxes },
    ],
    projects: [
      {
        name: "Infrastructure Réseau",
        type: "Systems",
        description:
          "Déploiement Windows Server avec Active Directory, DHCP, DNS et gestion centralisée des utilisateurs.",
        stack: ["Windows Server", "ADDS", "DHCP", "DNS", "GPO"],
      },
      {
        name: "Solution NAC",
        type: "Security",
        description:
          "Implémentation d'une logique de contrôle d'accès réseau avec Cisco ISE et segmentation des accès.",
        stack: ["Cisco ISE", "NAC", "VLAN", "Security"],
      },
      {
        name: "PharmaLive",
        type: "Enterprise App",
        description:
          "Application métier de gestion de pharmacie couvrant stock, ventes et données opérationnelles.",
        stack: ["Java EE", "PostgreSQL", "Business Logic"],
      },
      {
        name: "Student Management API",
        type: "Backend",
        description:
          "API REST structurée avec CRUD, documentation Swagger, persistance MySQL et conteneurisation.",
        stack: ["Spring Boot", "JPA", "MySQL", "Swagger", "Docker"],
      },
    ],
  },
  en: {
    title: "Selected Projects",
    caseLabel: "Main case study",
    caseTitle: "Firelis",
    caseSubtitle: "Full-stack intervention management platform designed as both a business product and a reliable architecture.",
    challenge:
      "Structure an application able to centralize requests, track interventions, organize users, and keep operational data reliable.",
    solution:
      "Full-stack architecture with clear separation between UI, API, database, and security, with logic prepared for roles, business tracking, and deployment.",
    impact: ["Business workflow", "API architecture", "Role management", "Responsive UI"],
    architectureTitle: "Application architecture",
    architecture: [
      { label: "Client", detail: "Next.js UI", icon: Code2 },
      { label: "API", detail: "Node.js services", icon: ServerCog },
      { label: "Data", detail: "MongoDB models", icon: Database },
      { label: "Security", detail: "Auth + roles", icon: ShieldCheck },
      { label: "Deploy", detail: "Docker-ready", icon: Boxes },
    ],
    projects: [
      {
        name: "Network Infrastructure",
        type: "Systems",
        description:
          "Windows Server deployment with Active Directory, DHCP, DNS, and centralized user management.",
        stack: ["Windows Server", "ADDS", "DHCP", "DNS", "GPO"],
      },
      {
        name: "NAC Solution",
        type: "Security",
        description: "Network access control logic using Cisco ISE and segmented access design.",
        stack: ["Cisco ISE", "NAC", "VLAN", "Security"],
      },
      {
        name: "PharmaLive",
        type: "Enterprise App",
        description: "Pharmacy management business application covering stock, sales, and operational data.",
        stack: ["Java EE", "PostgreSQL", "Business Logic"],
      },
      {
        name: "Student Management API",
        type: "Backend",
        description: "Structured REST API with CRUD, Swagger documentation, MySQL persistence, and Docker.",
        stack: ["Spring Boot", "JPA", "MySQL", "Swagger", "Docker"],
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
    </section>
  )
}
