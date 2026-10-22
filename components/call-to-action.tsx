"use client"

import { useLanguage } from "@/hooks/use-language"
import { motion } from "framer-motion"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { ArrowRight, Calendar, Mail, Phone, Download } from "lucide-react"

const ctaContent = {
  fr: {
    title: "Prêt à collaborer ?",
    subtitle: "Je recherche activement un emploi (CDI/CDD) en développement web full-stack",
    description: "Passionné par le développement web full-stack et les nouvelles technologies, je suis prêt à apporter ma motivation et mes compétences à votre équipe.",
    buttons: {
      contact: "Discutons de votre projet",
      schedule: "Planifier un entretien",
      cv: "Télécharger mon CV",
      email: "M'envoyer un email"
    },
    availability: "Disponible immédiatement"
  },
  en: {
    title: "Ready to collaborate?",
    subtitle: "I am actively seeking a full-time job (CDI) in full-stack web development",
    description: "Passionate about full-stack web development and new technologies, I am ready to bring my motivation and skills to your team.",
    buttons: {
      contact: "Let's discuss your project",
      schedule: "Schedule an interview",
      cv: "Download my resume",
      email: "Send me an email"
    },
    availability: "Available immediately"
  }
}

export default function CallToAction() {
  const { lang } = useLanguage()
  const content = ctaContent[lang]
  const { ref, isVisible } = useScrollReveal()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" as const } 
    },
  }

  return (
    <section ref={ref} className="max-w-5xl mx-auto px-6 py-20">
      <motion.div
        className="glass-card relative overflow-hidden rounded-3xl border border-stroke p-8 lg:p-14 text-center shadow-2xl"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Ambient Top Glow */}
        <div
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-35 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--halo), transparent 70%)" }}
        />

        <div className="relative z-10">
          {/* Badge de disponibilité */}
          <motion.div 
            className="inline-block mb-6"
            variants={itemVariants}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-semibold">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span>{content.availability}</span>
            </div>
          </motion.div>

          {/* Titre principal */}
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-3 tracking-tight"
            variants={itemVariants}
          >
            {content.title}
          </motion.h2>

          {/* Sous-titre */}
          <motion.h3 
            className="text-lg sm:text-xl text-accent font-semibold mb-5 tracking-tight"
            variants={itemVariants}
          >
            {content.subtitle}
          </motion.h3>

          {/* Description */}
          <motion.p 
            className="text-sm sm:text-base text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            {content.description}
          </motion.p>

          {/* Boutons d'action */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3.5 mb-8"
            variants={itemVariants}
          >
            <motion.a
              href="mailto:sohaiblaarichi112@gmail.com?subject=Opportunit%C3%A9%20d%27emploi%20-%20Sohaib%20LAARICHI&body=Bonjour%20Sohaib%2C%0A%0AJe%20vous%20contacte%20concernant%20une%20opportunit%C3%A9%20d%27emploi.%0A%0ACordialement"
              className="nowotch-btn inline-flex items-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Mail className="w-4 h-4" />
              <span>{content.buttons.contact}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>

            <motion.a
              href="https://calendly.com/votre-lien"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-stroke bg-surface hover:border-stroke-hi hover:bg-surface-2 text-foreground font-semibold text-sm transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Calendar className="w-4 h-4 text-accent" />
              <span>{content.buttons.schedule}</span>
            </motion.a>
          </motion.div>

          {/* Actions secondaires */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 text-xs sm:text-sm"
            variants={itemVariants}
          >
            <motion.a
              href={lang === "fr" ? "/CV_Sohaib_LaarichiFR.pdf" : "/CV_Sohaib_Laarichi_EN.pdf"}
              download={lang === "fr" ? "CV_Sohaib_LaarichiFR.pdf" : "CV_Sohaib_Laarichi_EN.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-stroke bg-surface/70 px-4 py-1.5 text-muted-foreground hover:border-accent hover:text-accent transition-all font-medium"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Download className="w-3.5 h-3.5" />
              <span>{content.buttons.cv}</span>
            </motion.a>

            <motion.a
              href="tel:+212701820101"
              className="inline-flex items-center gap-1.5 rounded-full border border-stroke bg-surface/70 px-4 py-1.5 text-muted-foreground hover:border-accent hover:text-accent transition-all font-medium"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+212 701-820101</span>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}