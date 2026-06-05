"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export default function SectionTitle({ children }: { children: React.ReactNode }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.3 })

  return (
    <motion.div ref={ref} className="relative mb-10">
      <motion.h2
        className="text-3xl lg:text-4xl font-black text-foreground"
        initial={{ opacity: 0, y: 10 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.h2>

      {/* Animated underline accent */}
      <motion.div
        className="absolute -bottom-3 left-0 h-1 bg-gradient-to-r from-primary via-emerald-300 to-transparent rounded-full"
        initial={{ width: 0 }}
        animate={isVisible ? { width: 60 } : { width: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />
    </motion.div>
  )
}
