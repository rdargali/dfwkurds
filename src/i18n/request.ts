import { getRequestConfig } from 'next-intl/server'
import { locales, defaultLocale, urlPathToLocale, type Locale } from './config'

export default getRequestConfig(async ({ requestLocale }) => {
  // Get the locale from the request (could be SEO-friendly path like "sorani" or locale code like "ckb")
  let localePath = await requestLocale

  // Map SEO-friendly URL path to internal locale code
  let locale: Locale = defaultLocale
  if (localePath) {
    // Check if it's a URL path (sorani, kurmanji, etc.) and map to locale code
    if (urlPathToLocale[localePath]) {
      locale = urlPathToLocale[localePath]
    }
    // Or if it's already a valid locale code, use it directly
    else if (locales.includes(localePath as Locale)) {
      locale = localePath as Locale
    }
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
