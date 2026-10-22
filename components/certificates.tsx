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
    <section className="max-w-4xl mx-auto px-6 py-16 border-t border-stroke" ref={ref}>
      <SectionTitle>{content.title}</SectionTitle>

      <motion.div
        className="space-y-3.5"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {content.certificates.map((cert: { name: string; description: string; link?: string; issuer: string; year: string; highlight?: boolean }, i: number) => {
          const isHighlight = "highlight" in cert && cert.highlight
          return (
            <motion.div
              key={i}
              className={`glass-card p-4 sm:p-5 rounded-2xl border transition-all duration-300 group ${
                isHighlight
                  ? "border-accent/40 shadow-lg shadow-accent/5"
                  : "border-stroke hover:border-stroke-hi"
              }`}
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="flex items-start gap-4">
                <AnimatedIcon animation="pop" delay={i * 0.1} hoverScale={1.2}>
                  {isHighlight ? (
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 border border-accent/30 text-accent">
                      <ShieldCheck size={22} />
                    </div>
                  ) : (
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-surface border border-stroke text-accent">
                      <Award size={20} />
                    </div>
                  )}
                </AnimatedIcon>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-foreground group-hover:text-accent transition-colors text-base">
                          {cert.name}
                        </h3>
                        {isHighlight && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent/15 px-2.5 py-0.5 text-[11px] font-bold text-accent">
                            <CheckCircle2 size={11} /> Verified Certification
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground group-hover:text-foreground/90 transition-colors leading-relaxed">
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
                          className="inline-flex items-center gap-1 text-xs font-semibold rounded-full border border-stroke bg-surface hover:border-accent hover:text-accent px-3 py-1.5 transition-all"
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
