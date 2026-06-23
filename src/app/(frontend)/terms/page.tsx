import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Terms & Conditions',
  seo: { metaDescription: 'Terms and conditions for using the SERI website.' },
  path: '/terms',
})

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold text-primary">Terms & Conditions</h1>
        <p className="mt-2 text-sm text-text-muted">Last updated: June 2026</p>

        <div className="mt-8 space-y-8 text-text-default">
          <section>
            <h2 className="font-display text-xl font-bold text-primary">1. Acceptance of Terms</h2>
            <p className="mt-2">By accessing and using the SERI website (seri.net.in), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-primary">2. Use of Website</h2>
            <p className="mt-2">This website is provided for informational purposes about SITASRM Engineering & Research Institute and its academic programs. You agree not to use the website for any unlawful purpose or in any way that could damage or impair the website.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-primary">3. Intellectual Property</h2>
            <p className="mt-2">All content on this website, including text, images, logos, and graphics, is the property of SERI and is protected by applicable intellectual property laws. You may not reproduce, distribute, or modify any content without prior written consent.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-primary">4. Accuracy of Information</h2>
            <p className="mt-2">While we strive to keep information on this website accurate and up-to-date, SERI does not warrant the completeness or accuracy of the information. Program details, fee structures, and other information are subject to change without notice.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-primary">5. Third-Party Links</h2>
            <p className="mt-2">Our website may contain links to third-party websites. SERI is not responsible for the content or privacy practices of these external sites.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-primary">6. Limitation of Liability</h2>
            <p className="mt-2">SERI shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use this website.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-primary">7. Governing Law</h2>
            <p className="mt-2">These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising shall be subject to the jurisdiction of courts in Tamil Nadu, India.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
