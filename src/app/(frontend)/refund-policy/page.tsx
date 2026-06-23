import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Refund Policy',
  seo: { metaDescription: 'Fee refund policy for SERI admissions and programs.' },
  path: '/refund-policy',
})

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold text-primary">Refund Policy</h1>
        <p className="mt-2 text-sm text-text-muted">Last updated: June 2026</p>

        <div className="mt-8 space-y-8 text-text-default">
          <section>
            <h2 className="font-display text-xl font-bold text-primary">1. Application Fee</h2>
            <p className="mt-2">The application fee is non-refundable under any circumstances.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-primary">2. Tuition Fee Refund</h2>
            <p className="mt-2">Refund of tuition fees is governed by UGC/AICTE guidelines:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>100% refund of tuition fee if withdrawal before the start of the academic session</li>
              <li>90% refund if withdrawal within first 2 weeks of the session</li>
              <li>80% refund if withdrawal within first 4 weeks of the session</li>
              <li>50% refund if withdrawal within first 8 weeks of the session</li>
              <li>No refund after 8 weeks from the start of the session</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-primary">3. Hostel Fee</h2>
            <p className="mt-2">Hostel fees are refundable on a pro-rata basis if the student vacates the hostel during the academic year. A minimum of one month&apos;s notice is required.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-primary">4. Caution Deposit</h2>
            <p className="mt-2">Caution deposits (if applicable) will be refunded in full at the time of leaving the institution, subject to clearance of all dues and return of institutional property.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-primary">5. Refund Process</h2>
            <p className="mt-2">To request a refund, submit a written application to the Accounts department along with the original fee receipt. Refunds will be processed within 15 working days from the date of approval. The refund will be made to the original payment method.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-primary">6. Contact</h2>
            <p className="mt-2">For queries regarding refunds, please contact the Accounts department through our Contact page.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
