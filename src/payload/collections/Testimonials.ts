import type { CollectionConfig } from 'payload'
import { isAdminOrContentManager, isPublished } from '../access'
import { statusField } from '../fields/status'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'studentName',
    defaultColumns: ['studentName', 'batch', 'company', 'featured', 'status'],
    group: 'Content',
  },
  access: {
    create: isAdminOrContentManager,
    read: isPublished,
    update: isAdminOrContentManager,
    delete: isAdminOrContentManager,
  },
  fields: [
    { name: 'studentName', type: 'text', required: true, maxLength: 100 },
    { name: 'batch', type: 'text', maxLength: 20 },
    { name: 'program', type: 'relationship', relationTo: 'programs' },
    { name: 'company', type: 'text', maxLength: 100 },
    { name: 'designation', type: 'text', maxLength: 100 },
    { name: 'testimonialText', type: 'textarea', required: true, maxLength: 500 },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
    },
    { name: 'profileImage', type: 'upload', relationTo: 'media' },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    statusField,
  ],
}
