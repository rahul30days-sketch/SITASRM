# SERI Website Architecture Blueprint

## 1. FOLDER STRUCTURE

```
SitaSRM/
├── src/
│   ├── app/
│   │   ├── (frontend)/                # Public website routes (route group)
│   │   │   ├── layout.tsx             # Public layout with Header/Footer
│   │   │   ├── page.tsx               # Homepage
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── programs/
│   │   │   │   ├── page.tsx           # Programs listing
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx       # Program detail
│   │   │   ├── departments/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── faculty/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── admissions/
│   │   │   │   ├── page.tsx
│   │   │   │   └── apply/
│   │   │   │       └── page.tsx       # Multi-step application form
│   │   │   ├── placements/
│   │   │   │   └── page.tsx
│   │   │   ├── news/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── events/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── gallery/
│   │   │   │   └── page.tsx
│   │   │   ├── downloads/
│   │   │   │   └── page.tsx
│   │   │   ├── contact/
│   │   │   │   └── page.tsx
│   │   │   ├── faq/
│   │   │   │   └── page.tsx
│   │   │   ├── search/
│   │   │   │   └── page.tsx
│   │   │   ├── privacy-policy/
│   │   │   │   └── page.tsx
│   │   │   ├── terms/
│   │   │   │   └── page.tsx
│   │   │   ├── refund-policy/
│   │   │   │   └── page.tsx
│   │   │   └── not-found.tsx
│   │   ├── (payload)/                 # Payload admin panel routes
│   │   │   └── admin/
│   │   │       └── [[...segments]]/
│   │   │           ├── page.tsx
│   │   │           └── not-found.tsx
│   │   ├── api/                       # API routes
│   │   │   ├── [...slug]/
│   │   │   │   └── route.ts           # Payload REST API handler
│   │   │   ├── contact/
│   │   │   │   └── route.ts
│   │   │   ├── applications/
│   │   │   │   └── route.ts
│   │   │   ├── brochure/
│   │   │   │   └── route.ts
│   │   │   ├── downloads/
│   │   │   │   └── [id]/
│   │   │   │       └── track/
│   │   │   │           └── route.ts
│   │   │   ├── search/
│   │   │   │   └── route.ts
│   │   │   ├── revalidate/
│   │   │   │   └── route.ts
│   │   │   └── health/
│   │   │       └── route.ts
│   │   ├── layout.tsx                 # Root layout
│   │   ├── sitemap.ts                 # Dynamic sitemap
│   │   └── robots.ts                  # Robots.txt
│   ├── payload/
│   │   ├── payload.config.ts          # Main Payload configuration
│   │   ├── collections/               # All Payload collections
│   │   │   ├── Users.ts
│   │   │   ├── Media.ts
│   │   │   ├── Pages.ts
│   │   │   ├── Programs.ts
│   │   │   ├── Departments.ts
│   │   │   ├── Faculty.ts
│   │   │   ├── Admissions.ts
│   │   │   ├── News.ts
│   │   │   ├── Events.ts
│   │   │   ├── Testimonials.ts
│   │   │   ├── Gallery.ts
│   │   │   ├── Recruiters.ts
│   │   │   ├── Placements.ts
│   │   │   ├── Downloads.ts
│   │   │   ├── ContactSubmissions.ts
│   │   │   ├── Applications.ts
│   │   │   └── AuditLogs.ts
│   │   ├── globals/                   # Payload globals (singletons)
│   │   │   ├── SiteSettings.ts
│   │   │   ├── Navigation.ts
│   │   │   └── Footer.ts
│   │   ├── blocks/                    # Reusable page builder blocks
│   │   │   ├── HeroBlock.ts
│   │   │   ├── StatsBlock.ts
│   │   │   ├── ContentBlock.ts
│   │   │   ├── CardsBlock.ts
│   │   │   ├── CTABlock.ts
│   │   │   ├── AccordionBlock.ts
│   │   │   ├── GalleryBlock.ts
│   │   │   ├── FormBlock.ts
│   │   │   ├── TestimonialsBlock.ts
│   │   │   └── TimelineBlock.ts
│   │   ├── fields/                    # Reusable field groups
│   │   │   ├── seo.ts
│   │   │   ├── slug.ts
│   │   │   └── status.ts
│   │   ├── access/                    # Access control functions
│   │   │   └── index.ts
│   │   ├── hooks/                     # Payload lifecycle hooks
│   │   │   ├── auditLog.ts
│   │   │   └── index.ts
│   │   └── admin/
│   │       └── components/            # Admin panel customizations
│   │           └── DashboardWidget.tsx
│   ├── components/
│   │   ├── ui/                        # shadcn/ui components
│   │   ├── layout/                    # Header, Footer, Nav
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   └── AnnouncementBanner.tsx
│   │   ├── sections/                  # Homepage section components
│   │   │   ├── HeroSection.tsx
│   │   │   ├── StatsSection.tsx
│   │   │   ├── ProgramsShowcase.tsx
│   │   │   ├── WhyChooseSection.tsx
│   │   │   ├── PlacementHighlights.tsx
│   │   │   ├── RecruitersSlider.tsx
│   │   │   ├── FacultyHighlights.tsx
│   │   │   ├── CampusLifeSection.tsx
│   │   │   ├── AdmissionProcess.tsx
│   │   │   ├── EventsSection.tsx
│   │   │   ├── NewsSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── AdmissionCTA.tsx
│   │   │   └── ContactSection.tsx
│   │   ├── blocks/                    # CMS block renderers
│   │   │   └── RichTextRenderer.tsx
│   │   ├── common/                    # Shared components
│   │   │   ├── Breadcrumb.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── Lightbox.tsx
│   │   │   └── BackToTop.tsx
│   │   └── seo/
│   │       └── JsonLd.tsx
│   ├── lib/
│   │   ├── payload.ts                 # Payload client singleton
│   │   ├── utils.ts                   # cn() and general utilities
│   │   ├── env.ts                     # Env var validation (Zod)
│   │   ├── validation/
│   │   │   └── schemas.ts            # All Zod form schemas
│   │   ├── security/
│   │   │   ├── rateLimit.ts
│   │   │   ├── sanitize.ts
│   │   │   └── fileValidation.ts
│   │   ├── seo/
│   │   │   ├── metadata.ts           # buildMetadata() helper
│   │   │   └── schemas.ts            # JSON-LD schema builders
│   │   └── errors/
│   │       └── AppError.ts
│   ├── hooks/                         # Custom React hooks
│   ├── types/                         # TypeScript type definitions
│   │   └── index.ts
│   └── styles/
│       └── globals.css                # Global styles, CSS variables
├── public/
│   ├── media/                         # Payload media uploads
│   ├── fonts/                         # Self-hosted fonts (if needed)
│   └── og-default.jpg                 # Default OpenGraph image
├── scripts/
│   ├── deploy.sh
│   ├── setup-server.sh
│   └── backup.sh
├── nginx/
│   └── seri.conf
├── monitoring/
│   └── healthcheck.sh
├── .github/
│   └── workflows/
│       └── ci.yml
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.ts
├── ecosystem.config.js                # PM2 config
├── .eslintrc.json
├── .prettierrc
├── .env.example
├── .gitignore
├── ARCHITECTURE.md                    # This document
├── DEPLOYMENT.md
└── README.md
```

