import type { Block } from 'payload'

export const StatsBlock: Block = {
  slug: 'stats',
  labels: { singular: 'Stats Section', plural: 'Stats Sections' },
  fields: [
    {
      name: 'stats',
      type: 'array',
      maxRows: 8,
      fields: [
        { name: 'label', type: 'text', required: true, maxLength: 50 },
        { name: 'value', type: 'number', required: true },
        { name: 'suffix', type: 'text', maxLength: 10 },
        { name: 'icon', type: 'text', maxLength: 50 },
      ],
    },
  ],
}
