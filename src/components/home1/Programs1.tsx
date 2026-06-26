'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

/* eslint-disable @typescript-eslint/no-explicit-any */

const CAT: Record<string, string> = {
  undergraduate: 'Undergraduate',
  postgraduate: 'Postgraduate',
  diploma: 'Diploma',
  certificate: 'Certificate',
  phd: 'Doctoral',
}

export default function Programs1({ programs }: { programs: any[] }) {
  if (!programs?.length) return null

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:px-10">
        {/* Sticky editorial heading */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">Academics</p>
            <h2 className="font-serif-display mt-4 text-4xl font-bold leading-tight text-[#0b1f3a] lg:text-5xl">
              Schools &amp; programmes
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-neutral-500">
              Rigorous, future-facing degrees across engineering and applied sciences — each built
              with industry and taught by mentors who lead their fields.
            </p>
            <Link
              href="/programs"
              className="mt-7 inline-flex items-center gap-2 border-b-2 border-[#0b1f3a] pb-1 font-serif-display text-base font-semibold text-[#0b1f3a] transition-colors hover:border-amber-500 hover:text-amber-600"
            >
              View all programmes
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Editorial program rows */}
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="divide-y divide-neutral-200 border-t border-neutral-200 lg:col-span-8"
        >
          {programs.slice(0, 6).map((p, i) => (
            <motion.li key={p.id} variants={fadeUp}>
              <Link href={`/programs/${p.slug}`} className="group flex items-center gap-6 py-7 transition-colors">
                <span className="font-serif-display w-10 shrink-0 text-2xl font-medium text-neutral-300 transition-colors group-hover:text-amber-500">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif-display truncate text-2xl font-semibold text-[#0b1f3a] transition-colors group-hover:text-amber-700 lg:text-3xl">
                    {p.name}
                  </h3>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-500">
                    <span className="font-medium uppercase tracking-wide text-amber-600">{CAT[p.category] || p.category}</span>
                    {p.duration && <span>{p.duration}</span>}
                    {p.totalSeats && <span>{p.totalSeats} seats</span>}
                  </div>
                </div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-[#0b1f3a] transition-all group-hover:border-amber-500 group-hover:bg-amber-500 group-hover:text-white">
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:rotate-45" aria-hidden="true" />
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
