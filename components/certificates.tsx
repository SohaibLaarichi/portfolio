"use client"

import { useLanguage } from "@/hooks/use-language"
import { certificatesContent } from "@/lib/content"
import SectionTitle from "./section-title"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import AnimatedIcon from "./animated-icon"
import { Award } from "lucide-react"

export default function Certificates() {
  const { lang } = useLanguage()
  const content = certificatesContent[lang]
  const { ref, isVisible } = useScrollReveal()

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, type: "spring" } },
    hover: { scale: 1.05, boxShadow: "0 15px 30px rgba(6, 182, 212, 0.15)" },
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-16 border-t border-border" ref={ref}>
      <SectionTitle>{content.title}</SectionTitle>

      <motion.div
        className="space-y-3"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {content.certificates.map((cert, i) => (
          <motion.div
            key={i}
            className="p-4 rounded-lg border border-border hover:border-primary/50 transition-all group"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="flex items-start gap-3">
              <AnimatedIcon animation="pop" delay={i * 0.1} hoverScale={1.2}>
                <Award size={20} className="text-primary flex-shrink-0 mt-0.5" />
              </AnimatedIcon>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {cert.name}
                    </h3>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
                      {cert.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs text-muted-foreground">
                      {cert.issuer} • {cert.year}
                    </span>
                    
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary/80 px-2 py-1 rounded-md transition-colors"
                      >
                        {lang === 'fr' ? 'Voir certificat' : 'View Certificate'}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
