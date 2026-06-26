'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Download, CalendarCheck } from 'lucide-react'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

const STEPS = [
  { t: 'Submit your application', d: 'Complete the online form for your chosen programme.' },
  { t: 'Share your documents', d: 'Upload academic records and entrance scorecards.' },
  { t: 'Personal counselling', d: 'Meet our advisors to finalise your pathway and aid.' },
  { t: 'Confirm & enrol', d: 'Accept your offer and join the SITASRM community.' },
]

export default function Admissions1() {
  return (
    <section className="relative overflow-hidden bg-[#0b1f3a] py-20 lg:py-28">
      <div className="pointer-events-none absolute -left-20 bottom-0 h-96 w-96 rounded-full bg-amber-400/10 blur-[120px]" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-12 lg:px-10">
        {/* Left — steps */}
        <div className="lg:col-span-7">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Admissions 2025–26</p>
          <h2 className="font-serif-display mt-4 text-4xl font-bold leading-tight text-white lg:text-5xl">
            Your journey begins here
          </h2>
          <motion.ol
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-12 space-y-8"
          >
            {STEPS.map((s, i) => (
              <motion.li key={s.t} variants={fadeUp} className="flex gap-6">
                <span className="font-serif-display flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-amber-300/40 text-xl font-bold text-amber-300">
                  {i + 1}
                </span>
                <div className="border-b border-white/10 pb-8">
                  <h3 className="font-serif-display text-xl font-semibold text-white">{s.t}</h3>
                  <p className="mt-1.5 text-white/60">{s.d}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>

        {/* Right — key info card */}
        <motion.aside
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="lg:col-span-5"
        >
          <div className="rounded-3xl bg-white p-8 shadow-2xl lg:sticky lg:top-28">
            <div className="flex items-center gap-3 text-[#0b1f3a]">
              <CalendarCheck className="h-6 w-6 text-amber-600" aria-hidden="true" />
              <p className="font-serif-display text-xl font-bold">Key dates</p>
            </div>
            <dl className="mt-6 space-y-4 text-sm">
              {[
                ['Applications open', 'Now'],
                ['Early decision', '31 March 2026'],
                ['Entrance & merit review', 'April 2026'],
                ['Session begins', 'August 2026'],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <dt className="text-neutral-500">{k}</dt>
                  <dd className="font-semibold text-[#0b1f3a]">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-7 space-y-3">
              <Link href="/admissions/apply" className="flex items-center justify-center gap-2 rounded-full bg-[#0b1f3a] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#13294f]">
                Apply now <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/downloads" className="flex items-center justify-center gap-2 rounded-full border border-neutral-200 px-6 py-3.5 text-sm font-semibold text-[#0b1f3a] transition-colors hover:border-amber-500 hover:text-amber-600">
                <Download className="h-4 w-4" aria-hidden="true" /> Download prospectus
              </Link>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  )
}
