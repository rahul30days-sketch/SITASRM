'use client'

import { useState } from 'react'
import Link from 'next/link'

const TABS = ['Overview', 'Curriculum', 'Career', 'Faculty'] as const
type Tab = (typeof TABS)[number]

interface ProgramDetailClientProps {
  program: Record<string, any>
}

export function ProgramDetailClient({ program }: ProgramDetailClientProps) {
  const [activeTab, setActiveTab] = useState<Tab>('Overview')

  const curriculum = program.curriculum as { semester: number; subjects: { name: string; credits?: number; type?: string }[] }[] | undefined
  const careers = program.careerOpportunities as { role: string; companies?: string }[] | undefined
  const faculty = program.faculty as { id: string; name: string; designation?: string; specialization?: string }[] | undefined
  const fees = program.fees as { tuitionFee?: number; hostelFee?: number; otherFees?: number; scholarshipAvailable?: boolean; feesNote?: string } | undefined
  const highlights = program.highlights as { icon?: string; label: string; value: string }[] | undefined

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="mb-8 flex gap-1 rounded-md bg-white p-1 shadow-card">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 rounded px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab ? 'bg-primary text-white' : 'text-text-muted hover:bg-surface'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Overview' && (
          <div className="space-y-6">
            {program.shortDescription && (
              <p className="text-lg text-text-muted">{program.shortDescription as string}</p>
            )}
            {highlights && highlights.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                {highlights.map((h, i) => (
                  <div key={i} className="rounded-md border border-border bg-white p-4">
                    <div className="text-sm text-text-muted">{h.label}</div>
                    <div className="text-lg font-semibold text-primary">{h.value}</div>
                  </div>
                ))}
              </div>
            )}
            {program.approvedBy && (
              <div>
                <h3 className="mb-2 font-display text-lg font-semibold">Approved By</h3>
                <div className="flex flex-wrap gap-2">
                  {(program.approvedBy as { body: string }[]).map((a, i) => (
                    <span key={i} className="rounded-full bg-secondary/20 px-3 py-1 text-sm font-medium text-secondary-dark">
                      {a.body}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'Curriculum' && curriculum && (
          <div className="space-y-6">
            {curriculum.map((sem) => (
              <div key={sem.semester} className="rounded-md border border-border bg-white overflow-hidden">
                <div className="bg-primary/5 px-4 py-3 font-semibold">Semester {sem.semester}</div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-sm text-text-muted">
                      <th className="px-4 py-2">Subject</th>
                      <th className="px-4 py-2">Credits</th>
                      <th className="px-4 py-2">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sem.subjects.map((sub, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="px-4 py-2 text-sm">{sub.name}</td>
                        <td className="px-4 py-2 text-sm">{sub.credits || '-'}</td>
                        <td className="px-4 py-2 text-sm capitalize">{sub.type || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Career' && careers && (
          <div className="grid gap-4 sm:grid-cols-2">
            {careers.map((c, i) => (
              <div key={i} className="rounded-md border border-border bg-white p-4">
                <div className="font-semibold">{c.role}</div>
                {c.companies && <div className="mt-1 text-sm text-text-muted">{c.companies}</div>}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Faculty' && faculty && faculty.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {faculty.map((f) => (
              <div key={f.id} className="rounded-md border border-border bg-white p-4">
                <div className="font-semibold">{f.name}</div>
                {f.designation && <div className="text-sm text-text-muted">{f.designation}</div>}
                {f.specialization && <div className="mt-1 text-sm text-primary">{f.specialization}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-24 space-y-6">
          {fees && (
            <div className="rounded-md border border-border bg-white p-6 shadow-card">
              <h3 className="mb-4 font-display text-lg font-semibold">Fee Structure</h3>
              <div className="space-y-2 text-sm">
                {fees.tuitionFee && (
                  <div className="flex justify-between">
                    <span className="text-text-muted">Tuition Fee</span>
                    <span className="font-medium">₹{fees.tuitionFee.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {fees.hostelFee && (
                  <div className="flex justify-between">
                    <span className="text-text-muted">Hostel Fee</span>
                    <span className="font-medium">₹{fees.hostelFee.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {fees.scholarshipAvailable && (
                  <p className="mt-2 text-green-600">Scholarships available</p>
                )}
              </div>
            </div>
          )}
          <Link
            href="/admissions/apply"
            className="block w-full rounded-md bg-accent py-3 text-center font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            Apply Now
          </Link>
          <Link
            href="/contact"
            className="block w-full rounded-md border border-primary py-3 text-center font-semibold text-primary transition-colors hover:bg-primary/5"
          >
            Contact Admissions
          </Link>
        </div>
      </div>
    </div>
  )
}