---

## 2. PAYLOAD COLLECTIONS LIST

### Collections (multiple documents)

| Collection | Purpose | Key Fields |
|---|---|---|
| **Users** | Admin panel users with RBAC | name, email, role (7 roles), profileImage, loginAttempts, lockedUntil |
| **Media** | All uploaded files (images, PDFs, videos) | alt (required), caption, category, uploadedBy, auto-generated sizes |
| **Pages** | Flexible page builder for any page | title, slug, status, hero, layout (blocks array), seo, template |
| **Programs** | Academic programs (B.Tech, M.Tech, etc.) | name, slug, category, duration, fees, curriculum, eligibility, faculty, seo |
| **Departments** | Academic departments | name, slug, hod, programs, faculty, facilities, vision, seo |
| **Faculty** | Faculty member profiles | name, slug, designation, department, qualifications, publications, isHOD |
| **News** | News articles, announcements, press releases | title, slug, type, content (richtext), author, publishedAt, tags, seo |
| **Events** | Campus events and workshops | title, slug, type, dates, venue, registrationLink, capacity, seo |
| **Testimonials** | Student/alumni testimonials | studentName, batch, program, company, testimonialText, rating |
| **Gallery** | Photo albums by category | title, category, images (array), date, featured |
| **Recruiters** | Recruiting companies | name, logo, website, tier, studentsHired, averagePackage |
| **Placements** | Year-wise placement statistics | year, totalStudents, studentsPlaced, packages, departmentWise |
| **Downloads** | Downloadable documents (brochures, forms) | title, category, file, program, downloadCount |
| **ContactSubmissions** | Contact form submissions | name, email, phone, subject, message, status, honeypot, ipAddress |
| **Applications** | Online admission applications | applicantName, email, programApplied, academicDetails, documents, applicationNumber |
| **AuditLogs** | Append-only action log | user, collection, action, timestamp, ipAddress |

