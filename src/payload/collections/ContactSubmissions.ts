import type { CollectionConfig } from 'payload'
import { isAdmissionsManager, isAnyone, neverReadField } from '../access'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'subject', 'status', 'createdAt'],
    group: 'Forms',
  },
  access: {
    create: isAnyone,
    read: isAdmissionsManager,
    update: isAdmissionsManager,
    delete: isAdmissionsManager,
  },
  fields: [
    { name: 'name', type: 'text', required: true, maxLength: 100 },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text', maxLength: 15 },
    { name: 'subject', type: 'text', required: true, maxLength: 200 },
    { name: 'message', type: 'textarea', required: true, maxLength: 2000 },
    { name: 'source', type: 'text', maxLength: 100, admin: { readOnly: true } },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Read', value: 'read' },
        { label: 'Replied', value: 'replied' },
        { label: 'Spam', value: 'spam' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'ipAddress',
      type: 'text',
      admin: { readOnly: true, position: 'sidebar' },
    },
    {
      name: 'honeypot',
      type: 'text',
      admin: { hidden: true },
      access: { read: neverReadField },
    },
  ],
}
