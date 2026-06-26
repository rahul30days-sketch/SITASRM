'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Phone, Mail } from 'lucide-react'
import ConceptSwitcher from '@/components/shared/ConceptSwitcher'
import { WHITE_LOGO } from '@/lib/fallbackImages'

/* eslint-disable @typescript-eslint/no-explicit-any */

const MENU = [
  { label: 'Programs', href: '/programs', meta: 'Academics' },
  { label: 'Research', href: '/departments', meta: 'Centres & labs' },
  { label: 'Admissions', href: '/admissions', meta: 'Apply 2026' },
  { label: 'Campus Life', href: '/gallery', meta: 'Experience' },
  { label: 'Events', href: '/events', meta: "What's on" },
  { label: 'About', href: '/about', meta: 'The institute' },
]

const SECONDARY = [
  { label: 'Faculty', href: '/faculty' },
  { label: 'News', href: '/news' },
  { label: 'Downloads', href: '/downloads' },
  { label: 'Contact', href: '/contact' },
]

export default function Nav3({ siteSettings }: { siteSettings: any }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const phone = siteSettings?.phone?.[0]?.number
  const email = siteSettings?.email?.[0]?.address
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock scroll + Escape-to-close + initial focus while the overlay is open.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    const t = window.setTimeout(() => closeRef.current?.focus(), 60)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
      window.clearTimeout(t)
    }
  }, [open])

  const Wordmark = (
    <Link href="/" className="group flex items-center gap-3" aria-label="SERI home" onClick={() => setOpen(false)}>
      <Image
        src={WHITE_LOGO}
        alt="SITASRM Engineering & Research Institute"
        width={250}
        height={80}
        priority
        className="h-10 w-auto object-contain"
      />
    </Link>
  )

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[120]">
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? 'glass-dark border-b border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.5)]'
              : 'border-b border-transparent bg-gradient-to-b from-black/60 to-transparent'
          }`}
        >
          <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-6 lg:px-12">
            {Wordmark}

            {/* Inline quick links — desktop */}
            <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
              {MENU.slice(0, 4).map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group relative font-lux text-[15px] font-semibold uppercase tracking-wide text-white/75 transition-colors hover:text-white"
                >
                  {item.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-amber-300 to-amber-500 transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3 sm:gap-4">
              <div className="hidden lg:block">
                <ConceptSwitcher
                  variant="dark"
                  triggerClassName="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-2 text-xs font-medium uppercase tracking-wide text-white/80 transition-colors hover:border-amber-300/60 hover:text-white"
                />
              </div>
              <Link
                href="/admissions/apply"
                className="hidden items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-neutral-950 shadow-glow-soft transition-all hover:-translate-y-0.5 hover:bg-amber-300 sm:inline-flex"
              >
                Apply
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              {/* Menu trigger */}
              <button
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                aria-haspopup="dialog"
                className="group flex items-center gap-3 rounded-full border border-white/15 py-2 pl-4 pr-2 text-white transition-colors hover:border-amber-300/60"
              >
                <span className="font-lux text-sm font-semibold uppercase tracking-widest">Menu</span>
                <span className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] rounded-full bg-white/5 transition-colors group-hover:bg-amber-400/15">
                  <span className="block h-px w-4 bg-white transition-all group-hover:w-5 group-hover:bg-amber-300" />
                  <span className="block h-px w-4 bg-white transition-all group-hover:w-3 group-hover:bg-amber-300" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen off-canvas overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[200] overflow-y-auto bg-neutral-950"
          >
            {/* Decorative glows + texture */}
            <div className="pointer-events-none absolute inset-0 bg-grid-lines opacity-[0.5]" aria-hidden="true" />
            <div className="pointer-events-none absolute -right-40 top-0 h-[36rem] w-[36rem] rounded-full bg-amber-500/10 blur-[140px]" aria-hidden="true" />
            <div className="pointer-events-none absolute -left-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-amber-400/[0.07] blur-[120px]" aria-hidden="true" />

            <div className="relative mx-auto flex min-h-full max-w-[1500px] flex-col px-6 lg:px-12">
              {/* Overlay top bar */}
              <div className="flex h-20 shrink-0 items-center justify-between">
                {Wordmark}
                <button
                  ref={closeRef}
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="group flex items-center gap-3 rounded-full border border-white/15 py-2 pl-4 pr-2 text-white transition-colors hover:border-amber-300/60"
                >
                  <span className="font-lux text-sm font-semibold uppercase tracking-widest">Close</span>
                  <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-amber-400/15">
                    <span className="absolute h-px w-4 rotate-45 bg-white transition-colors group-hover:bg-amber-300" />
                    <span className="absolute h-px w-4 -rotate-45 bg-white transition-colors group-hover:bg-amber-300" />
                  </span>
                </button>
              </div>

              <div className="grid flex-1 grid-cols-1 gap-12 py-10 lg:grid-cols-12 lg:gap-16 lg:py-16">
                {/* Big animated links */}
                <nav className="lg:col-span-8" aria-label="Menu">
                  <ul className="flex flex-col">
                    {MENU.map((item, i) => (
                      <motion.li
                        key={item.label}
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        transition={{ duration: 0.5, delay: 0.08 + i * 0.06, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="border-b border-white/10"
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="group flex items-baseline justify-between gap-6 py-4 lg:py-5"
                        >
                          <span className="flex items-baseline gap-4">
                            <span className="font-lux text-xs font-semibold tabular-nums text-amber-300/70">0{i + 1}</span>
                            <span className="font-lux text-4xl font-extrabold uppercase leading-none tracking-tight text-white/85 transition-all duration-300 group-hover:translate-x-2 group-hover:text-amber-300 sm:text-5xl lg:text-6xl">
                              {item.label}
                            </span>
                          </span>
                          <span className="hidden shrink-0 self-center text-xs uppercase tracking-widest text-white/35 transition-colors group-hover:text-white/70 sm:block">
                            {item.meta}
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="mt-8 flex flex-wrap gap-x-8 gap-y-3"
                  >
                    {SECONDARY.map((s) => (
                      <Link
                        key={s.label}
                        href={s.href}
                        onClick={() => setOpen(false)}
                        className="text-sm font-medium uppercase tracking-wide text-white/50 transition-colors hover:text-amber-300"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </motion.div>
                </nav>

                {/* Side rail — CTA, contact, switcher */}
                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                  className="flex flex-col justify-between gap-10 lg:col-span-4"
                >
                  <div className="glass-dark rounded-3xl p-7">
                    <p className="font-lux text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">Admissions 2026</p>
                    <p className="mt-3 text-lg leading-relaxed text-white/75">
                      Applications are open. Secure your place at SERI and engineer the future.
                    </p>
                    <Link
                      href="/admissions/apply"
                      onClick={() => setOpen(false)}
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-neutral-950 transition-all hover:-translate-y-0.5 hover:bg-amber-300"
                    >
                      Begin application
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {phone && (
                      <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-white/70 transition-colors hover:text-white">
                        <Phone className="h-4 w-4 text-amber-300" aria-hidden="true" />
                        <span className="text-sm">{phone}</span>
                      </a>
                    )}
                    {email && (
                      <a href={`mailto:${email}`} className="flex items-center gap-3 text-white/70 transition-colors hover:text-white">
                        <Mail className="h-4 w-4 text-amber-300" aria-hidden="true" />
                        <span className="break-all text-sm">{email}</span>
                      </a>
                    )}
                    <div className="pt-2">
                      <ConceptSwitcher
                        variant="dark"
                        align="left"
                        triggerClassName="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-2 text-xs font-medium uppercase tracking-wide text-white/80 hover:border-amber-300/60 hover:text-white"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
