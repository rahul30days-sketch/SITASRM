import type { CollectionConfig } from 'payload'
import { isAdminOrContentManager, isPublished } from '../access'
import { slugField } from '../fields/slug'
import { statusField } from '../fields/status'
import { seoFields } from '../fields/seo'

export const Departments: CollectionConfig = {
  slug: 'departments',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'hod', 'status'],
    group: 'Academics',
  },
  access: {
    create: isAdminOrContentManager,
    read: isPublished,
    update: isAdminOrContentManager,
    delete: isAdminOrContentManager,
  },
  fields: [
    { name: 'name', type: 'text', required: true, maxLength: 100 },
    slugField,
    { name: 'shortDescription', type: 'textarea', maxLength: 300 },
    { name: 'fullDescription', type: 'richText' },
    { name: 'hod', type: 'relationship', relationTo: 'faculty' },
    { name: 'programs', type: 'relationship', relationTo: 'programs', hasMany: true },
    { name: 'facultyList', type: 'relationship', relationTo: 'faculty', hasMany: true },
    {
      name: 'facilities',
      type: 'array',
      maxRows: 20,
      fields: [
        { name: 'name', type: 'text', required: true, maxLength: 100 },
        { name: 'description', type: 'textarea', maxLength: 300 },
      ],
    },
    {
      name: 'images',
      type: 'array',
      maxRows: 20,
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
    { name: 'achievements', type: 'richText' },
    { name: 'vision', type: 'textarea', maxLength: 500 },
    statusField,
    ...seoFields,
  ],
}
