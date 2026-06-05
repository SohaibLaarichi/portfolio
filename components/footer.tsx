"use client"

import { useLanguage } from "@/hooks/use-language"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Linkedin, Github, Heart } from "lucide-react"

const footerContent = {
  fr: {
    description: "Développeur web full-stack passionné, étudiant en 5ème année d'ingénierie à l'EMSI Marrakech.",
    quickLinks: {
      title: "Liens rapides",
      links: [
        { label: "À propos", href: "#about" },
        { label: "Compétences", href: "#skills" },
        { label: "Projets", href: "#projects" },
        { label: "Contact", href: "#contact" }
      ]
    },
    contact: {
      title: "Contact",
      items: [
        { icon: Mail, label: "sohaiblaarichi112@gmail.com", href: "mailto:sohaiblaarichi112@gmail.com?subject=Contact%20depuis%20le%20portfolio%20-%20Sohaib%20LAARICHI" },
        { icon: Phone, label: "+212 701-820101", href: "tel:+212701820101" },
        { icon: MapPin, label: "Marrakech, Maroc", href: "#" }
      ]
    },
    social: {
      title: "Réseaux sociaux",
      links: [
        { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/laarichi-sohaib" },
        { icon: Github, label: "GitHub", href: "https://github.com/Sohaib-Laarichi" }
      ]
    },
    copyright: "Tous droits réservés",
    madeWith: "Fait avec",
    technologies: "Next.js, TypeScript, Tailwind CSS & Framer Motion"
  },
  en: {
    description: "Passionate full-stack web developer, 5th year engineering student at EMSI Marrakech.",
    quickLinks: {
      title: "Quick links",
      links: [
        { label: "About", href: "#about" },
        { label: "Skills", href: "#skills" },
        { label: "Projects", href: "#projects" },
        { label: "Contact", href: "#contact" }
      ]
    },
    contact: {
      title: "Contact",
      items: [
        { icon: Mail, label: "sohaiblaarichi112@gmail.com", href: "mailto:sohaiblaarichi112@gmail.com?subject=Contact%20from%20portfolio%20-%20Sohaib%20LAARICHI" },
        { icon: Phone, label: "+212 701-820101", href: "tel:+212701820101" },
        { icon: MapPin, label: "Marrakech, Morocco", href: "#" }
      ]
    },
    social: {
      title: "Social networks",
      links: [
        { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/laarichi-sohaib" },
        { icon: Github, label: "GitHub", href: "https://github.com/Sohaib-Laarichi" }
      ]
    },
    copyright: "All rights reserved",
    madeWith: "Made with",
    technologies: "Next.js, TypeScript, Tailwind CSS & Framer Motion"
  }
}

export default function Footer() {
  const { lang } = useLanguage()
  const content = footerContent[lang]
  const currentYear = new Date().getFullYear()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" as const } 
    },
  }

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.getElementById(href.slice(1))
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <motion.footer 
      className="border-t border-border bg-card/50 backdrop-blur-sm"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* À propos */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Sohaib LAARICHI
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {content.description}
            </p>
            <div className="flex gap-4">
              {content.social.links.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Liens rapides */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-foreground mb-4">
              {content.quickLinks.title}
            </h4>
            <ul className="space-y-2">
              {content.quickLinks.links.map((link, index) => (
                <li key={index}>
                  <motion.button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors text-left"
                    whileHover={{ x: 4 }}
                  >
                    {link.label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-foreground mb-4">
              {content.contact.title}
            </h4>
            <ul className="space-y-3">
              {content.contact.items.map((item, index) => {
                const Icon = item.icon
                return (
                  <li key={index}>
                    <motion.a
                      href={item.href}
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
                      whileHover={{ x: 4 }}
                    >
                      <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="text-sm">{item.label}</span>
                    </motion.a>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        </div>

        {/* Séparateur */}
        <motion.div 
          className="border-t border-border pt-8"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} Sohaib LAARICHI. {content.copyright}.
            </p>

            {/* Technologies */}
            <motion.div 
              className="flex items-center gap-2 text-sm text-muted-foreground"
              whileHover={{ scale: 1.05 }}
            >
              <span>{content.madeWith}</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              </motion.div>
              <span className="text-primary font-medium">
                {content.technologies}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}