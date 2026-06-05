"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import type { TargetAndTransition } from "framer-motion"

interface AnimatedIconProps {
  children: ReactNode
  animation?: "float" | "bounce" | "rotate" | "pop"
  delay?: number
  hoverScale?: number
}

export default function AnimatedIcon({
  children,
  animation = "float",
  delay = 0,
  hoverScale = 1.1,
}: AnimatedIconProps) {
  const animationVariants: Record<NonNullable<AnimatedIconProps["animation"]>, TargetAndTransition> = {
    float: {
      y: [-2, 2, -2],
      transition: { 
        duration: 4, 
        repeat: Number.POSITIVE_INFINITY, 
        ease: "easeInOut" as const,
        repeatType: "reverse" as const
      },
    },
    bounce: {
      y: [0, -8, 0],
      transition: { 
        duration: 2.5, 
        repeat: Number.POSITIVE_INFINITY, 
        ease: "easeOut" as const,
        repeatDelay: 3
      },
    },
    rotate: {
      rotate: [0, 360],
      transition: { 
        duration: 8, 
        repeat: Number.POSITIVE_INFINITY, 
        ease: "linear" as const,
      },
    },
    pop: {
      scale: [1, 1.1, 1],
      transition: { 
        duration: 1.5, 
        repeat: Number.POSITIVE_INFINITY, 
        repeatDelay: 2,
        ease: "easeInOut" as const,
      },
    },
  }

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, rotate: -180 }}
      animate={{ 
        scale: 1, 
        opacity: 1, 
        rotate: 0,
        ...animationVariants[animation] 
      }}
      transition={{ 
        delay, 
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }}
      whileHover={{ 
        scale: hoverScale,
        transition: { duration: 0.2, ease: "easeOut" as const }
      }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center justify-center cursor-pointer"
    >
      {children}
    </motion.div>
  )
}
