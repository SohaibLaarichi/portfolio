"use client"

import { useLanguage } from "@/hooks/use-language"
import { educationContent } from "@/lib/content"
import SectionTitle from "./section-title"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { motion } from "framer-motion"

export default function Education() {
  const { lang } = useLanguage()
  const content = educationContent[lang]
  const { ref, isVisible } = useScrollReveal()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-16 border-t border-border/70" ref={ref}>
      <SectionTitle>{content.title}</SectionTitle>

      <motion.div
        className="space-y-6"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {content.education.map((edu, i) => (
          <motion.div
            key={i}
            className="pb-6 border-b border-border last:border-b-0 relative pl-11 sm:pl-12"
            variants={itemVariants}
          >
            {/* Timeline line */}
            <motion.div
              className="absolute left-0 top-2 w-8 h-8 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={isVisible ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: i * 0.15 + 0.1, duration: 0.4 }}
            >
              <motion.div
                className="w-4 h-4 rounded-full bg-primary"
                initial={{ scale: 0 }}
                animate={isVisible ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: i * 0.15 + 0.3, duration: 0.3 }}
              />
            </motion.div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-2">
              <motion.h3
                className="font-bold text-foreground"
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: i * 0.15 + 0.2, duration: 0.4 }}
              >
                {edu.degree}
              </motion.h3>
              <motion.span
                className="w-fit rounded-full border border-border/60 bg-background/50 px-3 py-1 text-xs font-semibold text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: i * 0.15 + 0.2, duration: 0.4 }}
              >
                {edu.period}
              </motion.span>
            </div>

            <motion.p
              className="text-primary mb-2"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: i * 0.15 + 0.25, duration: 0.4 }}
            >
              {edu.institution}
            </motion.p>

            <motion.p
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: i * 0.15 + 0.3, duration: 0.4 }}
            >
              {edu.description}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
