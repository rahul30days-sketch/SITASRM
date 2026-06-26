'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, animate } from 'framer-motion'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

/* eslint-disable @typescript-eslint/no-explicit-any */

function Count({ to, suffix, inView }: { to: number; suffix?: string; inView: boolean }) {
  const mv = useMotionValue(0)
  const [d, setD] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(mv, to, { duration: 1.8, ease: [0.21, 0.47, 0.32, 0.98], onUpdate: (v) => setD(Math.round(v)) })
    return () => c.stop()
  }, [inView, to, mv])
  return <>{d.toLocaleString('en-IN')}{suffix}</>
}

const BADGES = ['AICTE Approved', 'NAAC A+', 'NBA Accredited', 'ISO 9001:2015', 'AIU Member']

export default function Rankings1({ siteSettings, placement }: { siteSettings: any; placement: any }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const s = siteSettings?.stats || {}

  const figures = [
    { to: s.placementPercent ?? 95, suffix: '%', l: 'Placement rate', sub: 'Class of 2024' },
    { to: placement?.highestPackage ?? 14, suffix: ' LPA', l: 'Highest package', sub: 'Top offer secured' },
    { to: s.studentCount ?? 2000, suffix: '+', l: 'Alumni worldwide', sub: 'Across 20+ nations' },
    { to: placement?.recruitersCount ?? 120, suffix: '+', l: 'Recruiting partners', sub: 'Hiring on campus' },
  ]

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#0b1f3a] py-20 lg:py-28">
      <div className="bg-grid-lines pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-amber-400/10 blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Recognition</p>
          <h2 className="font-serif-display mt-4 text-4xl font-bold leading-tight text-white lg:text-5xl">
            A reputation measured in outcomes
          </h2>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {figures.map((f) => (
            <motion.div key={f.l} variants={fadeUp} className="bg-[#0b1f3a] p-8">
              <p className="font-serif-display text-5xl font-bold text-amber-300 lg:text-6xl">
                <Count to={f.to} suffix={f.suffix} inView={inView} />
              </p>
              <p className="mt-3 text-lg font-semibold text-white">{f.l}</p>
              <p className="mt-1 text-sm text-white/50">{f.sub}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Accreditation badge row */}
        <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-white/10 pt-10">
          <span className="text-sm font-medium uppercase tracking-widest text-white/40">Accredited &amp; recognised by</span>
          {BADGES.map((b) => (
            <span key={b} className="font-serif-display text-lg font-semibold text-white/80">{b}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
