'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  UserPlus,
  FileText,
  Upload,
  BadgeCheck,
  CheckCircle2,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

interface Step {
  number: number
  icon: LucideIcon
  title: string
  description: string
}

const STEPS: Step[] = [
  {
    number: 1,
    icon: UserPlus,
    title: 'Register Online',
    description: 'Create your account on our portal',
  },
  {
    number: 2,
    icon: FileText,
    title: 'Fill Application',
    description: 'Complete the application form with your details',
  },
  {
    number: 3,
    icon: Upload,
    title: 'Upload Documents',
    description: 'Submit required academic documents',
  },
  {
    number: 4,
    icon: BadgeCheck,
    title: 'Document Verification',
    description: 'Our team verifies your credentials within 48 hrs',
  },
  {
    number: 5,
    icon: CheckCircle2,
    title: 'Confirm Admission',
    description: 'Pay fee and confirm your seat',
  },
]

export default function AdmissionProcess({
  className,
}: {
  className?: string
}) {
  return (
    <section className={cn('bg-white py-16 sm:py-20 lg:py-24', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mb-12 text-center sm:mb-16"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl font-bold text-navy sm:text-4xl lg:text-5xl"
          >
            Simple Admission Process
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="mx-auto mt-4 h-1 w-20 rounded-full bg-gold"
          />
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-xl text-base text-text-muted sm:text-lg"
          >
            Your journey to SERI starts here
          </motion.p>
        </motion.div>

        {/* Desktop: horizontal stepper */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative hidden md:block"
        >
          {/* Connecting dashed line behind circles (circle center = top 8) */}
          <div
            className="absolute left-[10%] right-[10%] top-8 border-t-2 border-dashed border-gold/50"
            aria-hidden="true"
          />
          <ol className="relative grid grid-cols-5 gap-4">
            {STEPS.map((step) => {
              const Icon = step.icon
              return (
                <motion.li
                  key={step.number}
                  variants={fadeUp}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-navy ring-4 ring-gold">
                    <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-xs font-bold text-navy">
                      {step.number}
                    </span>
                    <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-navy">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[14rem] text-sm leading-relaxed text-text-muted">
                    {step.description}
                  </p>
                </motion.li>
              )
            })}
          </ol>
        </motion.div>

        {/* Mobile: vertical timeline */}
        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative ml-5 border-l-2 border-dashed border-gold/50 md:hidden"
        >
          {STEPS.map((step) => {
            const Icon = step.icon
            return (
              <motion.li
                key={step.number}
                variants={fadeUp}
                className="mb-8 ml-8 last:mb-0"
              >
                <div className="absolute -left-[1.6rem] flex h-12 w-12 items-center justify-center rounded-full bg-navy ring-4 ring-gold">
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[0.65rem] font-bold text-navy">
                    {step.number}
                  </span>
                  <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-bold text-navy">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-text-muted">
                  {step.description}
                </p>
              </motion.li>
            )
          })}
        </motion.ol>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/admissions/apply"
            className={cn(
              'inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 sm:w-auto',
              'text-base font-semibold text-white transition-all duration-200',
              'hover:bg-accent-dark hover:shadow-elevated',
            )}
          >
            Start Your Application
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
