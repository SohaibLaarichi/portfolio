"use client"

import { useLanguage } from "@/hooks/use-language"
import SectionTitle from "./section-title"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { motion } from "framer-motion"
import { CloudCog, HeartPulse, Layers3 } from "lucide-react"

const expertise = {
  fr: [
    {
      icon: Layers3,
      label: "Product Engineering",
      title: "Applications full stack",
      description: "Interfaces lisibles, APIs robustes et architectures pensées pour évoluer avec le produit.",
      technologies: ["Java", "Spring Boot", "Next.js", "React"],
    },
    {
      icon: CloudCog,
      label: "Cloud Delivery",
      title: "Du code à la production",
      description: "Conteneurisation, automatisation et déploiements reproductibles sur des environnements cloud.",
      technologies: ["Docker", "Kubernetes", "CI/CD", "Azure"],
    },
    {
      icon: HeartPulse,
      label: "HealthTech Interoperability",
      title: "Données de santé connectées",
      description: "Intégration de systèmes hospitaliers et de laboratoires autour de standards internationaux.",
      technologies: ["FHIR R4", "HL7 v2", "ASTM", "Mirth Connect"],
    },
  ],
  en: [
    {
      icon: Layers3,
      label: "Product Engineering",
      title: "Full stack applications",
      description: "Clear interfaces, reliable APIs and architectures designed to scale with the product.",
      technologies: ["Java", "Spring Boot", "Next.js", "React"],
    },
    {
      icon: CloudCog,
      label: "Cloud Delivery",
      title: "From code to production",
      description: "Containerization, automation and repeatable deployments across cloud environments.",
      technologies: ["Docker", "Kubernetes", "CI/CD", "Azure"],
    },
    {
      icon: HeartPulse,
      label: "HealthTech Interoperability",
      title: "Connected healthcare data",
      description: "Hospital and laboratory system integration around international standards.",
      technologies: ["FHIR R4", "HL7 v2", "ASTM", "Mirth Connect"],
    },
  ],
}

export default function Skills() {
  const { lang } = useLanguage()
  const { ref, isVisible } = useScrollReveal()
  const items = expertise[lang]

  return (
    <section className="mx-auto max-w-6xl border-t border-stroke px-6 py-20" ref={ref}>
      <SectionTitle>{lang === "fr" ? "Expertise" : "Expertise"}</SectionTitle>
      <p className="-mt-3 mb-10 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
        {lang === "fr"
          ? "Trois domaines complémentaires pour concevoir, livrer et connecter des produits logiciels fiables."
          : "Three complementary areas for designing, shipping and connecting reliable software products."}
      </p>

      <div className="grid gap-4 lg:grid-cols-3">
        {items.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.article
              key={item.label}
              className="premium-card group flex min-h-[19rem] flex-col rounded-3xl border border-stroke bg-card/55 p-6"
              initial={{ opacity: 0, y: 18 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.42, delay: index * 0.08 }}
            >
              <div className="mb-10 grid h-11 w-11 place-items-center rounded-2xl border border-stroke bg-surface text-accent">
                <Icon size={20} />
              </div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-accent">{item.label}</p>
              <h3 className="mt-2 text-2xl font-black tracking-tight text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
              <div className="mt-auto flex flex-wrap gap-2 pt-6">
                {item.technologies.map((technology) => (
                  <span key={technology} className="rounded-full border border-stroke bg-surface px-3 py-1 text-xs font-semibold text-muted-foreground">
                    {technology}
                  </span>
                ))}
              </div>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
