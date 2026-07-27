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
    <section className="max-w-6xl mx-auto px-6 py-16 border-t border-border/70" ref={ref}>
      <SectionTitle>{content.title}</SectionTitle>

      {/* Live Search Input */}
      <div className="mb-8 max-w-xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={labels.searchPlaceholder}
            className="w-full rounded-xl border border-border/80 bg-card/60 py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 backdrop-blur"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[0.72fr_1.28fr] gap-6 lg:gap-8">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-lg border border-border/70 bg-card/50 p-5 shadow-xl shadow-black/5 backdrop-blur">
            <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase text-primary">
              <Network size={14} />
              {labels.profile}
            </p>
            <h3 className="text-2xl font-black leading-tight text-foreground">{labels.stack}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {lang === "fr"
                ? "Une base full-stack renforcée par réseau, sécurité et systèmes. C'est cette combinaison qui rend ton profil moins standard."
                : "A full-stack foundation strengthened by networking, security, and systems. This combination makes the profile less generic."}
            </p>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {[labels.core, labels.architecture, labels.security].map((item) => (
                <div key={item} className="rounded-lg border border-border/60 bg-background/45 p-3 text-center">
                  <p className="font-mono text-lg font-black text-primary">0{item.length % 3 + 1}</p>
                  <p className="text-[0.68rem] font-bold uppercase text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-lg border border-primary/20 bg-primary/10 p-3">
              <p className="text-xs font-semibold text-primary">{labels.scroll}</p>
            </div>
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
                className="group rounded-lg border border-border/70 bg-card/45 p-5 shadow-lg shadow-black/5 backdrop-blur transition-colors hover:border-primary/45 hover:bg-card/70"
                variants={cardVariants}
              >
                <div className="grid grid-cols-1 gap-5 md:grid-cols-[0.92fr_1.08fr] md:items-start">
                  <div>
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
                          <Icon size={20} />
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-foreground">{category.name}</h3>
                        </div>
                      </div>
                      <span className="rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-bold text-primary">
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
                            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
                              isMatch
                                ? "border-sky-400 bg-sky-500/25 text-sky-200 font-bold scale-110 shadow-lg shadow-sky-500/20"
                                : "border-border/70 bg-background/45 text-foreground/82 group-hover:border-primary/20"
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
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
