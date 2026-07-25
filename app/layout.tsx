import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { LanguageProvider } from "@/hooks/use-language"
import { AnimatedBackground } from "@/components/animated-background"
import { ThemeProvider } from "@/components/theme-provider"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const siteUrl = "https://sohaiblaarichi.tech"
const siteTitle = "Sohaib Laarichi | Ingénieur informatique Fullstack & DevOps"
const siteDescription =
  "Portfolio de Sohaib Laarichi, ingénieur informatique à Marrakech spécialisé en développement Fullstack, Java, Spring Boot, React, DevOps et Cloud."

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "Sohaib Laarichi",
    "Laarichi Sohaib",
    "ingénieur informatique",
    "ingenieur informatique",
    "ingénieur logiciel Maroc",
    "ingénieur informatique Marrakech",
    "développeur Fullstack Maroc",
    "Java Spring Boot React",
    "DevOps Cloud Maroc",
    "EMSI Marrakech",
    "portfolio Sohaib Laarichi",
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
    siteName: "Portfolio de Sohaib Laarichi",
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
        alt: "Sohaib Laarichi, ingénieur informatique Fullstack, DevOps et Cloud",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-sohaib-laarichi.png"],
  },
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/favicon-16x16.svg",
        sizes: "16x16",
        type: "image/svg+xml",
      },
      {
        url: "/favicon-dark.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "/apple-touch-icon.svg",
    shortcut: "/favicon.svg",
  },
  manifest: "/manifest.json",
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
      "Spring Boot",
      "Network",
      "Cybersecurity",
      "Java",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "MySQL",
      "PostgreSQL",
      "Docker",
      "Microsoft Azure"
    ]
  };

  const profilePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteUrl}/#profile`,
    "url": siteUrl,
    "name": siteTitle,
    "description": siteDescription,
    "inLanguage": ["fr-FR", "en-US"],
    "dateModified": "2026-07-25",
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
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
