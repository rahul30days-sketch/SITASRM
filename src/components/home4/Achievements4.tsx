'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, animate } from 'framer-motion'
import { Award, TrendingUp, Users, GraduationCap, Sparkles, Building2 } from 'lucide-react'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

/** Animated counter — counts up from 0 once it scrolls into view (en-IN formatting). */
function Count({ to, prefix, suffix, inView }: { to: number; prefix?: string; suffix?: string; inView: boolean }) {
  const mv = useMotionValue(0)
  const [d, setD] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(mv, to, {
      duration: 1.8,
      ease: [0.21, 0.47, 0.32, 0.98],
      onUpdate: (v) => setD(Math.round(v)),
    })
    return () => c.stop()
  }, [inView, to, mv])
  return (
    <>
      {prefix}
      {d.toLocaleString('en-IN')}
      {suffix}
    </>
  )
}

export default function Achievements4({ siteSettings, placement }: { siteSettings: any; placement: any }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const s = siteSettings?.stats || {}

  const figures = [
    {
      icon: Building2,
      to: placement?.recruitersCount ?? 120,
      suffix: '+',
      label: 'Recruiting partners',
      sub: 'Hiring on campus',
    },
    {
      icon: TrendingUp,
      to: placement?.highestPackage ?? 14,
      prefix: '₹',
      suffix: ' LPA',
      label: 'Highest package',
      sub: 'Top offer secured',
    },
    {
      icon: Award,
      to: s.placementPercent ?? 95,
      suffix: '%',
      label: 'Placement rate',
      sub: 'Class of 2024',
      gold: true,
    },
    {
      icon: Users,
      to: s.studentCount ?? 2000,
      suffix: '+',
      label: 'Students & alumni',
      sub: 'A growing family',
    },
    {
      icon: Sparkles,
      to: new Date().getFullYear() - (s.establishedYear ?? 2009),
      suffix: '+',
      label: 'Years of legacy',
      sub: `Since ${s.establishedYear ?? 2009}`,
    },
    {
      icon: GraduationCap,
      to: s.programCount ?? 24,
      suffix: '+',
      label: 'Programs offered',
      sub: 'UG · PG · Doctoral',
    },
  ]

  return (
    <section ref={ref} className="relative overflow-hidden bg-ivory py-20 lg:py-28">
      {/* Soft organic glows */}
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-lotus/15 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-heritage/10 blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-heritage/40 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-heritage-dark shadow-sm">
            <span className="h-1.5 w-1.5 rotate-45 bg-heritage" aria-hidden="true" />
            Signature achievements
          </span>
          <h2 className="font-signature mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-royal-700 sm:text-5xl">
            A legacy measured in <span className="italic text-lotus">outcomes</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-royal-900/65">
            Decades of academic excellence, industry-recognised accreditation and placements that open doors
            across the world&apos;s leading companies.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {figures.map((f) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.label}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className={`group relative overflow-hidden rounded-3xl border bg-white p-8 shadow-[0_8px_30px_-12px_rgba(48,41,112,0.18)] transition-shadow hover:shadow-[0_18px_50px_-12px_rgba(48,41,112,0.28)] ${
                  f.gold ? 'border-heritage/50 ring-1 ring-heritage/20' : 'border-heritage/20'
                }`}
              >
                {/* Decorative gold corner line */}
                <span
                  className="pointer-events-none absolute right-0 top-0 h-16 w-16 bg-gradient-to-bl from-heritage/15 to-transparent"
                  aria-hidden="true"
                />
                <span
                  className={`grid h-12 w-12 place-items-center rounded-2xl ${
                    f.gold ? 'bg-heritage text-white' : 'bg-royal-600 text-lotus'
                  }`}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <p className="font-signature mt-6 text-5xl font-bold tracking-tight text-royal-700 lg:text-6xl">
                  <Count to={f.to} prefix={f.prefix} suffix={f.suffix} inView={inView} />
                </p>
                <p className="mt-3 text-lg font-semibold text-royal-900">{f.label}</p>
                <p className="mt-1 text-sm text-royal-900/55">{f.sub}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Accreditation strip — gold for the premium awards feel */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-heritage/25 pt-10"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-heritage-dark">
            Accredited &amp; recognised by
          </span>
          {['AICTE Approved', 'AKTU Affiliated', 'NAAC A+', 'NBA Accredited', 'ISO 9001:2015'].map((b) => (
            <span key={b} className="flex items-center gap-2 font-signature text-lg font-semibold text-royal-700">
              <span className="h-1 w-1 rotate-45 bg-heritage" aria-hidden="true" />
              {b}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
