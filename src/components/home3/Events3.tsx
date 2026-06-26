'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, MapPin, CalendarDays } from 'lucide-react'
import { mediaUrl } from '@/lib/homeData'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

/* eslint-disable @typescript-eslint/no-explicit-any */

function fmtDate(value?: string) {
  if (!value) return { day: '--', mon: '', full: '' }
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return { day: '--', mon: '', full: '' }
  return {
    day: d.toLocaleDateString('en-GB', { day: '2-digit' }),
    mon: d.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase(),
    full: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
  }
}

export default function Events3({ events }: { events: any[] }) {
  if (!events || events.length === 0) return null
  const list = events.slice(0, 5)

  return (
    <section aria-labelledby="events3-heading" className="relative overflow-hidden border-y border-white/10 bg-gradient-to-b from-neutral-950 via-[#0c0a06] to-neutral-950 py-24 lg:py-36">
      <div className="pointer-events-none absolute inset-0 bg-grid-lines opacity-30" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1500px] px-6 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
            <p className="font-lux text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">What&apos;s On</p>
            <h2 id="events3-heading" className="font-lux mt-4 text-5xl font-extrabold uppercase leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Upcoming<span className="text-gradient-gold"> events</span>
            </h2>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
            <Link
              href="/events"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:border-amber-300/60 hover:text-amber-300"
            >
              All events
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 flex flex-col"
        >
          {list.map((e) => {
            const d = fmtDate(e?.startDate)
            const img = mediaUrl(e?.images?.[0]?.image)
            return (
              <motion.li key={e.id} variants={fadeUp} className="group border-t border-white/10 last:border-b">
                <Link href={`/events/${e.slug}`} className="grid grid-cols-1 items-center gap-6 py-7 sm:grid-cols-12 sm:gap-8">
                  {/* Date block */}
                  <div className="flex items-center gap-4 sm:col-span-2">
                    <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl border border-amber-300/25 bg-amber-300/5 text-amber-300 transition-colors group-hover:bg-amber-300/15">
                      <span className="font-lux text-2xl font-extrabold leading-none">{d.day}</span>
                      <span className="text-[10px] font-semibold tracking-widest">{d.mon}</span>
                    </div>
                  </div>

                  {/* Title + meta */}
                  <div className="sm:col-span-6">
                    {e?.type && (
                      <span className="font-lux text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-300/80">{String(e.type).replace(/-/g, ' ')}</span>
                    )}
                    <h3 className="font-lux mt-1 text-2xl font-bold uppercase leading-tight tracking-tight text-white transition-colors group-hover:text-amber-300 lg:text-3xl">
                      {e.title}
                    </h3>
                    {e?.shortDescription && (
                      <p className="mt-2 line-clamp-2 max-w-xl text-sm leading-relaxed text-white/55">{e.shortDescription}</p>
                    )}
                    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-white/45">
                      {d.full && (
                        <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5 text-amber-300/70" aria-hidden="true" />{d.full}</span>
                      )}
                      {e?.venue && (
                        <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-amber-300/70" aria-hidden="true" />{e.venue}</span>
                      )}
                    </div>
                  </div>

                  {/* Thumb */}
                  <div className="sm:col-span-3">
                    {img ? (
                      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10">
                        <Image src={img} alt={e.title} fill sizes="(max-width: 640px) 100vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                    ) : (
                      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-amber-300/10 to-white/[0.03]" aria-hidden="true" />
                    )}
                  </div>

                  {/* Arrow */}
                  <div className="hidden justify-end sm:col-span-1 sm:flex">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-all group-hover:border-amber-300/60 group-hover:bg-amber-400 group-hover:text-neutral-950">
                      <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
