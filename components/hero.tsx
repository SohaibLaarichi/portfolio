"use client"

import { useLanguage } from "@/hooks/use-language"
import { heroContent } from "@/lib/content"
import { motion } from "framer-motion"
import Image from "next/image"
import {
  Braces,
  Code2,
  Download,
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
              className="max-w-2xl text-2xl lg:text-3xl font-semibold text-foreground/80 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {content.title}
            </motion.h2>

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
                href="https://www.linkedin.com/in/laarichi-sohaib"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-[0_18px_50px_rgba(14,165,233,0.25)] hover:bg-primary/90"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <Linkedin size={18} />
                LinkedIn
              </motion.a>

              <motion.a
                href="https://github.com/Sohaib-Laarichi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-border/80 bg-card/70 px-5 py-3 text-sm font-semibold text-card-foreground shadow-lg shadow-black/10 backdrop-blur hover:border-primary/40 hover:bg-card"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <Github size={18} />
                GitHub
              </motion.a>

              <motion.a
                href={lang === "fr" ? "/CV_Sohaib_LaarichiFR.pdf" : "/CV_Sohaib_Laarichi_EN.pdf"}
                download={lang === "fr" ? "CV_Sohaib_LaarichiFR.pdf" : "CV_Sohaib_Laarichi_EN.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-border/80 bg-secondary/80 px-5 py-3 text-sm font-semibold text-secondary-foreground hover:bg-secondary"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <Download size={18} />
                {lang === "fr" ? "Télécharger CV" : "Download CV"}
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
                  alt="Sohaib LAARICHI - Développeur Web Full-Stack"
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
    </section>
  )
}