### Globals (singletons)

| Global | Purpose | Key Fields |
|---|---|---|
| **SiteSettings** | Site-wide configuration | siteName, tagline, logo, phone, email, address, socialLinks, announcementBanner, analytics |
| **Navigation** | Primary navigation menu | primaryNav (nested items), ctaButton |
| **Footer** | Footer configuration | columns (with links), bottomLinks, copyrightText, showSocialLinks |

---

## 3. NEXT.JS ROUTES MAP

| Route | Data Source | Rendering | Component Type |
|---|---|---|---|
| `/` | Pages, Programs, Faculty, News, Events, Testimonials, Recruiters, Placements, SiteSettings | ISR (300s) | Server + Client sections |
| `/about` | Pages (slug: about), SiteSettings | ISR (86400s) | Server |
| `/programs` | Programs collection | ISR (3600s) | Server + Client filter |
| `/programs/[slug]` | Programs (by slug), Faculty | ISR (3600s) | Server + Client tabs |
| `/departments` | Departments collection | ISR (86400s) | Server |
| `/departments/[slug]` | Departments (by slug), Programs, Faculty | ISR (86400s) | Server |
| `/faculty` | Faculty collection, Departments | ISR (86400s) | Server + Client filter |
| `/faculty/[slug]` | Faculty (by slug) | ISR (86400s) | Server |
| `/admissions` | Pages (slug: admissions), Programs | ISR (3600s) | Server |
| `/admissions/apply` | Programs (for dropdown) | Dynamic (no cache) | Client (multi-step form) |
| `/placements` | Placements, Recruiters, Testimonials | ISR (3600s) | Server + Client chart |
| `/news` | News collection | ISR (600s) | Server + Client filter |
| `/news/[slug]` | News (by slug) | ISR (1800s) | Server |
| `/events` | Events collection | ISR (600s) | Server + Client filter |
| `/events/[slug]` | Events (by slug) | ISR (1800s) | Server |
| `/gallery` | Gallery collection | ISR (3600s) | Server + Client lightbox |
| `/downloads` | Downloads collection | ISR (3600s) | Server + Client tabs |
| `/contact` | SiteSettings | ISR (86400s) | Server + Client form |
| `/faq` | Pages (slug: faq) | ISR (86400s) | Server |
| `/search` | Multiple collections via API | Dynamic | Client |
| `/privacy-policy` | Pages (slug: privacy-policy) | ISR (86400s) | Server |
| `/terms` | Pages (slug: terms) | ISR (86400s) | Server |
| `/refund-policy` | Pages (slug: refund-policy) | ISR (86400s) | Server |
| `/admin/[[...segments]]` | Payload Admin UI | Dynamic | Payload built-in |

### API Routes

| Route | Method | Purpose | Auth |
|---|---|---|---|
| `/api/[...slug]` | ALL | Payload REST API | Payload built-in |
| `/api/contact` | POST | Contact form submission | Public + rate limit |
| `/api/applications` | POST | Application form submission | Public + rate limit |
| `/api/brochure` | POST | Brochure request | Public + rate limit |
| `/api/downloads/[id]/track` | POST | Track download count | Public + rate limit |
| `/api/search` | GET | Search across collections | Public + rate limit |
| `/api/revalidate` | POST | ISR revalidation trigger | Secret token |
| `/api/health` | GET | Health check endpoint | Public |

---

## 4. DATA FLOW

### Payload Local API -> Next.js

```
Server Component
    │
    ├── import { getPayloadClient } from '@/lib/payload'
    │
    ├── const payload = await getPayloadClient()
    │   (cached singleton, no HTTP overhead)
    │
    ├── const data = await payload.find({
    │     collection: 'programs',
    │     where: { status: { equals: 'published' } },
    │     depth: 1,        // Control relationship population depth
    │     limit: 10,
    │   })
    │
    └── Pass data as props to child components
```

- **No REST API calls from server components** — use Payload Local API directly (same process, zero latency).
- **REST API** is only used by client-side forms (POST to `/api/contact`, etc.) and external integrations.
- **Depth control** on every query to prevent over-fetching nested relationships.

### Form Submission Flow

