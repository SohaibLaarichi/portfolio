"use client"

import * as React from "react"
import { useLanguage } from "@/hooks/use-language"
import { useTheme } from "next-themes"
import { toast } from "sonner"
import {
  Briefcase,
  Code2,
  Copy,
  Download,
  Eye,
  FileText,
  FolderGit2,
  Github,
  Globe,
  GraduationCap,
  Layers,
  Linkedin,
  Mail,
  Moon,
  Sun,
  User,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

interface CommandMenuProps {
  open: boolean
  setOpen: (open: boolean) => void
  onOpenPdfModal?: () => void
}

export function CommandMenu({ open, setOpen, onOpenPdfModal }: CommandMenuProps) {
  const { lang, toggleLanguage } = useLanguage()
  const { theme, setTheme } = useTheme()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        setOpen(!open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open, setOpen])

  const runCommand = React.useCallback(
    (command: () => void) => {
      setOpen(false)
      command()
    },
    [setOpen]
  )

  const scrollTo = (id: string) => {
    runCommand(() => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
      }
    })
  }

  const copyEmail = () => {
    runCommand(() => {
      navigator.clipboard.writeText("sohaiblaarichi112@gmail.com")
      toast.success(
        lang === "fr" ? "Email copié dans le presse-papier !" : "Email copied to clipboard!",
        { description: "sohaiblaarichi112@gmail.com" }
      )
    })
  }

  const downloadCV = () => {
    runCommand(() => {
      const link = document.createElement("a")
      link.href = "/CV_Sohaib_LaarichiFR.pdf"
      link.download = "CV_Sohaib_LaarichiFR.pdf"
      link.click()
      toast.success(lang === "fr" ? "Téléchargement du CV lancé" : "Downloading Resume")
    })
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title={lang === "fr" ? "Palette de commandes" : "Command Palette"}
      description={
        lang === "fr"
          ? "Rechercher une section, un projet ou une action rapide..."
          : "Search for a section, project, or quick action..."
      }
      className="border-primary/30 bg-card/95 shadow-2xl backdrop-blur-xl sm:max-w-xl"
    >
      <CommandInput
        placeholder={
          lang === "fr"
            ? "Taper une commande ou rechercher... (ex: CV, Soukara, Contact)"
            : "Type a command or search... (e.g. Resume, Projects, Email)"
        }
      />
      <CommandList className="max-h-[360px]">
        <CommandEmpty>
          {lang === "fr" ? "Aucun résultat trouvé." : "No results found."}
        </CommandEmpty>

        {/* Actions Rapides */}
        <CommandGroup heading={lang === "fr" ? "Actions rapides" : "Quick Actions"}>
          <CommandItem onSelect={downloadCV}>
            <Download className="mr-2 h-4 w-4 text-primary" />
            <span>{lang === "fr" ? "Télécharger le CV (PDF officiel)" : "Download Resume (Official PDF)"}</span>
            <CommandShortcut>↵</CommandShortcut>
          </CommandItem>

          {onOpenPdfModal && (
            <CommandItem
              onSelect={() => {
                runCommand(() => onOpenPdfModal())
              }}
            >
              <Eye className="mr-2 h-4 w-4 text-cyan-400" />
              <span>{lang === "fr" ? "Aperçu du CV en ligne" : "Preview Resume Online"}</span>
            </CommandItem>
          )}

          <CommandItem onSelect={copyEmail}>
            <Copy className="mr-2 h-4 w-4 text-emerald-400" />
            <span>{lang === "fr" ? "Copier l'adresse email" : "Copy email address"}</span>
            <CommandShortcut>sohaiblaarichi112@gmail.com</CommandShortcut>
          </CommandItem>

          <CommandItem onSelect={() => runCommand(() => setTheme(theme === "dark" ? "light" : "dark"))}>
            {theme === "dark" ? (
              <Sun className="mr-2 h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="mr-2 h-4 w-4 text-indigo-400" />
            )}
            <span>
              {lang === "fr"
                ? `Passer au mode ${theme === "dark" ? "Clair" : "Sombre"}`
                : `Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
            </span>
          </CommandItem>

          <CommandItem onSelect={() => runCommand(toggleLanguage)}>
            <Globe className="mr-2 h-4 w-4 text-sky-400" />
            <span>
              {lang === "fr" ? "Basculer la langue vers l'Anglais (EN)" : "Switch language to French (FR)"}
            </span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Navigation */}
        <CommandGroup heading={lang === "fr" ? "Navigation" : "Navigation"}>
          <CommandItem onSelect={() => scrollTo("hero")}>
            <User className="mr-2 h-4 w-4" />
            <span>{lang === "fr" ? "Accueil & Présentation" : "Home & Intro"}</span>
          </CommandItem>
          <CommandItem onSelect={() => scrollTo("projects")}>
            <FolderGit2 className="mr-2 h-4 w-4" />
            <span>{lang === "fr" ? "Projets & Études de cas" : "Projects & Case Studies"}</span>
          </CommandItem>
          <CommandItem onSelect={() => scrollTo("experience")}>
            <Briefcase className="mr-2 h-4 w-4" />
            <span>{lang === "fr" ? "Expériences professionnelles" : "Professional Experience"}</span>
          </CommandItem>
          <CommandItem onSelect={() => scrollTo("skills")}>
            <Code2 className="mr-2 h-4 w-4" />
            <span>{lang === "fr" ? "Compétences techniques" : "Technical Skills"}</span>
          </CommandItem>
          <CommandItem onSelect={() => scrollTo("about")}>
            <Layers className="mr-2 h-4 w-4" />
            <span>{lang === "fr" ? "À propos de moi & Langues" : "About Me & Languages"}</span>
          </CommandItem>
          <CommandItem onSelect={() => scrollTo("education")}>
            <GraduationCap className="mr-2 h-4 w-4" />
            <span>{lang === "fr" ? "Formation & Diplômes" : "Education & Degrees"}</span>
          </CommandItem>
          <CommandItem onSelect={() => scrollTo("contact")}>
            <Mail className="mr-2 h-4 w-4" />
            <span>{lang === "fr" ? "Contact & Prise de rendez-vous" : "Contact & Inquiries"}</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Projets Clés */}
        <CommandGroup heading={lang === "fr" ? "Projets phares" : "Featured Projects"}>
          <CommandItem onSelect={() => scrollTo("projects")}>
            <span className="mr-2 flex h-2 w-2 rounded-full bg-primary" />
            <span>Soukara — E-Commerce Full Stack (Next.js, Spring Boot)</span>
          </CommandItem>
          <CommandItem onSelect={() => scrollTo("projects")}>
            <span className="mr-2 flex h-2 w-2 rounded-full bg-cyan-400" />
            <span>FireLIS — HealthTech (FHIR R4, ASTM, Kubernetes)</span>
          </CommandItem>
          <CommandItem onSelect={() => scrollTo("projects")}>
            <span className="mr-2 flex h-2 w-2 rounded-full bg-emerald-400" />
            <span>Mikhamdina — Marketplace Freelances (MERN)</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Réseaux sociaux */}
        <CommandGroup heading={lang === "fr" ? "Profils externes" : "External Profiles"}>
          <CommandItem
            onSelect={() => {
              runCommand(() => window.open("https://www.linkedin.com/in/laarichi-sohaib", "_blank"))
            }}
          >
            <Linkedin className="mr-2 h-4 w-4 text-[#0077b5]" />
            <span>LinkedIn — Sohaib LAARICHI</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              runCommand(() => window.open("https://github.com/Sohaib-Laarichi", "_blank"))
            }}
          >
            <Github className="mr-2 h-4 w-4" />
            <span>GitHub — @Sohaib-Laarichi</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
