"use client"

import { useLanguage } from "@/hooks/use-language"
import { motion } from "framer-motion"
import { Award, BriefcaseBusiness, Layers3, TerminalSquare } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const statsContent = {
  fr: {
    title: "Quelques chiffres",
    stats: [
      { value: "5", label: "Années d'études", suffix: "ème" },
      { value: "3", label: "Stages réalisés", suffix: "+" },
      { value: "20", label: "Projets développés", suffix: "+" },
      { value: "10", label: "Technologies maîtrisées", suffix: "+" },
    ],
  },
  en: {
    title: "Some numbers",
    stats: [
      { value: "5", label: "Years of study", suffix: "th" },
      { value: "3", label: "Internships completed", suffix: "+" },
      { value: "20", label: "Projects developed", suffix: "+" },
      { value: "10", label: "Technologies mastered", suffix: "+" },
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
              whileHover={{ scale: 1.05 }}
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
                <motion.div
                  className="text-4xl lg:text-5xl font-black text-primary mb-2"
                  initial={{ scale: 0 }}
                  animate={isVisible ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: index * 0.2 + 0.5, duration: 0.5, type: "spring" }}
                >
                  {stat.value}
                  <span className="text-2xl lg:text-3xl">{stat.suffix}</span>
                </motion.div>
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
