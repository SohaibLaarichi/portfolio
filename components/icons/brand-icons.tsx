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
  SiGraphql,
  SiHelm,
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
  SiRedis,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si"

const brandIcons: Record<string, IconType> = {
  react: SiReact,
  "next.js 16": SiNextdotjs,
  "next.js": SiNextdotjs,
  typescript: SiTypescript,
  "flutter / dart": SiFlutter,
  flutter: SiFlutter,
  javascript: SiJavascript,
  "tailwind css": SiTailwindcss,
  "framer motion": SiFramer,
  java: SiOpenjdk,
  "java se/ee": SiOpenjdk,
  "spring boot": SiSpringboot,
  "spring boot 3": SiSpringboot,
  "node.js": SiNodedotjs,
  "express.js": SiExpress,
  graphql: SiGraphql,
  jee: SiOpenjdk,
  mongodb: SiMongodb,
  mysql: SiMysql,
  postgresql: SiPostgresql,
  redis: SiRedis,
  docker: SiDocker,
  kubernetes: SiKubernetes,
  helm: SiHelm,
  "ci/cd": SiGithubactions,
  "github actions": SiGithubactions,
  git: SiGit,
  github: SiGithub,
  "administration linux": SiLinux,
  "linux administration": SiLinux,
  linux: SiLinux,
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
