/**
 * Populates Site Settings → Hero with default content + the bundled campus image,
 * so the homepage hero is fully editable from the admin panel.
 *
 * Run: npx tsx scripts/populate-hero.ts
 */
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'

function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env')
  if (fs.existsSync(envPath)) {
    for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
      if (m && process.env[m[1]] === undefined) {
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim()
      }
    }
  }
}

async function main() {
  loadEnv()
  const { default: config } = await import('../src/payload/payload.config')
  const payload = await getPayload({ config })

  // Reuse an existing campus image if present, else upload the bundled one.
  let bgId: string | undefined
  const existing = await payload.find({
    collection: 'media',
    where: { alt: { like: 'campus' } },
    limit: 1,
    depth: 0,
  })
  if (existing.docs[0]) {
    bgId = (existing.docs[0] as { id: string }).id
  } else {
    const filePath = path.resolve(process.cwd(), 'public/media/images/hero-campus.jpg')
    if (fs.existsSync(filePath)) {
      const doc = (await payload.create({
        collection: 'media',
        data: { alt: 'SERI campus', category: 'image' },
        filePath,
      })) as { id: string }
      bgId = doc.id
    }
  }

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      hero: {
        backgroundImage: bgId,
        badge: 'AICTE Approved · NAAC Accredited · Est. 2008',
        headingTop: 'Shape Your Future at',
        headingHighlight: 'SERI',
        subheading: 'Premier Engineering & Research Institute in Haryana',
        primaryCta: { label: 'Apply Now 2025–26', href: '/admissions/apply' },
        secondaryCta: { label: 'Download Brochure', href: '/downloads' },
        tertiaryCta: { label: 'Talk to Admissions', href: 'tel:+919876543210' },
        trustItems: [
          { icon: 'building', label: '500+ Recruiters' },
          { icon: 'rupee', label: '₹8 LPA Avg Package' },
          { icon: 'shield', label: '100% Placement Support' },
        ],
        chips: [
          { value: '95%', label: 'Placement Rate' },
          { value: 'NAAC A', label: 'Grade Accredited' },
        ],
        tickerItems: [
          'AICTE Approved', 'NAAC A Grade', 'Est. 2008', '500+ Recruiters',
          '₹14 LPA Highest Package', '95% Placement', '2000+ Alumni',
        ].map((text) => ({ text })),
      },
    } as never,
  })

  console.log('✅ Hero content populated in Site Settings.\n')
  process.exit(0)
}

main().catch((e) => { console.error('populate-hero failed:', e); process.exit(1) })
