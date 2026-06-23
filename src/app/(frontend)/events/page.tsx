import type { Metadata } from 'next'
import Link from 'next/link'
import { safeFind } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo/metadata'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = buildMetadata({
  title: 'Events',
  seo: { metaDescription: 'Upcoming and past events at SERI - academic, cultural, sports, and workshops.' },
  path: '/events',
})

export const revalidate = 600

export default async function EventsPage() {
  const events = await safeFind({
    collection: 'events',
    where: { status: { equals: 'published' } },
    limit: 20,
    sort: '-startDate',
    depth: 0,
  })

  const now = new Date().toISOString()
  const upcoming = events.docs.filter((e) => e.startDate > now)
  const past = events.docs.filter((e) => e.startDate <= now)

  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="font-display text-4xl font-bold text-primary lg:text-5xl">Events</h1>
        </div>

        {upcoming.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-6 font-display text-2xl font-bold text-primary">Upcoming Events</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((event) => (
                <Link key={event.id} href={`/events/${event.slug}`} className="group rounded-md border border-border bg-white p-6 shadow-card hover:shadow-elevated">
                  <span className="inline-block rounded-full bg-secondary/20 px-2 py-0.5 text-xs font-medium capitalize text-secondary-dark">{event.type}</span>
                  <h3 className="mt-2 font-display text-lg font-semibold group-hover:text-primary">{event.title}</h3>
                  <p className="mt-2 text-sm text-text-muted">{formatDate(event.startDate)}</p>
                  {event.venue && <p className="text-sm text-text-muted">{event.venue}</p>}
                  {event.shortDescription && <p className="mt-2 text-sm text-text-muted line-clamp-2">{event.shortDescription}</p>}
                </Link>
              ))}
            </div>
          </section>
        )}

        {past.length > 0 && (
          <section>
            <h2 className="mb-6 font-display text-2xl font-bold text-text-muted">Past Events</h2>
            <div className="grid gap-6 opacity-75 sm:grid-cols-2 lg:grid-cols-3">
              {past.map((event) => (
                <Link key={event.id} href={`/events/${event.slug}`} className="group rounded-md border border-border bg-white p-6">
                  <span className="inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs capitalize text-text-muted">{event.type}</span>
                  <h3 className="mt-2 font-semibold group-hover:text-primary">{event.title}</h3>
                  <p className="mt-1 text-sm text-text-muted">{formatDate(event.startDate)}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {events.docs.length === 0 && (
          <p className="text-center text-text-muted">No events scheduled. Check back soon!</p>
        )}
      </div>
    </div>
  )
}
