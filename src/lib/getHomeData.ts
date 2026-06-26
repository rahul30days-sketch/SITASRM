import { safeFind, safeFindGlobal } from '@/lib/payload'
import type { HomeData } from '@/lib/homeData'

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Server-only aggregated CMS fetch for the homepage concept pages.
 *
 * Kept separate from `@/lib/homeData` (which is client-safe) so that importing the
 * `mediaUrl`/`contactProps` helpers into a `'use client'` component never drags the
 * Payload server tree (pino → `worker_threads`/`fs`) into the browser bundle.
 *
 * All queries funnel through `safeFind`/`safeFindGlobal`, so a missing/unreachable
 * DB yields empty arrays and the pages still render graceful empty states.
 */
export async function getHomeData(): Promise<HomeData> {
  const [
    siteSettings,
    programs,
    faculty,
    news,
    events,
    testimonials,
    recruiters,
    placements,
    gallery,
    departments,
  ] = await Promise.all([
    safeFindGlobal('site-settings') as Promise<any>,
    safeFind({
      collection: 'programs',
      where: { status: { equals: 'published' } },
      limit: 8,
      sort: '-featured',
      depth: 1,
    }),
    safeFind({
      collection: 'faculty',
      where: { status: { equals: 'published' } },
      limit: 8,
      sort: '-featured',
      depth: 1,
    }),
    safeFind({
      collection: 'news',
      where: { status: { equals: 'published' } },
      limit: 6,
      sort: '-publishedAt',
      depth: 1,
    }),
    safeFind({
      collection: 'events',
      where: { status: { equals: 'published' } },
      limit: 6,
      sort: '-startDate',
      depth: 1,
    }),
    safeFind({
      collection: 'testimonials',
      where: { status: { equals: 'published' } },
      limit: 8,
      depth: 1,
    }),
    safeFind({
      collection: 'recruiters',
      limit: 30,
      sort: 'tier',
      depth: 1,
    }),
    safeFind({
      collection: 'placements',
      limit: 1,
      sort: '-year',
      depth: 1,
    }),
    safeFind({
      collection: 'gallery',
      where: { status: { equals: 'published' } },
      limit: 8,
      depth: 1,
    }),
    safeFind({
      collection: 'departments',
      where: { status: { equals: 'published' } },
      limit: 8,
      depth: 1,
    }),
  ])

  return {
    siteSettings,
    programs: programs.docs,
    faculty: faculty.docs,
    news: news.docs,
    events: events.docs,
    testimonials: testimonials.docs,
    recruiters: recruiters.docs,
    placement: placements.docs[0] || null,
    gallery: gallery.docs,
    departments: departments.docs,
  }
}
