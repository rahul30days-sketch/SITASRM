import type { CollectionConfig } from 'payload'
import { isContentEditor, isPublished } from '../access'
import { slugField } from '../fields/slug'
import { statusField } from '../fields/status'
import { seoFields } from '../fields/seo'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'startDate', 'venue', 'status'],
    group: 'Content',
  },
  access: {
    create: isContentEditor,
    read: isPublished,
    update: isContentEditor,
    delete: isContentEditor,
  },
  fields: [
    { name: 'title', type: 'text', required: true, maxLength: 150 },
    slugField,
    { name: 'description', type: 'richText' },
    { name: 'shortDescription', type: 'textarea', maxLength: 300 },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Academic', value: 'academic' },
        { label: 'Cultural', value: 'cultural' },
        { label: 'Sports', value: 'sports' },
        { label: 'Webinar', value: 'webinar' },
        { label: 'Workshop', value: 'workshop' },
        { label: 'Placement', value: 'placement' },
      ],
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    { name: 'venue', type: 'text', maxLength: 200 },
    { name: 'registrationLink', type: 'text', maxLength: 500 },
    {
      name: 'registrationDeadline',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    { name: 'capacity', type: 'number' },
    { name: 'isFeatured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    {
      name: 'images',
      type: 'array',
      maxRows: 20,
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
    statusField,
    ...seoFields,
  ],
}
