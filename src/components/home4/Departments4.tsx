'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, GraduationCap } from 'lucide-react'
import { mediaUrl } from '@/lib/homeData'
import { initials } from '@/lib/fallbackImages'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

type Tile = {
  key: string
  name: string
  desc?: string
  img: string
  href: string
  meta?: string
}

export default function Departments4({ departments, programs }: { departments: any[]; programs: any[] }) {
  let tiles: Tile[] = []

  if (departments?.length) {
    tiles = departments.slice(0, 6).map((d) => ({
      key: d.id ?? d.slug ?? d.name,
      name: d.name,
      desc: d.shortDescription,
      img: mediaUrl(d.images?.[0]?.image),
      href: d.slug ? `/departments/${d.slug}` : '/departments',
      meta: 'Department',
    }))
  } else if (programs?.length) {
    tiles = programs.slice(0, 6).map((p) => ({
      key: p.id ?? p.slug ?? p.name,
      name: p.name,
      desc: p.shortDescription,
      img: mediaUrl(p.featuredImage),
      href: p.slug ? `/programs/${p.slug}` : '/programs',
      meta: p.category || p.duration || 'Program',
    }))
  }

  if (!tiles.length) return null

  return (
    <section className="relative overflow-hidden bg-ivory-light py-20 lg:py-28">
      <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-lotus/12 blur-[120px]" aria-hidden="true" />

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
              <span className="h-1.5 w-1.5 rotate-45 bg-heritage" aria-hidden="true" />
              Schools &amp; departments
            </span>
            <h2 className="font-signature mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-royal-700 sm:text-5xl">
              Disciplines that shape <span className="italic text-lotus">visionaries</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-royal-900/65">
              From engineering and management to applied sciences — each department blends rigorous academics
              with industry-grade labs and mentorship.
            </p>
          </div>
          <Link
            href="/departments"
            className="group hidden shrink-0 items-center gap-2 rounded-full border border-royal-300 bg-ivory px-6 py-3 text-sm font-semibold text-royal-700 transition-colors hover:bg-lotus/20 sm:inline-flex"
          >
            View all
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
        </motion.div>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          {tiles.map((t) => (
            <motion.li key={t.key} variants={fadeUp} whileHover={{ y: -8 }}>
              <Link
                href={t.href}
                className="group block h-full overflow-hidden rounded-3xl border border-heritage/25 bg-white shadow-[0_8px_30px_-12px_rgba(48,41,112,0.18)] transition-shadow hover:shadow-[0_20px_55px_-14px_rgba(48,41,112,0.3)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {t.img ? (
                    <Image
                      src={t.img}
                      alt={t.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center bg-gradient-to-br from-royal-600 to-royal-800">
                      <span className="font-signature text-5xl font-bold text-lotus/90">{initials(t.name)}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-royal-950/55 via-transparent to-transparent" aria-hidden="true" />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-royal-700 backdrop-blur-sm">
                    <GraduationCap className="h-3.5 w-3.5 text-lotus-dark" aria-hidden="true" />
                    {t.meta}
                  </span>
                </div>
                <div className="p-7">
                  <h3 className="font-signature text-2xl font-semibold text-royal-700 transition-colors group-hover:text-lotus-dark">
                    {t.name}
                  </h3>
                  {t.desc && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-royal-900/60">{t.desc}</p>}
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-royal-600 transition-colors group-hover:text-lotus-dark">
                    Explore department
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
