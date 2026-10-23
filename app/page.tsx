"use client"

import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"
import Hero from "@/components/hero"
import DevOpsTerminal from "@/components/devops-terminal"
import EngineeringBlueprint from "@/components/engineering-blueprint"
import HealthTechFlow from "@/components/healthtech-flow"
import About from "@/components/about"
import Skills from "@/components/skills"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Education from "@/components/education"
import Certificates from "@/components/certificates"
import Volunteering from "@/components/volunteering"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import SectionTitle from "@/components/section-title"
import { CommandMenu } from "@/components/command-menu"
import { MobileNavDock } from "@/components/mobile-nav-dock"
import PdfViewerModal from "@/components/pdf-viewer-modal"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp, Menu, X, Download, Moon, Sun, Search, Eye } from "lucide-react"
import { useTheme } from "next-themes"
import { track } from "@vercel/analytics"

export default function Home() {
  const { lang, toggleLanguage } = useLanguage()
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [commandMenuOpen, setCommandMenuOpen] = useState(false)
  const [pdfViewerOpen, setPdfViewerOpen] = useState(false)
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
      const sections = ['hero', 'projects', 'experience', 'skills', 'about', 'education', 'certificates', 'volunteering', 'contact']
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

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
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
    { id: "projects", label: lang === "fr" ? "Études de cas" : "Case studies" },
    { id: "experience", label: lang === "fr" ? "Expérience" : "Experience" },
    { id: "skills", label: lang === "fr" ? "Compétences" : "Skills" },
    { id: "about", label: lang === "fr" ? "À propos" : "About" },
    { id: "contact", label: lang === "fr" ? "Contact" : "Contact" },
  ]

  return (
    <>
      <a href="#main-content" className="skip-link">
        {lang === "fr" ? "Aller au contenu" : "Skip to content"}
      </a>
      <main id="main-content" className="min-h-screen overflow-x-clip bg-background text-foreground">
        {/* Indicateur de progression de scroll */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-accent via-foreground to-accent z-50"
          style={{ scaleX: scrollProgress / 100 }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.1 }}
        />

      {/* Navigation */}
      <nav
        aria-label={lang === "fr" ? "Navigation principale" : "Main navigation"}
        className="sticky top-0 z-50 border-b border-stroke bg-background/80 backdrop-blur-2xl transition-colors"
      >
        <div className="max-w-6xl mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Link href="#" className="group inline-flex items-center gap-3 text-sm font-bold text-foreground transition-colors hover:text-accent">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-stroke-hi bg-surface text-xs font-semibold text-foreground shadow-xs group-hover:border-accent transition-colors">
                  LS
                </span>
                <span className="hidden sm:inline tracking-tight font-semibold">Sohaib LAARICHI</span>
              </Link>
            </motion.div>

            {/* Navigation Desktop */}
            <div className="hidden lg:flex items-center gap-1 rounded-full border border-stroke bg-surface/75 p-1 backdrop-blur-xl shadow-xs">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  aria-current={activeSection === item.id ? "page" : undefined}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                    activeSection === item.id
                      ? "bg-foreground text-background font-semibold shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Boutons d'action */}
            <div className="flex items-center gap-2">
              {/* Trigger Command Palette ⌘K */}
              <motion.button
                onClick={() => setCommandMenuOpen(true)}
                type="button"
                aria-label="Ouvrir la palette de commandes (Cmd+K)"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-stroke bg-surface px-3 py-1.5 text-xs text-muted-foreground hover:border-stroke-hi hover:text-foreground backdrop-blur-xl transition-all"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Search size={13} className="text-accent" />
                <span className="hidden xl:inline text-[11px] font-medium">{lang === "fr" ? "Recherche" : "Search"}</span>
                <kbd className="inline-flex items-center gap-0.5 rounded-md border border-stroke bg-card/60 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-muted-foreground shadow-2xs">
                  <span className="text-[10px]">⌘</span>K
                </kbd>
              </motion.button>

              {/* Bouton télécharger CV */}
              <motion.a
                href={lang === "fr" ? "/CV_Sohaib_LaarichiFR.pdf" : "/CV_Sohaib_Laarichi_EN.pdf"}
                download={lang === "fr" ? "CV_Sohaib_LaarichiFR.pdf" : "CV_Sohaib_Laarichi_EN.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("resume_downloaded", { language: lang, location: "navigation" })}
                className="hidden md:flex nowotch-btn text-xs font-semibold py-2 px-4.5"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Download size={14} />
                <span>{lang === "fr" ? "CV" : "Resume"}</span>
              </motion.a>

              {/* Toggle thème */}
              <motion.button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Changer le thème"
                className="grid h-9 w-9 place-items-center rounded-full border border-stroke bg-surface hover:bg-surface-2 hover:border-stroke-hi text-foreground transition-all"
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
                      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <div className="w-[16px] h-[16px]" />
                )}
              </motion.button>

              {/* Toggle langue */}
              <motion.button
                onClick={toggleLanguage}
                className="min-h-9 rounded-full border border-stroke bg-surface px-3 py-1 font-mono text-xs font-bold text-foreground hover:bg-surface-2 hover:border-stroke-hi transition-all"
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
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
                className="grid h-9 w-9 place-items-center rounded-full border border-stroke bg-surface hover:bg-surface-2 lg:hidden text-foreground"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.button>
            </div>
          </div>

          {/* Menu mobile */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                id="mobile-navigation"
                className="lg:hidden mt-3 overflow-hidden rounded-2xl border border-border/70 bg-card/90 p-3 shadow-2xl backdrop-blur-2xl"
                initial={{ opacity: 0, height: 0, scale: 0.98 }}
                animate={{ opacity: 1, height: "auto", scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.98 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                {/* Mobile Search trigger */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setCommandMenuOpen(true)
                  }}
                  type="button"
                  className="mb-2 flex w-full items-center justify-between rounded-xl border border-primary/20 bg-primary/10 px-3.5 py-2.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
                >
                  <span className="flex items-center gap-2">
                    <Search size={15} />
                    <span>{lang === "fr" ? "Recherche rapide & Commandes" : "Quick Search & Commands"}</span>
                  </span>
                  <kbd className="rounded border border-primary/30 bg-background/80 px-1.5 py-0.5 font-mono text-[10px]">
                    ⌘K
                  </kbd>
                </button>

                <div className="space-y-1">
                  {navigationItems.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      aria-current={activeSection === item.id ? "page" : undefined}
                      className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors ${
                        activeSection === item.id 
                          ? "bg-primary text-primary-foreground font-bold shadow-md shadow-primary/20" 
                          : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>{item.label}</span>
                      {activeSection === item.id && (
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                    </motion.button>
                  ))}

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/60">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false)
                        setPdfViewerOpen(true)
                      }}
                      type="button"
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-border/70 bg-card px-3 py-2 text-xs font-bold text-foreground hover:border-primary/40"
                    >
                      <Eye size={14} className="text-primary" />
                      <span>{lang === "fr" ? "Aperçu CV" : "Preview CV"}</span>
                    </button>

                    <a
                      href={lang === "fr" ? "/CV_Sohaib_LaarichiFR.pdf" : "/CV_Sohaib_Laarichi_EN.pdf"}
                      download={lang === "fr" ? "CV_Sohaib_LaarichiFR.pdf" : "CV_Sohaib_Laarichi_EN.pdf"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-xs font-bold text-primary-foreground shadow-md shadow-primary/25 hover:bg-primary/90"
                    >
                      <Download size={14} />
                      <span>{lang === "fr" ? "Télécharger" : "Download"}</span>
                    </a>
                  </div>
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
      <div id="projects">
        <Projects />
      </div>
      <div id="playground">
        <div className="mx-auto max-w-6xl px-6 pt-16">
          <SectionTitle>{lang === "fr" ? "Playground technique" : "Engineering playground"}</SectionTitle>
          <p className="-mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            {lang === "fr"
              ? "Un aperçu interactif de ma façon de travailler avec les environnements cloud, les conteneurs et les outils de livraison."
              : "An interactive glimpse into how I work with cloud environments, containers and delivery tooling."}
          </p>
        </div>
        <DevOpsTerminal />
      </div>
      <div id="experience">
        <Experience />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="about">
        <About />
      </div>
      <EngineeringBlueprint />
      <HealthTechFlow />
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
      <Footer />

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            aria-label="Retour en haut"
            className="fixed bottom-24 lg:bottom-8 right-5 sm:right-8 w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors shadow-xl z-30"
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

      {/* Floating Mobile Navigation Dock */}
      <MobileNavDock
        activeSection={activeSection}
        onOpenCommandMenu={() => setCommandMenuOpen(true)}
        onOpenPdfViewer={() => setPdfViewerOpen(true)}
      />

      {/* Resume PDF Viewer Modal */}
      <PdfViewerModal
        isOpen={pdfViewerOpen}
        onClose={() => setPdfViewerOpen(false)}
      />

      {/* Command Palette Modal (Cmd+K) */}
      <CommandMenu open={commandMenuOpen} setOpen={setCommandMenuOpen} />
      </main>
    </>
  )
}
