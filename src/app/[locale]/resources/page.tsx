import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { urlPathToLocale, type Locale } from '@/i18n/config'
import { getSanityData, type Resource } from '@/lib/sanity'
import { ResourcesList } from '@/components/resources/ResourcesList'

// GROQ query for resources
const RESOURCES_QUERY = `*[_type == "resource"] | order(category asc, order asc) {
  _id,
  name,
  url,
  description,
  logo,
  category,
  order
}`

// Placeholder resources with all three languages
const placeholderResources: Resource[] = [
  {
    _id: '1',
    _type: 'resource',
    name: {
      en: 'USCIS Immigration Services',
      ckb: 'خزمەتگوزارییەکانی کۆچبەری USCIS',
      kmr: 'Xizmetên Koçberiyê yên USCIS',
    },
    url: 'https://www.uscis.gov',
    description: {
      en: 'Official U.S. Citizenship and Immigration Services website for visa and citizenship information.',
      ckb: 'ماڵپەڕی فەرمی خزمەتگوزاری هاوڵاتیبوون و کۆچبەری ئەمریکا بۆ زانیاری ڤیزا و هاوڵاتیبوون.',
      kmr: 'Malpera fermî ya Xizmetên Welatîbûn û Koçberiyê yên DYA ji bo agahdariya vîze û welatîbûnê.',
    },
    category: 'government',
    order: 1,
  },
  {
    _id: '2',
    _type: 'resource',
    name: {
      en: 'Texas Workforce Commission',
      ckb: 'کۆمیسیۆنی هێزی کار لە تێکساس',
      kmr: 'Komîsyona Hêza Kar a Teksasê',
    },
    url: 'https://www.twc.texas.gov',
    description: {
      en: 'Employment services, job training, and unemployment benefits in Texas.',
      ckb: 'خزمەتگوزارییەکانی دامەزراندن، ڕاهێنانی کار، و سوودەکانی بێکاری لە تێکساس.',
      kmr: 'Xizmetên kar, perwerdehiya kar û feydeyên bêkariyê li Teksasê.',
    },
    category: 'employment',
    order: 1,
  },
  {
    _id: '3',
    _type: 'resource',
    name: {
      en: 'Dallas ISD',
      ckb: 'قوتابخانەکانی دالاس',
      kmr: 'Dibistanên Dallas ISD',
    },
    url: 'https://www.dallasisd.org',
    description: {
      en: 'Dallas Independent School District - information for enrolling children in public schools.',
      ckb: 'ناوچەی قوتابخانەی سەربەخۆی دالاس - زانیاری بۆ تۆمارکردنی منداڵان لە قوتابخانە گشتییەکان.',
      kmr: 'Navçeya Dibistanan a Serbixwe ya Dallas - agahdarî ji bo qeydkirina zarokan di dibistanên giştî de.',
    },
    category: 'education',
    order: 1,
  },
  {
    _id: '4',
    _type: 'resource',
    name: {
      en: 'Parkland Health',
      ckb: 'تەندروستی پارکلاند',
      kmr: 'Tenduristiya Parkland',
    },
    url: 'https://www.parklandhospital.com',
    description: {
      en: 'Public hospital system serving Dallas County with affordable healthcare options.',
      ckb: 'سیستەمی نەخۆشخانەی گشتی کە خزمەت بە ناوچەی دالاس دەکات بە بژاردەی چاودێری تەندروستی گونجاو.',
      kmr: 'Pergala nexweşxaneya giştî ku bi vebijarkên lênihêrîna tenduristiyê yên erzan ji wîlayeta Dallas re xizmet dike.',
    },
    category: 'healthcare',
    order: 1,
  },
  {
    _id: '5',
    _type: 'resource',
    name: {
      en: 'Kurdish Institute',
      ckb: 'پەیمانگەی کوردی',
      kmr: 'Enstîtuya Kurdî',
    },
    url: 'https://www.institutkurde.org',
    description: {
      en: 'International Kurdish cultural and research institution promoting Kurdish heritage.',
      ckb: 'دامەزراوەی نێودەوڵەتی کولتووری و لێکۆڵینەوەی کوردی کە میراتی کوردی بڵاو دەکاتەوە.',
      kmr: 'Saziya çandî û lêkolînê ya navneteweyî ya Kurdî ku mîrasa Kurdî belav dike.',
    },
    category: 'cultural',
    order: 1,
  },
  {
    _id: '6',
    _type: 'resource',
    name: {
      en: 'Legal Aid of NorthWest Texas',
      ckb: 'یارمەتی یاسایی باکووری ڕۆژئاوای تێکساس',
      kmr: 'Alîkariya Dadrêsî ya Bakurê Rojavayê Teksasê',
    },
    url: 'https://www.lanwt.org',
    description: {
      en: 'Free legal services for low-income residents in civil matters.',
      ckb: 'خزمەتگوزاری یاسایی بەخۆڕایی بۆ دانیشتووانی کەمدەرامەت لە کارە مەدەنییەکان.',
      kmr: 'Xizmetên dadrêsî yên belaş ji bo niştecihên kêmdehat di karên sivîl de.',
    },
    category: 'legal',
    order: 1,
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
  const t = await getTranslations({ locale, namespace: 'resources' })

  return {
    title: t('title'),
  }
}

export default async function ResourcesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  // Map URL path to internal locale code
  const locale = urlPathToLocale[localeParam] || (localeParam as Locale)
  setRequestLocale(locale)

  // Try to fetch from Sanity
  let resources: Resource[] = []
  try {
    resources = await getSanityData<Resource[]>(RESOURCES_QUERY)
  } catch {
    console.log('Using placeholder resources data')
  }

  // Use placeholder if no data
  const displayResources = resources.length > 0 ? resources : placeholderResources

  return (
    <div className="flex flex-col">
      <ResourcesList resources={displayResources} locale={locale} />
    </div>
  )
}
