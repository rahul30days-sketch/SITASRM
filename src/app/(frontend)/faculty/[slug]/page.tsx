import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { safeFind } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo/metadata'
import Breadcrumb from '@/components/common/Breadcrumb'

export const revalidate = 86400

export async function generateStaticParams() {
  const faculty = await safeFind({
    collection: 'faculty',
    where: { status: { equals: 'published' } },
    limit: 200,
    depth: 0,
  })
  return faculty.docs.map((f) => ({ slug: f.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const result = await safeFind({
    collection: 'faculty',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  })
  const member = result.docs[0]
  if (!member) return {}
  return buildMetadata({ title: member.name, path: `/faculty/${slug}` })
}

export default async function FacultyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const result = await safeFind({
    collection: 'faculty',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
    depth: 2,
  })

  const member = result.docs[0] as any
  if (!member) notFound()

  const department = member.department as { name: string } | null
  const publications = member.publications as { title: string; journal?: string; year?: number; url?: string }[] | undefined
  const researchInterests = member.researchInterests as { topic: string }[] | undefined

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Faculty', href: '/faculty' },
    { label: member.name as string, href: `/faculty/${slug}` },
  ]

  return (
    <div className="min-h-screen bg-surface">
      <div className="bg-primary px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb items={breadcrumbs} />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="rounded-md border border-border bg-white p-6 text-center shadow-card">
              <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-primary/10 text-4xl font-bold text-primary">
                {(member.name as string).charAt(0)}
              </div>
              <h1 className="font-display text-2xl font-bold">{member.name as string}</h1>
              {member.designation && <p className="text-text-muted">{member.designation as string}</p>}
              {department?.name && <p className="mt-1 text-sm text-secondary">{department.name}</p>}
              <div className="mt-4 space-y-2 text-sm">
                {member.qualification && (
                  <p><span className="text-text-muted">Qualification:</span> {member.qualification as string}</p>
                )}
                {member.experienceYears && (
                  <p><span className="text-text-muted">Experience:</span> {member.experienceYears as number} years</p>
                )}
                {member.specialization && (
                  <p><span className="text-text-muted">Specialization:</span> {member.specialization as string}</p>
                )}
              </div>
              {member.email && (
                <a href={`mailto:${member.email}`} className="mt-4 inline-block text-sm text-primary hover:underline">
                  {member.email as string}
                </a>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block text-sm text-primary hover:underline"
                >
                  LinkedIn Profile
                </a>
              )}
            </div>
          </div>

          <div className="space-y-8 lg:col-span-2">
            {researchInterests && researchInterests.length > 0 && (
              <div className="rounded-md border border-border bg-white p-6 shadow-card">
                <h2 className="mb-4 font-display text-xl font-semibold">Research Interests</h2>
                <div className="flex flex-wrap gap-2">
                  {researchInterests.map((r, i) => (
                    <span key={i} className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                      {r.topic}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {publications && publications.length > 0 && (
              <div className="rounded-md border border-border bg-white p-6 shadow-card">
                <h2 className="mb-4 font-display text-xl font-semibold">Publications</h2>
                <ul className="space-y-3">
                  {publications.map((pub, i) => (
                    <li key={i} className="border-b border-border pb-3 last:border-0 last:pb-0">
                      <p className="font-medium">
                        {pub.url ? (
                          <a href={pub.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            {pub.title}
                          </a>
                        ) : (
                          pub.title
                        )}
                      </p>
                      <p className="text-sm text-text-muted">
                        {[pub.journal, pub.year].filter(Boolean).join(', ')}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
