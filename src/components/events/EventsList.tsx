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
          <span className="inline-block px-4 py-2 rounded-full bg-kurd-red/10 text-kurd-red text-sm font-semibold mb-5">
            {locale === 'ckb'
              ? 'چالاکییەکانی کۆمەڵگا'
              : locale === 'kmr'
                ? 'Bûyerên Civakî'
                : 'Community Events'}
          </span>
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

        {/* Contact Section for Phone RSVP */}
        <div className="mt-16 p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-start">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {locale === 'ckb'
                  ? 'پرسیارت هەیە؟'
                  : locale === 'kmr'
                    ? 'Pirsên we hene?'
                    : 'Have questions?'}
              </h3>
              <p className="text-slate-600">
                {locale === 'ckb'
                  ? 'پەیوەندیمان پێوە بکە بۆ زانیاری زیاتر دەربارەی چالاکییەکانمان'
                  : locale === 'kmr'
                    ? 'Ji bo agahdariya bêtir derbarê bûyerên me bi me re têkilî daynin'
                    : 'Contact us for more information about our events'}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="tel:+12145551234" className="phone-link btn-touch">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {locale === 'ckb'
                  ? 'پەیوەندی تەلەفۆنی'
                  : locale === 'kmr'
                    ? 'Têlefon bike'
                    : 'Call to RSVP'}
              </a>
              <a
                href="mailto:info@dfwkurds.org"
                className="btn bg-slate-100 hover:bg-slate-200 text-slate-700 btn-touch"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {locale === 'ckb' ? 'ئیمەیڵ' : locale === 'kmr' ? 'E-name' : 'Email Us'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
