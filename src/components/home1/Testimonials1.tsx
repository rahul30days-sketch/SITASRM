'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'
import { mediaUrl } from '@/lib/homeData'
import { initials } from '@/lib/fallbackImages'

/* eslint-disable @typescript-eslint/no-explicit-any */

function Portrait({ t, size }: { t: any; size: number }) {
  const img = mediaUrl(t.profileImage)
  return (
    <div className="relative shrink-0 overflow-hidden rounded-full bg-[#0b1f3a]" style={{ height: size, width: size }}>
      {img ? (
        <Image src={img} alt={t.studentName} fill sizes={`${size}px`} className="object-cover" />
      ) : (
        <span className="flex h-full w-full items-center justify-center font-serif-display text-lg font-bold text-amber-300">{initials(t.studentName)}</span>
      )}
    </div>
  )
}

export default function Testimonials1({ testimonials }: { testimonials: any[] }) {
  if (!testimonials?.length) return null
  const [lead, ...rest] = testimonials
  const others = rest.slice(0, 2)

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">Voices of SITASRM</p>

        <motion.figure
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-8 border-t border-neutral-200 pt-10"
        >
          <blockquote className="font-serif-display max-w-4xl text-3xl font-medium leading-snug text-[#0b1f3a] sm:text-4xl lg:text-[2.75rem]">
            <span className="text-amber-400">“</span>
            {lead.testimonialText}
            <span className="text-amber-400">”</span>
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-4">
            <Portrait t={lead} size={64} />
            <div>
              <p className="font-serif-display text-lg font-semibold text-[#0b1f3a]">{lead.studentName}</p>
              <p className="text-sm text-neutral-500">
                {[lead.designation, lead.company].filter(Boolean).join(', ') || lead.batch}
              </p>
            </div>
          </figcaption>
        </motion.figure>

        {others.length > 0 && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-14 grid grid-cols-1 gap-10 border-t border-neutral-200 pt-12 md:grid-cols-2"
          >
            {others.map((t) => (
              <motion.figure key={t.id} variants={fadeUp}>
                <blockquote className="text-lg leading-relaxed text-neutral-600">“{t.testimonialText}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <Portrait t={t} size={44} />
                  <div>
                    <p className="font-semibold text-[#0b1f3a]">{t.studentName}</p>
                    <p className="text-sm text-neutral-500">{[t.designation, t.company].filter(Boolean).join(', ') || t.batch}</p>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
