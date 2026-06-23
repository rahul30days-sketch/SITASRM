'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import type { NavItem, CTAButton } from '@/types'
import MobileNav from './MobileNav'

interface HeaderClientProps {
  navItems: NavItem[]
  ctaButton?: CTAButton
  transparent?: boolean
  /** Logo image URL (from CMS Site Settings, falls back to the bundled logo). */
  logoUrl?: string
}

export default function HeaderClient({ navItems, ctaButton, transparent = false, logoUrl }: HeaderClientProps) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Track scroll position to switch between transparent and solid
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    handleScroll() // check initial position
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = () => setOpenDropdown(null)
    if (openDropdown) {
      document.addEventListener('click', handleClick)
      return () => document.removeEventListener('click', handleClick)
    }
  }, [openDropdown])

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  const handleDropdownEnter = useCallback((label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
      dropdownTimeoutRef.current = null
    }
    setOpenDropdown(label)
  }, [])

  const handleDropdownLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null)
    }, 150)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const isTransparent = transparent && !scrolled

  return (
    <>
      <header
        className={cn(
          'fixed left-0 right-0 top-0 z-40 transition-all duration-300',
          isTransparent
            ? 'bg-transparent'
            : 'bg-white/95 shadow-sm backdrop-blur-md',
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="relative z-10 flex items-center gap-2" aria-label="SERI home">
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoUrl}
                alt="SITASRM Engineering & Research Institute"
                className="h-11 w-auto sm:h-12"
              />
            ) : (
              <span
                className={cn(
                  'font-display text-2xl font-bold tracking-tight transition-colors',
                  isTransparent ? 'text-white' : 'text-primary',
                )}
              >
                SERI
              </span>
            )}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex lg:items-center lg:gap-1" aria-label="Main navigation">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.children && item.children.length > 0
                    ? handleDropdownEnter(item.label)
                    : undefined
                }
                onMouseLeave={() =>
                  item.children && item.children.length > 0
                    ? handleDropdownLeave()
                    : undefined
                }
              >
                {item.children && item.children.length > 0 ? (
                  <>
                    {/* Nav item with dropdown */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setOpenDropdown(openDropdown === item.label ? null : item.label)
                      }}
                      className={cn(
                        'flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                        isActive(item.href)
                          ? isTransparent
                            ? 'text-secondary'
                            : 'text-primary'
                          : isTransparent
                            ? 'text-white/90 hover:text-white'
                            : 'text-text-muted hover:text-primary',
                      )}
                      aria-expanded={openDropdown === item.label}
                      aria-haspopup="true"
                    >
                      <span>{item.label}</span>
                      <svg
                        className={cn(
                          'h-3.5 w-3.5 transition-transform duration-200',
                          openDropdown === item.label && 'rotate-180',
                        )}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown panel */}
                    <div
                      className={cn(
                        'absolute left-0 top-full z-50 w-56 pt-2 transition-all duration-200',
                        openDropdown === item.label
                          ? 'visible translate-y-0 opacity-100'
                          : 'invisible -translate-y-1 opacity-0',
                      )}
                    >
                      <div className="overflow-hidden rounded-md border border-border bg-white py-2 shadow-elevated">
                        {item.children.filter((child) => child.href).map((child, ci) => (
                          <Link
                            key={`${child.href}-${ci}`}
                            href={child.href}
                            className={cn(
                              'block px-4 py-2.5 text-sm transition-colors',
                              isActive(child.href)
                                ? 'bg-primary-50 font-medium text-primary'
                                : 'text-text hover:bg-surface hover:text-primary',
                            )}
                            onClick={() => setOpenDropdown(null)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      isActive(item.href)
                        ? isTransparent
                          ? 'text-secondary'
                          : 'text-primary'
                        : isTransparent
                          ? 'text-white/90 hover:text-white'
                          : 'text-text-muted hover:text-primary',
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right side: CTA + hamburger */}
          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            {ctaButton?.href && (
              <Link
                href={ctaButton.href}
                className="hidden rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-accent-dark hover:shadow-md focus-visible:outline-offset-2 lg:inline-flex"
              >
                {ctaButton.label}
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className={cn(
                'relative z-10 rounded-md p-2 transition-colors lg:hidden',
                isTransparent
                  ? 'text-white hover:bg-white/10'
                  : 'text-text hover:bg-surface',
              )}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <MobileNav
        isOpen={mobileOpen}
        onClose={closeMobile}
        navItems={navItems}
        ctaButton={ctaButton}
      />

      {/* Spacer to push content below fixed header (only when header is solid) */}
      {!transparent && <div className="h-[72px]" aria-hidden="true" />}
    </>
  )
}
