'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Download,
  Phone,
  Building2,
  IndianRupee,
  ShieldCheck,
  Award,
  type LucideIcon,
} from 'lucide-react'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface Cta {
  label?: string
  href?: string
}

export interface HeroContent {
  backgroundImageUrl?: string
  badge?: string
  headingTop?: string
  headingHighlight?: string
  subheading?: string
  primaryCta?: Cta
  secondaryCta?: Cta
  tertiaryCta?: Cta
  trustItems?: { icon?: string; label?: string }[]
  chips?: { value?: string; label?: string }[]
  tickerItems?: { text?: string }[]
}

interface HeroSectionProps {
  /** Full-bleed background image (CMS-driven; falls back to bundled campus photo). */
  campusImageUrl?: string
  /** Editable hero content from the CMS (Site Settings → Hero). Defaults fill any gaps. */
  content?: HeroContent
  className?: string
}

const ICONS: Record<string, LucideIcon> = {
  building: Building2,
  rupee: IndianRupee,
  shield: ShieldCheck,
  award: Award,
}

const DEFAULTS = {
  badge: 'AICTE Approved · NAAC Accredited · Est. 2008',
  headingTop: 'Shape Your Future at',
  headingHighlight: 'SERI',
  subheading: 'Premier Engineering & Research Institute in Haryana',
  primaryCta: { label: 'Apply Now 2025–26', href: '/admissions/apply' },
  secondaryCta: { label: 'Download Brochure', href: '/downloads' },
  tertiaryCta: { label: 'Talk to Admissions', href: 'tel:+919876543210' },
  trustItems: [
    { icon: 'building', label: '500+ Recruiters' },
    { icon: 'rupee', label: '₹8 LPA Avg Package' },
    { icon: 'shield', label: '100% Placement Support' },
  ],
  chips: [
    { value: '95%', label: 'Placement Rate' },
    { value: 'NAAC A', label: 'Grade Accredited' },
  ],
  tickerItems: [
    'AICTE Approved', 'NAAC A Grade', 'Est. 2008', '500+ Recruiters',
    '₹14 LPA Highest Package', '95% Placement', '2000+ Alumni',
  ].map((text) => ({ text })),
}

export default function HeroSection({ campusImageUrl, content, className }: HeroSectionProps) {
  const c = content || {}
  const bgUrl = c.backgroundImageUrl || campusImageUrl || '/media/images/hero-campus.jpg'
  const badge = c.badge || DEFAULTS.badge
  const headingTop = c.headingTop || DEFAULTS.headingTop
  const headingHighlight = c.headingHighlight || DEFAULTS.headingHighlight
  const subheading = c.subheading || DEFAULTS.subheading
  const primaryCta = { ...DEFAULTS.primaryCta, ...(c.primaryCta || {}) }
  const secondaryCta = { ...DEFAULTS.secondaryCta, ...(c.secondaryCta || {}) }
  const tertiaryCta = { ...DEFAULTS.tertiaryCta, ...(c.tertiaryCta || {}) }
  const trustItems = c.trustItems && c.trustItems.length ? c.trustItems : DEFAULTS.trustItems
  const chips = c.chips && c.chips.length ? c.chips : DEFAULTS.chips
  const ticker = c.tickerItems && c.tickerItems.length ? c.tickerItems : DEFAULTS.tickerItems

  return (
    <section
      className={cn('relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy', className)}
    >
      {/* Full-bleed background image */}
      {bgUrl && (
        <Image
          src={bgUrl}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      )}

      {/* Readability overlays: dark on the left, image more visible on the right */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/40"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/20 to-navy/60"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-dot-grid opacity-20" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-32 -right-24 h-[480px] w-[480px] rounded-full bg-gold/15 blur-[130px]"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-28 pt-28 sm:px-6 lg:px-8 lg:pb-24 lg:pt-32">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="max-w-2xl"
        >
          <motion.div variants={fadeUp}>
            <span className="glass-dark inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-gold sm:text-sm">
              {badge}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 font-sans font-bold tracking-tight text-balance"
          >
            <span className="block text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              {headingTop}
            </span>
            <span className="text-gradient-gold mt-1 block text-6xl leading-none sm:text-7xl lg:text-8xl">
              {headingHighlight}
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl font-sans text-base text-white/80 sm:text-lg"
          >
            {subheading}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            {primaryCta.href && (
              <Link
                href={primaryCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-colors duration-200 hover:bg-accent-dark sm:text-base"
              >
                {primaryCta.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
            {secondaryCta.href && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10 sm:text-base"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                {secondaryCta.label}
              </Link>
            )}
            {tertiaryCta.href && (
              <Link
                href={tertiaryCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-gold transition-colors duration-200 hover:bg-gold/10 sm:text-base"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {tertiaryCta.label}
              </Link>
            )}
          </motion.div>

          {/* Trust row */}
          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6"
          >
            {trustItems.map((item, i) => {
              const Icon = (item.icon && ICONS[item.icon]) || ShieldCheck
              return (
                <li key={item.label || i} className="flex items-center gap-2 text-sm text-white/85">
                  <Icon className="h-5 w-5 flex-shrink-0 text-gold" aria-hidden="true" />
                  <span className="font-medium">{item.label}</span>
                </li>
              )
            })}
          </motion.ul>
        </motion.div>
      </div>

      {/* Floating accent chips (over the image, right side) */}
      {chips.length > 0 && (
        <div className="absolute bottom-24 right-6 z-10 hidden flex-col gap-3 lg:flex xl:right-12">
          {chips.map((chip, i) => (
            <motion.div
              key={chip.label || i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
              className="glass-dark animate-float rounded-xl px-4 py-3 shadow-card"
              style={{ animationDelay: `${i * 0.6}s` }}
            >
              <p className="font-sans text-xl font-black leading-none text-gold">{chip.value}</p>
              <p className="mt-1 text-xs font-medium text-white/80">{chip.label}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Bottom marquee ticker */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-navy-deep/80 py-3 backdrop-blur-sm">
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap will-change-transform">
          {[0, 1].map((dup) => (
            <ul key={dup} className="flex items-center gap-8" aria-hidden={dup === 1 ? 'true' : undefined}>
              {ticker.map((item, i) => (
                <li key={`${dup}-${i}`} className="flex items-center gap-8 text-sm font-medium text-white/60">
                  <span>{item.text}</span>
                  <span className="text-gold" aria-hidden="true">&bull;</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
