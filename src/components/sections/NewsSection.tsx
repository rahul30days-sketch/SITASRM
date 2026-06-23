'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

/* Loose pass-through types — raw Payload docs. */
interface NewsItem {
  id?: string
  title?: string
  slug?: string
  publishedAt?: string
  excerpt?: string
  type?: string
  featuredImage?: { url?: string } | null
  [key: string]: unknown
}

interface NewsSectionProps {
  news?: NewsItem[]
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export default function NewsSection({ news = [] }: NewsSectionProps) {
  if (news.length === 0) return null

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">
              Latest News &amp; Updates
            </h2>
            <p className="mt-2 text-lg text-text-muted">
              Announcements, achievements and stories from across SERI.
            </p>
          </div>
          <Link
            href="/news"
            className="group inline-flex items-center gap-1 text-sm font-semibold text-navy transition-colors hover:text-primary-light"
          >
            View All News
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
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {news.slice(0, 4).map((item, index) => {
            const newsHref = item.slug ? `/news/${item.slug}` : undefined
            const title = item.title ?? 'Untitled'
            const imageUrl = item.featuredImage?.url

            return (
              <motion.article
                key={item.id ?? item.slug ?? index}
                variants={fadeUp}
                className={cn(
                  'hover-lift group flex flex-col rounded-lg border border-border bg-white',
                  'border-l-4 border-l-navy p-5 shadow-card',
                  'transition-shadow hover:shadow-elevated',
                )}
              >
                {imageUrl ? (
                  <div className="relative mb-4 aspect-[16/10] w-full overflow-hidden rounded-md bg-primary-100">
                    <Image
                      src={imageUrl}
                      alt={title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : null}

                <div className="flex flex-wrap items-center gap-2">
                  {item.type ? (
                    <span className="inline-flex items-center rounded-full bg-navy/10 px-2.5 py-0.5 text-xs font-semibold text-navy">
                      {capitalize(item.type)}
                    </span>
                  ) : null}
                  {item.publishedAt ? (
                    <span className="text-xs font-medium text-text-muted">
                      {formatDate(item.publishedAt)}
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-3 font-display text-base font-bold leading-snug text-navy">
                  {newsHref ? (
                    <Link
                      href={newsHref}
                      className="transition-colors hover:text-primary-light"
                    >
                      {title}
                    </Link>
                  ) : (
                    title
                  )}
                </h3>

                {item.excerpt ? (
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted line-clamp-2">
                    {item.excerpt}
                  </p>
                ) : (
                  <div className="flex-1" />
                )}

                {newsHref ? (
                  <Link
                    href={newsHref}
                    className="group/link mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy transition-colors hover:text-primary-light"
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
