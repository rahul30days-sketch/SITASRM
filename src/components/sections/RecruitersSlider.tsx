'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

interface Recruiter {
  id?: string
  name?: string
  logo?: { url?: string } | null
}

interface RecruitersSliderProps {
  recruiters?: Recruiter[]
  className?: string
}

function LogoCard({ recruiter }: { recruiter: Recruiter }) {
  const logoUrl = recruiter.logo?.url
  const name = recruiter.name ?? 'Recruiter'
  return (
    <div
      className={cn(
        'flex h-20 w-40 shrink-0 items-center justify-center rounded-md',
        'border border-border/70 bg-white px-5 py-4',
        'transition-shadow duration-300 hover:shadow-card',
      )}
    >
      {logoUrl ? (
        <Image
          src={logoUrl}
          alt={name}
          width={140}
          height={56}
          className="max-h-10 w-auto object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
        />
      ) : (
        <span className="text-center text-sm font-semibold text-text-muted">
          {name}
        </span>
      )}
    </div>
  )
}

function MarqueeRow({
  items,
  direction,
}: {
  items: Recruiter[]
  direction: 'left' | 'right'
}) {
  // Duplicate items so the -50% translate loop is seamless.
  const loop = [...items, ...items]
  return (
    <div className="group relative flex overflow-hidden">
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent sm:w-20" />
      <div
        className={cn(
          'flex w-max gap-5 pr-5',
          direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right',
          'group-hover:[animation-play-state:paused]',
        )}
      >
        {loop.map((recruiter, index) => (
          <LogoCard
            key={`${recruiter.id ?? recruiter.name ?? 'r'}-${index}`}
            recruiter={recruiter}
          />
        ))}
      </div>
    </div>
  )
}

export default function RecruitersSlider({
  recruiters = [],
  className,
}: RecruitersSliderProps) {
  if (recruiters.length === 0) return null

  // Split across two rows; fall back to the same set if there is only one.
  const mid = Math.ceil(recruiters.length / 2)
  const rowOne = recruiters.slice(0, mid)
  const tail = recruiters.slice(mid)
  const rowTwo = tail.length > 0 ? tail : rowOne

  return (
    <section className={cn('overflow-hidden bg-white py-16 sm:py-20 lg:py-24', className)}>
      <div className="mx-auto mb-12 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
          Trusted by Industry Leaders
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted">
          Our graduates are recruited by leading organizations across the globe.
        </p>
      </div>

      <div className="flex flex-col gap-5 sm:gap-6">
        <MarqueeRow items={rowOne} direction="left" />
        <MarqueeRow items={rowTwo} direction="right" />
      </div>
    </section>
  )
}
