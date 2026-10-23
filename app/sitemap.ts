import { MetadataRoute } from "next"
import { caseStudies } from "@/lib/case-studies"

export default function sitemap(): MetadataRoute.Sitemap {
  const projects: MetadataRoute.Sitemap = caseStudies.map(({ slug }) => ({
    url: `https://www.sohaiblaarichi.tech/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  return [
    {
      url: "https://www.sohaiblaarichi.tech",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...projects,
  ]
}
