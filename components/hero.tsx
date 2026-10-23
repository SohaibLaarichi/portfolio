"use client"

import { useLanguage } from "@/hooks/use-language"
import { motion } from "framer-motion"
import Image from "next/image"
import {
  ArrowRight,
  CloudCog,
  Download,
  Github,
  HeartPulse,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react"

const technologies = [
  { label: "Spring Boot", icon: Layers3 },
  { label: "Next.js", icon: Layers3 },
  { label: "Docker", icon: CloudCog },
  { label: "Kubernetes", icon: CloudCog },
  { label: "FHIR R4", icon: HeartPulse },
]

export default function Hero() {
  const { lang } = useLanguage()
  const copy =
    lang === "fr"
      ? {
          eyebrow: "Ingénieur Full Stack & DevOps",
          title: "Je conçois des applications robustes, de l’interface au cloud.",
          description:
            "Ingénieur d’État basé à Marrakech, spécialisé en Java, Spring Boot, Next.js, DevOps et interopérabilité HealthTech.",
          projects: "Découvrir mes projets",
          resume: "Télécharger mon CV",
          location: "Marrakech, Maroc · Remote",
          availability: "Disponible immédiatement",
          stack: "Technologies principales",
        }
      : {
          eyebrow: "Full Stack & DevOps Engineer",
          title: "I build reliable applications, from interface to cloud.",
          description:
            "State Graduate Engineer based in Marrakech, specialized in Java, Spring Boot, Next.js, DevOps and HealthTech interoperability.",
          projects: "Explore my work",
          resume: "Download my resume",
          location: "Marrakech, Morocco · Remote",
          availability: "Available immediately",
          stack: "Core technologies",
        }

  return (
    <section className="relative mx-auto flex min-h-[82vh] max-w-6xl items-center px-6 py-16 lg:py-24">
      <div className="w-full">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className="mb-7 flex flex-wrap items-center gap-2.5 text-xs font-semibold">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-3 py-1.5 text-emerald-600 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {copy.availability}
              </span>
              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                <MapPin size={13} className="text-accent" />
                {copy.location}
              </span>
            </div>

            <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.18em] text-accent">
              {copy.eyebrow}
            </p>
            <h1 className="max-w-3xl text-balance text-4xl font-black leading-[1.02] tracking-[-0.045em] text-foreground sm:text-6xl lg:text-7xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
              {copy.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <motion.a
                href="#projects"
                className="nowotch-btn min-h-12 px-6 text-sm shadow-lg"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {copy.projects}
                <ArrowRight size={16} />
              </motion.a>
              <motion.a
                href={lang === "fr" ? "/CV_Sohaib_LaarichiFR.pdf" : "/CV_Sohaib_Laarichi_EN.pdf"}
                download
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-stroke bg-surface px-6 text-sm font-semibold text-foreground hover:border-stroke-hi hover:bg-surface-2"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download size={16} className="text-accent" />
                {copy.resume}
              </motion.a>
            </div>

            <div className="mt-7 flex items-center gap-2" aria-label={lang === "fr" ? "Profils professionnels" : "Professional profiles"}>
              {[
                { label: "LinkedIn", href: "https://www.linkedin.com/in/laarichi-sohaib", icon: Linkedin },
                { label: "GitHub", href: "https://github.com/Sohaib-Laarichi", icon: Github },
                { label: "Email", href: "mailto:sohaiblaarichi112@gmail.com", icon: Mail },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={item.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-stroke bg-surface text-muted-foreground hover:border-accent hover:text-accent"
                  >
                    <Icon size={17} />
                  </a>
                )
              })}
            </div>
          </motion.div>

          <motion.div
            className="relative mx-auto w-full max-w-[23rem] lg:mx-0 lg:ml-auto"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.12, duration: 0.65, ease: "easeOut" }}
          >
            <div className="absolute -inset-6 rounded-[2.5rem] bg-accent/12 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-stroke bg-card shadow-2xl">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/moi.png"
                  alt="Portrait professionnel de Sohaib Laarichi"
                  fill
                  className="object-cover object-[50%_28%]"
                  sizes="(max-width: 1024px) 368px, 368px"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-background via-background/35 to-transparent" />
              </div>
              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-background/80 p-4 backdrop-blur-xl">
                <p className="text-sm font-bold text-foreground">Sohaib LAARICHI</p>
                <p className="mt-1 text-xs text-muted-foreground">Java · Next.js · DevOps · HealthTech</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 border-y border-stroke py-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <p className="mb-3 text-center font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            {copy.stack}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {technologies.map((technology) => {
              const Icon = technology.icon
              return (
                <span key={technology.label} className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-accent">
                  <Icon size={15} />
                  {technology.label}
                </span>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
