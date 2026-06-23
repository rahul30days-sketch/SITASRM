import type { CollectionConfig } from 'payload'
import { isSuperAdmin } from '../access'

export const AuditLogs: CollectionConfig = {
  slug: 'audit-logs',
  admin: {
    useAsTitle: 'action',
    defaultColumns: ['user', 'collection', 'action', 'createdAt'],
    group: 'System',
  },
  access: {
    create: () => true,
    read: isSuperAdmin,
    update: () => false,
    delete: () => false,
  },
  fields: [
    { name: 'user', type: 'relationship', relationTo: 'users' },
    { name: 'userEmail', type: 'text', maxLength: 100, admin: { readOnly: true } },
    { name: 'collection', type: 'text', required: true, maxLength: 50, admin: { readOnly: true } },
    { name: 'action', type: 'text', required: true, maxLength: 20, admin: { readOnly: true } },
    { name: 'documentId', type: 'text', maxLength: 50, admin: { readOnly: true } },
    { name: 'ipAddress', type: 'text', maxLength: 50, admin: { readOnly: true } },
  ],
}
