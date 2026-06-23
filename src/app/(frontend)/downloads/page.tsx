import type { Metadata } from 'next'
import { safeFind } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo/metadata'
import { DownloadsClient } from './DownloadsClient'

export const metadata: Metadata = buildMetadata({
  title: 'Downloads',
  seo: { metaDescription: 'Download brochures, syllabi, forms, notices, and other documents from SERI.' },
  path: '/downloads',
})

export const revalidate = 3600

export default async function DownloadsPage() {
  const downloads = await safeFind({
    collection: 'downloads',
    where: { status: { equals: 'published' } },
    limit: 100,
    depth: 1,
    sort: '-publishedAt',
  })

  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="font-display text-4xl font-bold text-primary lg:text-5xl">Downloads</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted">
            Access brochures, syllabi, forms, and important documents.
          </p>
        </div>
        <DownloadsClient downloads={downloads.docs as any} />
      </div>
    </div>
  )
}
