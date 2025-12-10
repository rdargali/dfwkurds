'use client'

import { useTranslations, useLocale } from 'next-intl'

// Static data for historical Kurdish figures
const historicalFigures = [
  {
    id: 1,
    name: { en: 'Mustafa Barzani', ckb: 'مستەفا بارزانی', kmr: 'Mistefa Barzanî' },
    role: {
      en: 'Kurdish Leader (1903-1979)',
      ckb: 'سەرکردەی کوردی (١٩٠٣-١٩٧٩)',
      kmr: 'Serokê Kurd (1903-1979)',
    },
    description: {
      en: 'A legendary Kurdish leader who dedicated his life to the Kurdish independence movement.',
      ckb: 'سەرکردەیەکی ئەفسانەیی کوردی کە ژیانی تەرخان کرد بۆ بزووتنەوەی سەربەخۆیی کوردستان.',
      kmr: 'Serokekî efsanewî yê Kurd ku jiyana xwe ji bo tevgera serxwebûna Kurdistanê terxan kir.',
    },
    color: 'kurd-red',
  },
  {
    id: 2,
    name: { en: 'Qazi Muhammad', ckb: 'قازی محەممەد', kmr: 'Qazî Mihemed' },
    role: {
      en: 'President of Mahabad (1946)',
      ckb: 'سەرۆکی کۆماری مەهاباد (١٩٤٦)',
      kmr: 'Serokê Komarê Mahabadê (1946)',
    },
    description: {
      en: 'Founder and president of the Republic of Mahabad, the first Kurdish state in modern history.',
      ckb: 'دامەزرێنەر و سەرۆکی کۆماری مەهاباد، یەکەم دەوڵەتی کوردی لە مێژووی نوێدا.',
      kmr: 'Damezrîner û serokê Komarê Mahabadê, dewleta yekem a Kurdî di dîroka nûjen de.',
    },
    color: 'kurd-green',
  },
  {
    id: 3,
    name: { en: 'Mastura Ardalan', ckb: 'مەستورەی ئەردەڵان', kmr: 'Mestûra Erdelan' },
    role: {
      en: 'Poet & Historian (1805-1848)',
      ckb: 'شاعیر و مێژوونووس (١٨٠٥-١٨٤٨)',
      kmr: 'Helbestvan û Dîroknivîs (1805-1848)',
    },
    description: {
      en: 'A renowned Kurdish poet and historian, one of the first female Kurdish writers.',
      ckb: 'شاعیر و مێژوونووسێکی ناوداری کوردی، یەکێک لە یەکەم ژنە نووسەرە کوردییەکان.',
      kmr: 'Helbestvan û dîroknivîseke navdar a Kurd, yek ji yekem nivîskarên jin ên Kurd.',
    },
    color: 'kurd-gold',
  },
  {
    id: 4,
    name: { en: 'Ahmad Khani', ckb: 'ئەحمەدی خانی', kmr: 'Ehmedê Xanî' },
    role: {
      en: 'Poet & Scholar (1650-1707)',
      ckb: 'شاعیر و زاناکار (١٦٥٠-١٧٠٧)',
      kmr: 'Helbestvan û Zanyar (1650-1707)',
    },
    description: {
      en: 'Author of Mem û Zîn, considered one of the greatest Kurdish literary works.',
      ckb: 'نووسەری مەم و زین، کە وەک یەکێک لە گەورەترین بەرهەمە ئەدەبییەکانی کوردی دادەنرێت.',
      kmr: 'Nivîskarê Mem û Zînê, ku wek yek ji mezintirîn berhemên edebî yên Kurdî tê hesibandin.',
    },
    color: 'kurd-red',
  },
  {
    id: 5,
    name: { en: 'Leyla Qasim', ckb: 'لەیلا قاسم', kmr: 'Leyla Qasim' },
    role: {
      en: 'Revolutionary (1952-1974)',
      ckb: 'شۆڕشگێڕ (١٩٥٢-١٩٧٤)',
      kmr: 'Şoreşger (1952-1974)',
    },
    description: {
      en: 'A Kurdish student activist who became a symbol of Kurdish resistance.',
      ckb: 'چالاکوانێکی خوێندکاری کوردی کە بووە هێمای بەرگری کوردی.',
      kmr: 'Aktîvîsteke xwendekar a Kurd ku bû sembola berxwedana Kurdî.',
    },
    color: 'kurd-green',
  },
  {
    id: 6,
    name: { en: 'Sheikh Mahmud', ckb: 'شێخ مەحمود', kmr: 'Şêx Mehmûd' },
    role: {
      en: 'King of Kurdistan (1918-1922)',
      ckb: 'پاشای کوردستان (١٩١٨-١٩٢٢)',
      kmr: 'Qralê Kurdistanê (1918-1922)',
    },
    description: {
      en: 'Leader of the short-lived Kingdom of Kurdistan in Southern Kurdistan.',
      ckb: 'سەرکردەی شانشینی کورتەماوەی کوردستان لە باشووری کوردستان.',
      kmr: 'Serokê Keyaniya demkurt a Kurdistanê li Başûrê Kurdistanê.',
    },
    color: 'kurd-gold',
  },
]

const colorClasses: Record<string, { bg: string; text: string; border: string; accent: string }> = {
  'kurd-red': {
    bg: 'bg-kurd-red/10',
    text: 'text-kurd-red',
    border: 'border-t-kurd-red',
    accent: 'from-kurd-red',
  },
  'kurd-green': {
    bg: 'bg-kurd-green/10',
    text: 'text-kurd-green',
    border: 'border-t-kurd-green',
    accent: 'from-kurd-green',
  },
  'kurd-gold': {
    bg: 'bg-kurd-gold/10',
    text: 'text-kurd-gold-dark',
    border: 'border-t-kurd-gold',
    accent: 'from-kurd-gold',
  },
}

export function HistoricalFigures() {
  const t = useTranslations('home.historical')
  const locale = useLocale()

  const sectionLabel: Record<string, string> = {
    en: 'Kurdish Heritage',
    ckb: 'میراتی کوردی',
    kmr: 'Mîrasa Kurdî',
  }

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-kurd-gold/10 text-kurd-gold-dark text-sm font-semibold mb-4">
            {sectionLabel[locale] || sectionLabel.en}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-5">
            {t('title')}
          </h2>
          <p className="text-lg text-slate-600">{t('subtitle')}</p>
        </div>

        {/* Figures grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {historicalFigures.map(figure => {
            const colors = colorClasses[figure.color]
            return (
              <article
                key={figure.id}
                className={`card overflow-hidden border-t-4 ${colors.border}`}
              >
                {/* Image placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-50 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Placeholder with initials */}
                    <div
                      className={`w-20 h-20 rounded-2xl ${colors.bg} flex items-center justify-center`}
                    >
                      <span className={`text-2xl font-bold ${colors.text}`}>
                        {figure.name.en
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </span>
                    </div>
                  </div>
                  {/* Colored gradient overlay at bottom */}
                  <div
                    className={`absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r ${colors.accent} to-transparent`}
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">
                    {figure.name[locale as keyof typeof figure.name] || figure.name.en}
                  </h3>
                  <p className={`text-sm font-medium ${colors.text} mb-3`}>
                    {figure.role[locale as keyof typeof figure.role] || figure.role.en}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {figure.description[locale as keyof typeof figure.description] ||
                      figure.description.en}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
