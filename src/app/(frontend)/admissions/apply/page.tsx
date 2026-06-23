import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'
import { safeFind } from '@/lib/payload'
import { ApplicationFormClient } from './ApplicationFormClient'

export const metadata: Metadata = buildMetadata({
  title: 'Apply Online',
  seo: { metaDescription: 'Apply online for admission to SERI engineering programs.' },
  path: '/admissions/apply',
})

// Regenerate hourly so newly published programs appear in the dropdown.
export const revalidate = 3600

export default async function ApplyPage() {
  const programs = await safeFind({
    collection: 'programs',
    where: { status: { equals: 'published' } },
    limit: 100,
    depth: 0,
    sort: 'name',
  })

  const programOptions = programs.docs.map((p) => ({
    id: String(p.id),
    name: p.name,
    category: p.category,
  }))

  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="font-display text-3xl font-bold text-primary lg:text-4xl">Online Application</h1>
          <p className="mt-2 text-text-muted">Fill in your details to apply for admission at SERI.</p>
        </div>
        <ApplicationFormClient programs={programOptions} />
      </div>
    </div>
  )
}
