'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ShieldCheck,
  Briefcase,
  BookOpen,
  FlaskConical,
  Award,
  GraduationCap,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

const FEATURES: Feature[] = [
  {
    icon: ShieldCheck,
    title: 'AICTE & NAAC Approved',
    description: 'Fully recognized by all regulatory bodies',
  },
  {
    icon: Briefcase,
    title: '100% Placement Support',
    description: 'Dedicated placement cell with 500+ recruiters',
  },
  {
    icon: BookOpen,
    title: 'Industry-Ready Curriculum',
    description: 'Updated syllabus aligned with industry needs',
  },
  {
    icon: FlaskConical,
    title: 'World-Class Labs',
    description: 'State-of-the-art laboratories and research centers',
  },
  {
    icon: Award,
    title: 'Merit Scholarships',
    description: 'Up to 100% scholarship for deserving students',
  },
  {
    icon: GraduationCap,
    title: 'Expert Faculty',
    description: 'PhD qualified professors with industry experience',
  },
]

export default function WhyChooseSection({
  className,
}: {
  className?: string
}) {
  return (
    <section className={cn('bg-surface py-16 sm:py-20 lg:py-24', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="lg:sticky lg:top-24"
          >
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl font-bold leading-tight text-navy sm:text-4xl lg:text-5xl"
            >
              Why <span className="text-gradient-gold">10,000+</span> Students
              Choose SERI
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-lg text-base leading-relaxed text-text-muted sm:text-lg"
            >
              From accredited programs and modern labs to a placement cell that
              works for you, every part of the SERI experience is built to turn
              ambition into a career. Join a community that puts your success
              first.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8">
              <Link
                href="/admissions"
                className={cn(
                  'inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5',
                  'text-sm font-semibold text-white transition-all duration-200',
                  'hover:bg-accent-dark hover:shadow-elevated',
                )}
              >
                Explore Admissions
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right column — feature cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            {FEATURES.map((feature) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  variants={fadeUp}
                  className={cn(
                    'rounded-lg bg-white p-6 shadow-card',
                    'hover-lift transition-all duration-300',
                    'hover:scale-[1.02] hover:shadow-elevated',
                  )}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-navy">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
