import { NextRequest } from 'next/server'
import { applicationSchema } from '@/lib/validation/schemas'
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
    const { allowed } = checkRateLimit(`application:${ip}`, RATE_LIMITS.application)
    if (!allowed) {
      return Response.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const body = await request.json()
    const result = applicationSchema.safeParse(body)

    if (!result.success) {
      return Response.json(
        { error: 'Validation failed', fieldErrors: result.error.flatten().fieldErrors },
        { status: 400 },
      )
    }

    const data = result.data
    const payload = await getPayloadClient()

    // programApplied may arrive as a Mongo ObjectId (from the form dropdown) or a
    // slug — resolve to a valid program ID so the relationship saves correctly.
    let programId = data.programApplied
    if (!/^[a-f0-9]{24}$/i.test(programId)) {
      const found = await payload.find({
        collection: 'programs',
        where: { slug: { equals: programId } },
        limit: 1,
        depth: 0,
      })
      if (!found.docs[0]) {
        return Response.json(
          { error: 'Validation failed', fieldErrors: { programApplied: ['Selected program not found.'] } },
          { status: 400 },
        )
      }
      programId = String(found.docs[0].id)
    }

    const application = await payload.create({
      collection: 'applications',
      data: {
        applicantName: sanitizeText(data.applicantName),
        email: sanitizeEmail(data.email),
        phone: sanitizePhone(data.phone),
        dob: data.dob,
        gender: data.gender,
        category: data.category,
        programApplied: programId,
        academicDetails: data.academicDetails,
        address: {
          street: sanitizeText(data.address.street),
          city: sanitizeText(data.address.city),
          state: sanitizeText(data.address.state),
          pincode: data.address.pincode,
        },
      },
    })

    return Response.json({
      success: true,
      applicationNumber: application.applicationNumber,
      message: 'Application submitted successfully.',
    })
  } catch (error) {
    return handleApiError(error)
  }
}
