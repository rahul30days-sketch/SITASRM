'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion'
import { ArrowRight, ChevronDown, Award, TrendingUp } from 'lucide-react'
import { mediaUrl } from '@/lib/homeData'
import { HERO_IMAGES } from '@/lib/fallbackImages'

/* eslint-disable @typescript-eslint/no-explicit-any */

// Ambient lotus-petal particles — mostly gold/ivory, one subtle pink (deterministic for SSR).
const PETALS = [
  { l: '10%', t: '26%', s: 22, d: 0, dur: 8, r: -20, c: 'gold' },
  { l: '20%', t: '68%', s: 16, d: 1.2, dur: 9, r: 30, c: 'white' },
  { l: '34%', t: '40%', s: 13, d: 0.6, dur: 8.5, r: 10, c: 'gold' },
  { l: '60%', t: '20%', s: 18, d: 2, dur: 10, r: -35, c: 'white' },
  { l: '78%', t: '58%', s: 15, d: 0.4, dur: 9, r: 25, c: 'gold' },
  { l: '88%', t: '32%', s: 20, d: 1.6, dur: 11, r: -15, c: 'pink' },
  { l: '46%', t: '78%', s: 14, d: 2.4, dur: 9.5, r: -25, c: 'gold' },
] as const

const PETAL_COLOR: Record<string, string> = {
  gold: 'from-heritage/35 to-heritage/5',
  white: 'from-white/25 to-white/5',
  pink: 'from-lotus/25 to-lotus/0',
}

