'use client'

import { createClientUploadHandler } from '@payloadcms/plugin-cloud-storage/client'

/**
 * Client-bundle stand-in for `@payloadcms/storage-vercel-blob/client`'s
 * `VercelBlobClientUploadHandler`.
 *
 * The real handler imports `getFileKey` from the plugin's *server* utilities
 * barrel, which drags the whole `payload` server tree (fs, os, undici, pino…)
 * into the browser bundle and breaks `next build`. We run with clientUploads
 * disabled, so the handler never performs an upload — it only needs to be a valid
 * provider that renders its children. `createClientUploadHandler` (the plugin's
 * client-safe export) gives exactly that, wired to a no-op upload function.
 *
 * `next.config.ts` redirects `@payloadcms/storage-vercel-blob/client` to this
 * file (both compilers) so the RSC client-reference identity stays consistent.
 */
export const VercelBlobClientUploadHandler = createClientUploadHandler({
  handler: async () => ({ prefix: '' }),
})
