import type { Metadata } from 'next'
import { safeFind } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Placements',
  seo: { metaDescription: 'SERI placement records, top recruiters, and career statistics.' },
  path: '/placements',
})

export const revalidate = 3600

export default async function PlacementsPage() {
  const [placements, recruiters] = await Promise.all([
    safeFind({ collection: 'placements', limit: 5, sort: '-year', depth: 1 }),
    safeFind<{ id: string; name: string }>({ collection: 'recruiters', limit: 50, sort: 'tier', depth: 1 }),
  ])

  const latest = placements.docs[0] as Record<string, unknown> | undefined
  const allRecruiters = recruiters.docs

  return (
    <div className="min-h-screen bg-surface">
      <div className="bg-primary px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="font-display text-4xl font-bold lg:text-5xl">Placements</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Our dedicated Training & Placement Cell ensures excellent career opportunities.
          </p>
        </div>
      </div>

      {latest && (
        <div className="mx-auto -mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Highest Package', value: `${latest.highestPackage} LPA` },
              { label: 'Average Package', value: `${latest.averagePackage} LPA` },
              { label: 'Students Placed', value: `${latest.studentsPlaced}+` },
              { label: 'Recruiters', value: `${latest.recruitersCount}+` },
            ].map((stat) => (
              <div key={stat.label} className="rounded-md bg-white p-6 text-center shadow-elevated">
                <div className="text-2xl font-bold text-accent">{stat.value}</div>
                <div className="mt-1 text-sm text-text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-16 sm:px-6 lg:px-8">
        {allRecruiters.length > 0 && (
          <section>
            <h2 className="mb-8 text-center font-display text-3xl font-bold text-primary">Our Recruiters</h2>
            <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 lg:grid-cols-6">
              {allRecruiters.map((r) => (
                <div key={r.id} className="flex items-center justify-center rounded-md border border-border bg-white p-4">
                  <span className="text-center text-sm font-medium text-text-muted">{r.name}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
