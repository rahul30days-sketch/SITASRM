import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import '@/styles/globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnnouncementBanner from '@/components/sections/AnnouncementBanner'
import BackToTop from '@/components/common/BackToTop'
import { safeFindGlobal } from '@/lib/payload'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
  title: {
    default: 'SERI - SITASRM Engineering & Research Institute',
    template: '%s | SERI',
  },
  description:
    'SITASRM Engineering & Research Institute (SERI) - Premier engineering institute in Haryana offering AICTE-approved programs.',
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const [navigation, footer, siteSettings] = (await Promise.all([
    safeFindGlobal('navigation'),
    safeFindGlobal('footer'),
    safeFindGlobal('site-settings'),
  ])) as [any, any, any]

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-primary"
        >
          Skip to main content
        </a>
        <Header
          navItems={(navigation?.primaryNav || []).filter(
            (i: { href?: string; children?: unknown[] }) => i?.href || (i?.children && i.children.length > 0),
          )}
          ctaButton={
            navigation?.ctaButton?.href
              ? navigation.ctaButton
              : { label: 'Apply Now', href: '/admissions/apply' }
          }
          logoUrl={siteSettings?.logo?.url || '/media/images/logo.png'}
        />
        <AnnouncementBanner />
        <main id="main-content">{children}</main>
        <Footer
          columns={footer?.columns || []}
          bottomLinks={footer?.bottomLinks || []}
          copyrightText={footer?.copyrightText}
          siteSettings={siteSettings as any}
        />
        <BackToTop />
      </body>
    </html>
  )
}
