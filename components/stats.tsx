"use client"

import { useLanguage } from "@/hooks/use-language"
import { motion } from "framer-motion"
import { Award, BriefcaseBusiness, Layers3, TerminalSquare } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { AnimatedCounter } from "@/components/ui/animated-counter"

const statsContent = {
  fr: {
    title: "Repères professionnels & Expertise",
    stats: [
      { value: "4+", label: "Expériences professionnelles (Stages & PFE)", suffix: "" },
      { value: "Full Stack", label: "Java / Spring Boot & React / Next.js", suffix: "" },
      { value: "DevOps", label: "Docker, Kubernetes, CI/CD, Helm", suffix: "" },
      { value: "2026", label: "Diplôme d'Ingénieur d'État (EMSI MIAGE)", suffix: "" },
    ],
  },
  en: {
    title: "Professional Highlights & Expertise",
    stats: [
      { value: "4+", label: "Professional experiences (Internships & PFE)", suffix: "" },
      { value: "Full Stack", label: "Java / Spring Boot & React / Next.js", suffix: "" },
      { value: "DevOps", label: "Docker, Kubernetes, CI/CD, Helm", suffix: "" },
      { value: "2026", label: "State Engineer Degree (EMSI MIAGE)", suffix: "" },
    ],
  },
}

export default function Stats() {
  const { lang } = useLanguage()
  const content = statsContent[lang]
  const { ref, isVisible } = useScrollReveal()
  const icons = [Award, BriefcaseBusiness, Layers3, TerminalSquare]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  }

  const statVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { duration: 0.6, ease: "easeOut" as const } 
    },
  }

  return (
    <section ref={ref} className="max-w-6xl mx-auto px-6 py-14 border-t border-border/50">
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
        className="text-center"
      >
        <motion.h2 
          className="text-2xl lg:text-3xl font-black text-foreground mb-10"
          variants={statVariants}
        >
          {content.title}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {content.stats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative group"
              variants={statVariants}
              whileHover={{ y: -3 }}
            >
              <div className="h-full rounded-lg border border-border/70 bg-card/55 p-5 text-left shadow-lg shadow-black/5 backdrop-blur transition-all duration-300 hover:border-primary/45 hover:bg-card/80 hover:shadow-primary/10">
                {(() => {
                  const Icon = icons[index]
                  return (
                    <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                      <Icon size={19} />
                    </div>
                  )
                })()}
                <div className="text-3xl lg:text-4xl font-black text-primary mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm lg:text-base text-muted-foreground font-semibold">
                  {stat.label}
                </p>
              </div>

              {/* Effet de brillance au hover */}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "linear-gradient(45deg, transparent, rgba(6, 182, 212, 0.1), transparent)",
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
