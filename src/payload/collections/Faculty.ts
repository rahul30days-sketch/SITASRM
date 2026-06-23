import type { CollectionConfig } from 'payload'
import { isFacultyManager, isPublished } from '../access'
import { slugField } from '../fields/slug'
import { statusField } from '../fields/status'

export const Faculty: CollectionConfig = {
  slug: 'faculty',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'designation', 'department', 'isHOD', 'status'],
    group: 'Academics',
  },
  access: {
    create: isFacultyManager,
    read: isPublished,
    update: isFacultyManager,
    delete: isFacultyManager,
  },
  fields: [
    { name: 'name', type: 'text', required: true, maxLength: 100 },
    slugField,
    { name: 'designation', type: 'text', maxLength: 100 },
    { name: 'department', type: 'relationship', relationTo: 'departments' },
    { name: 'qualification', type: 'text', maxLength: 200 },
    { name: 'experienceYears', type: 'number' },
    { name: 'specialization', type: 'text', maxLength: 200 },
    { name: 'biography', type: 'richText' },
    {
      name: 'researchInterests',
      type: 'array',
      maxRows: 10,
      fields: [{ name: 'topic', type: 'text', required: true, maxLength: 100 }],
    },
    {
      name: 'publications',
      type: 'array',
      maxRows: 50,
      fields: [
        { name: 'title', type: 'text', required: true, maxLength: 300 },
        { name: 'journal', type: 'text', maxLength: 200 },
        { name: 'year', type: 'number' },
        { name: 'url', type: 'text', maxLength: 500 },
      ],
    },
    { name: 'profileImage', type: 'upload', relationTo: 'media' },
    { name: 'email', type: 'email' },
    { name: 'linkedin', type: 'text', maxLength: 200 },
    { name: 'isHOD', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    statusField,
  ],
}
