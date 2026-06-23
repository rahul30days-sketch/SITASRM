import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { safeFind } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo/metadata'
import Breadcrumb from '@/components/common/Breadcrumb'
import JsonLd from '@/components/seo/JsonLd'
import { eventSchema } from '@/lib/seo/schemas'
import { formatDate } from '@/lib/utils'
import RichTextRenderer from '@/components/blocks/RichTextRenderer'

export const revalidate = 1800

export async function generateStaticParams() {
  const events = await safeFind({ collection: 'events', where: { status: { equals: 'published' } }, limit: 100, depth: 0 })
  return events.docs.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const result = await safeFind({ collection: 'events', where: { slug: { equals: slug } }, limit: 1, depth: 0 })
  const event = result.docs[0]
  if (!event) return {}
  return buildMetadata({ title: event.title, seo: event.seo as Record<string, unknown> | undefined, path: `/events/${slug}` })
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const result = await safeFind({ collection: 'events', where: { slug: { equals: slug }, status: { equals: 'published' } }, limit: 1, depth: 1 })
  const event = result.docs[0] as any
  if (!event) notFound()

  const eventImages = (Array.isArray(event.images) ? event.images : [])
    .map((row: any) => row?.image)
    .filter((m: any) => m?.url)

  return (
    <>
      <JsonLd schema={eventSchema({ title: event.title as string, startDate: event.startDate as string, endDate: event.endDate as string | undefined, venue: event.venue as string | undefined, shortDescription: event.shortDescription as string | undefined, slug })} />
      <div className="min-h-screen bg-surface">
        <div className="bg-primary px-4 py-12 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Events', href: '/events' }, { label: event.title as string, href: `/events/${slug}` }]} />
          </div>
        </div>
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <span className="inline-block rounded-full bg-secondary/20 px-3 py-1 text-sm font-medium capitalize text-secondary-dark">{event.type as string}</span>
          <h1 className="mt-4 font-display text-3xl font-bold lg:text-4xl">{event.title as string}</h1>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-text-muted">
            <span>{formatDate(event.startDate as string)}</span>
            {event.venue && <span>{event.venue as string}</span>}
            {event.capacity && <span>Capacity: {event.capacity as number}</span>}
          </div>
          {event.registrationLink && (
            <a href={event.registrationLink as string} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block rounded-md bg-accent px-6 py-2 text-sm font-semibold text-white hover:bg-accent-dark">
              Register Now
            </a>
          )}
          {eventImages.length > 0 && (
            <div className="mt-8 space-y-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-card">
                <Image
                  src={eventImages[0].url}
                  alt={eventImages[0].alt || (event.title as string)}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                  priority
                />
              </div>
              {eventImages.length > 1 && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {eventImages.slice(1).map((m: any, i: number) => (
                    <div key={i} className="relative aspect-video overflow-hidden rounded-lg shadow-card">
                      <Image
                        src={m.url}
                        alt={m.alt || (event.title as string)}
                        fill
                        sizes="(max-width: 640px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {event.description && (
            <div className="mt-8"><RichTextRenderer content={event.description} /></div>
          )}
        </div>
      </div>
    </>
  )
}
