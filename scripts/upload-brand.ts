/**
 * Uploads the brand assets from public/media/images into the Payload Media
 * collection and wires them into the CMS (Site Settings logo + campus gallery),
 * so they render on the site AND remain editable in the admin panel.
 *
 * Run: npx tsx scripts/upload-brand.ts
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

  const dir = path.resolve(process.cwd(), 'public/media/images')

  async function upload(file: string, alt: string): Promise<string | null> {
    const filePath = path.join(dir, file)
    if (!fs.existsSync(filePath)) {
      console.log(`  ⚠️  missing ${file}`)
      return null
    }
    const doc = (await payload.create({
      collection: 'media',
      data: { alt, category: 'image' },
      filePath,
    })) as { id: string }
    console.log(`  ✅ uploaded ${file}`)
    return doc.id
  }

  // 1) Logo -> Site Settings
  const logoId = await upload('logo.png', 'SITASRM Engineering & Research Institute logo')
  if (logoId) {
    await payload.updateGlobal({ slug: 'site-settings', data: { logo: logoId } as never })
    console.log('  ✅ Site Settings logo set')
  }

  // 2) Hero campus image -> first image of the "campus" gallery album (hero reads this)
  const heroId = await upload('hero-campus.jpg', 'SERI campus')
  if (heroId) {
    const albums = await payload.find({
      collection: 'gallery',
      where: { category: { equals: 'campus' } },
      limit: 1,
      depth: 0,
    })
    const album = albums.docs[0] as { id: string; images?: { image: string }[] } | undefined
    if (album) {
      const existing = (album.images || []).map((i) => ({ image: i.image }))
      await payload.update({
        collection: 'gallery',
        id: album.id,
        data: { images: [{ image: heroId }, ...existing] } as never,
      })
      console.log('  ✅ Campus gallery hero image set')
    } else {
      await payload.create({
        collection: 'gallery',
        data: { title: 'Campus', category: 'campus', images: [{ image: heroId }], featured: true, status: 'published' } as never,
      })
      console.log('  ✅ Campus gallery album created')
    }
  }

  console.log('\n✅ Brand assets wired into the CMS.\n')
  process.exit(0)
}

main().catch((e) => { console.error('upload-brand failed:', e); process.exit(1) })
