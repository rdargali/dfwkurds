import { HeroSection } from '@/components/home/HeroSection'
import { HistoricalFigures } from '@/components/home/HistoricalFigures'
import { MissionSection } from '@/components/home/MissionSection'
import { setupLocale } from '@/lib/page-utils'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await setupLocale(params)

  return (
    <div className="flex flex-col">
      <HeroSection />
      <MissionSection />
      <HistoricalFigures locale={locale} />
    </div>
  )
}
