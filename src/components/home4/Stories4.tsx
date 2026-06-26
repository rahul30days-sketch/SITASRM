'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { mediaUrl } from '@/lib/homeData'
import { initials } from '@/lib/fallbackImages'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

function Stars({ rating }: { rating: number }) {
  const r = Math.max(0, Math.min(5, Math.round(rating || 5)))
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${r} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < r ? 'fill-heritage text-heritage' : 'fill-transparent text-white/25'}`}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

export default function Stories4({ testimonials }: { testimonials: any[] }) {
  if (!testimonials?.length) return null
  const items = testimonials.slice(0, 6)

  return (
    <section className="relative overflow-hidden bg-royal-950 py-20 lg:py-28">
      <div className="pointer-events-none absolute -left-24 top-10 h-96 w-96 rounded-full bg-lotus/15 blur-[130px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-heritage/12 blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-heritage/40 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-heritage backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rotate-45 bg-lotus" aria-hidden="true" />
            Student success stories
          </span>
          <h2 className="font-signature mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl">
            Voices of our <span className="italic text-lotus">alumni</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/70">
            Real journeys from classrooms to careers — in the words of the students who lived them.
          </p>
        </motion.div>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((t) => {
            const img = mediaUrl(t.profileImage)
            const sub = [t.designation, t.company].filter(Boolean).join(' · ')
            return (
              <motion.li
                key={t.id ?? t.studentName}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition-colors hover:border-heritage/30"
              >
                <Quote className="h-8 w-8 text-lotus/60" aria-hidden="true" />
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-white/80">
                  “{t.testimonialText}”
                </blockquote>
                <div className="mt-5">
                  <Stars rating={t.rating} />
                </div>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-white/10 pt-5">
                  {img ? (
                    <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-heritage/30">
                      <Image src={img} alt={t.studentName} fill sizes="48px" className="object-cover" />
                    </span>
                  ) : (
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-royal-500 to-lotus-dark text-sm font-bold text-white ring-2 ring-heritage/30">
                      {initials(t.studentName)}
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="font-signature text-base font-semibold text-white">{t.studentName}</p>
                    <p className="truncate text-xs text-white/55">
                      {sub}
                      {t.batch ? `${sub ? ' · ' : ''}Batch ${t.batch}` : ''}
                    </p>
                  </div>
                </figcaption>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
