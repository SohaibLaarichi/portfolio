"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/hooks/use-language"
import {
  Home,
  FolderKanban,
  Code2,
  Search,
  FileText,
  Mail,
  Moon,
  Sun,
} from "lucide-react"
import { useTheme } from "next-themes"

interface MobileNavDockProps {
  activeSection: string
  onOpenCommandMenu: () => void
  onOpenPdfViewer: () => void
}

export function MobileNavDock({
  activeSection,
  onOpenCommandMenu,
  onOpenPdfViewer,
}: MobileNavDockProps) {
  const { lang, toggleLanguage } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Auto-hide when scrolling down fast, reveal when scrolling up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > 150) {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 15) {
          setIsVisible(false) // Scrolling down
        } else if (lastScrollY - currentScrollY > 10) {
          setIsVisible(true) // Scrolling up
        }
      } else {
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  const items = [
    {
      id: "hero",
      label: lang === "fr" ? "Accueil" : "Home",
      icon: Home,
      action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    },
    {
      id: "projects",
      label: lang === "fr" ? "Projets" : "Projects",
      icon: FolderKanban,
      action: () => scrollTo("projects"),
    },
    {
      id: "skills",
      label: lang === "fr" ? "Compétences" : "Skills",
      icon: Code2,
      action: () => scrollTo("skills"),
    },
    {
      id: "search",
      label: lang === "fr" ? "Chercher" : "Search",
      icon: Search,
      action: onOpenCommandMenu,
      isSpecial: true,
    },
    {
      id: "cv",
      label: "CV",
      icon: FileText,
      action: onOpenPdfViewer,
    },
    {
      id: "contact",
      label: "Contact",
      icon: Mail,
      action: () => scrollTo("contact"),
    },
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="fixed bottom-4 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none lg:hidden"
        >
          <div className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 rounded-full border border-stroke bg-card/80 px-3 py-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.45)] backdrop-blur-2xl glass-card">
            {items.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id

              if (item.isSpecial) {
                return (
                  <motion.button
                    key={item.id}
                    onClick={item.action}
                    type="button"
                    aria-label={item.label}
                    whileTap={{ scale: 0.88 }}
                    className="relative mx-1 flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background shadow-md hover:opacity-90"
                  >
                    <Icon size={18} />
                    <span className="sr-only">{item.label}</span>
                  </motion.button>
                )
              }

              return (
                <motion.button
                  key={item.id}
                  onClick={item.action}
                  type="button"
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                  whileTap={{ scale: 0.9 }}
                  className={`relative flex flex-col items-center justify-center rounded-full px-2 py-1 transition-colors min-w-[42px] ${
                    isActive
                      ? "text-accent font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon size={17} className={isActive ? "text-accent" : ""} />
                  <span className="text-[9px] mt-0.5 tracking-tight">{item.label}</span>

                  {isActive && (
                    <motion.div
                      layoutId="activeDockIndicator"
                      className="absolute -bottom-0.5 h-1 w-3 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.button>
              )
            })}

            {/* Quick Lang/Theme separator & pills */}
            <div className="h-5 w-px bg-stroke mx-0.5" />

            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                type="button"
                aria-label={lang === "fr" ? "Changer le thème" : "Toggle theme"}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-surface text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-colors border border-stroke"
              >
                {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
              </button>
            )}

            <button
              onClick={toggleLanguage}
              type="button"
              aria-label={lang === "fr" ? "Afficher le site en anglais" : "Display the site in French"}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-surface text-[10px] font-mono font-bold text-foreground hover:bg-surface-2 transition-colors border border-stroke"
            >
              {lang === "fr" ? "EN" : "FR"}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
