'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, X, ArrowUpRight } from 'lucide-react'
import ConceptSwitcher from '@/components/shared/ConceptSwitcher'
import { mediaUrl } from '@/lib/homeData'

/* eslint-disable @typescript-eslint/no-explicit-any */

const NAV = [
  { label: 'Programs', href: '/programs' },
  { label: 'Departments', href: '/departments' },
  { label: 'Faculty', href: '/faculty' },
  { label: 'Campus', href: '/gallery' },
  { label: 'About', href: '/about' },
]

/**
 * Concept 2 — "Studio" navbar. A floating Apple/Linear glass pill, detached from
 * the top, centered. Light & airy: white/70 blur, thin border, soft shadow,
 * center menu, circular gradient "Apply" CTA. Mobile: compact pill + clean sheet.
 */
export default function Nav2({ siteSettings }: { siteSettings: any }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobile, setMobile] = useState(false)
  const logo = mediaUrl(siteSettings?.logo)
  const name = siteSettings?.siteName || 'SERI'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobile])

  return (
    <header className="fixed inset-x-0 top-4 z-[120] px-4">
      <div
        className={`mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-full border border-black/5 px-3 py-2.5 pl-5 transition-all duration-500 sm:gap-4 ${
          scrolled
            ? 'bg-white/80 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.18)] backdrop-blur-2xl'
            : 'bg-white/60 shadow-[0_8px_30px_-16px_rgba(0,0,0,0.12)] backdrop-blur-xl'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label={`${name} home`}>
          {logo ? (
            <Image
              src={logo}
              alt={name}
              width={120}
              height={36}
              className="h-8 w-auto object-contain"
            />
          ) : (
            <span className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400 text-sm font-bold text-white">
                S
              </span>
              <span className="font-modern text-base font-bold tracking-tight text-neutral-900">SERI</span>
            </span>
          )}
        </Link>

        {/* Center menu */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full px-3.5 py-1.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-black/[0.04] hover:text-neutral-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/search"
            aria-label="Search"
            className="hidden h-9 w-9 place-items-center rounded-full text-neutral-500 transition-colors hover:bg-black/[0.04] hover:text-neutral-900 sm:grid"
          >
            <Search className="h-[18px] w-[18px]" aria-hidden="true" />
          </Link>

          <div className="hidden lg:block">
            <ConceptSwitcher
              variant="glass"
              triggerClassName="inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-white/50 px-3 py-2 text-xs font-medium text-neutral-700 transition-colors hover:bg-white"
            />
          </div>

          {/* Circular gradient CTA */}
          <Link
            href="/admissions/apply"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 py-2 pl-4 pr-2 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(59,130,246,0.7)] transition-all hover:shadow-[0_10px_28px_-6px_rgba(59,130,246,0.85)]"
          >
            <span className="hidden sm:inline">Apply</span>
            <span className="grid h-7 w-7 place-items-center rounded-full bg-white/20 transition-transform group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>

          <button
            onClick={() => setMobile((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full text-neutral-700 transition-colors hover:bg-black/[0.04] lg:hidden"
            aria-label="Menu"
            aria-expanded={mobile}
          >
            {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mx-auto mt-3 max-w-5xl rounded-3xl border border-black/5 bg-white/90 p-4 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.3)] backdrop-blur-2xl lg:hidden"
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {NAV.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobile(false)}
                  className="font-modern rounded-2xl px-4 py-3 text-lg font-medium text-neutral-800 transition-colors hover:bg-black/[0.04]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-3 flex flex-col gap-3 border-t border-black/5 pt-4">
              <ConceptSwitcher
                variant="glass"
                align="left"
                triggerClassName="inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-white px-3.5 py-2.5 text-sm font-medium text-neutral-700"
              />
              <Link
                href="/admissions/apply"
                onClick={() => setMobile(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-white"
              >
                Apply Now
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
