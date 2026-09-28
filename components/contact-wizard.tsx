"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/hooks/use-language"
import {
  Briefcase,
  Code2,
  Activity,
  Coffee,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  Sparkles,
  Phone,
  Mail,
  RotateCcw,
} from "lucide-react"
import { toast } from "sonner"

interface StepData {
  opportunityType: string
  workMode: string
  timeline: string
  name: string
  company: string
  email: string
  message: string
}

export function ContactWizard() {
  const { lang } = useLanguage()
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const [formData, setFormData] = useState<StepData>({
    opportunityType: "cdi",
    workMode: "remote",
    timeline: "immediate",
    name: "",
    company: "",
    email: "",
    message: "",
  })

  const opportunityTypes = [
    {
      id: "cdi",
      titleFr: "CDI / Emploi permanent",
      titleEn: "Full-Time / CDI Employment",
      descFr: "Ingénieur d'État Full Stack, DevOps ou Cloud",
      descEn: "Full Stack, DevOps or Cloud Engineer",
      icon: Briefcase,
    },
    {
      id: "freelance",
      titleFr: "Mission Freelance",
      titleEn: "Freelance / Contract",
      descFr: "Développement web, API Spring/Next.js, infra Docker/K8s",
      descEn: "Web dev, Spring/Next.js APIs, Docker/K8s infra",
      icon: Code2,
    },
    {
      id: "healthtech",
      titleFr: "Projet HealthTech / SIH",
      titleEn: "HealthTech & Interop Project",
      descFr: "Normes FHIR R4, ASTM, HL7, Mirth Connect",
      descEn: "FHIR R4, ASTM, HL7, Mirth Connect standards",
      icon: Activity,
    },
    {
      id: "consulting",
      titleFr: "Échange & Prise de contact",
      titleEn: "Quick Inquiry / Discussion",
      descFr: "Opportunité future, conseil ou mise en relation",
      descEn: "Future opportunity, advice or networking",
      icon: Coffee,
    },
  ]

  const workModes = [
    { id: "remote", labelFr: "💻 100% Télétravail (Remote)", labelEn: "💻 100% Remote" },
    { id: "marrakech", labelFr: "📍 Marrakech (Sur site / Hybride)", labelEn: "📍 Marrakech (On-site / Hybrid)" },
    { id: "casablanca", labelFr: "🏢 Casablanca / Rabat (Hybride)", labelEn: "🏢 Casablanca / Rabat (Hybrid)" },
    { id: "relocation", labelFr: "✈️ Mobilité / Relocalisation", labelEn: "✈️ Relocation possible" },
  ]

  const timelines = [
    { id: "immediate", labelFr: "⚡ Immédiat (Disponible dès maintenant)", labelEn: "⚡ Immediate (Available now)" },
    { id: "1month", labelFr: "📅 Sous 1 mois", labelEn: "📅 Within 1 month" },
    { id: "flexible", labelFr: "🤝 À convenir ensemble", labelEn: "🤝 Flexible / To discuss" },
  ]

  const handleNext = () => {
    if (currentStep === 1 && !formData.opportunityType) {
      toast.error(lang === "fr" ? "Veuillez sélectionner un type d'opportunité" : "Please select an opportunity type")
      return
    }
    setCurrentStep((prev) => Math.min(prev + 1, 3))
  }

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const generatePreFilledBody = () => {
    const opp = opportunityTypes.find((o) => o.id === formData.opportunityType)
    const oppLabel = lang === "fr" ? opp?.titleFr : opp?.titleEn
    const mode = workModes.find((m) => m.id === formData.workMode)
    const modeLabel = lang === "fr" ? mode?.labelFr : mode?.labelEn
    const time = timelines.find((t) => t.id === formData.timeline)
    const timeLabel = lang === "fr" ? time?.labelFr : time?.labelEn

    return `Bonjour Sohaib,

Je vous contacte suite à la consultation de votre portfolio d'Ingénieur Full Stack & DevOps.

- Type d'opportunité : ${oppLabel}
- Modalités de travail : ${modeLabel}
- Démarrage souhaité : ${timeLabel}
- Nom / Entreprise : ${formData.name || "N/A"} (${formData.company || "N/A"})
- Email : ${formData.email || "N/A"}

Message :
${formData.message || "Nous serions ravis d'échanger avec vous concernant cette opportunité."}

Cordialement,
${formData.name || "Recruteur / Client"}`
  }

  const handleSendEmail = () => {
    const subject = encodeURIComponent(
      `Opportunité professionnelle - ${formData.company ? `${formData.company} - ` : ""}${formData.name || "Contact Portfolio"}`
    )
    const body = encodeURIComponent(generatePreFilledBody())
    const mailtoUrl = `mailto:sohaiblaarichi112@gmail.com?subject=${subject}&body=${body}`

    // Copy to clipboard
    navigator.clipboard.writeText(generatePreFilledBody())
    toast.success(
      lang === "fr"
        ? "Message copié dans le presse-papier & Client mail ouvert !"
        : "Message copied to clipboard & Mail client opened!"
    )

    window.open(mailtoUrl, "_blank")
    setIsSubmitted(true)
  }

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(generatePreFilledBody())
    const waUrl = `https://wa.me/212701820101?text=${text}`
    window.open(waUrl, "_blank")
    toast.success(lang === "fr" ? "Ouverture de WhatsApp..." : "Opening WhatsApp...")
    setIsSubmitted(true)
  }

  const handleReset = () => {
    setCurrentStep(1)
    setIsSubmitted(false)
    setFormData({
      opportunityType: "cdi",
      workMode: "remote",
      timeline: "immediate",
      name: "",
      company: "",
      email: "",
      message: "",
    })
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-card/65 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
      {/* Stepper Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Sparkles size={16} />
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-foreground">
                {lang === "fr" ? "Formulaire de Contact Express" : "Fast Hiring & Contact Wizard"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {lang === "fr"
                  ? "Définissez votre besoin en 3 étapes rapides · Réponse en < 24h"
                  : "Specify your need in 3 quick steps · Guaranteed reply in < 24h"}
              </p>
            </div>
          </div>

          <span className="rounded-full bg-primary/10 border border-primary/25 px-3 py-1 font-mono text-xs font-bold text-primary">
            {isSubmitted ? "3/3" : `${currentStep}/3`}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 w-full rounded-full bg-border/60 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 via-indigo-400 to-cyan-400"
            initial={{ width: "33%" }}
            animate={{ width: isSubmitted ? "100%" : `${(currentStep / 3) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Wizard Body */}
      {!isSubmitted ? (
        <div>
          {/* STEP 1 */}
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <h4 className="text-sm font-bold text-foreground">
                {lang === "fr" ? "1. Quel est le type d'opportunité ?" : "1. What type of opportunity is this?"}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {opportunityTypes.map((item) => {
                  const Icon = item.icon
                  const isSelected = formData.opportunityType === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, opportunityType: item.id })}
                      className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                        isSelected
                          ? "border-primary bg-primary/10 shadow-lg shadow-primary/10 ring-1 ring-primary/40"
                          : "border-border/70 bg-card/40 hover:border-primary/40 hover:bg-card/70"
                      }`}
                    >
                      <div
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${
                          isSelected ? "bg-primary text-primary-foreground" : "bg-secondary text-primary"
                        }`}
                      >
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-foreground">
                          {lang === "fr" ? item.titleFr : item.titleEn}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                          {lang === "fr" ? item.descFr : item.descEn}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              <div>
                <h4 className="text-sm font-bold text-foreground mb-3">
                  {lang === "fr" ? "2. Modalités de travail souhaitées" : "2. Desired Work Setup"}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {workModes.map((mode) => {
                    const isSelected = formData.workMode === mode.id
                    return (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, workMode: mode.id })}
                        className={`rounded-xl border p-3 text-left text-xs font-semibold transition-all ${
                          isSelected
                            ? "border-primary bg-primary/10 text-primary ring-1 ring-primary/30"
                            : "border-border/70 bg-card/40 text-muted-foreground hover:bg-secondary hover:text-foreground"
                        }`}
                      >
                        {lang === "fr" ? mode.labelFr : mode.labelEn}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-foreground mb-3">
                  {lang === "fr" ? "Délai de démarrage envisagé" : "Target Start Date"}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {timelines.map((time) => {
                    const isSelected = formData.timeline === time.id
                    return (
                      <button
                        key={time.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, timeline: time.id })}
                        className={`rounded-xl border p-3 text-left text-xs font-semibold transition-all ${
                          isSelected
                            ? "border-primary bg-primary/10 text-primary ring-1 ring-primary/30"
                            : "border-border/70 bg-card/40 text-muted-foreground hover:bg-secondary hover:text-foreground"
                        }`}
                      >
                        {lang === "fr" ? time.labelFr : time.labelEn}
                      </button>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <h4 className="text-sm font-bold text-foreground">
                {lang === "fr" ? "3. Vos coordonnées et message" : "3. Your Details and Message"}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                    {lang === "fr" ? "Votre nom / Prénom" : "Your Name"}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Sarah Benjelloun"
                    className="w-full rounded-xl border border-border/80 bg-background/50 px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                    {lang === "fr" ? "Entreprise / Organisation" : "Company / Organization"}
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Ex: TechCorp / Hôpital / Startup"
                    className="w-full rounded-xl border border-border/80 bg-background/50 px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                  {lang === "fr" ? "Votre adresse email professionnelle" : "Work Email"}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="nom@entreprise.com"
                  className="w-full rounded-xl border border-border/80 bg-background/50 px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                  {lang === "fr" ? "Message ou description du projet (optionnel)" : "Message or Project Description (optional)"}
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={
                    lang === "fr"
                      ? "Précisez vos attentes, stack requise, ou convenons d'un créneau d'échange..."
                      : "Describe your expectations, required stack, or suggest a call time..."
                  }
                  className="w-full rounded-xl border border-border/80 bg-background/50 px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none resize-none"
                />
              </div>
            </motion.div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="mt-8 flex items-center justify-between border-t border-border/60 pt-4">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-card px-4 py-2 text-xs font-bold text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              >
                <ArrowLeft size={14} />
                <span>{lang === "fr" ? "Précédent" : "Previous"}</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all hover:scale-102"
              >
                <span>{lang === "fr" ? "Suivant" : "Next"}</span>
                <ArrowRight size={14} />
              </button>
            ) : (
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs font-bold text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                >
                  <MessageSquare size={14} />
                  <span>WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendEmail}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all hover:scale-102"
                >
                  <Send size={14} />
                  <span>{lang === "fr" ? "Envoyer par Email" : "Send by Email"}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* SUCCESS STATE */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-6 space-y-4"
        >
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
            <CheckCircle2 size={32} />
          </div>

          <h4 className="text-lg font-black text-foreground">
            {lang === "fr" ? "Demande préparée avec succès !" : "Inquiry Prepared Successfully!"}
          </h4>

          <p className="max-w-md mx-auto text-xs text-muted-foreground leading-relaxed">
            {lang === "fr"
              ? "Le message complet a été copié dans votre presse-papier et pré-rempli dans votre application mail / WhatsApp. Sohaib vous répondra sous 24h."
              : "The full message was copied to your clipboard and pre-filled in your mail / WhatsApp app. Sohaib will reply within 24h."}
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <a
              href="tel:+212701820101"
              className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-card px-4 py-2 text-xs font-bold text-foreground hover:bg-secondary"
            >
              <Phone size={14} className="text-primary" />
              <span>+212 701-820101</span>
            </a>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary/10 border border-primary/30 px-4 py-2 text-xs font-bold text-primary hover:bg-primary/20"
            >
              <RotateCcw size={14} />
              <span>{lang === "fr" ? "Nouvelle demande" : "New inquiry"}</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
