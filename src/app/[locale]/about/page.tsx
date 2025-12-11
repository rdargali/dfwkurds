import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { MissionSection } from '@/components/about/MissionSection'
import { TeamSection } from '@/components/about/TeamSection'
import { getLocaleFromParams, setupLocale } from '@/lib/page-utils'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const locale = await getLocaleFromParams(params)
  const t = await getTranslations({ locale, namespace: 'about' })

  return {
    title: t('title'),
    description: t('mission.content'),
  }
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await setupLocale(params)

  return (
    <div className="flex flex-col">
      <MissionSection />
      <TeamSection locale={locale} />
    </div>
  )
}
