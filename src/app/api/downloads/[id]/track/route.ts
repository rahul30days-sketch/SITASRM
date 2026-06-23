import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }

    const payload = await getPayloadClient()
    const doc = await payload.findByID({ collection: 'downloads', id, depth: 0 })

    if (!doc) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const currentCount = (doc.downloadCount as number) || 0
    await payload.update({
      collection: 'downloads',
      id,
      data: { downloadCount: currentCount + 1 },
      depth: 0,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
