import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

export const auditLogAfterChange: CollectionAfterChangeHook = async ({
  doc,
  req,
  operation,
  collection,
}) => {
  if (collection.slug === 'audit-logs') return doc

  try {
    await req.payload.create({
      collection: 'audit-logs',
      data: {
        user: req.user?.id,
        userEmail: req.user?.email || 'system',
        collectionSlug: collection.slug,
        action: operation,
        documentId: doc.id,
        ipAddress:
          req.headers?.get?.('x-forwarded-for')?.toString().split(',')[0] ||
          req.headers?.get?.('x-real-ip') ||
          '',
      },
    })
  } catch {
    // Audit log failure should not block the operation
  }

  return doc
}

export const auditLogAfterDelete: CollectionAfterDeleteHook = async ({
  doc,
  req,
  collection,
}) => {
  if (collection.slug === 'audit-logs') return doc

  try {
    await req.payload.create({
      collection: 'audit-logs',
      data: {
        user: req.user?.id,
        userEmail: req.user?.email || 'system',
        collectionSlug: collection.slug,
        action: 'delete',
        documentId: doc.id,
        ipAddress:
          req.headers?.get?.('x-forwarded-for')?.toString().split(',')[0] ||
          req.headers?.get?.('x-real-ip') ||
          '',
      },
    })
  } catch {
    // Audit log failure should not block the operation
  }

  return doc
}
