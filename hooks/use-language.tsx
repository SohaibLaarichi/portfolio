"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"

type Language = "fr" | "en"

interface LanguageContextType {
  lang: Language
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("fr")

  const toggleLanguage = () => {
    setLang((prev) => (prev === "fr" ? "en" : "fr"))
  }

  return <LanguageContext.Provider value={{ lang, toggleLanguage }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
