'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Briefcase } from 'lucide-react'

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}
import { cn } from '@/lib/utils'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

interface ResearchInterest {
  topic?: string
}

interface FacultyMember {
  id?: string
  name?: string
  slug?: string
  designation?: string
  qualification?: string
  specialization?: string
  experienceYears?: number
  department?: { name?: string; slug?: string } | string | null
  profileImage?: { url?: string } | null
  researchInterests?: ResearchInterest[]
  linkedin?: string
}

interface FacultyHighlightsProps {
  faculty?: FacultyMember[]
  className?: string
}

function getInitials(name: string): string {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('') || 'F'
  )
}

function FacultyCard({ member }: { member: FacultyMember }) {
  const name = member.name ?? 'Faculty Member'
  const imageUrl = member.profileImage?.url
  const href = member.slug ? `/faculty/${member.slug}` : undefined
  const departmentName =
    member.department && typeof member.department === 'object'
      ? member.department.name
      : undefined
  const interests = (member.researchInterests ?? [])
    .map((r) => r?.topic)
    .filter((t): t is string => Boolean(t))
    .slice(0, 2)

  const nameNode = href ? (
    <Link href={href} className="transition-colors hover:text-primary-light">
      {name}
    </Link>
  ) : (
    name
  )

  return (
    <motion.article
      variants={fadeUp}
      className={cn(
        'group flex w-[280px] shrink-0 snap-start flex-col rounded-lg bg-white p-6',
        'shadow-card hover-lift hover:shadow-elevated',
        'border border-border/50 hover:border-secondary/40',
        'md:w-auto',
      )}
    >
      {/* Avatar */}
      <div className="flex justify-center">
        <div
          className={cn(
            'relative h-24 w-24 overflow-hidden rounded-full',
            'border-[3px] border-gold transition-shadow duration-300',
            'group-hover:shadow-glow-gold',
          )}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              sizes="96px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gold to-secondary-dark">
              <span className="font-display text-2xl font-bold text-white">
                {getInitials(name)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Name + designation */}
      <div className="mt-4 text-center">
        <h3 className="font-display text-lg font-bold text-primary">
          {nameNode}
        </h3>
        {member.designation ? (
          <p className="mt-0.5 text-sm text-text-muted">{member.designation}</p>
        ) : null}
      </div>

      {/* Department pill + experience chip */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        {departmentName ? (
          <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary">
            {departmentName}
          </span>
        ) : null}
        {typeof member.experienceYears === 'number' ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-secondary-50 px-3 py-1 text-xs font-medium text-secondary-dark">
            <Briefcase className="h-3 w-3" />
            {member.experienceYears} yrs experience
          </span>
        ) : null}
      </div>

      {/* Research interests */}
      {interests.length > 0 ? (
        <div className="mt-4 flex flex-wrap justify-center gap-1.5">
          {interests.map((topic) => (
            <span
              key={topic}
              className="inline-flex items-center rounded-sm bg-surface px-2.5 py-1 text-xs text-text-muted"
            >
              {topic}
            </span>
          ))}
        </div>
      ) : null}

      {/* LinkedIn */}
      {member.linkedin ? (
        <div className="mt-5 flex justify-center border-t border-border/60 pt-4">
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on LinkedIn`}
            className={cn(
              'inline-flex h-9 w-9 items-center justify-center rounded-full',
              'bg-primary-50 text-primary transition-colors',
              'hover:bg-primary hover:text-white',
            )}
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
        </div>
      ) : null}
    </motion.article>
  )
}

export default function FacultyHighlights({
  faculty = [],
  className,
}: FacultyHighlightsProps) {
  const members = faculty.slice(0, 4)

  return (
    <section className={cn('bg-surface py-16 sm:py-20 lg:py-24', className)}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* Heading */}
        <motion.div variants={fadeUp} className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
            Learn from the Best
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted">
            Our faculty bring decades of industry and research experience.
          </p>
        </motion.div>

        {/* Cards: horizontal scroll on mobile, grid on desktop */}
        <motion.div
          variants={staggerContainer}
          className={cn(
            '-mx-4 flex gap-5 overflow-x-auto px-4 pb-4 snap-x snap-mandatory',
            'md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0',
            'lg:grid-cols-4',
            '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          )}
        >
          {members.map((member, index) => (
            <FacultyCard key={member.id ?? member.slug ?? index} member={member} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div variants={fadeUp} className="mt-12 text-center">
          <Link
            href="/faculty"
            className={cn(
              'group inline-flex items-center gap-2 rounded-full px-6 py-3',
              'border-2 border-primary text-sm font-semibold text-primary',
              'transition-colors duration-200 hover:bg-primary hover:text-white',
            )}
          >
            Meet All Faculty
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
