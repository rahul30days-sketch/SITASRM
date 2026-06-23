'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import type { NavItem, CTAButton } from '@/types'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  navItems: NavItem[]
  ctaButton?: CTAButton
}

export default function MobileNav({ isOpen, onClose, navItems, ctaButton }: MobileNavProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const drawerRef = useRef<HTMLDivElement>(null)

  const toggleExpanded = useCallback((label: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev)
      if (next.has(label)) {
        next.delete(label)
      } else {
        next.add(label)
      }
      return next
    })
  }, [])

  // Close on route change
  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  // Trap focus within the drawer when open
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    // Prevent body scroll
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out drawer */}
      <div
        ref={drawerRef}
        className={cn(
          'fixed right-0 top-0 z-50 flex h-full w-80 max-w-[85vw] flex-col bg-white shadow-elevated transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Header with close button */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <span className="font-display text-lg font-bold text-primary">SERI</span>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-text-muted transition-colors hover:bg-surface hover:text-text"
            aria-label="Close navigation menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.children && item.children.length > 0 ? (
                  <div>
                    {/* Parent item with toggle */}
                    <button
                      onClick={() => toggleExpanded(item.label)}
                      className={cn(
                        'flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-[15px] font-medium transition-colors',
                        isActive(item.href)
                          ? 'bg-primary-50 text-primary'
                          : 'text-text hover:bg-surface hover:text-primary',
                      )}
                      aria-expanded={expandedItems.has(item.label)}
                    >
                      <span>{item.label}</span>
                      <svg
                        className={cn(
                          'h-4 w-4 shrink-0 transition-transform duration-200',
                          expandedItems.has(item.label) && 'rotate-180',
                        )}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Expandable child items */}
                    <div
                      className={cn(
                        'overflow-hidden transition-all duration-200',
                        expandedItems.has(item.label) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
                      )}
                    >
                      <ul className="ml-3 mt-1 space-y-0.5 border-l-2 border-primary-100 pl-3">
                        {item.children.filter((child) => child.href).map((child, ci) => (
                          <li key={`${child.href}-${ci}`}>
                            <Link
                              href={child.href}
                              className={cn(
                                'block rounded-md px-3 py-2 text-sm transition-colors',
                                isActive(child.href)
                                  ? 'bg-primary-50 font-medium text-primary'
                                  : 'text-text-muted hover:bg-surface hover:text-text',
                              )}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'block rounded-md px-3 py-2.5 text-[15px] font-medium transition-colors',
                      isActive(item.href)
                        ? 'bg-primary-50 text-primary'
                        : 'text-text hover:bg-surface hover:text-primary',
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA at bottom */}
        {ctaButton?.href && (
          <div className="border-t border-border p-4">
            <Link
              href={ctaButton.href}
              className="block w-full rounded-md bg-accent py-3 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-dark focus-visible:outline-offset-2"
            >
              {ctaButton.label}
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
