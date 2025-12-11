'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { getLocalizedValue, urlFor, type Resource } from '@/lib/sanity'

type Category =
  | 'government'
  | 'legal'
  | 'education'
  | 'healthcare'
  | 'community'
  | 'cultural'
  | 'employment'
  | 'news'
  | 'other'

interface ResourceCardProps {
  resource: Resource
  locale: string
  category?: Category
}

const categoryColors: Record<Category, { border: string; text: string; hover: string }> = {
  government: {
    border: 'border-t-kurd-red',
    text: 'text-kurd-red',
    hover: 'hover:text-kurd-red-dark',
  },
  legal: {
    border: 'border-t-kurd-green',
    text: 'text-kurd-green',
    hover: 'hover:text-kurd-green-dark',
  },
  education: {
    border: 'border-t-kurd-gold',
    text: 'text-kurd-gold-dark',
    hover: 'hover:text-kurd-gold-dark',
  },
  healthcare: {
    border: 'border-t-blue-500',
    text: 'text-blue-600',
    hover: 'hover:text-blue-700',
  },
  community: {
    border: 'border-t-indigo-500',
    text: 'text-indigo-600',
    hover: 'hover:text-indigo-700',
  },
  cultural: {
    border: 'border-t-amber-500',
    text: 'text-amber-600',
    hover: 'hover:text-amber-700',
  },
  employment: {
    border: 'border-t-teal-500',
    text: 'text-teal-600',
    hover: 'hover:text-teal-700',
  },
  news: {
    border: 'border-t-cyan-500',
    text: 'text-cyan-600',
    hover: 'hover:text-cyan-700',
  },
  other: { border: 'border-t-slate-300', text: 'text-slate-600', hover: 'hover:text-slate-900' },
}

export function ResourceCard({ resource, locale, category = 'other' }: ResourceCardProps) {
  const t = useTranslations('resources')
  const colors = categoryColors[category]

  return (
    <article className={`card p-6 border-t-4 ${colors.border} hover:translate-y-[-2px]`}>
      <div className="flex items-start gap-4">
        {/* Logo */}
        <div className="w-14 h-14 shrink-0 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden">
          {resource.logo?.asset ? (
            <Image
              src={urlFor(resource.logo.asset).width(112).height(112).url()}
              alt={getLocalizedValue(resource.name, locale) || ''}
              width={56}
              height={56}
              className="object-contain"
            />
          ) : (
            <svg
              className="w-7 h-7 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            {getLocalizedValue(resource.name, locale)}
          </h3>
          {resource.description && (
            <p className="text-base text-slate-600 leading-relaxed line-clamp-2 mb-4">
              {getLocalizedValue(resource.description, locale)}
            </p>
          )}

          {/* Link - Larger touch target */}
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold ${colors.text} bg-slate-50 hover:bg-slate-100 transition-colors`}
          >
            {t('visit')}
            <svg
              className="w-5 h-5 rtl:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </article>
  )
}
