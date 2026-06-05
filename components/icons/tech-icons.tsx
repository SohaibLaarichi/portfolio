"use client"

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
} from "lucide-react"

export const TechIcons = {
  frontend: <Code2 size={24} className="text-cyan-400" />,
  backend: <Server size={24} className="text-cyan-400" />,
  database: <Database size={24} className="text-cyan-400" />,
  cloud: <Cloud size={24} className="text-cyan-400" />,
  devops: <Shield size={24} className="text-cyan-400" />,
  security: <Shield size={24} className="text-cyan-400" />,
  methodology: <CheckSquare size={24} className="text-cyan-400" />,
  teamwork: <Users size={24} className="text-cyan-400" />,
  problemSolving: <Lightbulb size={24} className="text-cyan-400" />,
  autonomy: <CheckSquare size={24} className="text-cyan-400" />,
  heart: <Heart size={24} className="text-cyan-400" />,
  location: <MapPin size={20} className="text-cyan-400" />,
  phone: <Phone size={20} className="text-cyan-400" />,
  mail: <Mail size={20} className="text-cyan-400" />,
  github: <Github size={20} className="text-cyan-400" />,
  linkedin: <Linkedin size={20} className="text-cyan-400" />,
}
