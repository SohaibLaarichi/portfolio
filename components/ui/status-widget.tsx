"use client"

import { useLanguage } from "@/hooks/use-language"
import { motion } from "framer-motion"
import { Clock, MapPin, Sparkles, Zap } from "lucide-react"

export function StatusWidget() {
  const { lang } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.5 }}
      className="inline-flex flex-wrap items-center gap-2 rounded-full border border-primary/20 bg-card/70 px-3.5 py-1.5 text-xs shadow-lg shadow-primary/5 backdrop-blur-md"
    >
      {/* Live Pulse Dot */}
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
      </span>

      <span className="font-semibold text-foreground">
        {lang === "fr" ? "Disponible immédiatement" : "Available immediately"}
      </span>

      <span className="hidden sm:inline text-muted-foreground/50">·</span>

      <span className="hidden sm:inline-flex items-center gap-1 text-muted-foreground">
        <MapPin size={12} className="text-primary" />
        <span>Marrakech (UTC+1)</span>
      </span>

      <span className="hidden md:inline text-muted-foreground/50">·</span>

      <span className="hidden md:inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-bold text-primary">
        <Zap size={11} />
        <span>CDI / Mission</span>
      </span>
    </motion.div>
  )
}
