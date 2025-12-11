import type { Metadata } from 'next'
import type { Event } from '@/lib/sanity'
import { EventsList } from '@/components/events/EventsList'
import { placeholderEvents } from '@/data/placeholderEvents'
import { generatePageMetadata, setupLocale, fetchWithFallback } from '@/lib/page-utils'

// GROQ query for events
const EVENTS_QUERY = `*[_type == "event" && eventDate >= now()] | order(eventDate asc) {
  _id,
  title,
  slug,
  eventDate,
  endDate,
  location,
  address,
  description,
  image,
  registrationUrl,
  isFeatured
}`

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  return generatePageMetadata(params, 'events')
}

export default async function EventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await setupLocale(params)
  const displayEvents = await fetchWithFallback<Event>(EVENTS_QUERY, placeholderEvents, 'Events')

  return (
    <div className="flex flex-col">
      <EventsList events={displayEvents} locale={locale} />
    </div>
  )
}
