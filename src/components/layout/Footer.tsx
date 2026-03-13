'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { getUrlPath, type Locale } from '@/i18n/config'

export function Footer() {
  const t = useTranslations()
  const locale = useLocale() as Locale
  const urlPath = getUrlPath(locale)
  const year = new Date().getFullYear()

  return (
    <footer className="hidden md:block bg-slate-900 text-white mt-auto">
      {/* Kurdish Flag Stripe */}
      <div className="flag-stripe" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              {/* Logo */}
              <Image
                src="/kacc-logo.png"
                alt="Kurdish American Community Center"
                width={48}
                height={48}
                className="w-12 h-12 object-contain bg-transparent"
              />
              <div>
                <p className="font-semibold text-white">
                  {locale === 'ckb'
                    ? 'کۆمەڵەی کوردی'
                    : locale === 'kmr'
                      ? 'Komeleya Kurdan'
                      : 'Kurdish American Community Center'}
                </p>
                {/* Removed 'North Texas' as requested */}
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {locale === 'ckb'
                ? 'پاراستنی میراتی کوردی و بەهێزکردنی کۆمەڵگەی کوردی لە ناوچەی دالاس-فۆرت وێرس.'
                : locale === 'kmr'
                  ? 'Parastina mîrasa Kurdî û hêzkirina civaka Kurdî li herêma Dallas-Fort Worth.'
                  : 'Preserving Kurdish heritage and empowering the Kurdish community in the Dallas-Fort Worth area.'}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-kurd-gold mb-5">{t('footer.contact.title')}</h3>
            <ul className="space-y-4">
                                          <li className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-kurd-green/10 flex items-center justify-center shrink-0">
                                              <svg
                                                className="w-4 h-4 text-kurd-green"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                              >
                                                <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  strokeWidth={2}
                                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                />
                                              </svg>
                                            </div>
                                            <a
                                              href="tel:4694937094"
                                              className="text-sm text-slate-400 hover:text-white transition-colors"
                                            >
                                              (469) 493-7094
                                            </a>
                                          </li>
                            <li className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-lg bg-kurd-gold/10 flex items-center justify-center shrink-0">
                                <svg
                                  className="w-4 h-4 text-kurd-gold"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 9V2H7v7M7 9v13h10V9M7 9h10"
                                  />
                                </svg>
                              </div>
                              <span className="text-sm text-slate-400">1059 South Sherman Street Suite 105, Richardson, TX, United States, 75081</span>
                            </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-kurd-red/10 flex items-center justify-center shrink-0">
                  <svg
                    className="w-4 h-4 text-kurd-red"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <a
                  href="mailto:kurd.kacc@gmail.com"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  kurd.kacc@gmail.com
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-slate-300 mb-3">
                {t('footer.social.title')}
              </h4>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/kurdishamericancommunitycenter"
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-kurd-red/20 flex items-center justify-center transition-colors group"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-5 h-5 text-slate-400 group-hover:text-kurd-red transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/kurdishamericancc/"
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-kurd-green/20 flex items-center justify-center transition-colors group"
                  aria-label="Instagram"
                >
                  <svg
                    className="w-5 h-5 text-slate-400 group-hover:text-kurd-green transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-sm text-slate-500 text-center">{t('footer.copyright', { year })}</p>
        </div>
      </div>
    </footer>
  )
}
