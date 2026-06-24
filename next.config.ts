import path from 'path'
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
      // Vercel Blob — where uploaded media is served from in production
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
    ],
  },
  webpack: (config, { webpack }) => {
    // The Vercel Blob adapter ALWAYS registers its client upload handler in the
    // Payload admin importMap (even with clientUploads off — and the importMap is
    // auto-regenerated, so editing it isn't durable). That handler imports the
    // plugin's *server* utilities barrel, dragging the whole `payload` server tree
    // (pino/pino-pretty, undici, fs, os, node:* …) into the browser bundle and
    // breaking the build. We can't stub those (logger.js builds pino at module
    // load), so we redirect the handler module itself to a no-op client-safe
    // stand-in. This MUST run for BOTH the server and client compilers so the RSC
    // client-reference identity stays consistent (server emits the reference, the
    // client manifest resolves it) — redirecting only the client build breaks with
    // "Could not find the module … in the React Client Manifest". Match both the
    // bare specifier and the resolved file path. Uploads are server-routed
    // (clientUploads off), so the real client handler is never needed.
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /storage-vercel-blob[/\\](client|dist[/\\]client[/\\]VercelBlobClientUploadHandler)/,
        path.resolve(process.cwd(), 'src/payload/stubs/vercelBlobClientUploadHandler.ts'),
      ),
    )
    return config
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
