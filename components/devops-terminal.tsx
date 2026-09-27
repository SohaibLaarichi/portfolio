"use client"

import { useState } from "react"
import { useLanguage } from "@/hooks/use-language"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, Copy, Check, Play, Sparkles } from "lucide-react"
import { toast } from "sonner"

export default function DevOpsTerminal() {
  const { lang } = useLanguage()
  const [activeTab, setActiveTab] = useState<string>("stack")
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)

  const commandsMap: Record<string, { label: string; cmd: string; content: React.ReactNode }> = {
    stack: {
      label: "stack.json",
      cmd: "cat stack.json",
      content: (
        <pre className="text-emerald-400 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
{`{
  "engineer": "Sohaib LAARICHI",
  "title": "Ingénieur d'État en Informatique – Full Stack & DevOps",
  "education": "EMSI Marrakech (MIAGE 2024-2026) | UPM (Licence & BTS)",
  "specialties": ["Full Stack", "DevOps & Cloud", "HealthTech & Systems"],
  "tech_stack": {
    "frontend": ["React", "Next.js", "TypeScript", "Tailwind CSS", "Flutter"],
    "backend": ["Java", "Spring Boot", "Node.js", "Express.js", "GraphQL", "REST APIs"],
    "databases": ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
    "devops_cloud": ["Docker", "Kubernetes", "CI/CD (GitHub Actions)", "Helm", "Azure / AWS"],
    "systems_network": ["Linux (Fedora/Zorin)", "Windows Server", "Cisco VLAN", "Bash/PowerShell"],
    "healthtech": ["FHIR R4", "ASTM", "HL7 v2", "DICOM", "Mirth Connect"]
  },
  "status": "Available for Full-time Hiring / CDI / Freelance (Maroc / Remote)"
}`}
        </pre>
      ),
    },
    docker: {
      label: "docker ps",
      cmd: "docker ps --format 'table {{.Names}}\\t{{.Status}}\\t{{.Ports}}'",
      content: (
        <pre className="text-sky-300 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
{`CONTAINER ID   NAMES                    STATUS          PORTS
7a8b9c0d1e2f   soukara-web-nextjs       Up 3 days       0.0.0.0:3000->3000/tcp
a1b2c3d4e5f6   soukara-backend-spring   Up 3 days       0.0.0.0:8080->8080/tcp
f6e5d4c3b2a1   postgres-production-db   Up 3 days       0.0.0.0:5432->5432/tcp
1029384756ab   firelis-interop-fhir     Up 5 days       0.0.0.0:8089->8089/tcp
9876543210cd   mirth-connect-router     Up 5 days       0.0.0.0:8443->8443/tcp`}
        </pre>
      ),
    },
    k8s: {
      label: "kubectl get pods",
      cmd: "kubectl get pods -n production",
      content: (
        <pre className="text-emerald-300 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
{`NAME                                   READY   STATUS    RESTARTS   AGE
firelis-api-deployment-784d9f67-a12b   1/1     Running   0          3d
soukara-web-deployment-5c67f89d-43bc   1/1     Running   0          3d
soukara-service-spring-69d8b74-9f82    1/1     Running   0          3d
fhir-gateway-ingress-7b44d7d8-x99z     1/1     Running   0          5d`}
        </pre>
      ),
    },
    fhir: {
      label: "fhir-check.sh",
      cmd: "./fhir-check.sh --endpoint https://api.sohaiblaarichi.tech/fhir/R4",
      content: (
        <div className="font-mono text-xs sm:text-sm space-y-1 text-slate-200">
          <p className="text-yellow-400">[INFO] Initializing FHIR R4 & ASTM Bundle Validator...</p>
          <p className="text-emerald-400">[OK] Patient/101 schema validated against HL7 FHIR R4 specification.</p>
          <p className="text-emerald-400">[OK] Observation/laboratory ASTM protocol analyzer interface active.</p>
          <p className="text-sky-400">[HTTP 200] Interoperability bridge operational.</p>
        </div>
      ),
    },
    whoami: {
      label: "whoami",
      cmd: "whoami && uptime",
      content: (
        <div className="font-mono text-xs sm:text-sm space-y-1 text-emerald-300">
          <p><strong>User:</strong> Sohaib LAARICHI</p>
          <p><strong>Role:</strong> Ingénieur d'État en Informatique (Full Stack & DevOps)</p>
          <p><strong>Education:</strong> Diplôme d'Ingénieur MIAGE @ EMSI Marrakech (2024-2026)</p>
          <p><strong>Uptime:</strong> 100% motivation, ready for high-impact challenges!</p>
        </div>
      ),
    },
  }

  const current = commandsMap[activeTab]

  const handleCopyCmd = () => {
    navigator.clipboard.writeText(current.cmd)
    setCopiedCommand(current.cmd)
    toast.success(lang === "fr" ? "Commande copiée !" : "Command copied!")
    setTimeout(() => setCopiedCommand(null), 2000)
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="overflow-hidden rounded-xl border border-border/80 bg-slate-950 shadow-2xl shadow-black/40">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-500/80" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 flex items-center gap-1.5 text-xs font-semibold text-slate-400">
              <Terminal size={14} className="text-indigo-400" />
              sohaib@devops-console:~
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCmd}
              type="button"
              className="inline-flex items-center gap-1 rounded-md border border-slate-700 bg-slate-800/60 px-2.5 py-1 text-xs text-slate-300 transition-colors hover:bg-slate-700"
              title="Copier la commande"
            >
              {copiedCommand === current.cmd ? (
                <Check size={13} className="text-emerald-400" />
              ) : (
                <Copy size={13} />
              )}
              <span className="hidden sm:inline">{lang === "fr" ? "Copier" : "Copy"}</span>
            </button>
          </div>
        </div>

        {/* Interactive Tabs / Command Selectors */}
        <div className="flex flex-wrap border-b border-slate-800 bg-slate-900/50 p-2 gap-1.5">
          {Object.entries(commandsMap).map(([key, item]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              type="button"
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-mono font-medium transition-all ${
                activeTab === key
                  ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent"
              }`}
            >
              <Play size={11} className={activeTab === key ? "text-indigo-400 fill-indigo-400" : "opacity-40"} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Terminal Screen Output */}
        <div className="p-5 font-mono min-h-[220px] bg-slate-950/90 selection:bg-indigo-500/30">
          <div className="flex items-center gap-2 mb-3 text-xs sm:text-sm text-slate-400">
            <span className="text-emerald-400 font-bold">sohaib@marrakech:~$</span>
            <span className="text-cyan-300 font-semibold">{current.cmd}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="mt-2"
            >
              {current.content}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer info */}
        <div className="border-t border-slate-900 bg-slate-950 px-4 py-2 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span className="flex items-center gap-1 text-emerald-400">
            <Sparkles size={12} /> Live Interactive Console
          </span>
          <span>UTF-8 | Zsh / Linux</span>
        </div>
      </div>
    </section>
  )
}
