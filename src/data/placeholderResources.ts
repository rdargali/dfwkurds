import type { Resource } from '@/lib/sanity'

// Placeholder resources with all three languages
// Original community resources + News sources from kurdishamericancommunitycenter.org/resources
// Used as fallback when Sanity data is unavailable
export const placeholderResources: Resource[] = [
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
      en: 'Dallas Public Library',
      ckb: 'کتێبخانەی گشتی دالاس',
      kmr: 'Pirtûkxaneya Giştî ya Dallas',
    },
    url: 'https://dallaslibrary2.org',
    description: {
      en: 'Free library services, computer access, and educational programs for all ages.',
      ckb: 'خزمەتگوزارییەکانی کتێبخانەی بەخۆڕایی، دەستگەیشتن بە کۆمپیوتەر، و بەرنامە پەروەردەییەکان بۆ هەموو تەمەنەکان.',
      kmr: 'Xizmetên pirtûkxaneyê yên belaş, gihîştina kompûterê û bernameyên perwerdehiyê ji bo hemû temen.',
    },
    category: 'education',
    order: 1,
  },
  {
    _id: '4',
    _type: 'resource',
    name: {
      en: 'Parkland Hospital',
      ckb: 'نەخۆشخانەی پارکلاند',
      kmr: 'Nexweşxaneya Parkland',
    },
    url: 'https://www.parklandhospital.com',
    description: {
      en: 'Public hospital providing healthcare services to Dallas County residents.',
      ckb: 'نەخۆشخانەی گشتی کە خزمەتگوزارییەکانی چاودێری تەندروستی دەستەبەر دەکات بۆ دانیشتووانی ناوچەی دالاس.',
      kmr: 'Nexweşxaneya giştî ku xizmetên lênihêrîna tenduristiyê peyda dike ji bo rûniştvanên herêma Dallas.',
    },
    category: 'healthcare',
    order: 1,
  },
  {
    _id: '5',
    _type: 'resource',
    name: {
      en: 'Kurdish American Community Center',
      ckb: 'ناوەندی کۆمەڵگای کوردی-ئەمریکی',
      kmr: 'Navenda Civaka Kurdî-Amerîkî',
    },
    url: 'https://kurdishamericancommunitycenter.org',
    description: {
      en: 'Main community organization providing resources and support for Kurdish Americans.',
      ckb: 'ڕێکخراوەی سەرەکی کۆمەڵگا کە سەرچاوەکان و پشتگیری دەستەبەر دەکات بۆ کوردە ئەمریکییەکان.',
      kmr: 'Rêxistina sereke ya civakê ku çavkanî û piştgirî peyda dike ji bo Kurdên Amerîkî.',
    },
    category: 'community',
    order: 1,
  },
  {
    _id: '6',
    _type: 'resource',
    name: {
      en: 'Kurdish Heritage Foundation',
      ckb: 'دامەزراوەی میراتی کوردی',
      kmr: 'Weqfa Mîrasa Kurdî',
    },
    url: 'https://kurdishheritage.org',
    description: {
      en: 'Organization dedicated to preserving and promoting Kurdish culture and heritage.',
      ckb: 'ڕێکخراوەیەک کە تەرخانکراوە بۆ پاراستن و بڵاوکردنەوەی کولتور و میراتی کوردی.',
      kmr: 'Rêxistinek ku ji bo parastina û pêşvebirina çand û mîrasa Kurdî têxebitîne.',
    },
    category: 'cultural',
    order: 1,
  },
  // News sources from kurdishamericancommunitycenter.org/events
  {
    _id: '7',
    _type: 'resource',
    name: {
      en: 'Rudaw',
      ckb: 'ڕووداو',
      kmr: 'Rudaw',
    },
    url: 'https://www.rudaw.net',
    description: {
      en: 'A prominent Kurdish media network that provides news coverage on Kurdistan and the Middle East. Established in 2013, it delivers news in multiple languages including Kurdish, English, Arabic, and Turkish.',
      ckb: 'تۆڕێکی میدیای کوردی ناودار کە دەرخستنی هەواڵ دەکات لەسەر کوردستان و ڕۆژهەڵاتی ناوەڕاست. لە ساڵی ٢٠١٣ دامەزراوە، هەواڵ بە چەند زمانێک دەگەیەنێت، لەوانە کوردی، ئینگلیزی، عەرەبی و تورکی.',
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
      en: "A leading Kurdish news agency established in 2015. Based in Erbil, Iraq, it provides extensive coverage of Kurdistan Region's news, including politics, economy, culture, and international relations. K24 broadcasts in Kurdish, English, Arabic, and Turkish.",
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
      en: 'An independent Kurdish news agency covering Kurdistan Region and broader Kurdish issues. Provides news in Kurdish, English, and Arabic.',
      ckb: 'دەزگایەکی هەواڵی سەربەخۆی کوردی کە دەرخستنی هەواڵ دەکات لەسەر هەرێمی کوردستان و کێشە گشتگیرەکانی کوردی. هەواڵ بە کوردی، ئینگلیزی، و عەرەبی دەستەبەر دەکات.',
      kmr: 'Ajansa nûçeyan a serbixwe ya Kurdî ku ragihandina nûçeyan dike li ser Herêma Kurdistanê û pirsgirêkên giştî yên Kurdî. Nûçe bi Kurdî, Îngilîzî û Erebî peyda dike.',
    },
    category: 'news',
    order: 3,
  },
  {
    _id: '10',
    _type: 'resource',
    name: {
      en: 'NRT',
      ckb: 'ئێن ئاڕ تی',
      kmr: 'NRT',
    },
    url: 'https://www.nrttv.com',
    description: {
      en: 'Kurdish satellite television network providing news, entertainment, and cultural programming. Broadcasts in Kurdish dialects and English.',
      ckb: 'تۆڕێکی تەلەڤیزیۆنی مانگی دەستکردی کوردی کە بەرنامەی هەواڵ، خۆشی، و کولتووری دەستەبەر دەکات. بە شێوەزاری کوردی و ئینگلیزی بڵاو دەکاتەوە.',
      kmr: 'Torreke televîzyona peykeyê ya Kurdî ku bernameyên nûçe, kêfxweşî û çandî peyda dike. Bi şêwezariyên Kurdî û Îngilîzî weşan dike.',
    },
    category: 'news',
    order: 4,
  },
  {
    _id: '11',
    _type: 'resource',
    name: {
      en: 'Kurdistan TV',
      ckb: 'کوردستان تی ڤی',
      kmr: 'Kurdistan TV',
    },
    url: 'https://www.kurdistantv.net',
    description: {
      en: 'Official television channel of the Kurdistan Regional Government, providing news and cultural content.',
      ckb: 'کەناڵی تەلەڤیزیۆنی فەرمی هەرێمی کوردستان، کە ناوەڕۆکەکانی هەواڵ و کولتور دەستەبەر دەکات.',
      kmr: 'Kanala televîzyona fermî ya Hikûmeta Herêmî ya Kurdistanê, ku naverokên nûçe û çandî peyda dike.',
    },
    category: 'news',
    order: 5,
  },
  {
    _id: '12',
    _type: 'resource',
    name: {
      en: 'Kurdish Globe',
      ckb: 'گلۆبی کوردی',
      kmr: 'Globeya Kurdî',
    },
    url: 'https://www.kurdishglobe.net',
    description: {
      en: 'Online Kurdish news platform covering Kurdish affairs, politics, and culture.',
      ckb: 'پلاتفۆرمی هەواڵی ئۆنلاینی کوردی کە دەرخستنی کاروبارەکانی کوردی، سیاسەت، و کولتور دەکات.',
      kmr: 'Platforma nûçeyan a serhêl ya Kurdî ku ragihandina karûbarên Kurdî, siyaset û çandê dike.',
    },
    category: 'news',
    order: 6,
  },
  {
    _id: '13',
    _type: 'resource',
    name: {
      en: 'Kurdistan Report',
      ckb: 'ڕاپۆرتی کوردستان',
      kmr: 'Raporta Kurdistanê',
    },
    url: 'https://www.kurdistanreport.com',
    description: {
      en: 'Independent news source focusing on Kurdistan Region and Kurdish diaspora communities.',
      ckb: 'سەرچاوەیەکی هەواڵی سەربەخۆ کە تیشک دەخاتە سەر هەرێمی کوردستان و کۆمەڵگاکانی کوردی دابڕاو.',
      kmr: 'Çavkaniya nûçeyan a serbixwe ku bal dide ser Herêma Kurdistanê û civakên kurdên belavbûyî.',
    },
    category: 'news',
    order: 7,
  },
]
