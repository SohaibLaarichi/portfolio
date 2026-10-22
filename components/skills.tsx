"use client"

import { useLanguage } from "@/hooks/use-language"
import { skillsContent } from "@/lib/content"
import SectionTitle from "./section-title"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import { useState } from "react"
import { Cloud, Code2, Database, Layers3, Network, Search, ShieldCheck, Workflow } from "lucide-react"
import { BrandIcon } from "./icons/brand-icons"
import { SpotlightCard } from "./ui/spotlight-card"
import { SkillRadarChart } from "./ui/skill-radar-chart"

const categoryMeta = [
  {
    icon: Code2,
  },
  {
    icon: Layers3,
  },
  {
    icon: Database,
  },
  {
    icon: Cloud,
  },
  {
    icon: ShieldCheck,
  },
  {
    icon: Workflow,
  },
]

export default function Skills() {
  const { lang } = useLanguage()
  const content = skillsContent[lang]
  const { ref, isVisible } = useScrollReveal()
  const [searchTerm, setSearchTerm] = useState("")

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.08 },
    },
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: "easeOut" } },
  }

  const labels =
    lang === "fr"
      ? {
          profile: "Profil technique",
          stack: "Stack full-stack",
          scroll: "Compétences classées par usage réel",
          searchPlaceholder: "Rechercher une compétence (ex: React, Java, FHIR, Docker)...",
          core: "principal",
          architecture: "architecture",
          security: "sécurité",
        }
      : {
          profile: "Technical profile",
          stack: "Full-stack stack",
          scroll: "Native scroll, guided reading",
          searchPlaceholder: "Search for a skill (e.g. React, Java, FHIR, Docker)...",
          core: "core",
          architecture: "architecture",
          security: "security",
        }
  const practiceLabels =
    lang === "fr"
      ? ["Expertise principale", "Expertise principale", "Pratique régulière", "Pratique projet", "Socle technique", "Méthodes de travail"]
      : ["Core expertise", "Core expertise", "Regular practice", "Project practice", "Technical foundation", "Working methods"]

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 border-t border-stroke" ref={ref}>
      <SectionTitle>{content.title}</SectionTitle>

      {/* Live Search Input */}
      <div className="mb-8 max-w-xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={17} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={labels.searchPlaceholder}
            className="w-full rounded-full border border-stroke bg-surface py-2.5 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 backdrop-blur-xl transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-6 lg:gap-8 items-start">
        <aside className="lg:sticky lg:top-24 lg:self-start space-y-4">
          <SkillRadarChart />

          <div className="glass-card rounded-2xl border border-stroke bg-card/45 p-4 shadow-xl backdrop-blur-xl">
            <p className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase text-accent">
              <Network size={14} />
              {labels.profile}
            </p>
            <h4 className="text-lg font-black leading-tight text-foreground">{labels.stack}</h4>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {lang === "fr"
                ? "Une base full-stack solide (Spring Boot & Next.js) propulsée par l'ingénierie DevOps et le socle systèmes/réseau."
                : "A solid full-stack foundation (Spring Boot & Next.js) powered by DevOps engineering and systems/networking expertise."}
            </p>
          </div>
        </aside>

        <motion.div
          className="space-y-4"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {content.categories.map((category, index) => {
            const meta = categoryMeta[index] ?? categoryMeta[0]
            const Icon = meta.icon

            return (
              <motion.article
                key={category.name}
                variants={cardVariants}
              >
                <SpotlightCard className="p-5 glass-card bg-card/45 hover:bg-card/70 transition-all duration-300">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-[0.92fr_1.08fr] md:items-start">
                    <div>
                      <div className="mb-4 flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="grid h-10 w-10 place-items-center rounded-xl bg-surface border border-stroke text-accent">
                            <Icon size={19} />
                          </div>
                          <div>
                            <h3 className="text-xl font-black text-foreground">{category.name}</h3>
                          </div>
                        </div>
                        <span className="rounded-full border border-stroke bg-surface px-3 py-1 text-xs font-bold text-accent">
                          {practiceLabels[index]}
                        </span>
                      </div>

                      <p className="text-sm leading-relaxed text-muted-foreground">{category.description}</p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill) => {
                          const isMatch =
                            searchTerm.trim() !== "" &&
                            skill.toLowerCase().includes(searchTerm.toLowerCase())
                          return (
                            <span
                              key={skill}
                              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-all ${
                                isMatch
                                  ? "border-accent bg-accent/25 text-foreground font-bold scale-105 shadow-md shadow-accent/20"
                                  : "border-stroke bg-surface text-muted-foreground hover:border-stroke-hi hover:text-foreground"
                              }`}
                            >
                              <BrandIcon name={skill} fallback={Icon} />
                              {skill}
                            </span>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
