'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

/* Loose pass-through types — raw Payload docs. */
interface Testimonial {
  id?: string
  studentName?: string
  batch?: string
  company?: string
  designation?: string
  testimonialText?: string
  rating?: number
  program?: { name?: string } | string | null
  profileImage?: { url?: string } | null
  [key: string]: unknown
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[]
  className?: string
}

function getInitials(name: string): string {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('') || '?'
  )
}

function StarRow({ rating }: { rating: number }) {
  const safe = Math.max(0, Math.min(5, Math.round(rating)))
  return (
    <div
      className="flex items-center justify-center gap-1"
      aria-label={`${safe} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            'h-5 w-5',
            i < safe ? 'fill-gold text-gold' : 'fill-border text-border',
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

/* How many cards to advance per "page". Desktop shows up to 3 at a time. */
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
}

function TestimonialCard({ item }: { item: Testimonial }) {
  const name = item.studentName ?? 'Student'
  const imageUrl = item.profileImage?.url
  const metaParts = [item.batch, item.company, item.designation].filter(
    (p): p is string => typeof p === 'string' && p.length > 0,
  )
  const programName =
    item.program && typeof item.program === 'object'
      ? item.program.name
      : undefined

  return (
    <div
      className={cn(
        'relative flex h-full flex-col overflow-hidden',
        'rounded-lg bg-white p-7 sm:p-8',
        'shadow-card border border-border/60',
      )}
    >
      {/* Decorative quote mark */}
      <Quote
        className="pointer-events-none absolute -right-2 -top-3 h-24 w-24 text-gold opacity-15"
        aria-hidden="true"
      />

      {/* Program pill */}
      {programName ? (
        <span className="relative z-10 mb-4 inline-flex w-fit items-center rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-secondary-dark">
          {programName}
        </span>
      ) : null}

      {/* Quote text */}
      <blockquote className="relative z-10 flex-1 font-display text-lg italic leading-relaxed text-text">
        {item.testimonialText ?? ''}
      </blockquote>

      {/* Rating */}
      {typeof item.rating === 'number' ? (
        <div className="relative z-10 mt-5 flex justify-start">
          <StarRow rating={item.rating} />
        </div>
      ) : null}

      {/* Footer: photo + name + meta */}
      <div className="relative z-10 mt-6 flex items-center gap-4 border-t border-border/60 pt-5">
        {imageUrl ? (
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-gold/30">
            <Image
              src={imageUrl}
              alt={name}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-navy text-lg font-semibold text-white ring-2 ring-gold/30">
            {getInitials(name)}
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate font-semibold text-navy">{name}</p>
          {metaParts.length > 0 ? (
            <p className="truncate text-sm text-text-muted">
              {metaParts.join(' · ')}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsSection({
  testimonials = [],
  className,
}: TestimonialsSectionProps) {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0])
  const [perView, setPerView] = useState(3)

  // Responsive cards-per-view: 1 on mobile, 2 on tablet, 3 on desktop.
  useEffect(() => {
    const apply = () => {
      const w = window.innerWidth
      setPerView(w < 640 ? 1 : w < 1024 ? 2 : 3)
    }
    apply()
    window.addEventListener('resize', apply)
    return () => window.removeEventListener('resize', apply)
  }, [])

  const totalPages = Math.max(1, Math.ceil(testimonials.length / perView))
  const safePage = Math.min(page, totalPages - 1)

  const paginate = useCallback(
    (newDirection: number) => {
      setPage(([prev]) => {
        const next = (prev + newDirection + totalPages) % totalPages
        return [next, newDirection]
      })
    },
    [totalPages],
  )

  if (testimonials.length === 0) return null

  const start = safePage * perView
  const visible = testimonials.slice(start, start + perView)

  return (
    <section className={cn('bg-surface py-16 sm:py-20 lg:py-24', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mb-12 text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl font-bold text-navy sm:text-4xl lg:text-5xl"
          >
            Success Stories
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-lg text-text-muted"
          >
            Hear from the students and alumni who built their futures at SERI.
          </motion.p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={safePage}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) paginate(1)
                  else if (info.offset.x > 60) paginate(-1)
                }}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {visible.map((item, i) => (
                  <TestimonialCard key={item.id ?? start + i} item={item} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Arrows */}
          {totalPages > 1 && (
            <>
              <button
                type="button"
                onClick={() => paginate(-1)}
                aria-label="Previous testimonials"
                className={cn(
                  'absolute top-1/2 -left-3 -translate-y-1/2 lg:-left-6',
                  'flex h-11 w-11 items-center justify-center rounded-full',
                  'bg-white text-navy shadow-card',
                  'transition-colors duration-200 hover:bg-navy hover:text-white',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2',
                )}
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => paginate(1)}
                aria-label="Next testimonials"
                className={cn(
                  'absolute top-1/2 -right-3 -translate-y-1/2 lg:-right-6',
                  'flex h-11 w-11 items-center justify-center rounded-full',
                  'bg-white text-navy shadow-card',
                  'transition-colors duration-200 hover:bg-navy hover:text-white',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2',
                )}
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </>
          )}
        </div>

        {/* Dots */}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage([i, i > safePage ? 1 : -1])}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === safePage}
                className={cn(
                  'h-2.5 rounded-full transition-all duration-300',
                  i === safePage
                    ? 'w-8 bg-gold'
                    : 'w-2.5 bg-navy/20 hover:bg-navy/40',
                )}
              />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 rounded-full border border-navy px-6 py-3 text-sm font-semibold text-navy transition-colors duration-200 hover:bg-navy hover:text-white"
          >
            View All Stories
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
