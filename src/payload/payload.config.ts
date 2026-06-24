import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Programs } from './collections/Programs'
import { Departments } from './collections/Departments'
import { Faculty } from './collections/Faculty'
import { Admissions } from './collections/Admissions'
import { News } from './collections/News'
import { Events } from './collections/Events'
import { Testimonials } from './collections/Testimonials'
import { Gallery } from './collections/Gallery'
import { Recruiters } from './collections/Recruiters'
import { Placements } from './collections/Placements'
import { Downloads } from './collections/Downloads'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { Applications } from './collections/Applications'
import { AuditLogs } from './collections/AuditLogs'

import { SiteSettings } from './globals/SiteSettings'
import { Navigation } from './globals/Navigation'
import { Footer } from './globals/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Fail fast on missing/insecure configuration in production. In development we
// fall back to safe placeholders so the app still boots without a full .env.
const isProduction = process.env.NODE_ENV === 'production'
const databaseURI = process.env.DATABASE_URI
const payloadSecret = process.env.PAYLOAD_SECRET

if (isProduction) {
  if (!databaseURI) {
    throw new Error('DATABASE_URI environment variable is required in production.')
  }
  if (!payloadSecret) {
    throw new Error('PAYLOAD_SECRET environment variable is required in production.')
  }
  if (payloadSecret.length < 32) {
    // eslint-disable-next-line no-console
    console.warn(
      '[payload] WARNING: PAYLOAD_SECRET should be at least 32 characters long for production.',
    )
  }
}

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' | SERI Admin',
    },
    components: {
      actions: ['/payload/components/LogoutButton#LogoutButton'],
    },
    importMap: {
      baseDir: path.resolve(dirname, '..'),
    },
  },
  editor: lexicalEditor(),
  db: mongooseAdapter({
    url: databaseURI || '',
  }),
  collections: [
    Users,
    Media,
    Pages,
    Programs,
    Departments,
    Faculty,
    Admissions,
    News,
    Events,
    Testimonials,
    Gallery,
    Recruiters,
    Placements,
    Downloads,
    ContactSubmissions,
    Applications,
    AuditLogs,
  ],
  globals: [SiteSettings, Navigation, Footer],
  cors: [process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'],
  secret: payloadSecret || 'dev-only-insecure-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, '..', 'payload-types.ts'),
  },
  sharp: undefined,
})
