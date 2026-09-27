"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/hooks/use-language"
import {
  Code2,
  ServerCog,
  ShieldCheck,
  Network,
  Database,
  Activity,
  Sparkles,
  Layers,
} from "lucide-react"

interface SkillAxis {
  id: string
  labelFr: string
  labelEn: string
  score: number // percentage 0 - 100
  technologies: string[]
  descriptionFr: string
  descriptionEn: string
  icon: React.ElementType
}

const skillAxes: SkillAxis[] = [
  {
    id: "fullstack",
    labelFr: "Full Stack",
    labelEn: "Full Stack",
    score: 95,
    technologies: ["Java", "Spring Boot", "Next.js", "React", "TypeScript", "Node.js"],
    descriptionFr: "Conception d'architectures web et microservices performants et évolutifs.",
    descriptionEn: "Engineering robust, scalable web architectures and microservices.",
    icon: Code2,
  },
  {
    id: "devops",
    labelFr: "DevOps & Cloud",
    labelEn: "DevOps & Cloud",
    score: 92,
    technologies: ["Docker", "Kubernetes", "CI/CD Actions", "Helm", "Linux Zsh/Bash"],
    descriptionFr: "Conteneurisation, automatisation de pipelines de déploiement et orchestration K8s.",
    descriptionEn: "Containerization, automated deployment pipelines, and K8s orchestration.",
    icon: ServerCog,
  },
  {
    id: "healthtech",
    labelFr: "HealthTech & Normes",
    labelEn: "HealthTech & Standards",
    score: 90,
    technologies: ["FHIR R4", "ASTM", "HL7 v2", "Mirth Connect", "HAPI FHIR"],
    descriptionFr: "Interopérabilité médicale, passerelles d'automates de laboratoire et données de santé.",
    descriptionEn: "Medical interoperability, laboratory automation bridges, and health data.",
    icon: Activity,
  },
  {
    id: "systems",
    labelFr: "Systèmes & Infra",
    labelEn: "Systems & Infra",
    score: 88,
    technologies: ["Linux (Fedora/Zorin)", "Windows Server", "Active Directory (ADDS)", "GPO"],
    descriptionFr: "Administration d'infrastructures d'entreprise, sécurité de domaine et virtualisation.",
    descriptionEn: "Enterprise system administration, domain security, and virtualization.",
    icon: ShieldCheck,
  },
  {
    id: "network",
    labelFr: "Réseaux & Sécurité",
    labelEn: "Networks & Security",
    score: 85,
    technologies: ["VLAN Cisco", "Routage", "DHCP / DNS", "Zero-Trust", "Firewall"],
    descriptionFr: "Segmentation réseau d'entreprise, commutation Cisco et protocoles de routage.",
    descriptionEn: "Enterprise network segmentation, Cisco switching, and routing protocols.",
    icon: Network,
  },
  {
    id: "databases",
    labelFr: "Data & APIs",
    labelEn: "Data & APIs",
    score: 92,
    technologies: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "REST", "GraphQL"],
    descriptionFr: "Modélisation relationnelle et NoSQL, requêtes optimisées et caches distribués.",
    descriptionEn: "Relational & NoSQL data modeling, query optimization, and distributed caching.",
    icon: Database,
  },
]

