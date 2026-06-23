import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'About SERI',
  seo: { metaDescription: 'Learn about SITASRM Engineering & Research Institute - our mission, vision, leadership, and accreditations.' },
  path: '/about',
})

export const revalidate = 86400

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="bg-primary px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="font-display text-4xl font-bold lg:text-5xl">About SERI</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            SITASRM Engineering & Research Institute - Shaping future engineers and innovators.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold text-primary">Our Mission</h2>
            <p className="mt-4 text-text-muted leading-relaxed">
              To provide quality technical education that prepares students for professional excellence,
              innovation, and leadership in a rapidly changing world through a curriculum that integrates
              theory with practical applications.
            </p>
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold text-primary">Our Vision</h2>
            <p className="mt-4 text-text-muted leading-relaxed">
              To be a premier institution of engineering education and research, recognized nationally
              and internationally for academic excellence, innovation, and contribution to society.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-8 text-center font-display text-3xl font-bold text-primary">Our Values</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Excellence', desc: 'Pursuing the highest standards in education and research.' },
              { title: 'Innovation', desc: 'Fostering creativity and entrepreneurial thinking.' },
              { title: 'Integrity', desc: 'Upholding ethical standards in all endeavors.' },
              { title: 'Inclusivity', desc: 'Providing equal opportunities for all students.' },
            ].map((v) => (
              <div key={v.title} className="rounded-md border border-border bg-white p-6 text-center shadow-card">
                <h3 className="font-display text-lg font-semibold text-primary">{v.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-8 text-center font-display text-3xl font-bold text-primary">
            Approvals & Accreditations
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {['AICTE Approved', 'NAAC Accredited', 'Affiliated to MDU Rohtak', 'ISO 9001:2015'].map((badge) => (
              <div key={badge} className="rounded-md border border-secondary/30 bg-secondary/5 px-6 py-4 text-center">
                <span className="font-semibold text-secondary-dark">{badge}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
