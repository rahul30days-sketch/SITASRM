'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Cpu, Atom, Leaf, Bot } from 'lucide-react'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

/* eslint-disable @typescript-eslint/no-explicit-any */

const FALLBACK_AREAS = [
  { icon: Cpu, name: 'AI & Data Science', desc: 'Applied machine learning, computer vision and intelligent autonomous systems.' },
  { icon: Leaf, name: 'Sustainable Energy', desc: 'Smart grids, solar engineering and clean-energy systems for a net-zero future.' },
  { icon: Bot, name: 'Robotics & Automation', desc: 'Mechatronics, precision manufacturing and next-generation robotics labs.' },
  { icon: Atom, name: 'Advanced Materials', desc: 'Nanomaterials, structural health and the science of what comes next.' },
]

const ICONS = [Cpu, Leaf, Bot, Atom]

const METRICS = [
  { v: '180+', l: 'Publications' },
  { v: '24', l: 'Patents filed' },
  { v: '12', l: 'Research centres' },
  { v: '₹6 Cr+', l: 'Funded projects' },
]

export default function Research3({ siteSettings, departments }: { siteSettings: any; departments: any[] }) {
  void siteSettings
  const areas =
    departments && departments.length >= 3
      ? departments.slice(0, 4).map((d, i) => ({
          icon: ICONS[i % ICONS.length],
          name: d?.name || 'Research area',
          desc: d?.shortDescription || 'Pioneering research that translates curiosity into real-world impact.',
        }))
      : FALLBACK_AREAS

  return (
    <section aria-labelledby="research3-heading" className="relative overflow-hidden bg-neutral-950 py-24 lg:py-36">
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[34rem] w-[34rem] rounded-full bg-amber-500/[0.08] blur-[150px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1500px] px-6 lg:px-12">
        {/* Heading + intro + metrics rail */}
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="lg:col-span-7">
            <p className="font-lux text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Research at SERI</p>
            <h2 id="research3-heading" className="font-lux mt-5 text-5xl font-extrabold uppercase leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Knowledge that<br />
              <span className="text-gradient-gold">moves the world</span>
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/65">
              Our researchers confront the defining challenges of the age — from intelligent machines
              to clean energy — turning bold inquiry into patents, publications and lasting impact.
            </p>
            <Link
              href="/departments"
              className="group mt-9 inline-flex items-center gap-2 border-b border-amber-300/50 pb-1 font-lux text-base font-semibold uppercase tracking-wide text-amber-300 transition-colors hover:border-amber-300"
            >
              Explore research centres
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>
          </motion.div>

          <motion.dl
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-3xl border border-white/10 bg-white/5 lg:col-span-5"
          >
            {METRICS.map((m) => (
              <motion.div key={m.l} variants={fadeUp} className="bg-neutral-950/60 p-7">
                <dt className="font-lux text-4xl font-extrabold text-amber-300 lg:text-5xl">{m.v}</dt>
                <dd className="mt-2 text-sm uppercase tracking-wide text-white/55">{m.l}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>

        {/* Thrust-area tiles */}
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4"
        >
          {areas.map((a, i) => {
            const Icon = a.icon
            return (
              <motion.li
                key={`${a.name}-${i}`}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-7 transition-all hover:-translate-y-1 hover:border-amber-300/40"
              >
                <span className="pointer-events-none absolute -right-8 -top-8 font-lux text-8xl font-extrabold text-white/[0.04] transition-colors group-hover:text-amber-300/10">
                  0{i + 1}
                </span>
                <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-300/25 bg-amber-300/5 text-amber-300">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="font-lux relative mt-6 text-xl font-bold uppercase leading-tight tracking-tight text-white">{a.name}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-white/60">{a.desc}</p>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
