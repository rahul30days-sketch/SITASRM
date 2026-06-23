import type { Payload } from 'payload'
import { getPayload } from 'payload'
import config from '@/payload/payload.config'

let cached: Payload | null = null

export async function getPayloadClient(): Promise<Payload> {
  if (cached) return cached

  const payload = await getPayload({ config })
  cached = payload
  return payload
}

type FindArgs = Parameters<Payload['find']>[0]

/* eslint-disable @typescript-eslint/no-explicit-any */
interface SafeFindResult<T = any> {
  docs: T[]
  totalDocs: number
  totalPages: number
  page: number
  limit: number
  hasNextPage: boolean
  hasPrevPage: boolean
  nextPage: number | null
  prevPage: number | null
}

function emptyResult<T>(limit: number): SafeFindResult<T> {
  return {
    docs: [],
    totalDocs: 0,
    totalPages: 0,
    page: 1,
    limit,
    hasNextPage: false,
    hasPrevPage: false,
    nextPage: null,
    prevPage: null,
  }
}

/**
 * Resilient wrapper around payload.find().
 * Returns an empty result set if the database is unreachable or the query fails,
 * so the site can build and render graceful empty states on a fresh deploy.
 * Never leaks DB/connection error details.
 */
export async function safeFind<T = any>(
  args: FindArgs
): Promise<SafeFindResult<T>> {
  const limit = typeof args.limit === 'number' ? args.limit : 10
  try {
    const payload = await getPayloadClient()
    const result = await payload.find(args)
    return result as unknown as SafeFindResult<T>
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(
        `[safeFind] query failed for collection "${args.collection}":`,
        err instanceof Error ? err.message : 'unknown error'
      )
    }
    return emptyResult<T>(limit)
  }
}

/**
 * Resilient wrapper around payload.findGlobal().
 * Returns null if the database is unreachable or the query fails.
 */
export async function safeFindGlobal<T = any>(
  slug: Parameters<Payload['findGlobal']>[0]['slug']
): Promise<T | null> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.findGlobal({ slug })
    return result as unknown as T
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(
        `[safeFindGlobal] query failed for global "${String(slug)}":`,
        err instanceof Error ? err.message : 'unknown error'
      )
    }
    return null
  }
}
