'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { languages, locales, getUrlPath, type Locale } from '@/i18n/config'

export function LanguageSwitcher() {
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const switchLocale = (newLocale: Locale) => {
    // Get the path without the locale prefix
    const segments = pathname.split('/')
    // Use SEO-friendly URL path instead of locale code
    segments[1] = getUrlPath(newLocale)
    const newPath = segments.join('/')
    router.push(newPath)
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentLanguage = languages[locale]
  const otherLocales = locales.filter(l => l !== locale)

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
          />
        </svg>
        <span className="hidden sm:inline">{currentLanguage.nativeName}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute end-0 mt-2 w-48 rounded-xl bg-slate-800 border border-white/10 shadow-xl overflow-hidden z-50">
          <div className="py-1">
            {/* Current language */}
            <div className="px-4 py-2 text-xs text-slate-400 uppercase tracking-wider">
              {locale === 'en' ? 'Current' : locale === 'ckb' ? 'ئێستا' : 'Niha'}
            </div>
            <div className="px-4 py-2.5 flex items-center gap-3 bg-white/5 text-white">
              <span className="text-base">{currentLanguage.flag}</span>
              <div>
                <p className="font-medium">{currentLanguage.nativeName}</p>
                <p className="text-xs text-slate-400">{currentLanguage.name}</p>
              </div>
              <svg
                className="w-4 h-4 ms-auto text-kurd-gold"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {/* Divider */}
            <div className="my-1 border-t border-white/10" />

            {/* Other languages */}
            <div className="px-4 py-2 text-xs text-slate-400 uppercase tracking-wider">
              {locale === 'en' ? 'Switch to' : locale === 'ckb' ? 'گۆڕین بۆ' : 'Biguherîne bo'}
            </div>
            {otherLocales.map(loc => {
              const lang = languages[loc]
              return (
                <button
                  key={loc}
                  onClick={() => switchLocale(loc)}
                  className="w-full px-4 py-2.5 flex items-center gap-3 text-slate-300 hover:bg-white/10 hover:text-white transition-colors text-start"
                >
                  <span className="text-base">{lang.flag}</span>
                  <div>
                    <p className="font-medium">{lang.nativeName}</p>
                    <p className="text-xs text-slate-400">{lang.name}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
