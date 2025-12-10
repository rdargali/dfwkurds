import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { urlPathToLocale, type Locale } from '@/i18n/config'
import { getSanityData, type Event } from '@/lib/sanity'
import { EventsList } from '@/components/events/EventsList'

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

// Placeholder events with all three languages
const placeholderEvents = [
  {
    _id: '1',
    _type: 'event' as const,
    title: {
      en: 'Newroz Celebration 2026',
      ckb: 'جەژنی نەورۆز ٢٠٢٦',
      kmr: 'Pîrozbahiya Newrozê 2026',
    },
    slug: { current: 'newroz-2025' },
    eventDate: '2026-03-21T18:00:00Z',
    location: {
      en: 'Dallas Community Center',
      ckb: 'ناوەندی کۆمەڵگای دالاس',
      kmr: 'Navenda Civakî ya Dallas',
    },
    address: '1234 Main Street, Dallas, TX 75201',
    description: {
      en: 'Join us for the biggest celebration of the Kurdish New Year! Enjoy traditional music, dance, and delicious Kurdish cuisine.',
      ckb: 'پێکەوە ئامادەبن بۆ گەورەترین جەژنی ساڵی نوێی کوردی! چێژ لە موسیقا و سەمای نەریتی و خواردنی کوردی خۆش وەربگرن.',
      kmr: 'Werin pîrozbahiya herî mezin a Sala Nû ya Kurdî! Ji muzîk û dansên kevneşopî û xwarina Kurdî ya xweş kêf bikin.',
    },
    isFeatured: true,
  },
  {
    _id: '2',
    _type: 'event' as const,
    title: {
      en: 'Kurdish Language Classes',
      ckb: 'وانەکانی زمانی کوردی',
      kmr: 'Dersên Zimanê Kurdî',
    },
    slug: { current: 'language-classes' },
    eventDate: '2026-02-01T10:00:00Z',
    location: {
      en: 'DFW Kurdish Center',
      ckb: 'ناوەندی کوردی DFW',
      kmr: 'Navenda Kurdî ya DFW',
    },
    description: {
      en: 'Weekly Kurdish language classes for children and adults. All levels welcome.',
      ckb: 'وانەکانی هەفتانەی زمانی کوردی بۆ منداڵان و گەورەکان. هەموو ئاستەکان بەخێرهاتن.',
      kmr: 'Dersên zimanê Kurdî yên heftane ji bo zarokan û mezinan. Hemû ast bi xêr hatin.',
    },
    isFeatured: false,
  },
  {
    _id: '3',
    _type: 'event' as const,
    title: {
      en: 'Community Picnic',
      ckb: 'پیکنیکی کۆمەڵگا',
      kmr: 'Pîknîka Civakî',
    },
    slug: { current: 'community-picnic' },
    eventDate: '2026-04-15T11:00:00Z',
    location: {
      en: 'White Rock Lake Park',
      ckb: 'پارکی دەریاچەی وایت ڕۆک',
      kmr: 'Parka Gola White Rock',
    },
    description: {
      en: 'Annual spring picnic for Kurdish families. Bring your favorite dish to share!',
      ckb: 'پیکنیکی ساڵانەی بەهاری بۆ خێزانە کوردییەکان. خواردنی خۆشەویستتان بهێنن بۆ بەشکردن!',
      kmr: 'Pîknîka salane ya biharê ji bo malbatên Kurd. Xwarina xwe ya bijare bînin ku parve bikin!',
    },
    isFeatured: false,
  },
]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: localeParam } = await params
  // Map URL path to internal locale code
  const locale = urlPathToLocale[localeParam] || (localeParam as Locale)
  const t = await getTranslations({ locale, namespace: 'events' })

  return {
    title: t('title'),
  }
}

export default async function EventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  // Map URL path to internal locale code
  const locale = urlPathToLocale[localeParam] || (localeParam as Locale)
  setRequestLocale(locale)

  // Try to fetch from Sanity
  let events: Event[] = []
  try {
    events = await getSanityData<Event[]>(EVENTS_QUERY)
    // Log for debugging in production
    if (process.env.NODE_ENV === 'production') {
      console.log(`[Events] Fetched ${events.length} events from Sanity`)
    }
  } catch (error) {
    console.error('[Events] Error fetching from Sanity:', error)
    console.log('[Events] Using placeholder events data')
  }

  // Use placeholder if no data
  const displayEvents = events.length > 0 ? events : placeholderEvents

  return (
    <div className="flex flex-col">
      <EventsList events={displayEvents} locale={locale} />
    </div>
  )
}
