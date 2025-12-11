# Architecture Guide

This document defines the consistent patterns and conventions used throughout the codebase to ensure maintainability and code quality.

## 📁 File Organization

### Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── [locale]/          # Localized routes
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Homepage
│   │   └── [section]/     # Section pages (about, events, news, resources)
│   └── api/               # API routes
├── components/            # React components
│   ├── [section]/        # Section-specific components
│   └── layout/           # Layout components
├── data/                 # Static/placeholder data
├── i18n/                 # Internationalization config
└── lib/                  # Shared utilities and helpers
    ├── page-utils.ts     # Reusable page utilities (locale, metadata, data fetching)
    └── sanity.ts         # Sanity CMS client and helpers
```

### Data Files

**Pattern**: All placeholder/fallback data should be in `src/data/` directory

- ✅ `src/data/placeholderNewsPosts.ts`
- ✅ `src/data/placeholderEvents.ts`
- ✅ `src/data/placeholderResources.ts`

**Why**: Centralized data management, easier to maintain and update.

## 🎨 Code Patterns

### Page Components

**Standard Structure (Using Reusable Utilities):**

```tsx
// 1. Imports (grouped by type)
import type { Metadata } from 'next'
import type { [Type] } from '@/lib/sanity'
import { [Component] } from '@/components/[section]/[Component]'
import { placeholder[Type] } from '@/data/placeholder[Type]'
import { generatePageMetadata, setupLocale, fetchWithFallback } from '@/lib/page-utils'

// 2. GROQ Query (if applicable)
const [TYPE]_QUERY = `*[_type == "[type]"] | order(...) { ... }`

// 3. Metadata Generation (simplified)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  return generatePageMetadata(params, '[namespace]')
}

// 4. Page Component (simplified)
export default async function [Section]Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const locale = await setupLocale(params)
  const display[Items] = await fetchWithFallback<[Type]>(
    [TYPE]_QUERY,
    placeholder[Type],
    '[Section]'
  )

  return (
    <div className="flex flex-col">
      <[Component] [items]={display[Items]} locale={locale} />
    </div>
  )
}
```

**Benefits:**

- ✅ Less code duplication
- ✅ Consistent error handling
- ✅ Easier to maintain
- ✅ Single source of truth for common patterns

### Error Handling

**Pattern**: Use `fetchWithFallback` utility (handles errors automatically)

```tsx
// ✅ Recommended: Use utility function
const displayData = await fetchWithFallback<Type>(QUERY, placeholderData, 'Section')

// ❌ Avoid: Manual error handling (duplicated code)
let data: Type[] = []
try {
  data = await getSanityData<Type[]>(QUERY)
} catch (error) {
  console.error('[Section] Error fetching from Sanity:', error)
  console.log('[Section] Using placeholder data')
}
const displayData = data.length > 0 ? data : placeholderData
```

### Metadata Generation

**Pattern**: Use `generatePageMetadata` utility (simplified)

```tsx
// ✅ Recommended: Use utility function
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  return generatePageMetadata(params, 'section')
}

// ❌ Avoid: Manual implementation (duplicated code)
export async function generateMetadata({ params }) {
  const { locale: localeParam } = await params
  const locale = urlPathToLocale[localeParam] || (localeParam as Locale)
  const t = await getTranslations({ locale, namespace: 'section' })
  return { title: t('title'), description: t('subtitle') }
}
```

### Locale Handling

**Pattern**: Use `setupLocale` utility (simplified)

```tsx
// ✅ Recommended: Use utility function
const locale = await setupLocale(params)

// ❌ Avoid: Manual implementation (duplicated code)
const { locale: localeParam } = await params
const locale = urlPathToLocale[localeParam] || (localeParam as Locale)
setRequestLocale(locale)
```

## 🔧 Import Organization

**Order:**

1. Next.js/Next-intl imports
2. Type imports (`type` keyword)
3. Internal imports (`@/`)
4. Component imports
5. Data imports

**Example:**

```tsx
import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { urlPathToLocale, type Locale } from '@/i18n/config'
import { getSanityData, type Event } from '@/lib/sanity'
import { EventsList } from '@/components/events/EventsList'
import { placeholderEvents } from '@/data/placeholderEvents'
```

## 📝 TypeScript Patterns

### Type Definitions

**Pattern**: Use explicit types, avoid `any`

```tsx
// ✅ Good
const events: Event[] = []

// ❌ Bad
const events: any[] = []
```

### Type Imports

**Pattern**: Use `type` keyword for type-only imports

```tsx
import type { Metadata } from 'next'
import type { Event } from '@/lib/sanity'
```

## 🎯 Component Patterns

### Server Components (Default)

- No `'use client'` directive
- Can use async/await
- Can access server-side APIs
- Better performance

### Client Components

- Must have `'use client'` directive
- Use for interactivity (hooks, event handlers)
- Use sparingly

**Pattern**: Prefer Server Components, use Client Components only when needed.

## 📦 Data Fetching

### GROQ Queries

**Pattern**: Define queries as constants at the top of the file

```tsx
const EVENTS_QUERY = `*[_type == "event" && eventDate >= now()] | order(eventDate asc) {
  _id,
  title,
  slug,
  // ... other fields
}`
```

### Caching

**Pattern**: Use `getSanityData` which handles caching automatically

```tsx
const data = await getSanityData<Type[]>(QUERY)
```

## 🧪 Testing Patterns

### Console Logging

**Pattern**: Use consistent prefixes and conditional logging

```tsx
if (process.env.NODE_ENV === 'production') {
  console.log(`[Section] Fetched ${items.length} items from Sanity`)
}
console.error('[Section] Error fetching from Sanity:', error)
```

## 🎨 Styling Patterns

### Tailwind Classes

**Pattern**: Use consistent spacing and responsive patterns

```tsx
<div className="flex flex-col">
  <section className="py-16 md:py-24 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{/* Content */}</div>
  </section>
</div>
```

## ✅ Quality Checks

### Before Committing

1. ✅ Run `npm run lint` - must pass
2. ✅ Run `npm run format:check` - must pass
3. ✅ Run `npm run format` - auto-fix formatting
4. ✅ Check TypeScript compilation
5. ✅ Verify imports follow organization pattern
6. ✅ Ensure placeholder data is in `src/data/`
7. ✅ Verify metadata includes description

### Code Review Checklist

- [ ] Follows page component structure pattern
- [ ] Error handling with try-catch
- [ ] Metadata includes title and description
- [ ] Locale handling is consistent
- [ ] Imports are organized correctly
- [ ] No `any` types
- [ ] Placeholder data in `src/data/`
- [ ] Console logging uses consistent prefixes
- [ ] TypeScript types are explicit

## 📚 Additional Resources

- [Next.js 16 Documentation](https://nextjs.org/docs)
- [Next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Sanity GROQ Documentation](https://www.sanity.io/docs/groq)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

## 🔄 Migration Guide

When adding a new section:

1. Create page in `src/app/[locale]/[section]/page.tsx`
2. Create placeholder data in `src/data/placeholder[Type].ts`
3. Create components in `src/components/[section]/`
4. Add translations to `messages/*.json`
5. Follow the standard page component structure
6. Add to navigation components
7. Update this guide if patterns change

---

**Last Updated**: 2025-12-10
**Maintained By**: Development Team
