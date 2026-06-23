import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  seo: { metaDescription: 'Privacy policy of SERI - how we collect, use, and protect your personal information.' },
  path: '/privacy-policy',
})

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold text-primary">Privacy Policy</h1>
        <p className="mt-2 text-sm text-text-muted">Last updated: June 2026</p>

        <div className="mt-8 space-y-8 text-text-default">
          <section>
            <h2 className="font-display text-xl font-bold text-primary">1. Information We Collect</h2>
            <p className="mt-2">We collect personal information you voluntarily provide when you fill out forms on our website, including but not limited to: name, email address, phone number, postal address, academic records, and any other information you choose to provide through our contact, inquiry, or application forms.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-primary">2. How We Use Your Information</h2>
            <p className="mt-2">Your personal information is used for the following purposes:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Processing admission applications</li>
              <li>Responding to inquiries and providing information about our programs</li>
              <li>Sending important notices and updates related to admissions</li>
              <li>Improving our website and services</li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-primary">3. Data Protection</h2>
            <p className="mt-2">We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All data transmitted through our forms is encrypted using SSL/TLS protocols.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-primary">4. Third-Party Sharing</h2>
            <p className="mt-2">We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted partners who assist us in operating our website or conducting our business, provided they agree to keep your information confidential.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-primary">5. Cookies</h2>
            <p className="mt-2">Our website uses cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings. Essential cookies required for website functionality cannot be disabled.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-primary">6. Your Rights</h2>
            <p className="mt-2">You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at the email address provided on our Contact page.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-primary">7. Contact Us</h2>
            <p className="mt-2">If you have any questions about this Privacy Policy, please contact us through our Contact page or write to us at our campus address.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
