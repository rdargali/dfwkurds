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
// Original community resources + News sources from kurdishamericancommunitycenter.org/resources
const placeholderResources: Resource[] = [
  // Original community resources
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
  // News sources from kurdishamericancommunitycenter.org/resources
  {
    _id: '7',
    _type: 'resource',
    name: {
      en: 'Rudaw',
      ckb: 'ڕوداو',
      kmr: 'Rudaw',
    },
    url: 'https://www.rudaw.net',
    description: {
      en: 'A prominent Kurdish media network providing news coverage on Kurdish and Middle Eastern affairs. Established in 2013, it delivers news in multiple languages, including Kurdish, English, Arabic, and Turkish.',
      ckb: 'تۆڕێکی میدیای کوردی بەناوبانگ کە دەرخستنی هەواڵ دەکات لەسەر کاروبارەکانی کوردستان و ڕۆژهەڵاتی ناوەڕاست. لە ساڵی ٢٠١٣ دامەزراوە، هەواڵ بە چەندین زمان دەگەیەنێت، لەوانە کوردی، ئینگلیزی، عەرەبی، و تورکی.',
      kmr: 'Torreke medyayê Kurdî yê navdar ku ragihandina nûçeyan dike li ser karûbarên Kurdistanê û Rojhilata Navîn. Di sala 2013an de hatiye damezrandin, nûçe bi çend zimanan digihîne, di nav de Kurdî, Îngilîzî, Erebî û Tirkî.',
    },
    category: 'news',
    order: 1,
  },
  {
    _id: '8',
    _type: 'resource',
    name: {
      en: 'Kurdistan 24',
      ckb: 'کوردستان ٢٤',
      kmr: 'Kurdistan 24',
    },
    url: 'https://www.kurdistan24.net',
    description: {
      en: 'A leading Kurdish news agency established in 2015. Based in Erbil, Iraq, it provides extensive coverage of Kurdistan Region\'s news, including politics, economy, culture, and international relations. K24 broadcasts in Kurdish, English, Arabic, and Turkish.',
      ckb: 'دەزگایەکی هەواڵی کوردی پێشەنگ کە لە ساڵی ٢٠١٥ دامەزراوە. لە هەولێر، عێراق دامەزراوە، دەرخستنی بەرفراوەی هەواڵی هەرێمی کوردستان دەکات، لەوانە سیاسەت، ئابووری، کولتور، و پەیوەندییە نێودەوڵەتییەکان. K24 بە کوردی، ئینگلیزی، عەرەبی، و تورکی بڵاو دەکاتەوە.',
      kmr: 'Ajansa nûçeyan a Kurdî ya pêşeng ku di sala 2015an de hatiye damezrandin. Li Hewlêrê, Iraqê hatiye damezrandin, ragihandina berfireh a nûçeyên Herêma Kurdistanê dike, di nav de siyaset, aborî, çand û têkiliyên navneteweyî. K24 bi Kurdî, Îngilîzî, Erebî û Tirkî weşan dike.',
    },
    category: 'news',
    order: 2,
  },
  {
    _id: '9',
    _type: 'resource',
    name: {
      en: 'Bas News',
      ckb: 'باس نیوز',
      kmr: 'Bas News',
    },
    url: 'https://www.basnews.com',
    description: {
      en: 'A prominent Kurdish news agency founded in 2009, headquartered in Erbil, Iraq. It offers comprehensive coverage of Kurdistan Region\'s news, focusing on politics, economy, culture, and society. Bas News publishes articles in Kurdish, English, Arabic, and Turkish.',
      ckb: 'دەزگایەکی هەواڵی کوردی بەناوبانگ کە لە ساڵی ٢٠٠٩ دامەزراوە، سەرۆکایەتی لە هەولێر، عێراق. دەرخستنی تەواوی هەواڵی هەرێمی کوردستان دەکات، تیشک دەخاتە سەر سیاسەت، ئابووری، کولتور، و کۆمەڵگا. باس نیوز وتار بە کوردی، ئینگلیزی، عەرەبی، و تورکی بڵاو دەکاتەوە.',
      kmr: 'Ajansa nûçeyan a Kurdî ya navdar ku di sala 2009an de hatiye damezrandin, serokatiya wê li Hewlêrê, Iraqê ye. Ragihandina tevahî ya nûçeyên Herêma Kurdistanê dike, bala dide ser siyaset, aborî, çand û civakê. Bas News gotar bi Kurdî, Îngilîzî, Erebî û Tirkî weşan dike.',
    },
    category: 'news',
    order: 3,
  },
  {
    _id: '10',
    _type: 'resource',
    name: {
      en: 'The Kurdish Project',
      ckb: 'پرۆژەکەی کوردی',
      kmr: 'Projeya Kurdî',
    },
    url: 'https://thekurdishproject.org',
    description: {
      en: 'An educational platform and news source dedicated to raising awareness about Kurdish culture, history, and current affairs. Founded to promote understanding and support for the Kurdish people, it provides articles, documentaries, and resources in multiple languages.',
      ckb: 'پلاتفۆرمێکی پەروەردەیی و سەرچاوەی هەواڵ کە تەرخان کراوە بۆ بەرزکردنەوەی ئاگاداری لەسەر کولتوری کوردی، مێژوو، و کاروبارەکانی ئێستا. بۆ پەرەپێدانی تێگەیشتن و پشتگیری لە خەڵکی کورد دامەزراوە، وتار، دۆکیومێنتاری، و سەرچاوەکان بە چەندین زمان دەستەبەر دەکات.',
      kmr: 'Platformeke perwerdehî û çavkaniya nûçeyan ku hatiye terxan kirin ji bo bilindkirina hişmendiyê li ser çanda Kurdî, dîrok û karûbarên niha. Ji bo pêşxistina têgihiştina û piştgirîya ji bo gelê Kurd hatiye damezrandin, gotar, belgefîlm û çavkaniyan bi çend zimanan peyda dike.',
    },
    category: 'news',
    order: 4,
  },
  {
    _id: '11',
    _type: 'resource',
    name: {
      en: 'Middle East Eye',
      ckb: 'چاوی ڕۆژهەڵاتی ناوەڕاست',
      kmr: 'Çavê Rojhilata Navîn',
    },
    url: 'https://www.middleeasteye.net',
    description: {
      en: 'An independent news organization that provides comprehensive coverage of Middle Eastern affairs, including Kurdistan. It publishes articles, analyses, and opinion pieces on politics, society, culture, and economics across the region.',
      ckb: 'دامەزراوەیەکی هەواڵی سەربەخۆ کە دەرخستنی تەواوی کاروبارەکانی ڕۆژهەڵاتی ناوەڕاست دەکات، لەوانە کوردستان. وتار، شیکردنەوە، و بەشەکانی ڕای بڵاو دەکاتەوە لەسەر سیاسەت، کۆمەڵگا، کولتور، و ئابووری لە هەرێمەکەدا.',
      kmr: 'Saziyeke nûçeyan a serbixwe ku ragihandina tevahî ya karûbarên Rojhilata Navîn dike, di nav de Kurdistan. Gotar, analîz û beşên rayê weşan dike li ser siyaset, civak, çand û aborî li herêmê.',
    },
    category: 'news',
    order: 5,
  },
  {
    _id: '12',
    _type: 'resource',
    name: {
      en: 'Al Jazeera',
      ckb: 'جەزیرە',
      kmr: 'Cezîre',
    },
    url: 'https://www.aljazeera.com',
    description: {
      en: 'A renowned international news organization that covers a wide range of global issues, including news related to Kurdistan and the broader Middle East region. Al Jazeera\'s reporting on Kurdistan typically includes political developments, social issues, cultural events, and economic updates.',
      ckb: 'دامەزراوەیەکی هەواڵی نێودەوڵەتی بەناوبانگ کە دەرخستنی بەرفراوەی کێشەکانی جیهانی دەکات، لەوانە هەواڵە پەیوەندیدارەکان بە کوردستان و ناوچەی فراوانتری ڕۆژهەڵاتی ناوەڕاست. دەرخستنی جەزیرە لەسەر کوردستان بەزۆری پێکدێت لە پێشکەوتنە سیاسییەکان، کێشە کۆمەڵایەتییەکان، بۆنە کولتوورییەکان، و نوێکردنەوە ئابوورییەکان.',
      kmr: 'Saziyeke nûçeyan a navneteweyî ya navdar ku ragihandina berfireh a pirsgirêkên cîhanê dike, di nav de nûçeyên têkildarî Kurdistanê û herêma berfirehtir a Rojhilata Navîn. Ragihandina Cezîre li ser Kurdistanê bi gelemperî pêk tê ji pêşketinên siyasî, pirsgirêkên civakî, bûyerên çandî û nûkirinên aborî.',
    },
    category: 'news',
    order: 6,
  },
  {
    _id: '13',
    _type: 'resource',
    name: {
      en: 'BBC News',
      ckb: 'هەواڵەکانی بی بی سی',
      kmr: 'Nûçeyên BBC',
    },
    url: 'https://www.bbc.com/news',
    description: {
      en: 'BBC News provides comprehensive coverage of Kurdistan, focusing on political developments, societal issues, cultural events, and economic updates within the region. Through its dedicated Middle East section, BBC News offers articles, videos, and analysis.',
      ckb: 'هەواڵەکانی بی بی سی دەرخستنی تەواوی کوردستان دەکات، تیشک دەخاتە سەر پێشکەوتنە سیاسییەکان، کێشە کۆمەڵایەتییەکان، بۆنە کولتوورییەکان، و نوێکردنەوە ئابوورییەکان لە ناوچەکەدا. لە ڕێگەی بەشی تایبەتی ڕۆژهەڵاتی ناوەڕاست، هەواڵەکانی بی بی سی وتار، ڤیدیۆ، و شیکردنەوە دەستەبەر دەکات.',
      kmr: 'Nûçeyên BBC ragihandina tevahî ya Kurdistanê dike, bala dide ser pêşketinên siyasî, pirsgirêkên civakî, bûyerên çandî û nûkirinên aborî li herêmê. Bi rêya beşa taybet a Rojhilata Navîn, Nûçeyên BBC gotar, vîdyo û analîz peyda dike.',
    },
    category: 'news',
    order: 7,
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
