import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import type { NewsPost } from '@/lib/sanity'
import { getSanityData, getLocalizedValue, urlFor } from '@/lib/sanity'
import { setRequestLocale } from 'next-intl/server'
import { placeholderNewsPosts } from '@/data/placeholderNewsPosts'
import { urlPathToLocale, type Locale } from '@/i18n/config'

// GROQ query for a single news post by slug
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
const NEWS_POST_SLUGS_QUERY = `*[_type == "newsPost"].slug.current`

// Extract plain text from PortableText blocks for metadata
function extractTextFromBlocks(blocks: PortableTextBlock[] | undefined): string {
  if (!blocks) return ''
  return blocks
    .filter(block => block._type === 'block')
    .map(block => {
      if ('children' in block && Array.isArray(block.children)) {
        return block.children
          .filter(
            child =>
              child && typeof child === 'object' && '_type' in child && child._type === 'span'
          )
          .map(child => {
            if (
              child &&
              typeof child === 'object' &&
              'text' in child &&
              typeof child.text === 'string'
            ) {
              return child.text
            }
            return ''
          })
          .join('')
      }
      return ''
    })
    .join(' ')
    .trim()
    .slice(0, 160) // Limit to 160 characters for description
}

interface NewsPostDetailProps {
  params: Promise<{ locale: string; slug: string }>
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
  const PLACEHOLDER_SLUGS = placeholderNewsPosts.map(p => p.slug.current)
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

export async function generateMetadata({ params }: NewsPostDetailProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params
  const locale = urlPathToLocale[localeParam] || (localeParam as Locale)

  // Fetch the news post
  let post: NewsPost | null = null
  try {
    post = await getSanityData<NewsPost>(NEWS_POST_QUERY, { slug })
  } catch (error) {
    console.error('[News] Error fetching post from Sanity:', error)
  }

  // If not found in Sanity, try placeholder posts
  if (!post) {
    post = placeholderNewsPosts.find(p => p.slug.current === slug) || null
  }

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const title = getLocalizedValue(post.title, locale)
  const bodyBlocks = getLocalizedValue(post.body, locale) as PortableTextBlock[] | undefined
  const description = extractTextFromBlocks(bodyBlocks) || title

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: post.mainImage?.asset
        ? [
            {
              url: urlFor(post.mainImage.asset).width(1200).height(630).url(),
              alt: getLocalizedValue(post.mainImage.alt, locale) || title,
            },
          ]
        : [],
    },
  }
}

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

  // If not found in Sanity, try to find in placeholder posts
  if (!post) {
    post = placeholderNewsPosts.find(p => p.slug.current === slug) || null
  }

  if (!post) {
    notFound()
  }

  const title = getLocalizedValue(post.title, locale) || 'News Post'
  const body = getLocalizedValue(post.body, locale) as PortableTextBlock[] | undefined
  const imageAlt = post.mainImage?.alt
    ? getLocalizedValue(post.mainImage.alt, locale) || title
    : title

  // Format date
  const date = new Date(post.publishedAt)
  const formattedDate = date.toLocaleDateString(
    locale === 'ckb' ? 'ar' : locale === 'kmr' ? 'ku' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  )

  return (
    <article className="max-w-4xl mx-auto px-4 py-8 md:py-12">
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
            <time dateTime={post.publishedAt}>{formattedDate}</time>
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
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">{title}</h1>
      </header>

      {/* Main Image */}
      {post.mainImage?.asset && (
        <div className="mb-8 rounded-xl overflow-hidden bg-slate-100">
          <Image
            src={urlFor(post.mainImage.asset).width(1200).height(630).url()}
            alt={imageAlt}
            width={1200}
            height={630}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      )}

      {/* Body Content */}
      {body && body.length > 0 && (
        <div className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-cyan-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900 prose-ul:text-slate-700 prose-ol:text-slate-700">
          <PortableText value={body} />
        </div>
      )}

      {/* Back Link */}
      <div className="mt-12 pt-8 border-t border-slate-200">
        <a
          href={`/${localeParam === 'ckb' ? 'sorani' : localeParam === 'kmr' ? 'kurmanji' : 'en'}/news`}
          className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-semibold"
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          {locale === 'ckb'
            ? 'گەڕانەوە بۆ هەواڵەکان'
            : locale === 'kmr'
              ? 'Vegere nûçeyan'
              : 'Back to News'}
        </a>
      </div>
    </article>
  )
}
