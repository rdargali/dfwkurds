import { setRequestLocale } from 'next-intl/server'
import { urlPathToLocale, type Locale } from '@/i18n/config'
import { HeroSection } from '@/components/home/HeroSection'
import { HistoricalFigures } from '@/components/home/HistoricalFigures'
import { MissionSection } from '@/components/home/MissionSection'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  // Map URL path to internal locale code
  const locale = urlPathToLocale[localeParam] || (localeParam as Locale)
  setRequestLocale(locale)

  return (
    <div className="flex flex-col">
      <HeroSection />
      <MissionSection />
      <HistoricalFigures locale={locale} />
    </div>
  )
}
