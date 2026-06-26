'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView, useMotionValue, animate } from 'framer-motion'
import { Cpu, Leaf, Bot, Atom, ArrowUpRight } from 'lucide-react'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

function Count({ to, suffix, inView }: { to: number; suffix?: string; inView: boolean }) {
  const mv = useMotionValue(0)
  const [d, setD] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(mv, to, {
      duration: 1.8,
      ease: [0.21, 0.47, 0.32, 0.98],
      onUpdate: (v) => setD(Math.round(v)),
    })
    return () => c.stop()
  }, [inView, to, mv])
  return (
    <>
      {d.toLocaleString('en-IN')}
      {suffix}
    </>
  )
}

const THRUSTS = [
  {
    icon: Cpu,
    title: 'AI & Machine Learning',
    desc: 'Applied intelligence for healthcare, language and computer vision in dedicated GPU labs.',
  },
  {
    icon: Leaf,
    title: 'Renewable Energy',
    desc: 'Solar, storage and smart-grid research advancing India’s clean-energy transition.',
  },
  {
    icon: Bot,
    title: 'Robotics & Automation',
    desc: 'Autonomous systems, drones and industrial automation built with industry partners.',
  },
  {
    icon: Atom,
    title: 'Advanced Materials',
    desc: 'Nanomaterials and sustainable composites engineered for next-generation devices.',
  },
]

const METRICS = [
  { to: 320, suffix: '+', label: 'Research publications' },
  { to: 28, suffix: '+', label: 'Patents filed' },
  { to: 9, suffix: '', label: 'Centres of excellence' },
]

export default function Research4() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative overflow-hidden bg-royal-600 py-20 lg:py-28">
      <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-lotus/20 blur-[130px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-heritage/15 blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="lg:col-span-7"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-heritage/40 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-heritage backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rotate-45 bg-lotus" aria-hidden="true" />
              Research &amp; innovation
            </span>
            <h2 className="font-signature mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl">
              Ideas that move the <span className="italic text-lotus">world</span> forward
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
              Our faculty and students pursue research with real-world impact across four signature thrust
              areas, backed by funded centres and global collaborations.
            </p>
          </motion.div>

          {/* Metrics */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid grid-cols-3 gap-4 lg:col-span-5"
          >
            {METRICS.map((m) => (
              <motion.div
                key={m.label}
                variants={fadeUp}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm"
              >
                <p className="font-signature text-3xl font-bold text-heritage-light lg:text-4xl">
                  <Count to={m.to} suffix={m.suffix} inView={inView} />
                </p>
                <p className="mt-2 text-xs font-medium leading-snug text-white/60">{m.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Thrust areas */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {THRUSTS.map((t) => {
            const Icon = t.icon
            return (
              <motion.article
                key={t.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="group rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition-colors hover:border-heritage/40"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lotus/20 text-lotus transition-colors group-hover:bg-lotus group-hover:text-royal-900">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="font-signature mt-5 text-xl font-semibold text-white">{t.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{t.desc}</p>
              </motion.article>
            )
          })}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12"
        >
          <Link
            href="/departments"
            className="group inline-flex items-center gap-2 rounded-full border border-heritage bg-transparent px-7 py-3.5 text-base font-semibold text-white shadow-[0_0_30px_-6px_rgba(250,141,210,0.5)] transition-all hover:-translate-y-0.5 hover:bg-lotus hover:text-royal-900"
          >
            Explore research centres
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
