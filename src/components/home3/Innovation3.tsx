'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Rocket, Lightbulb, FlaskConical, Building2 } from 'lucide-react'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

/* eslint-disable @typescript-eslint/no-explicit-any */

const FEATURES = [
  { icon: Rocket, title: 'Startup Incubator', desc: 'A launchpad with seed funding, mentorship and infrastructure to turn student ventures into companies.', stat: '40+', statLabel: 'Startups incubated' },
  { icon: FlaskConical, title: 'Innovation Labs', desc: 'State-of-the-art maker spaces, fabrication studios and prototyping labs open round the clock.', stat: '15', statLabel: 'Specialised labs' },
  { icon: Lightbulb, title: 'Patents & IP', desc: 'A dedicated IP cell guiding filings, protecting student inventions and commercialising research.', stat: '24', statLabel: 'Patents filed' },
]

export default function Innovation3({ siteSettings, placement }: { siteSettings: any; placement: any }) {
  void siteSettings
  void placement

  return (
    <section aria-labelledby="innovation3-heading" className="relative overflow-hidden border-y border-white/10 bg-gradient-to-b from-neutral-950 via-[#0d0b06] to-neutral-950 py-24 lg:py-36">
      <div className="pointer-events-none absolute -right-40 top-0 h-[36rem] w-[36rem] rounded-full bg-amber-500/[0.10] blur-[150px]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.12]" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1500px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="lg:col-span-8">
            <p className="font-lux text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Innovation & Incubation</p>
            <h2 id="innovation3-heading" className="font-lux mt-5 text-5xl font-extrabold uppercase leading-[0.9] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Where ideas become
              <span className="block text-gradient-gold">ventures</span>
            </h2>
          </motion.div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="text-lg leading-relaxed text-white/65 lg:col-span-4 lg:pb-3"
          >
            From first sketch to funded startup — SERI&apos;s innovation ecosystem gives every audacious idea the lab, the capital and the mentorship to ship.
          </motion.p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-1 gap-5 lg:mt-20 lg:grid-cols-3"
        >
          {FEATURES.map((f) => {
            const Icon = f.icon
            return (
              <motion.article
                key={f.title}
                variants={fadeUp}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 transition-all hover:-translate-y-1.5 hover:border-amber-300/40 hover:shadow-glow-soft"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-300/25 bg-amber-300/5 text-amber-300 transition-colors group-hover:bg-amber-300/15">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <h3 className="font-lux mt-7 text-2xl font-bold uppercase tracking-tight text-white">{f.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-white/60">{f.desc}</p>
                <div className="mt-7 flex items-baseline gap-3 border-t border-white/10 pt-6">
                  <span className="font-lux text-4xl font-extrabold text-amber-300">{f.stat}</span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-white/50">{f.statLabel}</span>
                </div>
              </motion.article>
            )
          })}
        </motion.div>

        {/* Feature banner */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="glass-dark relative mt-6 flex flex-col items-start justify-between gap-8 overflow-hidden rounded-3xl border border-amber-300/20 p-8 lg:flex-row lg:items-center lg:p-12"
        >
          <div className="pointer-events-none absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-amber-400/10 blur-[100px]" aria-hidden="true" />
          <div className="relative flex items-center gap-6">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-amber-300/30 bg-amber-300/10 text-amber-300">
              <Building2 className="h-8 w-8" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-lux text-2xl font-bold uppercase tracking-tight text-white lg:text-3xl">SERI Technology Business Incubator</h3>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-white/65">
                A government-recognised incubator backing deep-tech founders with grants, lab access and a network of investors and industry partners.
              </p>
            </div>
          </div>
          <Link
            href="/about"
            className="relative inline-flex shrink-0 items-center gap-2 rounded-full bg-amber-400 px-7 py-3.5 text-sm font-semibold text-neutral-950 transition-all hover:-translate-y-0.5 hover:bg-amber-300"
          >
            Partner with us
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
