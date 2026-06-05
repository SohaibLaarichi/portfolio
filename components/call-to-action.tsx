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

  const floatingElements = [
    { icon: "💼", delay: 0, left: "20%", top: "10%" },
    { icon: "🚀", delay: 1, left: "40%", top: "70%" },
    { icon: "⚡", delay: 2, left: "60%", top: "10%" },
    { icon: "🎯", delay: 3, left: "80%", top: "60%" },
  ]

  return (
    <section ref={ref} className="max-w-6xl mx-auto px-6 py-20">
      <motion.div
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border border-primary/20"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Éléments flottants de fond */}
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className="absolute text-6xl opacity-10"
            style={{
              left: element.left,
              top: element.top,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 6,
              delay: element.delay,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {element.icon}
          </motion.div>
        ))}

        <div className="relative z-10 p-8 lg:p-12 text-center">
          {/* Badge de disponibilité */}
          <motion.div 
            className="inline-block mb-6"
            variants={itemVariants}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              {content.availability}
            </div>
          </motion.div>

          {/* Titre principal */}
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-foreground mb-4"
            variants={itemVariants}
          >
            {content.title}
          </motion.h2>

          {/* Sous-titre */}
          <motion.h3 
            className="text-xl lg:text-2xl text-primary font-semibold mb-6"
            variants={itemVariants}
          >
            {content.subtitle}
          </motion.h3>

          {/* Description */}
          <motion.p 
            className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            {content.description}
          </motion.p>

          {/* Boutons d'action */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-8"
            variants={itemVariants}
          >
            <motion.a
              href="mailto:sohaiblaarichi112@gmail.com?subject=Opportunit%C3%A9%20d%27emploi%20-%20Sohaib%20LAARICHI&body=Bonjour%20Sohaib%2C%0A%0AJe%20vous%20contacte%20concernant%20une%20opportunit%C3%A9%20d%27emploi.%0A%0ACordialement"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-5 h-5" />
              {content.buttons.contact}
              <ArrowRight className="w-4 h-4" />
            </motion.a>

            <motion.a
              href="https://calendly.com/votre-lien" // Remplacez par votre lien Calendly
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border text-card-foreground rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-300 font-medium"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="w-5 h-5" />
              {content.buttons.schedule}
            </motion.a>
          </motion.div>

          {/* Actions secondaires */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 text-sm"
            variants={itemVariants}
          >
            <motion.button
              className="inline-flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4" />
              {content.buttons.cv}
            </motion.button>

            <motion.a
              href="tel:+212701820101"
              className="inline-flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-4 h-4" />
              +212 701-820101
            </motion.a>
          </motion.div>
        </div>

        {/* Effet de brillance animé */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "linear-gradient(45deg, transparent, rgba(6, 182, 212, 0.1), transparent)",
              "linear-gradient(225deg, transparent, rgba(6, 182, 212, 0.1), transparent)",
              "linear-gradient(45deg, transparent, rgba(6, 182, 212, 0.1), transparent)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />
      </motion.div>
    </section>
  )
}