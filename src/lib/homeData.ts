/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Client-safe shared types + helpers for the homepage concept pages
 * (/home-1, /home-2, /home-3).
 *
 * IMPORTANT: this module must NOT import `@/lib/payload` (or `payload`) — the three
 * concepts' `'use client'` components import `mediaUrl`/`contactProps`/`HomeData`
 * from here, and pulling the Payload server tree (pino logger → `worker_threads`)
 * into a browser bundle breaks the build. The server-only data fetch lives in
 * `@/lib/getHomeData`.
 *
 * Field shapes (depth: 1 — relationships/uploads are populated objects):
 * - program:    { id, name, slug, shortDescription, category, duration, totalSeats,
 *                 featuredImage?: Media, careerOpportunities: {role,companies}[],
 *                 highlights: {icon,label,value}[], featured }
 * - faculty:    { id, name, slug, designation, qualification, experienceYears,
 *                 specialization, profileImage?: Media, email, linkedin, department?: {name} }
 * - news:       { id, title, slug, type, excerpt, featuredImage?: Media, publishedAt, tags:{tag}[] }
 * - event:      { id, title, slug, shortDescription, type, startDate, endDate, venue,
 *                 registrationLink, images: {image: Media}[] }
 * - testimonial:{ id, studentName, batch, company, designation, testimonialText, rating,
 *                 profileImage?: Media, program?: {name} }
 * - recruiter:  { id, name, logo: Media, website, tier, studentsHired, averagePackage }
 * - placement:  { year, totalStudents, studentsPlaced, highestPackage, averagePackage,
 *                 recruitersCount, highlights: {label,value}[] }
 * - gallery:    { id, title, category, images: {image: Media}[], date }
 * - department: { id, name, slug, shortDescription, images: {image: Media}[], vision }
 * - Media:      { url, alt, width, height }
 */
export interface HomeData {
  siteSettings: any
  programs: any[]
  faculty: any[]
  news: any[]
  events: any[]
  testimonials: any[]
  recruiters: any[]
  placement: any | null
  gallery: any[]
  departments: any[]
}

/** Resolve a Payload media relation (or plain string) to a URL, with a fallback. */
export function mediaUrl(media: any, fallback = ''): string {
  if (!media) return fallback
  if (typeof media === 'string') return media
  return media.url || media?.sizes?.card?.url || fallback
}

/** Pull contact fields out of site settings in the shape ContactSection expects. */
export function contactProps(siteSettings: any) {
  return {
    address: siteSettings?.address || '',
    phone: (siteSettings?.phone || []).map((p: { number: string }) => p.number).filter(Boolean),
    email: (siteSettings?.email || []).map((e: { address: string }) => e.address).filter(Boolean),
    mapEmbedUrl: siteSettings?.mapEmbedUrl || '',
  }
}
