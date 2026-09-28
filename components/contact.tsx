"use client"

import { useLanguage } from "@/hooks/use-language"
import { contactContent } from "@/lib/content"
import SectionTitle from "./section-title"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { motion } from "framer-motion"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  Copy,
  Check,
  MessageSquare,
  ShieldCheck,
} from "lucide-react"
import { FaLinkedinIn } from "react-icons/fa6"
import { SiGithub, SiGmail } from "react-icons/si"
import { useState } from "react"
import { toast } from "sonner"
import { ContactWizard } from "./contact-wizard"

export default function Contact() {
  const { lang } = useLanguage()
  const content = contactContent[lang]
  const { ref, isVisible } = useScrollReveal()
  const [copiedEmail, setCopiedEmail] = useState(false)
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 border-t border-border/70" ref={ref}>
      <SectionTitle>{content.title}</SectionTitle>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr] gap-8 items-start mt-8"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Left Column: Interactive 3-Step Contact & Hiring Wizard */}
        <motion.div variants={itemVariants}>
          <ContactWizard />
        </motion.div>

        {/* Right Column: Direct Channels & Verified Badges */}
        <motion.div variants={itemVariants} className="space-y-4">
          {/* Quick Direct Channels Card */}
          <div className="rounded-2xl border border-border/70 bg-card/55 p-6 shadow-xl backdrop-blur-xl">
            <h4 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/10 text-primary">
                <Sparkles size={15} />
              </span>
              <span>{lang === "fr" ? "Canaux directs rapides" : "Instant Direct Channels"}</span>
            </h4>

            <div className="space-y-3">
              {/* Email direct */}
              <div className="flex items-center justify-between rounded-xl border border-border/60 bg-background/50 p-3.5 transition-colors hover:border-primary/40">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-rose-500/10 text-rose-400">
                    <SiGmail size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold">Email officiel</p>
                    <p className="text-xs sm:text-sm font-bold text-foreground">{emailAddress}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleCopyEmail}
                    type="button"
                    title="Copier l'email"
                    className="grid h-8 w-8 place-items-center rounded-lg border border-border/70 bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
                  >
                    {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                  <a
                    href={`mailto:${emailAddress}?subject=Prise%20de%20contact%20-%20Sohaib%20LAARICHI`}
                    className="rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground hover:bg-primary/90"
                  >
                    Écrire
                  </a>
                </div>
              </div>

              {/* Téléphone / WhatsApp */}
              <div className="flex items-center justify-between rounded-xl border border-border/60 bg-background/50 p-3.5 transition-colors hover:border-primary/40">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-500/10 text-emerald-400">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold">Téléphone / WhatsApp</p>
                    <p className="text-xs sm:text-sm font-bold text-foreground">+212 701-820101</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <a
                    href="https://wa.me/212701820101?text=Bonjour%20Sohaib,%20j'ai%20vu%20votre%20portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-8 w-8 place-items-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                    title="WhatsApp direct"
                  >
                    <MessageSquare size={14} />
                  </a>
                  <a
                    href="tel:+212701820101"
                    className="rounded-lg border border-border/80 bg-card px-3 py-1.5 text-xs font-bold text-foreground hover:bg-secondary"
                  >
                    Appeler
                  </a>
                </div>
              </div>

              {/* Localisation & Réponse */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <div className="rounded-xl border border-border/60 bg-background/40 p-3">
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground mb-1">
                    <MapPin size={13} className="text-primary" />
                    Localisation
                  </span>
                  <p className="text-xs font-bold text-foreground">Marrakech (UTC+1)</p>
                  <p className="text-[10px] text-muted-foreground">Mobilité Maroc / Remote</p>
                </div>

                <div className="rounded-xl border border-border/60 bg-background/40 p-3">
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground mb-1">
                    <Clock size={13} className="text-emerald-400" />
                    Réactivité
                  </span>
                  <p className="text-xs font-bold text-foreground">&lt; 24 heures</p>
                  <p className="text-[10px] text-emerald-400 font-semibold">Disponible immédiatement</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Profiles Pill Cards */}
          <div className="rounded-2xl border border-border/70 bg-card/55 p-6 shadow-xl backdrop-blur-xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
              {lang === "fr" ? "Réseaux Professionnels & Code" : "Professional Profiles & Code"}
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://www.linkedin.com/in/laarichi-sohaib"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/50 p-3 text-xs font-bold text-foreground hover:border-primary/50 hover:bg-secondary transition-all"
              >
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-blue-500/10 text-blue-400">
                  <FaLinkedinIn size={16} />
                </div>
                <div>
                  <p className="font-bold">LinkedIn</p>
                  <p className="text-[10px] text-muted-foreground font-normal">in/laarichi-sohaib</p>
                </div>
              </a>

              <a
                href="https://github.com/Sohaib-Laarichi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/50 p-3 text-xs font-bold text-foreground hover:border-primary/50 hover:bg-secondary transition-all"
              >
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-slate-500/10 text-foreground">
                  <SiGithub size={16} />
                </div>
                <div>
                  <p className="font-bold">GitHub</p>
                  <p className="text-[10px] text-muted-foreground font-normal">@Sohaib-Laarichi</p>
                </div>
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
