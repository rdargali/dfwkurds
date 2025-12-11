import { getTranslations } from 'next-intl/server'
import { getSanityData, getLocalizedValue, urlFor, type HistoricalFigure } from '@/lib/sanity'
import Image from 'next/image'
import type { Locale } from '@/i18n/config'

// GROQ query for historical figures
const HISTORICAL_FIGURES_QUERY = `*[_type == "historicalFigure"] | order(order asc) {
  _id,
  name,
  role,
  description,
  photo,
  color,
  order
}`

// Fallback static data (used if Sanity fetch fails or no data)
// Based on historical figures featured on kurdishamericancommunitycenter.org
const fallbackFigures: Array<{
  _id: string
  name: { en: string; ckb: string; kmr: string }
  role: { en: string; ckb: string; kmr: string }
  description: { en: string; ckb: string; kmr: string }
  color: 'kurd-red' | 'kurd-green' | 'kurd-gold'
}> = [
  {
    _id: '1',
    name: { en: 'Mustafa Barzani', ckb: 'مستەفا بارزانی', kmr: 'Mistefa Barzanî' },
    role: {
      en: 'Kurdish Leader (1903-1979)',
      ckb: 'سەرکردەی کوردی (١٩٠٣-١٩٧٩)',
      kmr: 'Serokê Kurd (1903-1979)',
    },
    description: {
      en: 'A prominent Kurdish nationalist leader and military commander who dedicated his life to the Kurdish independence movement.',
      ckb: 'سەرکردەیەکی نیشتمانی کوردی و فەرماندەی سەربازی کە ژیانی تەرخان کرد بۆ بزووتنەوەی سەربەخۆیی کوردستان.',
      kmr: 'Serokekî neteweperwer û fermandarê leşkerî yê Kurd ku jiyana xwe ji bo tevgera serxwebûna Kurdistanê terxan kir.',
    },
    color: 'kurd-red',
  },
  {
    _id: '2',
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
    _id: '3',
    name: { en: 'Sheikh Mahmoud Barzinji', ckb: 'شێخ مەحمود بارزنجی', kmr: 'Şêx Mehmûd Barzincî' },
    role: {
      en: 'King of Kurdistan (1918-1922)',
      ckb: 'پاشای کوردستان (١٩١٨-١٩٢٢)',
      kmr: 'Qralê Kurdistanê (1918-1922)',
    },
    description: {
      en: 'A Kurdish leader who declared himself King of the Kingdom of Kurdistan in the early 20th century.',
      ckb: 'سەرکردەیەکی کوردی کە خۆی وەک پاشای شانشینی کوردستان دەستنیشان کرد لە سەرەتای سەدەی بیستەمدا.',
      kmr: 'Serokekî Kurd ku xwe wek qralê Keyaniya Kurdistanê destnîşan kir di destpêka sedsala bîstê de.',
    },
    color: 'kurd-gold',
  },
  {
    _id: '4',
    name: { en: 'Sheikh Ahmad Barzani', ckb: 'شێخ ئەحمەد بارزانی', kmr: 'Şêx Ehmed Barzanî' },
    role: {
      en: 'Kurdish Leader & Scholar',
      ckb: 'سەرکردەی کوردی و زاناکار',
      kmr: 'Serokê Kurd û Zanyar',
    },
    description: {
      en: 'A Kurdish leader and the elder brother of Mustafa Barzani, known for his role in Kurdish nationalist movements.',
      ckb: 'سەرکردەیەکی کوردی و برا گەورەی مستەفا بارزانی، ناسراوە بە بەشداریکردنی لە بزووتنەوە نیشتمانییەکانی کوردی.',
      kmr: 'Serokekî Kurd û birayê mezin ê Mistefa Barzanî, bi rolê xwe yê di tevgerên neteweperwer ên Kurdî de tê naskirin.',
    },
    color: 'kurd-red',
  },
  {
    _id: '5',
    name: { en: 'Sheikh Said Piran', ckb: 'شێخ سەعید پیران', kmr: 'Şêx Seîd Pîran' },
    role: {
      en: 'Leader of the Sheikh Said Rebellion (1925)',
      ckb: 'سەرکردەی شۆڕشی شێخ سەعید (١٩٢٥)',
      kmr: 'Serokê Serhildana Şêx Seîd (1925)',
    },
    description: {
      en: 'Leader of the Sheikh Said Rebellion in 1925 against the Turkish Republic, a significant Kurdish uprising.',
      ckb: 'سەرکردەی شۆڕشی شێخ سەعید لە ساڵی ١٩٢٥ دژ بە کۆماری تورکیا، شۆڕشێکی گرنگی کوردی.',
      kmr: 'Serokê Serhildana Şêx Seîd di sala 1925an de dijî Komara Tirkiyeyê, serhildanekî giring ê Kurdî.',
    },
    color: 'kurd-green',
  },
  {
    _id: '6',
    name: { en: 'Seyid Riza', ckb: 'سەیید ڕەزا', kmr: 'Seyîd Riza' },
    role: {
      en: 'Leader of the Dersim Rebellion (1937-1938)',
      ckb: 'سەرکردەی شۆڕشی دەرسیم (١٩٣٧-١٩٣٨)',
      kmr: 'Serokê Serhildana Dêrsimê (1937-1938)',
    },
    description: {
      en: 'A Kurdish Alevi leader who led the Dersim Rebellion against the Turkish government in the 1930s.',
      ckb: 'سەرکردەیەکی کوردی عەلەوی کە شۆڕشی دەرسیمی بەڕێوەبرد دژ بە حکومەتی تورکیا لە ساڵانی ١٩٣٠دا.',
      kmr: 'Serokekî Kurd ê Elewî ku Serhildana Dêrsimê birêve bir dijî hikûmeta Tirkiyeyê di salên 1930an de.',
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

interface HistoricalFiguresProps {
  locale: Locale
}

export async function HistoricalFigures({ locale }: HistoricalFiguresProps) {
  const t = await getTranslations({ locale, namespace: 'home.historical' })

  const sectionLabel: Record<string, string> = {
    en: 'Kurdish Heritage',
    ckb: 'میراتی کوردی',
    kmr: 'Mîrasa Kurdî',
  }

  // Try to fetch from Sanity
  let figures: HistoricalFigure[] = []
  try {
    figures = await getSanityData<HistoricalFigure[]>(HISTORICAL_FIGURES_QUERY)
  } catch (error) {
    console.error('[HistoricalFigures] Error fetching from Sanity:', error)
  }

  // Use fallback if no data from Sanity
  const displayFigures: HistoricalFigure[] =
    figures.length > 0
      ? figures
      : fallbackFigures.map(f => ({
          _id: f._id,
          _type: 'historicalFigure' as const,
          name: f.name,
          role: f.role,
          description: f.description,
          color: f.color,
          order: parseInt(f._id),
          photo: undefined, // Fallback figures don't have photos
        }))

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
          {displayFigures.map(figure => {
            const colors = colorClasses[figure.color]
            const name = getLocalizedValue(figure.name, locale) || ''
            const role = getLocalizedValue(figure.role, locale) || ''
            const description = getLocalizedValue(figure.description, locale) || ''
            const initials = name
              .split(' ')
              .map(n => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)

            return (
              <article
                key={figure._id}
                className={`card overflow-hidden border-t-4 ${colors.border}`}
              >
                {/* Image or placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-50 overflow-hidden">
                  {figure.photo?.asset ? (
                    <Image
                      src={urlFor(figure.photo.asset).width(400).height(300).url()}
                      alt={getLocalizedValue(figure.photo.alt, locale) || name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Placeholder with initials */}
                      <div
                        className={`w-20 h-20 rounded-2xl ${colors.bg} flex items-center justify-center`}
                      >
                        <span className={`text-2xl font-bold ${colors.text}`}>{initials}</span>
                      </div>
                    </div>
                  )}
                  {/* Colored gradient overlay at bottom */}
                  <div
                    className={`absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r ${colors.accent} to-transparent`}
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">{name}</h3>
                  <p className={`text-sm font-medium ${colors.text} mb-3`}>{role}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
