"use client"

import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"
import Hero from "@/components/hero"
import EngineeringBlueprint from "@/components/engineering-blueprint"
import Stats from "@/components/stats"
import About from "@/components/about"
import Skills from "@/components/skills"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Education from "@/components/education"
import Certificates from "@/components/certificates"
import Volunteering from "@/components/volunteering"
import Contact from "@/components/contact"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp, Menu, X, Download, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export default function Home() {
  const { lang, toggleLanguage } = useLanguage()
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState("hero")
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
      
      // Calculer la progression de scroll
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(Math.min(progress, 100))
      
      // Détecter la section active
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'certificates', 'volunteering', 'contact']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  const navigationItems = [
    { id: "hero", label: lang === "fr" ? "Accueil" : "Home" },
    { id: "about", label: lang === "fr" ? "À propos" : "About" },
    { id: "skills", label: lang === "fr" ? "Compétences" : "Skills" },
    { id: "experience", label: lang === "fr" ? "Expérience" : "Experience" },
    { id: "projects", label: lang === "fr" ? "Études de cas" : "Case studies" },
    { id: "education", label: lang === "fr" ? "Éducation" : "Education" },
    { id: "contact", label: lang === "fr" ? "Contact" : "Contact" },
  ]

  return (
    <>
      <main className="min-h-screen bg-background text-foreground">
        {/* Indicateur de progression de scroll */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 origin-left bg-gradient-to-r from-primary via-sky-300 to-emerald-300 z-50"
          style={{ scaleX: scrollProgress / 100 }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.1 }}
        />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/72 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Link href="#" className="group inline-flex items-center gap-3 text-sm font-bold text-foreground transition-colors hover:text-primary">
                <span className="grid h-10 w-10 place-items-center rounded-lg border border-primary/25 bg-primary/10 text-primary shadow-[0_0_30px_rgba(14,165,233,0.12)]">
                  LS
                </span>
                <span className="hidden sm:inline">Sohaib LAARICHI</span>
              </Link>
            </motion.div>

            {/* Navigation Desktop */}
            <div className="hidden lg:flex items-center gap-1 rounded-lg border border-border/60 bg-card/35 p-1 backdrop-blur">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item.id ? "bg-primary/10 text-primary" : "text-muted-foreground"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Boutons d'action */}
            <div className="flex items-center gap-2">
              {/* Bouton télécharger CV */}
              <motion.a
                href="/Sohaib_Laarichi_CV_DevFullstack_StagePFE2026.pdf"
                download="Sohaib_Laarichi_CV_DevFullstack_StagePFE2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex min-h-10 items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-[0_12px_34px_rgba(14,165,233,0.22)] hover:bg-primary/90"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={16} />
                <span>{lang === "fr" ? "CV" : "Resume"}</span>
              </motion.a>

              {/* Toggle thème */}
              <motion.button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Changer le thème"
                className="grid h-10 w-10 place-items-center rounded-lg border border-border/60 bg-card/40 hover:bg-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {mounted ? (
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={theme === "dark" ? "sun" : "moon"}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <div className="w-[18px] h-[18px]" />
                )}
              </motion.button>

              {/* Toggle langue */}
              <motion.button
                onClick={toggleLanguage}
                className="min-h-10 rounded-lg border border-border/60 bg-card/40 px-4 py-2 text-sm font-bold text-secondary-foreground hover:bg-secondary"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {lang === "fr" ? "EN" : "FR"}
              </motion.button>

              {/* Menu mobile */}
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                className="grid h-10 w-10 place-items-center rounded-lg border border-border/60 bg-card/40 hover:bg-secondary lg:hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </div>
          </div>

          {/* Menu mobile */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                className="lg:hidden mt-3 overflow-hidden rounded-lg border border-border/60 bg-card/70 p-2 shadow-xl shadow-black/10 backdrop-blur"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-1">
                  {navigationItems.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`block w-full rounded-md px-4 py-2 text-left transition-colors ${
                        activeSection === item.id 
                          ? "bg-primary text-primary-foreground" 
                          : "hover:bg-secondary text-muted-foreground"
                      }`}
                      whileHover={{ x: 4 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                  <motion.a
                    href="/Sohaib_Laarichi_CV_DevFullstack_StagePFE2026.pdf"
                    download="Sohaib_Laarichi_CV_DevFullstack_StagePFE2026.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex w-full items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
                    whileHover={{ x: 4 }}
                  >
                    <Download size={16} />
                    <span>{lang === "fr" ? "Télécharger CV" : "Download Resume"}</span>
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Sections */}
      <div id="hero">
        <Hero />
      </div>
      <EngineeringBlueprint />
      <Stats />
      <div id="about">
        <About />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="experience">
        <Experience />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="education">
        <Education />
      </div>
      <div id="certificates">
        <Certificates />
      </div>
      <div id="volunteering">
        <Volunteering />
      </div>
      <div id="contact">
        <Contact />
      </div>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors shadow-lg z-40"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
      </main>
    </>
  )
}
