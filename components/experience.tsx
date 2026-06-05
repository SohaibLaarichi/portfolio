"use client"

import { useLanguage } from "@/hooks/use-language"
import { experienceContent } from "@/lib/content"
import SectionTitle from "./section-title"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import { BriefcaseBusiness, Code2, Database, Network, ServerCog, ShieldCheck, Sparkles } from "lucide-react"

const experienceMeta = {
  fr: {
    intro: "Un parcours qui relie développement full-stack, systèmes, réseau et sécurité.",
    featured: "Expérience principale",
    context: "Contexte",
    contribution: "Contribution",
    stack: "Stack & outils",
    impact: ["Full-stack delivery", "API integration", "Database modeling", "Product workflow"],
    domains: [
      { label: "Software", icon: Code2, note: "frontend, backend, logique métier" },
      { label: "Systems", icon: ServerCog, note: "Windows Server, ADDS, GPO" },
      { label: "Network", icon: Network, note: "VLAN, DHCP, DNS, switches" },
      { label: "Security", icon: ShieldCheck, note: "accès, segmentation, authentification" },
    ],
    types: ["Software", "Software", "Systems", "Network"],
  },
  en: {
    intro: "A path connecting full-stack development, systems, networking, and security.",
    featured: "Featured experience",
    context: "Context",
    contribution: "Contribution",
    stack: "Stack & tools",
    impact: ["Full-stack delivery", "API integration", "Database modeling", "Product workflow"],
    domains: [
      { label: "Software", icon: Code2, note: "frontend, backend, business logic" },
      { label: "Systems", icon: ServerCog, note: "Windows Server, ADDS, GPO" },
      { label: "Network", icon: Network, note: "VLAN, DHCP, DNS, switches" },
      { label: "Security", icon: ShieldCheck, note: "access, segmentation, authentication" },
    ],
    types: ["Software", "Software", "Systems", "Network"],
  },
}

export default function Experience() {
  const { lang } = useLanguage()
  const content = experienceContent[lang]
  const meta = experienceMeta[lang]
  const { ref, isVisible } = useScrollReveal()
  const [featured, ...history] = content.experiences

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: "easeOut" } },
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 border-t border-border/70" ref={ref}>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <SectionTitle>{content.title}</SectionTitle>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{meta.intro}</p>
        </div>
      </div>

      <motion.div initial="hidden" animate={isVisible ? "visible" : "hidden"} variants={containerVariants}>
        <motion.article
          className="mb-6 overflow-hidden rounded-lg border border-primary/25 bg-card/55 shadow-xl shadow-black/5 backdrop-blur"
          variants={cardVariants}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="p-6 lg:p-8">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold uppercase text-primary">
                <Sparkles size={14} />
                {meta.featured}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-3xl font-black text-foreground">{featured.position}</h3>
                  <p className="mt-1 font-semibold text-primary">{featured.company}</p>
                </div>
                <span className="w-fit rounded-full border border-border/60 bg-background/50 px-3 py-1 text-xs font-semibold text-muted-foreground">
                  {featured.duration}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg border border-border/70 bg-background/45 p-4">
                  <p className="mb-2 text-xs font-bold uppercase text-muted-foreground">{meta.context}</p>
                  <p className="text-sm leading-relaxed text-foreground/84">{featured.description}</p>
                </div>
                <div className="rounded-lg border border-border/70 bg-background/45 p-4">
                  <p className="mb-2 text-xs font-bold uppercase text-muted-foreground">{meta.contribution}</p>
                  <ul className="space-y-2 text-sm leading-relaxed text-foreground/84">
                    {featured.tasks.slice(0, 3).map((task) => (
                      <li key={task} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {meta.impact.map((item) => (
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
                <Database size={16} className="text-primary" />
                {meta.stack}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {featured.stack.map((tech) => (
                  <div key={tech} className="rounded-lg border border-border/70 bg-card/55 p-4">
                    <p className="font-mono text-xs text-muted-foreground">tool</p>
                    <p className="mt-1 font-bold text-foreground">{tech}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.article>

        <motion.div className="grid grid-cols-1 lg:grid-cols-[0.72fr_1.28fr] gap-5" variants={cardVariants}>
          <aside className="rounded-lg border border-border/70 bg-card/45 p-5 shadow-lg shadow-black/5 backdrop-blur">
            <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase text-primary">
              <BriefcaseBusiness size={15} />
              engineering path
            </p>
            <div className="space-y-3">
              {meta.domains.map((domain, index) => {
                const Icon = domain.icon
                return (
                  <div key={domain.label} className="rounded-lg border border-border/70 bg-background/45 p-4">
                    <div className="mb-2 flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                        <Icon size={17} />
                      </div>
                      <div>
                        <p className="font-bold text-foreground">{domain.label}</p>
                        <p className="text-xs text-muted-foreground">0{index + 1}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{domain.note}</p>
                  </div>
                )
              })}
            </div>
          </aside>

          <div className="space-y-4">
            {history.map((exp, index) => (
              <motion.article
                key={`${exp.company}-${exp.duration}`}
                className="rounded-lg border border-border/70 bg-card/45 p-5 shadow-lg shadow-black/5 backdrop-blur transition-colors hover:border-primary/45 hover:bg-card/70"
                variants={cardVariants}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase text-primary">{meta.types[index + 1]}</p>
                    <h3 className="text-xl font-black text-foreground">{exp.position}</h3>
                    <p className="mt-1 font-semibold text-primary">{exp.company}</p>
                  </div>
                  <span className="w-fit rounded-full border border-border/60 bg-background/50 px-3 py-1 text-xs font-semibold text-muted-foreground">
                    {exp.duration}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-foreground/84">{exp.description}</p>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {exp.tasks.slice(0, 2).map((task) => (
                    <div key={task} className="rounded-lg border border-border/70 bg-background/35 p-3 text-sm text-muted-foreground">
                      {task}
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border/70 bg-background/45 px-2.5 py-1 text-xs font-semibold text-foreground/82"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
