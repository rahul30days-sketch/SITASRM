import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Admissions',
  seo: { metaDescription: 'Apply for admission to SERI - step-by-step process, eligibility, documents, fees, and scholarships.' },
  path: '/admissions',
})

export const revalidate = 3600

export default function AdmissionsPage() {
  const steps = [
    { step: 1, title: 'Apply Online', desc: 'Fill the application form with personal and academic details.' },
    { step: 2, title: 'Document Verification', desc: 'Submit required documents for verification.' },
    { step: 3, title: 'Counselling', desc: 'Attend the counselling session for seat allotment.' },
    { step: 4, title: 'Fee Payment', desc: 'Pay the admission fees to confirm your seat.' },
    { step: 5, title: 'Admission Confirmed', desc: 'Receive your admission confirmation and welcome kit.' },
  ]

  return (
    <div className="min-h-screen bg-surface">
      <div className="bg-primary px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <span className="inline-block rounded-full bg-accent px-4 py-1 text-sm font-semibold">Admissions Open 2025-26</span>
          <h1 className="mt-4 font-display text-4xl font-bold lg:text-5xl">Admissions</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Start your journey towards a successful career in engineering.
          </p>
          <Link
            href="/admissions/apply"
            className="mt-8 inline-block rounded-md bg-accent px-8 py-3 font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            Apply Now
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 lg:px-8">
        <section>
          <h2 className="mb-8 text-center font-display text-3xl font-bold text-primary">
            Admission Process
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((s) => (
              <div key={s.step} className="relative rounded-md border border-border bg-white p-6 text-center shadow-card">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {s.step}
                </div>
                <h3 className="font-display font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-md border border-border bg-white p-6 shadow-card">
            <h2 className="mb-4 font-display text-xl font-semibold">Required Documents</h2>
            <ul className="space-y-2 text-sm text-text-muted">
              {[
                'Class 10th Marksheet',
                'Class 12th Marksheet',
                'Passport Size Photographs',
                'Aadhar Card / ID Proof',
                'Character Certificate',
                'Migration Certificate (if applicable)',
                'Category Certificate (if applicable)',
              ].map((doc) => (
                <li key={doc} className="flex items-center gap-2">
                  <span className="text-green-500">&#10003;</span> {doc}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="font-display text-2xl font-bold text-primary">Ready to Apply?</h2>
            <p className="mt-4 text-text-muted">
              Fill out our online application form. The process takes about 10 minutes.
              You can save and resume your application at any time.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/admissions/apply"
                className="rounded-md bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-dark"
              >
                Apply Online
              </Link>
              <Link
                href="/contact"
                className="rounded-md border border-primary px-6 py-3 font-semibold text-primary hover:bg-primary/5"
              >
                Contact Admissions
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
