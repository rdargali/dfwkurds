'use client'

import Link from 'next/link'
import { KurdishSunIcon } from '@/components/layout/KurdishSunIcon'

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-kurd-gold to-kurd-gold-dark flex items-center justify-center shadow-lg shadow-kurd-gold/20">
            <KurdishSunIcon className="w-14 h-14 text-slate-900" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-4">You&apos;re Offline</h1>

        <p className="text-lg text-slate-600 mb-8">
          It looks like you&apos;ve lost your internet connection. Don&apos;t worry, you can still
          browse previously visited pages.
        </p>

        <div className="space-y-4">
          <button onClick={() => window.location.reload()} className="btn btn-primary w-full">
            Try Again
          </button>

          <Link href="/" className="btn btn-outline w-full inline-block">
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
