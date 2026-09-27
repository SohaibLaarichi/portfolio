"use client"

import { useLanguage } from "@/hooks/use-language"
import { aboutContent } from "@/lib/content"
import SectionTitle from "./section-title"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { motion } from "framer-motion"
import AnimatedIcon from "./animated-icon"
import { TechIcons } from "./icons/tech-icons"
import Image from "next/image"
import { Globe } from "lucide-react"

export default function About() {
  const { lang } = useLanguage()
  const content = aboutContent[lang]
  const { ref, isVisible } = useScrollReveal()

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 border-t border-border/70" ref={ref}>
      <SectionTitle>{content.title}</SectionTitle>

      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start"
      >
        {/* Photo et informations personnelles */}
        <motion.div 
          className="lg:col-span-1"
          variants={itemVariants}
        >
          <div className="relative">
            <motion.div
              className="relative w-64 h-80 mx-auto lg:mx-0 overflow-hidden rounded-lg border border-border/70 bg-card/60 shadow-xl shadow-black/10"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/moi.png"
                alt="Sohaib LAARICHI"
                fill
                className="object-cover object-[50%_30%]"
                sizes="(max-width: 768px) 256px, 256px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
            </motion.div>
          </div>

          <motion.div
            className="mt-6 rounded-lg border border-border/70 bg-card/55 p-4 text-center shadow-lg shadow-black/5 backdrop-blur"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <AnimatedIcon animation="float" delay={0.2} hoverScale={1.15}>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  {TechIcons.frontend}
                </div>
              </AnimatedIcon>
              <span className="text-sm font-semibold text-primary">
                {lang === "fr" ? "Ingénieur d'État · EMSI MIAGE" : "State Engineer · EMSI MIAGE"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {lang === "fr" ? "Disponible immédiatement (CDI / Mission)" : "Available immediately (Full-time / Freelance)"}
            </p>
          </motion.div>
        </motion.div>

        {/* Contenu textuel */}
        <motion.div 
          className="lg:col-span-2 space-y-6"
          variants={itemVariants}
        >
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            {content.paragraphs.map((paragraph, i) => (
              <motion.p 
                key={i} 
                variants={itemVariants}
                className="text-base"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Points clés */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"
            variants={itemVariants}
          >
            {[
              { icon: TechIcons.frontend, title: "Full Stack Development", desc: "React, Next.js, Spring Boot, Node.js" },
              { icon: TechIcons.cloud, title: "DevOps & Cloud", desc: "Docker, Kubernetes, CI/CD, Helm" },
              { icon: TechIcons.database, title: "Bases de données", desc: "PostgreSQL, MySQL, MongoDB, Redis" },
              { icon: TechIcons.backend, title: "HealthTech & Réseaux", desc: "FHIR R4, ASTM, Linux, Cisco VLAN" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 rounded-lg border border-border/70 bg-card/35 p-4 shadow-sm shadow-black/5 transition-colors hover:border-primary/50 hover:bg-card/60"
                whileHover={{ scale: 1.02 }}
                variants={itemVariants}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Langues */}
          <motion.div
            className="mt-6 rounded-lg border border-border/70 bg-card/40 p-4 backdrop-blur shadow-sm"
            variants={itemVariants}
          >
            <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase text-primary">
              <Globe size={15} />
              <span>{lang === "fr" ? "Langues maîtrisées" : "Languages"}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-md border border-border/60 bg-background/50 p-2.5">
                <p className="font-bold text-sm text-foreground">{lang === "fr" ? "Français" : "French"}</p>
                <p className="text-xs text-muted-foreground">{lang === "fr" ? "Courant / Bilingue" : "Fluent / Bilingual"}</p>
              </div>
              <div className="rounded-md border border-border/60 bg-background/50 p-2.5">
                <p className="font-bold text-sm text-foreground">{lang === "fr" ? "Anglais" : "English"}</p>
                <p className="text-xs text-muted-foreground">{lang === "fr" ? "Professionnel / Technique" : "Professional / Technical"}</p>
              </div>
              <div className="rounded-md border border-border/60 bg-background/50 p-2.5">
                <p className="font-bold text-sm text-foreground">{lang === "fr" ? "Arabe" : "Arabic"}</p>
                <p className="text-xs text-muted-foreground">{lang === "fr" ? "Langue maternelle" : "Native language"}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
