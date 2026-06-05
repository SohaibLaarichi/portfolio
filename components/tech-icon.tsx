"use client"

import type React from "react"
import { motion } from "framer-motion"
import type { TargetAndTransition, Transition } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface TechIconProps {
  icon: React.ReactNode
  label: string
  animationType: "rotate" | "float" | "bounce" | "pulse" | "vibration" | "glow" | "steam" | "wiggle" | "lift" | "halo"
  size?: "sm" | "md" | "lg"
  delay?: number
}

const animationVariants: Record<
  TechIconProps["animationType"],
  {
    initial: TargetAndTransition
    animate: TargetAndTransition
    idle: TargetAndTransition
    idleTransition: Transition
    hover: TargetAndTransition
  }
> = {
  rotate: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    idle: {},
    idleTransition: {},
    hover: { scale: 1.1, filter: "drop-shadow(0 0 12px rgba(14, 165, 233, 0.6))" },
  },
  float: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    idle: {},
    idleTransition: {},
    hover: { scale: 1.15, y: -16 },
  },
  bounce: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    idle: {},
    idleTransition: {},
    hover: { scale: 1.2, y: -12, transition: { type: "spring", stiffness: 300 } },
  },
  pulse: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    idle: {},
    idleTransition: {},
    hover: { scale: 1.2, filter: "drop-shadow(0 0 16px rgba(14, 165, 233, 0.8))" },
  },
  vibration: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    idle: {},
    idleTransition: {},
    hover: { scale: 1.15, filter: "drop-shadow(0 0 12px rgba(34, 197, 94, 0.6))" },
  },
  glow: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    idle: {},
    idleTransition: {},
    hover: {
      scale: 1.15,
      filter: "drop-shadow(0 0 20px rgba(14, 165, 233, 0.8))",
    },
  },
  steam: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    idle: {},
    idleTransition: {},
    hover: { scale: 1.12, filter: "drop-shadow(0 -4px 12px rgba(255, 165, 0, 0.4))" },
  },
  wiggle: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    idle: {},
    idleTransition: {},
    hover: { scale: 1.1, rotate: 5 },
  },
  lift: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    idle: {},
    idleTransition: {},
    hover: { y: -16, scale: 1.12, filter: "drop-shadow(0 12px 24px rgba(14, 165, 233, 0.3))" },
  },
  halo: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    idle: {},
    idleTransition: {},
    hover: { scale: 1.15, boxShadow: "0 0 30px rgba(14, 165, 233, 0.8)" },
  },
}

const sizeMap = {
  sm: "w-12 h-12",
  md: "w-16 h-16",
  lg: "w-20 h-20",
}

export function TechIcon({ icon, label, animationType, size = "md", delay = 0 }: TechIconProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 })
  const variant = animationVariants[animationType]

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col items-center gap-2 ${sizeMap[size]}`}
      initial={inView ? variant.initial : { opacity: 0, y: 20 }}
      animate={inView ? { ...variant.animate, ...variant.idle } : { opacity: 0, y: 20 }}
      whileHover={variant.hover}
      transition={{
        delay,
        duration: 0.6,
        ease: "easeOut",
        ...variant.idleTransition,
      }}
    >
      <div className={`${sizeMap[size]} flex items-center justify-center text-primary`}>{icon}</div>
      <span className="text-xs text-muted-foreground text-center font-medium">{label}</span>
    </motion.div>
  )
}
