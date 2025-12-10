import { getSanityData, getLocalizedValue, type TeamMember, urlFor } from '@/lib/sanity'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

// GROQ query for team members
const TEAM_QUERY = `*[_type == "teamMember"] | order(order asc) {
  _id,
  name,
  role,
  photo,
  bio,
  email,
  linkedin,
  order
}`

// Placeholder data for when Sanity is not configured
const placeholderTeam: TeamMember[] = [
  {
    _id: '1',
    _type: 'teamMember',
    name: { en: 'Ahmed Rashid', ckb: 'ئەحمەد ڕەشید', kmr: 'Ehmed Reşîd' },
    role: { en: 'President', ckb: 'سەرۆک', kmr: 'Serok' },
    bio: {
      en: 'Dedicated to serving the Kurdish community in DFW for over 15 years.',
      ckb: 'خۆی تەرخان کردووە بۆ خزمەتکردنی کۆمەڵگای کوردی لە DFW بۆ زیاتر لە ١٥ ساڵ.',
      kmr: 'Bi xizmeta civaka Kurdî ya DFW-ê ve ji 15 salan zêdetir e xebitî.',
    },
    order: 1,
  },
  {
    _id: '2',
    _type: 'teamMember',
    name: { en: 'Sara Mustafa', ckb: 'سارا مستەفا', kmr: 'Sara Mistefa' },
    role: { en: 'Vice President', ckb: 'جێگری سەرۆک', kmr: 'Cîgirê Serok' },
    bio: {
      en: 'Passionate about preserving Kurdish culture and traditions.',
      ckb: 'خولیای پاراستنی کولتوور و نەریتەکانی کوردی هەیە.',
      kmr: 'Bi xîret e ji bo parastina çand û kevneşopiyên Kurdî.',
    },
    order: 2,
  },
  {
    _id: '3',
    _type: 'teamMember',
    name: { en: 'Omar Hassan', ckb: 'عومەر حەسەن', kmr: 'Omer Hesen' },
    role: { en: 'Secretary', ckb: 'سکرتێر', kmr: 'Sekreter' },
    bio: {
      en: 'Managing community operations and member communications.',
      ckb: 'بەڕێوەبردنی کارەکانی کۆمەڵگا و پەیوەندی ئەندامەکان.',
      kmr: 'Birêvebirina xebatên civakî û têkiliyên endaman.',
    },
    order: 3,
  },
  {
    _id: '4',
    _type: 'teamMember',
    name: { en: 'Layla Karim', ckb: 'لەیلا کەریم', kmr: 'Leyla Kerîm' },
    role: { en: 'Treasurer', ckb: 'خەزنەدار', kmr: 'Xeznedar' },
    bio: {
      en: 'Ensuring transparent and responsible financial management.',
      ckb: 'دڵنیایی لە بەڕێوەبردنی دارایی شەفاف و بەرپرسیارانە.',
      kmr: 'Misogerkirina birêvebirina darayî ya zelal û berpirsiyar.',
    },
    order: 4,
  },
]

interface TeamSectionProps {
  locale: string
}

export async function TeamSection({ locale }: TeamSectionProps) {
  const t = await getTranslations({ locale, namespace: 'about' })

  // Try to fetch from Sanity, fall back to placeholder data
  let team: TeamMember[] = []
  try {
    team = await getSanityData<TeamMember[]>(TEAM_QUERY)
  } catch {
    // Use placeholder data if Sanity is not configured
    console.log('Using placeholder team data')
  }

  // Use placeholder if no data from Sanity
  const displayTeam = team.length > 0 ? team : placeholderTeam

  const sectionLabel: Record<string, string> = {
    en: 'Our Team',
    ckb: 'تیمی ئێمە',
    kmr: 'Tîma Me',
  }

  const colors = ['kurd-red', 'kurd-green', 'kurd-gold', 'kurd-red'] as const
  const colorMap: Record<string, { ring: string; bg: string; text: string }> = {
    'kurd-red': { ring: 'ring-kurd-red/30', bg: 'bg-kurd-red/10', text: 'text-kurd-red' },
    'kurd-green': { ring: 'ring-kurd-green/30', bg: 'bg-kurd-green/10', text: 'text-kurd-green' },
    'kurd-gold': { ring: 'ring-kurd-gold/30', bg: 'bg-kurd-gold/10', text: 'text-kurd-gold-dark' },
  }

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-kurd-green/10 text-kurd-green text-sm font-semibold mb-4">
            {sectionLabel[locale] || sectionLabel.en}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-5">
            {t('team.title')}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t('team.subtitle')}</p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayTeam.map((member, index) => {
            const color = colors[index % colors.length]
            const colorClasses = colorMap[color]
            return (
              <article key={member._id} className="group text-center">
                {/* Photo */}
                <div
                  className={`relative w-36 h-36 mx-auto mb-5 rounded-2xl overflow-hidden bg-slate-100 ring-4 ${colorClasses.ring} group-hover:ring-8 transition-all duration-300`}
                >
                  {member.photo?.asset ? (
                    <Image
                      src={urlFor(member.photo.asset).width(288).height(288).url()}
                      alt={getLocalizedValue(member.name, locale) || ''}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-3xl font-bold ${colorClasses.text}`}>
                        {(getLocalizedValue(member.name, locale) || '')
                          .split(' ')
                          .map((n: string) => n[0])
                          .join('')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-kurd-red transition-colors">
                  {getLocalizedValue(member.name, locale)}
                </h3>
                <p className={`text-sm font-medium ${colorClasses.text} mb-2`}>
                  {getLocalizedValue(member.role, locale)}
                </p>
                {member.bio && (
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {getLocalizedValue(member.bio, locale)}
                  </p>
                )}

                {/* Social links */}
                {(member.email || member.linkedin) && (
                  <div className="flex items-center justify-center gap-2 mt-4">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className={`w-9 h-9 rounded-lg ${colorClasses.bg} hover:bg-kurd-red/20 flex items-center justify-center text-slate-500 hover:text-kurd-red transition-colors`}
                        aria-label="Email"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-9 h-9 rounded-lg ${colorClasses.bg} hover:bg-kurd-red/20 flex items-center justify-center text-slate-500 hover:text-kurd-red transition-colors`}
                        aria-label="LinkedIn"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
