"use client"

import { useState } from "react"
import { useLanguage } from "@/hooks/use-language"
import { motion, AnimatePresence } from "framer-motion"
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  Hospital,
  RefreshCw,
  Server,
} from "lucide-react"

export default function HealthTechFlow() {
  const { lang } = useLanguage()
  const [activeStep, setActiveStep] = useState<number>(0)

  const steps = [
    {
      id: 0,
      title: lang === "fr" ? "1. Émission HL7v2 (SIH)" : "1. HL7v2 Transmission (HIS)",
      short: "HL7 Message",
      icon: Hospital,
      badge: "Source SIH",
      tech: "HL7 v2.5 / ADT / ORU",
      description:
        lang === "fr"
          ? "Un Système d'Information Hospitalier (SIH) génère un message médical brut (ex: admission patient ADT_A01 ou résultat de laboratoire ORU_R01)."
          : "A Hospital Information System (HIS) generates raw medical data (e.g. ADT_A01 patient admission or ORU_R01 lab result).",
      payload: `MSH|^~\\&|HIS_PIMS|HOSPITAL|MIRTH|DEST|20260727183000||ADT^A01|MSG1001|P|2.5\nPID|1||1001^^^MRN||LAARICHI^SOHAIB||20010101|M|||MARRAKECH^^MA`,
    },
    {
      id: 1,
      title: lang === "fr" ? "2. Moteur Mirth Connect" : "2. Mirth Connect Engine",
      short: "Mirth Router",
      icon: RefreshCw,
      badge: "Integration Engine",
      tech: "Mirth Connect + JavaScript Channels",
      description:
        lang === "fr"
          ? "Le canal Mirth Connect intercepte le message, effectue le dépaquetage, le filtrage de sécurité et le mapping vers les structures FHIR R4."
          : "Mirth Connect channel intercepts the message, handles parsing, security filtering and mapping to FHIR R4 resources.",
      payload: `// Mirth Channel Transformer\nvar fhirPatient = new Patient();\nfhirPatient.addIdentifier().setValue(msg['PID']['PID.3']['PID.3.1'].toString());\nfhirPatient.addName().setFamily(msg['PID']['PID.5']['PID.5.1'].toString());`,
    },
    {
      id: 2,
      title: lang === "fr" ? "3. Standard FHIR R4 REST" : "3. FHIR R4 REST Resource",
      short: "FHIR Server",
      icon: Server,
      badge: "FHIR R4 Standard",
      tech: "Spring Boot + HAPI FHIR",
      description:
        lang === "fr"
          ? "La donnée est convertie en ressource FHIR JSON universelle (Patient, Observation, ServiceRequest) et validée selon le profil HAPI FHIR."
          : "The data is converted into universal FHIR JSON resource (Patient, Observation, ServiceRequest) and validated against HAPI FHIR profiles.",
      payload: `{\n  "resourceType": "Patient",\n  "id": "1001",\n  "name": [{ "family": "LAARICHI", "given": ["Sohaib"] }],\n  "gender": "male",\n  "address": [{ "city": "Marrakech", "country": "MA" }]\n}`,
    },
    {
      id: 3,
      title: lang === "fr" ? "4. Dossier Patient & Interface React" : "4. Unified Patient Dashboard (React)",
      short: "React Dashboard",
      icon: Activity,
      badge: "Client Web",
      tech: "React 19 + Next.js + Tailwind",
      description:
        lang === "fr"
          ? "L'application Web React consomme l'API FHIR de manière sécurisée (OAuth2 / OIDC) et offre aux praticiens une vue synthétique et temps réel."
          : "The React Web application consumes the FHIR API securely (OAuth2 / OIDC) providing clinicians with a real-time synthetic view.",
      payload: `[OK] Patient Record Synchronized\n[OK] Cold-Chain Storage Monitoring: Normal (4.2 °C)\n[OK] DICOM Image Viewer Attached`,
    },
  ]

  const currentStep = steps[activeStep]

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 border-t border-border/70">
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-bold text-sky-400">
          <BrainCircuit size={14} />
          {lang === "fr" ? "Architecture Interopérabilité HealthTech" : "HealthTech Interoperability Architecture"}
        </p>
        <h3 className="text-3xl font-black text-foreground">
          {lang === "fr" ? "Démonstrateur de Flux FHIR & HL7v2" : "FHIR & HL7v2 Flow Visualizer"}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {lang === "fr"
            ? "Visualisez comment Sohaib conçoit et interconnecte les Systèmes d'Information Hospitaliers avec les standards de santé internationaux."
            : "Explore how Sohaib designs and interconnects Hospital Information Systems with international health standards."}
        </p>
      </div>

      {/* Interactive Step Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {steps.map((step) => {
          const Icon = step.icon
          const isActive = activeStep === step.id
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              type="button"
              className={`p-4 rounded-xl border text-left transition-all ${
                isActive
                  ? "border-sky-500 bg-sky-500/15 shadow-lg shadow-sky-500/15 scale-[1.02]"
                  : "border-border/70 bg-card/40 hover:border-sky-500/40 hover:bg-card/70"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`grid h-9 w-9 place-items-center rounded-lg border ${
                  isActive ? "border-sky-400 bg-sky-400/20 text-sky-300" : "border-border/70 bg-background text-muted-foreground"
                }`}>
                  <Icon size={18} />
                </span>
                <span className="text-[11px] font-mono font-bold uppercase text-sky-400">{step.badge}</span>
              </div>
              <p className={`font-bold text-sm ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                {step.short}
              </p>
            </button>
          )
        })}
      </div>

      {/* Detail Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="rounded-xl border border-sky-500/30 bg-slate-950 p-6 shadow-xl"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wide">
                {currentStep.tech}
              </span>
              <h4 className="text-xl font-bold text-slate-100">{currentStep.title}</h4>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                type="button"
                className="inline-flex items-center gap-2 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 px-4 py-2 text-xs font-bold text-sky-300 transition-colors"
              >
                <span>{lang === "fr" ? "Étape suivante" : "Next step"}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          <p className="my-4 text-sm text-slate-300 leading-relaxed">{currentStep.description}</p>

          <div className="rounded-lg border border-slate-800 bg-slate-900/90 p-4">
            <p className="text-xs font-mono font-bold text-slate-400 mb-2 uppercase">
              {lang === "fr" ? "Structure de la donnée / Payload de démonstration :" : "Data Structure / Demo Payload:"}
            </p>
            <pre className="text-xs sm:text-sm font-mono text-emerald-400 overflow-x-auto leading-relaxed whitespace-pre-wrap">
              {currentStep.payload}
            </pre>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
