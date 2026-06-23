'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  type MotionValue,
} from 'framer-motion'
import { ArrowRight, TrendingUp, Wallet, Users, Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

interface HighlightItem {
  label?: string
  value?: string | number
}

interface PlacementData {
  year?: number
  totalStudents?: number
  studentsPlaced?: number
  highestPackage?: number
  averagePackage?: number
  recruitersCount?: number
  highlights?: HighlightItem[]
}

interface Recruiter {
  id?: string
  name?: string
  logo?: { url?: string } | null
  tier?: string
}

interface PlacementHighlightsProps {
  placement?: PlacementData
  recruiters?: Recruiter[]
  className?: string
}

type Metric = {
  key: string
  label: string
  target: number
  prefix?: string
  suffix?: string
  decimals?: number
  icon: React.ReactNode
}

/** Animated count-up number driven by a framer-motion spring. */
function CountUp({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  active,
}: {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  active: boolean
}) {
  const motionValue: MotionValue<number> = useMotionValue(0)
  const spring = useSpring(motionValue, {
    stiffness: 70,
    damping: 22,
    mass: 0.8,
  })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (active) motionValue.set(value)
  }, [active, value, motionValue])

  useEffect(() => {
    const unsubscribe = spring.on('change', (latest) => {
      setDisplay(
        latest.toLocaleString('en-IN', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }),
      )
    })
    return () => unsubscribe()
  }, [spring, decimals])

  return (
    <span>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

export default function PlacementHighlights({
  placement = {},
  recruiters = [],
  className,
}: PlacementHighlightsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: true, margin: '-80px' })

  const year = placement.year
  const metrics: Metric[] = []

  if (typeof placement.highestPackage === 'number') {
    metrics.push({
      key: 'highest',
      label: 'Highest Package',
      target: placement.highestPackage,
      prefix: '₹',
      suffix: ' LPA',
      decimals: placement.highestPackage % 1 === 0 ? 0 : 1,
      icon: <TrendingUp className="h-5 w-5" />,
    })
  }
  if (typeof placement.averagePackage === 'number') {
    metrics.push({
      key: 'average',
      label: 'Average Package',
      target: placement.averagePackage,
      prefix: '₹',
      suffix: ' LPA',
      decimals: placement.averagePackage % 1 === 0 ? 0 : 1,
      icon: <Wallet className="h-5 w-5" />,
    })
  }
  if (typeof placement.studentsPlaced === 'number') {
    metrics.push({
      key: 'placed',
      label: 'Students Placed',
      target: placement.studentsPlaced,
      suffix: '+',
      icon: <Users className="h-5 w-5" />,
    })
  }
  if (typeof placement.recruitersCount === 'number') {
    metrics.push({
      key: 'recruiters',
      label: 'Recruiting Companies',
      target: placement.recruitersCount,
      suffix: '+',
      icon: <Building2 className="h-5 w-5" />,
    })
  }

  const topRecruiters = recruiters.slice(0, 12)

  return (
    <section
      className={cn('relative overflow-hidden bg-navy py-16 sm:py-20 lg:py-24', className)}
    >
      {/* Subtle grid texture */}
      <div className="pointer-events-none absolute inset-0 bg-grid-lines opacity-60" aria-hidden="true" />
      {/* Soft gold glow accent */}
      <div
        className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />

      <motion.div
        ref={containerRef}
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* Heading */}
        <motion.div variants={fadeUp} className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Placement Highlights{' '}
            {typeof year === 'number' ? (
              <span className="text-gradient-gold">{year}</span>
            ) : null}
          </h2>
          {typeof year === 'number' ? (
            <div className="mt-6 flex justify-center gap-2">
              <span className="inline-flex items-center rounded-full bg-gold px-5 py-1.5 text-sm font-semibold text-navy shadow-glow-gold">
                {year}
              </span>
            </div>
          ) : null}
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
          {/* LEFT — Metric cards */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            {metrics.length === 0 ? (
              <div className="glass-dark col-span-full rounded-lg p-8 text-center text-white/60">
                Placement data coming soon.
              </div>
            ) : (
              metrics.map((metric) => (
                <motion.div
                  key={metric.key}
                  variants={fadeUp}
                  className={cn(
                    'glass-dark hover-lift group rounded-lg p-6',
                    'hover:border-gold/40',
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-gold/15 text-gold transition-colors group-hover:bg-gold group-hover:text-navy">
                      {metric.icon}
                    </span>
                  </div>
                  <p className="mt-4 font-sans text-3xl font-black tracking-tight text-white sm:text-4xl">
                    <CountUp
                      value={metric.target}
                      prefix={metric.prefix}
                      suffix={metric.suffix}
                      decimals={metric.decimals}
                      active={inView}
                    />
                  </p>
                  <p className="mt-1 text-sm text-white/60">{metric.label}</p>
                </motion.div>
              ))
            )}
          </motion.div>

          {/* RIGHT — Top recruiters */}
          <motion.div variants={fadeUp}>
            <h3 className="mb-6 font-display text-xl font-semibold text-white">
              Our Top Recruiters
            </h3>

            {topRecruiters.length > 0 ? (
              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4"
              >
                {topRecruiters.map((recruiter, index) => {
                  const logoUrl = recruiter.logo?.url
                  const name = recruiter.name ?? 'Recruiter'
                  return (
                    <motion.div
                      key={recruiter.id ?? recruiter.name ?? index}
                      variants={fadeUp}
                      className={cn(
                        'glass-dark hover-lift flex aspect-[3/2] items-center justify-center rounded-md p-3',
                        'hover:border-gold/40',
                      )}
                    >
                      {logoUrl ? (
                        <Image
                          src={logoUrl}
                          alt={name}
                          width={120}
                          height={60}
                          className="max-h-9 w-auto object-contain opacity-90 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                        />
                      ) : (
                        <span className="text-center text-xs font-semibold text-white/70">
                          {name}
                        </span>
                      )}
                    </motion.div>
                  )
                })}
              </motion.div>
            ) : (
              <div className="glass-dark rounded-lg p-8 text-center text-sm text-white/50">
                Recruiter logos coming soon.
              </div>
            )}

            <div className="mt-6">
              <Link
                href="/placements"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-colors hover:text-gold-light"
              >
                View All Recruiters
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
