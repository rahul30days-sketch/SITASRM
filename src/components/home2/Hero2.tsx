'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles, GraduationCap, Star } from 'lucide-react'
import { mediaUrl } from '@/lib/homeData'
import { HERO_IMAGES } from '@/lib/fallbackImages'

/* eslint-disable @typescript-eslint/no-explicit-any */

const ease = [0.21, 0.47, 0.32, 0.98] as const

function fmtK(n?: number) {
  if (!n) return null
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K+`
  return `${n}+`
}

export default function Hero2({
  siteSettings,
  gallery,
  placement,
}: {
  siteSettings: any
  gallery: any[]
  placement: any
}) {
  const campus =
    mediaUrl(siteSettings?.hero?.backgroundImage) ||
    mediaUrl(gallery?.find((g) => g?.category === 'campus')?.images?.[0]?.image) ||
    HERO_IMAGES.campus

  const stats = siteSettings?.stats || {}
  const students = fmtK(stats.studentCount) || '1.5K+'
  const placementPct = `${stats.placementPercent ?? 95}%`
  const programCount = stats.programCount ? `${stats.programCount}+` : '24+'
  const recruiters = placement?.recruitersCount ? `${placement.recruitersCount}+` : '120+'

  const headingTop = siteSettings?.hero?.headingTop || 'Design your future at'
  const highlight = siteSettings?.hero?.headingHighlight || 'a campus built for makers'
  const subheading =
    siteSettings?.hero?.subheading ||
    'A modern engineering & research institute where curiosity, craft and technology meet — and where ambitious students build what comes next.'

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-neutral-50">
      {/* Campus image background */}
      <Image
        src={campus}
        alt="SITASRM campus"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Subtle wash — keeps the campus image clearly visible (airy, not washed out),
          with a soft radial scrim only behind the centered text for legibility. */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/10 to-white/65"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(72% 55% at 50% 42%, rgba(255,255,255,0.78), rgba(255,255,255,0) 72%)',
        }}
        aria-hidden="true"
      />

      {/* Soft gradient "lighting" glows */}
      <div
        className="absolute -left-32 top-1/4 h-[28rem] w-[28rem] rounded-full bg-indigo-400/25 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="absolute -right-24 bottom-10 h-[26rem] w-[26rem] rounded-full bg-cyan-300/30 blur-[120px]"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 pb-20 pt-36 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-4 py-1.5 text-sm font-medium text-neutral-700 shadow-sm backdrop-blur-xl"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {siteSettings?.hero?.badge || 'Now accepting applications · 2026 intake'}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.05 }}
          className="font-modern mt-7 max-w-4xl text-balance text-5xl font-bold leading-[1.02] tracking-tight text-neutral-900 sm:text-6xl lg:text-[5.25rem]"
        >
          {headingTop}{' '}
          <span className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
            {highlight}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.12 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600"
        >
          {subheading}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.18 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/admissions/apply"
            className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-neutral-800"
          >
            Start your application
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-7 py-3.5 text-base font-semibold text-neutral-800 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:bg-white"
          >
            Explore programs
          </Link>
        </motion.div>
      </div>

      {/* Floating glassmorphism cards */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease, delay: 0.35 }}
        className="absolute left-6 top-32 z-10 hidden rounded-2xl border border-white/60 bg-white/55 p-4 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.2)] backdrop-blur-2xl md:left-10 md:top-40 md:block lg:left-20"
        aria-hidden="true"
      >
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white">
            <GraduationCap className="h-5 w-5" />
          </span>
          <div className="text-left">
            <p className="font-modern text-2xl font-bold leading-none text-neutral-900">{students}</p>
            <p className="mt-1 text-xs font-medium text-neutral-500">students learning</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease, delay: 0.45 }}
        className="absolute right-6 top-44 z-10 hidden rounded-2xl border border-white/60 bg-white/55 px-4 py-3 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.2)] backdrop-blur-2xl md:right-10 md:block lg:right-24"
        aria-hidden="true"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-blue-500" />
          <p className="text-sm font-semibold text-neutral-800">{programCount} programs</p>
        </div>
        <p className="mt-0.5 text-xs text-neutral-500">{recruiters} hiring partners</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease, delay: 0.55 }}
        className="absolute bottom-28 right-8 z-10 hidden rounded-2xl border border-white/60 bg-white/55 p-4 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.2)] backdrop-blur-2xl md:right-16 lg:bottom-24 lg:right-32 xl:block"
        aria-hidden="true"
      >
        <div className="flex items-center gap-1 text-amber-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-current" />
          ))}
        </div>
        <p className="mt-2 font-modern text-lg font-bold leading-none text-neutral-900">{placementPct}</p>
        <p className="mt-1 text-xs font-medium text-neutral-500">placement rate</p>
      </motion.div>

      {/* Bottom fade into next section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-32 bg-gradient-to-b from-transparent to-neutral-50"
        aria-hidden="true"
      />
    </section>
  )
}
