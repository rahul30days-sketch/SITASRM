/**
 * Updates the live Navigation global so dropdown items point to distinct,
 * real destinations (fixes duplicate-href submenus). Run: npx tsx scripts/fix-nav.ts
 */
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'

function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env')
  if (fs.existsSync(envPath)) {
    for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
      if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim()
    }
  }
}

async function main() {
  loadEnv()
  const { default: config } = await import('../src/payload/payload.config')
  const payload = await getPayload({ config })

  await payload.updateGlobal({
    slug: 'navigation',
    data: {
      primaryNav: [
        { label: 'Home', href: '/' },
        { label: 'Programs', href: '/programs', children: [
          { label: 'B.Tech CSE', href: '/programs/btech-cse' },
          { label: 'B.Tech Mechanical', href: '/programs/btech-mechanical' },
          { label: 'M.Tech CS', href: '/programs/mtech-cs' },
          { label: 'MBA', href: '/programs/mba-tech' },
          { label: 'All Programs', href: '/programs' },
        ] },
        { label: 'Departments', href: '/departments' },
        { label: 'Admissions', href: '/admissions', children: [
          { label: 'How to Apply', href: '/admissions/apply' },
          { label: 'Admission Process', href: '/admissions' },
          { label: 'Downloads', href: '/downloads' },
          { label: 'FAQ', href: '/faq' },
        ] },
        { label: 'Placements', href: '/placements' },
        { label: 'Campus', href: '/gallery', children: [
          { label: 'Gallery', href: '/gallery' },
          { label: 'Events', href: '/events' },
          { label: 'News', href: '/news' },
          { label: 'Testimonials', href: '/testimonials' },
        ] },
        { label: 'Contact', href: '/contact' },
      ],
      ctaButton: { label: 'Apply Now', href: '/admissions/apply', variant: 'primary' },
    } as never,
  })

  console.log('✅ Navigation updated with distinct dropdown links.\n')
  process.exit(0)
}

main().catch((e) => { console.error('fix-nav failed:', e); process.exit(1) })
