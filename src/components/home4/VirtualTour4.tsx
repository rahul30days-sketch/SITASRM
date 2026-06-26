'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Play, X, MapPin, Microscope, BookOpen, Trees, ArrowRight } from 'lucide-react'
import { mediaUrl } from '@/lib/homeData'
import { HERO_IMAGES } from '@/lib/fallbackImages'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

const HIGHLIGHTS = [
  { icon: Microscope, label: 'Advanced laboratories' },
  { icon: BookOpen, label: 'Central library' },
  { icon: Trees, label: 'Green, walkable campus' },
  { icon: MapPin, label: 'Hostels & sports complex' },
]

export default function VirtualTour4({ gallery }: { gallery: any[] }) {
  const [open, setOpen] = useState(false)

  const img =
    mediaUrl((gallery || []).find((g) => g?.category === 'campus')?.images?.[0]?.image) ||
    mediaUrl((gallery || [])[0]?.images?.[0]?.image) ||
    HERO_IMAGES.campus

  return (
    <section className="relative overflow-hidden bg-royal-950 py-20 lg:py-28">
      <div className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-lotus/15 blur-[130px]" aria-hidden="true" />

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
            Virtual campus tour
          </span>
          <h2 className="font-signature mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl">
            Step inside, from <span className="italic text-lotus">anywhere</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/70">
            Take an immersive walk through our laboratories, library, hostels and lush green campus — wherever
            you are.
          </p>
        </motion.div>

        {/* Full-width image panel */}
        <motion.figure
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative mt-12 aspect-[16/9] overflow-hidden rounded-[2rem] border border-heritage/30 ring-1 ring-heritage/20 sm:aspect-[21/9]"
        >
          <Image src={img} alt="SITASRM campus aerial view" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-royal-950/85 via-royal-950/25 to-royal-950/40" aria-hidden="true" />

          {/* Glass play button */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group absolute inset-0 grid place-items-center"
            aria-label="Play virtual campus tour"
          >
            <span className="relative grid h-20 w-20 place-items-center rounded-full border border-white/40 bg-white/15 backdrop-blur-md transition-all group-hover:scale-110 group-hover:bg-lotus group-hover:text-royal-900 sm:h-24 sm:w-24">
              <span className="absolute inset-0 animate-ping rounded-full bg-lotus/30" aria-hidden="true" />
              <Play className="relative h-8 w-8 translate-x-0.5 fill-current text-white transition-colors group-hover:text-royal-900" aria-hidden="true" />
            </span>
          </button>

          {/* Highlights overlay */}
          <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {HIGHLIGHTS.map((h) => {
                const Icon = h.icon
                return (
                  <li key={h.label} className="flex items-center gap-2 text-sm font-medium text-white/85">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-lotus backdrop-blur-sm">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    {h.label}
                  </li>
                )
              })}
            </ul>
          </figcaption>
        </motion.figure>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <motion.div variants={fadeUp}>
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-2 rounded-full border border-heritage bg-transparent px-7 py-3.5 text-base font-semibold text-white shadow-[0_0_30px_-6px_rgba(250,141,210,0.5)] transition-all hover:-translate-y-0.5 hover:bg-lotus hover:text-royal-900"
            >
              Explore the gallery
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-lotus/50 hover:text-lotus"
            >
              Book a campus visit
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Lightweight modal placeholder for the tour */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Virtual campus tour"
          className="fixed inset-0 z-[200] grid place-items-center bg-royal-950/90 p-6 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-heritage/30 bg-royal-900 ring-1 ring-heritage/20"
            onClick={(ev) => ev.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-lotus hover:text-royal-900"
              aria-label="Close tour"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="relative aspect-video">
              <Image src={img} alt="SITASRM campus" fill sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 grid place-items-center bg-royal-950/70 p-8 text-center">
                <div>
                  <p className="font-signature text-2xl font-semibold text-white">Virtual tour coming soon</p>
                  <p className="mt-2 text-sm text-white/70">
                    Meanwhile, browse our campus gallery or book an on-campus visit.
                  </p>
                  <Link
                    href="/gallery"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-lotus px-6 py-3 text-sm font-semibold text-royal-900 ring-1 ring-heritage/40 transition-colors hover:bg-lotus-light"
                  >
                    Open gallery
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
