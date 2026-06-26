'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, ArrowRight, ChevronDown } from 'lucide-react'
import { mediaUrl } from '@/lib/homeData'
import { HERO_IMAGES } from '@/lib/fallbackImages'

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function Hero1({ siteSettings, gallery, placement }: { siteSettings: any; gallery: any[]; placement: any }) {
  const campus =
    mediaUrl(siteSettings?.hero?.backgroundImage) ||
    mediaUrl(gallery?.find((g) => g?.category === 'campus')?.images?.[0]?.image) ||
    HERO_IMAGES.campus

  const year = new Date().getFullYear()
  const est = siteSettings?.stats?.establishedYear
  const stats = [
    { v: est ? `${year - est}+` : '15+', l: 'Years of excellence' },
    { v: `${siteSettings?.stats?.placementPercent ?? 95}%`, l: 'Placement rate' },
    { v: placement?.recruitersCount ? `${placement.recruitersCount}+` : '120+', l: 'Global recruiters' },
    { v: 'A+', l: 'NAAC accredited' },
  ]

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[#0b1f3a]">
      {/* Full-bleed campus image */}
      <Image src={campus} alt="SITASRM campus" fill priority sizes="100vw" className="object-cover" />
      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f3a] via-[#0b1f3a]/55 to-[#0b1f3a]/70" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b1f3a]/80 via-transparent to-transparent" aria-hidden="true" />

      {/* Content (lower-left) */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-40 lg:px-10 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 border-l-2 border-amber-400 pl-3 text-sm font-medium uppercase tracking-[0.2em] text-amber-300">
            Est. {est || 2008} · Bahadurgarh, Haryana
          </span>
          <h1 className="font-serif-display mt-6 text-[2.75rem] font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Where ambition meets
            <span className="block italic text-amber-300">academic excellence</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            A premier engineering &amp; research institute shaping the engineers, innovators and leaders
            of tomorrow — with world-class faculty and industry-defining outcomes.
          </p>

          {/* Search programs */}
          <form action="/search" method="get" className="mt-9 flex max-w-lg overflow-hidden rounded-full bg-white/95 p-1.5 shadow-2xl backdrop-blur">
            <span className="flex items-center pl-4 text-neutral-400">
              <Search className="h-5 w-5" aria-hidden="true" />
            </span>
            <input
              type="text"
              name="q"
              placeholder="Search programs, e.g. Computer Science…"
              aria-label="Search programs"
              className="flex-1 bg-transparent px-3 text-[15px] text-neutral-800 placeholder:text-neutral-400 focus:outline-none"
            />
            <button type="submit" className="rounded-full bg-[#0b1f3a] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#13294f]">
              Explore
            </button>
          </form>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link href="/admissions/apply" className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-7 py-3.5 text-base font-semibold text-[#0b1f3a] transition-transform hover:-translate-y-0.5">
              Begin your application
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link href="/about" className="font-serif-display text-base font-medium text-white underline-offset-8 hover:underline">
              Discover the institute
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Floating stats band */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-10 border-t border-white/10 bg-white/5 backdrop-blur-md"
      >
        <dl className="mx-auto grid max-w-7xl grid-cols-2 divide-white/10 px-6 sm:grid-cols-4 sm:divide-x lg:px-10">
          {stats.map((s) => (
            <div key={s.l} className="px-2 py-6 text-center sm:py-7">
              <dt className="font-serif-display text-3xl font-bold text-amber-300 sm:text-4xl">{s.v}</dt>
              <dd className="mt-1 text-xs font-medium uppercase tracking-wider text-white/60 sm:text-sm">{s.l}</dd>
            </div>
          ))}
        </dl>
      </motion.div>

      <ChevronDown className="absolute bottom-28 left-1/2 z-10 h-6 w-6 -translate-x-1/2 animate-bounce text-white/40 lg:bottom-32" aria-hidden="true" />
    </section>
  )
}
