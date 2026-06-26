'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Handshake } from 'lucide-react'
import { mediaUrl } from '@/lib/homeData'
import { initials } from '@/lib/fallbackImages'
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from '@/lib/motion'

const TIER_RANK: Record<string, number> = { platinum: 0, gold: 1, silver: 2, bronze: 3 }

export default function Partners4({ recruiters }: { recruiters: any[] }) {
  if (!recruiters?.length) return null

  const sorted = [...recruiters].sort(
    (a, b) => (TIER_RANK[(a?.tier || '').toLowerCase()] ?? 9) - (TIER_RANK[(b?.tier || '').toLowerCase()] ?? 9),
  )

  return (
    <section className="relative overflow-hidden bg-ivory-light py-20 lg:py-28">
      <div className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-heritage/10 blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-heritage/40 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-heritage-dark shadow-sm">
            <Handshake className="h-3.5 w-3.5" aria-hidden="true" />
            Industry partners
          </span>
          <h2 className="font-signature mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-royal-700 sm:text-5xl">
            Built with the <span className="italic text-lotus">industry</span>, for the industry
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-royal-900/65">
            Curriculum, internships and live projects shaped alongside the companies that hire our graduates.
          </p>
        </motion.div>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
        >
          {sorted.map((r) => {
            const logo = mediaUrl(r.logo)
            return (
              <motion.li
                key={r.id ?? r.name}
                variants={scaleIn}
                className="flex h-24 items-center justify-center rounded-2xl border border-heritage/20 bg-white px-5 shadow-sm transition-all hover:-translate-y-1 hover:border-heritage/40 hover:shadow-md"
              >
                {logo ? (
                  <div className="relative h-12 w-full">
                    <Image
                      src={logo}
                      alt={r.name}
                      fill
                      sizes="200px"
                      className="object-contain opacity-85 transition-opacity hover:opacity-100"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-center">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-royal-600 to-lotus-dark text-sm font-bold text-white">
                      {initials(r.name)}
                    </span>
                    <span className="line-clamp-1 text-xs font-semibold text-royal-700">{r.name}</span>
                  </div>
                )}
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
