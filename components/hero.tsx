"use client"

import { useLanguage } from "@/hooks/use-language"
import { heroContent } from "@/lib/content"
import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"
import PdfViewerModal from "./pdf-viewer-modal"
import {
  Braces,
  Check,
  Code2,
  Copy,
  Download,
  Eye,
  FolderKanban,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Network,
  Phone,
  ShieldCheck,
  TerminalSquare,
} from "lucide-react"

export default function Hero() {
  const { lang } = useLanguage()
  const content = heroContent[lang]
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [isPdfOpen, setIsPdfOpen] = useState(false)
  const emailAddress = "sohaiblaarichi112@gmail.com"

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress)
    setCopiedEmail(true)
    toast.success(
      lang === "fr" ? "Email copié dans le presse-papier !" : "Email copied to clipboard!",
      { description: emailAddress }
    )
    setTimeout(() => setCopiedEmail(false), 2500)
  }
  const highlights = [
    { icon: Network, label: lang === "fr" ? "Réseaux" : "Networks" },
    { icon: ShieldCheck, label: lang === "fr" ? "Sécurité" : "Security" },
    { icon: Code2, label: "Full-stack" },
  ]
  const engineeringSignals = [
    { icon: Braces, label: "Frontend", value: "React + Next.js" },
    { icon: TerminalSquare, label: "Backend", value: "Node.js + Java" },
    { icon: ShieldCheck, label: "Security", value: "JWT + NAC + ISO" },
  ]

  return (
    <section className="relative max-w-6xl mx-auto px-6 py-20 lg:py-24 min-h-[88vh] flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-12 lg:gap-16 items-center w-full">
        <div className="order-1">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-bold text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              {lang === "fr" ? "Disponible immédiatement pour CDI / Mission · Maroc ou Remote" : "Available immediately for Full-time / Freelance · Morocco or Remote"}
            </motion.div>

            <motion.h1
              className="mb-6 text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.96]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="text-foreground">Sohaib</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-sky-300 to-emerald-300 bg-clip-text text-transparent">
                LAARICHI
              </span>
            </motion.h1>

            <motion.h2
              className="max-w-2xl text-2xl lg:text-3xl font-semibold text-foreground/80 mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {content.title}
            </motion.h2>

            <motion.p
              className="mb-6 inline-flex items-center gap-2 rounded-md border border-border/60 bg-card/40 px-3 py-1 text-xs font-semibold text-muted-foreground"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.33, duration: 0.5 }}
            >
              <MapPin size={14} className="text-primary" />
              <span>{lang === "fr" ? "Ingénieur Informatique basé à Marrakech, Maroc" : "Software Engineer based in Marrakech, Morocco"}</span>
            </motion.p>

            <motion.div
              className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              {engineeringSignals.map((signal) => {
                const Icon = signal.icon
                return (
                  <div key={signal.label} className="rounded-lg border border-border/60 bg-card/35 p-3">
                    <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase text-primary">
                      <Icon size={14} />
                      {signal.label}
                    </div>
                    <p className="text-sm font-semibold text-foreground/90">{signal.value}</p>
                  </div>
                )
              })}
            </motion.div>

            <motion.p
              className="text-base sm:text-lg leading-relaxed text-muted-foreground mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {content.description}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <motion.a
                href="#projects"
                className="inline-flex w-full sm:w-auto min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-[0_18px_50px_rgba(14,165,233,0.25)] hover:bg-primary/90"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <FolderKanban size={18} />
                {lang === "fr" ? "Voir mes projets" : "View my projects"}
              </motion.a>

              <motion.button
                onClick={() => setIsPdfOpen(true)}
                type="button"
                className="inline-flex w-full sm:w-auto min-h-12 items-center justify-center gap-2 rounded-lg border border-border/80 bg-card/70 px-5 py-3 text-sm font-semibold text-card-foreground shadow-lg shadow-black/10 backdrop-blur hover:border-primary/40 hover:bg-card"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <Eye size={18} className="text-primary" />
                <span>{lang === "fr" ? "Aperçu du CV" : "Preview Resume"}</span>
              </motion.button>

              <motion.a
                href={lang === "fr" ? "/CV_Sohaib_LaarichiFR.pdf" : "/CV_Sohaib_Laarichi_EN.pdf"}
                download={lang === "fr" ? "CV_Sohaib_LaarichiFR.pdf" : "CV_Sohaib_Laarichi_EN.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto min-h-12 items-center justify-center gap-2 rounded-lg border border-border/80 bg-card/70 px-5 py-3 text-sm font-semibold text-card-foreground shadow-lg shadow-black/10 backdrop-blur hover:border-primary/40 hover:bg-card"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <Download size={18} />
                {lang === "fr" ? "Télécharger CV" : "Download Resume"}
              </motion.a>

              <motion.button
                onClick={handleCopyEmail}
                type="button"
                className="inline-flex w-full sm:w-auto min-h-12 items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                aria-label="Copier l'adresse email"
                title={emailAddress}
              >
                {copiedEmail ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                <span>{copiedEmail ? (lang === "fr" ? "Email copié !" : "Email copied!") : (lang === "fr" ? "Copier Email" : "Copy Email")}</span>
              </motion.button>

              <motion.a
                href="https://www.linkedin.com/in/laarichi-sohaib"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid h-12 w-12 place-items-center rounded-lg border border-border/80 bg-secondary/80 text-secondary-foreground hover:bg-secondary"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <Linkedin size={19} />
              </motion.a>

              <motion.a
                href="https://github.com/Sohaib-Laarichi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="grid h-12 w-12 place-items-center rounded-lg border border-border/80 bg-secondary/80 text-secondary-foreground hover:bg-secondary"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <Github size={19} />
              </motion.a>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="rounded-lg border border-border/60 bg-card/40 p-3 backdrop-blur">
                <span className="mb-1 flex items-center gap-2 text-muted-foreground font-medium">
                  <MapPin size={14} />
                  {content.location}
                </span>
                <span className="text-foreground">Marrakech, Maroc</span>
              </div>
              <div className="rounded-lg border border-border/60 bg-card/40 p-3 backdrop-blur">
                <span className="mb-1 flex items-center gap-2 text-muted-foreground font-medium">
                  <Phone size={14} />
                  {content.phone}
                </span>
                <a href="tel:+212701820101" className="text-foreground hover:text-primary transition-colors">
                  +212 701-820101
                </a>
              </div>
              <div className="rounded-lg border border-border/60 bg-card/40 p-3 backdrop-blur">
                <span className="mb-1 flex items-center gap-2 text-muted-foreground font-medium">
                  <Mail size={14} />
                  {content.email}
                </span>
                <a
                  href="mailto:sohaiblaarichi112@gmail.com?subject=Contact%20depuis%20le%20portfolio%20-%20Sohaib%20LAARICHI"
                  className="break-all text-foreground hover:text-primary transition-colors"
                >
                  sohaiblaarichi112@gmail.com
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="order-2 flex justify-center lg:justify-end">
          <motion.div
            className="relative w-full max-w-[20rem] sm:max-w-[22rem] lg:max-w-[24rem]"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            <div className="absolute -inset-3 rounded-[1.5rem] bg-gradient-to-br from-primary/16 via-transparent to-emerald-400/10 blur-xl" />
            <div className="relative overflow-hidden rounded-lg border border-border/70 bg-card/60 shadow-2xl shadow-black/20 backdrop-blur">
              <div className="relative aspect-[5/6] max-h-[30rem]">
                <Image
                  src="/moi.png"
                  alt="Portrait de Sohaib Laarichi, ingénieur informatique Fullstack et DevOps à Marrakech"
                  fill
                  className="object-cover object-[50%_28%]"
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 352px, 384px"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/45 to-transparent" />
              </div>
              <div className="absolute inset-x-3 bottom-3 grid grid-cols-3 gap-1.5 sm:gap-2">
                {highlights.map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.label}
                      className="rounded-md border border-white/10 bg-background/72 p-2 text-center backdrop-blur-xl"
                    >
                      <Icon className="mx-auto mb-1 text-primary" size={16} />
                      <p className="text-[0.68rem] font-semibold text-foreground sm:text-xs">{item.label}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <PdfViewerModal isOpen={isPdfOpen} onClose={() => setIsPdfOpen(false)} />
    </section>
  )
}
