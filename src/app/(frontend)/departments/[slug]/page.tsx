import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { safeFind } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo/metadata'
import Breadcrumb from '@/components/common/Breadcrumb'

export const revalidate = 86400

export async function generateStaticParams() {
  const departments = await safeFind({
    collection: 'departments',
    where: { status: { equals: 'published' } },
    limit: 50,
    depth: 0,
  })
  return departments.docs.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const result = await safeFind({ collection: 'departments', where: { slug: { equals: slug } }, limit: 1, depth: 0 })
  const dept = result.docs[0]
  if (!dept) return {}
  return buildMetadata({ title: dept.name, seo: dept.seo as Record<string, unknown> | undefined, path: `/departments/${slug}` })
}

export default async function DepartmentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const result = await safeFind({ collection: 'departments', where: { slug: { equals: slug }, status: { equals: 'published' } }, limit: 1, depth: 2 })
  const dept = result.docs[0] as any
  if (!dept) notFound()

  const hod = dept.hod as { name: string; designation?: string } | null
  const programs = dept.programs as { id: string; name: string; slug: string; category: string }[] | undefined
  const facultyList = dept.facultyList as { id: string; name: string; designation?: string }[] | undefined
  const facilities = dept.facilities as { name: string; description?: string }[] | undefined

  return (
    <div className="min-h-screen bg-surface">
      <div className="bg-primary px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Departments', href: '/departments' }, { label: dept.name as string, href: `/departments/${slug}` }]} />
          <h1 className="mt-4 font-display text-4xl font-bold lg:text-5xl">{dept.name as string}</h1>
          {dept.vision && <p className="mt-4 max-w-3xl text-white/80">{dept.vision as string}</p>}
        </div>
      </div>
      <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
        {hod && (
          <div className="rounded-md border border-border bg-white p-6 shadow-card">
            <h2 className="mb-4 font-display text-xl font-semibold">Head of Department</h2>
            <p className="font-medium">{hod.name}</p>
            {hod.designation && <p className="text-sm text-text-muted">{hod.designation}</p>}
          </div>
        )}

        {programs && programs.length > 0 && (
          <div>
            <h2 className="mb-6 font-display text-2xl font-bold">Programs Offered</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {programs.map((p) => (
                <a key={p.id} href={`/programs/${p.slug}`} className="rounded-md border border-border bg-white p-4 shadow-card hover:shadow-elevated">
                  <span className="mb-1 inline-block text-xs font-medium capitalize text-secondary">{p.category}</span>
                  <h3 className="font-semibold">{p.name}</h3>
                </a>
              ))}
            </div>
          </div>
        )}

        {facultyList && facultyList.length > 0 && (
          <div>
            <h2 className="mb-6 font-display text-2xl font-bold">Faculty</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {facultyList.map((f) => (
                <div key={f.id} className="rounded-md border border-border bg-white p-4 text-center">
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">{f.name.charAt(0)}</div>
                  <p className="font-medium">{f.name}</p>
                  {f.designation && <p className="text-sm text-text-muted">{f.designation}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {facilities && facilities.length > 0 && (
          <div>
            <h2 className="mb-6 font-display text-2xl font-bold">Facilities</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {facilities.map((f, i) => (
                <div key={i} className="rounded-md border border-border bg-white p-4">
                  <h3 className="font-semibold">{f.name}</h3>
                  {f.description && <p className="mt-1 text-sm text-text-muted">{f.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
