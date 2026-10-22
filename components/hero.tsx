"use client"

import { useLanguage } from "@/hooks/use-language"
import { heroContent } from "@/lib/content"
import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"
import PdfViewerModal from "./pdf-viewer-modal"
import { StatusWidget } from "@/components/ui/status-widget"
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
    { icon: Braces, label: "Full Stack", value: "Java / Spring + Next.js" },
    { icon: TerminalSquare, label: "DevOps & Cloud", value: "Docker + Kubernetes" },
    { icon: ShieldCheck, label: "HealthTech & Net", value: "FHIR R4 + Cisco VLAN" },
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
            <div className="mb-5">
              <StatusWidget />
            </div>

            <motion.h1
              className="mb-6 text-4xl sm:text-6xl lg:text-7xl font-bold leading-[0.98] tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="text-foreground font-light">Sohaib</span>
              <br />
              <span className="text-foreground font-black tracking-tight">
                LAARICHI
              </span>
            </motion.h1>

            <motion.h2
              className="max-w-2xl text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground/90 mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {content.title}
            </motion.h2>

            <motion.p
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-stroke bg-surface px-3.5 py-1 text-xs font-semibold text-muted-foreground backdrop-blur-md"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.33, duration: 0.5 }}
            >
              <MapPin size={13} className="text-accent" />
              <span>{lang === "fr" ? "Ingénieur Informatique basé à Marrakech, Maroc" : "Software Engineer based in Marrakech, Morocco"}</span>
            </motion.p>

            <motion.div
              className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-2.5"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              {engineeringSignals.map((signal) => {
                const Icon = signal.icon
                return (
                  <div key={signal.label} className="glass-card rounded-xl p-3 border border-stroke">
                    <div className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase text-accent">
                      <Icon size={13} />
                      {signal.label}
                    </div>
                    <p className="text-xs font-semibold text-foreground/90">{signal.value}</p>
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
              className="grid grid-cols-1 sm:flex sm:flex-wrap gap-2.5 sm:gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-2.5 sm:gap-3 flex-1">
                <motion.a
                  href="#projects"
                  className="nowotch-btn min-h-11 px-5 py-2.5 text-sm font-semibold shadow-md"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <FolderKanban size={17} />
                  {lang === "fr" ? "Voir mes projets" : "View my projects"}
                </motion.a>

                <motion.button
                  onClick={() => setIsPdfOpen(true)}
                  type="button"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-stroke bg-surface px-4 py-2 text-sm font-semibold text-foreground backdrop-blur-xl hover:border-stroke-hi hover:bg-surface-2 transition-all"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Eye size={16} className="text-accent" />
                  <span>{lang === "fr" ? "Aperçu du CV" : "Preview Resume"}</span>
                </motion.button>

                <motion.a
                  href={lang === "fr" ? "/CV_Sohaib_LaarichiFR.pdf" : "/CV_Sohaib_Laarichi_EN.pdf"}
                  download={lang === "fr" ? "CV_Sohaib_LaarichiFR.pdf" : "CV_Sohaib_Laarichi_EN.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-stroke bg-surface px-4 py-2 text-sm font-semibold text-foreground backdrop-blur-xl hover:border-stroke-hi hover:bg-surface-2 transition-all"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Download size={16} />
                  {lang === "fr" ? "Télécharger CV" : "Download Resume"}
                </motion.a>

                <motion.button
                  onClick={handleCopyEmail}
                  type="button"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-stroke bg-surface px-4 py-2 text-sm font-semibold text-foreground backdrop-blur-xl hover:border-stroke-hi hover:bg-surface-2 transition-all"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label="Copier l'adresse email"
                  title={emailAddress}
                >
                  {copiedEmail ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                  <span>{copiedEmail ? (lang === "fr" ? "Email copié !" : "Email copied!") : (lang === "fr" ? "Copier Email" : "Copy Email")}</span>
                </motion.button>
              </div>

              <div className="flex items-center gap-2">
                <motion.a
                  href="https://www.linkedin.com/in/laarichi-sohaib"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="grid h-11 w-11 place-items-center rounded-full border border-stroke bg-surface text-foreground hover:bg-surface-2 hover:border-stroke-hi transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin size={18} />
                </motion.a>

                <motion.a
                  href="https://github.com/Sohaib-Laarichi"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="grid h-11 w-11 place-items-center rounded-full border border-stroke bg-surface text-foreground hover:bg-surface-2 hover:border-stroke-hi transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={18} />
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1.4fr] gap-2.5 text-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="glass-card rounded-xl p-3 border border-stroke min-w-0">
                <span className="mb-1 flex items-center gap-1.5 text-muted-foreground font-medium">
                  <MapPin size={13} className="text-accent shrink-0" />
                  <span className="truncate">{content.locationLabel}</span>
                </span>
                <span className="text-foreground font-semibold truncate block">{content.location}</span>
              </div>
              <div className="glass-card rounded-xl p-3 border border-stroke min-w-0">
                <span className="mb-1 flex items-center gap-1.5 text-muted-foreground font-medium">
                  <Phone size={13} className="text-accent shrink-0" />
                  <span className="truncate">{content.phoneLabel}</span>
                </span>
                <a href={`tel:${content.phone.replace(/[\s-]/g, "")}`} className="text-foreground font-semibold hover:text-accent transition-colors whitespace-nowrap block">
                  {content.phone}
                </a>
              </div>
              <div className="glass-card rounded-xl p-3 border border-stroke min-w-0">
                <span className="mb-1 flex items-center gap-1.5 text-muted-foreground font-medium">
                  <Mail size={13} className="text-accent shrink-0" />
                  <span className="truncate">{content.emailLabel}</span>
                </span>
                <a
                  href={`mailto:${content.email}?subject=Contact%20depuis%20le%20portfolio%20-%20Sohaib%20LAARICHI`}
                  className="whitespace-nowrap text-foreground font-semibold hover:text-accent transition-colors block text-[11.5px] sm:text-xs"
                  title={content.email}
                >
                  {content.email}
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
            <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-tr from-accent/30 via-accent/10 to-transparent blur-3xl" />
            <div className="glass-card relative overflow-hidden rounded-2xl border border-stroke bg-card/60 shadow-2xl backdrop-blur-2xl">
              <div className="relative aspect-[5/6] max-h-[30rem]">
                <Image
                  src="/moi.png"
                  alt="Portrait de Sohaib Laarichi, ingénieur informatique Fullstack et DevOps à Marrakech"
                  fill
                  className="object-cover object-[50%_28%]"
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 352px, 384px"
                  priority
                  loading="eager"
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/45 to-transparent" />
              </div>
              <div className="absolute inset-x-3 bottom-3 grid grid-cols-3 gap-1.5 sm:gap-2">
                {highlights.map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.label}
                      className="glass-card rounded-xl border border-stroke bg-background/80 p-2 text-center backdrop-blur-xl"
                    >
                      <Icon className="mx-auto mb-1 text-accent" size={15} />
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
