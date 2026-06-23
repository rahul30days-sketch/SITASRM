'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type BannerType = 'info' | 'warning' | 'success' | 'urgent'

interface AnnouncementBannerProps {
  enabled: boolean
  message: string
  link?: string
  type?: BannerType
}

const DISMISS_KEY = 'seri-banner-dismissed'

const bannerStyles: Record<BannerType, string> = {
  info: 'bg-primary text-white',
  warning: 'bg-amber-500 text-white',
  success: 'bg-emerald-600 text-white',
  urgent: 'bg-accent text-white',
}

const bannerIcons: Record<BannerType, React.ReactNode> = {
  info: (
    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  success: (
    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  urgent: (
    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
}

export default function AnnouncementBanner({ enabled, message, link, type = 'info' }: AnnouncementBannerProps) {
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    if (!enabled || !message) return
    const stored = sessionStorage.getItem(DISMISS_KEY)
    if (stored === message) {
      setDismissed(true)
    } else {
      setDismissed(false)
    }
  }, [enabled, message])

  const handleDismiss = useCallback(() => {
    setDismissed(true)
    sessionStorage.setItem(DISMISS_KEY, message)
  }, [message])

  if (!enabled || !message || dismissed) return null

  const content = (
    <span className="flex items-center gap-2">
      {bannerIcons[type]}
      <span className="text-sm font-medium">{message}</span>
      {link && (
        <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      )}
    </span>
  )

  return (
    <div
      className={cn(
        'relative z-50 py-2.5 px-4',
        bannerStyles[type],
      )}
      role="alert"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-4">
        {link ? (
          <Link
            href={link}
            className="transition-opacity hover:opacity-80"
          >
            {content}
          </Link>
        ) : (
          content
        )}

        <button
          onClick={handleDismiss}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 transition-opacity hover:opacity-70 focus-visible:outline-offset-2"
          aria-label="Dismiss announcement"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
