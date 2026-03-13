import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { getLocaleFromParams, setupLocale } from '@/lib/page-utils'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const locale = await getLocaleFromParams(params)
  const t = await getTranslations({ locale, namespace: 'social' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function SocialPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await setupLocale(params)
  const t = await getTranslations({ locale, namespace: 'social' })

  return (
    <div className="flex flex-col">
      {/* Page header */}
      <div className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>
      </div>

      {/* Social Media Feeds */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Facebook Feed */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-slate-100">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                {t('facebook.title')}
              </h2>
              <p className="text-slate-600">
                {t('facebook.subtitle')}
              </p>
            </div>

            {/* Facebook Page Plugin */}
            <div className="flex justify-center">
              <div
                className="fb-page"
                data-href="https://www.facebook.com/kurdishamericancommunitycenter"
                data-tabs="timeline"
                data-width="500"
                data-height="600"
                data-small-header="false"
                data-adapt-container-width="true"
                data-hide-cover="false"
                data-show-facepile="true"
              ></div>
            </div>
          </div>

          {/* Instagram Feed */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-slate-100">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                {t('instagram.title')}
              </h2>
              <p className="text-slate-600">
                {t('instagram.subtitle')}
              </p>
            </div>

            {/* Instagram Embed */}
            <div className="flex justify-center">
              <div className="max-w-md">
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink="https://www.instagram.com/kurdishamericancc/"
                  data-instgrm-version="14"
                  style={{
                    maxWidth: '500px',
                    width: '100%',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: 'none'
                  }}
                >
                  <div style={{ padding: '16px' }}>
                    <a
                      href="https://www.instagram.com/kurdishamericancc/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: '#FFFFFF',
                        lineHeight: '0',
                        padding: '0 0',
                        textAlign: 'center',
                        textDecoration: 'none',
                        width: '100%',
                        display: 'block',
                        color: '#000'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <div style={{
                          backgroundColor: '#F56040',
                          borderRadius: '50%',
                          height: '40px',
                          width: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: '14px'
                        }}>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="white"
                          >
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        </div>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          flexGrow: 1,
                          justifyContent: 'center'
                        }}>
                          <div style={{
                            backgroundColor: '#F4F4F4',
                            borderRadius: '4px',
                            flexGrow: 0,
                            height: '14px',
                            marginBottom: '6px',
                            width: '100px'
                          }} />
                          <div style={{
                            backgroundColor: '#F4F4F4',
                            borderRadius: '4px',
                            flexGrow: 0,
                            height: '14px',
                            width: '60px'
                          }} />
                        </div>
                      </div>
                      <div style={{
                        padding: '19% 0'
                      }} />
                      <div style={{
                        display: 'block',
                        height: '50px',
                        width: '50px'
                      }}>
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="0 0 24 24"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <polygon points="0 0 24 0 24 24 0 24" />
                            <path d="M12,2 C13.1,2 14,2.9 14,4 C14,5.1 13.1,6 12,6 C10.9,6 10,5.1 10,4 C10,2.9 10.9,2 12,2 Z M21,9 L21,7 L15,7 L15,9 L21,9 Z M21,13 L21,11 L8,11 L8,13 L21,13 Z M21,17 L21,15 L8,15 L8,17 L21,17 Z" fill="#000000" fillRule="nonzero" />
                          </g>
                        </svg>
                      </div>
                    </a>
                  </div>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Facebook SDK Script */}
      <script
        async
        defer
        crossOrigin="anonymous"
        src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0"
        nonce="facebook-jssdk"
      ></script>

      {/* Instagram SDK Script */}
      <script async src="https://www.instagram.com/embed.js"></script>
    </div>
  )
}