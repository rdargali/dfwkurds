import type { Metadata } from 'next'
import type { NewsPost } from '@/lib/sanity'
import { NewsList } from '@/components/news/NewsList'
import { placeholderNewsPosts } from '@/data/placeholderNewsPosts'
import { generatePageMetadata, setupLocale, fetchWithFallback } from '@/lib/page-utils'

// GROQ query for news posts
const NEWS_POSTS_QUERY = `*[_type == "newsPost"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage,
  body,
  publishedAt,
  featured
}`

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  return generatePageMetadata(params, 'news')
}

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await setupLocale(params)
  const displayPosts = await fetchWithFallback<NewsPost>(
    NEWS_POSTS_QUERY,
    placeholderNewsPosts,
    'News'
  )

  return (
    <div className="flex flex-col">
      <NewsList newsPosts={displayPosts} locale={locale} />
    </div>
  )
}
