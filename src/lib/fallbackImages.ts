/**
 * Curated campus/education imagery used only as a graceful fallback when CMS media
 * is absent (client-review/demo). Card components prefer real CMS uploads and fall
 * back to an in-brand gradient placeholder + initials, so a broken remote image can
 * never blank out a card — these URLs are used mainly for full-bleed hero art, which
 * always sits on top of a solid gradient base.
 *
 * Hosts are allow-listed in next.config.ts (images.unsplash.com).
 */
/**
 * White wordmark logo, for use on dark/black backgrounds. Lives at the public root
 * (`public/logo-white.png`) so it is git-tracked and deploys to Vercel — unlike
 * `public/media/*`, which is gitignored (CMS media is served from Vercel Blob).
 */
export const WHITE_LOGO = '/logo-white.png'

/**
 * Full-colour logo (dark text + lotus mark) for use on LIGHT backgrounds (e.g. the
 * Home 4 ivory navbar). Tracked at `public/logo.png` so it deploys to Vercel and
 * never depends on the CMS media route (`/api/media/file/logo.png`), which 500s on
 * environments without local/Blob media.
 */
export const BRAND_LOGO = '/logo.png'

const U = 'https://images.unsplash.com'
const Q = 'auto=format&fit=crop&q=80'

export const HERO_IMAGES = {
  campus: `${U}/photo-1562774053-701939374585?${Q}&w=1920`,
  graduation: `${U}/photo-1523050854058-8df90110c9f1?${Q}&w=1920`,
  library: `${U}/photo-1541339907198-e08756dedf3f?${Q}&w=1920`,
  lecture: `${U}/photo-1571260899304-425eee4c7efc?${Q}&w=1600`,
  lab: `${U}/photo-1532094349884-543bc11b234d?${Q}&w=1600`,
  students: `${U}/photo-1523240795612-9a054b0db644?${Q}&w=1600`,
  studentPortrait: `${U}/photo-1539571696357-5a69c17a67c6?${Q}&w=1000`,
  research: `${U}/photo-1518152006812-edab29b069ac?${Q}&w=1600`,
} as const

/** First letters of a name, e.g. "Dr. Asha Verma" → "AV". Used for avatar fallbacks. */
export function initials(name?: string): string {
  if (!name) return 'S'
  return name
    .replace(/^(Dr|Prof|Mr|Mrs|Ms)\.?\s+/i, '')
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || '')
    .join('')
}
