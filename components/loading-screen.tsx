"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simuler le chargement avec une barre de progression
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + 5 // Progression constante
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  if (!isLoading) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] bg-background flex items-center justify-center"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Fond avec effet de grille */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="relative z-10 text-center">
          {/* Logo/Initiales animées */}
          <motion.div
            className="mb-8 relative"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Cercle extérieur rotatif */}
            <motion.div
              className="w-24 h-24 mx-auto rounded-full border-2 border-primary/20 border-t-primary"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Initiales au centre */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
            >
              <span className="text-3xl font-bold text-primary">SL</span>
            </motion.div>

            {/* Particules flottantes */}
            {[
              { left: "30px", top: "30px" },
              { left: "50px", top: "60px" },
              { left: "70px", top: "20px" },
              { left: "20px", top: "70px" },
              { left: "80px", top: "50px" },
              { left: "40px", top: "80px" }
            ].map((position, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary/40 rounded-full"
                style={{
                  left: position.left,
                  top: position.top,
                }}
                animate={{
                  scale: [0.5, 1, 0.5],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </motion.div>

          {/* Nom */}
          <motion.h1
            className="text-2xl lg:text-3xl font-bold text-foreground mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Sohaib LAARICHI
          </motion.h1>

          {/* Sous-titre */}
          <motion.p
            className="text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Développeur Web Full-Stack
          </motion.p>

          {/* Barre de progression */}
          <motion.div
            className="w-64 mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Chargement du portfolio</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          </motion.div>

          {/* Points de chargement animés */}
          <motion.div
            className="flex justify-center gap-1 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-primary rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}