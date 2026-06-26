'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Menu, X, Phone, ArrowRight } from 'lucide-react'
import ConceptSwitcher from '@/components/shared/ConceptSwitcher'
import { WHITE_LOGO } from '@/lib/fallbackImages'

/* eslint-disable @typescript-eslint/no-explicit-any */

const NAV = [
  { label: 'Academics', href: '/programs', mega: true },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Research', href: '/departments' },
  { label: 'Campus Life', href: '/gallery' },
  { label: 'About', href: '/about' },
]

export default function Nav1({ siteSettings, programs }: { siteSettings: any; programs: any[] }) {
  const [scrolled, setScrolled] = useState(false)
  const [mega, setMega] = useState(false)
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = scrolled || mobile
  const byCat = (c: string) => programs?.filter((p) => p.category === c).slice(0, 5) || []

  return (
    <header className="fixed inset-x-0 top-0 z-[120]">
      {/* Utility bar — collapses on scroll */}
      <div
        className={`overflow-hidden border-b transition-all duration-500 ${
          solid ? 'max-h-0 border-transparent' : 'max-h-12 border-white/15'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2.5 text-xs text-white/80 lg:px-10">
          <span className="hidden items-center gap-2 sm:flex">
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            {siteSettings?.phone?.[0]?.number || '+91 92898 96157'}
          </span>
          <div className="flex items-center gap-5">
            <Link href="/downloads" className="hover:text-white">Prospectus</Link>
            <Link href="/contact" className="hover:text-white">Visit Us</Link>
            <Link href="/admissions" className="hover:text-white">International</Link>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`transition-all duration-500 ${
          solid ? 'bg-[#0b1f3a] shadow-[0_8px_40px_rgba(0,0,0,0.25)]' : 'bg-transparent'
        }`}
        onMouseLeave={() => setMega(false)}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3" aria-label="SERI home">
            <Image
              src={WHITE_LOGO}
              alt="SITASRM Engineering & Research Institute"
              width={250}
              height={80}
              priority
              className="h-11 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV.map((item) => (
              <div key={item.label} onMouseEnter={() => setMega(!!item.mega)}>
                <Link
                  href={item.href}
                  className="font-serif-display relative px-4 py-2 text-[15px] font-medium tracking-wide text-white/90 transition-colors hover:text-white"
                >
                  {item.label}
                  <span className="absolute inset-x-4 -bottom-0.5 h-px scale-x-0 bg-amber-300 transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              </div>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button aria-label="Search" className="hidden rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white lg:block">
              <Search className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="hidden lg:block">
              <ConceptSwitcher variant="dark" triggerClassName="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-2 text-xs font-medium text-white/85 hover:bg-white/10" />
            </div>
            <Link
              href="/admissions/apply"
              className="hidden items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-[#0b1f3a] shadow-lg shadow-amber-400/20 transition-all hover:bg-amber-300 lg:inline-flex"
            >
              Apply Now
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <button onClick={() => setMobile((v) => !v)} className="rounded-md p-2 text-white lg:hidden" aria-label="Menu" aria-expanded={mobile}>
              {mobile ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mega menu */}
        <div
          className={`absolute inset-x-0 top-full hidden origin-top border-t border-white/10 bg-[#0b1f3a] transition-all duration-300 lg:block ${
            mega ? 'visible opacity-100' : 'invisible -translate-y-2 opacity-0'
          }`}
          onMouseEnter={() => setMega(true)}
        >
          <div className="mx-auto grid max-w-7xl grid-cols-4 gap-8 px-10 py-10">
            {[
              { t: 'Undergraduate', cat: 'undergraduate' },
              { t: 'Postgraduate', cat: 'postgraduate' },
              { t: 'Diploma & More', cat: 'diploma' },
            ].map((col) => (
              <div key={col.cat}>
                <p className="font-serif-display mb-4 text-sm font-semibold uppercase tracking-widest text-amber-300">{col.t}</p>
                <ul className="space-y-2.5">
                  {(byCat(col.cat).length ? byCat(col.cat) : [{ id: col.cat, name: 'View programs', slug: '' }]).map((p) => (
                    <li key={p.id}>
                      <Link href={p.slug ? `/programs/${p.slug}` : '/programs'} className="text-[15px] text-white/70 transition-colors hover:text-white" onClick={() => setMega(false)}>
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="rounded-2xl bg-white/5 p-6">
              <p className="font-serif-display text-lg font-semibold text-white">Why SITASRM</p>
              <p className="mt-2 text-sm text-white/60">AICTE-approved, NAAC A+ accredited, 95% placements and globally connected faculty.</p>
              <Link href="/about" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-300" onClick={() => setMega(false)}>
                Discover our story <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobile && (
        <div className="border-t border-white/10 bg-[#0b1f3a] px-6 py-5 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setMobile(false)} className="font-serif-display rounded-lg px-3 py-3 text-lg text-white/90 hover:bg-white/5">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-3">
            <ConceptSwitcher variant="dark" align="left" triggerClassName="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-2 text-sm text-white/85" />
            <Link href="/admissions/apply" onClick={() => setMobile(false)} className="rounded-full bg-amber-400 px-5 py-3 text-center text-sm font-semibold text-[#0b1f3a]">
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
