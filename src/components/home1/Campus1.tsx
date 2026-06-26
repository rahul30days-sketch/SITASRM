'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { fadeUp, viewportOnce } from '@/lib/motion'
import { mediaUrl } from '@/lib/homeData'
import { HERO_IMAGES } from '@/lib/fallbackImages'

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function Campus1({ gallery }: { gallery: any[] }) {
  const shots: string[] = []
  ;(gallery || []).forEach((g) => (g?.images || []).forEach((im: any) => {
    const u = mediaUrl(im?.image)
    if (u) shots.push(u)
  }))
  const hero = shots[0] || HERO_IMAGES.library
  const thumbs = (shots.length >= 4 ? shots.slice(1, 5) : [HERO_IMAGES.lab, HERO_IMAGES.lecture, HERO_IMAGES.students, HERO_IMAGES.graduation])

  const pills = [
    { v: '50+', l: 'Acre green campus' },
    { v: '24/7', l: 'Smart library' },
    { v: '12', l: 'Hostels & messes' },
  ]

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[2rem]">
          <div className="relative h-[60vh] min-h-[460px] w-full">
            <Image src={hero} alt="SITASRM campus life" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f3a] via-[#0b1f3a]/30 to-transparent" aria-hidden="true" />
          </div>

          {/* Overlaid copy */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="absolute inset-x-0 bottom-0 p-7 sm:p-10 lg:p-14"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Campus life</p>
            <h2 className="font-serif-display mt-3 max-w-2xl text-4xl font-bold leading-tight text-white lg:text-5xl">
              A place to live, learn and belong
            </h2>
            <div className="mt-7 flex flex-wrap items-center gap-8">
              {pills.map((p) => (
                <div key={p.l}>
                  <p className="font-serif-display text-3xl font-bold text-white">{p.v}</p>
                  <p className="text-sm text-white/70">{p.l}</p>
                </div>
              ))}
              <Link href="/gallery" className="ml-auto hidden items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0b1f3a] transition-transform hover:-translate-y-0.5 sm:inline-flex">
                Explore the campus
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Thumbnail strip */}
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {thumbs.map((t, i) => (
            <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image src={t} alt="" fill sizes="(max-width:640px) 50vw, 25vw" className="object-cover transition-transform duration-500 hover:scale-105" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
