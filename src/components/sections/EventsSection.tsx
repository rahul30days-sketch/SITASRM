'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, ArrowRight } from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

/* Loose pass-through types — raw Payload docs. */
interface EventItem {
  id?: string
  title?: string
  slug?: string
  startDate?: string
  endDate?: string
  venue?: string
  type?: string
  shortDescription?: string
  [key: string]: unknown
}

interface EventsSectionProps {
  events?: EventItem[]
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function DateChip({ date }: { date: string }) {
  const d = new Date(date)
  if (isNaN(d.getTime())) return null
  return (
    <div
      title={formatDate(date)}
      className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-md border border-gold/40 bg-gold/10 leading-none"
    >
      <span className="text-lg font-bold text-navy">{d.getDate()}</span>
      <span className="text-[11px] font-semibold uppercase tracking-wide text-secondary-dark">
        {d.toLocaleDateString('en-IN', { month: 'short' })}
      </span>
    </div>
  )
}

export default function EventsSection({ events = [] }: EventsSectionProps) {
  if (events.length === 0) return null

  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">
              Upcoming Events
            </h2>
            <p className="mt-2 text-lg text-text-muted">
              Workshops, seminars and celebrations across campus.
            </p>
          </div>
          <Link
            href="/events"
            className="group inline-flex items-center gap-1 text-sm font-semibold text-navy transition-colors hover:text-primary-light"
          >
            View All Events
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {events.slice(0, 3).map((event, index) => {
            const eventHref = event.slug ? `/events/${event.slug}` : undefined
            const title = event.title ?? 'Untitled Event'

            return (
              <motion.article
                key={event.id ?? event.slug ?? index}
                variants={fadeUp}
                className={cn(
                  'hover-lift group flex flex-col rounded-lg border border-border bg-white',
                  'border-l-4 border-l-gold p-6 shadow-card',
                  'transition-shadow hover:shadow-elevated',
                )}
              >
                <div className="flex items-start gap-4">
                  {event.startDate ? <DateChip date={event.startDate} /> : null}
                  <div className="min-w-0">
                    {event.type ? (
                      <span className="inline-flex items-center rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-semibold text-secondary-dark">
                        {capitalize(event.type)}
                      </span>
                    ) : null}
                    <h3 className="mt-2 font-display text-lg font-bold leading-snug text-navy">
                      {eventHref ? (
                        <Link
                          href={eventHref}
                          className="transition-colors hover:text-primary-light"
                        >
                          {title}
                        </Link>
                      ) : (
                        title
                      )}
                    </h3>
                  </div>
                </div>

                {event.venue ? (
                  <p className="mt-4 flex items-center gap-1.5 text-sm text-text-muted">
                    <MapPin
                      className="h-4 w-4 shrink-0 text-gold"
                      aria-hidden="true"
                    />
                    <span className="truncate">{event.venue}</span>
                  </p>
                ) : null}

                {event.shortDescription ? (
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted line-clamp-2">
                    {event.shortDescription}
                  </p>
                ) : (
                  <div className="flex-1" />
                )}

                {eventHref ? (
                  <Link
                    href={eventHref}
                    className="group/link mt-5 inline-flex items-center gap-1 text-sm font-semibold text-navy transition-colors hover:text-primary-light"
                  >
                    View
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover/link:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                ) : null}
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
