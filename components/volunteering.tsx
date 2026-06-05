"use client"

import { useLanguage } from "@/hooks/use-language"
import { volunteeringContent } from "@/lib/content"
import SectionTitle from "./section-title"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { motion } from "framer-motion"
import AnimatedIcon from "./animated-icon"
import { Heart } from "lucide-react"

export default function Volunteering() {
  const { lang } = useLanguage()
  const content = volunteeringContent[lang]
  const { ref, isVisible } = useScrollReveal()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { y: -4, transition: { duration: 0.2 } },
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-16 border-t border-border" ref={ref}>
      <SectionTitle>{content.title}</SectionTitle>

      <motion.div
        className="space-y-4"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {content.activities.map((activity, i) => (
          <motion.div key={i} className="group" variants={cardVariants} whileHover="hover">
            <div className="flex items-start gap-3">
              <AnimatedIcon animation="pop" delay={i * 0.1} hoverScale={1.3}>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Heart size={18} className="text-primary" />
                </div>
              </AnimatedIcon>

              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {activity.title}
                </h3>
                <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
                  {activity.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