export function SkillRadarChart() {
  const { lang } = useLanguage()
  const [selectedAxisIndex, setSelectedAxisIndex] = useState<number>(0)
  const [hoveredAxisIndex, setHoveredAxisIndex] = useState<number | null>(null)

  const activeIndex = hoveredAxisIndex !== null ? hoveredAxisIndex : selectedAxisIndex
  const activeAxis = skillAxes[activeIndex]

  // Geometry calculations for 6-axis Radar
  const size = 320
  const center = size / 2
  const maxRadius = 110
  const totalAxes = skillAxes.length
  const angleStep = (Math.PI * 2) / totalAxes

  // Helper to compute (x, y) for an axis index and percentage
  const getCoordinates = (index: number, percentage: number) => {
    // Start at top (-PI / 2)
    const angle = index * angleStep - Math.PI / 2
    const r = (percentage / 100) * maxRadius
    const x = center + r * Math.cos(angle)
    const y = center + r * Math.sin(angle)
    return { x, y }
  }

  // Polygon point strings
  const levels = [25, 50, 75, 100]

  const getPolygonPoints = (percentage: number) => {
    return skillAxes
      .map((_, i) => {
        const { x, y } = getCoordinates(i, percentage)
        return `${x.toFixed(1)},${y.toFixed(1)}`
      })
      .join(" ")
  }

  const dataPolygonPoints = skillAxes
    .map((axis, i) => {
      const { x, y } = getCoordinates(i, axis.score)
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(" ")

  return (
    <div className="rounded-2xl border border-indigo-500/25 bg-card/60 p-5 shadow-2xl backdrop-blur-xl transition-all duration-300">
      {/* Title Header */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Sparkles size={16} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground">
              {lang === "fr" ? "Radar des Compétences 360°" : "360° Skills Radar"}
            </h4>
            <p className="text-[11px] text-muted-foreground">
              {lang === "fr" ? "Visualisation d'expertise interactive" : "Interactive expertise visualization"}
            </p>
          </div>
        </div>

        <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-400">
          PRO-LEVEL
        </span>
      </div>

      {/* Interactive SVG Radar Container */}
      <div className="relative flex justify-center items-center py-2">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full max-w-[280px] sm:max-w-[300px] h-auto drop-shadow-[0_0_25px_rgba(99,102,241,0.15)]"
        >
          <defs>
            {/* Gradient for the radar polygon area */}
            <radialGradient id="radarAreaGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#6366f1" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.08" />
            </radialGradient>
            {/* Glow filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Web concentric polygon background rings */}
          {levels.map((level) => (
            <polygon
              key={level}
              points={getPolygonPoints(level)}
              fill="none"
              stroke="currentColor"
              className="text-border/40 stroke-dasharray-[2_2]"
              strokeWidth="0.8"
            />
          ))}

          {/* Radiating axis lines from center */}
          {skillAxes.map((_, i) => {
            const end = getCoordinates(i, 100)
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={end.x}
                y2={end.y}
                stroke="currentColor"
                className="text-border/60"
                strokeWidth="1"
              />
            )
          })}

          {/* Filled Data Polygon with Smooth Animation */}
          <motion.polygon
            points={dataPolygonPoints}
            fill="url(#radarAreaGradient)"
            stroke="#6366f1"
            strokeWidth="2"
            filter="url(#glow)"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          {/* Vertex interactive points & pulses */}
          {skillAxes.map((axis, i) => {
            const { x, y } = getCoordinates(i, axis.score)
            const isSelected = activeIndex === i

            return (
              <g
                key={axis.id}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredAxisIndex(i)}
                onMouseLeave={() => setHoveredAxisIndex(null)}
                onClick={() => setSelectedAxisIndex(i)}
              >
                {/* Outer halo if selected */}
                {isSelected && (
                  <circle
                    cx={x}
                    cy={y}
                    r={9}
                    className="fill-indigo-500/30 stroke-indigo-400 stroke-1 animate-ping"
                  />
                )}
                {/* Node circle */}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 5.5 : 4}
                  fill={isSelected ? "#06b6d4" : "#6366f1"}
                  stroke="#ffffff"
                  strokeWidth={isSelected ? 2 : 1}
                  className="transition-all duration-200"
                />
              </g>
            )
          })}

          {/* Outer text labels around radar */}
          {skillAxes.map((axis, i) => {
            const labelCoord = getCoordinates(i, 118)
            const isSelected = activeIndex === i
            const labelText = lang === "fr" ? axis.labelFr : axis.labelEn

            let textAnchor: "middle" | "start" | "end" = "middle"
            if (i === 1 || i === 2) textAnchor = "start"
            if (i === 4 || i === 5) textAnchor = "end"

            return (
              <text
                key={axis.id}
                x={labelCoord.x}
                y={labelCoord.y + (i === 3 ? 10 : i === 0 ? -4 : 4)}
                textAnchor={textAnchor}
                onClick={() => setSelectedAxisIndex(i)}
                onMouseEnter={() => setHoveredAxisIndex(i)}
                onMouseLeave={() => setHoveredAxisIndex(null)}
                className={`text-[10px] sm:text-[11px] font-mono cursor-pointer transition-colors duration-200 select-none ${
                  isSelected
                    ? "fill-indigo-400 font-bold drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                    : "fill-muted-foreground hover:fill-foreground"
                }`}
              >
                {labelText} ({axis.score}%)
              </text>
            )
          })}
        </svg>
      </div>

      {/* Axis Selector Chips for Mobile / Quick tap */}
      <div className="flex flex-wrap gap-1.5 justify-center py-2 border-t border-border/50">
        {skillAxes.map((axis, i) => {
          const isSelected = activeIndex === i
          const Icon = axis.icon
          return (
            <button
              key={axis.id}
              onClick={() => {
                setSelectedAxisIndex(i)
                setHoveredAxisIndex(null)
              }}
              type="button"
              className={`flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium transition-all ${
                isSelected
                  ? "bg-primary text-primary-foreground font-bold shadow-md shadow-primary/20 scale-105"
                  : "bg-background/40 text-muted-foreground hover:bg-secondary hover:text-foreground border border-border/50"
              }`}
            >
              <Icon size={12} />
              <span>{lang === "fr" ? axis.labelFr : axis.labelEn}</span>
            </button>
          )
        })}
      </div>

      {/* Dynamic Detail Card of Active Axis */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeAxis.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="mt-3 rounded-xl border border-indigo-500/20 bg-background/50 p-3.5"
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              {React.createElement(activeAxis.icon, { size: 16, className: "text-primary" })}
              <h5 className="font-bold text-xs sm:text-sm text-foreground">
                {lang === "fr" ? activeAxis.labelFr : activeAxis.labelEn}
              </h5>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-mono text-muted-foreground">Maîtrise :</span>
              <span className="font-mono text-xs font-black text-cyan-400">
                {activeAxis.score}%
              </span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed mb-2.5">
            {lang === "fr" ? activeAxis.descriptionFr : activeAxis.descriptionEn}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {activeAxis.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-indigo-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
