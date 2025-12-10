'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { getLocalizedValue, type Event } from '@/lib/sanity'

interface EventCardProps {
  event: Event
  locale: string
  featured?: boolean
}

// Helper to calculate days until event
function getDaysUntil(dateStr: string): number {
  const eventDate = new Date(dateStr)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  eventDate.setHours(0, 0, 0, 0)
  const diffTime = eventDate.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

// Localized countdown text
function getCountdownText(days: number, locale: string): string {
  if (days === 0) {
    return locale === 'ckb' ? 'ئەمڕۆ!' : locale === 'kmr' ? 'Îro!' : 'Today!'
  }
  if (days === 1) {
    return locale === 'ckb' ? 'سبەینێ!' : locale === 'kmr' ? 'Sibê!' : 'Tomorrow!'
  }
  if (days < 0) {
    return locale === 'ckb' ? 'تەواو بوو' : locale === 'kmr' ? 'Qediya' : 'Past'
  }
  if (locale === 'ckb') {
    return `لە ${days} ڕۆژدا`
  }
  if (locale === 'kmr') {
    return `Di ${days} rojan de`
  }
  return `In ${days} days`
}

// Month names in all three languages
const monthNames: Record<string, string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  ckb: [
    'کانوونی دووەم',
    'شوبات',
    'ئازار',
    'نیسان',
    'ئایار',
    'حوزەیران',
    'تەممووز',
    'ئاب',
    'ئەیلوول',
    'تشرینی یەکەم',
    'تشرینی دووەم',
    'کانوونی یەکەم',
  ],
  kmr: ['Rêb', 'Reş', 'Ada', 'Avr', 'Gul', 'Pûş', 'Tîr', 'Gel', 'Rez', 'Kew', 'Ser', 'Bef'],
}

// Weekday names in all three languages
const weekdayNames: Record<string, string[]> = {
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  ckb: ['یەکشەممە', 'دووشەممە', 'سێشەممە', 'چوارشەممە', 'پێنجشەممە', 'ھەینی', 'شەممە'],
  kmr: ['Yekş', 'Duş', 'Sêş', 'Çarş', 'Pênc', 'În', 'Şem'],
}

// Get weekday name - properly localized
function getWeekday(dateStr: string, locale: string): string {
  const date = new Date(dateStr)
  const dayIndex = date.getDay()
  const names = weekdayNames[locale] || weekdayNames.en
  return names[dayIndex]
}

// Get month name - properly localized
function getMonth(dateStr: string, locale: string): string {
  const date = new Date(dateStr)
  const monthIndex = date.getMonth()
  const names = monthNames[locale] || monthNames.en
  return names[monthIndex]
}

// Format time
function formatTime(dateStr: string, locale: string): string {
  const date = new Date(dateStr)
  const hours = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, '0')

  if (locale === 'ckb') {
    // Kurdish uses 24-hour format typically
    return `${hours}:${minutes}`
  }

  // English and Kurmanji use 12-hour format
  const period = hours >= 12 ? 'PM' : 'AM'
  const hour12 = hours % 12 || 12
  return `${hour12}:${minutes} ${period}`
}

