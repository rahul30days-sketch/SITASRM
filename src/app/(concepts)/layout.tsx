import type { Metadata } from 'next'
import { Inter, Playfair_Display, Syne, Manrope } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import '@/styles/globals.css'

/**
 * Root layout for the homepage-concept route group.
 *
 * This is a SEPARATE root layout from `(frontend)/layout.tsx` (Next.js allows
 * multiple root layouts when there is no `app/layout.tsx`). It deliberately does
 * NOT render the shared Header/Footer/AnnouncementBanner — each concept ships its
 * own navbar + footer so the three feel like entirely different sites. It only
 * owns `<html>`/`<body>`, the font variables, and the top progress bar.
 */

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

// Home 3 — bold luxury display
const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

// Home 2 — clean, professional modern sans
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Homepage Concepts | SERI',
  description: 'Design-concept previews for SITASRM Engineering & Research Institute.',
  robots: { index: false, follow: false },
}

export default function ConceptsLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${syne.variable} ${manrope.variable}`}
    >
      <body className="font-sans antialiased">
        <NextTopLoader color="#c8a951" height={3} showSpinner={false} easing="ease" speed={200} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
