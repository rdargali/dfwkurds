import { notFound } from 'next/navigation'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { urlPathToLocale, type Locale } from '@/i18n/config'
import { getSanityData, getLocalizedValue, urlFor, type NewsPost } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { placeholderNewsPosts } from '../page'

// GROQ query for a single news post
const NEWS_POST_QUERY = `*[_type == "newsPost" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  mainImage,
  body,
  publishedAt,
  featured
}`

// GROQ query for all news post slugs
const NEWS_POST_SLUGS_QUERY = `*[_type == "newsPost"] {
  "slug": slug.current
}`

// Placeholder slugs (from placeholder news posts)
const PLACEHOLDER_SLUGS = [
  'newroz-2026-celebration',
  'kurdish-language-classes-spring-2026',
  'community-health-fair-2026',
  'kurdish-cultural-heritage-exhibition',
  'new-board-members-2026',
]

interface NewsPostDetailProps {
  params: Promise<{ locale: string; slug: string }>
}

// Format date in localized format
function formatDate(dateStr: string, locale: string): string {
  const date = new Date(dateStr)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return date.toLocaleDateString(locale === 'ckb' ? 'ar' : locale === 'kmr' ? 'ku' : 'en-US', options)
}

// Get localized block content
function getLocalizedBlockContent(
  body: NewsPost['body'],
  locale: string
): PortableTextBlock[] | undefined {
  if (!body) return undefined
  if (locale === 'ckb' && body.ckb) return body.ckb as PortableTextBlock[]
  if (locale === 'kmr' && body.kmr) return body.kmr as PortableTextBlock[]
  if (body.en) return body.en as PortableTextBlock[]
  return (body.ckb || body.kmr || undefined) as PortableTextBlock[] | undefined
}

export async function generateMetadata({
  params,
}: NewsPostDetailProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params
  const locale = urlPathToLocale[localeParam] || (localeParam as Locale)

  try {
    const post = await getSanityData<NewsPost>(NEWS_POST_QUERY, { slug })
    if (!post) {
      return { title: 'Post Not Found' }
    }

    const title = getLocalizedValue(post.title, locale)
    return {
      title: `${title} | News`,
    }
  } catch {
    return { title: 'Post Not Found' }
  }
}

export async function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = []
  
  // Get slugs from Sanity
  let sanitySlugs: string[] = []
  try {
    const slugs = await getSanityData<Array<{ slug: string }>>(NEWS_POST_SLUGS_QUERY)
    sanitySlugs = slugs.map(s => s.slug)
  } catch (error) {
    console.error('[News] Error fetching slugs from Sanity:', error)
  }

  // Combine Sanity slugs with placeholder slugs
  const allSlugs = [...new Set([...sanitySlugs, ...PLACEHOLDER_SLUGS])]

  // Generate params for all locales (using URL paths: en, sorani, kurmanji)
  const urlPaths = ['en', 'sorani', 'kurmanji']
  for (const slug of allSlugs) {
    for (const locale of urlPaths) {
      params.push({ locale, slug })
    }
  }

  return params
}

// Allow dynamic params for posts not generated at build time
export const dynamicParams = true

export default async function NewsPostDetailPage({ params }: NewsPostDetailProps) {
  const { locale: localeParam, slug } = await params
  const locale = urlPathToLocale[localeParam] || (localeParam as Locale)
  setRequestLocale(locale)

  // Fetch the news post from Sanity
  let post: NewsPost | null = null
  try {
    post = await getSanityData<NewsPost>(NEWS_POST_QUERY, { slug })
  } catch (error) {
    console.error('[News] Error fetching post from Sanity:', error)
  }

  // If not found in Sanity, check placeholder posts
  if (!post) {
    post = placeholderNewsPosts.find(p => p.slug.current === slug) || null
  }

  if (!post) {
    notFound()
  }

  const title = getLocalizedValue(post.title, locale)
  const bodyContent = getLocalizedBlockContent(post.body, locale)
  const urlPath = locale === 'ckb' ? 'ckb' : locale === 'kmr' ? 'kmr' : 'en'
  const t = await getTranslations({ locale, namespace: 'news' })

  return (
    <article className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href={`/${urlPath}/news`}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <svg
            className="w-5 h-5 rtl:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {t('back_to_news')}
        </Link>

        {/* Header */}
        <header className="mb-8">
          {/* Date and Featured Badge */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
            </div>
            {post.featured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-kurd-gold/10 text-kurd-gold-dark text-xs font-semibold">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {locale === 'ckb' ? 'تایبەت' : locale === 'kmr' ? 'Taybet' : 'Featured'}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {title}
          </h1>
        </header>

        {/* Main Image */}
        {post.mainImage?.asset && (
          <div className="mb-8 rounded-2xl overflow-hidden bg-slate-100">
            <Image
              src={urlFor(post.mainImage.asset).width(1200).height(675).url()}
              alt={getLocalizedValue(post.mainImage.alt, locale) || title}
              width={1200}
              height={675}
              className="w-full h-auto"
              priority
            />
          </div>
        )}

        {/* Body Content */}
        {bodyContent && (
          <div className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-cyan-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900 prose-img:rounded-xl prose-img:shadow-md mb-12">
            <PortableText value={bodyContent} />
          </div>
        )}

        {/* Back to News Link */}
        <div className="pt-8 border-t border-slate-200">
          <Link
            href={`/${urlPath}/news`}
            className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-semibold transition-colors"
          >
            <svg
              className="w-5 h-5 rtl:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {t('back_to_news')}
          </Link>
        </div>
      </div>
    </article>
  )
}

