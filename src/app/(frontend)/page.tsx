import type { Metadata } from 'next'
import { safeFind, safeFindGlobal } from '@/lib/payload'
import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import ProgramsShowcase from '@/components/sections/ProgramsShowcase'
import WhyChooseSection from '@/components/sections/WhyChooseSection'
import PlacementHighlights from '@/components/sections/PlacementHighlights'
import RecruitersSlider from '@/components/sections/RecruitersSlider'
import FacultyHighlights from '@/components/sections/FacultyHighlights'
import CampusLifeSection from '@/components/sections/CampusLifeSection'
import AdmissionProcess from '@/components/sections/AdmissionProcess'
import EventsSection from '@/components/sections/EventsSection'
import NewsSection from '@/components/sections/NewsSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import AdmissionCTA from '@/components/sections/AdmissionCTA'
import ContactSection from '@/components/sections/ContactSection'

export const metadata: Metadata = {
  title: 'SERI - Premier Engineering Institute in Haryana',
  description:
    'SITASRM Engineering & Research Institute offers AICTE-approved engineering programs with 100% placement support, modern infrastructure, and industry-connected faculty.',
}

export const revalidate = 300

export default async function HomePage() {
  const [
    siteSettings,
    programsResult,
    facultyResult,
    newsResult,
    eventsResult,
    testimonialsResult,
    recruitersResult,
    placementsResult,
    galleryResult,
  ] = await Promise.all([
    safeFindGlobal('site-settings') as Promise<any>,
    safeFind({
      collection: 'programs',
      where: { status: { equals: 'published' }, featured: { equals: true } },
      limit: 6,
      depth: 1,
    }),
    safeFind({
      collection: 'faculty',
      where: { status: { equals: 'published' }, featured: { equals: true } },
      limit: 8,
      depth: 1,
    }),
    safeFind({
      collection: 'news',
      where: { status: { equals: 'published' } },
      limit: 4,
      sort: '-publishedAt',
      depth: 1,
    }),
    safeFind({
      collection: 'events',
      where: { status: { equals: 'published' } },
      limit: 3,
      sort: '-startDate',
      depth: 1,
    }),
    safeFind({
      collection: 'testimonials',
      where: { status: { equals: 'published' }, featured: { equals: true } },
      limit: 8,
      depth: 1,
    }),
    safeFind({
      collection: 'recruiters',
      where: { featured: { equals: true } },
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
      limit: 6,
      depth: 1,
    }),
  ])

  const latestPlacement = placementsResult.docs[0] as any

  // Hero campus image — prefer the CMS "campus" gallery album, fall back to the bundled asset
  const campusAlbum =
    (galleryResult.docs as any[]).find((g) => g?.category === 'campus') || galleryResult.docs[0]
  const campusImageUrl =
    (campusAlbum as any)?.images?.[0]?.image?.url || '/media/images/hero-campus.jpg'

  // Editable hero content (Site Settings → Hero); falls back to component defaults
  const heroContent = {
    ...((siteSettings?.hero as Record<string, unknown>) || {}),
    backgroundImageUrl:
      (siteSettings?.hero?.backgroundImage as any)?.url || campusImageUrl,
  }

  // Stats — driven by CMS (Site Settings stats group + latest Placement record)
  const s = (siteSettings?.stats || {}) as Record<string, number>
  const currentYear = new Date().getFullYear()
  const statsData = [
    { icon: 'recruiters', value: latestPlacement?.recruitersCount ?? 120, suffix: '+', label: 'Recruiters' },
    { icon: 'package', value: latestPlacement?.highestPackage ?? 14, prefix: '₹', suffix: ' LPA', label: 'Highest Package' },
    { icon: 'placement', value: s.placementPercent ?? 95, suffix: '%', label: 'Placement Rate' },
    { icon: 'years', value: s.establishedYear ? currentYear - s.establishedYear : 15, suffix: '+', label: 'Years of Excellence' },
    { icon: 'alumni', value: s.studentCount ?? 2000, suffix: '+', label: 'Alumni Network' },
    { icon: 'programs', value: s.programCount ?? 8, suffix: '', label: 'Programs Offered' },
  ]

  return (
    <>
      <HeroSection campusImageUrl={campusImageUrl} content={heroContent as any} />
      <StatsSection stats={statsData} />
      {programsResult.docs.length > 0 && <ProgramsShowcase programs={programsResult.docs as any} />}
      <WhyChooseSection />
      {latestPlacement && (
        <PlacementHighlights placement={latestPlacement as any} recruiters={recruitersResult.docs as any} />
      )}
      {recruitersResult.docs.length > 0 && <RecruitersSlider recruiters={recruitersResult.docs as any} />}
      {facultyResult.docs.length > 0 && <FacultyHighlights faculty={facultyResult.docs as any} />}
      {galleryResult.docs.length > 0 && <CampusLifeSection images={galleryResult.docs as any} />}
      <AdmissionProcess />
      {eventsResult.docs.length > 0 && <EventsSection events={eventsResult.docs as any} />}
      {newsResult.docs.length > 0 && <NewsSection news={newsResult.docs as any} />}
      {testimonialsResult.docs.length > 0 && (
        <TestimonialsSection testimonials={testimonialsResult.docs as any} />
      )}
      <AdmissionCTA programs={programsResult.docs as any} />
      <ContactSection
        address={siteSettings?.address || ''}
        phone={siteSettings?.phone?.map((p: { number: string }) => p.number) || []}
        email={siteSettings?.email?.map((e: { address: string }) => e.address) || []}
        mapEmbedUrl={siteSettings?.mapEmbedUrl || ''}
      />
    </>
  )
}
