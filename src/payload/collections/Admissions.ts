import type { CollectionConfig } from 'payload'
import { isAdmissionsManager, isPublished } from '../access'
import { statusField } from '../fields/status'
import { seoFields } from '../fields/seo'

export const Admissions: CollectionConfig = {
  slug: 'admissions',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status'],
    group: 'Admissions',
  },
  access: {
    create: isAdmissionsManager,
    read: isPublished,
    update: isAdmissionsManager,
    delete: isAdmissionsManager,
  },
  fields: [
    { name: 'title', type: 'text', required: true, maxLength: 150 },
    { name: 'admissionProcess', type: 'richText' },
    {
      name: 'importantDates',
      type: 'array',
      maxRows: 20,
      fields: [
        { name: 'event', type: 'text', required: true, maxLength: 100 },
        { name: 'date', type: 'text', required: true, maxLength: 50 },
      ],
    },
    {
      name: 'documentChecklist',
      type: 'array',
      maxRows: 20,
      fields: [{ name: 'document', type: 'text', required: true, maxLength: 100 }],
    },
    { name: 'scholarshipInfo', type: 'richText' },
    { name: 'downloadForms', type: 'relationship', relationTo: 'downloads', hasMany: true },
    statusField,
    ...seoFields,
  ],
}
