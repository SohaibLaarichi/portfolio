"use client"

import { useState } from "react"
import { useLanguage } from "@/hooks/use-language"
import { motion, AnimatePresence } from "framer-motion"
import { Download, FileText, X } from "lucide-react"

interface PdfViewerModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PdfViewerModal({ isOpen, onClose }: PdfViewerModalProps) {
  const { lang } = useLanguage()
  const [currentLang, setCurrentLang] = useState<"fr" | "en">(lang)

  const pdfUrl = currentLang === "fr" ? "/CV_Sohaib_LaarichiFR.pdf" : "/CV_Sohaib_Laarichi_EN.pdf"
  const fileName = currentLang === "fr" ? "CV_Sohaib_LaarichiFR.pdf" : "CV_Sohaib_Laarichi_EN.pdf"

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-4xl h-[85vh] rounded-2xl border border-primary/30 bg-card/95 p-4 sm:p-6 shadow-2xl backdrop-blur-xl flex flex-col z-10"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border/70 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                  <FileText size={20} />
                </span>
                <div>
                  <h3 className="font-bold text-foreground text-lg sm:text-xl">
                    {lang === "fr" ? "Aperçu du CV - Sohaib LAARICHI" : "Resume Preview - Sohaib LAARICHI"}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {lang === "fr" ? "Document officiel récapitulatif" : "Official resume document"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Language Switcher inside modal */}
                <div className="flex items-center rounded-lg border border-border/70 bg-background/50 p-1">
                  <button
                    onClick={() => setCurrentLang("fr")}
                    type="button"
                    className={`rounded-md px-2.5 py-1 text-xs font-bold transition-all ${
                      currentLang === "fr" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    FR
                  </button>
                  <button
                    onClick={() => setCurrentLang("en")}
                    type="button"
                    className={`rounded-md px-2.5 py-1 text-xs font-bold transition-all ${
                      currentLang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    EN
                  </button>
                </div>

                <a
                  href={pdfUrl}
                  download={fileName}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-1.5 text-xs font-bold text-primary-foreground shadow hover:bg-primary/90"
                >
                  <Download size={14} />
                  <span className="hidden sm:inline">{lang === "fr" ? "Télécharger" : "Download"}</span>
                </a>

                <button
                  onClick={onClose}
                  type="button"
                  className="grid h-8 w-8 place-items-center rounded-lg border border-border/70 bg-background/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  aria-label="Fermer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Embedded PDF iframe */}
            <div className="flex-1 w-full rounded-xl overflow-hidden border border-border/70 bg-slate-900">
              <iframe
                src={`${pdfUrl}#toolbar=0`}
                className="w-full h-full border-none"
                title="CV Preview"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
