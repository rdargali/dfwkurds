// Internationalization configuration
// Supports English (en), Sorani Kurdish (ckb), and Kurmanji Kurdish (kmr)

export const locales = ['en', 'ckb', 'kmr'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

// SEO-friendly URL paths (used in URLs) -> Internal locale codes (ISO standards)
export const urlPathToLocale: Record<string, Locale> = {
  en: 'en',
  english: 'en',
  sorani: 'ckb',
  kurmanji: 'kmr',
  // Keep ISO codes as fallback for backward compatibility
  ckb: 'ckb',
  kmr: 'kmr',
}

// Internal locale codes -> SEO-friendly URL paths
export const localeToUrlPath: Record<Locale, string> = {
  en: 'en',
  ckb: 'sorani',
  kmr: 'kurmanji',
}

// SEO-friendly URL paths only (for routing - excludes locale codes)
export const urlPaths = ['en', 'sorani', 'kurmanji'] as const

// Language metadata for UI display
export const languages: Record<
  Locale,
  {
    name: string
    nativeName: string
    direction: 'ltr' | 'rtl'
    fontFamily: string
    flag?: string
  }
> = {
  en: {
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
    fontFamily: 'var(--font-outfit)',
    flag: '🇺🇸',
  },
  ckb: {
    name: 'Kurdish (Sorani)',
    nativeName: 'کوردی سۆرانی',
    direction: 'rtl',
    fontFamily: 'var(--font-noto-arabic)',
    flag: '☀️',
  },
  kmr: {
    name: 'Kurdish (Kurmanji)',
    nativeName: 'Kurmancî',
    direction: 'ltr',
    fontFamily: 'var(--font-outfit)',
    flag: '☀️',
  },
}

// Helper to check if locale is RTL
export function isRTL(locale: Locale): boolean {
  return languages[locale]?.direction === 'rtl'
}

// Helper to get direction for locale
export function getDirection(locale: Locale): 'ltr' | 'rtl' {
  return languages[locale]?.direction ?? 'ltr'
}

// Helper to get SEO-friendly URL path for a locale
export function getUrlPath(locale: Locale | string): string {
  // If it's already a URL path, return it
  if (urlPathToLocale[locale]) {
    return locale
  }
  // If it's a locale code, return the SEO-friendly path
  if (localeToUrlPath[locale as Locale]) {
    return localeToUrlPath[locale as Locale]
  }
  // Fallback to the input
  return locale
}
