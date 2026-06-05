"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink, Star, GitFork, Calendar } from 'lucide-react'
import { useLanguage } from '@/hooks/use-language'

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  topics: string[]
}

export default function GitHubRepos() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { lang } = useLanguage()

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Sohaib-Laarichi/repos?sort=updated&per_page=50')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        // Filtrer les repos non-fork et avec une description ou des commits récents
        const filteredRepos = data
          .filter((repo: GitHubRepo) => !repo.name.includes('fork'))
          .sort((a: GitHubRepo, b: GitHubRepo) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
          .slice(0, 12) // Limiter à 12 repos
        
        setRepos(filteredRepos)
      } catch (err) {
        console.error('Erreur lors de la récupération des repos:', err)
        setError(lang === 'fr' ? 'Impossible de charger les projets GitHub' : 'Failed to load GitHub projects')
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [lang])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return lang === 'fr' 
      ? date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
      : date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  const getLanguageColor = (language: string | null) => {
    const colors: { [key: string]: string } = {
      'JavaScript': '#F7DF1E',
      'TypeScript': '#3178C6',
      'Python': '#3776AB',
      'Java': '#ED8B00',
      'React': '#61DAFB',
      'HTML': '#E34F26',
      'CSS': '#1572B6',
      'PHP': '#777BB4',
      'C': '#A8B9CC',
      'C++': '#00599C',
      'C#': '#239120',
      'Go': '#00ADD8',
      'Rust': '#000000',
      'Swift': '#FA7343',
      'Kotlin': '#7F52FF',
      'Dart': '#0175C2',
    }
    return colors[language || ''] || '#6B7280'
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { 
      scale: 1.02,
      y: -5,
      boxShadow: "0 12px 24px rgba(6, 182, 212, 0.15)",
      transition: { duration: 0.2 }
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="h-48 bg-card border border-border rounded-lg animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="p-6">
              <div className="h-4 bg-muted rounded mb-3"></div>
              <div className="h-3 bg-muted rounded mb-2"></div>
              <div className="h-3 bg-muted rounded w-2/3"></div>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Github className="mx-auto mb-4 text-muted-foreground" size={48} />
        <p className="text-muted-foreground">{error}</p>
        <motion.a
          href="https://github.com/Sohaib-Laarichi"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Github size={16} />
          {lang === 'fr' ? 'Voir sur GitHub' : 'View on GitHub'}
        </motion.a>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      {/* En-tête avec lien vers GitHub */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-semibold text-foreground">
          {lang === 'fr' ? 'Projets GitHub' : 'GitHub Projects'}
        </h3>
        <motion.a
          href="https://github.com/Sohaib-Laarichi"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          <Github size={16} />
          {lang === 'fr' ? 'Voir tous les projets' : 'View all projects'}
          <ExternalLink size={14} />
        </motion.a>
      </motion.div>

      {/* Grille des repos */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {repos.map((repo) => (
          <motion.div
            key={repo.id}
            className="group p-4 bg-card border border-border rounded-lg hover:border-primary/30 transition-colors"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}
              </h4>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar size={12} />
                {formatDate(repo.updated_at)}
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-3 line-clamp-2 min-h-[2.5rem]">
              {repo.description || (lang === 'fr' ? 'Aucune description disponible' : 'No description available')}
            </p>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                {repo.language && (
                  <div className="flex items-center gap-1">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getLanguageColor(repo.language) }}
                    />
                    {repo.language}
                  </div>
                )}
                {repo.stargazers_count > 0 && (
                  <div className="flex items-center gap-1">
                    <Star size={12} />
                    {repo.stargazers_count}
                  </div>
                )}
                {repo.forks_count > 0 && (
                  <div className="flex items-center gap-1">
                    <GitFork size={12} />
                    {repo.forks_count}
                  </div>
                )}
              </div>
            </div>

            {/* Topics/Tags */}
            {repo.topics && repo.topics.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {repo.topics.slice(0, 3).map((topic) => (
                  <span
                    key={topic}
                    className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2">
              <motion.a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-1 text-xs bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={12} />
                Code
              </motion.a>
              {repo.homepage && (
                <motion.a
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink size={12} />
                  Demo
                </motion.a>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}