import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any

// Sanity client configuration
// In development, disable CDN to see fresh data immediately
// In production, use CDN for better performance
const isDevelopment = process.env.NODE_ENV === 'development'

// Get environment variables with validation
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Validate required environment variables
if (!projectId || projectId === 'your-project-id') {
  const errorMessage =
    'NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Please add it to your environment variables.'
  if (isDevelopment) {
    console.error('❌', errorMessage)
  } else {
    // In production, log to help with debugging
    console.error('[Sanity]', errorMessage)
  }
}

export const sanityClient = createClient({
  projectId: projectId || 'your-project-id',
  dataset: dataset,
  apiVersion: '2024-01-01',
  useCdn: !isDevelopment, // Disable CDN in development for immediate updates
})

// Image URL builder
const builder = createImageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Helper function for data fetching with Next.js caching
// Uses next/cache for automatic request deduplication
export async function getSanityData<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T> {
  return sanityClient.fetch<T>(query, params ?? {}, {
    // Use Next.js cache with revalidation
    // In development, use shorter revalidation (10 seconds) for faster updates
    // In production, use shorter revalidation (30 seconds) for faster content updates
    // On-demand revalidation via webhook is preferred for immediate updates
    next: {
      revalidate: isDevelopment ? 10 : 30,
      // Add cache tags for better cache control
      tags: ['sanity-data'],
    },
  })
}

// Typed query helpers for each content type
export type LocaleString = {
  en?: string
  ckb?: string
  kmr?: string
}

export type LocaleText = {
  en?: string
  ckb?: string
  kmr?: string
}

export type LocaleBlockContent = {
  en?: unknown[]
  ckb?: unknown[]
  kmr?: unknown[]
}

export interface NewsPost {
  _id: string
  _type: 'newsPost'
  title: LocaleString
  slug: { current: string }
  mainImage?: {
    asset: SanityImageSource
    alt?: LocaleString
  }
  body?: LocaleBlockContent
  publishedAt: string
  featured?: boolean
}

export interface Event {
  _id: string
  _type: 'event'
  title: LocaleString
  slug: { current: string }
  eventDate: string
  endDate?: string
  location?: LocaleString
  address?: string
  description?: LocaleText
  image?: {
    asset: SanityImageSource
    alt?: LocaleString
  }
  registrationUrl?: string
  isFeatured?: boolean
}

export interface TeamMember {
  _id: string
  _type: 'teamMember'
  name: LocaleString
  role: LocaleString
  photo?: {
    asset: SanityImageSource
    alt?: LocaleString
  }
  bio?: LocaleText
  email?: string
  linkedin?: string
  order: number
}

export interface Resource {
  _id: string
  _type: 'resource'
  name: LocaleString
  url: string
  description?: LocaleText
  logo?: {
    asset: SanityImageSource
    alt?: LocaleString
  }
  category?: string
  order: number
}

export interface HistoricalFigure {
  _id: string
  _type: 'historicalFigure'
  name: LocaleString
  role: LocaleString
  description: LocaleText
  photo?: {
    asset: SanityImageSource
    alt?: LocaleString
  }
  color: 'kurd-red' | 'kurd-green' | 'kurd-gold'
  order: number
}

// Helper to get localized string based on current locale
// Falls back: requested locale -> English -> first available
export function getLocalizedValue<T>(
  obj: { en?: T; ckb?: T; kmr?: T } | undefined,
  locale: string
): T | undefined {
  if (!obj) return undefined

  // Try requested locale first
  if (locale === 'ckb' && obj.ckb) return obj.ckb
  if (locale === 'kmr' && obj.kmr) return obj.kmr
  if (locale === 'en' && obj.en) return obj.en

  // Fall back to English, then any available
  return obj.en ?? obj.ckb ?? obj.kmr
}
