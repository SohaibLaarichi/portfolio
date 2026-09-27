"use client"

import React, { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

interface AnimatedCounterProps {
  value: string
  suffix?: string
  duration?: number
}

export function AnimatedCounter({ value, suffix = "", duration = 1200 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [displayValue, setDisplayValue] = useState<string>("0")

  useEffect(() => {
    // If value is non-numeric (e.g. "Full Stack", "DevOps", "FR/EN"), display directly
    const numericPart = parseInt(value.replace(/[^0-9]/g, ""), 10)
    if (isNaN(numericPart)) {
      setDisplayValue(value)
      return
    }

    if (!isInView) return

    const hasPlus = value.includes("+")
    const isYear = numericPart > 1900 && numericPart < 2100
    const start = isYear ? numericPart - 15 : 0
    const end = numericPart
    const startTime = performance.now()

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(start + (end - start) * easedProgress)

      setDisplayValue(`${current}${hasPlus ? "+" : ""}`)

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      } else {
        setDisplayValue(value)
      }
    }

    requestAnimationFrame(updateCount)
  }, [isInView, value, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
      {suffix && <span>{suffix}</span>}
    </span>
  )
}
