import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://sohaiblaarichi.tech",
      lastModified: new Date("2026-07-25"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ]
}
