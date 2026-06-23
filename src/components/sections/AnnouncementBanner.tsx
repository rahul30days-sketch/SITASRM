'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'seri-announce-dismissed'

const MESSAGE =
  '🎓 Admissions Open 2025-26 · Apply Before March 31 · ₹2 Lakh Merit Scholarship Available · Call: 98765 43210'

interface AnnouncementBannerProps {
  className?: string
}

export default function AnnouncementBanner({
  className,
}: AnnouncementBannerProps) {
  // Start hidden until we've confirmed it wasn't previously dismissed, to avoid
  // a flash of the banner on remount within the same session.
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(STORAGE_KEY) === 'true')
    } catch {
      // sessionStorage unavailable (e.g. privacy mode) — show the banner.
      setDismissed(false)
    }
  }, [])

  function handleDismiss() {
    setDismissed(true)
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true')
    } catch {
      // Ignore persistence failures.
    }
  }

  if (dismissed) return null

  return (
    <aside
      role="region"
      aria-label="Site announcement"
      className={cn(
        // Sits directly below the fixed 72px header, sticking just under it on scroll
        'sticky top-[72px] z-30 flex items-center gap-2 overflow-hidden bg-gold text-navy shadow-sm',
        className,
      )}
    >
      {/* Marquee track — duplicated for a seamless loop */}
      <div className="flex min-w-0 flex-1 overflow-hidden py-2">
        <div className="flex w-max animate-marquee whitespace-nowrap will-change-transform">
          {[0, 1].map((dup) => (
            <span
              key={dup}
              aria-hidden={dup === 1 ? 'true' : undefined}
              className="px-8 text-xs font-semibold tracking-wide sm:text-sm"
            >
              {MESSAGE}
            </span>
          ))}
        </div>
      </div>

      {/* Close button */}
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss announcement"
        className={cn(
          'mr-2 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full',
          'text-navy/70 transition-colors duration-200 hover:bg-navy/10 hover:text-navy',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-1 focus-visible:ring-offset-gold',
        )}
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </aside>
  )
}
