'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutGrid, Check, ChevronDown } from 'lucide-react'

/**
 * Dev/review-only concept switcher. The ONE shared interactive element across all
 * three concept navbars — lets the client jump between the live homepage and the
 * three concept layouts. Styled via `variant` so it blends into each distinct nav.
 */

const LINKS = [
  { label: 'Current Homepage', sub: 'Live site', href: '/' },
  { label: 'Home 1 · Heritage', sub: 'Premium university', href: '/home-1' },
  { label: 'Home 2 · Studio', sub: 'Apple / Awwwards', href: '/home-2' },
  { label: 'Home 3 · Obsidian', sub: 'Dark luxury', href: '/home-3' },
]

type Variant = 'light' | 'dark' | 'glass'

export default function ConceptSwitcher({
  variant = 'light',
  triggerClassName = '',
  align = 'right',
}: {
  variant?: Variant
  triggerClassName?: string
  align?: 'left' | 'right'
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('click', onDoc)
    document.addEventListener('keydown', onEsc)
    return () => {
      document.removeEventListener('click', onDoc)
      document.removeEventListener('keydown', onEsc)
    }
  }, [])

  const panel =
    variant === 'dark'
      ? 'bg-neutral-950/95 border border-white/10 text-white shadow-2xl'
      : variant === 'glass'
        ? 'bg-white/80 backdrop-blur-2xl border border-black/[0.06] text-neutral-900 shadow-xl'
        : 'bg-white border border-black/[0.06] text-neutral-900 shadow-xl'

  const rowActive =
    variant === 'dark' ? 'bg-white/10 text-amber-300' : 'bg-neutral-100 text-neutral-900'
  const rowIdle =
    variant === 'dark' ? 'text-white/70 hover:bg-white/5' : 'text-neutral-600 hover:bg-neutral-50'

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setOpen((v) => !v)
        }}
        aria-haspopup="menu"
        aria-expanded={open}
        className={triggerClassName || 'inline-flex items-center gap-1.5 text-sm font-medium'}
      >
        <LayoutGrid className="h-4 w-4" aria-hidden="true" />
        <span>Concepts</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      <div
        role="menu"
        className={`absolute top-full z-[200] mt-3 w-64 overflow-hidden rounded-2xl p-1.5 transition-all duration-200 ${panel} ${
          align === 'right' ? 'right-0' : 'left-0'
        } ${open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'}`}
      >
        <p className={`px-3 pb-1.5 pt-2 text-[10px] font-semibold uppercase tracking-widest ${variant === 'dark' ? 'text-white/40' : 'text-neutral-400'}`}>
          Switch design concept
        </p>
        {LINKS.map((l) => {
          const active = pathname === l.href
          return (
            <Link
              key={l.href}
              href={l.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 transition-colors ${active ? rowActive : rowIdle}`}
            >
              <span className="flex flex-col">
                <span className="text-sm font-semibold leading-tight">{l.label}</span>
                <span className={`text-xs ${variant === 'dark' ? 'text-white/40' : 'text-neutral-400'}`}>{l.sub}</span>
              </span>
              {active && <Check className="h-4 w-4 shrink-0" aria-hidden="true" />}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
