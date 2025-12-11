import type { Metadata } from 'next'
import { Outfit, Playfair_Display, Noto_Naskh_Arabic } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales, type Locale, getDirection, localeToUrlPath, urlPathToLocale } from '@/i18n/config'
import { setupLocale } from '@/lib/page-utils'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MobileNav } from '@/components/layout/MobileNav'
import { PWARegister } from '@/components/PWARegister'
import '../globals.css'

// Modern geometric sans-serif - clean and contemporary
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

// Elegant serif for accent headings
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

// High-quality Arabic script for Kurdish (Sorani)
const notoNaskh = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  variable: '--font-noto-arabic',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export function generateStaticParams() {
  // Generate static params using SEO-friendly URL paths
  return locales.map(locale => ({ locale: localeToUrlPath[locale] }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: localeParam } = await params

  // Map to internal locale code if it's a URL path
  const locale = urlPathToLocale[localeParam] || (localeParam as Locale)

  const titles: Record<string, string> = {
    en: 'Kurdish American Community Association of DFW',
    ckb: 'کۆمەڵەی ئەمریکی-کوردی لە دالاس-فۆرت وێرس',
    kmr: 'Komeleya Kurdan a Amerîkî ya Dallas-Fort Worth',
  }

  const descriptions: Record<string, string> = {
    en: 'Preserving Kurdish heritage and empowering the Kurdish community in the Dallas-Fort Worth area.',
    ckb: 'پاراستنی میراتی کوردی و بەهێزکردنی کۆمەڵگەی کوردی لە ناوچەی دالاس-فۆرت وێرس.',
    kmr: 'Parastina mîrasa Kurdî û hêzkirina civaka Kurdî li herêma Dallas-Fort Worth.',
  }

  return {
    title: {
      template: `%s | ${titles[locale] || titles.en}`,
      default: titles[locale] || titles.en,
    },
    description: descriptions[locale] || descriptions.en,
    keywords: [
      'Kurdish',
      'Kurdish American',
      'DFW',
      'Dallas',
      'Fort Worth',
      'Community',
      'کورد',
      'ئەمریکا',
      'Kurdistan',
    ],
    authors: [{ name: 'Kurdish American Community Association of DFW' }],
    openGraph: {
      type: 'website',
      locale: locale === 'ckb' ? 'ckb_IQ' : locale === 'kmr' ? 'ku_TR' : 'en_US',
      siteName: titles[locale] || titles.en,
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: 'https://dfwkurds.org', // Update with actual domain
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
    },
    manifest: '/manifest.json',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: 'DFW Kurds',
    },
    icons: {
      icon: '/icons/icon-192x192.png',
      apple: '/icons/icon-192x192.png',
    },
  }
}

export async function generateViewport() {
  return {
    themeColor: '#ED2024',
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const localeParam = (await params).locale

  // Validate locale - can be either a locale code (ckb, kmr, en) or SEO-friendly path (sorani, kurmanji, en)
  const isValidLocale = locales.includes(localeParam as Locale)
  const isValidUrlPath = urlPathToLocale[localeParam] !== undefined

  if (!isValidLocale && !isValidUrlPath) {
    notFound()
  }

  // Map to internal locale code if it's a URL path
  const locale = urlPathToLocale[localeParam] || (localeParam as Locale)

  // Enable static rendering
  await setupLocale(params)

  // Get the direction for this locale
  const direction = getDirection(locale as Locale)

  // Get messages for the locale
  const messages = await getMessages()

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ED2024" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DFW Kurds" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body
        className={`${outfit.variable} ${playfair.variable} ${notoNaskh.variable} min-h-screen flex flex-col antialiased bg-background text-foreground`}
      >
        <NextIntlClientProvider messages={messages}>
          {/* Skip to main content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:start-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-kurd-red focus:text-white focus:rounded-lg"
          >
            Skip to main content
          </a>

          {/* Header */}
          <Header />

          {/* Main content */}
          <main id="main-content" className="flex-1 pb-20 md:pb-0">
            {children}
          </main>

          {/* Footer */}
          <Footer />

          {/* Mobile bottom navigation */}
          <MobileNav />

          {/* PWA Service Worker Registration */}
          <PWARegister />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
