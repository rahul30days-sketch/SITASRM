'use client'

import { createClientUploadHandler } from '@payloadcms/plugin-cloud-storage/client'

/**
 * Client-bundle stand-in for `@payloadcms/storage-vercel-blob/client`'s
 * `VercelBlobClientUploadHandler`.
 *
 * Why this exists: the Vercel Blob adapter ALWAYS registers its client upload
 * handler in the Payload admin importMap (even when `clientUploads` is disabled
 * — see plugin-cloud-storage `initClientUploads`). The real handler imports
 * `getFileKey` from the plugin's *server* utilities barrel, which transitively
 * drags the entire `payload` server tree (`fs`, `os`, `undici`, …) into the
 * browser bundle and breaks `next build`.
 *
 * We run with `clientUploads` disabled, so the handler never performs an upload;
 * it only needs to be a valid provider that renders its children. The plugin's
 * client-safe `createClientUploadHandler` gives exactly that (it's the same
 * factory the real handler uses), wired to a no-op upload function.
 *
 * `next.config.ts` aliases `@payloadcms/storage-vercel-blob/client` to this file
 * for the CLIENT build only; the server build uses the real package untouched.
 */
export const VercelBlobClientUploadHandler = createClientUploadHandler({
  handler: async () => ({ prefix: '' }),
})
