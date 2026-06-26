'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, MapPin, Building2, Trees, Wifi } from 'lucide-react'
import { mediaUrl } from '@/lib/homeData'
import { HERO_IMAGES } from '@/lib/fallbackImages'
import { fadeUp, viewportOnce } from '@/lib/motion'

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function CampusExperience2({
  gallery,
  siteSettings,
}: {
  gallery: any[]
  siteSettings: any
}) {
  const imgs: string[] = (gallery || [])
    .flatMap((g) => (g?.images || []).map((im: any) => mediaUrl(im?.image)))
    .filter(Boolean)

  const main = imgs[0] || HERO_IMAGES.campus
  const second = imgs[1] || HERO_IMAGES.library
  const third = imgs[2] || HERO_IMAGES.lab

  const acres = siteSettings?.stats?.campusAcres
  const facts = [
    { icon: Building2, label: 'Modern labs', value: 'State-of-the-art' },
    { icon: Trees, label: 'Green campus', value: acres ? `${acres} acres` : 'Open campus' },
    { icon: Wifi, label: 'Connected', value: 'Smart classrooms' },
  ]

  return (
    <section className="bg-neutral-50 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Campus experience</p>
          <h2 className="font-modern mt-3 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
            A place that makes the work feel possible
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Light-filled studios, maker labs and quiet corners — designed so the day flows from lecture to lab to late-night build session.
          </p>
        </motion.div>

        {/* Bento-style image layout with floating glass facts */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative mt-12 grid grid-cols-1 gap-5 lg:grid-cols-12"
        >
          {/* Large hero tile */}
          <div className="relative col-span-1 overflow-hidden rounded-[2rem] lg:col-span-8">
            <div className="relative aspect-[16/11] lg:aspect-[16/10]">
              <Image
                src={main}
                alt="SITASRM campus life"
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" aria-hidden="true" />
            </div>

            {/* Floating glass fact card */}
            <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-3 sm:right-auto">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-3 rounded-2xl border border-white/50 bg-white/65 px-4 py-3 shadow-lg backdrop-blur-2xl"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white">
                    <f.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-bold leading-none text-neutral-900">{f.value}</p>
                    <p className="mt-0.5 text-xs text-neutral-500">{f.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right stacked tiles */}
          <div className="col-span-1 grid grid-cols-2 gap-5 lg:col-span-4 lg:grid-cols-1">
            <div className="relative overflow-hidden rounded-[2rem]">
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[180px]">
                <Image
                  src={second}
                  alt="Campus library"
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>
            <Link
              href="/gallery"
              className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-neutral-900 p-6 text-white"
            >
              <Image
                src={third}
                alt=""
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover opacity-40 transition-opacity duration-500 group-hover:opacity-55"
                aria-hidden="true"
              />
              <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur">
                <MapPin className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="relative mt-8">
                <p className="font-modern text-xl font-bold leading-tight">See the full campus</p>
                <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300">
                  Open gallery
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
