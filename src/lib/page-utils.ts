/**
 * Reusable utilities for Next.js page components
 * Reduces code duplication and ensures consistent patterns
 *
 * @module page-utils
 */

import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { urlPathToLocale, type Locale } from '@/i18n/config'
import { getSanityData } from './sanity'

/**
 * Extract and normalize locale from page params
 * Handles both URL paths (sorani, kurmanji) and locale codes (ckb, kmr)
 *
 * @param params - Page params containing locale string
 * @returns Normalized locale code
 *
 * @example
 * ```tsx
 * const locale = await getLocaleFromParams(params)
 * ```
 */
export async function getLocaleFromParams(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale: localeParam } = await params
  return urlPathToLocale[localeParam] || (localeParam as Locale)
}

/**
 * Setup locale for the current request
 * Returns the normalized locale for use in components
 *
 * @param params - Page params containing locale string
 * @returns Normalized locale code
 *
 * @example
 * ```tsx
 * const locale = await setupLocale(params)
 * ```
 */
export async function setupLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const locale = await getLocaleFromParams(params)
  setRequestLocale(locale)
  return locale
}

/**
 * Generate standard metadata for a page
 * Uses translations from the specified namespace
 *
 * @param params - Page params containing locale string
 * @param namespace - Translation namespace (e.g., 'news', 'events')
 * @returns Metadata object with title and description
 *
 * @example
 * ```tsx
 * export async function generateMetadata({ params }) {
 *   return generatePageMetadata(params, 'news')
 * }
 * ```
 */
export async function generatePageMetadata(
  params: Promise<{ locale: string }>,
  namespace: string
): Promise<Metadata> {
  const locale = await getLocaleFromParams(params)
  const t = await getTranslations({ locale, namespace })

  return {
    title: t('title'),
    description: t('subtitle'),
  }
}

/**
 * Fetch data from Sanity with automatic fallback to placeholder data
 * Handles errors gracefully and logs appropriately
 *
 * @param query - GROQ query string
 * @param placeholderData - Fallback data if Sanity fetch fails
 * @param sectionName - Section name for logging (e.g., 'News', 'Events')
 * @returns Array of data items (from Sanity or placeholder)
 *
 * @example
 * ```tsx
 * const posts = await fetchWithFallback<NewsPost>(
 *   NEWS_QUERY,
 *   placeholderNewsPosts,
 *   'News'
 * )
 * ```
 */
export async function fetchWithFallback<T>(
  query: string,
  placeholderData: T[],
  sectionName: string
): Promise<T[]> {
  let data: T[] = []
  try {
    data = await getSanityData<T[]>(query)
    if (process.env.NODE_ENV === 'production') {
      console.log(`[${sectionName}] Fetched ${data.length} items from Sanity`)
    }
  } catch (error) {
    console.error(`[${sectionName}] Error fetching from Sanity:`, error)
    console.log(`[${sectionName}] Using placeholder data`)
  }

  return data.length > 0 ? data : placeholderData
}
