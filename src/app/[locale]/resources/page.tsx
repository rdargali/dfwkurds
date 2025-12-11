import type { Metadata } from 'next'
import type { Resource } from '@/lib/sanity'
import { ResourcesList } from '@/components/resources/ResourcesList'
import { placeholderResources } from '@/data/placeholderResources'
import { generatePageMetadata, setupLocale, fetchWithFallback } from '@/lib/page-utils'

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  return generatePageMetadata(params, 'resources')
}

export default async function ResourcesPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await setupLocale(params)
  const displayResources = await fetchWithFallback<Resource>(
    RESOURCES_QUERY,
    placeholderResources,
    'Resources'
  )

  return (
    <div className="flex flex-col">
      <ResourcesList resources={displayResources} locale={locale} />
    </div>
  )
}
