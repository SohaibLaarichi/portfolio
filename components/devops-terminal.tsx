"use client"

import React, { useState, useRef, useEffect, type FormEvent, type KeyboardEvent } from "react"
import { useLanguage } from "@/hooks/use-language"
import { motion, AnimatePresence } from "framer-motion"
import {
  Terminal,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  CornerDownLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
} from "lucide-react"
import { toast } from "sonner"
import { useTheme } from "next-themes"

interface HistoryEntry {
  id: string
  command: string
  output: React.ReactNode
  time: string
}

export default function DevOpsTerminal() {
  const { lang } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [inputVal, setInputVal] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number>(-1)
  const [isMaximized, setIsMaximized] = useState(false)
  const [copied, setCopied] = useState(false)

  const terminalEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const getTimeString = () => {
    const now = new Date()
    return now.toTimeString().split(" ")[0]
  }

  // Pre-loaded initial welcome history
  const [entries, setEntries] = useState<HistoryEntry[]>([
    {
      id: "init-1",
      command: "whoami && uptime",
      time: "10:00:00",
      output: (
        <div className="font-mono text-xs sm:text-sm space-y-1 text-emerald-300">
          <p>
            <span className="text-muted-foreground">User:</span>{" "}
            <strong className="text-white">Sohaib LAARICHI</strong>
          </p>
          <p>
            <span className="text-muted-foreground">Title:</span>{" "}
            <strong>Ingénieur d'État en Informatique – Full Stack & DevOps</strong>
          </p>
          <p>
            <span className="text-muted-foreground">Education:</span> EMSI Marrakech (MIAGE 2024–2026) · UPM
          </p>
          <p>
            <span className="text-muted-foreground">Status:</span>{" "}
            <span className="text-emerald-400 font-bold">● DISPONIBLE IMMÉDIATEMENT (CDI / Mission)</span>
          </p>
        </div>
      ),
    },
    {
      id: "init-2",
      command: "help",
      time: "10:00:01",
      output: (
        <div className="font-mono text-xs sm:text-sm space-y-1.5 text-slate-300">
          <p className="text-indigo-400 font-bold">
            {lang === "fr"
              ? "Commandes interactives disponibles :"
              : "Available interactive commands:"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs">
            <p>
              <span className="text-cyan-300 font-bold">docker ps</span> - Conteneurs en production
            </p>
            <p>
              <span className="text-cyan-300 font-bold">kubectl get pods</span> - Pods K8s du cluster
            </p>
            <p>
              <span className="text-cyan-300 font-bold">curl fhir</span> - Test interopérabilité FHIR R4 / ASTM
            </p>
            <p>
              <span className="text-cyan-300 font-bold">cat stack.json</span> - Stack technique détaillée
            </p>
            <p>
              <span className="text-cyan-300 font-bold">cv</span> - Télécharger / Afficher le CV officiel
            </p>
            <p>
              <span className="text-cyan-300 font-bold">contact</span> - Coordonnées et réseaux
            </p>
            <p>
              <span className="text-cyan-300 font-bold">clear</span> - Effacer l'écran
            </p>
            <p>
              <span className="text-cyan-300 font-bold">theme</span> - Basculer le thème (dark / light)
            </p>
          </div>
        </div>
      ),
    },
  ])

  // Scroll to bottom when entries update
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [entries])

  const executeCommand = (cmdText: string) => {
    const trimmed = cmdText.trim()
    if (!trimmed) return

    const normalized = trimmed.toLowerCase()

    // Add to history
    setCommandHistory((prev) => [...prev, trimmed])
    setHistoryIndex(-1)

    let responseOutput: React.ReactNode = null

    if (normalized === "clear") {
      setEntries([])
      setInputVal("")
      return
    }

    switch (true) {
      case normalized === "help" || normalized === "?":
        responseOutput = (
          <div className="font-mono text-xs sm:text-sm space-y-1.5 text-slate-300">
            <p className="text-indigo-400 font-bold">
              {lang === "fr" ? "Commandes disponibles :" : "Available commands:"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs">
              <p>
                <span className="text-cyan-300 font-bold">docker ps</span> - Liste des conteneurs
              </p>
              <p>
                <span className="text-cyan-300 font-bold">kubectl get pods</span> - État des pods K8s
              </p>
              <p>
                <span className="text-cyan-300 font-bold">curl fhir</span> - Sonde d'interopérabilité
              </p>
              <p>
                <span className="text-cyan-300 font-bold">cat stack.json</span> - Fichier stack JSON
              </p>
              <p>
                <span className="text-cyan-300 font-bold">whoami</span> - Profil & statut ingénieur
              </p>
              <p>
                <span className="text-cyan-300 font-bold">projects</span> - Résumé des projets phares
              </p>
              <p>
                <span className="text-cyan-300 font-bold">cv</span> - Télécharger le nouveau CV PDF
              </p>
              <p>
                <span className="text-cyan-300 font-bold">contact</span> - Email, téléphone, LinkedIn, GitHub
              </p>
              <p>
                <span className="text-cyan-300 font-bold">theme</span> - Basculer sombre / clair
              </p>
              <p>
                <span className="text-cyan-300 font-bold">clear</span> - Réinitialiser la console
              </p>
            </div>
          </div>
        )
        break

      case normalized.startsWith("docker"):
        responseOutput = (
          <pre className="text-sky-300 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
{`CONTAINER ID   IMAGE                        COMMAND               CREATED       STATUS       PORTS
7a8b9c0d1e2f   sohaib/firelis-api:v2.4      "java -jar app.jar"   3 days ago    Up 3 days    0.0.0.0:8080->8080/tcp
a1b2c3d4e5f6   sohaib/soukara-web:latest    "node server.js"      3 days ago    Up 3 days    0.0.0.0:3000->3000/tcp
f6e5d4c3b2a1   postgres:16-alpine           "docker-entrypoint…"  3 days ago    Up 3 days    0.0.0.0:5432->5432/tcp
1029384756ab   hapifhir/hapi-fhir-jpaserver "catalina.sh run"     5 days ago    Up 5 days    0.0.0.0:8089->8089/tcp
9876543210cd   mirth-connect:4.4.1          "mcservice start"     5 days ago    Up 5 days    0.0.0.0:8443->8443/tcp`}
          </pre>
        )
        break

      case normalized.startsWith("kubectl") || normalized.startsWith("k8s"):
        responseOutput = (
          <pre className="text-emerald-300 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
{`NAME                                       READY   STATUS    RESTARTS   AGE    IP
firelis-api-deployment-784d9f67-a12b       1/1     Running   0          3d     10.244.1.45
soukara-web-deployment-5c67f89d-43bc       1/1     Running   0          3d     10.244.2.19
soukara-service-spring-69d8b74-9f82        1/1     Running   0          3d     10.244.2.20
fhir-gateway-ingress-7b44d7d8-x99z         1/1     Running   0          5d     10.244.0.12
postgres-statefulset-0                     1/1     Running   0          7d     10.244.3.08`}
          </pre>
        )
        break

      case normalized.includes("fhir") || normalized.includes("astm") || normalized.startsWith("curl"):
        responseOutput = (
          <div className="font-mono text-xs sm:text-sm space-y-1.5 text-slate-200">
            <p className="text-yellow-400 font-semibold">
              [INIT] Connecting to HealthTech HL7 / FHIR R4 & ASTM Gateway...
            </p>
            <p className="text-emerald-400">
              ✔ [OK 200] GET /fhir/R4/Patient/101 - FHIR JSON schema valid
            </p>
            <p className="text-emerald-400">
              ✔ [OK 200] ASTM E1381/E1394 Automated Analyser Driver: CONNECTED
            </p>
            <p className="text-sky-400">
              ✔ [ENCRYPTION] TLS 1.3 · HIPAA / HDS compliant payload encryption
            </p>
            <pre className="text-xs text-indigo-300 bg-slate-900/80 p-2.5 rounded border border-slate-800 mt-1 overflow-x-auto">
{`{
  "resourceType": "Observation",
  "id": "lab-sample-883",
  "status": "final",
  "code": { "coding": [{ "system": "http://loinc.org", "code": "2345-7", "display": "Glucose [Mass/volume] in Serum" }] },
  "subject": { "reference": "Patient/101" },
  "valueQuantity": { "value": 5.4, "unit": "mmol/L" }
}`}
            </pre>
          </div>
        )
        break

      case normalized.includes("stack") || normalized.includes("cat"):
        responseOutput = (
          <pre className="text-emerald-400 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
{`{
  "engineer": "Sohaib LAARICHI",
  "degree": "Ingénieur d'État en Informatique (EMSI MIAGE)",
  "specialties": ["Full Stack", "DevOps & Cloud", "HealthTech & Systems"],
  "stack": {
    "frontend": ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    "backend": ["Java", "Spring Boot", "Node.js", "Express.js", "REST", "GraphQL"],
    "devops": ["Docker", "Kubernetes", "CI/CD (GitHub Actions)", "Helm", "Linux"],
    "databases": ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
    "standards": ["FHIR R4", "ASTM", "HL7 v2", "Cisco VLAN", "Active Directory"]
  }
}`}
          </pre>
        )
        break

      case normalized === "whoami":
        responseOutput = (
          <div className="font-mono text-xs sm:text-sm space-y-1 text-emerald-300">
            <p>
              <strong className="text-white">Sohaib LAARICHI</strong> · Ingénieur d'État en Informatique
            </p>
            <p className="text-slate-300">
              Spécialité : Ingénierie logicielle Full Stack & Architecture DevOps
            </p>
            <p className="text-slate-300">
              Formation : EMSI Marrakech (MIAGE 2024–2026) · UPM (Licence & BTS)
            </p>
            <p className="text-indigo-400">
              Mobilité : Marrakech, Casablanca, Rabat, Maroc entier ou Remote international.
            </p>
          </div>
        )
        break

      case normalized === "cv" || normalized.includes("resume"):
        responseOutput = (
          <div className="font-mono text-xs sm:text-sm space-y-2 text-slate-200">
            <p className="text-emerald-400 font-bold">
              ✔ {lang === "fr" ? "Dernier CV officiel prêt au téléchargement :" : "Latest official resume ready:"}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href={lang === "fr" ? "/CV_Sohaib_LaarichiFR.pdf" : "/CV_Sohaib_Laarichi_EN.pdf"}
                download={lang === "fr" ? "CV_Sohaib_LaarichiFR.pdf" : "CV_Sohaib_Laarichi_EN.pdf"}
                className="inline-flex items-center gap-1.5 rounded bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground hover:bg-primary/90"
              >
                📥 {lang === "fr" ? "Télécharger le CV (PDF)" : "Download Resume (PDF)"}
              </a>
              <span className="text-xs text-slate-400 self-center">
                MD5: 82e9753e6153a4ec4519a5279b26cdcf (cvSOHAIBG.pdf)
              </span>
            </div>
          </div>
        )
        break

      case normalized === "contact":
        responseOutput = (
          <div className="font-mono text-xs sm:text-sm space-y-1 text-cyan-300">
            <p>
              📧 <span className="text-slate-400">Email:</span>{" "}
              <a href="mailto:sohaiblaarichi112@gmail.com" className="underline hover:text-white">
                sohaiblaarichi112@gmail.com
              </a>
            </p>
            <p>
              📞 <span className="text-slate-400">Tél:</span>{" "}
              <a href="tel:+212701820101" className="underline hover:text-white">
                +212 701-820101
              </a>
            </p>
            <p>
              💼 <span className="text-slate-400">LinkedIn:</span>{" "}
              <a href="https://www.linkedin.com/in/laarichi-sohaib" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                linkedin.com/in/laarichi-sohaib
              </a>
            </p>
            <p>
              🐙 <span className="text-slate-400">GitHub:</span>{" "}
              <a href="https://github.com/Sohaib-Laarichi" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                github.com/Sohaib-Laarichi
              </a>
            </p>
          </div>
        )
        break

      case normalized === "projects":
        responseOutput = (
          <div className="font-mono text-xs sm:text-sm space-y-1.5 text-slate-300">
            <p className="text-indigo-400 font-bold">🚀 Projets clés de Sohaib LAARICHI :</p>
            <p>
              <strong className="text-white">1. FireLIS / OpenELIS :</strong> Système de gestion de laboratoire avec interopérabilité FHIR R4 & protocoles ASTM.
            </p>
            <p>
              <strong className="text-white">2. Soukara (Web App) :</strong> Plateforme complète Next.js, Spring Boot & PostgreSQL.
            </p>
            <p>
              <strong className="text-white">3. freelancesTech (Mikhamdina) :</strong> Plateforme MERN (Next.js, Node.js, MongoDB) pour missions freelance.
            </p>
            <p>
              <strong className="text-white">4. PharmaLive :</strong> Système de gestion pharmaceutique complet avec traçabilité et facturation PDF.
            </p>
          </div>
        )
        break

      case normalized === "theme":
        const nextTheme = theme === "dark" ? "light" : "dark"
        setTheme(nextTheme)
        responseOutput = (
          <p className="text-emerald-400 font-mono text-xs sm:text-sm">
            ✔ Thème basculé vers <strong className="text-white uppercase">{nextTheme}</strong>.
          </p>
        )
        break

      case normalized.startsWith("sudo"):
        responseOutput = (
          <div className="font-mono text-xs sm:text-sm text-rose-400 space-y-1">
            <p>⚠ Permission denied: user 'visitor' is not in sudoers file.</p>
            <p className="text-xs text-slate-400">
              Les infrastructures de Sohaib sont protégées par une politique Zero-Trust et RBAC stricte !
            </p>
          </div>
        )
        break

      case normalized === "matrix":
        responseOutput = (
          <p className="text-emerald-400 font-mono text-xs tracking-wider animate-pulse">
            01010011 01101111 01101000 01100001 01101001 01100010 = SOHAIB LAARICHI
          </p>
        )
        break

      default:
        responseOutput = (
          <p className="font-mono text-xs sm:text-sm text-rose-400">
            zsh: command not found: {trimmed}. Tapez <strong className="text-cyan-300">help</strong> pour voir les commandes disponibles.
          </p>
        )
        break
    }

    setEntries((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: trimmed,
        time: getTimeString(),
        output: responseOutput,
      },
    ])

    setInputVal("")
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    executeCommand(inputVal)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length === 0) return
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(nextIndex)
      setInputVal(commandHistory[nextIndex] || "")
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex === -1) return
      const nextIndex = historyIndex + 1
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1)
        setInputVal("")
      } else {
        setHistoryIndex(nextIndex)
        setInputVal(commandHistory[nextIndex] || "")
      }
    }
  }

  const handleQuickChip = (cmd: string) => {
    executeCommand(cmd)
    inputRef.current?.focus()
  }

  const handleCopyLast = () => {
    const textToCopy = entries.map((e) => `$ ${e.command}`).join("\n")
    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    toast.success(lang === "fr" ? "Historique copié !" : "History copied!")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div
        className={`overflow-hidden rounded-2xl border border-indigo-500/30 bg-slate-950 shadow-2xl shadow-black/60 transition-all duration-300 ${
          isMaximized ? "fixed inset-4 z-50 rounded-xl" : "relative"
        }`}
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-500/80 cursor-pointer hover:opacity-80" onClick={() => setEntries([])} title="Clear" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80 cursor-pointer hover:opacity-80" onClick={() => setIsMaximized(!isMaximized)} title="Minimize/Maximize" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <Terminal size={14} className="text-indigo-400" />
              sohaib@devops-cluster:~ (interactive zsh)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setEntries([])}
              type="button"
              className="inline-flex items-center gap-1 rounded-md border border-slate-700 bg-slate-800/60 px-2 py-1 text-xs text-slate-300 hover:bg-slate-700 transition-colors"
              title="Réinitialiser l'écran"
            >
              <RotateCcw size={12} />
              <span className="hidden sm:inline">Reset</span>
            </button>

            <button
              onClick={handleCopyLast}
              type="button"
              className="inline-flex items-center gap-1 rounded-md border border-slate-700 bg-slate-800/60 px-2 py-1 text-xs text-slate-300 hover:bg-slate-700 transition-colors"
              title="Copier les commandes"
            >
              {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              <span className="hidden sm:inline">{lang === "fr" ? "Copier" : "Copy"}</span>
            </button>

            <button
              onClick={() => setIsMaximized(!isMaximized)}
              type="button"
              className="hidden sm:inline-flex items-center justify-center h-6 w-6 rounded-md border border-slate-700 bg-slate-800/60 text-slate-300 hover:bg-slate-700 transition-colors"
              title={isMaximized ? "Réduire" : "Plein écran"}
            >
              {isMaximized ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-800/80 bg-slate-900/60 px-4 py-2">
          <span className="text-[11px] font-mono text-muted-foreground mr-1 hidden sm:inline">
            Suggestions :
          </span>
          {[
            "docker ps",
            "kubectl get pods",
            "curl fhir",
            "cat stack.json",
            "cv",
            "contact",
            "help",
          ].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleQuickChip(cmd)}
              type="button"
              className="rounded-md border border-slate-800 bg-slate-800/50 px-2.5 py-1 font-mono text-[11px] text-cyan-300 hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-white transition-all active:scale-95"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Screen / Output Body */}
        <div
          onClick={() => inputRef.current?.focus()}
          className={`p-4 sm:p-5 font-mono bg-slate-950/95 overflow-y-auto selection:bg-indigo-500/30 cursor-text ${
            isMaximized ? "h-[calc(100vh-140px)]" : "max-h-[380px] min-h-[260px]"
          }`}
        >
          {entries.map((entry) => (
            <div key={entry.id} className="mb-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 mb-1.5">
                <span className="text-emerald-400 font-bold">sohaib@marrakech:~$</span>
                <span className="text-cyan-300 font-semibold">{entry.command}</span>
                <span className="ml-auto text-[10px] text-slate-600 font-mono hidden sm:inline">
                  {entry.time}
                </span>
              </div>
              <div className="pl-0 sm:pl-3 border-l-2 border-indigo-500/20">{entry.output}</div>
            </div>
          ))}

          {/* Active Interactive Input Line */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-2">
            <span className="text-emerald-400 font-bold text-xs sm:text-sm shrink-0">
              sohaib@marrakech:~$
            </span>
            <div className="relative flex-1 flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  lang === "fr"
                    ? "Tapez une commande (ex: docker ps, kubectl get pods, help)..."
                    : "Type a command (e.g. docker ps, kubectl get pods, help)..."
                }
                className="w-full bg-transparent font-mono text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-hidden"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck="false"
              />
              <button
                type="submit"
                aria-label="Exécuter"
                className="ml-2 text-slate-500 hover:text-cyan-300 transition-colors"
              >
                <CornerDownLeft size={14} />
              </button>
            </div>
          </form>
          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Footer Bar */}
        <div className="border-t border-slate-900 bg-slate-950 px-4 py-2 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Interactive Console Ready</span>
          </span>
          <span className="hidden sm:inline">Use ↑ / ↓ for history · Press Enter to run</span>
        </div>
      </div>
    </section>
  )
}
