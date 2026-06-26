'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

const AREAS = [
  { t: 'Artificial Intelligence & Data Science', d: 'Applied ML, computer vision and intelligent systems research with industry partners.' },
  { t: 'Sustainable & Renewable Energy', d: 'Smart grids, solar systems and clean-energy engineering for a net-zero future.' },
  { t: 'Robotics & Advanced Manufacturing', d: 'Automation, mechatronics and precision manufacturing innovation labs.' },
  { t: 'Materials & Structural Engineering', d: 'Next-generation materials, structural health and civil infrastructure research.' },
]

const METRICS = [
  { v: '180+', l: 'Publications' },
  { v: '24', l: 'Patents filed' },
  { v: '12', l: 'Research centres' },
  { v: '₹6 Cr+', l: 'Funded projects' },
]

export default function Research1() {
  return (
    <section className="bg-neutral-50 py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">Research &amp; innovation</p>
          <h2 className="font-serif-display mt-4 text-4xl font-bold leading-tight text-[#0b1f3a] lg:text-5xl">
            Knowledge that moves the world forward
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-neutral-500">
            Our researchers tackle the defining challenges of our age — from intelligent machines to
            clean energy — translating curiosity into patents, publications and real-world impact.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-neutral-200">
            {METRICS.map((m) => (
              <div key={m.l} className="bg-neutral-50 p-6">
                <dt className="font-serif-display text-3xl font-bold text-[#0b1f3a]">{m.v}</dt>
                <dd className="mt-1 text-sm text-neutral-500">{m.l}</dd>
              </div>
            ))}
          </dl>
          <Link href="/departments" className="mt-9 inline-flex items-center gap-2 border-b-2 border-[#0b1f3a] pb-1 font-serif-display font-semibold text-[#0b1f3a] hover:border-amber-500 hover:text-amber-600">
            Explore research centres <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="lg:col-span-7 lg:pt-4"
        >
          {AREAS.map((a, i) => (
            <motion.li key={a.t} variants={fadeUp} className="group flex gap-6 border-b border-neutral-200 py-7 first:border-t">
              <span className="font-serif-display text-lg font-medium text-amber-600">0{i + 1}</span>
              <div>
                <h3 className="font-serif-display text-2xl font-semibold text-[#0b1f3a] transition-colors group-hover:text-amber-700">{a.t}</h3>
                <p className="mt-2 max-w-xl leading-relaxed text-neutral-500">{a.d}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
