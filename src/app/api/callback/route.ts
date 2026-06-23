import { NextRequest } from 'next/server'
import { z } from 'zod'
import { checkRateLimit, RATE_LIMITS, getClientIp } from '@/lib/security/rateLimit'
import { sanitizeText, sanitizePhone, sanitizeEmail } from '@/lib/security/sanitize'
import { getPayloadClient } from '@/lib/payload'
import { handleApiError } from '@/lib/errors/AppError'

const callbackSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  phone: z.string().regex(/^\d{10}$/, 'Phone must be 10 digits'),
  program: z.string().min(1).max(200),
  email: z.string().email().max(254).optional().or(z.literal('')),
  honeypot: z.string().max(0).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get('origin')
    const allowedOrigin = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
    if (origin && origin !== allowedOrigin) {
      return Response.json({ error: 'Forbidden' }, { status: 403 })
    }

    const ip = getClientIp(request)
    const { allowed } = checkRateLimit(`callback:${ip}`, RATE_LIMITS.contact)
    if (!allowed) {
      return Response.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 },
      )
    }

    const body = await request.json()

    // Honeypot — silently accept and drop bots
    if (body.honeypot && String(body.honeypot).length > 0) {
      return Response.json({ success: true })
    }

    const result = callbackSchema.safeParse(body)
    if (!result.success) {
      return Response.json(
        { error: 'Validation failed', fieldErrors: result.error.flatten().fieldErrors },
        { status: 400 },
      )
    }

    const data = result.data
    const payload = await getPayloadClient()

    await payload.create({
      collection: 'contact-submissions',
      data: {
        name: sanitizeText(data.name),
        phone: sanitizePhone(data.phone),
        ...(data.email ? { email: sanitizeEmail(data.email) } : {}),
        subject: 'Callback Request',
        message: `Requested a callback. Program of interest: ${sanitizeText(data.program)}.`,
        source: 'popup-callback',
        ipAddress: ip,
      },
    })

    return Response.json({
      success: true,
      message: 'Thank you! Our admissions team will call you back shortly.',
    })
  } catch (error) {
    return handleApiError(error)
  }
}
