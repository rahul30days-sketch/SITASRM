import type { Metadata } from 'next'
import { safeFind } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo/metadata'
import { ProgramsListingClient } from './ProgramsListingClient'

export const metadata: Metadata = buildMetadata({
  title: 'Programs',
  seo: { metaDescription: 'Explore AICTE-approved undergraduate, postgraduate, diploma, and PhD programs at SERI.' },
  path: '/programs',
})

export const revalidate = 3600

export default async function ProgramsPage() {
  const programs = await safeFind({
    collection: 'programs',
    where: { status: { equals: 'published' } },
    limit: 100,
    depth: 0,
    sort: 'name',
  })

  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="font-display text-4xl font-bold text-primary lg:text-5xl">
            Our Programs
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted">
            Discover our range of AICTE-approved engineering and management programs.
          </p>
        </div>
        <ProgramsListingClient programs={programs.docs as any} />
      </div>
    </div>
  )
}
