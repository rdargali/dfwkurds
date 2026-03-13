'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { getUrlPath, type Locale } from '@/i18n/config'

export function HeroSection() {
  const t = useTranslations('home.hero')
  const locale = useLocale() as Locale
  const urlPath = getUrlPath(locale)

  const welcomeText: Record<string, string> = {
    en: '',
    ckb: '',
    kmr: '',
  }

  return (
    <section className="relative min-h-[85vh] md:min-h-[80vh] flex items-center hero-dark overflow-hidden">
      {/* Animated Golden Sun Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] sun-glow rounded-full animate-glow-pulse pointer-events-none" />

      {/* Secondary glow for depth */}
      <div className="absolute top-1/3 end-1/4 w-[300px] h-[300px] sun-glow-subtle rounded-full pointer-events-none" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-pattern-grid opacity-[0.03] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col items-center text-center">
          {/* KACC Logo */}
          <div className="mb-8 animate-scale-in">
            <Image
              src="/kacc-logo.png"
              alt="Kurdish American Community Center"
              width={150}
              height={150}
              className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-2xl hover:scale-105 transition-transform bg-transparent"
              priority
            />
          </div>

          {/* Badge */}
          {/* Welcome text removed as requested */}

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 animate-slide-up">
            <span className="block text-white mb-2">{t('title')}</span>
            <span className="block text-gradient-gold">{t('subtitle')}</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl animate-slide-up delay-100">
            {t('description')}
          </p>

          {/* CTA Buttons - Larger touch targets */}
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-200">
            <Link href={`/${urlPath}/about`} className="btn btn-primary btn-touch text-lg">
              {t('cta')}
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link href={`/${urlPath}/events`} className="btn btn-outline btn-touch text-lg">
              {t('events_cta')}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  )
}
