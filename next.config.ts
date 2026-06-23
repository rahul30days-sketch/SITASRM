import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const isDev = process.env.NODE_ENV !== 'production'

// Shared security headers (applied to every route)
const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

// Strict CSP for the public-facing site.
// `unsafe-eval` is only added in development, where Next.js hot-reload needs it.
const frontendCsp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://www.google.com/recaptcha https://www.gstatic.com/recaptcha`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https:",
  "frame-src https://www.google.com https://maps.google.com",
  `connect-src 'self'${isDev ? ' ws:' : ''}`,
].join('; ')

// Relaxed CSP for the Payload admin panel (/admin).
// The admin app and its dependencies require `unsafe-eval` and blob: workers.
const adminCsp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data: blob: https:",
  "worker-src 'self' blob:",
  `connect-src 'self'${isDev ? ' ws:' : ''}`,
].join('; ')

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'seri.net.in' },
      { protocol: 'https', hostname: 'www.seri.net.in' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'placehold.co' },
    ],
  },
  async headers() {
    return [
      {
        // Payload admin panel — relaxed CSP, allow framing-free but eval-capable
        source: '/admin/:path*',
        headers: [
          ...securityHeaders,
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Content-Security-Policy', value: adminCsp },
        ],
      },
      {
        // Everything except /admin — strict CSP
        source: '/((?!admin).*)',
        headers: [
          ...securityHeaders,
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Content-Security-Policy', value: frontendCsp },
        ],
      },
    ]
  },
}

export default withPayload(nextConfig)
