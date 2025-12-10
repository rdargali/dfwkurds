import { MetadataRoute } from 'next'
import { locales, localeToUrlPath } from '@/i18n/config'

export default function sitemap(): MetadataRoute.Sitemap {
  // TODO: Update with actual production domain
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dfwkurds.org'

  // Define all routes
  const routes = ['', '/about', '/events', '/resources']

  // Generate sitemap entries for all locales
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    const urlPath = localeToUrlPath[locale]
    for (const route of routes) {
      entries.push({
        url: `${baseUrl}/${urlPath}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
      })
    }
  }

  return entries
}
