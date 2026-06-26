'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { mediaUrl } from '@/lib/homeData'
import { HERO_IMAGES } from '@/lib/fallbackImages'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

/* eslint-disable @typescript-eslint/no-explicit-any */

const FALLBACK_MEDIA = [
  HERO_IMAGES.lab,
  HERO_IMAGES.research,
  HERO_IMAGES.lecture,
  HERO_IMAGES.library,
  HERO_IMAGES.students,
  HERO_IMAGES.campus,
]

type Item = {
  id: string
  name: string
  href: string
  desc: string
  img: string
}

export default function Departments2({
  departments,
  programs,
}: {
  departments: any[]
  programs: any[]
}) {
  let items: Item[] = (departments || []).slice(0, 6).map((d, i) => ({
    id: d.id || `d-${i}`,
    name: d.name,
    href: d.slug ? `/departments/${d.slug}` : '/departments',
    desc: d.shortDescription || 'Explore courses, faculty and research within this department.',
    img: mediaUrl(d?.images?.[0]?.image) || FALLBACK_MEDIA[i % FALLBACK_MEDIA.length],
  }))

  // Fallback: derive "departments" from distinct program categories/programs
  if (!items.length && programs?.length) {
    items = programs.slice(0, 6).map((p, i) => ({
      id: p.id || `p-${i}`,
      name: p.name,
      href: p.slug ? `/programs/${p.slug}` : '/programs',
      desc: p.shortDescription || `${p.duration || ''} program · ${p.totalSeats || ''} seats`.trim(),
      img: mediaUrl(p?.featuredImage) || FALLBACK_MEDIA[i % FALLBACK_MEDIA.length],
    }))
  }

  if (!items.length) return null

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Departments</p>
            <h2 className="font-modern mt-3 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
              Where your discipline lives
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Focused schools, each with dedicated labs, faculty and a community built around how you want to learn.
            </p>
          </div>
          <Link
            href="/departments"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-black/10 px-5 py-2.5 text-sm font-semibold text-neutral-800 transition-colors hover:bg-neutral-900 hover:text-white"
          >
            All departments
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((d) => (
            <motion.div key={d.id} variants={fadeUp}>
              <Link
                href={d.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-black/5 bg-neutral-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={d.img}
                    alt={d.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-modern text-xl font-bold tracking-tight text-neutral-900">{d.name}</h3>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-neutral-600">{d.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600">
                    Explore
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