export default function Hero4({ siteSettings, gallery, placement }: { siteSettings: any; gallery: any[]; placement: any }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const campus =
    mediaUrl(siteSettings?.hero?.backgroundImage) ||
    mediaUrl(gallery?.find((g) => g?.category === 'campus')?.images?.[0]?.image) ||
    HERO_IMAGES.campus

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '16%'])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const gx = useSpring(useTransform(mx, [-0.5, 0.5], [reduce ? 0 : -24, reduce ? 0 : 24]), { stiffness: 60, damping: 18 })
  const gy = useSpring(useTransform(my, [-0.5, 0.5], [reduce ? 0 : -18, reduce ? 0 : 18]), { stiffness: 60, damping: 18 })
  const onMove = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  const highest = placement?.highestPackage ? `₹${placement.highestPackage} LPA` : '₹14 LPA'
  const recruiters = placement?.recruitersCount ? `${placement.recruitersCount}+` : '120+'

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-royal-950"
    >
      {/* Full-bleed campus image with scroll parallax */}
      <motion.div className="absolute inset-0 -z-0" style={{ y: bgY }}>
        <Image src={campus} alt="SITASRM campus" fill priority sizes="100vw" className="scale-110 object-cover" />
      </motion.div>

      {/* Layered gradient — strong on the LEFT for text legibility, clearing to the RIGHT so the campus reads */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(100deg, rgba(16,13,43,0.96) 0%, rgba(16,13,43,0.9) 33%, rgba(16,13,43,0.66) 50%, rgba(16,13,43,0.24) 70%, rgba(16,13,43,0) 86%)',
        }}
        aria-hidden="true"
      />
      {/* Gentle bottom grounding for the trust row + scroll cue */}
      <div className="absolute inset-0 bg-gradient-to-t from-royal-950/55 via-transparent to-transparent" aria-hidden="true" />
      {/* Soft lighting over the campus side (keeps depth off the text) */}
      <div className="absolute inset-0 bg-[radial-gradient(50%_45%_at_70%_32%,rgba(255,255,255,0.08),transparent_70%)]" aria-hidden="true" />
      {/* Subtle cinematic vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_42%,transparent_58%,rgba(16,13,43,0.5)_100%)]" aria-hidden="true" />

      {/* Soft ambient glow (mouse parallax) — gold-warm + a whisper of lotus */}
      <motion.div style={{ x: gx, y: gy }} className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 top-1/3 h-[30rem] w-[30rem] rounded-full bg-heritage/12 blur-[150px]" />
        <div className="absolute -right-16 bottom-12 h-[24rem] w-[24rem] rounded-full bg-lotus/10 blur-[140px]" />
      </motion.div>

      {/* Ambient lotus-petal particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {PETALS.map((p, i) => (
          <motion.span
            key={i}
            className={`absolute rounded-[50%_0] bg-gradient-to-br ${PETAL_COLOR[p.c]} blur-[1px]`}
            style={{ left: p.l, top: p.t, width: p.s, height: p.s, rotate: p.r }}
            animate={reduce ? undefined : { y: [0, -20, 0], opacity: [0.25, 0.6, 0.25] }}
            transition={{ duration: p.dur, delay: p.d, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Content — generous whitespace */}
      <div id="main" className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-36 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-heritage/45 bg-royal-950/45 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-heritage-light backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rotate-45 bg-heritage" aria-hidden="true" />
            MBA &amp; B.Tech Admissions 2026 · Greater Noida
          </span>

          <h1 className="font-signature mt-8 text-[2.9rem] font-semibold leading-[1.06] tracking-tight text-white [text-shadow:0_2px_24px_rgba(16,13,43,0.55)] sm:text-6xl lg:text-7xl">
            Where tradition shapes the{' '}
            <span className="relative whitespace-nowrap italic text-lotus">
              innovators
              <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-heritage via-heritage to-heritage/30" aria-hidden="true" />
            </span>{' '}
            of tomorrow
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/90 [text-shadow:0_1px_14px_rgba(16,13,43,0.65)]">
            A premier engineering &amp; research institute uniting Indian heritage with future technology —
            AI-powered labs, industry-synced curriculum and 100% placement assistance.
          </p>

          <div className="mt-11 flex flex-wrap items-center gap-4">
            <Link
              href="/admissions/apply"
              className="group inline-flex items-center gap-2 rounded-full bg-royal-600 px-7 py-3.5 text-base font-semibold text-white shadow-[0_12px_40px_-10px_rgba(59,50,138,0.8)] ring-1 ring-heritage/40 transition-all hover:-translate-y-0.5 hover:bg-lotus hover:text-royal-950 hover:ring-heritage/60"
            >
              Apply for 2026
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 rounded-full border border-royal-200/70 bg-ivory/90 px-7 py-3.5 text-base font-semibold text-royal-700 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-heritage hover:bg-ivory"
            >
              Explore Programs
            </Link>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/20 pt-7 text-sm text-white/85 [text-shadow:0_1px_10px_rgba(16,13,43,0.6)]">
            {['AICTE Approved', 'AKTU Affiliated', 'NAAC A+', 'Up to 100% Scholarship'].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <span className="h-1 w-1 rotate-45 bg-heritage" aria-hidden="true" />
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating statistic panels — elegant ivory + gold, indigo icons */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        style={{ x: gx, y: gy }}
        className="absolute right-6 top-40 z-10 hidden rounded-2xl border border-heritage/40 bg-ivory/95 p-5 shadow-[0_20px_50px_-16px_rgba(16,13,43,0.5)] backdrop-blur-sm lg:block xl:right-16"
      >
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-royal-50 text-royal-600 ring-1 ring-heritage/30">
          <TrendingUp className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="font-signature mt-3 text-2xl font-bold text-royal-700">{highest}</p>
        <p className="text-xs font-medium text-royal-900/55">Highest package</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.62 }}
        style={{ x: gx, y: gy }}
        className="absolute bottom-32 right-12 z-10 hidden rounded-2xl border border-heritage/40 bg-ivory/95 p-5 shadow-[0_20px_50px_-16px_rgba(16,13,43,0.5)] backdrop-blur-sm xl:block"
      >
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-royal-50 text-royal-600 ring-1 ring-heritage/30">
            <Award className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-signature text-xl font-bold leading-none text-royal-700">{recruiters}</p>
            <p className="mt-1 text-xs font-medium text-royal-900/55">Hiring partners</p>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-1 text-white/55">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown className="h-5 w-5 animate-bounce" aria-hidden="true" />
      </div>
    </section>
  )
}
