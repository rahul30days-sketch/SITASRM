import { NextRequest } from 'next/server'
import { checkRateLimit, RATE_LIMITS, getClientIp } from '@/lib/security/rateLimit'
import { getPayloadClient } from '@/lib/payload'
import { handleApiError } from '@/lib/errors/AppError'
import { sanitizeText } from '@/lib/security/sanitize'

export async function GET(request: NextRequest) {
  try {
    const ip = getClientIp(request)
    const { allowed } = checkRateLimit(`search:${ip}`, RATE_LIMITS.search)
    if (!allowed) {
      return Response.json({ error: 'Too many requests' }, { status: 429 })
    }

    const query = request.nextUrl.searchParams.get('q')
    if (!query || query.length < 2 || query.length > 100) {
      return Response.json({ error: 'Query must be 2-100 characters' }, { status: 400 })
    }

    const searchTerm = sanitizeText(query)
    const payload = await getPayloadClient()

    const [programs, faculty, news, events, pages] = await Promise.all([
      payload.find({
        collection: 'programs',
        where: {
          and: [
            { status: { equals: 'published' } },
            {
              or: [
                { name: { contains: searchTerm } },
                { shortDescription: { contains: searchTerm } },
              ],
            },
          ],
        },
        limit: 5,
        depth: 0,
      }),
      payload.find({
        collection: 'faculty',
        where: {
          and: [
            { status: { equals: 'published' } },
            {
              or: [
                { name: { contains: searchTerm } },
                { specialization: { contains: searchTerm } },
              ],
            },
          ],
        },
        limit: 5,
        depth: 0,
      }),
      payload.find({
        collection: 'news',
        where: {
          and: [
            { status: { equals: 'published' } },
            {
              or: [
                { title: { contains: searchTerm } },
                { excerpt: { contains: searchTerm } },
              ],
            },
          ],
        },
        limit: 5,
        depth: 0,
      }),
      payload.find({
        collection: 'events',
        where: {
          and: [
            { status: { equals: 'published' } },
            { title: { contains: searchTerm } },
          ],
        },
        limit: 5,
        depth: 0,
      }),
      payload.find({
        collection: 'pages',
        where: {
          and: [
            { status: { equals: 'published' } },
            { title: { contains: searchTerm } },
          ],
        },
        limit: 5,
        depth: 0,
      }),
    ])

    return Response.json({
      results: {
        programs: { items: programs.docs, total: programs.totalDocs },
        faculty: { items: faculty.docs, total: faculty.totalDocs },
        news: { items: news.docs, total: news.totalDocs },
        events: { items: events.docs, total: events.totalDocs },
        pages: { items: pages.docs, total: pages.totalDocs },
      },
    })
  } catch (error) {
    return handleApiError(error)
  }
}
