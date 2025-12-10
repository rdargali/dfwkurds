import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

/**
 * On-demand revalidation API route
 * 
 * This endpoint can be called by Sanity webhooks to immediately
 * invalidate the Next.js cache when content is published or updated.
 * 
 * Usage:
 * 1. Set up a webhook in Sanity Studio:
 *    - Go to: https://www.sanity.io/manage
 *    - Select your project → API → Webhooks
 *    - Add webhook URL: https://your-domain.com/api/revalidate
 *    - Secret: Set REVALIDATE_SECRET in Vercel environment variables
 *    - Trigger on: Create, Update, Delete
 * 
 * 2. Add REVALIDATE_SECRET to your Vercel environment variables
 * 
 * Security: This endpoint requires a secret token to prevent unauthorized access
 */
export async function POST(request: NextRequest) {
  try {
    // Verify secret token
    const secret = request.headers.get('x-revalidate-secret')
    const expectedSecret = process.env.REVALIDATE_SECRET

    if (!expectedSecret) {
      console.error('REVALIDATE_SECRET is not set in environment variables')
      return NextResponse.json(
        { error: 'Revalidation not configured' },
        { status: 500 }
      )
    }

    if (secret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Invalid secret' },
        { status: 401 }
      )
    }

    // Parse webhook payload
    const body = await request.json()
    const { _type, _id } = body

    if (!_type) {
      return NextResponse.json(
        { error: 'Missing _type in payload' },
        { status: 400 }
      )
    }

    // Revalidate based on content type
    const locales = ['en', 'sorani', 'kurmanji'] // URL paths

    switch (_type) {
      case 'event':
        // Revalidate events pages for all locales
        for (const locale of locales) {
          revalidatePath(`/${locale}/events`)
        }
        // Also revalidate homepage (may show featured events)
        for (const locale of locales) {
          revalidatePath(`/${locale}`)
        }
        break

      case 'newsPost':
        // Revalidate homepage for all locales
        for (const locale of locales) {
          revalidatePath(`/${locale}`)
        }
        // If you have a news page, add it here:
        // revalidatePath(`/${locale}/news`)
        break

      case 'teamMember':
        // Revalidate about page for all locales
        for (const locale of locales) {
          revalidatePath(`/${locale}/about`)
        }
        break

      case 'resource':
        // Revalidate resources page for all locales
        for (const locale of locales) {
          revalidatePath(`/${locale}/resources`)
        }
        break

      default:
        // For unknown types, revalidate all pages
        for (const locale of locales) {
          revalidatePath(`/${locale}`, 'page')
          revalidatePath(`/${locale}/events`, 'page')
          revalidatePath(`/${locale}/about`, 'page')
          revalidatePath(`/${locale}/resources`, 'page')
        }
    }

    // Also revalidate sitemap
    revalidatePath('/sitemap.xml')

    return NextResponse.json({
      revalidated: true,
      type: _type,
      id: _id,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { error: 'Error revalidating', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// Allow GET for manual revalidation (with secret in production)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const path = searchParams.get('path')
  const secret = searchParams.get('secret')
  const expectedSecret = process.env.REVALIDATE_SECRET

  // In development, allow without secret
  // In production, require secret
  if (process.env.NODE_ENV === 'production') {
    if (!expectedSecret) {
      return NextResponse.json(
        { error: 'Revalidation not configured' },
        { status: 500 }
      )
    }
    if (secret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Invalid secret. Use ?secret=YOUR_SECRET&path=/en/events' },
        { status: 401 }
      )
    }
  }

  if (path) {
    revalidatePath(path)
    return NextResponse.json({
      revalidated: true,
      path,
      timestamp: new Date().toISOString(),
      message: 'Cache revalidated successfully',
    })
  }

  return NextResponse.json({
    message: 'Revalidation endpoint',
    usage: process.env.NODE_ENV === 'production'
      ? 'GET /api/revalidate?secret=YOUR_SECRET&path=/en/events'
      : 'GET /api/revalidate?path=/en/events',
    note: process.env.NODE_ENV === 'production'
      ? 'Requires secret token in production'
      : 'Available in development without secret',
  })
}