export function EventCard({ event, locale, featured = false }: EventCardProps) {
  const t = useTranslations('events')
  const daysUntil = getDaysUntil(event.eventDate)
  const isPast = daysUntil < 0
  const isUrgent = daysUntil >= 0 && daysUntil <= 3

  const eventDate = new Date(event.eventDate)
  const day = eventDate.getDate()
  const month = getMonth(event.eventDate, locale)
  const weekday = getWeekday(event.eventDate, locale)
  const time = formatTime(event.eventDate, locale)

  // Generate Google Calendar URL
  const generateCalendarUrl = () => {
    const title = encodeURIComponent(getLocalizedValue(event.title, locale) || '')
    const details = encodeURIComponent(getLocalizedValue(event.description, locale) || '')
    const location = encodeURIComponent(
      (getLocalizedValue(event.location, locale) || '') +
        (event.address ? `, ${event.address}` : '')
    )
    const startDate = new Date(event.eventDate).toISOString().replace(/-|:|\.\d+/g, '')
    const endDate = event.endDate
      ? new Date(event.endDate).toISOString().replace(/-|:|\.\d+/g, '')
      : new Date(new Date(event.eventDate).getTime() + 2 * 60 * 60 * 1000)
          .toISOString()
          .replace(/-|:|\.\d+/g, '')

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${startDate}/${endDate}`
  }

  // Generate Google Maps URL for location
  const generateMapsUrl = () => {
    const locationName = getLocalizedValue(event.location, locale) || ''
    const address = event.address || ''
    const query = encodeURIComponent(address || locationName)
    return `https://maps.google.com/maps?q=${query}`
  }

  // Format date as YYYY-MM-DD for URL-friendly ID
  const formatDateForId = (dateStr: string): string => {
    const date = new Date(dateStr)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // Generate event ID for anchor linking (includes date for uniqueness)
  const eventId = (() => {
    const slug = event.slug?.current || event._id
    const dateStr = formatDateForId(event.eventDate)
    return `${slug}-${dateStr}`
  })()

  // Generate share URL with anchor to specific event
  // Use state to avoid hydration mismatch with window.location
  const [shareUrl, setShareUrl] = useState<string>('')

  useEffect(() => {
    // Only access window on client side after mount
    if (typeof window !== 'undefined') {
      const baseUrl = window.location.origin + window.location.pathname
      setShareUrl(`${baseUrl}#event-${eventId}`)
    }
  }, [eventId])

  return (
    <article id={`event-${eventId}`} className={`timeline-item ${isPast ? 'opacity-60' : ''}`}>
      {/* Date Block */}
      <div className="shrink-0 w-24">
        <div
          className="flex flex-col items-center justify-center p-3 rounded-xl text-center"
          style={{
            background: isPast ? '#F1F5F9' : '#FFFFFF',
            border: `2px solid ${isPast ? '#CBD5E1' : '#E2E8F0'}`,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
          }}
        >
          <span
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: isPast ? '#94A3B8' : '#ED2024' }}
          >
            {month}
          </span>
          <span
            className="text-3xl font-black leading-none my-0.5"
            style={{ color: isPast ? '#94A3B8' : '#1E293B' }}
          >
            {day}
          </span>
          <span
            className="text-xs font-medium uppercase tracking-wide"
            style={{ color: isPast ? '#94A3B8' : '#64748B' }}
          >
            {weekday}
          </span>
        </div>
        {!isPast && (
          <div
            className="mt-2 px-2.5 py-1 rounded-full font-semibold text-xs text-center"
            style={{
              background: isUrgent ? '#FEE2E2' : '#FEF3C7',
              color: isUrgent ? '#DC2626' : '#92400E',
            }}
          >
            {getCountdownText(daysUntil, locale)}
          </div>
        )}
        {featured && !isPast && (
          <div className="mt-2 px-2 py-1 rounded-full bg-kurd-gold/10 text-kurd-gold-dark text-xs font-semibold text-center">
            {locale === 'ckb' ? 'تایبەت' : locale === 'kmr' ? 'Taybetî' : 'Featured'}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="timeline-content">
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          {getLocalizedValue(event.title, locale)}
        </h3>

        <div className="flex flex-wrap items-center gap-4 text-slate-600 mb-3">
          <span className="flex items-center gap-1.5">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {time}
          </span>
          {event.location && (
            <a
              href={generateMapsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-kurd-red transition-colors"
            >
              <svg
                className="w-4 h-4 text-kurd-red"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="underline underline-offset-2">
                {getLocalizedValue(event.location, locale)}
              </span>
            </a>
          )}
        </div>

        {event.description && (
          <p className="text-slate-600 mb-4 line-clamp-2">
            {getLocalizedValue(event.description, locale)}
          </p>
        )}

        {/* Actions */}
        {!isPast && (
          <div className="flex flex-wrap items-center gap-3">
            {event.registrationUrl && (
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-touch"
              >
                {t('register')}
              </a>
            )}
            <a
              href={generateCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-touch"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {locale === 'ckb'
                ? 'زیادکردن بۆ ڕۆژژمێر'
                : locale === 'kmr'
                  ? 'Lê zêde bike'
                  : 'Add to Calendar'}
            </a>
            <button
              onClick={async () => {
                if (!shareUrl) return // Don't share if URL not ready yet

                const shareData = {
                  title: getLocalizedValue(event.title, locale) || '',
                  text: getLocalizedValue(event.description, locale) || '',
                  url: shareUrl,
                }

                if (typeof navigator !== 'undefined' && navigator.share && navigator.canShare?.(shareData)) {
                  try {
                    await navigator.share(shareData)
                  } catch (err) {
                    // User cancelled or error occurred - silently fail
                  }
                } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
                  // Fallback: copy URL to clipboard
                  try {
                    await navigator.clipboard.writeText(shareUrl)
                    // Could show a toast notification here in the future
                  } catch (err) {
                    // Clipboard API not available - silently fail
                  }
                }
              }}
              disabled={!shareUrl}
              className="btn bg-slate-100 hover:bg-slate-200 text-slate-700 btn-touch"
              title={locale === 'ckb' ? 'هاوبەشکردن' : locale === 'kmr' ? 'Parve bike' : 'Share'}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              <span className="hidden sm:inline">
                {locale === 'ckb' ? 'هاوبەشکردن' : locale === 'kmr' ? 'Parve bike' : 'Share'}
              </span>
            </button>
          </div>
        )}
      </div>
    </article>
  )
}
