'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Play, MapPin, Building2, FlaskConical, BookOpen } from 'lucide-react'
import { mediaUrl } from '@/lib/homeData'
import { HERO_IMAGES } from '@/lib/fallbackImages'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

/* eslint-disable @typescript-eslint/no-explicit-any */

const HIGHLIGHTS = [
  { icon: Building2, label: 'Academic blocks' },
  { icon: FlaskConical, label: 'Research labs' },
  { icon: BookOpen, label: 'Central library' },
  { icon: MapPin, label: 'Hostels & sports' },
]

export default function VirtualTour2({
  gallery,
  siteSettings,
}: {
  gallery: any[]
  siteSettings: any
}) {
  const img =
    mediaUrl(siteSettings?.hero?.backgroundImage) ||
    mediaUrl(gallery?.flatMap((g) => g?.images || [])?.[0]?.image) ||
    HERO_IMAGES.lecture

  return (
    <section className="bg-neutral-50 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative overflow-hidden rounded-[2.5rem]"
        >
          {/* Big campus image */}
          <div className="relative aspect-[16/12] sm:aspect-[16/9] lg:aspect-[16/8]">
            <Image
              src={img}
              alt="Virtual campus tour"
              fill
              sizes="(max-width: 1280px) 100vw, 1152px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/30" aria-hidden="true" />
          </div>

          {/* Glass play overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <Link
              href="/gallery"
              aria-label="Play virtual campus tour"
              className="group grid h-20 w-20 place-items-center rounded-full border border-white/40 bg-white/20 backdrop-blur-xl transition-transform hover:scale-105 sm:h-24 sm:w-24"
            >
              <span className="absolute inline-flex h-20 w-20 animate-ping rounded-full bg-white/20 sm:h-24 sm:w-24" aria-hidden="true" />
              <Play className="relative ml-1 h-8 w-8 fill-white text-white" aria-hidden="true" />
            </Link>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">Virtual tour</p>
            <h2 className="font-modern mt-2 max-w-2xl text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Walk the campus from wherever you are
            </h2>
          </div>

          {/* Highlights bar */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="absolute inset-x-4 bottom-4 grid grid-cols-2 gap-3 sm:inset-x-6 sm:bottom-6 sm:grid-cols-4"
          >
            {HIGHLIGHTS.map((h) => (
              <motion.div
                key={h.label}
                variants={fadeUp}
                className="flex items-center gap-2.5 rounded-2xl border border-white/30 bg-white/15 px-4 py-3 backdrop-blur-xl"
              >
                <h.icon className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
                <span className="text-sm font-medium text-white">{h.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
