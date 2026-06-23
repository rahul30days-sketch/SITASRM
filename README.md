# SITASRM Engineering & Research Institute (SERI) Website

Production website for SERI (seri.net.in) — a Next.js 15 + Payload CMS 3 application with MongoDB.

## Tech Stack

- **Framework:** Next.js 15 (App Router, React Server Components)
- **Language:** TypeScript (strict mode)
- **CMS:** Payload CMS 3.x (embedded in Next.js, Local API)
- **Database:** MongoDB (Atlas in production)
- **Styling:** Tailwind CSS with SERI brand tokens
- **Animation:** Framer Motion
- **Validation:** Zod (client + server)
- **Rich Text:** Lexical editor + `@payloadcms/richtext-lexical/react` renderer

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
Copy the example file and fill in real values:
```bash
cp .env.example .env
```
Required variables:
| Variable | Description |
| --- | --- |
| `DATABASE_URI` | MongoDB connection string (`mongodb+srv://...` for Atlas, or `mongodb://127.0.0.1:27017/seri` for local) |
| `PAYLOAD_SECRET` | Random 32+ character secret for Payload |
| `NEXT_PUBLIC_SERVER_URL` | Public site URL (e.g. `http://localhost:3000` in dev) |
| `REVALIDATION_SECRET` | Bearer token for the ISR revalidation API |

### 3. Run the dev server
```bash
npm run dev
```
- Frontend: http://localhost:3000
- Admin panel: http://localhost:3000/admin (create the first admin user on first visit)

### 4. Build for production
```bash
npm run build
npm run start
```

> **Note:** The data layer (`src/lib/payload.ts` → `safeFind` / `safeFindGlobal`) is resilient: if the database is unreachable at build time, pages build successfully and render empty states. Once a database is connected and content is published, pages populate via ISR.

## Project Structure

```
src/
├── app/
│   ├── (frontend)/        # Public site routes
│   ├── (payload)/         # Payload admin panel
│   └── api/               # API routes (contact, applications, search, etc.)
├── components/
│   ├── layout/            # Header, Footer, MobileNav, AnnouncementBanner
│   ├── sections/          # Homepage section components
│   ├── common/            # Breadcrumb, Pagination, Lightbox, BackToTop
│   ├── blocks/            # RichTextRenderer
│   └── seo/               # JsonLd
├── lib/
│   ├── payload.ts         # Cached client + safeFind/safeFindGlobal
│   ├── validation/        # Zod schemas
│   ├── security/          # Rate limiting, sanitization, file validation
│   └── seo/               # Metadata + JSON-LD schema builders
├── payload/
│   ├── collections/       # 17 collections
│   ├── globals/           # SiteSettings, Navigation, Footer
│   ├── fields/            # Reusable field groups (seo, slug, status)
│   ├── access/            # RBAC access-control functions
│   ├── hooks/             # Audit logging
│   └── payload.config.ts  # Main Payload config
├── styles/
└── types/
```

## Content Model

**Collections:** Users, Media, Pages, Programs, Faculty, Departments, News, Events, Testimonials, Gallery, Recruiters, Placements, Downloads, ContactSubmissions, Applications, AuditLogs, Admissions

**Globals:** Site Settings, Navigation, Footer

## RBAC Roles

`superAdmin` · `admin` · `contentManager` · `admissionsManager` · `facultyManager` · `editor` · `viewer`

Access-control logic lives in `src/payload/access/index.ts` and is applied per-collection.

## Security

- CSRF protection (Origin header verification) on mutating API routes
- In-memory rate limiting per IP (`src/lib/security/rateLimit.ts`)
- Honeypot spam fields on public forms (never readable via field access control)
- File-upload validation by magic bytes (not extension)
- Input sanitization + Zod validation server-side (source of truth)
- Security headers (HSTS, X-Frame-Options, CSP, etc.) in `next.config.ts` and Nginx
- Auth cookies: `secure`, `httpOnly`, `sameSite: Strict`
- Password length capped (8–128) and validated before hashing (DoS protection)
- PII (emails, phone numbers) never logged

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for the full VPS deployment guide (PM2 + Nginx + Certbot, CI/CD, backups, health checks).

## Notes

- `any` is used only at the Payload Local-API data boundary (loosely-typed `find` results). To replace these with generated interfaces, run `npx payload generate:types` (requires a reachable database) and import from `@/payload-types`. The ESLint rule `@typescript-eslint/no-explicit-any` is set to `warn` for this reason.
