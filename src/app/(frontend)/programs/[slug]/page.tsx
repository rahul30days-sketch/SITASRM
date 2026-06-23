import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { safeFind } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo/metadata'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumb from '@/components/common/Breadcrumb'
import { courseSchema } from '@/lib/seo/schemas'
import { ProgramDetailClient } from './ProgramDetailClient'

export const revalidate = 3600

export async function generateStaticParams() {
  const programs = await safeFind({
    collection: 'programs',
    where: { status: { equals: 'published' } },
    limit: 100,
    depth: 0,
  })
  return programs.docs.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const result = await safeFind({
    collection: 'programs',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
    depth: 0,
  })
  const program = result.docs[0]
  if (!program) return {}
  return buildMetadata({
    title: program.name,
    seo: program.seo as Record<string, unknown> | undefined,
    path: `/programs/${slug}`,
  })
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const result = await safeFind({
    collection: 'programs',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
    depth: 2,
  })

  const program = result.docs[0]
  if (!program) notFound()

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Programs', href: '/programs' },
    { label: program.name, href: `/programs/${slug}` },
  ]

  return (
    <>
      <JsonLd schema={courseSchema(program as any)} />
      <div className="min-h-screen bg-surface">
        <div className="bg-primary px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Breadcrumb items={breadcrumbs} />
            <span className="mt-4 inline-block rounded-full bg-white/20 px-3 py-1 text-sm capitalize">
              {program.category}
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold lg:text-5xl">{program.name}</h1>
            <div className="mt-4 flex flex-wrap gap-4 text-white/80">
              {program.duration && <span>Duration: {program.duration}</span>}
              {program.totalSeats && <span>Seats: {program.totalSeats}</span>}
              {program.affiliatedTo && <span>Affiliated to {program.affiliatedTo}</span>}
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <ProgramDetailClient program={program as any} />
        </div>
      </div>
    </>
  )
}
