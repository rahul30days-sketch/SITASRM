'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, TrendingUp, Users, Award, Briefcase } from 'lucide-react'
import { mediaUrl } from '@/lib/homeData'
import { initials } from '@/lib/fallbackImages'
import { fadeUp, viewportOnce } from '@/lib/motion'

/* eslint-disable @typescript-eslint/no-explicit-any */

/** Count-up number that animates once when scrolled into view. */
function CountUp({
  to,
  prefix = '',
  suffix = '',
  decimals = 0,
}: {
  to: number
  prefix?: string
  suffix?: string
  decimals?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const dur = 1400
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(to * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to])

  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  )
}

export default function Placements2({
  placement,
  siteSettings,
  recruiters,
}: {
  placement: any
  siteSettings: any
  recruiters: any[]
}) {
  const stats = siteSettings?.stats || {}
  const cards = [
    {
      icon: TrendingUp,
      to: stats.placementPercent ?? 95,
      suffix: '%',
      label: 'Placement rate',
    },
    {
      icon: Users,
      to: placement?.studentsPlaced ?? stats.studentCount ?? 800,
      suffix: '+',
      label: 'Students placed',
    },
    {
      icon: Award,
      to: placement?.highestPackage ?? 24,
      prefix: '₹',
      suffix: ' LPA',
      decimals: placement?.highestPackage && placement.highestPackage % 1 !== 0 ? 1 : 0,
      label: 'Highest package',
    },
    {
      icon: Briefcase,
      to: placement?.recruitersCount ?? 120,
      suffix: '+',
      label: 'Hiring partners',
    },
  ]

  const logos = recruiters?.slice(0, 12) || []

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative overflow-hidden rounded-[2.5rem] border border-black/5 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 px-6 py-14 shadow-[0_30px_80px_-50px_rgba(59,130,246,0.5)] sm:px-12 sm:py-16"
        >
          {/* Soft glows */}
          <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-indigo-300/30 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-16 -right-10 h-64 w-64 rounded-full bg-cyan-300/30 blur-3xl" aria-hidden="true" />

          <div className="relative">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Outcomes</p>
              <h2 className="font-modern mt-3 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
                Careers that start strong
              </h2>
              <p className="mt-4 text-lg text-neutral-600">
                {placement?.year ? `${placement.year} placements ` : 'Each year '}— and a recruiter network that keeps growing.
              </p>
            </div>

            {/* Count-up stat cards */}
            <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {cards.map((c) => (
                <div
                  key={c.label}
                  className="rounded-2xl border border-black/5 bg-white/70 p-5 backdrop-blur-xl"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white">
                    <c.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="font-modern mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                    <CountUp to={c.to} prefix={c.prefix} suffix={c.suffix} decimals={c.decimals} />
                  </p>
                  <p className="mt-1 text-sm font-medium text-neutral-500">{c.label}</p>
                </div>
              ))}
            </div>

            {/* Recruiter logos */}
            {logos.length > 0 && (
              <div className="mt-12">
                <p className="text-center text-sm font-medium text-neutral-500">Trusted by teams hiring from SERI</p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  {logos.map((r, i) => {
                    const logo = mediaUrl(r.logo)
                    return (
                      <div
                        key={r.id || i}
                        className="flex h-14 w-32 items-center justify-center rounded-xl border border-black/5 bg-white/80 px-4 backdrop-blur"
                        title={r.name}
                      >
                        {logo ? (
                          <Image
                            src={logo}
                            alt={r.name}
                            width={120}
                            height={40}
                            className="max-h-8 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
                          />
                        ) : (
                          <span className="font-modern text-sm font-bold text-neutral-400">
                            {initials(r.name)}
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="mt-10 flex justify-center">
              <Link
                href="/admissions"
                className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-neutral-800"
              >
                View placement report
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
