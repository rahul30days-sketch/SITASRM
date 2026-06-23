import type { Metadata } from 'next'
import Image from 'next/image'
import { safeFind } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Testimonials',
  seo: {
    metaDescription:
      'Success stories from SERI students and alumni placed at top companies like TCS, Infosys, Wipro and more.',
  },
  path: '/testimonials',
})

export const revalidate = 3600

function initials(name?: string): string {
  if (!name) return 'S'
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() || '')
      .join('') || 'S'
  )
}

function Stars({ rating }: { rating?: number }) {
  const r = typeof rating === 'number' ? Math.max(0, Math.min(5, Math.round(rating))) : 0
  return (
    <div className="flex gap-0.5" aria-label={`${r} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill={i < r ? '#c8a951' : 'none'}
          stroke="#c8a951"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M10 1.6l2.5 5.2 5.7.8-4.1 4 1 5.6L10 15.5 4.9 17.2l1-5.6-4.1-4 5.7-.8z" />
        </svg>
      ))}
    </div>
  )
}

export default async function TestimonialsPage() {
  const result = await safeFind({
    collection: 'testimonials',
    where: { status: { equals: 'published' } },
    limit: 100,
    depth: 1,
    sort: '-createdAt',
  })
  const testimonials = result.docs as Array<Record<string, any>>

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="relative overflow-hidden bg-navy py-16 sm:py-20">
        <div className="absolute inset-0 bg-dot-grid opacity-20" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="glass-dark inline-flex rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-gold">
            Success Stories
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold text-white lg:text-5xl">
            What Our <span className="text-gradient-gold">Students Say</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/75 sm:text-lg">
            Hear from SERI students and alumni building successful careers at leading companies
            across the country.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {testimonials.length === 0 ? (
          <p className="py-12 text-center text-text-muted">No testimonials published yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => {
              const photo = t.profileImage?.url as string | undefined
              const program = typeof t.program === 'object' ? t.program?.name : undefined
              const meta = [t.batch, t.company, t.designation].filter(Boolean).join(' · ')
              return (
                <article
                  key={t.id}
                  className="relative flex flex-col rounded-lg border border-border bg-white p-6 shadow-card transition-shadow duration-300 hover:shadow-elevated"
                >
                  {/* Decorative quote mark */}
                  <svg
                    className="absolute right-5 top-4 h-12 w-12 text-gold/15"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M7.17 6A5.17 5.17 0 002 11.17V18h6.83v-6.83H5.5A1.67 1.67 0 017.17 9.5V6zm9 0a5.17 5.17 0 00-5.17 5.17V18h6.83v-6.83H14.5a1.67 1.67 0 011.67-1.67V6z" />
                  </svg>

                  <Stars rating={t.rating} />

                  <p className="mt-4 flex-1 font-display text-[17px] italic leading-relaxed text-text">
                    “{t.testimonialText}”
                  </p>

                  <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                    {photo ? (
                      <Image
                        src={photo}
                        alt={t.studentName || 'Student'}
                        width={56}
                        height={56}
                        className="h-14 w-14 flex-shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-navy to-navy-light font-display text-lg font-bold text-gold">
                        {initials(t.studentName)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-semibold text-navy">{t.studentName}</p>
                      {meta && <p className="truncate text-sm text-text-muted">{meta}</p>}
                      {program && (
                        <span className="mt-1 inline-block rounded-full bg-secondary/15 px-2 py-0.5 text-xs font-medium text-secondary-dark">
                          {program}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
