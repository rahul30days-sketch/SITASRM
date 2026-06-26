'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Mail } from 'lucide-react'
import { mediaUrl } from '@/lib/homeData'
import { initials } from '@/lib/fallbackImages'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

/* eslint-disable @typescript-eslint/no-explicit-any */

const LINKEDIN_PATH =
  'M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3 0-2.95-1.8-2.95s-2.07 1.4-2.07 2.85V21H9z'

export default function Faculty2({ faculty }: { faculty: any[] }) {
  const items = faculty?.slice(0, 8) || []
  if (!items.length) return null

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Faculty</p>
            <h2 className="font-modern mt-3 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
              Mentors who&rsquo;ve built things
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Researchers, engineers and practitioners who teach from experience — and stay close while you find your footing.
            </p>
          </div>
          <Link
            href="/faculty"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-black/10 px-5 py-2.5 text-sm font-semibold text-neutral-800 transition-colors hover:bg-neutral-900 hover:text-white"
          >
            Meet the faculty
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4"
        >
          {items.map((f, i) => {
            const img = mediaUrl(f.profileImage)
            return (
              <motion.div key={f.id || i} variants={fadeUp}>
                <Link
                  href={f.slug ? `/faculty/${f.slug}` : '/faculty'}
                  className="group block overflow-hidden rounded-[1.5rem] border border-black/5 bg-neutral-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-28px_rgba(0,0,0,0.35)]"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    {img ? (
                      <Image
                        src={img}
                        alt={f.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400">
                        <span className="font-modern text-4xl font-bold text-white/90">{initials(f.name)}</span>
                      </div>
                    )}
                    {/* Hover social chip */}
                    <div className="absolute right-3 top-3 flex translate-y-1 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {f.linkedin && (
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-white/85 text-neutral-700 backdrop-blur">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                            <path d={LINKEDIN_PATH} />
                          </svg>
                        </span>
                      )}
                      {f.email && (
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-white/85 text-neutral-700 backdrop-blur">
                          <Mail className="h-4 w-4" aria-hidden="true" />
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-modern text-base font-bold leading-tight text-neutral-900">{f.name}</h3>
                    <p className="mt-1 line-clamp-1 text-sm text-neutral-500">{f.designation}</p>
                    {(f.department?.name || f.specialization) && (
                      <p className="mt-2 line-clamp-1 text-xs font-medium text-blue-600">
                        {f.department?.name || f.specialization}
                      </p>
                    )}
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
