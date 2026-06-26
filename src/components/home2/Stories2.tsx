'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { mediaUrl } from '@/lib/homeData'
import { initials } from '@/lib/fallbackImages'
import { fadeUp, viewportOnce } from '@/lib/motion'

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function Stories2({ testimonials }: { testimonials: any[] }) {
  const items = testimonials?.slice(0, 8) || []
  if (!items.length) return null

  return (
    <section className="bg-neutral-50 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Student stories</p>
          <h2 className="font-modern mt-3 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
            The people behind the progress
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Real journeys from the students who turned ideas, late nights and lab hours into careers they love.
          </p>
        </motion.div>
      </div>

      {/* Horizontal scroll rail of immersive story cards */}
      <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* leading spacer to align with max-w-6xl */}
        <div className="shrink-0" aria-hidden="true" />
        {items.map((t, i) => {
          const img = mediaUrl(t.profileImage)
          const rating = Math.max(1, Math.min(5, t.rating || 5))
          return (
            <motion.article
              key={t.id || i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="group relative flex w-[85vw] shrink-0 snap-center flex-col overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-[0_20px_60px_-30px_rgba(0,0,0,0.3)] sm:w-[440px]"
            >
              {/* Top media band */}
              <div className="relative h-56 overflow-hidden">
                {img ? (
                  <Image
                    src={img}
                    alt={t.studentName || 'Student'}
                    fill
                    sizes="(max-width: 640px) 85vw, 440px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400">
                    <span className="font-modern text-5xl font-bold text-white/90">
                      {initials(t.studentName)}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" aria-hidden="true" />
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                  <div>
                    <p className="font-modern text-lg font-bold leading-tight text-white">{t.studentName}</p>
                    <p className="text-sm text-white/80">
                      {[t.designation, t.company].filter(Boolean).join(' · ') || t.batch}
                    </p>
                  </div>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white/20 backdrop-blur-md">
                    <Quote className="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                </div>
              </div>

              {/* Quote body */}
              <div className="flex flex-1 flex-col p-7">
                <div className="flex items-center gap-1 text-amber-500" aria-label={`${rating} out of 5`}>
                  {[...Array(rating)].map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-[17px] leading-relaxed text-neutral-700">
                  &ldquo;{t.testimonialText}&rdquo;
                </p>
                {t.batch && (
                  <p className="mt-5 text-sm font-medium text-neutral-400">Batch of {t.batch}</p>
                )}
              </div>
            </motion.article>
          )
        })}
        <div className="w-1 shrink-0" aria-hidden="true" />
      </div>
    </section>
  )
}
