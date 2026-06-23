'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, animate } from 'framer-motion'
import {
  Building2,
  TrendingUp,
  Award,
  CalendarDays,
  Users,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'
import { cn } from '@/lib/utils'

/** Stat input — values are CMS-driven from the homepage (Site Settings + Placements). */
export interface StatInput {
  icon?: string
  value: number
  prefix?: string
  suffix?: string
  label: string
}

const ICONS: Record<string, LucideIcon> = {
  recruiters: Building2,
  package: TrendingUp,
  placement: Award,
  years: CalendarDays,
  alumni: Users,
  programs: GraduationCap,
}

const DEFAULT_STATS: StatInput[] = [
  { icon: 'recruiters', value: 500, suffix: '+', label: 'Recruiters' },
  { icon: 'package', value: 14, prefix: '₹', suffix: ' LPA', label: 'Highest Package' },
  { icon: 'placement', value: 95, suffix: '%', label: 'Placement Rate' },
  { icon: 'years', value: 15, suffix: '+', label: 'Years of Excellence' },
  { icon: 'alumni', value: 2000, suffix: '+', label: 'Alumni Network' },
  { icon: 'programs', value: 8, suffix: '', label: 'Programs Offered' },
]

function CountUp({ value, inView }: { value: number; inView: boolean }) {
  const motionValue = useMotionValue(0)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) {
      setDisplay(value)
      return
    }
    const controls = animate(motionValue, value, {
      duration: 2,
      ease: [0.21, 0.47, 0.32, 0.98],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    })
    return () => controls.stop()
  }, [inView, value, motionValue])

  return <>{display.toLocaleString('en-IN')}</>
}

export default function StatsSection({ stats }: { stats?: StatInput[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })
  const items = stats && stats.length > 0 ? stats : DEFAULT_STATS

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-navy py-16 sm:py-20 lg:py-24"
      aria-label="Institute statistics"
    >
      <div className="absolute inset-0 bg-grid-lines opacity-100" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className={cn(
            'flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:pb-0',
            '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
            'sm:grid sm:grid-cols-2 sm:overflow-visible md:grid-cols-3 md:gap-5 lg:grid-cols-6',
          )}
        >
          {items.map(({ icon, value, prefix, suffix, label }) => {
            const Icon = (icon && ICONS[icon]) || GraduationCap
            return (
              <motion.div
                key={label}
                variants={fadeUp}
                className={cn(
                  'glass-dark hover-lift group relative flex shrink-0 snap-start flex-col items-center overflow-hidden rounded-2xl px-3 py-6 text-center',
                  'min-w-[150px] sm:min-w-0',
                  'hover:shadow-glow-gold',
                )}
              >
                <span
                  className="absolute inset-x-6 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100"
                  aria-hidden="true"
                />

                <Icon className="h-7 w-7 text-gold" strokeWidth={1.5} aria-hidden="true" />

                <p className="mt-4 flex items-baseline justify-center whitespace-nowrap font-sans font-black leading-none text-white">
                  {prefix && <span className="text-2xl text-gold sm:text-3xl">{prefix}</span>}
                  <span className="text-[2rem] tabular-nums sm:text-4xl xl:text-5xl">
                    <CountUp value={value} inView={inView} />
                  </span>
                  {suffix && (
                    <span className="text-xl text-gold sm:text-2xl">{suffix}</span>
                  )}
                </p>

                <p className="mt-3 text-xs font-medium text-white/60 sm:text-sm">{label}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
