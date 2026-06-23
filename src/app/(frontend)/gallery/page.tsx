import type { Metadata } from 'next'
import { safeFind } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo/metadata'
import { GalleryClient } from './GalleryClient'

export const metadata: Metadata = buildMetadata({
  title: 'Gallery',
  seo: { metaDescription: 'Photo gallery of SERI campus, events, academics, sports, and cultural activities.' },
  path: '/gallery',
})

export const revalidate = 3600

export default async function GalleryPage() {
  const gallery = await safeFind({
    collection: 'gallery',
    where: { status: { equals: 'published' } },
    limit: 50,
    depth: 1,
    sort: '-date',
  })

  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="font-display text-4xl font-bold text-primary lg:text-5xl">Gallery</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted">
            Explore life at SERI through our photo galleries.
          </p>
        </div>
        <GalleryClient albums={gallery.docs as any} />
      </div>
    </div>
  )
}
