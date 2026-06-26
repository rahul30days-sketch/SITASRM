'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Phone } from 'lucide-react'
import { fadeUp, viewportOnce } from '@/lib/motion'

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function CTA2({ siteSettings }: { siteSettings: any }) {
  const phone = siteSettings?.phone?.[0]?.number

  return (
    <section className="bg-white pb-24 pt-4 sm:pb-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative overflow-hidden rounded-[2.5rem] bg-neutral-900 px-6 py-16 text-center sm:px-12 sm:py-24"
        >
          {/* Gradient lighting */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(79,70,229,0.55),transparent_70%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-cyan-500/30 blur-[120px]"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur">
              Admissions open · 2026 intake
            </span>
            <h2 className="font-modern mt-6 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
              Your next chapter starts here
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
              Apply in minutes, talk to our admissions team, or come see the campus for yourself. Whatever&rsquo;s next — we&rsquo;ll help you get there.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/admissions/apply"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 px-7 py-3.5 text-base font-semibold text-white shadow-[0_12px_40px_-12px_rgba(59,130,246,0.8)] transition-all hover:-translate-y-0.5"
              >
                Start your application
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/10"
              >
                Book a campus visit
              </Link>
            </div>

            {phone && (
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Talk to admissions · {phone}
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
