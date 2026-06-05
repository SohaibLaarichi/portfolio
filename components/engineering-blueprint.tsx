"use client"

import { useLanguage } from "@/hooks/use-language"
import { Code2, Database, GitBranch, Network, ServerCog, ShieldCheck, Workflow } from "lucide-react"

const blueprintContent = {
  fr: {
    eyebrow: "Signature d'ingénieur",
    title: "Je pense les projets comme des systèmes complets.",
    intro:
      "Mon portfolio ne montre pas seulement des technologies. Il montre une approche: comprendre le besoin, concevoir l'architecture, sécuriser les échanges, livrer proprement et mesurer ce qui compte.",
    flow: [
      { label: "Interface", detail: "React / Next.js", icon: Code2 },
      { label: "API", detail: "Node.js / Java", icon: ServerCog },
      { label: "Données", detail: "MongoDB / SQL", icon: Database },
      { label: "Sécurité", detail: "NAC / ISO / JWT", icon: ShieldCheck },
      { label: "Réseau", detail: "VLAN / AD / DNS", icon: Network },
      { label: "Livraison", detail: "Docker / Azure", icon: GitBranch },
    ],
    principles: ["Architecture claire", "Sécurité dès la conception", "Performance mesurable"],
  },
  en: {
    eyebrow: "Engineering signature",
    title: "I think about projects as complete systems.",
    intro:
      "This portfolio does not only show technologies. It shows an approach: understand the need, design the architecture, secure exchanges, ship cleanly, and measure what matters.",
    flow: [
      { label: "Interface", detail: "React / Next.js", icon: Code2 },
      { label: "API", detail: "Node.js / Java", icon: ServerCog },
      { label: "Data", detail: "MongoDB / SQL", icon: Database },
      { label: "Security", detail: "NAC / ISO / JWT", icon: ShieldCheck },
      { label: "Network", detail: "VLAN / AD / DNS", icon: Network },
      { label: "Delivery", detail: "Docker / Azure", icon: GitBranch },
    ],
    principles: ["Clear architecture", "Security by design", "Measurable performance"],
  },
}

export default function EngineeringBlueprint() {
  const { lang } = useLanguage()
  const content = blueprintContent[lang]

  return (
    <section className="max-w-6xl mx-auto px-6 py-14 border-t border-border/70">
      <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-12 items-start">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold uppercase text-primary">
            <Workflow size={14} />
            {content.eyebrow}
          </p>
          <h2 className="text-3xl lg:text-4xl font-black leading-tight text-foreground">{content.title}</h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">{content.intro}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {content.principles.map((principle) => (
              <span
                key={principle}
                className="rounded-full border border-border/70 bg-card/45 px-3 py-1.5 text-xs font-semibold text-foreground/85"
              >
                {principle}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border/70 bg-card/45 p-4 shadow-xl shadow-black/5 backdrop-blur">
          <div className="mb-4 flex items-center justify-between border-b border-border/60 pb-3">
            <div>
              <p className="text-xs font-semibold uppercase text-muted-foreground">system.pipeline</p>
              <p className="text-sm font-bold text-foreground">full-stack architecture map</p>
            </div>
            <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-bold text-emerald-400">
              stable
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {content.flow.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={item.label}
                  className="relative rounded-lg border border-border/70 bg-background/45 p-4 transition-colors hover:border-primary/45"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                      <Icon size={19} />
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                  </div>
                  <h3 className="font-bold text-foreground">{item.label}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
