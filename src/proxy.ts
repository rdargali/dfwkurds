import createMiddleware from 'next-intl/middleware'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { locales, defaultLocale, urlPaths, localeToUrlPath, urlPathToLocale } from './i18n/config'

// Use SEO-friendly paths as the primary locales for next-intl
// Map: sorani -> ckb, kurmanji -> kmr internally
const middleware = createMiddleware({
  locales: urlPaths as any,
  defaultLocale,
  localePrefix: 'as-needed',
  // Custom locale detection to map SEO paths to locale codes
  localeDetection: false, // Disable automatic detection
})

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const pathSegments = pathname.split('/').filter(Boolean)
  const firstSegment = pathSegments[0]

  // If first segment is a locale code (ckb, kmr), redirect to SEO-friendly path
  if (firstSegment && (firstSegment === 'ckb' || firstSegment === 'kmr')) {
    const seoPath = localeToUrlPath[firstSegment as 'ckb' | 'kmr']
    const newPathname = pathname.replace(`/${firstSegment}`, `/${seoPath}`)
    const url = request.nextUrl.clone()
    url.pathname = newPathname
    return NextResponse.redirect(url, 308) // Permanent redirect
  }

  // Process with next-intl middleware
  const response = middleware(request)

  // Rewrite any locale codes in redirect URLs to SEO-friendly paths
  if (response instanceof NextResponse) {
    const location = response.headers.get('location')
    if (location) {
      try {
        const redirectUrl = new URL(location, request.url)
        const redirectSegments = redirectUrl.pathname.split('/').filter(Boolean)
        const redirectLocale = redirectSegments[0]

        // If redirect contains a locale code, rewrite to SEO path
        if (redirectLocale && (redirectLocale === 'ckb' || redirectLocale === 'kmr')) {
          const seoPath = localeToUrlPath[redirectLocale as 'ckb' | 'kmr']
          redirectUrl.pathname = redirectUrl.pathname.replace(`/${redirectLocale}`, `/${seoPath}`)
          return NextResponse.redirect(redirectUrl, response.status)
        }
      } catch {
        // Invalid URL, continue with original response
      }
    }
  }

  return response
}

export const config = {
  // Match all pathnames except for
  // - /api routes
  // - /_next (Next.js internals)
  // - /_vercel (Vercel internals)
  // - /studio (Sanity Studio)
  // - Static files (e.g., /favicon.ico)
  matcher: ['/((?!api|_next|_vercel|studio|.*\\..*).*)'],
}
