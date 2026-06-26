import { type HomeData } from '@/lib/homeData'
import Nav3 from './Nav3'
import Hero3 from './Hero3'
import Awards3 from './Awards3'
import Research3 from './Research3'
import Innovation3 from './Innovation3'
import Gallery3 from './Gallery3'
import Life3 from './Life3'
import Events3 from './Events3'
import Scholarships3 from './Scholarships3'
import Admissions3 from './Admissions3'
import Footer3 from './Footer3'

/**
 * Concept 3 — "Obsidian". Bold dark-luxury, Awwwards-winner mood: near-black base,
 * gold accents, clean professional Manrope type, fullscreen cinematic hero with parallax +
 * drifting glows, fullscreen off-canvas menu. Owns its own navbar + footer (no shared
 * chrome). SERVER component — interactive pieces are isolated in 'use client' children.
 */
export default function Home3({ data }: { data: HomeData }) {
  const { siteSettings, programs, news, events, testimonials, placement, gallery, departments, recruiters } = data
  void programs
  void news
  void testimonials
  void recruiters

  return (
    <div className="bg-neutral-950 text-white">
      <Nav3 siteSettings={siteSettings} />
      <main id="main">
        <Hero3 siteSettings={siteSettings} gallery={gallery} placement={placement} />
        <Awards3 siteSettings={siteSettings} />
        <Research3 siteSettings={siteSettings} departments={departments} />
        <Innovation3 siteSettings={siteSettings} placement={placement} />
        <Gallery3 gallery={gallery} departments={departments} />
        <Life3 gallery={gallery} siteSettings={siteSettings} />
        <Events3 events={events} />
        <Scholarships3 siteSettings={siteSettings} />
        <Admissions3 siteSettings={siteSettings} />
      </main>
      <Footer3 siteSettings={siteSettings} />
    </div>
  )
}
