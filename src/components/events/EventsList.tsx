'use client'

import { useTranslations } from 'next-intl'
import { EventCard } from './EventCard'
import type { Event } from '@/lib/sanity'

interface EventsListProps {
  events: Event[]
  locale: string
}

export function EventsList({ events, locale }: EventsListProps) {
  const t = useTranslations('events')

  const featuredEvents = events.filter(e => e.isFeatured)
  const regularEvents = events.filter(e => !e.isFeatured)

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="page-title mb-5">{t('title')}</h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {t('subtitle')}
            </p>
          </div>

        {/* Event Count */}
        <div className="flex items-center justify-center gap-2 text-slate-600 mb-10">
          <span className="w-8 h-8 rounded-lg bg-kurd-green/10 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-kurd-green"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </span>
          <span className="font-medium">
            {events.length} {locale === 'ckb' ? 'چالاکی' : locale === 'kmr' ? 'bûyer' : 'events'}
          </span>
        </div>

        {/* Featured Events */}
        {featuredEvents.length > 0 && (
          <div className="mb-14">
            <h2 className="section-title flex items-center gap-3 mb-8">
              <span className="w-10 h-10 rounded-xl bg-kurd-gold/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-kurd-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </span>
              {locale === 'ckb'
                ? 'چالاکییە تایبەتەکان'
                : locale === 'kmr'
                  ? 'Bûyerên Taybetî'
                  : 'Featured Events'}
            </h2>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              {featuredEvents.map(event => (
                <EventCard key={event._id} event={event} locale={locale} featured />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Events */}
        <div>
          <h2 className="section-title flex items-center gap-3 mb-8">
            <span className="w-10 h-10 rounded-xl bg-kurd-green/10 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-kurd-green"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </span>
            {t('upcoming')}
          </h2>

          {regularEvents.length > 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              {regularEvents.map(event => (
                <EventCard key={event._id} event={event} locale={locale} />
              ))}
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-slate-100 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-slate-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-slate-500 text-xl mb-2">{t('no_events')}</p>
              <p className="text-slate-400">
                {locale === 'ckb'
                  ? 'دواتر سەردانبکەوە'
                  : locale === 'kmr'
                    ? 'Paşê dîsa serdanê bikin'
                    : 'Check back soon for updates'}
              </p>
            </div>
          ) : null}
        </div>

        {/* Removed 'Have questions?' section as requested */}
      </div>
    </section>
  )
}
