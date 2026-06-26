import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react'
import { mediaUrl } from '@/lib/homeData'

/* eslint-disable @typescript-eslint/no-explicit-any */

const SOCIAL_PATHS: Record<string, string> = {
  facebook:
    'M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.300000000000001c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z',
  instagram:
    'M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.3.8-.4.4-.6.8-.8 1.3-.2.4-.3 1-.4 2.1C2.6 9.5 2.6 9.9 2.6 12s0 2.5.1 3.3c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.3.4.4.8.6 1.3.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.3-.8.4-.4.6-.8.8-1.3.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.7s0-2.5-.1-3.3c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.4-.9-.8-1.3-.4-.4-.8-.6-1.3-.8-.4-.2-1-.3-2.1-.4-1.2-.1-1.6-.1-4.7-.1zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8zm0 8.1a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4zm6.3-8.3a1.1 1.1 0 1 1-2.3 0 1.1 1.1 0 0 1 2.3 0z',
  linkedin:
    'M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3 0-2.95-1.8-2.95s-2.07 1.4-2.07 2.85V21H9z',
  youtube:
    'M23 12s0-3.2-.4-4.7c-.2-.8-.9-1.5-1.7-1.7C19.4 5.2 12 5.2 12 5.2s-7.4 0-8.9.4c-.8.2-1.5.9-1.7 1.7C1 8.8 1 12 1 12s0 3.2.4 4.7c.2.8.9 1.5 1.7 1.7 1.5.4 8.9.4 8.9.4s7.4 0 8.9-.4c.8-.2 1.5-.9 1.7-1.7.4-1.5.4-4.7.4-4.7zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z',
  twitter:
    'M18.9 2H22l-7.5 8.6L23 22h-6.8l-5.3-7-6.1 7H1.7l8-9.2L1 2h7l4.8 6.4L18.9 2zm-1.2 18h1.7L6.4 3.8H4.6L17.7 20z',
}

function Social({ links }: { links?: Record<string, string> }) {
  const present = Object.keys(SOCIAL_PATHS).filter((k) => links?.[k] && links[k].trim() !== '')
  if (!present.length) return null
  return (
    <div className="flex gap-2.5">
      {present.map((k) => (
        <a
          key={k}
          href={links?.[k]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={k}
          className="grid h-10 w-10 place-items-center rounded-full border border-black/10 text-neutral-500 transition-all hover:-translate-y-0.5 hover:border-transparent hover:bg-neutral-900 hover:text-white"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
            <path d={SOCIAL_PATHS[k]} />
          </svg>
        </a>
      ))}
    </div>
  )
}

export default function Footer2({ siteSettings }: { siteSettings: any }) {
  const logo = mediaUrl(siteSettings?.logo)
  const name = siteSettings?.siteName || 'SERI'
  const phone = siteSettings?.phone?.[0]?.number
  const email = siteSettings?.email?.[0]?.address
  const year = new Date().getFullYear()

  const cols = [
    {
      t: 'Academics',
      links: [
        ['Programs', '/programs'],
        ['Departments', '/departments'],
        ['Faculty', '/faculty'],
        ['Downloads', '/downloads'],
      ],
    },
    {
      t: 'Admissions',
      links: [
        ['Apply now', '/admissions/apply'],
        ['How to apply', '/admissions'],
        ['Scholarships', '/admissions'],
        ['Contact', '/contact'],
      ],
    },
    {
      t: 'Institute',
      links: [
        ['About', '/about'],
        ['News', '/news'],
        ['Events', '/events'],
        ['Gallery', '/gallery'],
      ],
    },
  ]

  return (
    <footer className="border-t border-black/5 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6">
        {/* Big CTA line */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-black/5 py-16 sm:py-20 lg:flex-row lg:items-end">
          <h2 className="font-modern max-w-2xl text-balance text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
            Let&rsquo;s build what&rsquo;s next, together.
          </h2>
          <Link
            href="/admissions/apply"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-neutral-900 px-7 py-3.5 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-neutral-800"
          >
            Apply now
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
        </div>

        {/* Link rows */}
        <div className="grid grid-cols-1 gap-12 py-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label={`${name} home`}>
              {logo ? (
                <Image src={logo} alt={name} width={130} height={40} className="h-9 w-auto object-contain" />
              ) : (
                <span className="flex items-center gap-2">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400 text-base font-bold text-white">
                    S
                  </span>
                  <span className="font-modern text-lg font-bold tracking-tight text-neutral-900">SERI</span>
                </span>
              )}
            </Link>
            <p className="mt-5 max-w-xs leading-relaxed text-neutral-500">
              {siteSettings?.tagline ||
                'SITASRM Engineering & Research Institute — a modern campus for makers, researchers and builders.'}
            </p>
            <div className="mt-6">
              <Social links={siteSettings?.socialLinks} />
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.t} className="lg:col-span-2">
              <p className="text-sm font-semibold text-neutral-900">{c.t}</p>
              <ul className="mt-4 space-y-3">
                {c.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-neutral-500 transition-colors hover:text-neutral-900">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2">
            <p className="text-sm font-semibold text-neutral-900">Contact</p>
            <ul className="mt-4 space-y-3.5 text-sm text-neutral-500">
              {siteSettings?.address && (
                <li className="flex gap-2.5">
                  <MapPin className="h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                  <span>{siteSettings.address}</span>
                </li>
              )}
              {phone && (
                <li className="flex gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-neutral-900">
                    {phone}
                  </a>
                </li>
              )}
              {email && (
                <li className="flex gap-2.5">
                  <Mail className="h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                  <a href={`mailto:${email}`} className="break-all hover:text-neutral-900">
                    {email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-black/5 py-7 text-sm text-neutral-400 sm:flex-row">
          <p>© {year} SITASRM Engineering &amp; Research Institute. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-neutral-900">Privacy</Link>
            <Link href="/terms" className="hover:text-neutral-900">Terms</Link>
            <Link href="/refund-policy" className="hover:text-neutral-900">Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
