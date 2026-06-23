import { NextRequest } from 'next/server'
import { contactSchema } from '@/lib/validation/schemas'
import { checkRateLimit, RATE_LIMITS, getClientIp } from '@/lib/security/rateLimit'
import { sanitizeText, sanitizeEmail, sanitizePhone } from '@/lib/security/sanitize'
import { getPayloadClient } from '@/lib/payload'
import { handleApiError } from '@/lib/errors/AppError'

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get('origin')
    const allowedOrigin = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
    if (origin && origin !== allowedOrigin) {
      return Response.json({ error: 'Forbidden' }, { status: 403 })
    }

    const ip = getClientIp(request)
    const { allowed } = checkRateLimit(`contact:${ip}`, RATE_LIMITS.contact)
    if (!allowed) {
      return Response.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 },
      )
    }

    const body = await request.json()
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      return Response.json(
        { error: 'Validation failed', fieldErrors: result.error.flatten().fieldErrors },
        { status: 400 },
      )
    }

    const data = result.data

    if (data.honeypot && data.honeypot.length > 0) {
      return Response.json({ success: true, message: 'Thank you for your message.' })
    }

    const payload = await getPayloadClient()

    await payload.create({
      collection: 'contact-submissions',
      data: {
        name: sanitizeText(data.name),
        email: sanitizeEmail(data.email),
        phone: data.phone ? sanitizePhone(data.phone) : undefined,
        subject: sanitizeText(data.subject),
        message: sanitizeText(data.message),
        ipAddress: ip,
        source: request.headers.get('referer') || 'direct',
      },
    })

    return Response.json({ success: true, message: 'Thank you for your message. We will get back to you soon.' })
  } catch (error) {
    return handleApiError(error)
  }
}
