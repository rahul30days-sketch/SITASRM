import type { Metadata } from 'next'
import { safeFindGlobal } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo/metadata'
import { ContactFormClient } from './ContactFormClient'

export const metadata: Metadata = buildMetadata({
  title: 'Contact Us',
  seo: { metaDescription: 'Get in touch with SERI - address, phone, email, and contact form.' },
  path: '/contact',
})

export const revalidate = 86400

export default async function ContactPage() {
  const settings = (await safeFindGlobal('site-settings')) as any

  const phones = settings?.phone?.map((p: { number: string }) => p.number) || []
  const emails = settings?.email?.map((e: { address: string }) => e.address) || []

  return (
    <div className="min-h-screen bg-surface">
      <div className="bg-primary px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="font-display text-4xl font-bold lg:text-5xl">Contact Us</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            We&apos;d love to hear from you. Reach out to us with any questions.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-md border border-border bg-white p-6 shadow-card">
              <h2 className="mb-4 font-display text-xl font-semibold">Get in Touch</h2>
              <div className="space-y-4">
                {settings?.address && (
                  <div>
                    <h3 className="text-sm font-semibold text-text-muted">Address</h3>
                    <p className="mt-1 text-sm">{settings.address}</p>
                  </div>
                )}
                {phones.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-text-muted">Phone</h3>
                    <div className="mt-1 space-y-1">
                      {phones.map((phone: string) => (
                        <a key={phone} href={`tel:${phone}`} className="block text-sm text-primary hover:underline">{phone}</a>
                      ))}
                    </div>
                  </div>
                )}
                {emails.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-text-muted">Email</h3>
                    <div className="mt-1 space-y-1">
                      {emails.map((email: string) => (
                        <a key={email} href={`mailto:${email}`} className="block text-sm text-primary hover:underline">{email}</a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {settings?.mapEmbedUrl && (
              <div className="overflow-hidden rounded-md border border-border">
                <iframe
                  src={settings.mapEmbedUrl}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SERI Location"
                />
              </div>
            )}
          </div>
          <div className="rounded-md border border-border bg-white p-6 shadow-card">
            <h2 className="mb-6 font-display text-xl font-semibold">Send us a Message</h2>
            <ContactFormClient />
          </div>
        </div>
      </div>
    </div>
  )
}
