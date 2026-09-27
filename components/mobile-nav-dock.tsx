"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/hooks/use-language"
import {
  Home,
  FolderKanban,
  Code2,
  BriefcaseBusiness,
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
      label: lang === "fr" ? "Skills" : "Skills",
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
          <div className="pointer-events-auto flex items-center gap-1 sm:gap-2 rounded-2xl border border-white/10 bg-card/85 px-3 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
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
                    className="relative mx-1 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white shadow-[0_4px_20px_rgba(99,102,241,0.45)]"
                  >
                    <Icon size={19} />
                    <span className="sr-only">{item.label}</span>
                  </motion.button>
                )
              }

              return (
                <motion.button
                  key={item.id}
                  onClick={item.action}
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  className={`relative flex flex-col items-center justify-center rounded-xl px-2.5 py-1.5 transition-colors min-w-[48px] ${
                    isActive
                      ? "text-primary font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon size={18} className={isActive ? "text-primary" : ""} />
                  <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>

                  {isActive && (
                    <motion.div
                      layoutId="activeDockIndicator"
                      className="absolute -bottom-1 h-1 w-4 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.button>
              )
            })}

            {/* Quick Lang/Theme separator & pill */}
            <div className="h-6 w-px bg-border/60 mx-1" />

            <button
              onClick={toggleLanguage}
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/80 text-[11px] font-bold text-foreground hover:bg-secondary transition-colors"
            >
              {lang === "fr" ? "EN" : "FR"}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
