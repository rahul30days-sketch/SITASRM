'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CalendarDays, MapPin, ArrowUpRight, ArrowRight, Newspaper } from 'lucide-react'
import { mediaUrl } from '@/lib/homeData'
import { initials } from '@/lib/fallbackImages'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

function fmtDate(value?: string): string {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function News4({ news, events }: { news: any[]; events: any[] }) {
  const newsItems = (news || []).slice(0, 3)
  const eventItems = (events || []).slice(0, 4)
  if (!newsItems.length && !eventItems.length) return null

  return (
    <section className="relative overflow-hidden bg-ivory-light py-20 lg:py-28">
      <div className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-lotus/12 blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-heritage/40 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-heritage-dark shadow-sm">
              <Newspaper className="h-3.5 w-3.5" aria-hidden="true" />
              News &amp; events
            </span>
            <h2 className="font-signature mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-royal-700 sm:text-5xl">
              What&apos;s happening at <span className="italic text-lotus">SITASRM</span>
            </h2>
          </div>
          <Link
            href="/news"
            className="group hidden shrink-0 items-center gap-2 rounded-full border border-royal-300 bg-ivory px-6 py-3 text-sm font-semibold text-royal-700 transition-colors hover:bg-lotus/20 sm:inline-flex"
          >
            All news
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* News cards */}
          {newsItems.length > 0 && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className={`grid grid-cols-1 gap-7 sm:grid-cols-2 ${eventItems.length ? 'lg:col-span-2' : 'lg:col-span-3 lg:grid-cols-3'}`}
            >
              {newsItems.map((n) => {
                const img = mediaUrl(n.featuredImage)
                return (
                  <motion.article key={n.id ?? n.slug} variants={fadeUp} whileHover={{ y: -6 }} className="h-full">
                    <Link
                      href={n.slug ? `/news/${n.slug}` : '/news'}
                      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-heritage/25 bg-white shadow-[0_8px_30px_-12px_rgba(48,41,112,0.18)] transition-shadow hover:shadow-[0_18px_50px_-12px_rgba(48,41,112,0.28)]"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        {img ? (
                          <Image
                            src={img}
                            alt={n.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-royal-600 to-royal-800">
                            <span className="font-signature text-4xl font-bold text-lotus/90">{initials(n.title)}</span>
                          </div>
                        )}
                        {n.type && (
                          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-royal-700 backdrop-blur-sm">
                            {n.type}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        {n.publishedAt && (
                          <p className="flex items-center gap-1.5 text-xs font-medium text-royal-900/50">
                            <CalendarDays className="h-3.5 w-3.5 text-lotus-dark" aria-hidden="true" />
                            {fmtDate(n.publishedAt)}
                          </p>
                        )}
                        <h3 className="font-signature mt-2 line-clamp-2 text-xl font-semibold text-royal-700 transition-colors group-hover:text-lotus-dark">
                          {n.title}
                        </h3>
                        {n.excerpt && <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-royal-900/60">{n.excerpt}</p>}
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-royal-600 transition-colors group-hover:text-lotus-dark">
                          Read more
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                        </span>
                      </div>
                    </Link>
                  </motion.article>
                )
              })}
            </motion.div>
          )}

          {/* Events list */}
          {eventItems.length > 0 && (
            <motion.aside
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className={`rounded-3xl border border-heritage/25 bg-white p-7 shadow-[0_8px_30px_-12px_rgba(48,41,112,0.18)] ${newsItems.length ? 'lg:col-span-1' : 'lg:col-span-3'}`}
            >
              <h3 className="font-signature text-2xl font-semibold text-royal-700">Upcoming events</h3>
              <ul className="mt-6 space-y-5">
                {eventItems.map((e) => (
                  <li key={e.id ?? e.slug} className="border-b border-heritage/15 pb-5 last:border-0 last:pb-0">
                    <Link href={e.slug ? `/events/${e.slug}` : '/events'} className="group block">
                      <div className="flex items-start gap-3">
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-royal-600/10 text-royal-700">
                          <CalendarDays className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                          <h4 className="line-clamp-2 text-base font-semibold text-royal-900 transition-colors group-hover:text-lotus-dark">
                            {e.title}
                          </h4>
                          <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-royal-900/55">
                            {e.startDate && (
                              <span className="inline-flex items-center gap-1">
                                <CalendarDays className="h-3.5 w-3.5 text-heritage-dark" aria-hidden="true" />
                                {fmtDate(e.startDate)}
                              </span>
                            )}
                            {e.venue && (
                              <span className="inline-flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5 text-heritage-dark" aria-hidden="true" />
                                {e.venue}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/events"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-royal-600 transition-colors hover:text-lotus-dark"
              >
                View all events
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </motion.aside>
          )}
        </div>
      </div>
    </section>
  )
}
