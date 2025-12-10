import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { urlPathToLocale, type Locale } from '@/i18n/config'
import { MissionSection } from '@/components/about/MissionSection'
import { TeamSection } from '@/components/about/TeamSection'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: localeParam } = await params
  // Map URL path to internal locale code
  const locale = urlPathToLocale[localeParam] || (localeParam as Locale)
  const t = await getTranslations({ locale, namespace: 'about' })

  return {
    title: t('title'),
  }
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  // Map URL path to internal locale code
  const locale = urlPathToLocale[localeParam] || (localeParam as Locale)
  setRequestLocale(locale)

  return (
    <div className="flex flex-col">
      <MissionSection />
      <TeamSection locale={locale} />
    </div>
  )
}
