import type { Block } from 'payload'

export const CardsBlock: Block = {
  slug: 'cards',
  labels: { singular: 'Cards Section', plural: 'Cards Sections' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      maxLength: 100,
    },
    {
      name: 'cards',
      type: 'array',
      maxRows: 12,
      fields: [
        { name: 'title', type: 'text', required: true, maxLength: 80 },
        { name: 'description', type: 'textarea', maxLength: 300 },
        { name: 'icon', type: 'text', maxLength: 50 },
        {
          name: 'link',
          type: 'group',
          fields: [
            { name: 'label', type: 'text', maxLength: 50 },
            { name: 'url', type: 'text', maxLength: 300 },
          ],
        },
      ],
    },
  ],
}
