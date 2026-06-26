'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Trophy, HeartHandshake, Sparkles, GraduationCap } from 'lucide-react'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

/* eslint-disable @typescript-eslint/no-explicit-any */

const SCHOLARSHIPS = [
  { icon: Trophy, name: 'Merit Excellence', award: 'Up to 100%', desc: 'Full or partial tuition waivers for top-ranking entrance and board performers.' },
  { icon: HeartHandshake, name: 'Need-Based Aid', award: 'Up to 75%', desc: 'Financial assistance ensuring talent is never limited by circumstance.' },
  { icon: Sparkles, name: 'Sports & Talent', award: 'Up to 50%', desc: 'Recognising excellence in sports, arts, innovation and leadership.' },
  { icon: GraduationCap, name: 'Girl-Child Scholarship', award: '25% +', desc: 'Dedicated support advancing women in engineering and technology.' },
]

export default function Scholarships3({ siteSettings }: { siteSettings: any }) {
  void siteSettings

  return (
    <section aria-labelledby="scholarships3-heading" className="relative overflow-hidden bg-neutral-950 py-24 lg:py-36">
      <div className="pointer-events-none absolute -right-32 top-1/3 h-[30rem] w-[30rem] rounded-full bg-amber-500/[0.08] blur-[140px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1500px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="lg:col-span-7">
            <p className="font-lux text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Scholarships & Aid</p>
            <h2 id="scholarships3-heading" className="font-lux mt-5 text-5xl font-extrabold uppercase leading-[0.9] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Invest in
              <span className="block text-gradient-gold">your brilliance</span>
            </h2>
          </motion.div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="text-lg leading-relaxed text-white/65 lg:col-span-5 lg:pb-3"
          >
            Over ₹2 crore awarded annually. SERI&apos;s scholarship programmes make a premium engineering education attainable for every deserving mind.
          </motion.p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4"
        >
          {SCHOLARSHIPS.map((s) => {
            const Icon = s.icon
            return (
              <motion.article
                key={s.name}
                variants={fadeUp}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-amber-300/[0.06] to-transparent p-7 transition-all hover:-translate-y-1.5 hover:border-amber-300/40"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-300/25 bg-amber-300/10 text-amber-300 transition-colors group-hover:bg-amber-300/20">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <p className="font-lux mt-6 text-3xl font-extrabold text-gradient-gold">{s.award}</p>
                <h3 className="font-lux mt-1 text-lg font-bold uppercase tracking-tight text-white">{s.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">{s.desc}</p>
              </motion.article>
            )
          })}
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="mt-10">
          <Link
            href="/admissions"
            className="group inline-flex items-center gap-2 rounded-full bg-amber-400 px-7 py-3.5 text-sm font-semibold text-neutral-950 transition-all hover:-translate-y-0.5 hover:bg-amber-300"
          >
            Explore eligibility & apply
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
