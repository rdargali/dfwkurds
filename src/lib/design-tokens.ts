/**
 * Design Tokens - Shared color and style mappings
 * Used across components for consistent styling based on the Kurdish flag colors
 */

// Kurdish flag color names
export type KurdishColor = 'kurd-red' | 'kurd-green' | 'kurd-gold'

// Category types used across the application
export type ResourceCategory =
  | 'government'
  | 'legal'
  | 'education'
  | 'healthcare'
  | 'community'
  | 'cultural'
  | 'employment'
  | 'other'

// Color class mappings for consistent styling
export const kurdishColorClasses: Record<
  KurdishColor,
  {
    bg: string
    text: string
    border: string
    ring: string
    accent: string
    hover: string
  }
> = {
  'kurd-red': {
    bg: 'bg-kurd-red/10',
    text: 'text-kurd-red',
    border: 'border-t-kurd-red',
    ring: 'ring-kurd-red/30',
    accent: 'from-kurd-red',
    hover: 'hover:text-kurd-red-dark',
  },
  'kurd-green': {
    bg: 'bg-kurd-green/10',
    text: 'text-kurd-green',
    border: 'border-t-kurd-green',
    ring: 'ring-kurd-green/30',
    accent: 'from-kurd-green',
    hover: 'hover:text-kurd-green-dark',
  },
  'kurd-gold': {
    bg: 'bg-kurd-gold/10',
    text: 'text-kurd-gold-dark',
    border: 'border-t-kurd-gold',
    ring: 'ring-kurd-gold/30',
    accent: 'from-kurd-gold',
    hover: 'hover:text-kurd-gold-dark',
  },
}

// Category to color mappings
export const categoryColors: Record<ResourceCategory, KurdishColor | 'other'> = {
  government: 'kurd-red',
  legal: 'kurd-green',
  education: 'kurd-gold',
  healthcare: 'kurd-red',
  community: 'kurd-green',
  cultural: 'kurd-gold',
  employment: 'kurd-red',
  other: 'other',
}

// Helper to get color classes for a Kurdish color
export function getColorClasses(color: KurdishColor | 'other') {
  if (color === 'other') {
    return {
      bg: 'bg-slate-100',
      text: 'text-slate-600',
      border: 'border-t-slate-300',
      ring: 'ring-slate-300',
      accent: 'from-slate-300',
      hover: 'hover:text-slate-900',
    }
  }
  return kurdishColorClasses[color]
}

// Rotating colors for lists (red, green, gold, repeat)
export function getRotatingColor(index: number): KurdishColor {
  const colors: KurdishColor[] = ['kurd-red', 'kurd-green', 'kurd-gold']
  return colors[index % colors.length]
}

// Localized text helper type
export interface LocalizedText {
  en?: string
  ckb?: string
  kmr?: string
}

// Helper to get localized text with proper fallback
export function getLocalizedText(text: LocalizedText | undefined, locale: string): string {
  if (!text) return ''

  // Try requested locale first
  if (locale === 'ckb' && text.ckb) return text.ckb
  if (locale === 'kmr' && text.kmr) return text.kmr
  if (locale === 'en' && text.en) return text.en

  // Fallback chain: en -> ckb -> kmr -> empty
  return text.en ?? text.ckb ?? text.kmr ?? ''
}
