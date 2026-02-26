import type { NewsPost } from '@/lib/sanity'

// Placeholder news posts with all three languages
// Used as fallback when Sanity data is unavailable
export const placeholderNewsPosts: NewsPost[] = [
  {
    _id: '1',
    _type: 'newsPost',
    title: {
      en: 'Newroz 2026 Celebration: A Grand Success',
      ckb: 'جەژنی نەورۆزی ٢٠٢٦: سەرکەوتنێکی گەورە',
      kmr: 'Pîrozbahiya Newrozê 2026: Serkeftineke Mezin',
    },
    slug: { current: 'newroz-2026-celebration' },
    publishedAt: '2026-03-22T10:00:00Z',
    featured: true,
    body: {
      en: [
        {
          _type: 'block',
          _key: 'block1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span1',
              text: 'The Kurdish American Community Center of Dallas-Fort Worth celebrated Newroz 2026 with an incredible gathering of over 500 community members. The event featured traditional Kurdish music, dance performances, and delicious food.',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'block2',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span2',
              text: "Highlights included performances by local Kurdish artists, children's activities, and a special presentation about Kurdish history and culture. The celebration brought together families from across the Dallas-Fort Worth metroplex.",
              marks: [],
            },
          ],
        },
      ],
      ckb: [
        {
          _type: 'block',
          _key: 'block1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span1',
              text: 'کۆمەڵەی کوردی-ئەمریکی لە DFW جەژنی نەورۆزی ٢٠٢٦ بە کۆبوونەوەیەکی نایاب بەخۆوە بینی کە زیاتر لە ٥٠٠ ئەندامی کۆمەڵگا بەشداریان کرد. بۆنەکە موسیقا و سەمای کوردی نەریتی و خواردنی خۆش تێدابوو.',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'block2',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span2',
              text: 'گرنگترین بەشەکان بریتی بوون لە نمایشی هونەرمەندە کوردییە ناوخۆییەکان، چالاکییەکانی منداڵان، و پێشکەشکردنی تایبەت دەربارەی مێژوو و کولتوری کوردی. جەژنەکە خێزانەکان لە هەموو ناوچەی دالاس-فۆرت وێرس کۆکردەوە.',
              marks: [],
            },
          ],
        },
      ],
      kmr: [
        {
          _type: 'block',
          _key: 'block1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span1',
              text: 'Komeleya Kurdan a Amerîkî ya DFW pîrozbahiya Newrozê 2026 bi kombûneke ecêb bi xwe re dît ku zêdetirî 500 endamên civakê beşdar bûn. Bûyerê muzîk û dansên kevneşopî yên Kurdî û xwarina xweş di nav de bû.',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'block2',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span2',
              text: 'Xalên girîng pêşandanên hunermendên Kurdî yên herêmî, çalakiyên zarokan û pêşkêşkirina taybet a derbarê dîrok û çanda Kurdî de bûn. Pîrozbahiyê malbatên ji herêmê Dallas-Fort Worth kom kir.',
              marks: [],
            },
          ],
        },
      ],
    },
  },
  {
    _id: '2',
    _type: 'newsPost',
    title: {
      en: 'New Kurdish Language Classes Begin This Spring',
      ckb: 'دەستپێکردنی وانەکانی نوێی زمانی کوردی لە بەهاردا',
      kmr: 'Destpêkirina Dersên Nû yên Zimanê Kurdî di Biyarê de',
    },
    slug: { current: 'kurdish-language-classes-spring-2026' },
    publishedAt: '2026-02-15T14:30:00Z',
    featured: false,
    body: {
      en: [
        {
          _type: 'block',
          _key: 'block1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span1',
              text: 'We are excited to announce the start of new Kurdish language classes for both children and adults. Classes will be held every Saturday morning starting March 1st, 2026.',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'block2',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span2',
              text: 'The program offers classes in both Sorani and Kurmanji dialects, with separate sessions for beginners, intermediate, and advanced students. Registration is now open and spaces are limited.',
              marks: [],
            },
          ],
        },
      ],
      ckb: [
        {
          _type: 'block',
          _key: 'block1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span1',
              text: 'ئێمە دڵخۆشین بە دەستپێکردنی وانەکانی نوێی زمانی کوردی بۆ منداڵان و گەورەکان. وانەکان هەموو شەممەیەک بەیانی دەست پێدەکەن لە ١ی ئازاری ٢٠٢٦.',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'block2',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span2',
              text: 'بەرنامەکە وانەکانی هەردوو شێوەزاری سۆرانی و کورمانجی دەستەبەر دەکات، بە جلسەی جیاواز بۆ دەستپێکەران، ناوەند، و قوتابی پێشکەوتووەکان. تۆمارکردن ئێستا کراوەیە و شوێن سنوردارە.',
              marks: [],
            },
          ],
        },
      ],
      kmr: [
        {
          _type: 'block',
          _key: 'block1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span1',
              text: 'Em ji destpêkirina dersên nû yên zimanê Kurdî ji bo zarokan û mezinan kêfxweş in. Ders dê her şemiyê sibê dest pê bike ji 1ê adarê 2026 ve.',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'block2',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span2',
              text: 'Bername dersên her du şêwezariyên Soranî û Kurmancî peyda dike, bi seansên cuda ji bo destpêkeran, navîn û xwendekarên pêşketî. Qeydkirin niha vekirî ye û cih sînordar in.',
              marks: [],
            },
          ],
        },
      ],
    },
  },
  {
    _id: '3',
    _type: 'newsPost',
    title: {
      en: 'Community Health Fair: Free Health Screenings and Resources',
      ckb: 'پێشانگای تەندروستی کۆمەڵگا: پشکنینی تەندروستی بەخۆڕایی و سەرچاوەکان',
      kmr: 'Pêşangeha Tenduristiya Civakî: Lênihêrîna Tenduristiyê ya Belaş û Çavkanî',
    },
    slug: { current: 'community-health-fair-2026' },
    publishedAt: '2026-01-20T09:00:00Z',
    featured: false,
    body: {
      en: [
        {
          _type: 'block',
          _key: 'block1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span1',
              text: 'Join us for our annual Community Health Fair on Saturday, February 28th, 2026, from 10 AM to 3 PM. The event will provide free health screenings, vaccinations, and information about local healthcare resources.',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'block2',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span2',
              text: 'Services include blood pressure checks, glucose testing, flu shots, and consultations with healthcare professionals. Kurdish and English interpreters will be available throughout the event.',
              marks: [],
            },
          ],
        },
      ],
      ckb: [
        {
          _type: 'block',
          _key: 'block1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span1',
              text: 'بەشداری لە پێشانگای ساڵانەی تەندروستی کۆمەڵگا بکە لە شەممە، ٢٨ی شوباتی ٢٠٢٦، لە کاتژمێر ١٠ بەیانی تا ٣ دواینیوەڕۆ. بۆنەکە پشکنینی تەندروستی بەخۆڕایی، کوتان، و زانیاری دەربارەی سەرچاوەکانی چاودێری تەندروستی ناوخۆ دەستەبەر دەکات.',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'block2',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span2',
              text: 'خزمەتگوزارییەکان بریتی دەبن لە پشکنینی پەستانی خوێن، تاقیکردنەوەی شەکر، کوتانی ئەنفلۆنزا، و مشتومڕ لەگەڵ پسپۆڕانی تەندروستی. وەرگێڕی کوردی و ئینگلیزی بەردەست دەبن لە ماوەی بۆنەکەدا.',
              marks: [],
            },
          ],
        },
      ],
      kmr: [
        {
          _type: 'block',
          _key: 'block1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span1',
              text: 'Beşdarî pêşangeha salane ya tenduristiya civakî bibin li şemiyê, 28ê sibatê 2026, ji saet 10ê sibê heta 3ê piştî nîvro. Bûyer lênihêrîna tenduristiyê ya belaş, kutan û agahdariya derbarê çavkaniyên lênihêrîna tenduristiyê ya herêmî peyda dike.',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'block2',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span2',
              text: 'Xizmet kontrolên pestana xwînê, ceribandina şekirê, kutanên gripê û konsultasyonên bi pîşesazên tenduristiyê de tê de hene. Wergêrên Kurdî û Îngilîzî di nav bûyerê de dê berdest bin.',
              marks: [],
            },
          ],
        },
      ],
    },
  },
  {
    _id: '4',
    _type: 'newsPost',
    title: {
      en: 'Kurdish Cultural Heritage Exhibition Opens',
      ckb: 'کردنەوەی پێشانگای میراتی کولتووری کوردی',
      kmr: 'Vekirina Pêşangeha Mîrasa Çandî ya Kurdî',
    },
    slug: { current: 'kurdish-cultural-heritage-exhibition' },
    publishedAt: '2026-01-10T11:00:00Z',
    featured: true,
    body: {
      en: [
        {
          _type: 'block',
          _key: 'block1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span1',
              text: 'We are proud to announce the opening of our Kurdish Cultural Heritage Exhibition at the Dallas Public Library. The exhibition showcases traditional Kurdish clothing, artifacts, photographs, and artwork.',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'block2',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span2',
              text: 'The exhibition runs from January 15th through March 15th, 2026, and is free and open to the public. Special guided tours are available for groups and schools. This is a wonderful opportunity to learn about Kurdish history and culture.',
              marks: [],
            },
          ],
        },
      ],
      ckb: [
        {
          _type: 'block',
          _key: 'block1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span1',
              text: 'ئێمە دڵخۆشین بە کردنەوەی پێشانگای میراتی کولتووری کوردی لە کتێبخانەی گشتی دالاس. پێشانگاکە جلوبەرگی کوردی نەریتی، بەرهەمە دێرینەکان، وێنەکان، و کارە هونەرییەکان پیشان دەدات.',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'block2',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span2',
              text: 'پێشانگاکە لە ١٥ی کانوونی دووەمی ٢٠٢٦ تا ١٥ی ئازاری ٢٠٢٦ دەخایەنێت و بەخۆڕایی و کراوەیە بۆ هەموو خەڵک. گەشتی ڕێنمایی تایبەت بەردەستە بۆ گروپەکان و قوتابخانەکان. ئەمە دەرفەتێکی نایابە بۆ فێربوون دەربارەی مێژوو و کولتوری کوردی.',
              marks: [],
            },
          ],
        },
      ],
      kmr: [
        {
          _type: 'block',
          _key: 'block1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span1',
              text: 'Em ji vekirina pêşangeha mîrasa çandî ya Kurdî li Pirtûkxaneya Giştî ya Dallas kêfxweş in. Pêşangeh cil û bergên Kurdî yên kevneşopî, berhemên kevnar, wêne û xebatên hunerî nîşan dide.',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'block2',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span2',
              text: 'Pêşangeh ji 15ê rêbendanê 2026 heta 15ê adarê 2026 dimîne û belaş û vekirî ye ji bo hemû gelê. Serdana rêberî ya taybet ji bo kom û dibistanan berdest e. Ev derfeteke ecêb e ku li ser dîrok û çanda Kurdî fêr bibin.',
              marks: [],
            },
          ],
        },
      ],
    },
  },
  {
    _id: '5',
    _type: 'newsPost',
    title: {
      en: 'Welcome New Board Members for 2026',
      ckb: 'بەخێرهاتن بە ئەندامانی نوێی بۆرد بۆ ٢٠٢٦',
      kmr: 'Bihêja Endamên Nû yên Boardê ji bo 2026',
    },
    slug: { current: 'new-board-members-2026' },
    publishedAt: '2026-01-05T16:00:00Z',
    featured: false,
    body: {
      en: [
        {
          _type: 'block',
          _key: 'block1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span1',
              text: 'We are pleased to welcome three new members to our Board of Directors for 2026. These dedicated individuals bring valuable experience and fresh perspectives to our organization.',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'block2',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span2',
              text: 'The new board members will help guide our community initiatives, cultural programs, and support services for Kurdish families in the DFW area. We look forward to their contributions in the coming year.',
              marks: [],
            },
          ],
        },
      ],
      ckb: [
        {
          _type: 'block',
          _key: 'block1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span1',
              text: 'ئێمە دڵخۆشین بە بەخێرهاتنی سێ ئەندامی نوێ بۆ بۆردی دایرێکتۆرەکان بۆ ٢٠٢٦. ئەم کەسانە تەرخانکراوەکان ئەزموون و دیدگای نوێ دەهێنن بۆ ڕێکخراوەکەمان.',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'block2',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span2',
              text: 'ئەندامانی نوێی بۆرد یارمەتی دەدەن بۆ ڕێنمایی کردنی دەستپێکردنەکانی کۆمەڵگا، بەرنامە کولتوورییەکان، و خزمەتگوزارییەکانی پشتگیری بۆ خێزانە کوردییەکان لە ناوچەی DFW. ئێمە چاوەڕوانی بەشدارییەکانیان دەکەین لە ساڵی داهاتوودا.',
              marks: [],
            },
          ],
        },
      ],
      kmr: [
        {
          _type: 'block',
          _key: 'block1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span1',
              text: 'Em ji bihêja sê endamên nû yên Boarda Rêvebirê ji bo 2026 kêfxweş in. Ev kesên terxan kirî ezmûn û nêrîna nû tînin rêxistina me.',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'block2',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span2',
              text: 'Endamên nû yên boardê dê alîkariya rêvebirina destpêkirinên civakî, bernameyên çandî û xizmetên piştgirî ji bo malbatên Kurdî li herêma DFW bikin. Em li ber beşdariyên wan di sala pêşerojê de dinêrin.',
              marks: [],
            },
          ],
        },
      ],
    },
  },
]

// Extract slugs for generateStaticParams
export const placeholderNewsSlugs = placeholderNewsPosts.map(post => post.slug.current)
