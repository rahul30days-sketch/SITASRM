'use client'

import { motion } from 'framer-motion'
import { Award, ShieldCheck, Star, Globe2, BadgeCheck, Trophy } from 'lucide-react'
import { fadeUp, viewportOnce } from '@/lib/motion'

/* eslint-disable @typescript-eslint/no-explicit-any */

const ACCREDITATIONS = [
  { icon: ShieldCheck, label: 'NAAC A+', sub: 'Accredited' },
  { icon: BadgeCheck, label: 'AICTE', sub: 'Approved' },
  { icon: Award, label: 'NBA', sub: 'Programs' },
  { icon: Star, label: 'ISO 9001', sub: 'Certified' },
  { icon: Globe2, label: 'UGC', sub: 'Recognised' },
  { icon: Trophy, label: 'Top 50', sub: 'Engineering · 2025' },
]

export default function Awards3({ siteSettings }: { siteSettings: any }) {
  void siteSettings
  // Duplicate the row once for a seamless marquee loop.
  const row = [...ACCREDITATIONS, ...ACCREDITATIONS]

  return (
    <section aria-labelledby="awards3-heading" className="relative overflow-hidden border-y border-white/10 bg-neutral-950 py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid-lines opacity-40" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1500px] px-6 lg:px-12">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="max-w-3xl">
          <p className="font-lux text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Recognition</p>
          <h2 id="awards3-heading" className="font-lux mt-4 text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Accredited.
            <span className="text-gradient-gold"> Awarded.</span> Trusted.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/65">
            A foundation of national accreditations and industry honours that certify the calibre of a SERI education.
          </p>
        </motion.div>
      </div>

      {/* Marquee row */}
      <div className="relative mt-16 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex shrink-0 animate-marquee items-stretch gap-5 pr-5 motion-reduce:animate-none">
          {row.map((a, i) => {
            const Icon = a.icon
            return (
              <div
                key={i}
                className="glass-dark group flex w-60 shrink-0 items-center gap-4 rounded-2xl border border-white/10 px-6 py-5 transition-colors hover:border-amber-300/40"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-amber-300/20 bg-amber-300/5 text-amber-300 transition-colors group-hover:bg-amber-300/15">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="flex flex-col">
                  <span className="font-lux text-xl font-extrabold uppercase tracking-tight text-white">{a.label}</span>
                  <span className="text-xs uppercase tracking-wider text-white/45">{a.sub}</span>
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
