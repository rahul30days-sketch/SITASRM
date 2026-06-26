'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin, Sparkles, Trees, BookOpen } from 'lucide-react'
import { mediaUrl } from '@/lib/homeData'
import { HERO_IMAGES } from '@/lib/fallbackImages'
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from '@/lib/motion'

export default function CampusExperience4({ gallery }: { gallery: any[] }) {
  // Flatten every gallery image into a single ordered list of URLs.
  const flat: string[] = (gallery || [])
    .flatMap((g) => (g?.images || []).map((im: any) => mediaUrl(im?.image)))
    .filter(Boolean)

  // Build a stable set of 5 images, topping up from curated hero art if sparse.
  const fallbacks = [
    HERO_IMAGES.campus,
    HERO_IMAGES.library,
    HERO_IMAGES.lab,
    HERO_IMAGES.students,
  ]
  const imgs: string[] = [...flat]
  for (const f of fallbacks) {
    if (imgs.length >= 4) break
    if (!imgs.includes(f)) imgs.push(f)
  }
  const [a, b, c, d] = imgs

  const facts = [
    { icon: Trees, value: '25 acres', label: 'Green campus' },
    { icon: BookOpen, value: '50,000+', label: 'Library volumes' },
  ]

  return (
    <section className="relative overflow-hidden bg-royal-950 py-20 lg:py-28">
      <div className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-lotus/15 blur-[130px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-heritage/12 blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          {/* Copy */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-heritage/40 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-heritage backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rotate-45 bg-lotus" aria-hidden="true" />
              Life at SITASRM
            </span>
            <h2 className="font-signature mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl">
              A campus that <span className="italic text-lotus">inspires</span> belonging
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/70">
              Sunlit studios, state-of-the-art laboratories, a vast central library and vibrant student
              commons — every corner is designed for curiosity, collaboration and calm.
            </p>

            <div className="mt-9 grid grid-cols-2 gap-4 sm:max-w-md">
              {facts.map((f) => {
                const Icon = f.icon
                return (
                  <div
                    key={f.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-lotus/20 text-lotus">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <p className="font-signature mt-4 text-2xl font-bold text-white">{f.value}</p>
                    <p className="text-sm text-white/55">{f.label}</p>
                  </div>
                )
              })}
            </div>

            <p className="mt-7 flex items-center gap-2 text-sm text-white/60">
              <MapPin className="h-4 w-4 text-heritage" aria-hidden="true" />
              Greater Noida · Delhi NCR
            </p>
          </motion.div>

          {/* Varied image mosaic */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="relative grid grid-cols-2 gap-4"
          >
            {a && (
              <motion.figure
                variants={scaleIn}
                className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 ring-1 ring-heritage/20"
              >
                <Image src={a} alt="SITASRM campus" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
              </motion.figure>
            )}
            {b && (
              <motion.figure
                variants={scaleIn}
                className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10"
              >
                <Image src={b} alt="Central library" fill sizes="(max-width: 1024px) 50vw, 20vw" className="object-cover" />
              </motion.figure>
            )}
            {c && (
              <motion.figure
                variants={scaleIn}
                className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10"
              >
                <Image src={c} alt="Advanced laboratory" fill sizes="(max-width: 1024px) 50vw, 20vw" className="object-cover" />
              </motion.figure>
            )}
            {d && (
              <motion.figure
                variants={scaleIn}
                className="relative col-span-2 aspect-[16/7] overflow-hidden rounded-3xl border border-white/10"
              >
                <Image src={d} alt="Students on campus" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
              </motion.figure>
            )}

            {/* Floating glass fact card */}
            <motion.div
              variants={scaleIn}
              className="absolute -bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-heritage/30 bg-ivory/95 px-5 py-3.5 shadow-2xl backdrop-blur-sm"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-lotus text-royal-900">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-signature text-lg font-bold leading-none text-royal-700">100% Wi-Fi</p>
                <p className="mt-0.5 text-xs font-medium text-royal-900/60">Smart, connected campus</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
