import type { CollectionConfig } from 'payload'
import { isContentEditor, isPublished } from '../access'
import { statusField } from '../fields/status'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featured', 'status'],
    group: 'Content',
  },
  access: {
    create: isContentEditor,
    read: isPublished,
    update: isContentEditor,
    delete: isContentEditor,
  },
  fields: [
    { name: 'title', type: 'text', required: true, maxLength: 100 },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Campus', value: 'campus' },
        { label: 'Events', value: 'events' },
        { label: 'Academics', value: 'academics' },
        { label: 'Sports', value: 'sports' },
        { label: 'Cultural', value: 'cultural' },
        { label: 'Labs', value: 'labs' },
        { label: 'Hostels', value: 'hostels' },
      ],
    },
    {
      name: 'images',
      type: 'array',
      maxRows: 50,
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
    { name: 'date', type: 'date' },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    statusField,
  ],
}
