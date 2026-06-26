'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FileText, ClipboardCheck, CalendarDays, GraduationCap, ArrowRight, Download, Phone } from 'lucide-react'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

const STEPS = [
  { icon: FileText, n: '01', title: 'Register online', desc: 'Create your applicant profile and submit the application form.' },
  { icon: ClipboardCheck, n: '02', title: 'Submit documents', desc: 'Upload academic records and complete the eligibility check.' },
  { icon: CalendarDays, n: '03', title: 'Counselling', desc: 'Attend counselling and confirm your preferred program.' },
  { icon: GraduationCap, n: '04', title: 'Enrol', desc: 'Pay fees, claim scholarships and join the SITASRM family.' },
]

const DATES = [
  { label: 'Applications open', value: 'Jan 2026' },
  { label: 'Early-bird deadline', value: 'Mar 2026' },
  { label: 'Final deadline', value: 'Jun 2026' },
  { label: 'Session begins', value: 'Aug 2026' },
]

export default function Admissions4({ siteSettings }: { siteSettings: any }) {
  const phone = siteSettings?.phone?.[0]?.number

  return (
    <section className="relative overflow-hidden bg-royal-600 py-20 lg:py-28">
      <div className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-lotus/20 blur-[130px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-heritage/15 blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-heritage/40 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-heritage backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rotate-45 bg-lotus" aria-hidden="true" />
            Admissions 2026
          </span>
          <h2 className="font-signature mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl">
            Your journey begins in <span className="italic text-lotus">four steps</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/75">
            A simple, transparent admissions process with dedicated counsellors guiding you at every stage.
          </p>
        </motion.div>

        {/* Process steps */}
        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STEPS.map((s) => {
            const Icon = s.icon
            return (
              <motion.li
                key={s.n}
                variants={fadeUp}
                className="relative rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm"
              >
                <span className="font-signature absolute right-6 top-5 text-4xl font-bold text-white/10">{s.n}</span>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lotus/20 text-lotus">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="font-signature mt-5 text-xl font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{s.desc}</p>
              </motion.li>
            )
          })}
        </motion.ol>

        {/* Key dates + CTA */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="lg:col-span-7"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-heritage">Key dates</p>
            <dl className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {DATES.map((d) => (
                <div key={d.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <dt className="text-xs font-medium text-white/55">{d.label}</dt>
                  <dd className="font-signature mt-1 text-lg font-bold text-white">{d.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="rounded-3xl border border-heritage/40 bg-royal-700/50 p-7 shadow-[0_0_40px_-10px_rgba(250,141,210,0.4)] ring-1 ring-heritage/20 backdrop-blur-sm lg:col-span-5"
          >
            <h3 className="font-signature text-2xl font-semibold text-white">Ready to apply?</h3>
            <p className="mt-2 text-sm text-white/70">Seats are limited. Secure your place for the 2026 session today.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/admissions/apply"
                className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-lotus px-6 py-3.5 text-base font-semibold text-royal-900 shadow-[0_10px_40px_-8px_rgba(250,141,210,0.6)] ring-1 ring-heritage/40 transition-all hover:-translate-y-0.5 hover:bg-lotus-light"
              >
                Apply for 2026
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                href="/downloads"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-lotus/50 hover:text-lotus"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Prospectus
              </Link>
            </div>
            {phone && (
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-heritage-light"
              >
                <Phone className="h-4 w-4 text-heritage" aria-hidden="true" />
                Talk to admissions · {phone}
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
