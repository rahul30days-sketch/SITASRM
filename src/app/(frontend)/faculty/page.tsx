import type { Metadata } from 'next'
import { safeFind } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo/metadata'
import { FacultyListingClient } from './FacultyListingClient'

export const metadata: Metadata = buildMetadata({
  title: 'Faculty',
  seo: { metaDescription: 'Meet our experienced faculty at SERI with strong industry and research backgrounds.' },
  path: '/faculty',
})

export const revalidate = 86400

export default async function FacultyPage() {
  const [faculty, departments] = await Promise.all([
    safeFind({
      collection: 'faculty',
      where: { status: { equals: 'published' } },
      limit: 100,
      depth: 1,
      sort: 'name',
    }),
    safeFind({
      collection: 'departments',
      where: { status: { equals: 'published' } },
      limit: 50,
      depth: 0,
    }),
  ])

  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="font-display text-4xl font-bold text-primary lg:text-5xl">Our Faculty</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted">
            Learn from experienced professionals with strong industry and research backgrounds.
          </p>
        </div>
        <FacultyListingClient faculty={faculty.docs as any} departments={departments.docs as any} />
      </div>
    </div>
  )
}
