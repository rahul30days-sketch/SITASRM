const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

interface RateLimitConfig {
  maxRequests: number
  windowMs: number
}

export function checkRateLimit(key: string, config: RateLimitConfig): { allowed: boolean; retryAfter: number } {
  const now = Date.now()
  const record = rateLimitMap.get(key)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + config.windowMs })
    return { allowed: true, retryAfter: 0 }
  }

  if (record.count >= config.maxRequests) {
    return { allowed: false, retryAfter: Math.ceil((record.resetTime - now) / 1000) }
  }

  record.count++
  return { allowed: true, retryAfter: 0 }
}

export const RATE_LIMITS = {
  contact: { maxRequests: 5, windowMs: 15 * 60 * 1000 },
  application: { maxRequests: 3, windowMs: 60 * 60 * 1000 },
  search: { maxRequests: 30, windowMs: 60 * 1000 },
  brochure: { maxRequests: 5, windowMs: 15 * 60 * 1000 },
  downloadTrack: { maxRequests: 1, windowMs: 5 * 60 * 1000 },
} as const

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    return realIp
  }
  return '0.0.0.0'
}
