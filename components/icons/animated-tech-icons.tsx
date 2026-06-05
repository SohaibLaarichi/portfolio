"use client"

import type React from "react"
import {
  Code2,
  Server,
  Database,
  Cloud,
  Shield,
  CheckSquare,
  Users,
  Lightbulb,
  Heart,
  MapPin,
  Phone,
  Mail,
  Github,
  Linkedin,
  Zap,
} from "lucide-react"
import { TechIcon } from "@/components/tech-icon"
import {
  ReactLogo,
  NextJSLogo,
  TypeScriptLogo,
  TailwindLogo,
  NodeJSLogo,
  ExpressLogo,
  JavaLogo,
  SpringLogo,
  MongoDBLogo,
  MySQLLogo,
  PostgreSQLLogo,
  DockerLogo,
  GitLogo,
  AzureLogo,
  BootstrapLogo,
  FramerMotionLogo,
} from "./tech-logos"

// Extended icon library with animation mappings
export const AnimatedTechIcons = {
  // Frontend
  react: <TechIcon icon={<ReactLogo size={32} />} label="React" animationType="rotate" size="lg" />,
  nextjs: (
    <TechIcon icon={<NextJSLogo size={32} />} label="Next.js" animationType="glow" size="lg" />
  ),
  typescript: <TechIcon icon={<TypeScriptLogo size={32} />} label="TypeScript" animationType="bounce" size="lg" />,
  tailwind: <TechIcon icon={<TailwindLogo size={32} />} label="Tailwind" animationType="float" size="lg" />,
  bootstrap: <TechIcon icon={<BootstrapLogo size={32} />} label="Bootstrap" animationType="pulse" size="lg" />,
  framerMotion: <TechIcon icon={<FramerMotionLogo size={32} />} label="Framer Motion" animationType="float" size="lg" />,

  // Backend
  nodejs: <TechIcon icon={<NodeJSLogo size={32} />} label="Node.js" animationType="vibration" size="lg" />,
  express: <TechIcon icon={<ExpressLogo size={32} />} label="Express" animationType="glow" size="lg" />,
  javaee: <TechIcon icon={<JavaLogo size={32} />} label="Java EE" animationType="steam" size="lg" />,
  springBoot: <TechIcon icon={<SpringLogo size={32} />} label="Spring Boot" animationType="steam" size="lg" />,
  restapi: <TechIcon icon={<Zap size={32} />} label="REST APIs" animationType="pulse" size="lg" />,

  // Databases
  mongodb: <TechIcon icon={<MongoDBLogo size={32} />} label="MongoDB" animationType="pulse" size="lg" />,
  mysql: <TechIcon icon={<MySQLLogo size={32} />} label="MySQL" animationType="bounce" size="lg" />,
  postgresql: <TechIcon icon={<PostgreSQLLogo size={32} />} label="PostgreSQL" animationType="bounce" size="lg" />,
  sqlserver: <TechIcon icon={<Database size={32} />} label="SQL Server" animationType="bounce" size="lg" />,

  // Cloud & Tools
  azure: <TechIcon icon={<AzureLogo size={32} />} label="Azure" animationType="halo" size="lg" />,
  docker: <TechIcon icon={<DockerLogo size={32} />} label="Docker" animationType="lift" size="lg" />,
  git: <TechIcon icon={<GitLogo size={32} />} label="Git" animationType="wiggle" size="lg" />,
  github: <TechIcon icon={<Github size={32} />} label="GitHub" animationType="wiggle" size="lg" />,
  postman: <TechIcon icon={<Zap size={32} />} label="Postman" animationType="bounce" size="lg" />,

  // DevOps & Security
  devops: <TechIcon icon={<Shield size={32} />} label="DevOps" animationType="rotate" size="lg" />,
  iso27001: <TechIcon icon={<Shield size={32} />} label="ISO 27001" animationType="glow" size="lg" />,
  powershell: <TechIcon icon={<Code2 size={32} />} label="PowerShell" animationType="pulse" size="lg" />,
  adds: <TechIcon icon={<Shield size={32} />} label="ADDS" animationType="vibration" size="lg" />,
  gpo: <TechIcon icon={<Shield size={32} />} label="GPO" animationType="rotate" size="lg" />,

  // Methodologies
  agile: <TechIcon icon={<CheckSquare size={32} />} label="Agile" animationType="bounce" size="lg" />,
  scrum: <TechIcon icon={<Users size={32} />} label="Scrum" animationType="pulse" size="lg" />,
  uml: <TechIcon icon={<Lightbulb size={32} />} label="UML" animationType="float" size="lg" />,
  pm: <TechIcon icon={<CheckSquare size={32} />} label="PM" animationType="lift" size="lg" />,

  // Category icons for section headers
  frontend: <Code2 size={24} className="text-primary" />,
  backend: <Server size={24} className="text-primary" />,
  database: <Database size={24} className="text-primary" />,
  cloud: <Cloud size={24} className="text-primary" />,
  security: <Shield size={24} className="text-primary" />,
  methodology: <CheckSquare size={24} className="text-primary" />,
  teamwork: <Users size={24} className="text-primary" />,
  problemSolving: <Lightbulb size={24} className="text-primary" />,
  autonomy: <CheckSquare size={24} className="text-primary" />,
  heart: <Heart size={24} className="text-primary" />,
  location: <MapPin size={20} className="text-primary" />,
  phone: <Phone size={20} className="text-primary" />,
  mail: <Mail size={20} className="text-primary" />,
  linkedin: <Linkedin size={20} className="text-primary" />,
}

// Mapping of skill names to icon components for dynamic rendering
export const skillIconMap: Record<string, React.ReactNode> = {
  React: AnimatedTechIcons.react,
  "Next.js": AnimatedTechIcons.nextjs,
  "Next.js 16": AnimatedTechIcons.nextjs,
  TypeScript: AnimatedTechIcons.typescript,
  "Tailwind CSS": AnimatedTechIcons.tailwind,
  Bootstrap: AnimatedTechIcons.bootstrap,
  "Framer Motion": AnimatedTechIcons.framerMotion,
  "Node.js": AnimatedTechIcons.nodejs,
  Express: AnimatedTechIcons.express,
  "Java EE": AnimatedTechIcons.javaee,
  "Spring Boot": AnimatedTechIcons.springBoot,
  "REST APIs": AnimatedTechIcons.restapi,
  "APIs REST": AnimatedTechIcons.restapi,
  MongoDB: AnimatedTechIcons.mongodb,
  MySQL: AnimatedTechIcons.mysql,
  PostgreSQL: AnimatedTechIcons.postgresql,
  "SQL Server": AnimatedTechIcons.sqlserver,
  "Microsoft Azure": AnimatedTechIcons.azure,
  Docker: AnimatedTechIcons.docker,
  Git: AnimatedTechIcons.git,
  GitHub: AnimatedTechIcons.github,
  Postman: AnimatedTechIcons.postman,
  DevOps: AnimatedTechIcons.devops,
  "ISO 27001": AnimatedTechIcons.iso27001,
  PowerShell: AnimatedTechIcons.powershell,
  ADDS: AnimatedTechIcons.adds,
  GPO: AnimatedTechIcons.gpo,
  Agile: AnimatedTechIcons.agile,
  Scrum: AnimatedTechIcons.scrum,
  UML: AnimatedTechIcons.uml,
  "Gestion de projet SI": AnimatedTechIcons.pm,
  "IS Project Management": AnimatedTechIcons.pm,
}
