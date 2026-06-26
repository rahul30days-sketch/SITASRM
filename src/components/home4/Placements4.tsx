'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, useMotionValue, animate } from 'framer-motion'
import { ArrowRight, Briefcase, TrendingUp, IndianRupee, Building2 } from 'lucide-react'
import { mediaUrl } from '@/lib/homeData'
import { initials } from '@/lib/fallbackImages'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

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

export default function Placements4({ placement, recruiters }: { placement: any; recruiters: any[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const figures = [
    {
      icon: TrendingUp,
      to: placement?.highestPackage ?? 14,
      prefix: '₹',
      suffix: ' LPA',
      label: 'Highest package',
    },
    {
      icon: IndianRupee,
      to: placement?.averagePackage ?? 5,
      prefix: '₹',
      suffix: ' LPA',
      label: 'Average package',
    },
    {
      icon: Briefcase,
      to: placement?.studentsPlaced ?? 480,
      suffix: '+',
      label: `Students placed${placement?.year ? ` · ${placement.year}` : ''}`,
    },
    {
      icon: Building2,
      to: placement?.recruitersCount ?? (recruiters?.length || 120),
      suffix: '+',
      label: 'Recruiting partners',
    },
  ]

  const logos = (recruiters || []).slice(0, 12)

  return (
    <section ref={ref} className="relative overflow-hidden bg-ivory py-20 lg:py-28">
      <div className="pointer-events-none absolute -left-24 bottom-10 h-96 w-96 rounded-full bg-lotus/12 blur-[120px]" aria-hidden="true" />

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
            Careers &amp; placements
          </span>
          <h2 className="font-signature mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-royal-700 sm:text-5xl">
            Where ambition meets <span className="italic text-lotus">opportunity</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-royal-900/65">
            A dedicated placement cell, year-round industry engagement and rigorous mentoring translate into
            outcomes our students are proud of.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4"
        >
          {figures.map((f) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.label}
                variants={fadeUp}
                className="rounded-3xl border border-heritage/20 bg-white p-7 shadow-[0_8px_30px_-12px_rgba(48,41,112,0.18)]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-royal-600 text-lotus">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="font-signature mt-5 text-4xl font-bold tracking-tight text-royal-700 lg:text-5xl">
                  <Count to={f.to} prefix={f.prefix} suffix={f.suffix} inView={inView} />
                </p>
                <p className="mt-2 text-sm font-medium text-royal-900/60">{f.label}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Recruiter logo row */}
        {logos.length > 0 && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-16"
          >
            <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-royal-900/45">
              Trusted by leading recruiters
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
              {logos.map((r) => {
                const logo = mediaUrl(r.logo)
                return (
                  <div
                    key={r.id ?? r.name}
                    className="flex h-20 items-center justify-center rounded-2xl border border-heritage/20 bg-white px-4 shadow-sm"
                  >
                    {logo ? (
                      <div className="relative h-10 w-full">
                        <Image
                          src={logo}
                          alt={r.name}
                          fill
                          sizes="160px"
                          className="object-contain opacity-80 transition-opacity hover:opacity-100"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-royal-600 to-lotus-dark text-xs font-bold text-white">
                          {initials(r.name)}
                        </span>
                        <span className="truncate text-sm font-semibold text-royal-700">{r.name}</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 flex justify-center"
        >
          <Link
            href="/placements"
            className="group inline-flex items-center gap-2 rounded-full bg-royal-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg ring-1 ring-heritage/30 transition-all hover:-translate-y-0.5 hover:bg-lotus hover:text-royal-900"
          >
            View placement report
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
