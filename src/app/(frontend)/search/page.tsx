import type { Metadata } from 'next'
import Link from 'next/link'
import { safeFind } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo/metadata'
import { truncate } from '@/lib/utils'

export const metadata: Metadata = buildMetadata({
  title: 'Search',
  seo: { metaDescription: 'Search across SERI programs, faculty, news, events, and pages.' },
  path: '/search',
})

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams
  const query = typeof q === 'string' ? q.trim().slice(0, 100) : ''

  if (!query) {
    return (
      <div className="min-h-screen bg-surface">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold text-primary">Search</h1>
          <p className="mt-4 text-text-muted">Enter a search term to find programs, faculty, news, events, and more.</p>
          <form action="/search" method="GET" className="mt-8">
            <div className="flex gap-2">
              <input name="q" type="text" placeholder="Search..." maxLength={100} className="flex-1 rounded-md border border-border px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
              <button type="submit" className="rounded-md bg-primary px-6 py-2 text-white hover:bg-primary-light">Search</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  const [programs, faculty, news, events] = await Promise.all([
    safeFind({ collection: 'programs', where: { or: [{ title: { like: query } }, { shortDescription: { like: query } }], status: { equals: 'published' } }, limit: 10, depth: 0 }),
    safeFind({ collection: 'faculty', where: { or: [{ name: { like: query } }, { designation: { like: query } }], status: { equals: 'published' } }, limit: 10, depth: 0 }),
    safeFind({ collection: 'news', where: { or: [{ title: { like: query } }], status: { equals: 'published' } }, limit: 10, depth: 0 }),
    safeFind({ collection: 'events', where: { or: [{ title: { like: query } }], status: { equals: 'published' } }, limit: 10, depth: 0 }),
  ])

  const totalResults = programs.totalDocs + faculty.totalDocs + news.totalDocs + events.totalDocs

  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold text-primary">Search Results</h1>
        <form action="/search" method="GET" className="mt-6">
          <div className="flex gap-2">
            <input name="q" type="text" defaultValue={query} maxLength={100} className="flex-1 rounded-md border border-border px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            <button type="submit" className="rounded-md bg-primary px-6 py-2 text-white hover:bg-primary-light">Search</button>
          </div>
        </form>
        <p className="mt-4 text-sm text-text-muted">{totalResults} result{totalResults !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;</p>

        {programs.docs.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-4 font-display text-xl font-bold text-primary">Programs</h2>
            <div className="space-y-3">
              {programs.docs.map((p) => (
                <Link key={p.id} href={`/programs/${p.slug}`} className="block rounded-md border border-border bg-white p-4 hover:shadow-card">
                  <h3 className="font-semibold">{p.title}</h3>
                  {p.shortDescription && <p className="mt-1 text-sm text-text-muted">{truncate(p.shortDescription as string, 120)}</p>}
                </Link>
              ))}
            </div>
          </section>
        )}

        {faculty.docs.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-4 font-display text-xl font-bold text-primary">Faculty</h2>
            <div className="space-y-3">
              {faculty.docs.map((f) => (
                <Link key={f.id} href={`/faculty/${f.slug}`} className="block rounded-md border border-border bg-white p-4 hover:shadow-card">
                  <h3 className="font-semibold">{f.name}</h3>
                  {f.designation && <p className="mt-1 text-sm text-text-muted">{f.designation as string}</p>}
                </Link>
              ))}
            </div>
          </section>
        )}

        {news.docs.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-4 font-display text-xl font-bold text-primary">News</h2>
            <div className="space-y-3">
              {news.docs.map((n) => (
                <Link key={n.id} href={`/news/${n.slug}`} className="block rounded-md border border-border bg-white p-4 hover:shadow-card">
                  <h3 className="font-semibold">{n.title}</h3>
                </Link>
              ))}
            </div>
          </section>
        )}

        {events.docs.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-4 font-display text-xl font-bold text-primary">Events</h2>
            <div className="space-y-3">
              {events.docs.map((e) => (
                <Link key={e.id} href={`/events/${e.slug}`} className="block rounded-md border border-border bg-white p-4 hover:shadow-card">
                  <h3 className="font-semibold">{e.title}</h3>
                </Link>
              ))}
            </div>
          </section>
        )}

        {totalResults === 0 && (
          <p className="mt-8 text-center text-text-muted">No results found. Try a different search term.</p>
        )}
      </div>
    </div>
  )
}
