import type { CollectionConfig } from 'payload'
import { isAdminOrContentManager, isPublished } from '../access'
import { statusField } from '../fields/status'

export const Downloads: CollectionConfig = {
  slug: 'downloads',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'downloadCount', 'status'],
    group: 'Content',
  },
  access: {
    create: isAdminOrContentManager,
    read: isPublished,
    update: isAdminOrContentManager,
    delete: isAdminOrContentManager,
  },
  fields: [
    { name: 'title', type: 'text', required: true, maxLength: 150 },
    { name: 'description', type: 'textarea', maxLength: 300 },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Brochure', value: 'brochure' },
        { label: 'Syllabus', value: 'syllabus' },
        { label: 'Form', value: 'form' },
        { label: 'Notice', value: 'notice' },
        { label: 'Result', value: 'result' },
        { label: 'Timetable', value: 'timetable' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'file', type: 'upload', relationTo: 'media', required: true },
    { name: 'program', type: 'relationship', relationTo: 'programs' },
    { name: 'department', type: 'relationship', relationTo: 'departments' },
    { name: 'downloadCount', type: 'number', defaultValue: 0, admin: { readOnly: true } },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    statusField,
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar' },
    },
  ],
}
