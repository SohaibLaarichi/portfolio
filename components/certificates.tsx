"use client"

import { useLanguage } from "@/hooks/use-language"
import { certificatesContent } from "@/lib/content"
import SectionTitle from "./section-title"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import AnimatedIcon from "./animated-icon"
import { Award, CheckCircle2, ExternalLink, ShieldCheck } from "lucide-react"

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
    hover: { scale: 1.02 },
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
        {content.certificates.map((cert: { name: string; description: string; link?: string; issuer: string; year: string; highlight?: boolean }, i: number) => {
          const isHighlight = "highlight" in cert && cert.highlight
          return (
            <motion.div
              key={i}
              className={`p-4 sm:p-5 rounded-xl border transition-all group ${
                isHighlight
                  ? "border-sky-500/40 bg-sky-500/10 shadow-lg shadow-sky-500/10"
                  : "border-border/70 bg-card/45 hover:border-primary/50"
              }`}
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="flex items-start gap-4">
                <AnimatedIcon animation="pop" delay={i * 0.1} hoverScale={1.2}>
                  {isHighlight ? (
                    <ShieldCheck size={26} className="text-sky-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Award size={22} className="text-primary flex-shrink-0 mt-0.5" />
                  )}
                </AnimatedIcon>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-base">
                          {cert.name}
                        </h3>
                        {isHighlight && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-sky-400/30 bg-sky-400/20 px-2.5 py-0.5 text-[11px] font-bold text-sky-300">
                            <CheckCircle2 size={11} /> Verified Certification
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors leading-relaxed">
                        {cert.description}
                      </p>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                      <span className="text-xs font-semibold text-muted-foreground">
                        {cert.issuer} • {cert.year}
                      </span>

                      {cert.link && (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-bold bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-lg transition-colors border border-primary/20"
                        >
                          <span>{lang === "fr" ? "Vérifier le badge" : "Verify Badge"}</span>
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
