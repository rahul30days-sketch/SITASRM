'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

interface Program {
  id: string
  name: string
  slug: string
  category: string
  duration?: string
  shortDescription?: string
  fees?: { tuitionFee?: number }
  highlights?: { icon?: string; label: string; value: string }[]
}

const CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'Undergraduate', value: 'undergraduate' },
  { label: 'Postgraduate', value: 'postgraduate' },
  { label: 'Diploma', value: 'diploma' },
  { label: 'Certificate', value: 'certificate' },
  { label: 'PhD', value: 'phd' },
]

export function ProgramsListingClient({ programs }: { programs: Program[] }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = useMemo(() => {
    return programs.filter((p) => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory
      const matchesSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [programs, activeCategory, searchQuery])

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === cat.value
                  ? 'bg-primary text-white'
                  : 'bg-white text-text-muted hover:bg-primary/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <input
          type="search"
          placeholder="Search programs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-md border border-border px-4 py-2 text-sm sm:w-64"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-text-muted">No programs found matching your criteria.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((program) => (
            <Link
              key={program.id}
              href={`/programs/${program.slug}`}
              className="group rounded-md border border-border bg-white p-6 shadow-card transition-shadow hover:shadow-elevated"
            >
              <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium capitalize text-primary">
                {program.category}
              </span>
              <h3 className="mb-2 font-display text-xl font-semibold text-text group-hover:text-primary">
                {program.name}
              </h3>
              {program.shortDescription && (
                <p className="mb-4 text-sm text-text-muted line-clamp-2">
                  {program.shortDescription}
                </p>
              )}
              <div className="flex items-center gap-4 text-sm text-text-muted">
                {program.duration && <span>{program.duration}</span>}
                {program.fees?.tuitionFee && (
                  <span>From ₹{program.fees.tuitionFee.toLocaleString('en-IN')}/yr</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
