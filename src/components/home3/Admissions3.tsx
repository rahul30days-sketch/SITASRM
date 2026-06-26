'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, FileText, ClipboardCheck, CreditCard, PartyPopper } from 'lucide-react'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

/* eslint-disable @typescript-eslint/no-explicit-any */

const STEPS = [
  { icon: FileText, title: 'Apply Online', desc: 'Create your profile and submit the application form in minutes.' },
  { icon: ClipboardCheck, title: 'Entrance & Review', desc: 'Sit the SERI entrance or submit qualifying scores for review.' },
  { icon: CreditCard, title: 'Offer & Fee', desc: 'Receive your offer letter and confirm your seat with the fee.' },
  { icon: PartyPopper, title: 'Enrol & Begin', desc: 'Complete onboarding and step into your engineering journey.' },
]

const DATES = [
  { label: 'Applications open', value: 'Now' },
  { label: 'Last date to apply', value: '31 Jul 2026' },
  { label: 'Entrance test', value: 'Aug 2026' },
  { label: 'Session begins', value: 'Sep 2026' },
]

export default function Admissions3({ siteSettings }: { siteSettings: any }) {
  const phone = siteSettings?.phone?.[0]?.number

  return (
    <section aria-labelledby="admissions3-heading" className="relative overflow-hidden bg-neutral-950 py-24 lg:py-36">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.12]" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-amber-500/[0.12] blur-[140px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1500px] px-6 lg:px-12">
        {/* Headline CTA */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="mx-auto max-w-4xl text-center">
          <p className="font-lux text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Admissions 2026</p>
          <h2 id="admissions3-heading" className="font-lux mt-5 text-5xl font-extrabold uppercase leading-[0.9] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Your future
            <span className="block text-gradient-gold">starts here</span>
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/65">
            Four simple steps stand between you and a world-class engineering education. Applications for the 2026 intake are open now.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/admissions/apply"
              className="group inline-flex items-center gap-2 rounded-full bg-amber-400 px-8 py-4 text-base font-semibold text-neutral-950 shadow-glow-soft transition-all hover:-translate-y-0.5 hover:bg-amber-300"
            >
              Start your application
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>
            <Link
              href="/downloads"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-base font-semibold text-white transition-colors hover:border-amber-300/60 hover:text-amber-300"
            >
              Download prospectus
            </Link>
          </div>
        </motion.div>

        {/* Steps */}
        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-20 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STEPS.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.li
                key={s.title}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition-all hover:-translate-y-1 hover:border-amber-300/40"
              >
                <span className="pointer-events-none absolute -right-6 -top-6 font-lux text-8xl font-extrabold text-white/[0.04] transition-colors group-hover:text-amber-300/10">
                  0{i + 1}
                </span>
                <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-300/25 bg-amber-300/5 text-amber-300">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="font-lux relative mt-6 text-lg font-bold uppercase tracking-tight text-white">{s.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-white/60">{s.desc}</p>
              </motion.li>
            )
          })}
        </motion.ol>

        {/* Key dates rail */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="glass-dark mt-6 overflow-hidden rounded-3xl border border-white/10"
        >
          <dl className="grid grid-cols-2 gap-px lg:grid-cols-4">
            {DATES.map((d) => (
              <div key={d.label} className="bg-neutral-950/40 p-6 text-center">
                <dt className="text-xs font-semibold uppercase tracking-wide text-white/50">{d.label}</dt>
                <dd className="font-lux mt-2 text-xl font-extrabold uppercase tracking-tight text-amber-300 lg:text-2xl">{d.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        {phone && (
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-8 text-center text-sm text-white/50"
          >
            Questions? Call our admissions team at{' '}
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="font-semibold text-amber-300 hover:text-amber-200">{phone}</a>
          </motion.p>
        )}
      </div>
    </section>
  )
}
