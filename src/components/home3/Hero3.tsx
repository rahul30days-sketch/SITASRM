'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ArrowDown } from 'lucide-react'
import { mediaUrl } from '@/lib/homeData'
import { HERO_IMAGES } from '@/lib/fallbackImages'

/* eslint-disable @typescript-eslint/no-explicit-any */

// Deterministic pseudo-random so SSR and client markup match (no hydration drift).
const PARTICLES = Array.from({ length: 18 }, (_, i) => {
  const r = (n: number) => (Math.sin((i + 1) * n) + 1) / 2
  return {
    left: 4 + r(12.9898) * 92,
    top: 6 + r(78.233) * 88,
    size: 2 + r(37.719) * 4,
    delay: r(4.561) * 6,
    duration: 7 + r(9.137) * 8,
    opacity: 0.25 + r(2.331) * 0.5,
  }
})

export default function Hero3({ siteSettings, gallery, placement }: { siteSettings: any; gallery: any[]; placement: any }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const campus =
    mediaUrl(siteSettings?.hero?.backgroundImage) ||
    mediaUrl(gallery?.find((g) => g?.category === 'campus')?.images?.[0]?.image) ||
    HERO_IMAGES.campus

  // Pointer-driven parallax — all hooks declared unconditionally (rules of hooks).
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 })
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 })
  const imgX = useTransform(useSpring(mx, { stiffness: 40, damping: 20 }), (v) => v * -24)
  const imgY = useTransform(useSpring(my, { stiffness: 40, damping: 20 }), (v) => v * -24)
  const glow1X = useTransform(sx, (v) => v * 40)
  const glow1Y = useTransform(sy, (v) => v * 40)
  const glow2X = useTransform(sx, (v) => v * -30)
  const glow2Y = useTransform(sy, (v) => v * -30)

  useEffect(() => {
    if (reduce) return
    const el = ref.current
    if (!el) return
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      mx.set((e.clientX - rect.left) / rect.width - 0.5)
      my.set((e.clientY - rect.top) / rect.height - 0.5)
    }
    el.addEventListener('pointermove', onMove)
    return () => el.removeEventListener('pointermove', onMove)
  }, [reduce, mx, my])

  const year = new Date().getFullYear()
  const est = siteSettings?.stats?.establishedYear
  const badge = siteSettings?.hero?.badge || 'NAAC A+ · AICTE Approved'
  const stats = [
    { v: est ? `${year - est}+` : '15+', l: 'Years' },
    { v: `${siteSettings?.stats?.placementPercent ?? 95}%`, l: 'Placed' },
    { v: placement?.recruitersCount ? `${placement.recruitersCount}+` : '120+', l: 'Recruiters' },
  ]

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-neutral-950"
    >
      {/* Parallax image layer */}
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { x: imgX, y: imgY, scale: 1.08 }}
        aria-hidden="true"
      >
        <Image src={campus} alt="SITASRM campus at dusk" fill priority sizes="100vw" className="object-cover" />
      </motion.div>

      {/* Cinematic dark overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/85" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/40 to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 bg-dot-grid opacity-[0.18]" aria-hidden="true" />

      {/* Drifting gold glows (parallax-reactive) */}
      <motion.div
        className="pointer-events-none absolute -left-32 top-1/4 h-[34rem] w-[34rem] rounded-full bg-amber-500/15 blur-[150px]"
        style={reduce ? undefined : { x: glow1X, y: glow1Y }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute -right-24 bottom-1/3 h-[26rem] w-[26rem] rounded-full bg-amber-300/10 blur-[130px]"
        style={reduce ? undefined : { x: glow2X, y: glow2Y }}
        aria-hidden="true"
      />

      {/* Floating gold particles */}
      {mounted && !reduce && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {PARTICLES.map((p, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-amber-300"
              style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size, opacity: p.opacity }}
              animate={{ y: [0, -28, 0], opacity: [p.opacity, p.opacity * 0.3, p.opacity] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 pb-20 pt-44 lg:px-12 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="max-w-4xl"
        >
          <span className="inline-flex items-center gap-3 rounded-full border border-amber-300/30 bg-amber-300/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-amber-300 backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-300" />
            </span>
            {badge}
          </span>

          <h1 className="font-lux mt-7 text-[3.25rem] font-extrabold uppercase leading-[0.92] tracking-tight text-white sm:text-7xl lg:text-[6.5rem]">
            Engineer
            <span className="block text-gradient-gold">the future</span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/70 lg:text-xl">
            {siteSettings?.tagline ||
              'A dark-edge engineering & research institute where audacious ideas become world-shaping technology.'}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/admissions/apply"
              className="group inline-flex items-center gap-2 rounded-full bg-amber-400 px-8 py-4 text-base font-semibold text-neutral-950 shadow-glow-soft transition-all hover:-translate-y-0.5 hover:bg-amber-300"
            >
              Begin your application
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-base font-semibold text-white backdrop-blur transition-colors hover:border-amber-300/60 hover:text-amber-300"
            >
              Explore the institute
            </Link>
          </div>

          {/* Inline stat strip */}
          <div className="mt-14 flex flex-wrap items-end gap-x-12 gap-y-6">
            {stats.map((s) => (
              <div key={s.l} className="flex flex-col">
                <span className="font-lux text-4xl font-extrabold text-white lg:text-5xl">{s.v}</span>
                <span className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300/80">{s.l}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="relative z-10 mx-auto flex w-full max-w-[1500px] items-center justify-between px-6 pb-8 lg:px-12"
      >
        <span className="hidden text-xs font-medium uppercase tracking-[0.3em] text-white/40 sm:block">Scroll to explore</span>
        <ArrowDown className="h-5 w-5 animate-bounce text-amber-300/70" aria-hidden="true" />
      </motion.div>
    </section>
  )
}
