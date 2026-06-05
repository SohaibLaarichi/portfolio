"use client"

import { useLanguage } from "@/hooks/use-language"
import { skillsContent } from "@/lib/content"
import SectionTitle from "./section-title"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import { Cloud, Code2, Database, Layers3, Network, ShieldCheck, Workflow } from "lucide-react"

const categoryMeta = [
  {
    icon: Code2,
    level: 88,
    signal: "UI engineering",
    angle: "Interfaces rapides, propres et maintenables.",
  },
  {
    icon: Layers3,
    level: 84,
    signal: "API & logic",
    angle: "Services, logique métier et intégration backend.",
  },
  {
    icon: Database,
    level: 80,
    signal: "Data modeling",
    angle: "Modèles, relations et données opérationnelles.",
  },
  {
    icon: Cloud,
    level: 76,
    signal: "Delivery",
    angle: "Conteneurs, outils cloud et livraison fiable.",
  },
  {
    icon: ShieldCheck,
    level: 82,
    signal: "Secure systems",
    angle: "Accès, politiques, réseau et sécurité applicative.",
  },
  {
    icon: Workflow,
    level: 78,
    signal: "Engineering method",
    angle: "Analyse, UML, agile et clarté projet.",
  },
]

export default function Skills() {
  const { lang } = useLanguage()
  const content = skillsContent[lang]
  const { ref, isVisible } = useScrollReveal()

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
          scroll: "Scroll naturel, lecture guidée",
          score: "niveau",
          core: "core",
          architecture: "architecture",
          security: "security",
        }
      : {
          profile: "Technical profile",
          stack: "Full-stack stack",
          scroll: "Native scroll, guided reading",
          score: "level",
          core: "core",
          architecture: "architecture",
          security: "security",
        }

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 border-t border-border/70" ref={ref}>
      <SectionTitle>{content.title}</SectionTitle>

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
                          <p className="text-xs font-bold uppercase text-primary">{meta.signal}</p>
                          <h3 className="text-xl font-black text-foreground">{category.name}</h3>
                        </div>
                      </div>
                      <span className="rounded-full border border-border/60 bg-background/45 px-3 py-1 text-xs font-bold text-muted-foreground">
                        0{index + 1}
                      </span>
                    </div>

                    <p className="text-sm leading-relaxed text-muted-foreground">{category.description}</p>
                    <p className="mt-3 text-sm font-semibold text-foreground/80">{meta.angle}</p>
                  </div>

                  <div>
                    <div className="mb-4">
                      <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase text-muted-foreground">
                        <span>{labels.score}</span>
                        <span>{meta.level}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-secondary">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-300"
                          initial={{ width: 0 }}
                          animate={isVisible ? { width: `${meta.level}%` } : { width: 0 }}
                          transition={{ duration: 0.75, delay: index * 0.06, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-border/70 bg-background/45 px-3 py-1.5 text-xs font-semibold text-foreground/82 transition-colors group-hover:border-primary/20"
                        >
                          {skill}
                        </span>
                      ))}
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
