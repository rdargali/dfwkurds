'use client'

import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'

export function MissionSection() {
  const t = useTranslations('about')
  const locale = useLocale()

  const pillars = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
      ),
      title: { en: 'Cultural Preservation', ckb: 'پاراستنی کولتوور', kmr: 'Parastina Çandî' },
      description: {
        en: 'Honoring Kurdish heritage through events and programs.',
        ckb: 'ڕێزگرتن لە میراتی کوردی لە ڕێگەی چالاکییەکان و بەرنامەکان.',
        kmr: 'Rêzgirtina ji mîrasa Kurdî bi rêya bûyer û bernameyan.',
      },
      color: 'kurd-red',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      title: { en: 'Community Support', ckb: 'پشتیوانی کۆمەڵگا', kmr: 'Piştgiriya Civakî' },
      description: {
        en: 'Providing resources and assistance to Kurdish families.',
        ckb: 'پێشکەشکردنی سەرچاوەکان و یارمەتی بۆ خێزانە کوردییەکان.',
        kmr: 'Pêşkêşkirina çavkanî û alîkariyê ji bo malbatên Kurd.',
      },
      color: 'kurd-green',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      title: { en: 'Language Education', ckb: 'پەروەردەی زمان', kmr: 'Perwerdehiya Zimên' },
      description: {
        en: 'Teaching Kurdish language to youth and adults.',
        ckb: 'فێرکردنی زمانی کوردی بۆ گەنجان و پیاوان.',
        kmr: 'Hînkirina zimanê Kurdî ji ciwan û mezinan re.',
      },
      color: 'kurd-gold',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      title: { en: 'Integration', ckb: 'یەکگرتن', kmr: 'Întegrasyon' },
      description: {
        en: 'Helping families integrate into American society.',
        ckb: 'یارمەتی خێزانەکان لە تێکەڵبوون لەگەڵ کۆمەڵگای ئەمریکی.',
        kmr: 'Alîkariya malabatan ku di civaka Amerîkî de bicîh bibin.',
      },
      color: 'kurd-red',
    },
  ]

  const colorMap: Record<string, { bg: string; text: string }> = {
    'kurd-red': { bg: 'bg-kurd-red/10', text: 'text-kurd-red' },
    'kurd-green': { bg: 'bg-kurd-green/10', text: 'text-kurd-green' },
    'kurd-gold': { bg: 'bg-kurd-gold/10', text: 'text-kurd-gold-dark' },
  }

  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex justify-center mb-6">
            <Image
              src="/kacc-logo.png"
              alt="Kurdish American Community Center"
              width={100}
              height={100}
              className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-lg"
            />
          </div>
          <span className="inline-block px-4 py-1.5 rounded-full bg-kurd-red/10 text-kurd-red text-sm font-semibold mb-4">
            {locale === 'ckb' ? 'دەربارەی ئێمە' : locale === 'kmr' ? 'Derbarê Me' : 'About Us'}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-5">
            {t('title')}
          </h1>
        </div>

        {/* Mission content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-slate-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-kurd-red/10 flex items-center justify-center text-kurd-red">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                {t('mission.title')}
              </h2>
            </div>

            <p className="text-lg text-slate-600 leading-relaxed mb-8">{t('mission.content')}</p>

            {/* Mission pillars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pillars.map(pillar => {
                const colors = colorMap[pillar.color]
                return (
                  <div
                    key={pillar.title.en}
                    className="flex gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <div
                      className={`w-10 h-10 shrink-0 rounded-lg ${colors.bg} flex items-center justify-center ${colors.text}`}
                    >
                      {pillar.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">
                        {pillar.title[locale as keyof typeof pillar.title] || pillar.title.en}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {pillar.description[locale as keyof typeof pillar.description] ||
                          pillar.description.en}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
