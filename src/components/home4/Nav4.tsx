'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, ArrowRight, Phone } from 'lucide-react'
import ConceptSwitcher from '@/components/shared/ConceptSwitcher'
import { BRAND_LOGO } from '@/lib/fallbackImages'

/* eslint-disable @typescript-eslint/no-explicit-any */

const LEFT = [
  { label: 'Programs', href: '/programs' },
  { label: 'Departments', href: '/departments' },
  { label: 'Admissions', href: '/admissions' },
]
const RIGHT = [
  { label: 'Placements', href: '/placements' },
  { label: 'Research', href: '/departments' },
  { label: 'About', href: '/about' },
]

function NavLink({ label, href, onClick }: { label: string; href: string; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group relative px-1 py-1 text-sm font-medium text-royal-700 transition-colors hover:text-royal-900"
    >
      {label}
      <span className="absolute -bottom-0.5 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-heritage transition-transform duration-300 group-hover:scale-x-100" />
    </Link>
  )
}

export default function Nav4({ siteSettings }: { siteSettings: any }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobile, setMobile] = useState(false)
  const phone = siteSettings?.phone?.[0]?.number

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-[120]">
      {/* Slim announcement strip */}
      <div className="hidden bg-royal-950 text-white sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 px-6 py-2 text-xs">
          <span className="flex items-center gap-2 text-white/75">
            <span className="h-1.5 w-1.5 rotate-45 bg-heritage" aria-hidden="true" />
            Early-bird scholarships up to ₹20,000 · Admissions 2026 open
            <span className="h-1.5 w-1.5 rotate-45 bg-heritage" aria-hidden="true" />
          </span>
          <Link href="/admissions/apply" className="font-semibold text-heritage-light hover:text-heritage">
            Apply now →
          </Link>
        </div>
      </div>

      {/* Floating ivory glass navbar */}
      <div className="px-4 pt-3 sm:px-6">
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-heritage/30 px-4 py-2.5 ring-1 ring-black/5 backdrop-blur-xl transition-all duration-500 sm:px-6 ${
            scrolled ? 'bg-ivory/95 shadow-[0_14px_44px_-16px_rgba(59,50,138,0.35)]' : 'bg-ivory/80 shadow-lg'
          }`}
        >
          {/* Left nav */}
          <nav className="hidden flex-1 items-center gap-7 lg:flex" aria-label="Primary left">
            {LEFT.map((i) => <NavLink key={i.label} {...i} />)}
          </nav>

          {/* Center logo */}
          <Link href="/" className="flex shrink-0 items-center lg:px-6" aria-label="SITASRM home">
            <Image src={BRAND_LOGO} alt="SITASRM Engineering & Research Institute" width={240} height={78} priority className="h-11 w-auto object-contain sm:h-12" />
          </Link>

          {/* Right nav + CTA */}
          <div className="hidden flex-1 items-center justify-end gap-6 lg:flex" aria-label="Primary right">
            {RIGHT.map((i) => <NavLink key={i.label} {...i} />)}
            <ConceptSwitcher
              variant="light"
              triggerClassName="inline-flex items-center gap-1.5 rounded-full border border-royal-200 px-3 py-1.5 text-xs font-medium text-royal-600 transition-colors hover:border-heritage hover:text-royal-900"
            />
            <Link
              href="/admissions/apply"
              className="group inline-flex items-center gap-1.5 rounded-full bg-royal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-royal-600/20 ring-1 ring-heritage/40 transition-all hover:-translate-y-0.5 hover:bg-lotus hover:text-royal-950"
            >
              Apply 2026
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobile((v) => !v)} className="rounded-lg p-2 text-royal-700 lg:hidden" aria-label="Menu" aria-expanded={mobile}>
            {mobile ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile sheet */}
        {mobile && (
          <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-heritage/30 bg-ivory/95 p-4 ring-1 ring-black/5 backdrop-blur-xl lg:hidden">
            <nav className="flex flex-col gap-1">
              {[...LEFT, ...RIGHT].map((i) => (
                <Link key={i.label} href={i.href} onClick={() => setMobile(false)} className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-royal-700 hover:bg-royal-50 hover:text-royal-900">
                  {i.label}
                </Link>
              ))}
            </nav>
            <div className="mt-3 flex flex-col gap-3 border-t border-heritage/20 pt-3">
              {phone && (
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-2 px-3 text-sm text-royal-600">
                  <Phone className="h-4 w-4 text-heritage" aria-hidden="true" /> {phone}
                </a>
              )}
              <ConceptSwitcher variant="light" align="left" triggerClassName="inline-flex items-center gap-1.5 rounded-full border border-royal-200 px-3 py-2 text-sm text-royal-600" />
              <Link href="/admissions/apply" onClick={() => setMobile(false)} className="rounded-full bg-royal-600 px-5 py-3 text-center text-sm font-semibold text-white ring-1 ring-heritage/40">
                Apply 2026
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
