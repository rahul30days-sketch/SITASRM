import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react'
import { WHITE_LOGO } from '@/lib/fallbackImages'

/* eslint-disable @typescript-eslint/no-explicit-any */

const SOCIAL_PATHS: Record<string, string> = {
  facebook: 'M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z',
  instagram: 'M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.1a4.9 4.9 0 1 0 0 9.8 4.9 4.9 0 0 0 0-9.8zm0 8.1a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm6.3-8.3a1.1 1.1 0 1 1-2.3 0 1.1 1.1 0 0 1 2.3 0z',
  linkedin: 'M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3 0-2.95-1.8-2.95s-2.07 1.4-2.07 2.85V21H9z',
  youtube: 'M23 12s0-3.2-.4-4.7c-.2-.8-.9-1.5-1.7-1.7C19.4 5.2 12 5.2 12 5.2s-7.4 0-8.9.4c-.8.2-1.5.9-1.7 1.7C1 8.8 1 12 1 12s0 3.2.4 4.7c.2.8.9 1.5 1.7 1.7 1.5.4 8.9.4 8.9.4s7.4 0 8.9-.4c.8-.2 1.5-.9 1.7-1.7.4-1.5.4-4.7.4-4.7zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z',
}

function Social({ links }: { links?: Record<string, string> }) {
  const present = Object.keys(SOCIAL_PATHS).filter((k) => links?.[k] && links[k].trim() !== '')
  if (!present.length) return null
  return (
    <div className="flex gap-3">
      {present.map((k) => (
        <a
          key={k}
          href={links?.[k]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={k}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:-translate-y-0.5 hover:border-lotus hover:bg-lotus hover:text-royal-900"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
            <path d={SOCIAL_PATHS[k]} />
          </svg>
        </a>
      ))}
    </div>
  )
}

export default function Footer4({ siteSettings }: { siteSettings: any }) {
  const phone = siteSettings?.phone?.[0]?.number
  const email = siteSettings?.email?.[0]?.address
  const cols = [
    { t: 'Academics', links: [['Programs', '/programs'], ['Departments', '/departments'], ['Faculty', '/faculty'], ['Research', '/departments']] },
    { t: 'Admissions', links: [['Apply 2026', '/admissions/apply'], ['Scholarships', '/admissions'], ['Eligibility', '/admissions'], ['Prospectus', '/downloads']] },
    { t: 'Institute', links: [['About', '/about'], ['Placements', '/placements'], ['News', '/news'], ['Gallery', '/gallery']] },
  ]

  return (
    <footer className="relative overflow-hidden bg-royal-950 text-white">
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-lotus/10 blur-[130px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* CTA + newsletter band */}
        <div className="grid grid-cols-1 gap-10 border-b border-heritage/25 py-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-heritage">Admissions 2026 are open</p>
            <h2 className="font-signature mt-3 text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Begin your <span className="italic text-lotus">SITASRM</span> journey
            </h2>
          </div>
          <div className="lg:justify-self-end lg:text-right">
            <form action="/contact" method="get" className="flex max-w-md gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 backdrop-blur-sm">
              <input
                type="email"
                name="q"
                placeholder="Your email for updates"
                aria-label="Email for admissions updates"
                className="flex-1 bg-transparent px-4 text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
              <button type="submit" className="rounded-full bg-lotus px-5 py-2.5 text-sm font-semibold text-royal-900 ring-1 ring-heritage/30 transition-colors hover:bg-lotus-light">
                Subscribe
              </button>
            </form>
            <Link href="/admissions/apply" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-heritage hover:text-heritage-light">
              Start your application <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Link grid */}
        <div className="grid grid-cols-1 gap-12 py-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Image src={WHITE_LOGO} alt="SITASRM Engineering & Research Institute" width={260} height={84} className="h-14 w-auto object-contain" />
            <p className="mt-5 max-w-sm leading-relaxed text-white/55">
              SITASRM Engineering &amp; Research Institute — where Indian heritage meets future technology,
              shaping engineers, innovators and leaders.
            </p>
            <div className="mt-6">
              <Social links={siteSettings?.socialLinks} />
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.t} className="lg:col-span-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lotus">{c.t}</p>
              <ul className="mt-5 space-y-3">
                {c.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-white/60 transition-colors hover:text-white">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lotus">Contact</p>
            <ul className="mt-5 space-y-4 text-sm text-white/60">
              {siteSettings?.address && (
                <li className="flex gap-2.5"><MapPin className="h-4 w-4 shrink-0 text-heritage" aria-hidden="true" /><span>{siteSettings.address}</span></li>
              )}
              {phone && (
                <li className="flex gap-2.5"><Phone className="h-4 w-4 shrink-0 text-heritage" aria-hidden="true" /><a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-white">{phone}</a></li>
              )}
              {email && (
                <li className="flex gap-2.5"><Mail className="h-4 w-4 shrink-0 text-heritage" aria-hidden="true" /><a href={`mailto:${email}`} className="break-all hover:text-white">{email}</a></li>
              )}
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-heritage/25 py-7 text-sm text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} SITASRM Engineering &amp; Research Institute. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-lotus">Privacy</Link>
            <Link href="/terms" className="hover:text-lotus">Terms</Link>
            <Link href="/refund-policy" className="hover:text-lotus">Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
