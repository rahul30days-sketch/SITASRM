'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, Clock, GraduationCap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

/* Loose pass-through types — raw Payload docs. */
interface ProgramHighlight {
  icon?: string
  label?: string
  value?: string
}

interface Program {
  id?: string
  name?: string
  slug?: string
  category?: string
  duration?: string
  shortDescription?: string
  fees?: { tuitionFee?: number; feesNote?: string }
  highlights?: ProgramHighlight[]
  featuredImage?: { url?: string } | null
  [key: string]: unknown
}

interface ProgramsShowcaseProps {
  programs?: Program[]
  className?: string
}

/* Tab labels for filtering. "All" is always first. */
const TABS = ['All', 'B.Tech', 'M.Tech', 'Diploma', 'MBA'] as const
type Tab = (typeof TABS)[number]

/* Pretty labels for the category enum (fallback when name has no keyword). */
const CATEGORY_LABELS: Record<string, string> = {
  undergraduate: 'Undergraduate',
  postgraduate: 'Postgraduate',
  diploma: 'Diploma',
  certificate: 'Certificate',
  phd: 'PhD',
}

/**
 * Derive a filter group from the program name (Payload's `category` enum does
 * not map to the B.Tech/M.Tech/MBA tab labels). Falls back to the category.
 */
function deriveGroup(program: Program): string {
  const name = (program.name || '').toLowerCase()
  if (name.includes('b.tech') || name.includes('btech')) return 'B.Tech'
  if (name.includes('m.tech') || name.includes('mtech')) return 'M.Tech'
  if (name.includes('mba')) return 'MBA'
  if (name.includes('diploma')) return 'Diploma'
  const cat = program.category || ''
  return CATEGORY_LABELS[cat] || cat || 'Program'
}

function initials(name?: string): string {
  if (!name) return 'P'
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || '')
    .join('') || 'P'
}

function feesLine(fees?: Program['fees']): string {
  if (fees && typeof fees.tuitionFee === 'number') {
    return `From ₹${fees.tuitionFee.toLocaleString('en-IN')}/year`
  }
  if (fees?.feesNote) return fees.feesNote
  return 'Fees on request'
}

export default function ProgramsShowcase({
  programs = [],
  className,
}: ProgramsShowcaseProps) {
  const [activeTab, setActiveTab] = useState<Tab>('All')

  const list = Array.isArray(programs) ? programs : []

  const filtered = useMemo(
    () =>
      activeTab === 'All'
        ? list
        : list.filter((p) => deriveGroup(p) === activeTab),
    [list, activeTab],
  )

  return (
    <section className={cn('bg-white py-16 sm:py-20 lg:py-24', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mb-10 text-center sm:mb-12"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl font-bold text-navy sm:text-4xl lg:text-5xl"
          >
            Our Academic Programs
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="mx-auto mt-4 h-1 w-20 rounded-full bg-gold"
          />
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-base text-text-muted sm:text-lg"
          >
            Industry-aligned degrees designed to launch careers — explore our
            full range of engineering, technology and management programs.
          </motion.p>
        </motion.div>

        {/* Filter tabs */}
        <div className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-3">
          {TABS.map((tab) => {
            const active = activeTab === tab
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                aria-pressed={active}
                className={cn(
                  'rounded-full px-5 py-2 text-sm font-medium transition-all duration-200',
                  active
                    ? 'bg-navy text-white shadow-card'
                    : 'border border-border bg-white text-text-muted hover:border-gold hover:text-navy',
                )}
              >
                {tab}
              </button>
            )
          })}
        </div>

        {/* Cards grid */}
        {filtered.length === 0 ? (
          <p className="py-12 text-center text-text-muted">
            No programs in this category yet.
          </p>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((program, idx) => {
                const group = deriveGroup(program)
                const slug = program.slug || ''
                const imgUrl = program.featuredImage?.url
                const highlights = (program.highlights || []).slice(0, 3)
                return (
                  <motion.article
                    key={program.id || program.slug || idx}
                    layout
                    initial={{ opacity: 0, scale: 0.96, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className={cn(
                      'group flex flex-col overflow-hidden rounded-lg border border-border bg-white',
                      'hover-lift transition-shadow duration-300 hover:shadow-glow-gold',
                    )}
                  >
                    {/* Image / fallback with badge overlay */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-navy">
                      {imgUrl ? (
                        <Image
                          src={imgUrl}
                          alt={program.name || 'Program'}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-navy to-navy-light transition-transform duration-500 group-hover:scale-105">
                          <span className="font-display text-4xl font-bold text-gold/80">
                            {initials(program.name)}
                          </span>
                        </div>
                      )}
                      <span className="absolute left-3 top-3 inline-block rounded-full bg-gold px-3 py-1 text-xs font-semibold text-navy shadow-sm">
                        {group}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-display text-lg font-bold text-navy">
                        {program.name || 'Program'}
                      </h3>

                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        {program.duration && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-text-muted">
                            <Clock className="h-3 w-3 text-gold" aria-hidden="true" />
                            {program.duration}
                          </span>
                        )}
                      </div>

                      <p className="mt-3 text-sm font-semibold text-navy">
                        {feesLine(program.fees)}
                      </p>

                      {highlights.length > 0 && (
                        <ul className="mt-4 space-y-2">
                          {highlights.map((h, i) => (
                            <li
                              key={(h.label || '') + i}
                              className="flex items-start gap-2 text-sm text-text-muted"
                            >
                              <Check
                                className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold"
                                aria-hidden="true"
                              />
                              <span>
                                {h.label}
                                {h.value ? (
                                  <span className="font-medium text-navy">
                                    {' '}
                                    {h.value}
                                  </span>
                                ) : null}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Footer */}
                      <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                        <Link
                          href={`/programs/${slug}`}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-navy transition-colors hover:text-gold"
                        >
                          Explore Program
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <Link
                          href="/admissions/apply"
                          className="inline-flex items-center rounded-full bg-accent px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-accent-dark"
                        >
                          Apply Now
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* View all */}
        <div className="mt-12 text-center">
          <Link
            href="/programs"
            className={cn(
              'inline-flex items-center gap-2 rounded-full border-2 border-navy px-7 py-3',
              'text-sm font-semibold text-navy transition-all duration-200',
              'hover:bg-navy hover:text-white',
            )}
          >
            <GraduationCap className="h-4 w-4" aria-hidden="true" />
            View All {list.length || ''} Programs
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
