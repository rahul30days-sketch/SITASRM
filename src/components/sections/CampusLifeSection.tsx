'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

interface GalleryDoc {
  id?: string
  title?: string
  category?: string
  images?: { image?: { url?: string; alt?: string } | null }[]
}

interface CampusImage {
  key: string
  url: string
  alt: string
  title?: string
  label?: string
}

interface CampusLifeSectionProps {
  images?: GalleryDoc[]
  className?: string
}

function GalleryTile({
  image,
  className,
}: {
  image: CampusImage
  className?: string
}) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lg',
        className,
      )}
    >
      <Image
        src={image.url}
        alt={image.alt}
        fill
        sizes="(max-width: 768px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Base gradient overlay (always present, deepens on hover) */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/10 to-transparent transition-opacity duration-300 group-hover:from-navy-deep/90" />

      {/* Category chip */}
      {image.label ? (
        <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-gold/90 px-3 py-1 text-xs font-semibold text-navy shadow-sm">
          {image.label}
        </span>
      ) : null}

      {/* Title revealed on hover */}
      <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="font-display text-sm font-semibold text-white md:text-base">
          {image.title || image.alt}
        </p>
      </div>
    </div>
  )
}

export default function CampusLifeSection({
  images = [],
  className,
}: CampusLifeSectionProps) {
  // Map each gallery doc to its first usable image; drop docs without a URL.
  const gallery: CampusImage[] = images
    .map((doc, index): CampusImage | null => {
      const first = doc.images?.[0]?.image
      const url = first?.url
      if (!url) return null
      return {
        key: doc.id ?? `${url}-${index}`,
        url,
        alt: first?.alt || doc.title || 'Campus life at SERI',
        title: doc.title,
        label: doc.category || doc.title,
      }
    })
    .filter((img): img is CampusImage => img !== null)
    .slice(0, 5)

  if (gallery.length === 0) return null

  const [feature, ...rest] = gallery
  const grid = rest.slice(0, 4)

  return (
    <section
      className={cn('relative overflow-hidden bg-navy py-16 sm:py-20 lg:py-24', className)}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-grid-lines opacity-50"
        aria-hidden="true"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* Heading */}
        <motion.div variants={fadeUp} className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Life at <span className="text-gradient-gold">SERI</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
            A vibrant campus where ideas, culture, and community come together.
          </p>
        </motion.div>

        {/* Asymmetric gallery grid */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:grid-rows-2"
        >
          {/* Large feature tile: 2 cols x 2 rows on desktop */}
          <GalleryTile
            image={feature}
            className="col-span-2 aspect-square md:row-span-2 md:aspect-auto md:min-h-[440px]"
          />

          {/* 2x2 smaller tiles */}
          {grid.map((image) => (
            <GalleryTile
              key={image.key}
              image={image}
              className="aspect-square md:aspect-auto md:min-h-[212px]"
            />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div variants={fadeUp} className="mt-12 text-center">
          <Link
            href="/gallery"
            className={cn(
              'group inline-flex items-center gap-2 rounded-full px-6 py-3',
              'border-2 border-gold text-sm font-semibold text-gold',
              'transition-colors duration-200 hover:bg-gold hover:text-navy',
            )}
          >
            Explore Campus
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
