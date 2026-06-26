'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Users, Dumbbell, Home, Music } from 'lucide-react'
import { mediaUrl } from '@/lib/homeData'
import { HERO_IMAGES } from '@/lib/fallbackImages'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

/* eslint-disable @typescript-eslint/no-explicit-any */

const PILLARS = [
  { icon: Users, title: 'Clubs & Societies', desc: '30+ student-run clubs across tech, arts, debate and entrepreneurship.' },
  { icon: Dumbbell, title: 'Sports & Fitness', desc: 'Olympic-grade grounds, courts and a modern fitness centre.' },
  { icon: Home, title: 'Hostels & Living', desc: 'Secure, fully-equipped residences with vibrant community spaces.' },
  { icon: Music, title: 'Culture & Fests', desc: 'Annual festivals, concerts and showcases that light up the campus.' },
]

export default function Life3({ gallery, siteSettings }: { gallery: any[]; siteSettings: any }) {
  void siteSettings
  const img =
    mediaUrl(gallery?.find((g) => g?.category === 'student-life' || g?.category === 'events')?.images?.[0]?.image) ||
    mediaUrl(gallery?.[0]?.images?.[0]?.image) ||
    HERO_IMAGES.students

  return (
    <section aria-labelledby="life3-heading" className="relative overflow-hidden bg-neutral-950 py-24 lg:py-36">
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[32rem] w-[32rem] rounded-full bg-amber-500/[0.07] blur-[150px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1500px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center lg:gap-8">
          {/* Immersive image with overlapping card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="relative lg:col-span-6"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10">
              <Image src={img} alt="Life at SITASRM campus" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/30" aria-hidden="true" />
            </div>

            {/* Overlapping glass-dark stat card */}
            <div className="glass-dark absolute -bottom-8 -right-4 w-60 rounded-3xl border border-amber-300/20 p-6 shadow-2xl sm:-right-8 lg:-right-10">
              <p className="font-lux text-5xl font-extrabold text-amber-300">9.2</p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-white">Student life score</p>
              <p className="mt-2 text-xs leading-relaxed text-white/55">Rated by our graduating cohort, 2025.</p>
            </div>
          </motion.div>

          {/* Content + pillars */}
          <div className="lg:col-span-6 lg:pl-8">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
              <p className="font-lux text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Life at Campus</p>
              <h2 id="life3-heading" className="font-lux mt-4 text-5xl font-extrabold uppercase leading-[0.92] tracking-tight text-white sm:text-6xl">
                More than a<span className="text-gradient-gold"> degree</span>
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/65">
                Beyond the lecture hall, SERI is a living, breathing community — where friendships, ambition and culture collide to shape who you become.
              </p>
            </motion.div>

            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              {PILLARS.map((p) => {
                const Icon = p.icon
                return (
                  <motion.li
                    key={p.title}
                    variants={fadeUp}
                    className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all hover:-translate-y-1 hover:border-amber-300/40"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-300/25 bg-amber-300/5 text-amber-300">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="font-lux mt-4 text-lg font-bold uppercase tracking-tight text-white">{p.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/55">{p.desc}</p>
                  </motion.li>
                )
              })}
            </motion.ul>

            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
              <Link
                href="/gallery"
                className="group mt-9 inline-flex items-center gap-2 border-b border-amber-300/50 pb-1 font-lux text-base font-semibold uppercase tracking-wide text-amber-300 transition-colors hover:border-amber-300"
              >
                See campus life
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
