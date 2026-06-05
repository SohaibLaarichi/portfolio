"use client"

import React from 'react'

interface LogoProps {
  size?: number
  className?: string
}

// React Logo
export const ReactLogo = ({ size = 32, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <circle cx="12" cy="12" r="2.5" fill="#61dafb"/>
    <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z" fill="none" stroke="#61dafb" strokeWidth="1"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61dafb" strokeWidth="1"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" fill="none" stroke="#61dafb" strokeWidth="1"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" fill="none" stroke="#61dafb" strokeWidth="1"/>
  </svg>
)

// Next.js Logo
export const NextJSLogo = ({ size = 32, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <circle cx="12" cy="12" r="10" fill="#000"/>
    <path d="m9.5 8.5 6 8M15.5 8.5v8" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

// TypeScript Logo
export const TypeScriptLogo = ({ size = 32, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <rect width="24" height="24" fill="#3178c6" rx="2"/>
    <path d="M9.5 8v1.5h-2V8h5v1.5h-2V16h-1V9.5h-1V8h1zm6.5 0v8h-1v-3h-2v3h-1V8h4z" fill="#fff"/>
  </svg>
)

// Tailwind CSS Logo
export const TailwindLogo = ({ size = 32, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.34.98.98 2.11 2.11 4.6 2.11 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.34C14.6 7.13 13.47 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.34C8.4 16.87 9.53 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.34C10.6 13.13 9.47 12 7 12z" fill="#38bdf8"/>
  </svg>
)

// Node.js Logo
export const NodeJSLogo = ({ size = 32, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" fill="#339933"/>
    <path d="M12 2v20M2 7l10 5M22 7l-10 5" stroke="#339933" strokeWidth="0.5" fill="none"/>
  </svg>
)

// Express.js Logo
export const ExpressLogo = ({ size = 32, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l2.646 3.487z" fill="#000"/>
  </svg>
)

// Java Logo
export const JavaLogo = ({ size = 32, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218" fill="#ED8B00"/>
    <path d="M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573" fill="#ED8B00"/>
  </svg>
)

// Spring Boot Logo
export const SpringLogo = ({ size = 32, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <circle cx="12" cy="12" r="10" fill="#6db33f"/>
    <path d="M8.5 8.5c1.5-1.5 4-1.5 5.5 0s1.5 4 0 5.5-4 1.5-5.5 0-1.5-4 0-5.5z" fill="#fff"/>
    <circle cx="12" cy="12" r="2" fill="#6db33f"/>
  </svg>
)

// MongoDB Logo
export const MongoDBLogo = ({ size = 32, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184C10.616 2.282 7.833 4.15 7.06 9.555c-.297 2.084.09 4.111.09 4.111.18.526.414 1.072.694 1.618.336.659.757 1.304 1.267 1.915.18.216.369.43.573.639.198.198.414.364.639.505.225.14.464.243.714.304.25.061.514.081.779.081.265 0 .529-.02.779-.081.25-.061.489-.164.714-.304.225-.141.441-.307.639-.505.204-.209.393-.423.573-.639.51-.611.931-1.256 1.267-1.915.28-.546.514-1.092.694-1.618 0 0 .387-2.027.09-4.111z" fill="#4DB33D"/>
  </svg>
)

// MySQL Logo
export const MySQLLogo = ({ size = 32, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153z" fill="#00758F"/>
    <path d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM5.894 7.5c.133-.067.274-.1.414-.1.54 0 1.073.234 1.446.647.374.413.6.973.6 1.553 0 .58-.226 1.14-.6 1.553-.373.413-.906.647-1.446.647-.54 0-1.073-.234-1.446-.647-.374-.413-.6-.973-.6-1.553 0-.58.226-1.14.6-1.553.28-.307.667-.5 1.032-.547z" fill="#F29111"/>
  </svg>
)

// PostgreSQL Logo
export const PostgreSQLLogo = ({ size = 32, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path d="M23.111 5.655c-.838-2.58-2.71-4.648-5.34-5.655-2.221-.849-4.683-.849-6.904 0-2.63 1.007-4.502 3.075-5.34 5.655-.707 2.178-.707 4.512 0 6.69.838 2.58 2.71 4.648 5.34 5.655 2.221.849 4.683.849 6.904 0 2.63-1.007 4.502-3.075 5.34-5.655.707-2.178.707-4.512 0-6.69z" fill="#336791"/>
    <path d="M12 8c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4z" fill="#fff"/>
  </svg>
)

// Docker Logo
export const DockerLogo = ({ size = 32, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185" fill="#2496ED"/>
  </svg>
)

// Git Logo
export const GitLogo = ({ size = 32, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.67-1.337-.396-1.983l-2.481-2.481v6.529c.176.088.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.543-.676-1.342-.396-1.985L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0L23.546 13.119c.603-.603.603-1.582 0-2.188" fill="#F05032"/>
  </svg>
)

// Azure Logo
export const AzureLogo = ({ size = 32, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path d="M5.483 21L12 3l6.517 18H5.483z" fill="#0078D4"/>
    <path d="M12 3l-6.517 18h13.034L12 3z" fill="#005A9F"/>
  </svg>
)

// Bootstrap Logo
export const BootstrapLogo = ({ size = 32, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path d="M6.375 7.125v1.5c0 .621.504 1.125 1.125 1.125h3.375c.621 0 1.125-.504 1.125-1.125s-.504-1.125-1.125-1.125H7.5v-1.5c0-.621-.504-1.125-1.125-1.125s-1.125.504-1.125 1.125zm0 9v-1.5h3.375c.621 0 1.125.504 1.125 1.125s-.504 1.125-1.125 1.125H7.5c-.621 0-1.125-.504-1.125-1.125z" fill="#7952B3"/>
    <rect x="3" y="3" width="18" height="18" rx="3" fill="#7952B3"/>
  </svg>
)

// Framer Motion Logo
export const FramerMotionLogo = ({ size = 32, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path d="M4 0h16v8l-8 8V8L4 16V0z" fill="#0055FF"/>
    <path d="M12 8v8l8-8h-8z" fill="#00AAFF"/>
    <path d="M4 16h8l-8 8v-8z" fill="#88DDFF"/>
  </svg>
)