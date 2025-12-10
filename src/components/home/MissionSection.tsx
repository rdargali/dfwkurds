'use client'

import { useTranslations, useLocale } from 'next-intl'

export function MissionSection() {
  const t = useTranslations('home.mission')
  const locale = useLocale()

  const sectionLabel: Record<string, string> = {
    en: 'What We Do',
    ckb: 'ئەرکەکانمان',
    kmr: 'Em Çi Dikin',
  }

  const values = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
      ),
      title: { en: 'Cultural Preservation', ckb: 'پاراستنی کولتوور', kmr: 'Parastina Çandî' },
      description: {
        en: 'Preserving and promoting the rich Kurdish heritage for future generations.',
        ckb: 'پاراستن و بڵاوکردنەوەی میراتی دەوڵەمەندی کوردی بۆ نەوەکانی داهاتوو.',
        kmr: 'Parastin û pêşvebirina mîrasa dewlemend a Kurdî ji bo nifşên pêşerojê.',
      },
      color: 'kurd-red',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: { en: 'Community Support', ckb: 'پشتیوانی کۆمەڵگا', kmr: 'Piştgiriya Civakî' },
      description: {
        en: 'Helping Kurdish families integrate and thrive in American society.',
        ckb: 'یارمەتیدانی خێزانە کوردییەکان لە تێکەڵبوون لەگەڵ کۆمەڵگای ئەمریکی.',
        kmr: 'Alîkariya malbatên Kurdî ku di civaka Amerîkî de bicîh bibin û pêş bikevin.',
      },
      color: 'kurd-green',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      title: {
        en: 'Education Programs',
        ckb: 'بەرنامە پەروەردەییەکان',
        kmr: 'Bernameyên Perwerdehiyê',
      },
      description: {
        en: 'Kurdish language classes and cultural education for all ages.',
        ckb: 'فێرکردنی زمانی کوردی و پەروەردەی کولتووری بۆ هەموو تەمەنەکان.',
        kmr: 'Dersên zimanê Kurdî û perwerdehiya çandî ji bo hemû temenan.',
      },
      color: 'kurd-gold',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      title: { en: 'Building Bridges', ckb: 'دروستکردنی پرد', kmr: 'Avakirina Piran' },
      description: {
        en: 'Creating connections between Kurdish and American communities.',
        ckb: 'دروستکردنی پەیوەندی نێوان کۆمەڵگای کوردی و ئەمریکی.',
        kmr: 'Afirandina girêdanan di navbera civakên Kurdî û Amerîkî de.',
      },
      color: 'kurd-red',
    },
  ]

  const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
    'kurd-red': { bg: 'bg-kurd-red/10', text: 'text-kurd-red', border: 'border-t-kurd-red' },
    'kurd-green': {
      bg: 'bg-kurd-green/10',
      text: 'text-kurd-green',
      border: 'border-t-kurd-green',
    },
    'kurd-gold': {
      bg: 'bg-kurd-gold/10',
      text: 'text-kurd-gold-dark',
      border: 'border-t-kurd-gold',
    },
  }

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-kurd-green/10 text-kurd-green font-semibold mb-5">
            {sectionLabel[locale] || sectionLabel.en}
          </span>
          <h2 className="section-title mb-5">{t('title')}</h2>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">{t('description')}</p>
        </div>

        {/* Values grid - Larger cards with better spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {values.map(value => {
            const colors = colorClasses[value.color]
            return (
              <div
                key={value.title.en}
                className={`card p-6 md:p-8 border-t-4 ${colors.border} hover:translate-y-[-4px]`}
              >
                <div
                  className={`w-16 h-16 rounded-xl ${colors.bg} flex items-center justify-center ${colors.text} mb-6`}
                >
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {value.title[locale as keyof typeof value.title] || value.title.en}
                </h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  {value.description[locale as keyof typeof value.description] ||
                    value.description.en}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
