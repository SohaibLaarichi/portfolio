import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { LanguageProvider } from "@/hooks/use-language"
import { AnimatedBackground } from "@/components/animated-background"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const siteUrl = "https://www.sohaiblaarichi.tech"
const siteTitle = "Sohaib Laarichi | Ingénieur Informatique, Fullstack & DevOps à Marrakech"
const siteDescription =
  "Portfolio officiel de Sohaib Laarichi, Ingénieur Informatique diplômé de l'EMSI Marrakech (MIAGE). Spécialiste Fullstack (Java, Spring Boot, React, Next.js), DevOps & Cloud (Docker, Azure) et HealthTech (FHIR, HL7)."

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "Sohaib Laarichi",
    "Sohaib LAARICHI",
    "Laarichi Sohaib",
    "sohaib laarichi",
    "ingénieur informatique",
    "ingenieur informatique",
    "ingénieur informatique Marrakech",
    "ingenieur informatique marrakech",
    "ingénieur logiciel Marrakech",
    "ingenieur logiciel marrakech",
    "ingénieur informatique Maroc",
    "ingenieur informatique maroc",
    "ingénieur logiciel Maroc",
    "ingenieur logiciel maroc",
    "développeur Fullstack Marrakech",
    "developpeur fullstack marrakech",
    "développeur DevOps Marrakech",
    "developpeur devops marrakech",
    "ingénieur EMSI Marrakech",
    "EMSI Marrakech MIAGE",
    "ingénieur Java Spring Boot React",
    "HealthTech FHIR HL7 Maroc",
    "portfolio Sohaib Laarichi",
    "Sohaib Laarichi GitHub",
    "Sohaib Laarichi LinkedIn",
  ],
  applicationName: "Portfolio Sohaib LAARICHI",
  authors: [{ name: "Sohaib LAARICHI", url: siteUrl }],
  creator: "Sohaib LAARICHI",
  publisher: "Sohaib LAARICHI",
  category: "technology",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Portfolio de Sohaib Laarichi - Ingénieur Informatique",
    type: "profile",
    firstName: "Sohaib",
    lastName: "LAARICHI",
    username: "Sohaib-Laarichi",
    gender: "male",
    locale: "fr_FR",
    alternateLocale: "en_US",
    images: [
      {
        url: "/og-sohaib-laarichi.png",
        width: 1200,
        height: 630,
        alt: "Sohaib Laarichi - Ingénieur Informatique Fullstack & DevOps à Marrakech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-sohaib-laarichi.png"],
  },
  other: {
    "geo.region": "MA-11",
    "geo.placename": "Marrakech, Maroc",
    "geo.position": "31.6295;-7.9811",
    "ICBM": "31.6295, -7.9811",
    "robots": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    "name": "Sohaib LAARICHI",
    "alternateName": ["Sohaib Laarichi", "Laarichi Sohaib"],
    "givenName": "Sohaib",
    "familyName": "LAARICHI",
    "gender": "male",
    "url": siteUrl,
    "image": `${siteUrl}/moi.png`,
    "jobTitle": "Ingénieur informatique Fullstack & DevOps",
    "description": siteDescription,
    "telephone": "+212701820101",
    "email": "sohaiblaarichi112@gmail.com",
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "EMSI Marrakech (École Marocaine des Sciences de l'Ingénieur)",
      "sameAs": "https://emsi.ma"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Marrakech",
      "addressCountry": "MA"
    },
    "sameAs": [
      "https://www.linkedin.com/in/laarichi-sohaib",
      "https://github.com/Sohaib-Laarichi"
    ],
    "knowsAbout": [
      "Web Development",
      "Full-Stack Development",
      "Next.js",
      "React",
      "Node.js",
      "Java",
      "Java EE",
      "Spring Boot",
      "HealthTech",
      "FHIR",
      "HL7",
      "DICOM",
      "Network",
      "Cybersecurity",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "MySQL",
      "PostgreSQL",
      "Docker",
      "Kubernetes",
      "Microsoft Azure",
      "CI/CD"
    ]
  }

  const pharmaliveJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PharmaLive",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "Système d'information de gestion de pharmacie avec gestion des stocks, alertes de péremption, facturation PDF et sécurité BCrypt RBAC.",
    "author": {
      "@id": `${siteUrl}/#person`
    },
    "codeRepository": "https://github.com/Sohaib-Laarichi/PharmaLive"
  }

  const profilePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteUrl}/#profile`,
    "url": siteUrl,
    "name": siteTitle,
    "description": siteDescription,
    "inLanguage": ["fr-FR", "en-US"],
    "dateModified": "2026-07-27",
    "mainEntity": {
      "@id": `${siteUrl}/#person`,
    },
  }

  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${_geist.className} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pharmaliveJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <AnimatedBackground />
          <LanguageProvider>{children}</LanguageProvider>
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
