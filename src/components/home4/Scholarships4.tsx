'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Award, HandCoins, Medal, Sparkles, ArrowRight } from 'lucide-react'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

const SCHEMES = [
  {
    icon: Award,
    title: 'Merit Scholarship',
    award: 'Up to 100%',
    desc: 'Tuition waivers for top performers in board exams and qualifying entrance tests.',
    criteria: '90%+ in Class XII or top JEE/CUET percentile',
  },
  {
    icon: HandCoins,
    title: 'Need-Based Aid',
    award: 'Up to 50%',
    desc: 'Financial assistance ensuring talented students are never held back by means.',
    criteria: 'Family income below the notified threshold',
  },
  {
    icon: Medal,
    title: 'Sports Excellence',
    award: 'Up to 75%',
    desc: 'Support for state, national and international level athletes and players.',
    criteria: 'Verified achievement at state level or above',
  },
  {
    icon: Sparkles,
    title: 'Girl-Child Scholarship',
    award: 'Up to 25%',
    desc: 'Encouraging women in engineering, sciences and emerging technologies.',
    criteria: 'Applicable to all eligible women candidates',
  },
]

export default function Scholarships4() {
  return (
    <section className="relative overflow-hidden bg-ivory py-20 lg:py-28">
      <div className="pointer-events-none absolute -left-24 top-10 h-96 w-96 rounded-full bg-heritage/12 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-lotus/12 blur-[120px]" aria-hidden="true" />

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
            Scholarships &amp; financial aid
          </span>
          <h2 className="font-signature mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-royal-700 sm:text-5xl">
            Excellence deserves to be <span className="italic text-lotus">rewarded</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-royal-900/65">
            Over ₹2 crore in scholarships awarded each year. We invest in merit, talent and equity so that
            ambition is the only prerequisite.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SCHEMES.map((s) => {
            const Icon = s.icon
            return (
              <motion.article
                key={s.title}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-heritage/40 bg-white p-7 shadow-[0_8px_30px_-12px_rgba(48,41,112,0.18)] ring-1 ring-heritage/10 transition-shadow hover:shadow-[0_20px_55px_-14px_rgba(201,162,39,0.35)]"
              >
                <span
                  className="pointer-events-none absolute right-0 top-0 h-20 w-20 bg-gradient-to-bl from-heritage/15 to-transparent"
                  aria-hidden="true"
                />
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-heritage text-white">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <p className="font-signature mt-5 text-3xl font-bold tracking-tight text-royal-700">{s.award}</p>
                <h3 className="mt-1 text-lg font-semibold text-royal-900">{s.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-royal-900/60">{s.desc}</p>
                <p className="mt-5 border-t border-heritage/20 pt-4 text-xs font-medium uppercase tracking-wide text-heritage-dark">
                  {s.criteria}
                </p>
              </motion.article>
            )
          })}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link
            href="/admissions"
            className="group inline-flex items-center gap-2 rounded-full border border-heritage bg-royal-600 px-7 py-3.5 text-base font-semibold text-white shadow-[0_0_30px_-6px_rgba(250,141,210,0.5)] ring-1 ring-heritage/30 transition-all hover:-translate-y-0.5 hover:bg-lotus hover:text-royal-900"
          >
            Check eligibility
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <Link
            href="/admissions/apply"
            className="inline-flex items-center gap-2 rounded-full border border-royal-300 bg-ivory px-7 py-3.5 text-base font-semibold text-royal-700 transition-colors hover:bg-lotus/20"
          >
            Apply for a scholarship
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
