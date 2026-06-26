'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'
import { mediaUrl } from '@/lib/homeData'

/* eslint-disable @typescript-eslint/no-explicit-any */

function fmt(v?: string) {
  if (!v) return ''
  const d = new Date(v)
  return isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function News1({ news, events }: { news: any[]; events: any[] }) {
  if (!news?.length && !events?.length) return null
  const [feat, ...more] = news || []
  const featImg = feat ? mediaUrl(feat.featuredImage) : ''

  return (
    <section className="bg-neutral-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">Newsroom</p>
            <h2 className="font-serif-display mt-4 text-4xl font-bold text-[#0b1f3a] lg:text-5xl">News &amp; events</h2>
          </div>
          <Link href="/news" className="hidden font-serif-display font-semibold text-[#0b1f3a] underline-offset-8 hover:text-amber-600 hover:underline sm:block">
            All stories →
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Featured + more news */}
          <div className="lg:col-span-8">
            {feat && (
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
                <Link href={`/news/${feat.slug}`} className="group block">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-[#0b1f3a]">
                    {featImg && <Image src={featImg} alt={feat.title} fill sizes="(max-width:1024px) 100vw, 66vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f3a]/70 to-transparent" aria-hidden="true" />
                    <div className="absolute bottom-0 p-7">
                      <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">{(feat.type || 'news').replace('-', ' ')} · {fmt(feat.publishedAt)}</span>
                      <h3 className="font-serif-display mt-2 max-w-2xl text-2xl font-bold text-white lg:text-3xl">{feat.title}</h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce} className="mt-8 grid gap-6 sm:grid-cols-2">
              {more.slice(0, 2).map((n) => (
                <motion.article key={n.id} variants={fadeUp}>
                  <Link href={`/news/${n.slug}`} className="group block">
                    <span className="text-xs font-semibold uppercase tracking-widest text-amber-600">{fmt(n.publishedAt)}</span>
                    <h3 className="font-serif-display mt-1.5 text-xl font-semibold text-[#0b1f3a] transition-colors group-hover:text-amber-700">{n.title}</h3>
                    {n.excerpt && <p className="mt-2 line-clamp-2 text-sm text-neutral-500">{n.excerpt}</p>}
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </div>

          {/* Events rail */}
          {events?.length > 0 && (
            <div className="lg:col-span-4">
              <h3 className="font-serif-display text-xl font-bold text-[#0b1f3a]">Upcoming events</h3>
              <motion.ul variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce} className="mt-6 space-y-5">
                {events.slice(0, 4).map((e) => {
                  const d = e.startDate ? new Date(e.startDate) : null
                  return (
                    <motion.li key={e.id} variants={fadeUp}>
                      <Link href={`/events/${e.slug}`} className="group flex gap-4 border-b border-neutral-200 pb-5">
                        <div className="font-serif-display shrink-0 text-center">
                          <p className="text-2xl font-bold leading-none text-[#0b1f3a]">{d && !isNaN(d.getTime()) ? d.toLocaleDateString('en-IN', { day: '2-digit' }) : '--'}</p>
                          <p className="text-xs uppercase tracking-wide text-amber-600">{d && !isNaN(d.getTime()) ? d.toLocaleDateString('en-IN', { month: 'short' }) : ''}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold leading-snug text-[#0b1f3a] transition-colors group-hover:text-amber-700">{e.title}</h4>
                          {e.venue && <p className="mt-1 text-sm text-neutral-500">{e.venue}</p>}
                        </div>
                      </Link>
                    </motion.li>
                  )
                })}
              </motion.ul>
              <Link href="/events" className="mt-6 inline-flex items-center gap-1.5 font-serif-display font-semibold text-[#0b1f3a] hover:text-amber-600">
                View calendar <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
