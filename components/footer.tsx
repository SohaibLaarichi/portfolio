"use client"

import { useLanguage } from "@/hooks/use-language"
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  const { lang } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-stroke bg-card/25">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <a href="#hero" className="inline-flex items-center gap-3 font-bold text-foreground hover:text-accent">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-stroke-hi bg-surface font-mono text-xs">SL</span>
            Sohaib LAARICHI
          </a>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
            {lang === "fr"
              ? "Ingénieur Full Stack & DevOps · Java, Next.js, Cloud et HealthTech."
              : "Full Stack & DevOps Engineer · Java, Next.js, Cloud and HealthTech."}
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:items-end">
          <div className="flex items-center gap-2">
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
                  className="inline-flex items-center gap-1.5 rounded-full border border-stroke bg-surface px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:border-accent hover:text-accent"
                >
                  <Icon size={14} />
                  {item.label}
                  <ArrowUpRight size={12} />
                </a>
              )
            })}
          </div>
          <p className="text-xs text-muted-foreground">© {currentYear} Sohaib LAARICHI</p>
        </div>
      </div>
    </footer>
  )
}
