import { type HomeData } from '@/lib/homeData'
import Nav2 from './Nav2'
import Hero2 from './Hero2'
import Stories2 from './Stories2'
import Departments2 from './Departments2'
import CampusExperience2 from './CampusExperience2'
import Faculty2 from './Faculty2'
import Placements2 from './Placements2'
import VirtualTour2 from './VirtualTour2'
import CTA2 from './CTA2'
import Footer2 from './Footer2'

/**
 * Concept 2 — "Studio". Apple × Stripe × Linear × Framer mood: light & airy,
 * minimal, generous whitespace, large imagery, glassmorphism, an indigo→cyan
 * accent used sparingly. Owns its own floating-pill navbar + minimal footer
 * (no shared chrome). Server component — all interactivity lives in the
 * `'use client'` section files.
 */
export default function Home2({ data }: { data: HomeData }) {
  const {
    siteSettings,
    programs,
    faculty,
    testimonials,
    recruiters,
    placement,
    gallery,
    departments,
  } = data

  return (
    <div className="bg-white">
      <Nav2 siteSettings={siteSettings} />
      <main id="main">
        <Hero2 siteSettings={siteSettings} gallery={gallery} placement={placement} />
        <Stories2 testimonials={testimonials} />
        <Departments2 departments={departments} programs={programs} />
        <CampusExperience2 gallery={gallery} siteSettings={siteSettings} />
        <Faculty2 faculty={faculty} />
        <Placements2 placement={placement} siteSettings={siteSettings} recruiters={recruiters} />
        <VirtualTour2 gallery={gallery} siteSettings={siteSettings} />
        <CTA2 siteSettings={siteSettings} />
      </main>
      <Footer2 siteSettings={siteSettings} />
    </div>
  )
}
