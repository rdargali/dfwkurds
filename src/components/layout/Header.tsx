'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { getUrlPath, type Locale } from '@/i18n/config'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Header() {
  const t = useTranslations('navigation')
  const locale = useLocale() as Locale
  const urlPath = getUrlPath(locale)
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { href: `/${urlPath}`, label: t('home') },
    { href: `/${urlPath}/events`, label: t('events') },
    { href: `/${urlPath}/news`, label: t('news') },
    { href: `/${urlPath}/about`, label: t('about') },
    { href: `/${urlPath}/resources`, label: t('resources') },
  ]

  const isActive = (href: string) => {
    if (href === `/${urlPath}`) {
      return pathname === `/${urlPath}` || pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-40 bg-slate-900">
      {/* Kurdish Flag Stripe */}
      <div className="flag-stripe" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={`/${urlPath}`} className="flex items-center gap-3 group">
            {/* KACC Logo */}
            <Image
              src="/kacc-logo.png"
              alt="Kurdish American Community Center Logo"
              width={50}
              height={50}
              className="w-12 h-12 md:w-14 md:h-14 object-contain"
              priority
            />
            <div className="hidden sm:block">
              <p className="text-sm md:text-base font-semibold text-white leading-tight">
                {locale === 'ckb'
                  ? 'کۆمەڵەی کوردی'
                  : locale === 'kmr'
                    ? 'Komeleya Kurdan'
                    : 'Kurdish American'}
              </p>
              <p className="text-xs md:text-sm text-slate-400 leading-tight">
                {locale === 'ckb'
                  ? 'دالاس-فۆرت وێرس'
                  : locale === 'kmr'
                    ? 'Civaka DFW'
                    : 'DFW Community'}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  isActive(item.href)
                    ? 'text-kurd-gold bg-kurd-gold/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-1">
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'text-kurd-gold bg-kurd-gold/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
