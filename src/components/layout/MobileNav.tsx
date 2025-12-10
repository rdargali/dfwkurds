'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { getUrlPath, type Locale } from '@/i18n/config'

export function MobileNav() {
  const t = useTranslations('navigation')
  const locale = useLocale() as Locale
  const urlPath = getUrlPath(locale)
  const pathname = usePathname()

  const navItems = [
    {
      href: `/${urlPath}`,
      label: t('home'),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      href: `/${urlPath}/events`,
      label: t('events'),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      href: `/${urlPath}/about`,
      label: t('about'),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      href: `/${urlPath}/resources`,
      label: t('resources'),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
  ]

  const isActive = (href: string) => {
    if (href === `/${urlPath}`) {
      return pathname === `/${urlPath}` || pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50">
      {/* Kurdish Flag Stripe */}
      <div className="flag-stripe-thin" />

      <div className="bg-white/95 backdrop-blur-lg border-t border-slate-200 pb-safe">
        <div className="flex items-center justify-around h-16">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center gap-1 px-4 py-2 min-w-[4.5rem] rounded-lg transition-colors ${
                isActive(item.href) ? 'text-kurd-red' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span className={isActive(item.href) ? 'text-kurd-red' : ''}>{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
              {isActive(item.href) && (
                <span className="absolute -top-0.5 inset-x-3 h-0.5 bg-kurd-red rounded-full" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
