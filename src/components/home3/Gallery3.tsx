'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { mediaUrl } from '@/lib/homeData'
import { HERO_IMAGES } from '@/lib/fallbackImages'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

/* eslint-disable @typescript-eslint/no-explicit-any */

type Tile = { src: string; title: string; category?: string }

// Editorial column-span / row-span pattern for an asymmetric mosaic (6 tiles).
const SPANS = [
  'sm:col-span-2 sm:row-span-2',
  'sm:col-span-1 sm:row-span-1',
  'sm:col-span-1 sm:row-span-1',
  'sm:col-span-1 sm:row-span-2',
  'sm:col-span-2 sm:row-span-1',
  'sm:col-span-1 sm:row-span-1',
]

const FALLBACK: Tile[] = [
  { src: HERO_IMAGES.campus, title: 'Main Campus', category: 'Campus' },
  { src: HERO_IMAGES.lab, title: 'Innovation Lab', category: 'Labs' },
  { src: HERO_IMAGES.library, title: 'Central Library', category: 'Library' },
  { src: HERO_IMAGES.students, title: 'Student Life', category: 'Life' },
  { src: HERO_IMAGES.lecture, title: 'Lecture Halls', category: 'Academics' },
  { src: HERO_IMAGES.graduation, title: 'Convocation', category: 'Events' },
]

export default function Gallery3({ gallery, departments }: { gallery: any[]; departments: any[] }) {
  // Flatten gallery[].images[].image, then top up from department images if thin.
  const fromGallery: Tile[] = (gallery || []).flatMap((g) =>
    (g?.images || [])
      .map((im: any) => ({ src: mediaUrl(im?.image), title: g?.title || 'Campus', category: g?.category }))
      .filter((t: Tile) => t.src),
  )
  const fromDepts: Tile[] = (departments || []).flatMap((d) =>
    (d?.images || [])
      .map((im: any) => ({ src: mediaUrl(im?.image), title: d?.name || 'Department', category: 'Academics' }))
      .filter((t: Tile) => t.src),
  )

  const collected = [...fromGallery, ...fromDepts]
  const tiles = (collected.length >= 4 ? collected : [...collected, ...FALLBACK]).slice(0, 6)

  return (
    <section aria-labelledby="gallery3-heading" className="relative overflow-hidden bg-neutral-950 py-24 lg:py-36">
      <div className="relative mx-auto max-w-[1500px] px-6 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
            <p className="font-lux text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">The Campus</p>
            <h2 id="gallery3-heading" className="font-lux mt-4 text-5xl font-extrabold uppercase leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-7xl">
              A world<span className="text-gradient-gold"> apart</span>
            </h2>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:border-amber-300/60 hover:text-amber-300"
            >
              View full gallery
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid auto-rows-[180px] grid-cols-1 gap-4 sm:grid-cols-3 lg:auto-rows-[210px]"
        >
          {tiles.map((t, i) => (
            <motion.figure
              key={`${t.src}-${i}`}
              variants={fadeUp}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 ${SPANS[i % SPANS.length]}`}
            >
              <Image
                src={t.src}
                alt={t.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/10 to-transparent opacity-90 transition-opacity group-hover:opacity-70" aria-hidden="true" />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-1 p-5 opacity-90 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {t.category && (
                  <span className="font-lux text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-300">{t.category}</span>
                )}
                <p className="font-lux text-lg font-bold uppercase tracking-tight text-white">{t.title}</p>
              </figcaption>
              <span className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-amber-300/0 transition-all group-hover:ring-amber-300/40" aria-hidden="true" />
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
