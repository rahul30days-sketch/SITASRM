import type { MetadataRoute } from 'next'
import { safeFind } from '@/lib/payload'

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://seri.net.in'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [programs, departments, faculty, news, events] = await Promise.all([
    safeFind<{ slug: string; updatedAt: string }>({ collection: 'programs', where: { status: { equals: 'published' } }, limit: 500, depth: 0 }),
    safeFind<{ slug: string; updatedAt: string }>({ collection: 'departments', where: { status: { equals: 'published' } }, limit: 100, depth: 0 }),
    safeFind<{ slug: string; updatedAt: string }>({ collection: 'faculty', where: { status: { equals: 'published' } }, limit: 500, depth: 0 }),
    safeFind<{ slug: string; updatedAt: string }>({ collection: 'news', where: { status: { equals: 'published' } }, limit: 500, depth: 0 }),
    safeFind<{ slug: string; updatedAt: string }>({ collection: 'events', where: { status: { equals: 'published' } }, limit: 500, depth: 0 }),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/programs`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/departments`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/faculty`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/admissions`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/admissions/apply`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/placements`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/news`, changeFrequency: 'daily', priority: 0.7 },
    { url: `${BASE_URL}/events`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/gallery`, changeFrequency: 'weekly', priority: 0.5 },
    { url: `${BASE_URL}/downloads`, changeFrequency: 'weekly', priority: 0.5 },
    { url: `${BASE_URL}/faq`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/contact`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/privacy-policy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE_URL}/terms`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE_URL}/refund-policy`, changeFrequency: 'yearly', priority: 0.2 },
  ]

  const programPages: MetadataRoute.Sitemap = programs.docs.map((p) => ({
    url: `${BASE_URL}/programs/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const departmentPages: MetadataRoute.Sitemap = departments.docs.map((d) => ({
    url: `${BASE_URL}/departments/${d.slug}`,
    lastModified: new Date(d.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const facultyPages: MetadataRoute.Sitemap = faculty.docs.map((f) => ({
    url: `${BASE_URL}/faculty/${f.slug}`,
    lastModified: new Date(f.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const newsPages: MetadataRoute.Sitemap = news.docs.map((n) => ({
    url: `${BASE_URL}/news/${n.slug}`,
    lastModified: new Date(n.updatedAt),
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }))

  const eventPages: MetadataRoute.Sitemap = events.docs.map((e) => ({
    url: `${BASE_URL}/events/${e.slug}`,
    lastModified: new Date(e.updatedAt),
    changeFrequency: 'yearly' as const,
    priority: 0.4,
  }))

  return [...staticPages, ...programPages, ...departmentPages, ...facultyPages, ...newsPages, ...eventPages]
}
