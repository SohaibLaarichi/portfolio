"use client"

import { useLanguage } from "@/hooks/use-language"
import { contactContent } from "@/lib/content"
import SectionTitle from "./section-title"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { motion } from "framer-motion"
import { Mail, Github, Linkedin } from "lucide-react"
import { useState } from "react"

export default function Contact() {
  const { lang } = useLanguage()
  const content = contactContent[lang]
  const { ref, isVisible } = useScrollReveal()
  const [copiedEmail, setCopiedEmail] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hover: { scale: 1.05, boxShadow: "0 10px 25px rgba(6, 182, 212, 0.25)" },
    tap: { scale: 0.95 },
  }

  const socialIconVariants = {
    hover: {
      y: -2,
      scale: 1.05,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  }

  const handleCopyEmail = () => {
    const email = "sohaiblaarichi112@gmail.com"
    
    // Essayer l'API Clipboard moderne
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).then(() => {
        setCopiedEmail(true)
        setTimeout(() => setCopiedEmail(false), 3000)
      }).catch(() => {
        // Fallback vers méthode manuelle
        fallbackCopyEmail(email)
      })
    } else {
      // Fallback pour navigateurs plus anciens
      fallbackCopyEmail(email)
    }
  }
  
  const fallbackCopyEmail = (email: string) => {
    const textArea = document.createElement('textarea')
    textArea.value = email
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    
    try {
      document.execCommand('copy')
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 3000)
    } catch (err) {
      console.error('Erreur lors de la copie:', err)
      // Montrer l'email à l'utilisateur pour copie manuelle
      alert(
        lang === 'fr' 
          ? `Email: ${email}\nVeuillez le copier manuellement.`
          : `Email: ${email}\nPlease copy it manually.`
      )
    } finally {
      document.body.removeChild(textArea)
    }
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-16 border-t border-border" ref={ref}>
      <SectionTitle>{content.title}</SectionTitle>

      <motion.div
        className="max-w-2xl"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.p className="text-lg text-foreground mb-6 leading-relaxed" variants={itemVariants}>
          {content.message}
        </motion.p>

        <motion.div className="space-y-6" variants={itemVariants}>
          {/* Boutons principaux en ligne */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Gmail direct - Bouton principal */}
            <motion.a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=sohaiblaarichi112@gmail.com&su=${encodeURIComponent("Opportunité de collaboration - Sohaib LAARICHI")}&body=${encodeURIComponent("Bonjour Sohaib,\n\nJe vous contacte concernant une opportunité de collaboration.\n\nCordialement")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Mail size={20} />
              {content.cta}
              <motion.span initial={{ x: 0 }} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                →
              </motion.span>
            </motion.a>
          
            {/* Téléphone */}
            <motion.a
              href="tel:+212701820101"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              📞 +212 701-820101
            </motion.a>
          </div>
        </motion.div>

        <motion.div className="mt-12 pt-8 border-t border-border/50" variants={itemVariants}>
          <p className="text-base font-medium text-foreground mb-6">{content.socials}</p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.a
              href="https://github.com/Sohaib-Laarichi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-white transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              variants={itemVariants}
              whileHover={socialIconVariants}
            >
              <Github size={20} />
              GitHub
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/laarichi-sohaib"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              variants={itemVariants}
              whileHover={socialIconVariants}
            >
              <Linkedin size={20} />
              LinkedIn
            </motion.a>

            <motion.button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              variants={itemVariants}
              whileHover={socialIconVariants}
            >
              <Mail size={20} />
              {copiedEmail ? (lang === "fr" ? "Copié!" : "Copied!") : "Email"}
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
