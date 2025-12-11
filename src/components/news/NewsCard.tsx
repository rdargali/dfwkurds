'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { getLocalizedValue, urlFor, type NewsPost } from '@/lib/sanity'

interface NewsCardProps {
  newsPost: NewsPost
  locale: string
  featured?: boolean
}

// Format date in localized format
function formatDate(dateStr: string, locale: string): string {
  const date = new Date(dateStr)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return date.toLocaleDateString(
    locale === 'ckb' ? 'ar' : locale === 'kmr' ? 'ku' : 'en-US',
    options
  )
}

export function NewsCard({ newsPost, locale, featured = false }: NewsCardProps) {
  const t = useTranslations('news')
  const title = getLocalizedValue(newsPost.title, locale)
  const urlPath = locale === 'ckb' ? 'ckb' : locale === 'kmr' ? 'kmr' : 'en'
  const href = `/${urlPath}/news/${newsPost.slug.current}`

  return (
    <article
      className={`card p-6 border-t-4 ${
        featured ? 'border-t-kurd-gold hover:shadow-lg' : 'border-t-cyan-500 hover:shadow-md'
      } hover:translate-y-[-2px] transition-all`}
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image */}
        {newsPost.mainImage?.asset && (
          <div className="w-full md:w-48 lg:w-64 shrink-0 rounded-xl overflow-hidden bg-slate-100">
            <Link href={href}>
              <Image
                src={urlFor(newsPost.mainImage.asset).width(512).height(320).url()}
                alt={getLocalizedValue(newsPost.mainImage.alt, locale) || title}
                width={512}
                height={320}
                className="w-full h-48 md:h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Date and Featured Badge */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <time dateTime={newsPost.publishedAt}>
                {formatDate(newsPost.publishedAt, locale)}
              </time>
            </div>
            {newsPost.featured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-kurd-gold/10 text-kurd-gold-dark text-xs font-semibold">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {locale === 'ckb' ? 'تایبەت' : locale === 'kmr' ? 'Taybet' : 'Featured'}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 line-clamp-2">
            <Link href={href} className="hover:text-cyan-600 transition-colors">
              {title}
            </Link>
          </h3>

          {/* Read More Link */}
          <Link
            href={href}
            className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-semibold group"
          >
            {t('read_more')}
            <svg
              className="w-5 h-5 rtl:rotate-180 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}
