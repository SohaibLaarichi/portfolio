import type { ComponentType } from "react"
import type { IconType } from "react-icons"
import {
  SiDocker,
  SiExpress,
  SiFlutter,
  SiFramer,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiJavascript,
  SiKubernetes,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenjdk,
  SiPostgresql,
  SiPostman,
  SiReact,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si"

const brandIcons: Record<string, IconType> = {
  react: SiReact,
  "next.js 16": SiNextdotjs,
  typescript: SiTypescript,
  "flutter / dart": SiFlutter,
  javascript: SiJavascript,
  "tailwind css": SiTailwindcss,
  "framer motion": SiFramer,
  java: SiOpenjdk,
  "spring boot": SiSpringboot,
  "node.js": SiNodedotjs,
  "express.js": SiExpress,
  jee: SiOpenjdk,
  mongodb: SiMongodb,
  mysql: SiMysql,
  postgresql: SiPostgresql,
  docker: SiDocker,
  kubernetes: SiKubernetes,
  "ci/cd": SiGithubactions,
  git: SiGit,
  github: SiGithub,
  "administration linux": SiLinux,
  "linux administration": SiLinux,
  postman: SiPostman,
}

type FallbackIcon = ComponentType<{
  size?: number | string
  className?: string
  "aria-hidden"?: boolean | "true" | "false"
}>

export function BrandIcon({ name, fallback: Fallback }: { name: string; fallback: FallbackIcon }) {
  const Icon = brandIcons[name.toLowerCase()] ?? Fallback

  return <Icon aria-hidden="true" className="shrink-0" size={15} />
}
