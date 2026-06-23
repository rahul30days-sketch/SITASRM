import type { Metadata } from 'next'
import type { SEOFields, MediaType } from '@/types'

interface BuildMetadataOptions {
  title: string
  seo?: SEOFields
  path?: string
}

export function buildMetadata({ title, seo, path }: BuildMetadataOptions): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://seri.net.in'
  const metaTitle = seo?.metaTitle || `${title} | SERI`
  const metaDescription =
    seo?.metaDescription ||
    'SITASRM Engineering & Research Institute - Premier engineering institute in Haryana.'
  const ogImage = (seo?.ogImage as MediaType)?.url || '/og-default.jpg'
  const canonicalUrl = seo?.canonicalUrl || (path ? `${siteUrl}${path}` : siteUrl)

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName: 'SERI - SITASRM Engineering & Research Institute',
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [ogImage],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: !seo?.noIndex,
      follow: true,
    },
  }
}
