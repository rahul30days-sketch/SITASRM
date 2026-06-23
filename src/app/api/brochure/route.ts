import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { checkRateLimit, RATE_LIMITS, getClientIp } from '@/lib/security/rateLimit'
import { sanitizeText, sanitizeEmail, sanitizePhone } from '@/lib/security/sanitize'
import { getPayloadClient } from '@/lib/payload'

const brochureSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(254),
  phone: z.string().min(10).max(15),
  program: z.string().max(200).optional(),
  honeypot: z.string().max(0).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get('origin')
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
    if (serverUrl && origin && origin !== serverUrl) {
      return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
    }

    const ip = getClientIp(request)
    const rateCheck = checkRateLimit(ip, RATE_LIMITS.brochure)
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(rateCheck.retryAfter) } }
      )
    }

    const body = await request.json()

    if (body.honeypot) {
      return NextResponse.json({ success: true })
    }

    const parsed = brochureSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const data = parsed.data
    const payload = await getPayloadClient()

    await payload.create({
      collection: 'contact-submissions',
      data: {
        name: sanitizeText(data.name),
        email: sanitizeEmail(data.email),
        phone: sanitizePhone(data.phone),
        subject: 'Brochure Request',
        message: `Brochure request${data.program ? ` for program: ${sanitizeText(data.program)}` : ''}`,
        type: 'brochure' as const,
        ipAddress: ip,
        status: 'new' as const,
      },
    })

    return NextResponse.json({ success: true, message: 'Brochure request received. We will send it to your email shortly.' })
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
