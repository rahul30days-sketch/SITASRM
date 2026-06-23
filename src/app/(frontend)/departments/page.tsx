import type { Metadata } from 'next'
import Link from 'next/link'
import { safeFind } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Departments',
  seo: { metaDescription: 'Explore academic departments at SERI offering cutting-edge engineering and management education.' },
  path: '/departments',
})

export const revalidate = 86400

export default async function DepartmentsPage() {
  const departments = await safeFind<{
    id: string
    slug: string
    name: string
    shortDescription?: string
    hod?: unknown
    programs?: unknown
  }>({
    collection: 'departments',
    where: { status: { equals: 'published' } },
    limit: 50,
    depth: 1,
    sort: 'name',
  })

  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="font-display text-4xl font-bold text-primary lg:text-5xl">Departments</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted">
            Our departments offer cutting-edge programs with experienced faculty and modern facilities.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {departments.docs.map((dept) => {
            const hod = typeof dept.hod === 'object' ? dept.hod : null
            const programs = dept.programs as { id: string }[] | undefined
            return (
              <Link
                key={dept.id}
                href={`/departments/${dept.slug}`}
                className="group rounded-md border border-border bg-white p-6 shadow-card transition-shadow hover:shadow-elevated"
              >
                <h2 className="font-display text-xl font-semibold group-hover:text-primary">
                  {dept.name}
                </h2>
                {hod && (
                  <p className="mt-1 text-sm text-text-muted">
                    HOD: {(hod as { name: string }).name}
                  </p>
                )}
                {dept.shortDescription && (
                  <p className="mt-3 text-sm text-text-muted line-clamp-3">{dept.shortDescription}</p>
                )}
                {programs && programs.length > 0 && (
                  <p className="mt-3 text-sm text-secondary">{programs.length} program(s) offered</p>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
