import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, CheckCircle2, Github, Layers3, Mail } from "lucide-react"
import { caseStudies, getCaseStudy } from "@/lib/case-studies"

const siteUrl = "https://www.sohaiblaarichi.tech"

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudy(slug)

  if (!study) return {}

  const image = study.images[0]?.src ?? "/og-sohaib-laarichi.png"
  const url = `${siteUrl}/projects/${study.slug}`

  return {
    title: `${study.title} — Étude de cas | Sohaib Laarichi`,
    description: study.summary,
    alternates: { canonical: url },
    openGraph: {
      title: `${study.title} — Étude de cas`,
      description: study.summary,
      url,
      type: "article",
      images: [{ url: image, alt: study.title }],
    },
    twitter: { card: "summary_large_image", title: study.title, description: study.summary, images: [image] },
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = getCaseStudy(slug)

  if (!study) notFound()

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: study.title,
    description: study.summary,
    url: `${siteUrl}/projects/${study.slug}`,
    creator: { "@type": "Person", name: "Sohaib Laarichi", url: siteUrl },
    keywords: study.stack.join(", "),
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }} />

      <nav className="sticky top-0 z-40 border-b border-stroke bg-background/85 backdrop-blur-xl" aria-label="Navigation de l’étude de cas">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-accent">
            <ArrowLeft size={16} /> Retour aux projets
          </Link>
          <Link href="/" className="font-mono text-xs font-bold tracking-[0.16em] text-foreground">SL / PORTFOLIO</Link>
        </div>
      </nav>

      <article>
        <header className="mx-auto max-w-6xl px-6 pb-14 pt-16 sm:pt-24">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-accent">{study.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-balance text-5xl font-black tracking-[-0.045em] sm:text-7xl">{study.title}</h1>
          <p className="mt-6 max-w-3xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">{study.summary}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {study.stack.map((technology) => (
              <span key={technology} className="rounded-full border border-stroke bg-surface px-3 py-1.5 text-xs font-semibold text-muted-foreground">{technology}</span>
            ))}
          </div>
        </header>

        {study.images.length > 0 && (
          <section className="mx-auto grid max-w-6xl gap-4 px-6 lg:grid-cols-2" aria-label="Captures du projet">
            {study.images.map((image, index) => (
              <figure key={image.src} className={`overflow-hidden rounded-2xl border border-stroke bg-card shadow-xl ${index === 0 && study.images.length > 2 ? "lg:col-span-2" : ""}`}>
                <div className={`relative ${index === 0 && study.images.length > 2 ? "aspect-[16/8]" : "aspect-[16/10]"}`}>
                  <Image src={image.src} alt={image.alt} fill className="object-cover object-top" sizes={index === 0 ? "(max-width: 1200px) 100vw, 1152px" : "(max-width: 1024px) 100vw, 576px"} priority={index === 0} />
                </div>
                <figcaption className="border-t border-stroke px-5 py-3 text-sm text-muted-foreground">{image.caption}</figcaption>
              </figure>
            ))}
          </section>
        )}

        <section className="mx-auto grid max-w-6xl gap-6 px-6 py-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-2xl border border-stroke bg-card/70 p-6">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-accent">Contexte & rôle</p>
            <h2 className="mt-3 text-2xl font-black">Le problème à résoudre</h2>
            <p className="mt-4 leading-7 text-muted-foreground">{study.context}</p>
            <p className="mt-5 border-l-2 border-accent pl-4 text-sm font-semibold leading-6 text-foreground/85">{study.role}</p>
          </div>

          <div className="rounded-2xl border border-stroke bg-surface/60 p-6 sm:p-8">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-accent">Contribution</p>
            <h2 className="mt-3 text-2xl font-black">Ce que j’ai construit</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {study.contribution.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-y border-stroke bg-card/35">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-accent">Architecture</p>
            <h2 className="mt-3 text-3xl font-black">Du produit au déploiement</h2>
            <div className="mt-8 grid gap-3 md:grid-cols-5">
              {study.architecture.map((node, index) => (
                <div key={node} className="relative rounded-xl border border-stroke bg-background p-4">
                  <Layers3 size={19} className="text-accent" />
                  <p className="mt-4 text-sm font-bold">{node}</p>
                  {index < study.architecture.length - 1 && <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-accent md:block" size={18} />}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-accent">Décisions d’ingénierie</p>
          <h2 className="mt-3 text-3xl font-black">Des choix guidés par l’usage</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {study.decisions.map((decision, index) => (
              <div key={decision.title} className="rounded-2xl border border-stroke bg-card/60 p-6">
                <span className="font-mono text-xs font-bold text-accent">0{index + 1}</span>
                <h3 className="mt-4 text-lg font-black">{decision.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{decision.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="rounded-3xl border border-stroke bg-foreground p-8 text-background sm:flex sm:items-center sm:justify-between sm:p-10">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-wider opacity-60">Prochaine étape</p>
              <h2 className="mt-3 max-w-xl text-3xl font-black">Un besoin similaire ou une opportunité à discuter ?</h2>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 sm:mt-0">
              {study.repository && (
                <a href={study.repository} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-background/25 px-5 py-3 text-sm font-bold hover:bg-background/10">
                  <Github size={17} /> Code
                </a>
              )}
              <Link href="/#contact" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-accent-foreground">
                <Mail size={17} /> Me contacter
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  )
}
