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
    url: process.env.DATABASE_URI || '',
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
  secret: process.env.PAYLOAD_SECRET || 'default-secret-change-me-in-production',
  typescript: {
    outputFile: path.resolve(dirname, '..', 'payload-types.ts'),
  },
  sharp: undefined,
})
