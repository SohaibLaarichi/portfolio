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

export const metadata: Metadata = {
  title: "LAARICHI Sohaib - Ingénieur Logiciel Fullstack & DevOps",
  description:
    "Portfolio professionnel de Sohaib LAARICHI, ingénieur logiciel fullstack et DevOps. Spécialisé dans la stack Java/Spring Boot et les architectures microservices cloud-native.",
  keywords: [
    "Sohaib Laarichi",
    "Laarichi Sohaib",
    "Sohaib LAARICHI",
    "LAARICHI Sohaib",
    "Ingénieur Maroc",
    "Ingénieur Marocain",
    "Développeur Web Maroc",
    "Développeur Full-Stack Maroc",
    "Ingénieur Logiciel",
    "DevOps Maroc",
    "EMSI Marrakech",
    "Portfolio Sohaib Laarichi",
    "Génie Logiciel Maroc",
    "Full-Stack & DevOps Engineer",
    "Recherche Emploi CDI"
  ],
  generator: "v0.app",
  applicationName: "Portfolio Sohaib LAARICHI",
  authors: [{ name: "Sohaib LAARICHI" }],
  creator: "Sohaib LAARICHI",
  publisher: "Sohaib LAARICHI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://sohaib-laarichi.vercel.app"),
  alternates: {
    canonical: "https://sohaib-laarichi.vercel.app",
  },
  openGraph: {
    title: "LAARICHI Sohaib - Ingénieur Logiciel Fullstack & DevOps",
    description: "Portfolio professionnel de Sohaib LAARICHI, ingénieur logiciel fullstack et DevOps. Spécialisé dans la stack Java/Spring Boot et les architectures microservices cloud-native.",
    type: "profile",
    firstName: "Sohaib",
    lastName: "LAARICHI",
    username: "Sohaib-Laarichi",
    gender: "male",
    locale: "fr_FR",
    alternateLocale: "en_US",
    images: [
      {
        url: "https://sohaib-laarichi.vercel.app/moi.png",
        width: 1200,
        height: 1440,
        alt: "Sohaib LAARICHI - Ingénieur Logiciel Fullstack & DevOps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LAARICHI Sohaib - Ingénieur Logiciel Fullstack & DevOps",
    description: "Portfolio professionnel de Sohaib LAARICHI - Ingénieur Logiciel Fullstack & DevOps",
    images: ["https://sohaib-laarichi.vercel.app/moi.png"],
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sohaib LAARICHI",
    "givenName": "Sohaib",
    "familyName": "LAARICHI",
    "gender": "male",
    "url": "https://sohaib-laarichi.vercel.app",
    "image": "https://sohaib-laarichi.vercel.app/moi.png",
    "jobTitle": "Ingénieur Logiciel Fullstack & DevOps",
    "description": "Portfolio professionnel de Sohaib LAARICHI, ingénieur logiciel fullstack et DevOps. Spécialisé dans la stack Java/Spring Boot et les architectures microservices cloud-native.",
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

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${_geist.className} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
