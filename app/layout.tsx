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
  title: "LAARICHI Sohaib - Développeur Web Full-Stack",
  description:
    "Portfolio professionnel de Sohaib LAARICHI, élève ingénieur cherchant un stage PFE en développement web full-stack. Expertise en Next.js, React, Node.js et architectures modernes.",
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
  openGraph: {
    title: "LAARICHI Sohaib - Développeur Web Full-Stack",
    description: "Portfolio professionnel de Sohaib LAARICHI, élève ingénieur cherchant un stage PFE en développement web full-stack.",
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "LAARICHI Sohaib - Développeur Web Full-Stack",
    description: "Portfolio professionnel - Stage PFE recherché en développement web full-stack",
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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${_geist.className} font-sans antialiased`}>
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