```
Client Component (form)
    │
    ├── Client-side Zod validation (UX feedback)
    │
    ├── POST /api/contact (or /api/applications)
    │   Headers: Content-Type: application/json
    │   Body: form data
    │
    └── API Route (server)
        ├── Verify Origin header (CSRF)
        ├── Rate limit check (IP-based)
        ├── Honeypot check (spam)
        ├── Server-side Zod validation (source of truth)
        ├── Sanitize inputs
        ├── payload.create({ collection: 'contact-submissions', data })
        ├── Send notification email (async)
        └── Return { success: true } or { error, fieldErrors }
```

### Media File Handling

```
Upload Flow:
    Admin Panel / Application Form
    │
    ├── File selected → client-side checks (type, size)
    │
    ├── Upload to Payload Media collection
    │   ├── beforeChange hook: verify MIME via magic bytes
    │   ├── Payload processes image → generates sizes (thumbnail, card, hero, og)
    │   ├── Sharp library handles optimization (WebP output)
    │   └── Files stored in /public/media/ (disk)
    │
    └── Served via Nginx directly (bypasses Next.js for static files)
        Cache-Control: public, immutable, max-age=2592000

Frontend Rendering:
    next/image component
    ├── src: /media/filename.webp
    ├── sizes: responsive size hints
    ├── priority: true (only for above-fold)
    └── placeholder: "blur" with blurDataURL from Payload
```

---

## 5. RBAC MATRIX

| Permission | SuperAdmin | Admin | ContentManager | AdmissionsManager | FacultyManager | Editor | Viewer |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Users** | CRUD | CRU (not superAdmins) | - | - | - | - | - |
| **Media** | CRUD | CRUD | CRUD | R | R | CRU | R |
| **Pages** | CRUD | CRUD | CRUD | R | R | R | R (published) |
| **Programs** | CRUD | CRUD | CRUD | R | R | R | R (published) |
| **Departments** | CRUD | CRUD | CRUD | R | R | R | R (published) |
| **Faculty** | CRUD | CRUD | R | R | CRUD | R | R (published) |
| **News** | CRUD | CRUD | CRUD | R | R | CRUD | R (published) |
| **Events** | CRUD | CRUD | CRUD | R | R | CRUD | R (published) |
| **Testimonials** | CRUD | CRUD | CRUD | R | R | R | R (published) |
| **Gallery** | CRUD | CRUD | CRUD | R | R | CRUD | R (published) |
| **Recruiters** | CRUD | CRUD | CRUD | R | R | R | R |
| **Placements** | CRUD | CRUD | CRUD | R | R | R | R |
| **Downloads** | CRUD | CRUD | CRUD | R | R | R | R (published) |
| **ContactSubmissions** | CRUD | CRUD | R | CRUD | R | - | - |
| **Applications** | CRUD | CRUD | R | CRUD | R | - | - |
| **AuditLogs** | R | - | - | - | - | - | - |
| **SiteSettings** | RU | RU | R | R | R | R | R |
| **Navigation** | RU | RU | RU | R | R | R | R |
| **Footer** | RU | RU | RU | R | R | R | R |

Legend: C=Create, R=Read, U=Update, D=Delete, - = No access

---

## 6. SECURITY LAYERS

### Input Validation (Zod)

```
Location: src/lib/validation/schemas.ts

Every API route:
  1. Parse request body with Zod schema
  2. If invalid → return 400 with field-level errors
  3. If valid → proceed with sanitized data

Every Payload collection:
  - Field-level maxLength on all text fields
  - Field-level validation hooks for complex rules
  - beforeChange hooks for sanitization
```

### Rate Limiting

```
Location: src/lib/security/rateLimit.ts

Applied at:
  - API routes (middleware pattern):
    /api/contact       → 5 req / 15 min / IP
    /api/applications  → 3 req / hour / IP
    /api/search        → 30 req / min / IP
    /api/brochure      → 5 req / 15 min / IP
    /api/downloads/*/track → 1 req / 5 min / IP / file

  - Nginx level (defense in depth):
    General:  30 req/min
    Forms:    5 req/min

  - Payload auth (built-in):
    Login: 5 attempts → 10 min lockout
```

### Environment Variable Strategy

```
Server-only (never exposed to browser):
  DATABASE_URI
  PAYLOAD_SECRET
  REVALIDATION_SECRET
  RECAPTCHA_SECRET_KEY
  SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS

Public (safe for browser, prefixed NEXT_PUBLIC_):
  NEXT_PUBLIC_SERVER_URL     (the site URL — not a secret)
  NEXT_PUBLIC_SITE_NAME      (display name)

Validation:
  src/lib/env.ts validates all required vars at startup.
  If any missing → app crashes immediately with clear error.
  No silent fallbacks to defaults for secrets.
```

