"use client"

import { useLanguage } from "@/hooks/use-language"
import { contactContent } from "@/lib/content"
import SectionTitle from "./section-title"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { motion } from "framer-motion"
import { Mail, Phone } from "lucide-react"
import { FaLinkedinIn } from "react-icons/fa6"
import { SiGithub, SiGmail } from "react-icons/si"
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
              href="mailto:sohaiblaarichi112@gmail.com?subject=Opportunité%20de%20collaboration%20-%20Sohaib%20LAARICHI"
              className="inline-flex items-center justify-center gap-3 rounded-lg bg-primary px-7 py-3.5 font-semibold text-primary-foreground shadow-lg shadow-primary/15 hover:bg-primary/90"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <SiGmail aria-hidden="true" size={20} />
              {content.cta}
              <motion.span initial={{ x: 0 }} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                →
              </motion.span>
            </motion.a>
          
            {/* Téléphone */}
            <motion.a
              href="tel:+212701820101"
              className="inline-flex items-center justify-center gap-3 rounded-lg border border-border bg-card px-7 py-3.5 font-semibold text-foreground hover:border-primary/40 hover:bg-secondary"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Phone aria-hidden="true" size={20} />
              +212 701-820101
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
              className="inline-flex items-center gap-3 rounded-lg border border-border bg-card px-5 py-3 font-medium text-foreground hover:border-primary/40 hover:bg-secondary"
              variants={itemVariants}
              whileHover={socialIconVariants}
            >
              <SiGithub aria-hidden="true" size={20} />
              GitHub
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/laarichi-sohaib"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-lg border border-border bg-card px-5 py-3 font-medium text-foreground hover:border-primary/40 hover:bg-secondary"
              variants={itemVariants}
              whileHover={socialIconVariants}
            >
              <FaLinkedinIn aria-hidden="true" size={20} />
              LinkedIn
            </motion.a>

            <motion.button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-3 rounded-lg border border-border bg-card px-5 py-3 font-medium text-foreground hover:border-primary/40 hover:bg-secondary"
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
