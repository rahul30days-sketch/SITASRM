import type { CollectionConfig } from 'payload'
import { isContentEditor, isPublished } from '../access'
import { slugField } from '../fields/slug'
import { statusField, scheduledAtField } from '../fields/status'
import { seoFields } from '../fields/seo'

export const News: CollectionConfig = {
  slug: 'news',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'publishedAt', 'status'],
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
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'News', value: 'news' },
        { label: 'Announcement', value: 'announcement' },
        { label: 'Press Release', value: 'press-release' },
        { label: 'Achievement', value: 'achievement' },
      ],
    },
    { name: 'content', type: 'richText' },
    { name: 'excerpt', type: 'textarea', maxLength: 300 },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'author', type: 'relationship', relationTo: 'users' },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'tags',
      type: 'array',
      maxRows: 10,
      fields: [{ name: 'tag', type: 'text', required: true, maxLength: 50 }],
    },
    statusField,
    scheduledAtField,
    ...seoFields,
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.status === 'published' && !data.publishedAt) {
          data.publishedAt = new Date().toISOString()
        }
        return data
      },
    ],
  },
}
