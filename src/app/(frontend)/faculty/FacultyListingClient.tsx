'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

interface FacultyMember {
  id: string
  name: string
  slug: string
  designation?: string
  department?: { id: string; name: string } | string
  specialization?: string
  qualification?: string
}

interface Department {
  id: string
  name: string
}

export function FacultyListingClient({
  faculty,
  departments,
}: {
  faculty: FacultyMember[]
  departments: Department[]
}) {
  const [activeDept, setActiveDept] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = useMemo(() => {
    return faculty.filter((f) => {
      const deptId = typeof f.department === 'object' ? f.department?.id : f.department
      const matchesDept = activeDept === 'all' || deptId === activeDept
      const matchesSearch = !searchQuery || f.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesDept && matchesSearch
    })
  }, [faculty, activeDept, searchQuery])

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveDept('all')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeDept === 'all' ? 'bg-primary text-white' : 'bg-white text-text-muted hover:bg-primary/10'
            }`}
          >
            All
          </button>
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setActiveDept(dept.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeDept === dept.id ? 'bg-primary text-white' : 'bg-white text-text-muted hover:bg-primary/10'
              }`}
            >
              {dept.name}
            </button>
          ))}
        </div>
        <input
          type="search"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-md border border-border px-4 py-2 text-sm sm:w-64"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-text-muted">No faculty found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((member) => (
            <Link
              key={member.id}
              href={`/faculty/${member.slug}`}
              className="group rounded-md border border-border bg-white p-6 text-center shadow-card transition-shadow hover:shadow-elevated"
            >
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                {member.name.charAt(0)}
              </div>
              <h3 className="font-display text-lg font-semibold group-hover:text-primary">{member.name}</h3>
              {member.designation && <p className="text-sm text-text-muted">{member.designation}</p>}
              {typeof member.department === 'object' && member.department?.name && (
                <p className="mt-1 text-xs text-secondary">{member.department.name}</p>
              )}
              {member.specialization && (
                <p className="mt-2 text-xs text-text-muted line-clamp-2">{member.specialization}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
