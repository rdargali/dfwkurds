'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { ResourceCard } from './ResourceCard'
import type { Resource } from '@/lib/sanity'

interface ResourcesListProps {
  resources: Resource[]
  locale: string
}

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

const categoryOrder: Category[] = [
  'government',
  'legal',
  'education',
  'healthcare',
  'employment',
  'community',
  'cultural',
  'news',
  'other',
]

const categoryIcons: Record<Category, React.ReactNode> = {
  government: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  ),
  legal: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
      />
    </svg>
  ),
  education: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  ),
  healthcare: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  ),
  community: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  ),
  cultural: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
      />
    </svg>
  ),
  employment: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
  news: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
      />
    </svg>
  ),
  other: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
}

const categoryColors: Record<Category, { bg: string; text: string }> = {
  government: { bg: 'bg-kurd-red/10', text: 'text-kurd-red' },
  legal: { bg: 'bg-kurd-green/10', text: 'text-kurd-green' },
  education: { bg: 'bg-kurd-gold/10', text: 'text-kurd-gold-dark' },
  healthcare: { bg: 'bg-blue-50', text: 'text-blue-600' },
  community: { bg: 'bg-indigo-50', text: 'text-indigo-600' },
  cultural: { bg: 'bg-amber-50', text: 'text-amber-600' },
  employment: { bg: 'bg-teal-50', text: 'text-teal-600' },
  news: { bg: 'bg-cyan-50', text: 'text-cyan-600' },
  other: { bg: 'bg-slate-100', text: 'text-slate-600' },
}

export function ResourcesList({ resources, locale }: ResourcesListProps) {
  const t = useTranslations('resources')

  // Group resources by category
  const groupedResources = resources.reduce(
    (acc, resource) => {
      const category = (resource.category as Category) || 'other'
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(resource)
      return acc
    },
    {} as Record<Category, Resource[]>
  )

  // Only show the 'news' category
  const activeCategories = groupedResources['news'] && groupedResources['news'].length > 0 ? ['news'] : []

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="page-title mb-5">{t('title')}</h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {t('subtitle')}
            </p>
          </div>

        {/* Quick Jump Navigation for categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 p-4 bg-slate-50 rounded-2xl">
          {activeCategories.map(category => {
            const colors = categoryColors[category]
            return (
              <a
                key={`nav-${category}`}
                href={`#${category}`}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl ${colors.bg} ${colors.text} font-medium hover:opacity-80 transition-opacity`}
              >
                {categoryIcons[category]}
                <span className="hidden sm:inline">{t(`categories.${category}`)}</span>
              </a>
            )
          })}
        </div>

        {/* Resources by category */}
        <div className="space-y-16">
          {activeCategories.map(category => {
            const colors = categoryColors[category]
            return (
              <div key={category} id={category} className="scroll-mt-24">
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center ${colors.text}`}
                  >
                    {categoryIcons[category]}
                  </div>
                  <h2 className="section-title">{t(`categories.${category}`)}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {groupedResources[category].map(resource => (
                    <ResourceCard
                      key={resource._id}
                      resource={resource}
                      locale={locale}
                      category={category}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Help Section */}
        {/* Removed 'Need Help?' section as requested */}
      </div>
    </section>
  )
}
