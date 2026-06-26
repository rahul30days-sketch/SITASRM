import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react'
import { WHITE_LOGO } from '@/lib/fallbackImages'

/* eslint-disable @typescript-eslint/no-explicit-any */

const SOCIAL_PATHS: Record<string, string> = {
  facebook: 'M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.300000000000001c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z',
  instagram: 'M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.3.8-.4.4-.6.8-.8 1.3-.2.4-.3 1-.4 2.1C2.6 9.5 2.6 9.9 2.6 12s0 2.5.1 3.3c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.3.4.4.8.6 1.3.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.3-.8.4-.4.6-.8.8-1.3.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.7s0-2.5-.1-3.3c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.4-.9-.8-1.3-.4-.4-.8-.6-1.3-.8-.4-.2-1-.3-2.1-.4-1.2-.1-1.6-.1-4.7-.1zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8zm0 8.1a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4zm6.3-8.3a1.1 1.1 0 1 1-2.3 0 1.1 1.1 0 0 1 2.3 0z',
  linkedin: 'M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3 0-2.95-1.8-2.95s-2.07 1.4-2.07 2.85V21H9z',
  youtube: 'M23 12s0-3.2-.4-4.7c-.2-.8-.9-1.5-1.7-1.7C19.4 5.2 12 5.2 12 5.2s-7.4 0-8.9.4c-.8.2-1.5.9-1.7 1.7C1 8.8 1 12 1 12s0 3.2.4 4.7c.2.8.9 1.5 1.7 1.7 1.5.4 8.9.4 8.9.4s7.4 0 8.9-.4c.8-.2 1.5-.9 1.7-1.7.4-1.5.4-4.7.4-4.7zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z',
  twitter: 'M18.9 2H22l-7.5 8.6L23 22h-6.8l-5.3-7-6.1 7H1.7l8-9.2L1 2h7l4.8 6.4L18.9 2zm-1.2 18h1.7L6.4 3.8H4.6L17.7 20z',
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
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:bg-amber-400 hover:text-neutral-950"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
            <path d={SOCIAL_PATHS[k]} />
          </svg>
        </a>
      ))}
    </div>
  )
}

export default function Footer3({ siteSettings }: { siteSettings: any }) {
  const phone = siteSettings?.phone?.[0]?.number
  const email = siteSettings?.email?.[0]?.address
  const cols = [
    { t: 'Academics', links: [['Programs', '/programs'], ['Departments', '/departments'], ['Faculty', '/faculty'], ['Research', '/departments']] },
    { t: 'Admissions', links: [['Apply now', '/admissions/apply'], ['Process', '/admissions'], ['Scholarships', '/admissions'], ['Prospectus', '/downloads']] },
    { t: 'Institute', links: [['About', '/about'], ['News', '/news'], ['Events', '/events'], ['Gallery', '/gallery']] },
  ]

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-neutral-950 text-white">
      <div className="pointer-events-none absolute -left-40 top-0 h-[30rem] w-[30rem] rounded-full bg-amber-500/[0.07] blur-[140px]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-grid-lines opacity-20" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1500px] px-6 pt-20 lg:px-12 lg:pt-28">
        {/* CTA strip */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-16 lg:flex-row lg:items-center">
          <div>
            <p className="font-lux text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Ready when you are</p>
            <h2 className="font-lux mt-3 text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl">
              Let&apos;s build<span className="text-gradient-gold"> what&apos;s next</span>
            </h2>
          </div>
          <Link
            href="/contact"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-amber-400 px-8 py-4 text-base font-semibold text-neutral-950 transition-all hover:-translate-y-0.5 hover:bg-amber-300"
          >
            Plan a campus visit
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
        </div>

        {/* Link grid */}
        <div className="grid grid-cols-1 gap-12 py-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Image
              src={WHITE_LOGO}
              alt="SITASRM Engineering & Research Institute"
              width={250}
              height={80}
              className="h-12 w-auto object-contain"
            />
            <p className="mt-5 max-w-sm leading-relaxed text-white/55">
              SITASRM Engineering &amp; Research Institute — forging the engineers, founders and researchers who will define the next century of technology.
            </p>
            <div className="mt-7">
              <Social links={siteSettings?.socialLinks} />
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.t} className="lg:col-span-2">
              <p className="font-lux text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">{c.t}</p>
              <ul className="mt-5 space-y-3">
                {c.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-white/55 transition-colors hover:text-white">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2">
            <p className="font-lux text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Contact</p>
            <ul className="mt-5 space-y-4 text-sm text-white/55">
              {siteSettings?.address && (
                <li className="flex gap-2.5"><MapPin className="h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" /><span>{siteSettings.address}</span></li>
              )}
              {phone && (
                <li className="flex gap-2.5"><Phone className="h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" /><a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-white">{phone}</a></li>
              )}
              {email && (
                <li className="flex gap-2.5"><Mail className="h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" /><a href={`mailto:${email}`} className="break-all hover:text-white">{email}</a></li>
              )}
            </ul>
          </div>
        </div>

        {/* Giant wordmark */}
        <div className="border-t border-white/10 pt-12" aria-hidden="true">
          <p className="font-lux select-none bg-gradient-to-b from-white/[0.14] to-white/[0.02] bg-clip-text text-center text-[18vw] font-extrabold uppercase leading-[0.8] tracking-tighter text-transparent lg:text-[14vw]">
            SITASRM
          </p>
        </div>

        {/* Legal bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 text-sm text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} SITASRM Engineering &amp; Research Institute. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/refund-policy" className="hover:text-white">Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