### Security Headers

```
Applied in: next.config.ts (all routes) + nginx/seri.conf (double layer)

  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'self'; script-src 'self' ... (strict)
```

### Additional Security Measures

- **CSRF**: Origin header verification on all mutation API routes
- **File uploads**: Magic byte verification, not just extension/Content-Type
- **NoSQL injection**: All queries use Zod-validated data; no raw MongoDB operators from user input
- **XSS**: React default escaping; single controlled dangerouslySetInnerHTML for JSON-LD only
- **Password policy**: 8-128 chars, validated before hashing (DoS prevention)
- **Session**: secure, httpOnly, sameSite: strict cookies; 2-hour token expiration
- **Audit trail**: AuditLogs collection tracks all sensitive operations
- **Honeypot**: Invisible field on public forms; if filled, silently mark as spam

---

## 7. IMPLEMENTATION ORDER

### Phase 1: Project Scaffold & Configuration
- Initialize Next.js 15 + TypeScript + Tailwind
- Install all dependencies
- Create folder structure
- Configure tsconfig, tailwind, eslint, prettier
- Create .env.example

### Phase 2: Payload CMS Core Setup
- payload.config.ts with MongoDB, lexical editor, auth
- Payload admin panel routes integration
- Reusable field groups (seo, slug, status)
- Access control function library
- Stub collection files

### Phase 3A: Core Collections (Users, Media, Pages)
- Users with auth, RBAC roles, login lockout
- Media with upload validation, auto-generated sizes
- Pages with block-based page builder

### Phase 3B: Content Collections
- Programs, Faculty, Departments
- News, Events, Testimonials
- Recruiters, Gallery

### Phase 3C: Form & System Collections
- ContactSubmissions, Applications (with honeypot, auto application numbers)
- Downloads, Placements
- SiteSettings, Navigation, Footer globals

### Phase 4: RBAC & Admin Panel
- Complete access control matrix applied to all collections
- Admin dashboard widget
- AuditLogs collection
- Password policy enforcement

### Phase 5: Next.js Foundation
- Design system (CSS variables, Tailwind tokens)
- Root layout with fonts
- Header (desktop nav + mobile drawer)
- Footer (4-column grid)
- Breadcrumb component
- ISR revalidation API route
- 404 page

### Phase 6: Homepage
- All 14 homepage sections
- Server-side parallel data fetching
- Client-side animations (Framer Motion)
- Inline inquiry form

### Phase 7: Programs, Faculty, Departments Pages
- Listing pages with filters
- Detail pages with tabs
- RichTextRenderer component
- generateStaticParams for all dynamic routes

### Phase 8: Admissions, Placements, About Pages
- Multi-step application form (client component)
- Placement statistics with charts
- Contact page with Google Maps
- FAQ with accordion + JSON-LD

### Phase 9: News, Events, Gallery, Downloads
- Listing pages with pagination
- Detail pages for news/events
- Gallery with lightbox
- Downloads with tracking
- Search page + API

### Phase 10: Forms, Validation & API Routes
- Zod schema library
- Rate limiting middleware
- All form API routes with full validation
- Security headers in next.config.ts
- Input sanitization utilities

### Phase 11: SEO System
- buildMetadata() helper
- JSON-LD schemas (Organization, Course, Article, Event, FAQ, Breadcrumb)
- Dynamic sitemap.xml
- robots.txt
- Apply generateMetadata to every page

### Phase 12: Performance Optimization
- Fix N+1 queries
- ISR revalidation intervals
- Parallel data fetching (Promise.all)
- Dynamic imports for heavy components
- Font optimization
- Core Web Vitals checklist

### Phase 13: Security Hardening
- Environment variable audit
- NoSQL injection prevention audit
- ReDoS prevention
- File upload magic byte verification
- XSS audit
- CSRF protection
- Error handling standardization
- Dependency audit

### Phase 14: Deployment Configuration
- PM2 ecosystem config
- Nginx configuration with SSL
- Deploy script
- Server setup script
- Backup strategy
- CI workflow (GitHub Actions)
- Health check endpoint

### Phase 15: Final QA & Polish
- TypeScript strict check (zero errors)
- ESLint audit
- Accessibility audit
- Mobile responsiveness check
- Dead link audit
- Form end-to-end testing
- Empty/loading/error states
- Sample content creation
