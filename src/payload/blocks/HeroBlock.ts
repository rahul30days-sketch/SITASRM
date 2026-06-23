import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      maxLength: 100,
    },
    {
      name: 'subheading',
      type: 'text',
      maxLength: 200,
    },
    {
      name: 'ctaPrimary',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', maxLength: 50 },
        { name: 'url', type: 'text', maxLength: 300 },
      ],
    },
    {
      name: 'ctaSecondary',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', maxLength: 50 },
        { name: 'url', type: 'text', maxLength: 300 },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'backgroundVideo',
      type: 'text',
      maxLength: 500,
      admin: { description: 'Video URL (optional)' },
    },
  ],
}
